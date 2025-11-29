document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const promptInput = document.getElementById('prompt');
    const contentTypeSelect = document.getElementById('contentType');
    const resultContainer = document.getElementById('resultContainer');
    const resultText = document.getElementById('resultText');
    const copyBtn = document.getElementById('copyBtn');
    const btnText = generateBtn.querySelector('.btn-text');
    const loader = generateBtn.querySelector('.loader');

    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        const type = contentTypeSelect.value;

        if (!prompt) {
            alert('Please enter a description for your content.');
            return;
        }

        // UI Loading State
        setLoading(true);
        resultContainer.classList.add('hidden');
        resultText.textContent = '';

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt, type })
            });

            const data = await response.json();

            if (data.success) {
                resultContainer.classList.remove('hidden');
                typeWriter(data.data, resultText);
            } else {
                alert(data.error || 'Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server. Please check your internet connection.');
        } finally {
            setLoading(false);
        }
    });

    copyBtn.addEventListener('click', () => {
        // Get the plain text content without HTML tags
        const tempElement = document.createElement('div');
        tempElement.innerHTML = resultText.innerHTML;
        const text = tempElement.textContent || tempElement.innerText || '';
        navigator.clipboard.writeText(text).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        });
    });

    function setLoading(isLoading) {
        if (isLoading) {
            generateBtn.disabled = true;
            btnText.textContent = 'Generating...';
            loader.classList.remove('hidden');
        } else {
            generateBtn.disabled = false;
            btnText.textContent = 'Generate Content';
            loader.classList.add('hidden');
        }
    }

    function typeWriter(htmlText, element) {
        element.innerHTML = '';
        const speed = 10; // Typing speed in ms
        
        // Set the full HTML content immediately so tags are properly rendered
        element.innerHTML = htmlText;
        
        // If you want a typing effect, you could implement it here
        // but it's complex with HTML content and might not be worth it
        // For now, we'll just display the properly formatted HTML
    }
});
