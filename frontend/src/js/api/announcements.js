import { apiRequest } from "./api.js";

export function createAnnouncement(announcementData){
    return apiRequest(
        "/announcements",
        {
            method: "POST",
            body: JSON.stringify(announcementData)
        }
    );
}

export function getAllAnnouncements(){
    return apiRequest("/announcements", { method: "GET" });
}

export function getSingleAnnouncement(id){
    return apiRequest(`/announcements/${id}`, { method: "GET" });
}

export function updateAnnouncement(id, announcementData){
    return apiRequest(
        `/announcements/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(announcementData)
        }
    );
}

export function deleteAnnouncement(id){
    return apiRequest(`/announcements/${id}`, { method: "DELETE" });
}