export function logout(){
    localStorage.removeItem("accessToken");
    window.location.href = "/login.html";
}

window.logout = logout;