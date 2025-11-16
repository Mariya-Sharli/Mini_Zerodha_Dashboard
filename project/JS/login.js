function login()
{
    let email = document.getElementById('email').value
    let password = document.getElementById('pass').value

    let users = JSON.parse(localStorage.getItem('users')) || []


    let user = users.find(u=>{
        return u.email === email && u.password === password
    })
            // Initialize wallet if not present
        if (!localStorage.getItem("wallet")) {
            localStorage.setItem("wallet", "0");
        }


    if(user)
    {
        sessionStorage.setItem('loggedUser',JSON.stringify(user));
        document.getElementById('message').textContent = "Login Successfully!!"

        setTimeout(()=>
        {
            window.location.href = "userDashboard.html";
        })
    }
    else{
        document.getElementById('message').textContent = "Invalid Credentials :("
    }

}