// Search Algorithm Visualization Module
const SearchVisualizer = (() => {
    // State variables
    let stopFlag = false;
    let linearFound = false;
    let binaryFound = false;
    let dataList = [];
    let targetElement = 0;
    let timeouts = [];
    let linearColors = [];
    let binaryColors = [];

    // Dark mode color scheme
    const COLORS = {
        default: '#4dabf7',    // Blue - inactive elements
        active: '#ff6b6b',     // Red - currently checking
        found: '#69db7c',      // Green - found element
        eliminated: '#495057', // Gray - eliminated elements
        background: '#1a1a1a', // Chart background
        text: '#e0e0e0',       // Chart text
        warning: '#ffc107'     // Yellow for warnings
    };

    // Public methods
    return {
        startSearch: function() {
            // Reset previous search
            stopFlag = true;
            this.clearAllTimeouts();
            this.clearGraphs();
            this.resetResultBoxes();

            // Start new search after brief delay
            setTimeout(() => {
                stopFlag = false;
                linearFound = false;
                binaryFound = false;
                this.executeSearch();
            }, 100);
        },

        resetResultBoxes: function() {
            document.getElementById("linearResultBox").innerHTML = 
                '<div class="result-placeholder">Waiting for search...</div>';
            document.getElementById("binaryResultBox").innerHTML = 
                '<div class="result-placeholder">Waiting for search...</div>';
        },

        clearAllTimeouts: function() {
            timeouts.forEach(timeout => clearTimeout(timeout));
            timeouts = [];
        },

        clearGraphs: function() {
            const linearChart = document.getElementById("linearChart");
            const binaryChart = document.getElementById("binaryChart");
            if (linearChart) Plotly.purge(linearChart);
            if (binaryChart) Plotly.purge(binaryChart);
        },

        executeSearch: function() {
            try {
                // Get and validate input elements
                const inputList = document.getElementById("userInputList").value.trim();
                const targetValue = document.getElementById("userInputElement").value.trim();

                if (!inputList) throw new Error("Please enter an array of numbers");
                if (!targetValue) throw new Error("Please enter a target number");

                // Parse inputs
                targetElement = this.parseNumber(targetValue);
                dataList = this.parseArray(inputList);

                // Initialize visualization colors
                linearColors = Array(dataList.length).fill(COLORS.default);
                binaryColors = Array(dataList.length).fill(COLORS.default);

                // Create charts
                this.createCharts();

                // Run searches
                this.visualizeLinearSearch(0);
                
                if (this.isSorted(dataList)) {
                    this.visualizeBinarySearch(0, dataList.length - 1);
                } else {
                    document.getElementById("binaryResultBox").innerHTML = 
                        `<div class="alert alert-warning" style="color: ${COLORS.warning}">
                            Binary Search requires sorted array
                        </div>`;
                }

            } catch (error) {
                this.handleError(error);
            }
        },

        parseNumber: function(text) {
            const num = Number(text);
            if (isNaN(num)) throw new Error(`"${text}" is not a valid number`);
            return num;
        },

        parseArray: function(text) {
            const parts = text.split(",")
                .map(part => part.trim())
                .filter(part => part !== "");

            if (parts.length === 0) throw new Error("No numbers found in input");

            return parts.map(part => {
                const num = Number(part);
                if (isNaN(num)) throw new Error(`"${part}" is not a valid number`);
                return num;
            });
        },

        isSorted: function(arr) {
            for (let i = 1; i < arr.length; i++) {
                if (arr[i-1] > arr[i]) return false;
            }
            return true;
        },

        createCharts: function() {
            const indices = Array.from({length: dataList.length}, (_, i) => i);
            const layout = {
                xaxis: {
                    showticklabels: false,
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    title: ""
                },
                yaxis: {
                    title: "Array Elements",
                    tickvals: indices,
                    ticktext: dataList.map(String),
                    automargin: true,
                    tickfont: { color: COLORS.text },
                    titlefont: { color: COLORS.text }
                },
                bargap: 0.2,
                showlegend: false,
                paper_bgcolor: COLORS.background,
                plot_bgcolor: COLORS.background,
                margin: { t: 30, b: 30, l: 50, r: 30 },
                font: { color: COLORS.text },
                shapes: [{
                    type: 'rect',
                    xref: 'paper',
                    yref: 'paper',
                    x0: 0,
                    y0: 0,
                    x1: 1,
                    y1: 1,
                    line: {
                        color: COLORS.text,
                        width: 2
                    },
                    fillcolor: 'rgba(0,0,0,0)'
                }]
            };

            Plotly.newPlot("linearChart", [{
                y: indices,
                x: dataList,
                type: "bar",
                orientation: "h",
                marker: { color: linearColors },
                hoverinfo: "none"
            }], layout);

            Plotly.newPlot("binaryChart", [{
                y: indices,
                x: dataList,
                type: "bar",
                orientation: "h",
                marker: { color: binaryColors },
                hoverinfo: "none"
            }], layout);
        },

        visualizeLinearSearch: function(index) {
            if (stopFlag) return;
            
            if (index >= dataList.length) {
                this.updateResult("linear", linearFound);
                return;
            }

            linearColors[index] = COLORS.active;
            Plotly.restyle("linearChart", { "marker.color": [linearColors] });

            timeouts.push(setTimeout(() => {
                if (stopFlag) return;
                
                if (dataList[index] === targetElement) {
                    linearColors[index] = COLORS.found;
                    Plotly.restyle("linearChart", { "marker.color": [linearColors] });
                    linearFound = true;
                    this.updateResult("linear", true);
                } else {
                    linearColors[index] = COLORS.eliminated;
                    Plotly.restyle("linearChart", { "marker.color": [linearColors] });
                    this.visualizeLinearSearch(index + 1);
                }
            }, 1000));
        },

        visualizeBinarySearch: function(left, right) {
            if (stopFlag) return;
            
            if (left > right) {
                this.updateResult("binary", binaryFound);
                return;
            }

            const mid = Math.floor((left + right) / 2);
            binaryColors[mid] = COLORS.active;
            Plotly.restyle("binaryChart", { "marker.color": [binaryColors] });

            timeouts.push(setTimeout(() => {
                if (stopFlag) return;
                
                if (dataList[mid] === targetElement) {
                    binaryColors[mid] = COLORS.found;
                    Plotly.restyle("binaryChart", { "marker.color": [binaryColors] });
                    binaryFound = true;
                    this.updateResult("binary", true);
                } else if (dataList[mid] < targetElement) {
                    for (let i = left; i <= mid; i++) binaryColors[i] = COLORS.eliminated;
                    Plotly.restyle("binaryChart", { "marker.color": [binaryColors] });
                    this.visualizeBinarySearch(mid + 1, right);
                } else {
                    for (let i = mid; i <= right; i++) binaryColors[i] = COLORS.eliminated;
                    Plotly.restyle("binaryChart", { "marker.color": [binaryColors] });
                    this.visualizeBinarySearch(left, mid - 1);
                }
            }, 1000));
        },

        updateResult: function(type, found) {
            const box = document.getElementById(`${type}ResultBox`);
            const searchType = type === "linear" ? "Linear Search" : "Binary Search";
            
            if (found) {
                const index = dataList.indexOf(targetElement);
                box.innerHTML = `
                    <div class="alert alert-success">
                        <strong>${searchType}:</strong> Found ${targetElement} at index ${index}
                    </div>
                `;
            } else {
                box.innerHTML = `
                    <div class="alert alert-danger">
                        <strong>${searchType}:</strong> ${targetElement} not found in array
                    </div>
                `;
            }
        },

        handleError: function(error) {
            console.error("Search Error:", error);
            const errorHTML = `
                <div class="alert alert-danger">
                    <strong>Error:</strong> ${error.message || "An unknown error occurred"}
                </div>
            `;
            
            document.getElementById("linearResultBox").innerHTML = errorHTML;
            document.getElementById("binaryResultBox").innerHTML = errorHTML;
        }
    };
})();