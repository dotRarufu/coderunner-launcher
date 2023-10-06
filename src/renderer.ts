/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

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

  console.log('document size:', { documentWidth, documentHeight });
  // const randomColor = getRandomColor();
  // htmlDoc.style.backgroundColor = randomColor;
}

// Add an event listener to update the document size on window resize
window.addEventListener('resize', updateDocumentSize);

// Call the function initially to set the initial document size
updateDocumentSize();

// function getRandomColor(): string {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
