// Lấy danh sách tài khoản
let accounts = JSON.parse(
    localStorage.getItem("accounts")
) || [

    {
        username: "admin",
        password: "123",
        role: "admin"
    }

];

// LOGIN
function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    let isLogin = false;

    // Duyệt tài khoản
    for(let i = 0; i < accounts.length; i++){

        let account = accounts[i];

        // Kiểm tra
        if(
            username === account.username &&
            password === account.password
        ){

            // Lưu user hiện tại
            localStorage.setItem(
                "currentUser",
                account.username
            );

            // Lưu role
            localStorage.setItem(
                "role",
                account.role
            );

            // Admin
            if(account.role === "admin"){

                window.location.href =
                    "admin.html";

            }

            // User
            else{

                window.location.href =
                    "index.html";

            }

            isLogin = true;

            break;
        }

    }

    // Sai tài khoản
    if(isLogin === false){

        alert("Sai tài khoản hoặc mật khẩu!");

    }

}

// REGISTER
function register(){

    const newUsername =
        document.getElementById("newUsername").value;

    const newPassword =
        document.getElementById("newPassword").value;

    // Kiểm tra rỗng
    if(
        newUsername === "" ||
        newPassword === ""
    ){

        alert("Vui lòng nhập đầy đủ!");

        return;
    }

    // Kiểm tra tài khoản tồn tại
    for(let i = 0; i < accounts.length; i++){

        if(accounts[i].username === newUsername){

            alert("Tài khoản đã tồn tại!");

            return;
        }

    }

    // Tạo tài khoản mới
    const newAccount = {

        username: newUsername,

        password: newPassword,

        role: "user"

    };

    // Thêm vào mảng
    accounts.push(newAccount);

    // Lưu localStorage
    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );

    alert("Tạo tài khoản thành công!");

    // Clear input
    document.getElementById("newUsername").value = "";

    document.getElementById("newPassword").value = "";

}
// Mở popup
function openRegister(){

    document.getElementById(
        "registerModal"
    ).style.display = "flex";

}

// Đóng popup
function closeRegister(){

    document.getElementById(
        "registerModal"
    ).style.display = "none";

}
closeRegister();
alert("Tạo tài khoản thành công!");

closeRegister();
// Hiện form đăng ký
function showRegister(){

    document.getElementById(
        "loginForm"
    ).classList.add("hidden");

    document.getElementById(
        "registerForm"
    ).classList.remove("hidden");

}

// Quay lại login
function showLogin(){

    document.getElementById(
        "registerForm"
    ).classList.add("hidden");

    document.getElementById(
        "loginForm"
    ).classList.remove("hidden");

}
showLogin();
alert("Tạo tài khoản thành công!");

showLogin();
let isOpen = false;

function openRegister(){

    const container =
        document.getElementById(
            "registerContainer"
        );

    // Nếu đang mở thì đóng
    if(isOpen){

        container.innerHTML = "";

        isOpen = false;

        return;
    }

    // Render form
    container.innerHTML = `

        <div class="register-box">

            <h3>Tạo tài khoản</h3>

            <div class="input-box">

                <label>Tài khoản mới</label>

                <div class="input-wrapper">

                    <i class="fa-solid fa-user-plus"></i>

                    <input
                        type="text"
                        id="newUsername"
                        placeholder="Nhập tài khoản mới"
                    >

                </div>

            </div>

            <div class="input-box">

                <label>Mật khẩu mới</label>

                <div class="input-wrapper">

                    <i class="fa-solid fa-lock"></i>

                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Nhập mật khẩu mới"
                    >

                </div>

            </div>

            <button
                class="login-btn"
                onclick="register()">

                <i class="fa-solid fa-user-plus"></i>

                Tạo tài khoản

            </button>

        </div>

    `;

    isOpen = true;
}
// TẠO TÀI KHOẢN
function register() {

    const username =
        document.getElementById(
            "newUsername"
        ).value;

    const password =
        document.getElementById(
            "newPassword"
        ).value;

    if (
        username === "" ||
        password === ""
    ) {
        alert("Nhập đầy đủ thông tin");

        return;
    }

    // Kiểm tra trùng tài khoản
    for (let i = 0; i < accounts.length; i++) {

        if (
            accounts[i].username
            === username
        ) {

            alert(
                "Tài khoản đã tồn tại!"
            );

            return;
        }
    }

    // Thêm tài khoản
    accounts.push({

        username: username,

        password: password,

        role: "user"

    });

    // Lưu
    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );
}