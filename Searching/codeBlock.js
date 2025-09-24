// Linear Search Code Snippets
const linearSearchCodes = {
    javascript: `function linearSearch(arr, target) {
    // Loop through each array element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Element found at index i
        }
    }
    return -1; // Element not found
}`,

    python: `def linear_search(arr, target):
    """Perform linear search on array"""
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Element found at index i
    return -1  # Element not found`,

    cpp: `int linearSearch(vector<int> arr, int target) {
    // Iterate through the vector
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Element found at index i
        }
    }
    return -1; // Element not found
}`,

    java: `public static int linearSearch(int[] arr, int target) {
    // Traverse the array
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // Element found at index i
        }
    }
    return -1; // Element not found
}`
};

// Binary Search Code Snippets
const binarySearchCodes = {
    javascript: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Element found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Element not found
}`,

    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Element found
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
            
    return -1  # Element not found`,

    cpp: `int binarySearch(vector<int> arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Element found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Element not found
}`,

    java: `public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Element found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Element not found
}`
};

// Set default code display
function switchLinearCode(language) {
    const codeBlock = document.getElementById("linearCodeBlock");
    codeBlock.textContent = linearSearchCodes[language];
    codeBlock.className = `language-${language}`;
    hljs.highlightElement(codeBlock);
}

function switchBinaryCode(language) {
    const codeBlock = document.getElementById("binaryCodeBlock");
    codeBlock.textContent = binarySearchCodes[language];
    codeBlock.className = `language-${language}`;
    hljs.highlightElement(codeBlock);
}