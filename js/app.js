document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Copy address to clipboard when clicking on the back
        card.addEventListener('click', function(e) {
            if (this.classList.contains('flipped')) {
                const address = this.dataset.address;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(address).then(() => {
                        showCopyNotification();
                    }).catch(() => {
                        // Fallback for older browsers
                        fallbackCopyTextToClipboard(address);
                    });
                }
            }
        });
    });
    
    function showCopyNotification() {
        const notification = document.createElement('div');
        notification.textContent = 'Address copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2ecc71;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
    
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyNotification();
        } catch (err) {
            console.error('Fallback: Could not copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }
});