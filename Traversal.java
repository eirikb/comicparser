/*
 * =============================================================================
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <eirikdb@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Eirik Brandtzæg
 * =============================================================================
 */
package no.eirikb.gcomic.parse;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Eirik Brandtzæg <eirikdb@gmail.com>
 */
public class Traversal {

    private BufferedImage image;
    private int[] start;
    private int[][][] stack;
    private int[] stackSize;
    private double percentage;
    private int stackPos;
    private List<int[][]> borders;
    private List<Integer> bordersPos;
    private boolean[][] foundPoints;
    private int longestBorderPos;

    public Traversal(BufferedImage image, double percentage) {
        this.image = image;
        this.percentage = percentage;
        stack = new int[3][2 * image.getWidth() + 2 * image.getHeight()][2];
        stackSize = new int[stack.length];
        borders = new ArrayList<int[][]>();
        bordersPos = new ArrayList<Integer>();
        foundPoints = new boolean[image.getWidth()][image.getHeight()];
    }

    public void traverse(int x, int y) {
        start = image.getRaster().getPixel(x, y, new int[3]);
        stack[0][0][0] = x;
        stack[0][0][1] = y;
        stackSize[0] = 1;
        stackPos = 1;
        while (explode()) {
        }
    }

    private boolean explode() {
        int stackPosOld = stackPos - 1;
        if (stackPosOld < 0) {
            stackPosOld = stack.length - 1;
        }
        boolean add = false;
        for (int i = 0; i < stackSize[stackPosOld]; i++) {
            int x2 = stack[stackPosOld][i][0];
            int y2 = stack[stackPosOld][i][1];
            for (int y = y2 - 1; y < y2 + 2; y++) {
                for (int x = x2 - 1; x < x2 + 2; x++) {
                    if (x != x2 || y != y2) {
                        if (checkPixel(x, y)) {
                            if (!checkStack(x, y)) {
                                addPoint(x, y);
                                add = true;
                            }
                        } else {
                            addpointBorder(x, y);
                        }
                    }
                }
            }
        }
        if (add) {
            stackPos++;
            if (stackPos >= stack.length) {
                stackPos = 0;
            }
            stackSize[stackPos] = 0;
        }
        return add;
    }

    private void addPoint(int x, int y) {
        stack[stackPos][stackSize[stackPos]][0] = x;
        stack[stackPos][stackSize[stackPos]][1] = y;
        stackSize[stackPos]++;
    }

    private boolean checkStack(int x, int y) {
        for (int s1 = 0; s1 < stack.length; s1++) {
            for (int s2 = 0; s2 < stackSize[s1]; s2++) {
                if (stack[s1][s2][0] == x && stack[s1][s2][1] == y) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean checkPixel(int x, int y) {
        if (x >= 0 && x < image.getWidth() && y >= 0 && y < image.getHeight()) {
            int i = 0;
            for (int rgb : image.getRaster().getPixel(x, y, new int[3])) {
                if (Math.min(rgb, start[i]) * 100.0 / Math.max(rgb, start[i]) < percentage) {
                    return false;
                }
                i++;
            }
            return true;
        }
        return false;
    }

    private void addpointBorder(int x, int y) {
        if (x >= 0 && x < image.getWidth() && y >= 0 && y < image.getHeight() && !foundPoints[x][y]) {
            foundPoints[x][y] = true;
            int found = -1;
            int[][] border;

            for (int i = longestBorderPos; i >= 0; i--) {
                for (int j = 0; j < borders.size(); j++) {
                    int pos = bordersPos.get(j) - (longestBorderPos - i);
                    if (found >= 0 && pos < found - 10) {
                        i = -1;
                        break;
                    }
                    if (pos >= 0) {
                        border = borders.get(j);
                        if (x >= border[pos][0] - 2 &&
                                x <= border[pos][0] + 2 &&
                                y >= border[pos][1] - 2 &&
                                y <= border[pos][1] + 2) {
                            if (found >= 0 && j != found) {
                                int a = Math.min(j, found);
                                int b = Math.max(j, found);
                                int apos = bordersPos.get(a);
                                for (int bi = 0; bi < bordersPos.get(b); bi++) {
                                    borders.get(a)[apos] = borders.get(b)[bi];
                                    apos++;
                                }
                                bordersPos.set(a, apos);
                                bordersPos.set(b, 1);
                            }
                            found = j;
                        }
                    }
                }
            }
            if (found >= 0) {
                borders.get(found)[bordersPos.get(found)][0] = x;
                borders.get(found)[bordersPos.get(found)][1] = y;
                bordersPos.set(found, bordersPos.get(found) + 1);
                if (bordersPos.get(found) > longestBorderPos) {
                    longestBorderPos = bordersPos.get(found);
                }
            } else {
                borders.add(new int[image.getWidth() * 2 + image.getHeight() * 2][2]);
                borders.get(borders.size() - 1)[0][0] = x;
                borders.get(borders.size() - 1)[0][1] = y;
                bordersPos.add(1);
                if (longestBorderPos == 0) {
                    longestBorderPos = 1;
                }
            }
        }
    }

    public List<int[][]> getBorders() {
        return borders;
    }

    public List<Integer> getBordersPos() {
        return bordersPos;
    }
}
