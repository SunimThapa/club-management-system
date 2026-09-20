const API_Base_URL = 'http://localhost:5000/api/v1';
import { showToast } from "../components/toast";

export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(
        `${API_Base_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                ...options.headers
            }
        }
    );

    if (response.status === 401) {
        localStorage.removeItem('accessToken');
        showToast("Your session has expired. Please log in again.", "error");

        setTimeout(() => {
            window.location.href = '/login';
        }, 1500);

        throw new Error("Session expired");
    }

    const data = await response.json();
    if (!response.ok) {
        showToast(data.message || "Something went wrong", "error");
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}