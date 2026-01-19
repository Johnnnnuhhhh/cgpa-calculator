// Grade mapping
const gradeToPoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "RA": 0
};

// Course data (same as Python)
const allSemesters = {
    1: { ... },  // SAME as before (omitted here for brevity)
    2: { ... },
    3: { ... },
    4: { ... },
    5: { ... },
    6: { ... },
    7: { ... },
    8: { ... }
};

let currentSem = 1;
let overallPoints = 0;
let overallCredits = 0;
const app = document.getElementById("app");

// Start
showSemesterCard();

// Render sem card
function showSemesterCard() {
    app.innerHTML = `
        <div class="card">
            <h2>Semester ${currentSem}</h2>
            <p>Do you know your GPA for this semester?</p>
            <button class="btn" onclick="askGPA()">Yes</button>
            <button class="btn" onclick="askGrades()">No</button>
        </div>
    `;
}

// Ask GPA directly
function askGPA() {
    app.innerHTML = `
        <div class="card">
            <h2>Semester ${currentSem} GPA</h2>
            <input type="number" id="gpaInput" placeholder="Enter GPA (0-10)" step="0.01" min="0" max="10">
            <button class="btn" onclick="submitGPA()">Submit</button>
        </div>
    `;
}

function submitGPA() {
    const gpa = parseFloat(document.getElementById("gpaInput").value);
    if (isNaN(gpa) || gpa < 0 || gpa > 10) {
        alert("Enter a valid GPA");
        return;
    }

    const creditSum = Object.values(allSemesters[currentSem])
        .reduce((a,b) => a + b, 0);

    overallPoints += gpa * creditSum;
    overallCredits += creditSum;
    moveNext();
}

// Ask grades per subject
function askGrades() {
    let html = `<div class="card"><h2>Semester ${currentSem} Grades</h2>`;
    for (let course in allSemesters[currentSem]) {
        html += `
            <label>${course}</label>
            <select id="${course}">
                <option value="">Select grade</option>
                ${Object.keys(gradeToPoints).map(g => `<option>${g}</option>`).join("")}
            </select>
        `;
    }
    html += `<button class="btn" onclick="submitGrades()">Submit</button></div>`;
    app.innerHTML = html;
}

function submitGrades() {
    let semPoints = 0, semCredits = 0;
    for (let course in allSemesters[currentSem]) {
        const sel = document.getElementById(course).value;
        if (!sel) {
            alert("Select all grades");
            return;
        }
        const cr = allSemesters[currentSem][course];
        if (sel !== "RA") {
            semPoints += gradeToPoints[sel] * cr;
            semCredits += cr;
        }
    }
    overallPoints += semPoints;
    overallCredits += semCredits;
    moveNext();
}

// Next
function moveNext() {
    const curCGPA = (overallPoints / overallCredits).toFixed(2);

    if (currentSem === 8) {
        app.innerHTML = `<div class="result">🎉 Final CGPA: ${curCGPA}</div>`;
        return;
    }

    currentSem++;
    app.innerHTML = `
        <div class="card">
            <h3>CGPA till Sem ${currentSem - 1}: ${curCGPA}</h3>
            <button class="btn" onclick="showSemesterCard()">Continue</button>
        </div>
    `;
}
