// function addMoney() {
//     let amount = Number(document.getElementById("amount").value);
    
//     if (amount <= 0 || isNaN(amount)) {
//         document.getElementById("message").textContent = "Enter a valid amount!";
//         return;
//     }

//     let wallet = Number(localStorage.getItem("wallet") || 0);
//     wallet += amount;

//     localStorage.setItem("wallet", wallet.toString());

//     document.getElementById("message").textContent = 
//         `₹${amount} added successfully! Current Balance: ₹${wallet}`;
// }
// // ------------------- INITIALIZE WALLET -------------------
// if (!localStorage.getItem("wallet")) {
//     localStorage.setItem("wallet", "10000"); // Default ₹10,000
// }
// // ------------------- DISPLAY WALLET -------------------
// function updateWalletDisplay() {
//     document.getElementById("walletBalance").textContent =
//         localStorage.getItem("wallet");
// }


// ------------------- INITIALIZE WALLET -------------------
if (!localStorage.getItem("wallet")) {
    localStorage.setItem("wallet", "10000"); // Default ₹10,000
}

// ------------------- ADD MONEY -------------------
function addMoney() {
    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0 || isNaN(amount)) {
        document.getElementById("message").textContent = "Enter a valid amount!";
        return;
    }

    let wallet = Number(localStorage.getItem("wallet"));
    wallet += amount;

    localStorage.setItem("wallet", wallet.toString());

    document.getElementById("message").textContent = 
        `₹${amount} added successfully! Current Balance: ₹${wallet}`;

    updateWalletDisplay();  // <-- IMPORTANT
}

// ------------------- DISPLAY WALLET -------------------
function updateWalletDisplay() {
    document.getElementById("walletBalance").textContent =
        localStorage.getItem("wallet");
}

// ------------------- RUN ON LOAD -------------------
window.onload = updateWalletDisplay;
