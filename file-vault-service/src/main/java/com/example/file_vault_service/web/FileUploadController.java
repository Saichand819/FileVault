package com.example.file_vault_service.web;

import com.example.file_vault_service.service.FileUploadService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/fileVault")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @GetMapping("/get-uploads")
    public ResponseEntity<List<String>> getFileList() {
        return new ResponseEntity<>(fileUploadService.getUploadedFiles(), HttpStatus.OK);
    }

    @GetMapping(value = "/download")
    public ResponseEntity<?> downloadFile(@RequestParam(value = "fileName") String fileName) {

        System.out.println(fileName);
        Resource file = fileUploadService.downloadFile(fileName);
        if (file == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).
                    header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"").body(file);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(value = "file", required = false) MultipartFile file) {

        //Checking if the file is empty
        if (file==null) {
            return ResponseEntity.badRequest().body("File is empty. Please select a valid file.");
        }

        double fileSize = file.getSize();

        fileSize = fileSize/1024; //In KB

        fileSize = fileSize/1024;// In MB

        //Checking if file size exceeded Maximum size
        if(fileSize>10){
            return ResponseEntity.badRequest().body("File Size Exceeded the Max Limit of 10MB");
        }

        String res = fileUploadService.uploadFile(file);

        if(!res.equals("File uploaded successfully")){
            return ResponseEntity.badRequest().body(res);
        }

        return ResponseEntity.ok().body(res);

    }

}
