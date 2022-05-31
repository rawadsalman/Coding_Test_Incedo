import fs from 'fs';
import converter from 'json-2-csv';
import 'dotenv/config';
import fetch from 'node-fetch';
import readlineSync from 'readline-sync';



const api_key=process.env.API_KEY;

var artistName = '';
var body = '';
var randomArtist=[];
var rand =0;

const JSONtoCSV =(jsonArray) =>{
    body += "name"  +  ', ' + "mbid"+  ', ' + "url"+  ', ' +"image_small"+  ', ' +"image"+'\r\n';
    for(var i=0; i<jsonArray.length; i++){
        var item = jsonArray[i];
        body += item.name  + ', ' +item.mbid +  ', ' + item.url+  ', ' + item.image[0].size+  ', ' + item.image[0]['#text']+ '\r\n';
    }
       fs.writeFileSync("result.csv", body);
}

const  between =(min, max) => {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}
const getRandomArtistNames = () => {
  console.log("getting random Artist Names");
  fetch("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher"+"&api_key="+api_key+"&format=json")
   .then((res) => res.json())
   .then((json) => {
       while (randomArtist.length < 5){
           rand = between (0, json.results.artistmatches.artist.length);
           randomArtist.push(json.results.artistmatches.artist[rand].name);
       }
    fs.writeFileSync("result.csv",randomArtist.toString());
  })
}

const readLine = () => {
        var userName = readlineSync.question('Enter the name of the artist ');
        console.log('Hi ' + userName + '!');
        artistName=userName;
}

const main = () => {
   readLine();
   fetch("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+artistName+"&api_key="+api_key+"&format=json")
   .then((res) => res.json())
   .then((json) => {
     if( json.results.artistmatches.artist.length > 0 )
        JSONtoCSV(json.results.artistmatches.artist);
     else
        getRandomArtistNames();
 })
}
 main();

