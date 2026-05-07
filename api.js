const API_patients_URL = "https://69f9a6bcc509a40d3aa2ef52.mockapi.io/api/v1/patients";
const API_medications_URL = "https://69f9a6bcc509a40d3aa2ef52.mockapi.io/api/v1/medications";
const API_schedules_URL = "https://69f9a908c509a40d3aa2f5a9.mockapi.io/api/v1/schedules";

// Load dữ liệu
async function loadData() {
    const [patients, meds, schedules] = await Promise.all([
        fetch(API_patients_URL).then(res => res.json()),
        fetch(API_medications_URL).then(res => res.json()),
        fetch(API_schedules_URL).then(res => res.json())
    ]);

    renderSelect("patientSelect", patients);
    renderSelect("medSelect", meds);
    renderSchedules(schedules, patients, meds);
}

// Hiển thị select
function renderSelect(id, data) {
    const select = document.getElementById(id);

    select.innerHTML = data.map(item =>
        `<option value="${item.id}">${item.name}</option>`
    ).join("");
}

// Hiển thị lịch uống
function renderSchedules(schedules, patients, meds) {
    const list = document.getElementById("scheduleList");

    list.innerHTML = schedules.map(schedule => {
        const patient = patients.find(p => p.id == schedule.patientId);
        const med = meds.find(m => m.id == schedule.medicationId);

        return `
            <div class="card">
                 ${patient?.name || "Không rõ"} <br>
                 ${med?.name || "Không rõ"} <br>
                 ${schedule.time} <br><br>
                <button onclick="deleteSchedule(${schedule.id})">Xóa</button>
            </div>
        `;
    }).join("");
}

// Thêm bệnh nhân
async function addPatient() {
    const name = document.getElementById("patientName").value;

    await fetch(API_patients_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    loadData();
}

// Thêm thuốc
async function addMedication() {
    const name = document.getElementById("medName").value;

    await fetch(API_medications_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    loadData();
}

// Tạo lịch
async function addSchedule() {
    const patientId = document.getElementById("patientSelect").value;
    const medicationId = document.getElementById("medSelect").value;
    const time = document.getElementById("time").value;

    await fetch(API_schedules_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            patientId,
            medicationId,
            time
        })
    });

    loadData();
}

// Xóa lịch
async function deleteSchedule(id) {
    await fetch(`${API_schedules_URL}/${id}`, {
        method: "DELETE"
    });

    loadData();
}

// Khởi động
loadData();