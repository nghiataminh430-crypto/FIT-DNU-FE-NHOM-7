const role =
    localStorage.getItem("role");

// KIỂM TRA ROLE

if (role !== "admin") {

    window.location.href =
        "login.html";
}

// LOGOUT

document
    .querySelector(".logout-btn")
    .addEventListener("click", () => {

        localStorage.removeItem("role");

        window.location.href =
            "login.html";
    });

// HIỂN THỊ LỊCH

function renderSchedules(
    schedules,
    patients,
    meds
) {

    const list =
        document.getElementById("scheduleList");

    list.innerHTML = schedules.map(schedule => {

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

                    <br>

                    📌 Trạng thái:
                    ${schedule.taken
                ? "Đã uống"
                : "Chưa uống"
            }

                </p>

            </div>

            <div class="schedule-actions">

                <button
                    class="delete-btn"
                    onclick="deleteSchedule('${schedule.id}')"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        </div>

        `;

    }).join("");
}

// TẠO LỊCH

async function createFullSchedule() {

    const patientName =
        document.getElementById("patientName").value;

    const medName =
        document.getElementById("medName").value;

    const time =
        document.getElementById("time").value;

    if (
        !patientName ||
        !medName ||
        !time
    ) {

        alert("Vui lòng nhập đầy đủ!");

        return;
    }

    try {

        // THÊM BỆNH NHÂN

        const patientRes = await fetch(
            API_patients_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: patientName
                })
            }
        );

        const patient =
            await patientRes.json();

        // THÊM THUỐC

        const medRes = await fetch(
            API_medications_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: medName
                })
            }
        );

        const med =
            await medRes.json();

        // TẠO LỊCH

        await fetch(
            API_schedules_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    patientId: patient.id,

                    medicationId: med.id,

                    time: time,

                    taken: false
                })
            }
        );

        // RESET FORM

        document.getElementById(
            "patientName"
        ).value = "";

        document.getElementById(
            "medName"
        ).value = "";

        document.getElementById(
            "time"
        ).value = "";

        // LOAD LẠI

        loadData();

        alert("Tạo lịch thành công!");

    } catch (error) {

        console.log(error);

        alert("Có lỗi xảy ra!");
    }
}

// LOAD

loadData();