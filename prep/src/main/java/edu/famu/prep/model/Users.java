package edu.famu.prep.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;

@Data
@NoArgsConstructor()
@AllArgsConstructor()

public class Users {

    private String Email;
    private String Role;
    private String UserID;
    private String Username;
    private boolean ActiveStatus;
}
