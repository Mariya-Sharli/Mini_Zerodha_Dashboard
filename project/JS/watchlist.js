// ------------------- INITIALIZE WALLET -------------------
if (!localStorage.getItem("wallet")) {
    localStorage.setItem("wallet", "10000"); // Default ₹10,000
}

// ------------------- DISPLAY WALLET -------------------
function updateWalletDisplay() {
    document.getElementById("walletBalance").textContent =
        localStorage.getItem("wallet");
}

// ------------------- LOAD WATCHLIST -------------------
function loadWatchlist() {
    const watchlistBody = document.getElementById('watchlistBody');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        watchlistBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:20px;">
                    No stocks in Watchlist
                </td>
            </tr>`;
        updateWalletDisplay();
        return;
    }

    watchlistBody.innerHTML = "";

    watchlist.forEach(stock => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${stock.symbol}</td>
            <td>${stock.name}</td>
            <td>₹${stock.price}</td>
            <td style="color:${stock.change.includes("-") ? "red" : "green"};">
                ${stock.change}
            </td>
            <td>${stock.sector}</td>
            <td>
                <button class="buyBtn">Buy</button>
                <button class="removeBtn">Remove</button>
            </td>
        `;

        // BUY BUTTON
        row.querySelector(".buyBtn").addEventListener("click", () => {
            buyStock(stock);
        });

        // REMOVE BUTTON
        row.querySelector(".removeBtn").addEventListener("click", () => {
            removeFromWatchlist(stock.symbol);
        });

        watchlistBody.appendChild(row);
    });

    updateWalletDisplay();
}

// ------------------- BUY STOCK -------------------
function buyStock(stock) {
    let qty = prompt(`Enter quantity for ${stock.symbol}:`);

    if (!qty || isNaN(qty) || Number(qty) <= 0) {
        alert("Invalid quantity");
        return;
    }

    qty = Number(qty);

    let totalPrice = qty * stock.price;

    let wallet = Number(localStorage.getItem("wallet"));

    if (wallet < totalPrice) {
        alert(
`❌ NOT ENOUGH BALANCE ❌

Total Required: ₹${totalPrice}
Wallet Balance: ₹${wallet}

Please add money first.`
        );
        return;
    }

    // Deduct amount
    wallet -= totalPrice;
    localStorage.setItem("wallet", wallet);

    // Save to portfolio (optional)
    let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
    portfolio.push({
        symbol: stock.symbol,
        qty: qty,
        price: stock.price,
        total: totalPrice
    });
    localStorage.setItem("portfolio", JSON.stringify(portfolio));

    alert(
`✔ PURCHASE SUCCESSFUL ✔

${qty} × ₹${stock.price} = ₹${totalPrice}

Remaining Wallet Balance: ₹${wallet}`
    );

    updateWalletDisplay();
}

// ---------------- REMOVE FROM WATCHLIST ----------------
function removeFromWatchlist(symbol) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(item => item.symbol !== symbol);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    loadWatchlist();
}

// ------------------- ON PAGE LOAD -------------------
window.addEventListener("DOMContentLoaded", () => {
    updateWalletDisplay();
    loadWatchlist();
});
