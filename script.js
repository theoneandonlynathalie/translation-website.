document.getElementById('translate-btn').addEventListener('click', async function() {
    const inputText = document.getElementById('input-text').value;
    const sourceLang = document.getElementById('source-language').value;
    const targetLang = document.getElementById('target-language').value;
    const resultText = document.getElementById('translation-result');

    if (inputText === '') {
        resultText.innerHTML = "Please enter some text to translate.";
        return;
    }

    // URL encode the input text to safely include it in a URL
    const encodedText = encodeURIComponent(inputText);

    // MyMemory API endpoint with parameters
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.responseData && data.responseData.translatedText) {
            resultText.innerHTML = data.responseData.translatedText;
        } else {
            resultText.innerHTML = "Error: Unable to fetch translation.";
        }
    } catch (error) {
        resultText.innerHTML = "Error during translation. Please try again.";
        console.error("Translation error:", error);
    }
});
