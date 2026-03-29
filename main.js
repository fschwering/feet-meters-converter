document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    const labelFrom = document.getElementById('labelFrom');
    const labelTo = document.getElementById('labelTo');
    const inputLabel = document.getElementById('inputLabel');
    const inputUnit = document.getElementById('inputUnit');
    const resultUnit = document.getElementById('resultUnit');
    const inputValue = document.getElementById('inputValue');
    const resultValue = document.getElementById('resultValue');
    const copyBtn = document.getElementById('copyBtn');

    let isFeetToMeters = true;

    // Conversion Constant
    const FT_TO_M = 0.3048;

    const convert = () => {
        const value = parseFloat(inputValue.value);
        if (isNaN(value)) {
            resultValue.textContent = '0.0000';
            return;
        }

        let result;
        if (isFeetToMeters) {
            result = value * FT_TO_M;
        } else {
            result = value / FT_TO_M;
        }

        // Format to 4 decimal places, trimming trailing zeros if clean
        resultValue.textContent = Number(result.toFixed(4)).toString();
    };

    const toggleMode = () => {
        isFeetToMeters = !isFeetToMeters;
        
        // Update UI Labels
        if (isFeetToMeters) {
            labelFrom.textContent = 'Feet';
            labelTo.textContent = 'Meters';
            inputLabel.textContent = 'Enter Feet';
            inputUnit.textContent = 'ft';
            resultUnit.textContent = 'm';
            inputValue.placeholder = '0.00';
        } else {
            labelFrom.textContent = 'Meters';
            labelTo.textContent = 'Feet';
            inputLabel.textContent = 'Enter Meters';
            inputUnit.textContent = 'm';
            resultUnit.textContent = 'ft';
            inputValue.placeholder = '0.00';
        }

        // Recalculate
        convert();

        // Animate the icon
        const icon = modeToggle.querySelector('.swap-icon');
        icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    };

    const copyToClipboard = () => {
        const textToCopy = resultValue.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '';
            }, 2000);
        });
    };

    // Event Listeners
    inputValue.addEventListener('input', convert);
    modeToggle.addEventListener('click', toggleMode);
    copyBtn.addEventListener('click', copyToClipboard);

    // Initial Focus
    inputValue.focus();
});
