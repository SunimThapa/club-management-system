import { showToast } from "../js/components/toast";

window.addEventListener("error", (event) => {
    console.error("Uncaught error:", event.error || event.message);
    showToast("Something went wrong. Please refresh and try again.", "error");
});

window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    showToast(event.reason?.message || "Something went wrong. Please try again.", "error");
});