package edu.famu.prep.service;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import edu.famu.prep.model.Recipe;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class RecipeService {

    private Firestore firestore;

    public RecipeService() {
        this.firestore = FirestoreClient.getFirestore();
    }

    public Recipe documentSnapshotToRecipe(DocumentSnapshot document) {
        Recipe recipe = null;
        if (document.exists()) {
            recipe = new Recipe(document.getString("Category"), document.getString("Description"), document.getString("DietaryRestriction"), document.getString("RecipeID"), document.getString("Title"));
        }
        return recipe;
    }

    public ArrayList<Recipe> getAllRecipes() throws ExecutionException, InterruptedException {
        CollectionReference recipeCollection = firestore.collection("Recipe");
        ApiFuture<QuerySnapshot> future = recipeCollection.get();
        ArrayList<Recipe> recipeList = new ArrayList<>();
        for (DocumentSnapshot document : future.get().getDocuments()) {
            Recipe recipe = documentSnapshotToRecipe(document);
            if (recipe != null) {
                recipeList.add(recipe);
            }
        }
        return recipeList;
    }

    public Recipe getRecipeById(String recipeId) throws ExecutionException, InterruptedException {
        CollectionReference recipeCollection = firestore.collection("Recipe");
        ApiFuture<DocumentSnapshot> future = recipeCollection.document(recipeId).get();
        DocumentSnapshot document = future.get();
        return documentSnapshotToRecipe(document);
    }

    public String createRecipe(Recipe recipe) throws ExecutionException, InterruptedException {
        String recipeId = null;
        ApiFuture<DocumentReference> future = firestore.collection("Recipe").add(recipe);
        DocumentReference recipeRef = future.get();
        recipeId = recipeRef.getId();
        return recipeId;
    }

    public void updateRecipe(String id, Map<String, String> updatedValues) {
        String[] allowed = {"Category", "Description", "DietaryRestriction", "RecipeID", "Title"};
        List<String> list = Arrays.asList(allowed);
        Map<String, Object> formattedValues = new HashMap<>();

        for (Map.Entry<String, String> entry : updatedValues.entrySet()) {
            String key = entry.getKey();
            if (list.contains(key)) {
                formattedValues.put(key, entry.getValue());
            }
        }
        DocumentReference recipeDoc = firestore.collection("Recipe").document(id);
        if (recipeDoc != null)
            recipeDoc.update(formattedValues);
    }

    public void deleteRecipe(String recipeId) {
        DocumentReference recipeDoc = firestore.collection("Recipe").document(recipeId);
        recipeDoc.delete();
    }
}