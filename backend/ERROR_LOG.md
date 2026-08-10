Date: 11-08-2026

Error:
`Error: Cannot find module 'C:\Users\singh\mentorsphere\server.js'` (`MODULE_NOT_FOUND`)

Where it occurred:
VS Code Terminal while trying to start the backend server.

Why it occurred:
The terminal was in the root `mentorsphere` directory, but the `server.js` file is located inside the `backend` directory.

How we diagnosed it:
Looked at the terminal prompt path `PS C:\Users\singh\mentorsphere>` and realized it didn't include `\backend`.

Solution:
Ran `cd backend` to change into the correct directory, then ran `node server.js`.

What I learned:
The terminal must be located in the exact same folder as the file you are trying to execute with Node.js.