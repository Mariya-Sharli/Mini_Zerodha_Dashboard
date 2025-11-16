// // Load portfolio and render
// function loadPortfolio() {
//     const portfolioBody = document.getElementById("portfolioBody");
//     const portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
//     let wallet = Number(localStorage.getItem("wallet") || 0);

//     document.getElementById("walletBalance").textContent = wallet;

//     if (portfolio.length === 0) {
//         portfolioBody.innerHTML = `
//             <tr><td colspan="5" style="text-align:center;padding:20px;">No stocks bought yet</td></tr>
//         `;
//         return;
//     }

//     portfolioBody.innerHTML = "";
//     portfolio.forEach((item, index) => {
//         const row = document.createElement("tr");

//         row.innerHTML = `
//             <td>${item.symbol}</td>
//             <td>₹${item.price}</td>
//             <td>${item.qty}</td>
//             <td>₹${item.total}</td>
//             <td><button onclick="sellStock(${index})">Sell</button></td>
//         `;

//         portfolioBody.appendChild(row);
//     });
// }

// // Sell a stock
// function sellStock(index) {
//     let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
//     let wallet = Number(localStorage.getItem("wallet") || 0);

//     const stock = portfolio[index];

//     // Ask user how many to sell
//     const sellQty = Number(prompt(`How many of ${stock.symbol} do you want to sell?`));

//     if (!sellQty || sellQty <= 0 || sellQty > stock.qty) {
//         alert("Invalid quantity.");
//         return;
//     }

//     const creditAmount = stock.price * sellQty;
//     wallet += creditAmount;

//     // Update wallet
//     localStorage.setItem("wallet", wallet.toString());

//     // Update or remove from portfolio
//     if (sellQty === stock.qty) {
//         // remove entire stock
//         portfolio.splice(index, 1);
//     } else {
//         // reduce quantity
//         stock.qty -= sellQty;
//         stock.total = stock.qty * stock.price;
//     }

//     localStorage.setItem("portfolio", JSON.stringify(portfolio));

//     alert(`
// ✔ SELL SUCCESSFUL
// Sold ${sellQty} × ₹${stock.price} = ₹${creditAmount}
// New Wallet Balance: ₹${wallet}
// `);

//     loadPortfolio(); // Refresh table
// }

// window.onload = loadPortfolio;


// Load Portfolio
function loadPortfolio() {
    const portfolioBody = document.getElementById("portfolioBody");
    const portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    const wallet = Number(localStorage.getItem("wallet") || 0);

    document.getElementById("walletBalance").textContent = wallet;

    if (portfolio.length === 0) {
        portfolioBody.innerHTML = `
            <tr><td colspan="5" style="text-align:center;">No stocks bought yet</td></tr>
        `;
        return;
    }

    portfolioBody.innerHTML = "";
    portfolio.forEach((item, index) => {
        portfolioBody.innerHTML += `
            <tr>
                <td>${item.symbol}</td>
                <td>₹${item.price}</td>
                <td>${item.qty}</td>
                <td>₹${item.total}</td>
                <td><button onclick="sellStock(${index})">Sell</button></td>
            </tr>
        `;
    });
}

// SELL STOCK
function sellStock(index) {
    let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    let wallet = Number(localStorage.getItem("wallet") || 0);

    const item = portfolio[index];

    const sellQty = Number(prompt(`Enter quantity to sell for ${item.symbol}:`, 1));

    if (!sellQty || sellQty <= 0 || sellQty > item.qty) {
        alert("Invalid Quantity");
        return;
    }

    const credit = sellQty * item.price;
    wallet += credit;

    // Update wallet
    localStorage.setItem("wallet", wallet);

    // Update portfolio
    if (sellQty === item.qty) {
        portfolio.splice(index, 1);
    } else {
        item.qty -= sellQty;
        item.total = item.qty * item.price;
    }

    localStorage.setItem("portfolio", JSON.stringify(portfolio));

    alert(`Sold ${sellQty} × ₹${item.price} = ₹${credit}\nWallet: ₹${wallet}`);

    loadPortfolio();
}
// ------------------- INITIALIZE WALLET -------------------
if (!localStorage.getItem("wallet")) {
    localStorage.setItem("wallet", "10000"); // Default ₹10,000
}

// ------------------- DISPLAY WALLET -------------------
function updateWalletDisplay() {
    document.getElementById("walletBalance").textContent =
        localStorage.getItem("wallet");
}


window.onload = loadPortfolio;
