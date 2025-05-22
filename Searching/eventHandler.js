document.getElementById("main-content").addEventListener("click", function (event) {
    if (event.target.id === "start") {
        console.log("Run button clicked dynamically! ✅");
        startSearching();
    }
});