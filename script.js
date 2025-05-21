function loadContent(page, scriptPath = null) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById("main-content").innerHTML = html;

            // 🔥 Ensure Searching.js is loaded ONCE
            if (scriptPath && !document.querySelector(`script[src="${scriptPath}"]`)) {
                let scriptElement = document.createElement("script");
                scriptElement.src = scriptPath;
                document.body.appendChild(scriptElement);
            }
        })
        .catch(error => console.error("Error loading page:", error));
}
