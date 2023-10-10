import './index.css';

function updateDocumentSize() {
  const documentWidth = window.innerWidth;
  const documentHeight = window.innerHeight;

  const htmlDoc = document.querySelector('html');

  // Update the document size
  htmlDoc.style.width = `${documentWidth}px`;
  htmlDoc.style.height = `${documentHeight}px`;
}

// Add an event listener to update the document size on window resize
window.addEventListener('resize', updateDocumentSize);

// Call the function initially to set the initial document size
updateDocumentSize();

// Add this to the end of the existing file
import './app';
