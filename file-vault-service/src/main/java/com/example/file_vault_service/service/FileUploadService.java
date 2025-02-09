package com.example.file_vault_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FileUploadService {

    @Value("${folderPath}")
    private String folderPath;

    private final Map<String, byte[]> fileStorage = new HashMap<>();


    public List<String> getUploadedFiles(){
        File dir = new File(folderPath);
        File[] files = dir.listFiles();

        return files != null ? Arrays.stream(files).map(File::getName).collect(Collectors.toList()) : null;
    }

    public Resource downloadFile(String fileName) {
        System.out.println(folderPath + fileName);
        File dir = new File(folderPath + "/"+fileName);
        try {
            if (dir.exists()) {
                return new UrlResource(dir.toURI());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        return null;
    }

    public String uploadFile(MultipartFile file){
        try {
            //Checking if the file already exists
            List<String> filesList = this.getUploadedFiles();

            boolean doFileAlreadyExist = filesList.contains(file.getOriginalFilename());

            if(doFileAlreadyExist){
                return "File Already Exists with this name";
            }


            // Save the file to the resources/uploads folder
            Path filePath = Paths.get(folderPath + "/"+file.getOriginalFilename());
            Files.write(filePath, file.getBytes());

            return "File uploaded successfully";
        } catch (IOException e) {
            return "Error uploading file: " + e.getMessage();
        }
    }


}
