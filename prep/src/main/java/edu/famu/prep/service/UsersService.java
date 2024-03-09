package edu.famu.prep.service;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import edu.famu.prep.model.Users;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class UsersService {

    private Firestore firestore;

    public UsersService() {
        this.firestore = FirestoreClient.getFirestore();
    }

    public Users documentSnapshotToUser(DocumentSnapshot document) {
        Users user = null;
        if (document.exists()) {
            user = new Users(document.getString("Email"), document.getString("Role"), document.getString("UserID"), document.getString("Username"), document.getBoolean("ActiveStatus"));
        }
        return user;
    }

    public ArrayList<Users> getAllUsers() throws ExecutionException, InterruptedException {
        CollectionReference userCollection = firestore.collection("Users");
        ApiFuture<QuerySnapshot> future = userCollection.get();
        ArrayList<Users> userList = new ArrayList<>();
        for (DocumentSnapshot document : future.get().getDocuments()) {
            Users user = documentSnapshotToUser(document);
            if (user != null) {
                userList.add(user);
            }
        }
        return userList;
    }

    public Users getUserById(String userId) throws ExecutionException, InterruptedException {
        CollectionReference userCollection = firestore.collection("Users");
        ApiFuture<DocumentSnapshot> future = userCollection.document(userId).get();
        DocumentSnapshot document = future.get();
        return documentSnapshotToUser(document);
    }

    public String createUser(Users user) throws ExecutionException, InterruptedException {
        String userId = null;
        ApiFuture<DocumentReference> future = firestore.collection("Users").add(user);
        DocumentReference userRef = future.get();
        userId = userRef.getId();
        return userId;
    }

    public void updateUser(String id, Map<String, String> updatedValues) {
        String[] allowed = {"Email", "Role", "UserID", "Username", "ActiveStatus"};
        List<String> list = Arrays.asList(allowed);
        Map<String, Object> formattedValues = new HashMap<>();

        for (Map.Entry<String, String> entry : updatedValues.entrySet()) {
            String key = entry.getKey();
            if (list.contains(key)) {
                formattedValues.put(key, entry.getValue());
            }
        }
        DocumentReference userDoc = firestore.collection("Users").document(id);
        if (userDoc != null)
            userDoc.update(formattedValues);
    }
    public void deleteUser(String userId) {
        DocumentReference userDoc = firestore.collection("Users").document(userId);
        userDoc.delete();
    }
}