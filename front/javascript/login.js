// async function login(event) {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const senha = document.getElementById('password').value;

//     const data = {email, senha};
//     console.log(data);

//     const response = await fetch('http://localhost:3000/api/login', {
//         method: "POST",
//         headers: {
//             "Content-Type":"application/json;charset=UTF-8"
//         },
//         body: JSON.stringify(data)
//     });

//     const results = await response.json();
//     console.log(results)
//     if(results.success) {
//         results.data
//         alert(results.message);
//         localStorage.setItem('id', results.data.id)
//             Id_User = localStorage.getItem('id');
//             console.log(`ID do usuário: ${Id_User}`);
//     } else {
//         alert(results.message);
//     }
// }

function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/front/html/home.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}