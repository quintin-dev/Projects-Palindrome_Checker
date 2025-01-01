document.getElementById('check-btn').addEventListener('click', () => {
    const textInput = document.getElementById('text-input').value;
    const reverseAnimation = document.getElementById('reverse-animation');
    const finalWordDiv = document.getElementById('final-word');
    const resultDiv = document.getElementById('result');
    const successAudio = document.getElementById('success-audio');
    const errorAudio = document.getElementById('error-audio');
    const newYearAudio = document.getElementById('new-year-audio');
    const specialMessage = document.getElementById('special-message');

    reverseAnimation.innerHTML = '';
    finalWordDiv.textContent = '';
    resultDiv.textContent = '';
    document.body.className = '';
    specialMessage.classList.add('hidden');

    if (!textInput.trim()) {
        alert('Please input a value');
        return;
    }

    const originalText = textInput.trim();
    const cleanedText = originalText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedText = cleanedText.split('').reverse().join('');

    [...originalText].reverse().forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');
        span.style.animationDelay = `${i * 0.3}s`;
        reverseAnimation.appendChild(span);
    });

    setTimeout(() => {
        finalWordDiv.textContent = originalText;

        if (cleanedText === reversedText) {
            document.body.className = 'correct';
            resultDiv.innerHTML = `<div class="congratulations">${originalText} is a palindrome!</div>`;
            resultDiv.classList.remove('hidden');
            finalWordDiv.classList.remove('hidden');
            successAudio.play();
        } else if (cleanedText === '2025') {
            document.body.className = 'newYear';
            resultDiv.classList.add('hidden');
            finalWordDiv.classList.add('hidden');
            reverseAnimation.innerHTML = '';
            specialMessage.classList.remove('hidden');
            newYearAudio.play();
        } else {
            document.body.className = 'incorrect';
            resultDiv.innerHTML = `<div class="failure">${originalText} is not a palindrome</div>`;
            errorAudio.play();
            resultDiv.classList.remove('hidden');
            finalWordDiv.classList.remove('hidden');
        }
    }, originalText.length * 300 + 500);
});
