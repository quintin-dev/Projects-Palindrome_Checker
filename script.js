document.getElementById('check-btn').addEventListener('click', () => {
    const textInput = document.getElementById('text-input').value;
    const reverseAnimation = document.getElementById('reverse-animation');
    const finalWordDiv = document.getElementById('final-word');
    const resultDiv = document.getElementById('result');
    const successAudio = document.getElementById('success-audio');
    const errorAudio = document.getElementById('error-audio');

    // Clear previous content
    reverseAnimation.innerHTML = '';
    finalWordDiv.textContent = '';
    resultDiv.textContent = '';
    document.body.className = '';

    if (!textInput.trim()) {
        alert('Please input a value');
        return;
    }

    const originalText = textInput.trim();
    const cleanedText = originalText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedText = cleanedText.split('').reverse().join('');

    // Create the reverse animation
    [...originalText].reverse().forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');
        span.style.animationDelay = `${i * 0.3}s`;
        reverseAnimation.appendChild(span);
    });

    // Wait for animation to complete and display the full word
    setTimeout(() => {
        finalWordDiv.textContent = originalText;

        // Check if it's a palindrome
        if (cleanedText === reversedText) {
            document.body.className = 'correct';
            resultDiv.innerHTML = `<div class="congratulations">${originalText} is a palindrome!</div>`;
            successAudio.play();
        } else {
            document.body.className = 'incorrect';
            resultDiv.innerHTML = `<div class="failure">${originalText} is not a palindrome</div>`;
            errorAudio.play();
        }
    }, originalText.length * 300 + 500);
});
