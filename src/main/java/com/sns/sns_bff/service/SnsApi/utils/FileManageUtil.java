package com.sns.sns_bff.service.SnsApi.utils;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Optional;

@Service
public class FileManageUtil {

    private final String pathToStaticDir = "./src/main/resources/static/";

    public Optional<String> saveFileAndGetUrl(MultipartFile file, String uniqueIdentifier) {
        String url = String.format("data/%s/%s", uniqueIdentifier, file.getOriginalFilename());
        File fileToSave = new File(pathToStaticDir + url);
        try {
            fileToSave.getParentFile().mkdirs();
            fileToSave.createNewFile();
            try (OutputStream outputStream = new FileOutputStream(fileToSave)) {
                outputStream.write(file.getBytes());
            }
            return Optional.of(url);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }

    public boolean deleteFileAndDir(String pathToFile) {
        File directory = new File(pathToStaticDir + pathToFile).getParentFile();
        try {
            FileUtils.deleteDirectory(directory);
            return true;
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

}
