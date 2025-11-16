function register()
{
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('pass').value
    let phone = document.getElementById('ph').value



    //get the registered data
    let users = JSON.parse(localStorage.getItem("users")) || []

    //if already exist
    let existuser = users.some(u=>u.email === email);
    if(existuser)
    {
        document.getElementById('message').textContent = "Email already Exists"
        return ;
    }

    users.push({name,email,password,phone});

    localStorage.setItem('users',JSON.stringify(users))


    document.getElementById('message').textContent = "Registered successfully!! Now Login"


    setTimeout(()=>{
        window.location.href = "login.html"
    },1500);
    
}