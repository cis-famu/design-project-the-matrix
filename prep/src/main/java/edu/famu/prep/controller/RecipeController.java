package edu.famu.prep.controller;
import edu.famu.prep.model.Recipe;
import edu.famu.prep.service.RecipeService;
import edu.famu.prep.util.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllRecipes() {
        try {
            return ResponseEntity.ok(new ApiResponse(true, "Success", recipeService.getAllRecipes(), null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred.", null, e.getMessage()));
        }
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<ApiResponse> getRecipeById(@PathVariable String recipeId) {
        try {
            return ResponseEntity.ok(new ApiResponse(true, "Success", recipeService.getRecipeById(recipeId), null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred.", null, e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createNewRecipe(@RequestBody Recipe recipe) {
        try {
            return ResponseEntity.ok(new ApiResponse(true, "Success", recipeService.createRecipe(recipe), null));
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred.", null, e.getMessage()));
        }
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<ApiResponse> updateRecipe(@PathVariable String recipeId, @RequestBody Map<String, String> updatedValues) {
        try {
            recipeService.updateRecipe(recipeId, updatedValues);
            return ResponseEntity.ok(new ApiResponse(true, "Update Success", null, null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred.", null, e.getMessage()));
        }
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<ApiResponse> deleteRecipe(@PathVariable String recipeId) {
        try {
            recipeService.deleteRecipe(recipeId);
            return ResponseEntity.ok(new ApiResponse(true, "Delete Success", null, null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred.", null, e.getMessage()));
        }
    }
}