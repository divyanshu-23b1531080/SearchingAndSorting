function loadContent(page, scriptPaths = []) {
    // Remove previously loaded scripts
    document.querySelectorAll("script[data-dynamic]").forEach(script => script.remove());

    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById("main-content").innerHTML = html;

            scriptPaths.forEach(scriptPath => {
                let scriptElement = document.createElement("script");
                scriptElement.src = scriptPath;
                scriptElement.setAttribute("data-dynamic", "true"); // Mark it for easy removal
                document.body.appendChild(scriptElement);
            });
        })
        .catch(error => console.error("Error loading content:", error));
}