const defaultAvatars = [
    'assets/images/chillen.webp',
    'assets/images/denken.webp',
    'assets/images/gehen.webp',
    'assets/images/laufen.webp',
    'assets/images/lesen.webp',
    'assets/images/schlafen.webp',
    'assets/images/singen.webp',
    'assets/images/sitzen.webp',
    'assets/images/sport.webp',    
    'assets/images/springen.webp'
];

function getRandomAvatar() {
    return defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
}

function submitComment() {
    const username = document.getElementById('username').value;
    const avatar = document.getElementById('avatar').value;
    const commentText = document.getElementById('comment').value;
    const showName = document.getElementById('showName').checked;

    if (!username || !commentText) {
        alert("Все поля должны быть заполнены!");
        return;
    }

    const formattedUsername = formatName(username);
    const usernameInput = document.getElementById('username');
    if (formattedUsername.startsWith('Ошибка')) {
        usernameInput.setCustomValidity(formattedUsername); 
        usernameInput.reportValidity(); 
        usernameInput.classList.add('error'); 
        return;
    } else {
        usernameInput.setCustomValidity('');
        usernameInput.classList.remove('error'); 
        usernameInput.classList.add('valid'); 
    }
    const filteredComment = checkSpam(commentText);

    const finalAvatar = avatar ? avatar : getRandomAvatar();

    const commentList = document.getElementById('commentList');
    const newComment = document.createElement('li');
    newComment.classList.add('comment');
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); 

    newComment.innerHTML = `
        <img src="${finalAvatar}" alt="${formattedUsername}" />
        <div class="comment-text">
            <div class="comment-header">
                <strong>${showName ? formattedUsername : 'username'}</strong>
                <p class="comment-time">Комментарий оставлен: ${formattedDate}</p>
            </div>
            <p>${filteredComment}</p>
        </div>
    `;
    
   // console.log(finalAvatar, formattedUsername, filteredComment, formattedDate);

    commentList.prepend(newComment); 
    
    document.getElementById('username').value = '';
    document.getElementById('avatar').value = '';
    document.getElementById('comment').value = '';
}

function checkSpam(str) {
    const spamWords = ['viagra', 'xxx', 'ххх'];
    let result = str;
    spamWords.forEach(word => {
        const regex = new RegExp(word, 'gi'); 
        result = result.replace(regex, '***');
    });
    return result;
}

function formatName(name) {
    name = name.trim();
    const allowedCharsRegex = /^[a-zA-Zа-яА-ЯёЁ\s_&\d]+$/;  
    if (!allowedCharsRegex.test(name)) {
        return 'Ошибка: разрешены только буквы, пробелы, _ и &';
    }

    const hasDigitsInMiddle = /\d/.test(name) && !/\d$/.test(name); 
    if (hasDigitsInMiddle) {
        return 'Ошибка: цифры могут быть только в конце';
    }

    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

document.getElementById('username').addEventListener('click', function() {
    this.setCustomValidity(''); 
    this.classList.remove('error');
    this.classList.remove('valid');
});
