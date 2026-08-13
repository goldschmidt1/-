// כתובת ה-Web App של ה-Apps Script בגוגל
const webAppUrl = "https://script.google.com/macros/s/AKfycbwlSw_hSvJyfpBsYQFVZCetzBPCK4IJ9sSXcyZUAvl2RWQe6cOMQ1nWGDhqN3jqs_Qh/exec";

// פונקציה ראשונית לטעינת נתונים כלליים
function loadData() {
    fetch(webAppUrl)
        .then(response => response.json())
        .then(data => {
            console.log("נתונים כלליים נטענו בהצלחה", data);
        })
        .catch(error => console.error('Error:', error));
}

// פונקציה לטעינת הנתונים האישיים
function loadPersonalData() {
    const email = document.getElementById('user-email-input').value.trim();
    const pass = document.getElementById('user-pass-input').value.trim();
    const resultArea = document.getElementById('personal-result-area');
    const nameDisplay = document.getElementById('personal-name-display');
    const amountDisplay = document.getElementById('personal-amount-display');
    const setPassContainer = document.getElementById('set-password-container');

    if (!email || !pass) {
        alert("נא למלא מייל וסיסמה");
        return;
    }

    const requestUrl = `${webAppUrl}?action=personal&user=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            resultArea.style.display = 'block';
            if (data.success) {
                if (setPassContainer) setPassContainer.style.display = 'none';
                nameDisplay.innerText = "שלום, " + data.name;
                amountDisplay.innerText = "הנתונים שלך: ₪" + Number(data.amount || 0).toLocaleString();
            } else {
                nameDisplay.innerText = "שגיאה";
                amountDisplay.innerText = data.message;
                
                // בדיקה רחבה יותר האם ההודעה מכילה "לא מוגדרת" - כדי להציג את אזור ההגדרה
                if (setPassContainer) {
                    if (data.message && data.message.includes("לא מוגדרת")) {
                        setPassContainer.style.display = 'block';
                    } else {
                        setPassContainer.style.display = 'none';
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("אירעה שגיאה בתקשורת מול השרת");
        });
}

// פונקציה לשמירת סיסמה חדשה ושליחתה לגיליון
function saveNewPassword() {
    const emailInput = document.getElementById('user-email-input').value.trim();
    const newPassInput = document.getElementById('new-password-input').value.trim();

    if (!emailInput || !newPassInput) {
        alert("נא למלא כתובת מייל ואת הסיסמה החדשה שתרצה להגדיר");
        return;
    }

    const requestUrl = `${webAppUrl}?action=setPassword&user=${encodeURIComponent(emailInput)}&pass=${encodeURIComponent(newPassInput)}`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("הסיסמה הוגדרה בהצלחה! כעת תוכל להתחבר.");
                document.getElementById('user-pass-input').value = newPassInput; // עדכון השדה הראשי
                const setPassContainer = document.getElementById('set-password-container');
                if (setPassContainer) setPassContainer.style.display = 'none';
                loadPersonalData(); // טעינה מחדש להצגת הנתונים
            } else {
                alert("שגיאה בשמירת הסיסמה: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("אירעה שגיאה בתקשורת מול השרת");
        });
}

// הפעלת פונקציית הטעינה הכללית בעליית הדף
window.onload = loadData;