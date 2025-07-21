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
                const copyMessage = this.querySelector('.copy-message');
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(address).then(() => {
                        showCopyMessage(copyMessage);
                    }).catch(() => {
                        // Fallback for older browsers
                        fallbackCopyTextToClipboard(address, copyMessage);
                    });
                } else {
                    // If navigator.clipboard is not available, use fallback
                    fallbackCopyTextToClipboard(address, copyMessage);
                }
            }
        });
    });
    
    function showCopyMessage(messageElement) {
        // Hide any other visible copy messages first
        document.querySelectorAll('.copy-message').forEach(msg => {
            msg.style.display = 'none';
            msg.classList.remove('show');
        });
        
        // Show the current message
        messageElement.style.display = 'block';
        
        // Use a small delay to ensure the display change is processed before adding the show class
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 10);
        
        // Hide the message after 2.5 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 300); // Wait for fade out animation
        }, 2500);
    }
    
    function fallbackCopyTextToClipboard(text, messageElement) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            // Intentionally using deprecated execCommand('copy') for compatibility with older browsers
            document.execCommand('copy');
            showCopyMessage(messageElement);
        } catch (err) {
            console.error('Fallback: Could not copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }
});