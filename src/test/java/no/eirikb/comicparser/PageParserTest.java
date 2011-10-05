package no.eirikb.comicparser;

import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

import junit.framework.TestCase;
import org.junit.*;

public class PageParserTest extends TestCase {
    private BufferedImage image;

    private BufferedImage readTestImage() {
        try {
            //return ImageIO.read(new File("caroling.png"));
            return ImageIO.read(getClass().getClassLoader().getResourceAsStream("caroling.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Before
    public void setUp() throws Exception {
        image = readTestImage();
    }
 
    @Test
    public void test() throws Exception {
        assertTrue(true);
        Page page = new Page("test", image);
        PageParser.parse(page);
    }
}
