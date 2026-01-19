// -------------------------------
// Grade to points mapping
// -------------------------------
const gradeToPoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "RA": 0
};

// -------------------------------
// Course details (same as Python)
// -------------------------------
const allSemesters = {
    1: {
        "HS3152 (Professional English - I)": 3,
        "MA3151 (Matrices and Calculus)": 4,
        "PH3151 (Engineering Physics)": 3,
        "CY3151 (Engineering Chemistry)": 3,
        "GE3151 (Problem Solving and Python Programming)": 3,
        "GE3152 (Heritage of Tamils)": 1,
        "GE3171 (PSPP Lab)": 2,
        "BS3171 (Physics & Chemistry Lab)": 2,
        "GE3172 (English Lab)": 1,
    },
    2: {
        "HS3252 (Professional English - II)": 2,
        "MA3251 (Statistics & Numerical Methods)": 4,
        "PH3254 (Physics for ECE)": 3,
        "BE3254 (Electrical & Instrumentation)": 3,
        "GE3251 (Engineering Graphics)": 4,
        "EC3251 (Circuit Analysis)": 4,
        "GE3252 (Tamils & Technology)": 1,
        "GE3271 (Engineering Practices Lab)": 2,
        "EC3271 (Circuit Analysis Lab)": 1,
        "GE3272 (Communication Lab)": 2,
    },
    3: {
        "MA3355 (Random Processes & LA)": 4,
        "CS3353 (C Programming & DS)": 3,
        "EC3354 (Signals & Systems)": 4,
        "EC3353 (EDC)": 3,
        "EC3351 (Control Systems)": 3,
        "EC3352 (DSD)": 4,
        "EC3361 (EDC Lab)": 1.5,
        "CS3362 (C & DS Lab)": 1.5,
        "GE3361 (Professional Development)": 1,
    },
    4: {
        "EC3452 (EMF)": 3,
        "EC3401 (Networks & Security)": 4,
        "EC3451 (LIC)": 3,
        "EC3492 (DSP)": 4,
        "EC3491 (Communication Systems)": 3,
        "GE3451 (EVS)": 2,
        "EC3461 (Comm Systems Lab)": 1.5,
        "EC3462 (LIC Lab)": 1.5,
    },
    5: {
        "EC3501 (Wireless Communication)": 4,
        "EC3552 (VLSI & Chip Design)": 3,
        "EC3551 (TL & RF)": 3,
        "Professional Elective I": 3,
        "Professional Elective II": 3,
        "Professional Elective III": 3,
        "EC3561 (VLSI Lab)": 2,
    },
    6: {
        "ET3491 (Embedded & IoT)": 4,
        "CS3491 (AI & ML)": 4,
        "Open Elective I": 3,
        "Professional Elective IV": 3,
        "Professional Elective V": 3,
        "Professional Elective VI": 3,
    },
    7: {
        "GE3791 (Human Values & Ethics)": 2,
        "Elective – Management": 3,
        "Open Elective II": 3,
        "Open Elective III": 3,
        "Open Elective IV": 3,
        "EC3711 (Summer Internship)": 2,
    },
    8: {
        "EC3811 (Project Work)": 10,
    }
};

// -------------------------------
// App State
// -------------------------------
let currentSem = 1;
let overallPoints = 0;
let overallCredits = 0;

const app = document.getElementById("app");

// -------------------------------
// Start App
// -------------------------------
renderSemester();

// -------------------------------
// Render Semester Choice
// -------------------------------
function renderSemester() {
    app.innerHTML = `
        <h2>Semester ${currentSem}</h2>
        <p>Do you know the GPA for this semester?</p>
        <button onclick="renderGPAInput()">Yes</button>
        <button onclick="renderSubjectInput()">No</button>
    `;
}

// -------------------------------
// GPA Input Mode
// -------------------------------
function renderGPAInput() {
    app.innerHTML = `
        <h2>Semester ${currentSem}</h2>
        <p>Enter GPA:</p>
        <input type="number" step="0.01" id="semGPA">
        <br><br>
        <button onclick="submitGPA()">Submit</button>
    `;
}

function submitGPA() {
    const gpa = parseFloat(document.getElementById("semGPA").value);
    if (isNaN(gpa)) {
        alert("Enter valid GPA");
        return;
    }

    const credits = Object.values(allSemesters[currentSem])
        .reduce((a, b) => a + b, 0);

    overallPoints += gpa * credits;
    overallCredits += credits;

    nextSemester();
}

// -------------------------------
// Subject-wise Mode
// -------------------------------
function renderSubjectInput() {
    let html = `<h2>Semester ${currentSem}</h2>`;

    for (let course in allSemesters[currentSem]) {
        html += `
            <label>${course}</label><br>
            <select id="${course}">
                <option value="">Select Grade</option>
                ${Object.keys(gradeToPoints)
                    .map(g => `<option value="${g}">${g}</option>`)
                    .join("")}
            </select><br><br>
        `;
    }

    html += `<button onclick="submitSubjects()">Submit</button>`;
    app.innerHTML = html;
}

function submitSubjects() {
    let semPoints = 0;
    let semCredits = 0;

    for (let course in allSemesters[currentSem]) {
        const grade = document.getElementById(course).value;
        const credits = allSemesters[currentSem][course];

        if (!grade) {
            alert("Select all grades");
            return;
        }

        if (grade !== "RA") {
            semPoints += gradeToPoints[grade] * credits;
            semCredits += credits;
        }
    }

    overallPoints += semPoints;
    overallCredits += semCredits;

    nextSemester();
}

// -------------------------------
// Move to Next Semester
// -------------------------------
function nextSemester() {
    const cgpa = (overallPoints / overallCredits).toFixed(2);

    if (currentSem === 8) {
        app.innerHTML = `<h2>🎉 Final CGPA: ${cgpa}</h2>`;
        return;
    }

    currentSem++;
    app.innerHTML = `
        <h3>CGPA till Semester ${currentSem - 1}: ${cgpa}</h3>
        <button onclick="renderSemester()">Continue</button>
    `;
}
