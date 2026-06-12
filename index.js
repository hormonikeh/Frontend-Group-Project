document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Toggle Equipment List Visibility ---
    const toggleBtn = document.getElementById("toggle-equipment-btn");
// const equipmentList = document.getElementById("equipment-list");  ==> //there is no equipment list in the html,
//  so I commented this out to avoid error

    toggleBtn.addEventListener("click", () => {
        if (equipmentList.style.display === "block") {
            equipmentList.style.display = "none";
            toggleBtn.textContent = "Click to see full list";
        } else {
            equipmentList.style.display = "block";
            toggleBtn.textContent = "Hide full list";
        }
    });
});
// --- 2. Join Group Button Action & State Change ---
const joinBtn = document.getElementById("joinBtn");

joinBtn.addEventListener("click", () => {
    // Toggle UI state to look joined
    if (!joinBtn.classList.contains("joined")) {
        joinBtn.classList.add("joined");
        joinBtn.textContent = "Joined ✔";
        alert("Success! You have joined the trip group.");
        
        // Optional: Put an actual database POST API call request here
    } else {
        joinBtn.classList.remove("joined");
        joinBtn.textContent = "Join Group";
    }
});
    