let jsonData = null;

const fetchData = async () => {
  try {
    const response = await fetch('../products.json'); // Adjust the path if needed
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    jsonData = await response.json(); // Store JSON data in the variable
    document.write(JSON.stringify(jsonData, null, 2)); // Convert JSON to string with indentation for readability
    document.getElementById('container').innerText = JSON.stringify(jsonData, null, 2); // Display in the document
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};