function login() {

    const username = document
        .getElementById("username")
        .value;

    const password = document
        .getElementById("password")
        .value;

    // tài khoản mẫu
    if (username === "admin" && password === "123456") {

        localStorage.setItem("isLogin", "true");

        window.location.href = "admin.html";

    } else {

        document.getElementById("error").innerText =
            "Sai tài khoản hoặc mật khẩu!";
    }
}