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
public class Advertisement {
    private String AdID;
    private Timestamp ExpiryDate;
    private String Ingredient;
    private boolean PaymentStatus;
    private String ProductName;
    private String VendorName;
}