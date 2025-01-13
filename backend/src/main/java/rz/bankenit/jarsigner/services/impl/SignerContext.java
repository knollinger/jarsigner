package rz.bankenit.jarsigner.services.impl;

import java.io.File;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CountDownLatch;

import jdk.security.jarsigner.JarSigner;
import rz.bankenit.jarsigner.models.JarState;

/**
 * Beschreibt den Kontext für einen {@link SignerTask}
 */
record SignerContext(//
    File tmpDir, //
    JarSigner signer, //
    CountDownLatch countDownLatch, //
    List<File> signedJars, //
    List<JarState> errors)
{
    /**
     * @param tmpDir
     * @param countDownLatch
     * @param signedJars
     * @param errors
     */
    public SignerContext
    {
        Objects.requireNonNull(tmpDir);
        Objects.requireNonNull(signer);
        Objects.requireNonNull(countDownLatch);
        Objects.requireNonNull(signedJars);
        Objects.requireNonNull(errors);
    }
}
