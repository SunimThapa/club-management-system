import { apiRequest } from "./api.js";

export function registerForEvent(event_id){
    return apiRequest(
        "/registrations",
        {
            method: "POST",
            body: JSON.stringify({ event_id })
        }
    );
}

export function getMyRegistrations(){
    return apiRequest("/registrations/my", { method: "GET" });
}

export function getEventRegistrations(event_id){
    return apiRequest(`/registrations/event/${event_id}`, { method: "GET" });
}

export function cancelRegistration(id){
    return apiRequest(`/registrations/${id}`, { method: "DELETE" });
}