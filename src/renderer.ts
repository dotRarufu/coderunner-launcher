import './index.css';
import { client } from '../src/lib/pocketbase';
import * as ReactDOM from 'react-dom';

const { api } = window;

const startBtn = document.querySelector<HTMLButtonElement>('#start-button');

startBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log('start game click');

  api.startGame();
});

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

client.collection('');

// Add this to the end of the existing file
import './app';
