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