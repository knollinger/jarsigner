package org.knollinger.jarsigner.utils;

import java.io.File;

/**
 * 
 */
public class FileUtils
{
    /**
     * 
     * @param file
     */
    public static void delete(File file)
    {
        if (file != null)
        {
            if (file.isDirectory())
            {
                FileUtils.deleteDirectory(file);
            }
            else
            {
                file.delete();
            }
        }
    }

    /**
     * @param dir
     */
    private static void deleteDirectory(File dir)
    {
        File[] files = dir.listFiles();
        for (File file : files)
        {
            FileUtils.delete(file);
        }
        dir.delete();
    }
}
