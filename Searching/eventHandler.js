// eventHandler.js
document.addEventListener("DOMContentLoaded", function() {
    // Initialize code blocks
    switchLinearCode('javascript');
    switchBinaryCode('javascript');

    // Set up event listeners
    const startButton = document.getElementById("start");
    startButton.addEventListener("click", function() {
        // Button animation
        this.classList.add("active");
        setTimeout(() => {
            this.classList.remove("active");
        }, 200);
        
        // Start search visualization
        SearchVisualizer.startSearch();
    });

    // Enter key support
    const handleEnterKey = function(e) {
        if (e.key === "Enter") {
            // Trigger button animation
            document.getElementById("start").classList.add("active");
            setTimeout(() => {
                document.getElementById("start").classList.remove("active");
            }, 200);
            
            // Start search visualization
            SearchVisualizer.startSearch();
        }
    };
    
    document.getElementById("userInputList").addEventListener("keypress", handleEnterKey);
    document.getElementById("userInputElement").addEventListener("keypress", handleEnterKey);

    // Tooltips for code language buttons
    const languageButtons = document.querySelectorAll(".btn-code");
    languageButtons.forEach(button => {
        button.addEventListener("mouseover", function() {
            this.setAttribute("title", `View ${this.textContent} implementation`);
        });
    });
});

// Error handling with dark theme styling
function handleError(error) {
    console.error("Search Error:", error);
    const errorHTML = `
        <div class="alert alert-danger">
            <strong>Error:</strong> ${error.message || "An unknown error occurred"}
        </div>
    `;
    
    document.getElementById("linearResultBox").innerHTML = errorHTML;
    document.getElementById("binaryResultBox").innerHTML = errorHTML;
}

// Initialize SearchVisualizer (assuming searchBlock.js is loaded first)
if (typeof SearchVisualizer === 'undefined') {
    console.error("SearchVisualizer is not defined. Make sure searchBlock.js is loaded first.");
}
