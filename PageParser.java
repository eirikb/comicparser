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
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Eirik Brandtzæg <eirikdb@gmail.com>
 */
public class PageParser {

    private static final int MINIMUMFRAMES = 10;

    public static Page parse(Page page) throws IOException {
        final BufferedImage image = page.getImage();
        Traversal traversal = new Traversal(image, 90);
        traversal.traverse(0, 0);
        List<int[]> minmax = new ArrayList<int[]>();


        int minimumsize = (2 * image.getWidth() + 2 * image.getHeight()) / MINIMUMFRAMES;
        for (int i = 0; i < traversal.getBorders().size(); i++) {
            if (traversal.getBordersPos().get(i) > minimumsize) {
                int maxX = 0;
                int minX = Integer.MAX_VALUE;
                int maxY = 0;
                int minY = Integer.MAX_VALUE;
                for (int j = 0; j < traversal.getBordersPos().get(i); j++) {
                    int[] xy = traversal.getBorders().get(i)[j];
                    if (xy[0] > maxX) {
                        maxX = xy[0];
                    }
                    if (xy[0] < minX) {
                        minX = xy[0];
                    }
                    if (xy[1] > maxY) {
                        maxY = xy[1];
                    }
                    if (xy[1] < minY) {
                        minY = xy[1];
                    }
                }
                int[] mm = {minX, maxX, minY, maxY};
                minmax.add(mm);
            }
        }

        for (int i = 0; i < minmax.size(); i++) {
            for (int j = i + 1; j < minmax.size(); j++) {
                if (minmax.get(j)[2] < minmax.get(i)[2]) {
                    int[] temp = minmax.get(j);
                    minmax.set(j, minmax.get(i));
                    minmax.set(i, temp);
                }
            }
        }
        for (int i = 0; i < minmax.size(); i++) {
            for (int j = i + 1; j < minmax.size(); j++) {
                double p = ((minmax.get(j)[2] - minmax.get(i)[2]) * 100.0 / page.getImage().getHeight());
                if (p > 10) {
                    break;
                }
                if (minmax.get(j)[0] < minmax.get(i)[0]) {
                    int[] temp = minmax.get(j);
                    minmax.set(j, minmax.get(i));
                    minmax.set(i, temp);
                }
            }
        }
        page.setFrames(minmax);
        return page;
    }
}
