document.addEventListener('DOMContentLoaded', function() {
    const clock = document.getElementById('clock');
    const toggleSecondsButton = document.getElementById('toggle-seconds');
    const targetDateInput = document.getElementById('target-date');
    const setCountdownButton = document.getElementById('set-countdown');
    const backToClockButton = document.getElementById('back-to-clock');
    const getJokeButton = document.getElementById('get-joke');
    const jokeText = document.getElementById('joke-text');
    const backgroundColorSelect = document.getElementById('background-color');

    let showSeconds = true;
    let countdownInterval;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
    }

    function startClock() {
        clearInterval(countdownInterval);
        updateClock();
        countdownInterval = setInterval(updateClock, 1000);
    }

    toggleSecondsButton.addEventListener('click', () => {
        showSeconds = !showSeconds;
        updateClock();
    });

    setCountdownButton.addEventListener('click', () => {
        const targetDate = new Date(targetDateInput.value);
        if (isNaN(targetDate.getTime())) return; 

        clearInterval(countdownInterval);

        function updateCountdown() {
            const now = new Date();
            const timeDifference = targetDate - now;

            if (timeDifference <= 0) {
                clock.textContent = '00:00:00';
                clearInterval(countdownInterval);
            } else {
                const hours = String(Math.floor(timeDifference / (1000 * 60 * 60))).padStart(2, '0');
                const minutes = String(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                const seconds = String(Math.floor((timeDifference % (1000 * 60)) / 1000)).padStart(2, '0');
                clock.textContent = `${hours}:${minutes}:${seconds}`;
            }
        }

        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    });

    backToClockButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        startClock();
    });

    const jokes = [
        "I can’t believe they fired me from the clock factory. After all those extra hours I put in.",
        "I made a belt out of clocks. That was a waist of time.",
        "Why did the man throw the clock out the window? Because he wanted to see time fly.",
        "What happens when you annoy a clock? It gets ticked off."
    ];

    getJokeButton.addEventListener('click', () => {
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        jokeText.textContent = joke;
        jokeText.style.display = 'block';
        setTimeout(() => {
            jokeText.style.display = 'none';
        }, 5000);
    });

    backgroundColorSelect.addEventListener('change', () => {
        const selectedColor = backgroundColorSelect.value;
        document.body.style.backgroundColor = selectedColor;
        localStorage.setItem('backgroundColor', selectedColor);
    });

    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        backgroundColorSelect.value = savedColor;
    }

    startClock();
});
