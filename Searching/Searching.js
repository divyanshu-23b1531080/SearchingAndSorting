let stopFlag = false;
let linearFound = false;
let binaryFound = false;
let dataList = [];
let targetElement = 0;
let timeouts = []; // Track active timeouts
let linearColors = []; // Separate colors for Linear Search
let binaryColors = []; // Separate colors for Binary Search

document.getElementById("main-content").addEventListener("click", function (event) {
    if (event.target.id === "start") {
        console.log("Run button clicked! ✅");
        startSearching();
    }
});

function startSearching() {
    stopFlag = true; // Stop ongoing searches
    clearAllTimeouts(); // Cancel existing timeouts before starting new one

    setTimeout(() => {
        stopFlag = false;
        linearFound = false;
        binaryFound = false;
        executeSearch();
    }, 100);
}

// Function to clear all active timeouts
function clearAllTimeouts() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
}

function executeSearch() {
    let displayList = document.getElementById("userInputList").value;
    targetElement = Number(document.getElementById("userInputElement").value);
    let resultBox = document.getElementById("resultBox");

    try {
        if (!displayList || isNaN(targetElement)) throw new Error("Ensure both input fields are filled!");
        dataList = displayList.split(",").map(Number);
        linearColors = new Array(dataList.length).fill("blue"); // Separate color array for Linear Search
        binaryColors = new Array(dataList.length).fill("blue"); // Separate color array for Binary Search
    } catch (error) {
        resultBox.textContent = "Error: Invalid input!";
        return;
    }

    let layout = {
        yaxis: { title: "Index Positions", tickvals: Array.from({ length: dataList.length }, (_, i) => i + 1), ticktext: dataList },
        xaxis: { showticklabels: false, zeroline: false, showgrid: false },
        bargap: 0.2,
        barmode: "group",
    };

    Plotly.newPlot("linearChart", [{ x: dataList, y: Array.from({ length: dataList.length }, (_, i) => i + 1), type: "bar", orientation: "h", marker: { color: linearColors } }], layout);
    Plotly.newPlot("binaryChart", [{ x: dataList, y: Array.from({ length: dataList.length }, (_, i) => i + 1), type: "bar", orientation: "h", marker: { color: binaryColors } }], layout);

    visualizeLinearSearch(0);
    visualizeBinarySearch(0, dataList.length - 1);
}

// Optimized Linear Search for Horizontal Bars
function visualizeLinearSearch(index) {
    if (stopFlag || index >= dataList.length) return;

    linearColors[index] = "red";  // Keep searched index red
    Plotly.restyle("linearChart", { "marker.color": [linearColors] });

    let timeout = setTimeout(() => {
        if (stopFlag) return;
        if (dataList[index] === targetElement) {
            linearColors[index] = "black";  // Mark found element
            Plotly.restyle("linearChart", { "marker.color": [linearColors] });
            linearFound = true;
            updateResultBox();
        } else {
            visualizeLinearSearch(index + 1);
        }
    }, 800);
    timeouts.push(timeout);
}

// Optimized Binary Search for Horizontal Bars
function visualizeBinarySearch(left, right) {
    if (stopFlag || left > right) {
        updateResultBox();
        return;
    }

    let mid = Math.floor((left + right) / 2);
    binaryColors[mid] = "red";  // Keep searched index red
    Plotly.restyle("binaryChart", { "marker.color": [binaryColors] });

    let timeout = setTimeout(() => {
        if (stopFlag) return;
        if (dataList[mid] === targetElement) {
            binaryColors[mid] = "black";  // Mark found element
            Plotly.restyle("binaryChart", { "marker.color": [binaryColors] });
            binaryFound = true;
            updateResultBox();
        } else if (dataList[mid] < targetElement) {
            visualizeBinarySearch(mid + 1, right);
        } else {
            visualizeBinarySearch(left, mid - 1);
        }
    }, 800);
    timeouts.push(timeout);
}

// Updated Result Box Handling
function updateResultBox() {
    let resultBox = document.getElementById("resultBox");
    resultBox.textContent = linearFound && binaryFound
        ? `Target ${targetElement} found using BOTH searches!`
        : linearFound
        ? `Target ${targetElement} found using Linear Search.`
        : binaryFound
        ? `Target ${targetElement} found using Binary Search`
        : `Target ${targetElement} NOT found.`;
}