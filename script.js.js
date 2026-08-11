// פונקציה לקריאת נתונים מהגוגל שיטס
function loadData() {
    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec')
        .then(response => response.json())
        .then(data => {
            // כאן אתה מעדכן את האלמנטים ב-HTML לפי המידע שחזר
            document.getElementById('display-area').innerText = data.someValue;
        })
        .catch(error => console.error('Error:', error));
}

// הפעלת הפונקציה בטעינת הדף
window.onload = loadData;


const webAppUrl = "https://script.google.com/macros/s/AKfycbyIj0AyqIjo9rA-uKJxBqbRkIr-xxg5lcIkqy1SoZUEUft9FBXTR-QuLKa4BW_C_SLS/exec";

function loadPersonalData() {
    const email = document.getElementById('user-email-input').value.trim();
    const pass = document.getElementById('user-pass-input').value.trim();
    
    if (!email || !pass) {
        alert("נא למלא מייל וסיסמה");
        return;
    }

    fetch(webAppUrl + "?action=personal&user=" + encodeURIComponent(email) + "&pass=" + encodeURIComponent(pass))
        .then(response => response.json())
        .then(data => {
            const displayArea = document.getElementById('display-area');
            if (data.success) {
                displayArea.innerText = "שלום " + data.name + ", היתרה שלך היא: ₪" + Number(data.amount || 0).toLocaleString();
            } else {
                displayArea.innerText = "";
                alert(data.message || "פרטים שגויים");
            }
        })
        .catch(error => console.error('Error:', error));
}

function setPassword() {
    const email = document.getElementById('user-email-input').value.trim();
    const newPassword = document.getElementById('new-pass-input').value.trim();
    
    if (!email || !newPassword) {
        alert("נא למלא כתובת מייל ואת הסיסמה החדשה שתרצה להגדיר");
        return;
    }

    fetch(webAppUrl, {
        method: "POST",
        body: JSON.stringify({ action: "set_password", email: email, newPassword: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error('Error:', error));
}