function calculateDays() {
    const input = document.getElementById('birthdayInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const result = document.getElementById('result');

    
    if (!input) {
        errorMessage.style.display = 'block';
        result.textContent = "";
        return;
    }

    errorMessage.style.display = 'none';

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthDate = new Date(input);
    birthDate.setFullYear(currentYear);

    if (birthDate < currentDate) {
        birthDate.setFullYear(currentYear + 1);
    }

    const differenceInMs = birthDate - currentDate;
    const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    const verbForm = getVerbForm(daysLeft);
    const daysWord = getDaysWord(daysLeft);

    result.textContent = `${verbForm} ${daysLeft} ${daysWord} до дня рождения.`;
}

function getDaysWord(days) {
    if (days % 10 === 1 && days % 100 !== 11) {
        return 'день';
    } else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
        return 'дня';
    } else {
        return 'дней';
    }
}

function getVerbForm(days) {
    return days === 1 ? 'Остался' : 'Осталось';
}

document.getElementById('birthdayInput').addEventListener('input', () => {
    document.getElementById('errorMessage').style.display = 'none';
});
