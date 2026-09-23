import { logIn } from "../api/auth";
import { showToast } from "../components/toast";

document.addEventListener('DOMContentLoaded', () => {
    const flash = localStorage.getItem('flashMessage');
    if (flash) {
        const { text, type } = JSON.parse(flash);
        showToast(text, type);
        localStorage.removeItem('flashMessage');
    }
});
const logInForm = document.getElementById("logInForm");

logInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const signIn_btn =document.getElementById("signIn-btn");
    signIn_btn.disabled = true;
    signIn_btn.innerHTML ="Signing in ..."

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await logIn({ email, password });

        localStorage.setItem('accessToken', response.data.accessToken);

        localStorage.setItem('flashMessage', JSON.stringify({
            text: "Login successful!",
            type: "success"
        }));
    
        window.location.href ="/src/pages/dashboard.html";
    
       

    } catch (error) {
        console.error("LogIn failed:", error);
        signIn_btn.disabled= false;
        signIn_btn.innerHTML ="Sign in"
    }
});


