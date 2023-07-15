const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchIcon = document.getElementById("searchIcon");
const otherElements = document.querySelectorAll(".hide-on-search");

// Function to toggle search bar visibility
function toggleSearch() {
  searchInput.classList.toggle("show-search");
  searchResults.classList.toggle("show-search");

  // Toggle visibility of other elements
  otherElements.forEach((element) => {
    element.classList.toggle("hide");
  });
}

// Hide search input and results initially
searchInput.classList.remove("show-search");
searchResults.classList.remove("show-search");

// Event listener for search icon
searchIcon.addEventListener("click", toggleSearch);

// Function to toggle search bar visibility
//   function toggleSearch() {
//     searchInput.classList.toggle("show-search");
//     searchResults.classList.toggle("show-search");
//   }

// Event listener for search icon
//   searchIcon.addEventListener("click", toggleSearch);

// Function to perform search
function performSearch() {
  const searchText = searchInput.value.toLowerCase();
  const searchItems = document.querySelectorAll("item"); // Update with desired elements to search

  // Clear previous search results
  searchResults.innerHTML = "";

  // Perform search and display results
  searchItems.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    if (itemText.includes(searchText)) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + item.id; // Add appropriate link target based on your website's structure
      link.textContent = itemText;
      li.appendChild(link);
      searchResults.appendChild(li);
    }
  });

  if (searchResults.children.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found.";
    searchResults.appendChild(li);
  }
}

// Event listener for search input
searchInput.addEventListener("input", performSearch);
