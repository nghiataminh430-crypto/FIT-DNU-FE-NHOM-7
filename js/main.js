const role =
    localStorage.getItem("role");

// KIỂM TRA ROLE

if (role !== "user") {

    window.location.href =
        "login.html";
}

// LOGOUT

const logoutBtn =
    document.querySelector(".logout-btn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("role");

        window.location.href =
            "login.html";
    });
}
$(document).ready(function () {

    $(".menu-item").click(function () {

        let tab = $(this).data("tab");

        // đổi active menu
        $(".menu-item").removeClass("active");
        $(this).addClass("active");

        // ẩn tất cả tab
        $(".tab-content").removeClass("active-tab");

        // hiện tab được chọn
        $("#" + tab).addClass("active-tab");

    });

});
// HIỂN THỊ DỮ LIỆU

function renderSchedules(
    schedules,
    patients,
    meds
) {

    const list =
        document.getElementById("scheduleList");

    const historyList =
        document.getElementById("historyList");

    const totalSchedules =
        document.getElementById("totalSchedules");

    // KIỂM TRA ELEMENT

    if (!list || !historyList) return;

    // TỔNG SỐ LỊCH

    if (totalSchedules) {

        totalSchedules.innerText =
            schedules.length;
    }

    // CHƯA UỐNG

    const pendingSchedules =
        schedules.filter(
            schedule => !schedule.taken
        );

    // ĐÃ UỐNG

    const takenSchedules =
        schedules.filter(
            schedule => schedule.taken
        );

    // =========================
    // LỊCH HÔM NAY
    // =========================

    if (pendingSchedules.length > 0) {

        list.innerHTML =
            pendingSchedules.map(schedule => {

                const patient =
                    patients.find(
                        p => p.id == schedule.patientId
                    );

                const med =
                    meds.find(
                        m => m.id == schedule.medicationId
                    );

                return `

            <div class="schedule-card">

                <div class="schedule-info">

                    <h3>
                        💊 ${med?.name || "Không rõ"}
                    </h3>

                    <p>

                        👤 ${patient?.name || "Không rõ"}

                        <br>

                        ⏰ ${schedule.time}

                    </p>

                </div>

                <div class="schedule-actions">

                    <span class="status pending">

                        Chưa uống

                    </span>

                    <button
                        class="take-btn"
                        onclick="toggleTaken(
                            '${schedule.id}',
                            ${schedule.taken}
                        )"
                    >

                        Đánh dấu

                    </button>

                </div>

            </div>

            `;

            }).join("");

    } else {

        list.innerHTML = `

        <div class="schedule-card">

            <div class="schedule-info">

                <h3>
                    🎉 Hoàn thành
                </h3>

                <p>
                    Bạn đã uống hết thuốc hôm nay.
                </p>

            </div>

        </div>

        `;
    }

    // =========================
    // LỊCH SỬ ĐÃ UỐNG
    // =========================

    if (takenSchedules.length > 0) {

        historyList.innerHTML =
            takenSchedules.map(schedule => {

                const patient =
                    patients.find(
                        p => p.id == schedule.patientId
                    );

                const med =
                    meds.find(
                        m => m.id == schedule.medicationId
                    );

                return `

            <div class="history-card">

                <div class="history-info">

                    <h3>
                        💊 ${med?.name || "Không rõ"}
                    </h3>

                    <p>

                        👤 ${patient?.name || "Không rõ"}

                        <br>

                        ⏰ ${schedule.time}

                    </p>

                </div>

                <div class="history-badge">

                    ✔ Đã uống

                </div>

            </div>

            `;

            }).join("");

    } else {

        historyList.innerHTML = `

        <div class="schedule-card">

            <div class="schedule-info">

                <h3>
                    Chưa có lịch sử
                </h3>

                <p>
                    Thuốc đã uống sẽ hiển thị ở đây.
                </p>

            </div>

        </div>

        `;
    }
}

// ĐÁNH DẤU ĐÃ UỐNG

async function toggleTaken(
    id,
    currentStatus
) {

    try {

        await fetch(

            `${API_schedules_URL}/${id}`,

            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    taken: !currentStatus
                })
            }
        );

        // LOAD LẠI

        loadData();

    } catch (error) {

        console.log(error);

        alert("Cập nhật thất bại!");
    }
}

// LOAD

loadData();