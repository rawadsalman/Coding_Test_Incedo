how to install and run the application?

.......................................

1- create a new folder.

2- open the folder in code editor.

3- clone the project from Github to this folder.

4 - in the Terminal of the editor run the following commands:
  - npm install
  - npm install --save fs 
  - npm install --save json-2-csv
  - npm install --save dotenv/config
  - npm install --save node-fetch
  - npm install --save readline-sync

  
 5- add the file .env and write your API_KEY inside it (for Example: API_KEY="dwqdwquuzu") and save the file
 
 6- in the terminal (or in command line ) run node index.mjs (before that be sure you have installed Node.js, otherwise install it and restart your computer).
 
 7- you will be asked to enter the artist name, write a name and click enter, if the name was found, you will find the following information (name, mbid, url,
image_small, image) in the result.csv, if not you will find a list of atist names in the same file.

