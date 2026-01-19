// Total credits per semester (ECE R2021)
const semesterCredits = {
    1: 22,
    2: 25,
    3: 24,
    4: 22,
    5: 21,
    6: 20,
    7: 16,
    8: 10
};

const container = document.getElementById("inputs");

// Create input fields
for (let sem = 1; sem <= 8; sem++) {
    container.innerHTML += `
        <div>
            <label>Semester ${sem} GPA:</label><br>
            <input type="number" step="0.01" min="0" max="10" id="sem${sem}">
        </div>
    `;
}

function calculateCGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    for (let sem = 1; sem <= 8; sem++) {
        const value = document.getElementById(`sem${sem}`).value;
        if (value !== "") {
            const gpa = parseFloat(value);
            totalPoints += gpa * semesterCredits[sem];
            totalCredits += semesterCredits[sem];
        }
    }

    if (totalCredits === 0) {
        document.getElementById("result").innerText =
            "❌ Enter at least one semester GPA";
        return;
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);
    document.getElementById("result").innerText =
        `✅ Your CGPA is ${cgpa}`;
}
