package rz.bankenit.jarsigner.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * Ein {@link FileInputStream}, welcher das zu lesende File
 * beim close des Streams löscht.
 */
public class FileDeletingInputStream extends FileInputStream
{
    private File file;

    /**
     * @param file
     * @throws FileNotFoundException
     */
    public FileDeletingInputStream(File file) throws FileNotFoundException
    {
        super(file);
        this.file = file;
    }

    /**
     *
     */
    @Override
    public void close() throws IOException
    {
        super.close();
        this.file.delete();
    }
}
