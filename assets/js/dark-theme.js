const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (localStorage.getItem('theme') === 'dark') {
    enableDarkMode();
    toggleBtn.checked = true;
} else {
    disableDarkMode();
    toggleBtn.checked = false;
}

toggleBtn.addEventListener('change', () => {
    if (toggleBtn.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";

    document.querySelectorAll('img, video, iframe').forEach(el => {
        el.style.filter = "invert(1) hue-rotate(180deg)";
    });

    themeIcon.textContent = '☀️';
    themeIcon.style.filter = "invert(1) hue-rotate(180deg)";
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    document.documentElement.style.filter = "none";

    document.querySelectorAll('img, video, iframe').forEach(el => {
        el.style.filter = "none";
    });

    themeIcon.textContent = '🌙';
    themeIcon.style.filter = "none";
    localStorage.setItem('theme', 'light');
}
