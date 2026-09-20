const TOAST_DURATION = 3000;

function ensureToastContainer(){
    let container = document.getElementById("toastContainer");
    if (!container){
        container = document.createElement("div");
        container.id = "toastContainer";
        document.body.appendChild(container);
    }
    return container;
}

export function showToast(message, type = "info"){
    const container = ensureToastContainer();

    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `toast toast-${type}`;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, TOAST_DURATION);
}