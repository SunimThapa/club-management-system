import { apiRequest } from "./api";

export function createClub (clubData){
    return apiRequest(
        "/club/register",
        {
            "method": "POST",
            "body": JSON.stringify(clubData)
    });
}
export function getAllClubs(){
    return apiRequest("/club", { method: "GET" });
}

export function getSingleClub(id){
    return apiRequest(`/club/${id}`, { method: "GET" });
}

export function updateClub(id, clubData){
    return apiRequest(
        `/club/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(clubData)
        }
    );
}

export function deleteClub(id){
    return apiRequest(`/club/${id}`, { method: "DELETE" });
}

export function joinClub(id){
    return apiRequest(`/club/${id}/join`, { method: "POST" });
}

export function leaveClub(){
    return apiRequest("/club/leave", { method: "POST" });
}