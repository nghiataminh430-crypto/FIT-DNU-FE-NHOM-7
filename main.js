const BASE_URL_1 =
"https://69f9a6bcc509a40d3aa2ef52.mockapi.io/api/v1";

const BASE_URL_2 =
"https://69f9a908c509a40d3aa2f5a9.mockapi.io/api/v1";

const API_patients_URL = `${BASE_URL_1}/patients`;
const API_medications_URL = `${BASE_URL_1}/medications`;
const API_schedules_URL = `${BASE_URL_2}/schedules`;

let patients = [];
let medications = [];
let schedules = [];

const list = document.getElementById("scheduleList");
const search = document.getElementById("search");

// ================= LOAD =================
async function loadData() {
    try {

        [patients, medications, schedules] = await Promise.all([
            fetch(API_patients_URL).then(r => r.json()),
            fetch(API_medications_URL).then(r => r.json()),
            fetch(API_schedules_URL).then(r => r.json())
        ]);

        renderSchedules();

    } catch (err) {
        console.error(err);
    }
}

// ================= RENDER =================
function renderSchedules() {

    const keyword = search.value.toLowerCase();

    const filtered = schedules.filter(s => {

        const patient = patients.find(
            p => p.id == s.patientId
        );

        return patient?.name
            ?.toLowerCase()
            .includes(keyword);
    });

    list.innerHTML = filtered.map(s => {

        const patient = patients.find(
            p => p.id == s.patientId
        );

        const med = medications.find(
            m => m.id == s.medicationId
        );

        return `
        <div class="card">
            <h3>👤 ${patient?.name || "Không rõ"}</h3>
            <p>💊 ${med?.name || "Không rõ"}</p>
            <p>⏰ ${new Date(s.time).toLocaleString("vi-VN")}</p>
        </div>
        `;

    }).join("");
}

// ================= SEARCH =================
search.addEventListener("input", renderSchedules);

// ================= INIT =================
loadData();