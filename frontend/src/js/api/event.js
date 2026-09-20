import { apiRequest } from "./api.js";

export function createEvent(eventData){
    return apiRequest(
        "/events",
        {
            method: "POST",
            body: JSON.stringify(eventData)
        }
    );
}

export function getAllEvents(){
    return apiRequest("/events", { method: "GET" });
}

export function getSingleEvent(id){
    return apiRequest(`/events/${id}`, { method: "GET" });
}

export function updateEvent(id, eventData){
    return apiRequest(
        `/events/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(eventData)
        }
    );
}

export function deleteEvent(id){
    return apiRequest(`/events/${id}`, { method: "DELETE" });
}