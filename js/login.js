function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    // ADMIN

    if (
        username === "admin" &&
        password === "123"
    ) {

        localStorage.setItem(
            "role",
            "admin"
        );

        window.location.href =
            "admin.html";

        return;
    }

    // USER

    if (
        username === "user" &&
        password === "123"
    ) {

        localStorage.setItem(
            "role",
            "user"
        );

        window.location.href =
            "index.html";

        return;
    }

    alert("Sai tài khoản hoặc mật khẩu!");
}
