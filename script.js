document.getElementById('check-btn').addEventListener('click', () => {
    const textInput = document.getElementById('text-input').value;
    const wordDisplay = document.getElementById('word-display');
    const resultDiv = document.getElementById('result');
    const successAudio = document.getElementById('success-audio');
    const errorAudio = document.getElementById('error-audio');

    if (!textInput.trim()) {
        alert('Please input a value');
        return;
    }

    const originalText = textInput.trim();
    const cleanedText = originalText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedText = cleanedText.split('').reverse().join('');

    // Clear previous word display
    wordDisplay.innerHTML = '';

    // Display the word in individual letters
    [...originalText].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');
        span.style.animationDelay = `${i * 0.1}s`;
        wordDisplay.appendChild(span);
    });

    // Add animation
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, i) => {
        setTimeout(() => {
            letter.style.transform = 'rotateY(180deg)';
        }, i * 100);
    });

    // Check if the word is a palindrome after animation
    setTimeout(() => {
        if (cleanedText === reversedText) {
            document.body.className = 'correct';
            resultDiv.innerHTML = `<div class="congratulations">${originalText} is a palindrome!</div>`;
            successAudio.play();
        } else {
            document.body.className = 'incorrect';
            resultDiv.innerHTML = `<div class="failure">${originalText} is not a palindrome</div>`;
            errorAudio.play();
        }
    }, letters.length * 100 + 1000);
});
