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
public class Review {
    private int Rating;
    private String Recipe;
    private String ReviewID;
    private String User;
}
