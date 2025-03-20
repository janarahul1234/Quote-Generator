const quote = document.querySelector(".quote__card-text");
const author = document.querySelector(".quote__card-author");
const cardImage = document.querySelector(".quote__card-img");

const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

// Define the URL
const QUOTES_URL = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

fetchQuote();

function fetchQuote() {
  // Fetch data from the URL
  fetch(QUOTES_URL)
    .then((res) => {
      // Check if the response is successful
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json(); // Parse the response as JSON
    })
    .then((data) => {
      quote.innerText = data?.data?.content;
      author.innerText = data?.data?.author;

      const ramdom = Math.floor(Math.random() * 4);
      cardImage.src = images[ramdom].url;
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // Handle any errors
    });
}

function copyToClipboard() {
  let quoteText = quote.innerText;

  navigator.clipboard
    .writeText(quoteText)
    .then(function () {
      alert("Copied!"); // success
    })
    .catch(function () {
      alert("Error!"); // error
    });
}

function exportData() {
  const fileContent = `Quote: "${quote.innerHTML}"\nAuthor: ${author.innerHTML}`; // Format the data
  const blob = new Blob([fileContent], { type: "text/plain" }); // Create a text file blob
  const a = document.createElement("a"); // Create an anchor element
  a.href = URL.createObjectURL(blob); // Create a URL for the blob
  a.download = "quote.txt"; // Set the file name
  a.click(); // Trigger the download
}

function shareQuote() {
  const tweetText = `"${quote.innerText}" - ${author.innerText}`; // Format the tweet text
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`; // Encode the text for the URL
  window.open(twitterUrl, "_blank"); // Open Twitter's share URL in a new tab
}
