import { apiRequest } from "./api";


export function registerUser (userData){

    return apiRequest(
        "/auth/register", 
        {
            method: "POST", 
            body: JSON.stringify(userData)
        }
    );

}
export function logIn (userData){
    return apiRequest(
        "/auth/login",
        {
            method: "POST",
            body: JSON.stringify(userData)
        }
    )
}