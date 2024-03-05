package edu.famu.prep.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.util.Date;

import com.google.protobuf.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private String Content;
    private String MessageID;
    private String RecieverUser;
    private String SenderUser;
    private Date Time;
}

