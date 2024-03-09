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
public class Recipe {
    private String Category;
    private String Description;
    private String DietaryRestriction;
    private String RecipeID;
    private String Title;
}
