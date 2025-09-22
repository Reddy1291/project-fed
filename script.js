// ======== Register ========
function registerStudent(name, email, password) {
    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);
    localStorage.setItem("studentPassword", password);
    alert("Account created!");
    window.location.href = "index.html";
}

// ======== Login ========
function login(email, password, role) {
    if (role === "student") {
        let storedEmail = localStorage.getItem("studentEmail");
        let storedPassword = localStorage.getItem("studentPassword");
        if(email === storedEmail && password === storedPassword){
            window.location.href = "portfolio.html";
        } else alert("Invalid student credentials!");
    } else if (role === "admin") {
        if(email === "admin@school.com" && password === "admin123"){
            window.location.href = "admin.html";
        } else alert("Invalid admin credentials!");
    }
}

// ======== Portfolio ========
function loadStudentProfile() {
    document.getElementById("sName").innerText = localStorage.getItem("studentName");
    document.getElementById("sEmail").innerText = localStorage.getItem("studentEmail");

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let table = document.getElementById("projects");
    projects.forEach(p => {
        let row = table.insertRow();
        row.insertCell(0).innerText = p.title;
        row.insertCell(1).innerText = p.status;
    });
}

// ======== Add Project ========
function addProject(title, status) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push({title, status});
    localStorage.setItem("projects", JSON.stringify(projects));
}

// ======== Admin ========
function loadAdminView() {
    document.getElementById("sName").innerText = localStorage.getItem("studentName");
    document.getElementById("sEmail").innerText = localStorage.getItem("studentEmail");

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let table = document.getElementById("projects");
    projects.forEach(p => {
        let row = table.insertRow();
        row.insertCell(0).innerText = p.title;
        row.insertCell(1).innerText = p.status;
    });
}
