//fetch the stock from data.json and display
fetch('../data.json')
.then(response => response.json())
.then(stocks =>{
    const stockBody = document.getElementById('stockBody');

    stocks.forEach(stock => {
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${stock.symbol}</td>
    <td>${stock.name}</td>
    <td>${stock.price}</td>
    <td style="color:${stock.change.includes('-') ? 'red' : 'green'}">${stock.change}</td>
    <td>${stock.sector}</td>
    <td><button class="addBtn">Add to Watchlist</button></td>
`;

        row.querySelector('.addBtn').addEventListener('click',()=>
        {
            addToWatchlist(stock);
        });

        stockBody.appendChild(row); 
        
    });
})
.catch(err =>console.error("Error oading JSON:",err));

//store stock in localStorage
function addToWatchlist(stock)
{
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    //avoid dupli
    let exists = watchlist.some(item => item.symbol === stock.symbol);


    if(exists)
    {
            alert(stock.symbol + " already addedd!");
            return;
    }

    watchlist.push(stock);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(stock.symbol +" added to watchlist")
}
  document.getElementById("walletBalance").textContent =
      localStorage.getItem("wallet") || "0";


document.getElementById('walletDisplay').textContent =
    localStorage.getItem('walletBalance');
