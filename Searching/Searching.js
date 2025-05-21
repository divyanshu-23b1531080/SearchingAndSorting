let stopFlag = false;
let linearFound = false;
let binaryFound = false;
let dataList = [];
let targetElement = 0;
let timeouts = []; // Track active timeouts

document.getElementById("main-content").addEventListener("click", function (event) {
    if (event.target.id === "start") {
        console.log("Run button clicked! ✅");
        startSearching();
    }
});

function startSearching() {
    stopFlag = true; // Stop ongoing searches
    clearAllTimeouts(); //  Cancel existing timeouts before starting new one

    setTimeout(() => {
        stopFlag = false;
        linearFound = false;
        binaryFound = false;
        executeSearch();
    }, 100);
}

// Function to clear all active timeouts
function clearAllTimeouts() {
    timeouts.forEach(clearTimeout); // Cancel all stored timeouts
    timeouts = []; // Reset timeout array
}

function executeSearch() {
    let displayList = document.getElementById("userInputList").value;
    targetElement = Number(document.getElementById("userInputElement").value);
    let resultBox = document.getElementById("resultBox");

    try {
        if (!displayList || isNaN(targetElement)) throw new Error("Ensure both input fields are filled!");
        dataList = displayList.split(",").map(Number);
    } catch (error) {
        resultBox.textContent = "Error: Invalid input!";
        return;
    }

    let dataLength = dataList.length;
    let unsortedList = [...dataList]; // DO NOT SORT (binary search fails)
    let linearColors = new Array(dataLength).fill("blue");
    let binaryColors = new Array(dataLength).fill("blue");

    let chartData = (data, colors) => [{
        x: Array.from({ length: dataLength }, (_, i) => i + 1),
        y: data,
        type: "bar",
        marker: { color: colors },
    }];

    let layout = {
        xaxis: { title: "Values", type: "category", tickvals: Array.from({ length: dataLength }, (_, i) => i + 1), ticktext: dataList },
        yaxis: { showticklabels: false, zeroline: false, showgrid: false },
        bargap: 0.2,
        barmode: "group",
    };

    Plotly.newPlot("linearChart", chartData(dataList, linearColors), layout);
    Plotly.newPlot("binaryChart", chartData(unsortedList, binaryColors), layout);

    visualizeLinearSearch(0);
    visualizeBinarySearch(0, dataLength - 1);
}

// Optimized Linear Search with Timeout Tracking
function visualizeLinearSearch(index) {
    if (stopFlag || index >= dataList.length) return;

    let colors = new Array(dataList.length).fill("blue");
    colors[index] = "red";
    Plotly.restyle("linearChart", "marker.color", [colors]);

    if (dataList[index] === targetElement) {
        let timeout = setTimeout(() => {
            if (stopFlag) return;
            colors[index] = "black";
            Plotly.restyle("linearChart", "marker.color", [colors]);
            linearFound = true;
            updateResultBox();
        }, 800);
        timeouts.push(timeout); // Track timeout
        return;
    }

    let timeout = setTimeout(() => {
        if (!stopFlag) visualizeLinearSearch(index + 1);
    }, 800);
    timeouts.push(timeout); // Track timeout
}

// Optimized Binary Search with Timeout Tracking
function visualizeBinarySearch(left, right) {
    if (stopFlag || left > right) {
        updateResultBox();
        return;
    }

    let mid = Math.floor((left + right) / 2);
    let colors = new Array(dataList.length).fill("blue");
    colors[mid] = "green";
    Plotly.restyle("binaryChart", "marker.color", [colors]);

    let timeout = setTimeout(() => {
        if (stopFlag) return;

        if (dataList[mid] === targetElement) {
            colors[mid] = "black";
            Plotly.restyle("binaryChart", "marker.color", [colors]);
            binaryFound = true;
            updateResultBox();
            return;
        }

        if (dataList[mid] < targetElement) {
            if (!stopFlag) visualizeBinarySearch(mid + 1, right);
        } else {
            if (!stopFlag) visualizeBinarySearch(left, mid - 1);
        }
    }, 800);
    timeouts.push(timeout); // Track timeout
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