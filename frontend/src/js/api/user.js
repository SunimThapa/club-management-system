import { apiRequest } from "./api.js";

export function assignClubAdmin(userId, assignData){
    return apiRequest(
        `/users/${userId}/assignAdmin`,
        {
            method: "PATCH",
            body: JSON.stringify(assignData)
        }
    );
}

export function getMyProfile(){
    return apiRequest("/user/me", { method: "GET" });
}

export function updateMyProfile(userData){
    return apiRequest(
        "/user/me",
        {
            method: "PATCH",
            body: JSON.stringify(userData)
        }
    );
}

export function getAllUsers(){
    return apiRequest("/user", { method: "GET" });
}

export function getSingleUser(id){
    return apiRequest(`/user/${id}`, { method: "GET" });
}

export function deleteUser(id){
    return apiRequest(`/user/${id}`, { method: "DELETE" });
}