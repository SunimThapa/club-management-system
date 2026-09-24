import { apiRequest } from "./api.js";

export function markAttendance(event_id, user_id, status){
    return apiRequest(
        "/attendance",
        {
            method: "POST",
            body: JSON.stringify({ event_id, user_id, status })
        }
    );
}

export function bulkMarkAttendance(event_id, attendees){
    return apiRequest(
        "/attendance/bulk",
        {
            method: "POST",
            body: JSON.stringify({ event_id, attendees })
        }
    );
}

export function updateAttendance(id, status){
    return apiRequest(
        `/attendance/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify({ status })
        }
    );
}

export function getEventAttendance(event_id){
    return apiRequest(`/attendance/event/${event_id}`, { method: "GET" });
}

export function getMyAttendance(){
    return apiRequest("/event-attendance/my", { method: "GET" });
}