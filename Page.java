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
import java.util.List;

/**
 *
 * @author Eirik Brandtzæg <eirikdb@gmail.com>
 */
public class Page {

    private String name;
    private BufferedImage image;
    private List<int[]> frames;

    public Page(String name, BufferedImage image) {
        this.name = name;
        this.image = image;
    }

    public BufferedImage getImage() {
        return image;
    }

    public String getName() {
        return name;
    }

    public List<int[]> getFrames() {
        return frames;
    }

    public void setFrames(List<int[]> frames) {
        this.frames = frames;
    }
}
