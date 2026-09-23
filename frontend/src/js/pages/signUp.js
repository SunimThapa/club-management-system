import { registerUser } from "../api/auth";
import { showToast } from "../components/toast";

const registerForm = document.querySelector("#signUp-form");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const signUp_btn= document.getElementById('signUp-btn');
    signUp_btn.disabled= true;
    signUp_btn.innerHTML="Signing Up..."

    const name = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = "member";

    try {
        const response = await registerUser({ name, email, password, role });

        registerForm.reset();
        localStorage.setItem('flashMessage', JSON.stringify({
            text: "Register successful!",
            type: "success"
        }));
        window.location.href = "/src/pages/logIn.html";
        signUp_btn.disabled= false;
        signUp_btn.innerHTML="Sign Up"
    

    } catch (error) {
        console.error("Registration failed:", error);
        signUp_btn.disabled= false;
        signUp_btn.innerHTML="Sign Up"
    
    }
});