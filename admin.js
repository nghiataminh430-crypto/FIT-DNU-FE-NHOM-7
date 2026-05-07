const API_patients_URL = "https://69f9a6bcc509a40d3aa2ef52.mockapi.io/api/v1/patients";
const API_medications_URL = "https://69f9a6bcc509a40d3aa2ef52.mockapi.io/api/v1/medications";
const API_schedules_URL = "https://69f9a908c509a40d3aa2f5a9.mockapi.io/api/v1/schedules";

let patients = [];
let medications = [];
let schedules = [];
if (localStorage.getItem("isLogin") !== "true") {
    window.location.href = "login.html";
}
async function loadData() {
    try {
        [patients, medications, schedules] = await Promise.all([
            fetch(API_patients_URL).then(r => r.json()),
            fetch(API_medications_URL).then(r => r.json()),
            fetch(API_schedules_URL).then(r => r.json())
        ]);

        renderSelect("patientSelect", patients);
        renderSelect("medSelect", medications);
        renderSchedules();

    } catch (err) {
        console.error("Lỗi load data:", err);
    }
}

// ================= RENDER =================
function renderSelect(id, data) {
    const select = document.getElementById(id);

    select.innerHTML = data.map(item =>
        `<option value="${item.id}">${item.name}</option>`
    ).join("");
}

function renderSchedules() {
    const list = document.getElementById("scheduleList");

    list.innerHTML = schedules.map(s => {
        const patient = patients.find(p => p.id == s.patientId);
        const med = medications.find(m => m.id == s.medicationId);

        return `
        <div class="card">
            <p>👤 <b>${patient?.name || "?"}</b></p>
            <p>💊 ${med?.name || "?"}</p>
            <p>⏰ ${formatTime(s.time)}</p>

            <button onclick="deleteSchedule(${s.id})">🗑 Xóa</button>
        </div>
        `;
    }).join("");
}

// ================= FORMAT =================
function formatTime(time) {
    const d = new Date(time);
    return d.toLocaleString("vi-VN");
}

// ================= ADD =================
async function addPatient() {
    const name = document.getElementById("patientName").value.trim();

    if (!name) return alert("Nhập tên bệnh nhân!");

    await fetch(API_patients_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name })
    });

    document.getElementById("patientName").value = "";
    loadData();
}

async function addMedication() {
    const name = document.getElementById("medName").value.trim();

    if (!name) return alert("Nhập tên thuốc!");

    await fetch(API_medications_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name })
    });

    document.getElementById("medName").value = "";
    loadData();
}

async function addSchedule() {
    const patientId = document.getElementById("patientSelect").value;
    const medicationId = document.getElementById("medSelect").value;
    const time = document.getElementById("time").value;

    if (!time) return alert("Chọn thời gian!");

    await fetch(API_schedules_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            patientId,
            medicationId,
            time
        })
    });

    document.getElementById("time").value = "";
    loadData();
}

// ================= DELETE =================
async function deleteSchedule(id) {
    if (!confirm("Xóa lịch này?")) return;

    await fetch(`${API_schedules_URL}/${id}`, {
        method: "DELETE"
    });

    loadData();
}

// ================= BONUS: DELETE PATIENT / MED =================
// (nếu muốn nâng cấp thêm nút xóa riêng)

async function deletePatient(id) {
    await fetch(`${API_patients_URL}/${id}`, { method: "DELETE" });
    loadData();
}

async function deleteMedication(id) {
    await fetch(`${API_medications_URL}/${id}`, { method: "DELETE" });
    loadData();
}

// ================= INIT =================
loadData();
function logout() {

    localStorage.removeItem("isLogin");

    window.location.href = "login.html";
}