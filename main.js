const showQuote = document.querySelector(".quote__card-text");
const authorName = document.querySelector(".quote__card-author");
const image = document.querySelector(".quote__card-img");

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

function dataFetch() {
  // Define the URL
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

  // Fetch data from the URL
  fetch(url)
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {
      showQuote.innerText = data.data.content;
      authorName.innerText = data.data.author;

      const ramdom = Math.floor(Math.random() * 4);
      image.src = images[ramdom].url;
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // Handle any errors
    });
}

dataFetch();

function copyToClipboard() {
  let text_to_copy = showQuote.innerHTML;

  navigator.clipboard
    .writeText(text_to_copy)
    .then(function () {
      alert("copied!"); // success
    })
    .catch(function () {
      alert("err"); // error
    });
}

function exportData() {
  const fileContent = `Quote: "${showQuote.innerHTML}"\nAuthor: ${authorName.innerHTML}`; // Format the data
  const blob = new Blob([fileContent], { type: "text/plain" }); // Create a text file blob
  const a = document.createElement("a"); // Create an anchor element
  a.href = URL.createObjectURL(blob); // Create a URL for the blob
  a.download = "quote.txt"; // Set the file name
  a.click(); // Trigger the download
}

function shareBtn() {
  const tweetText = `"${showQuote.innerText}" - ${authorName.innerText}`; // Format the tweet text
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`; // Encode the text for the URL
  window.open(twitterUrl, "_blank"); // Open Twitter's share URL in a new tab
}
