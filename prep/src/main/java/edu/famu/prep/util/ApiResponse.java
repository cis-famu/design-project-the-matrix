package edu.famu.prep.util;

public record ApiResponse(boolean success, String message, Object data, Object error) {

}
