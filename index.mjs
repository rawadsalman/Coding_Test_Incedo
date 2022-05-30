import fs from 'fs';
import converter from 'json-2-csv';
import 'dotenv/config';
import fetch from 'node-fetch';

const api_key=process.env.API_KEY;
const artist = 'cher';

var body = '';
var randomArtist=[];

function JSONtoCSV(jsonArray){
    body += "name"  +  ', ' + "mbid"+  ', ' + "url"+  ', ' +"image_small"+  ', ' +"image"+'\r\n';
    for(var i=0; i<jsonArray.length; i++){
        var item = jsonArray[i];
        console.log(item);
        body += item.name  + ', ' +item.mbid +  ', ' + item.url+  ', ' + item.image[0].size+  ', ' + item.image[0]['#text']+ '\r\n';    
    
    }
    return body;
}
const getRandomArtist = (length = 2) => {

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

};

function getRandomArtistNames(){
const randomArtist =getRandomArtist (2)
fetch("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+randomArtist+"&api_key="+api_key+"&format=json")

.then((res) => res.json())

.then((json) =>{
    console.log(json.results.artistmatches.artist.length);
    if (json.results.artistmatches.artist.length > 0){
     if(randomArtist.length < 3)
     randomartist.push(json.results.artistmatches.artist.name)
     else
        return randomartist;
     }
     else
     getRandomArtistNames();
 })
}

fetch("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+artist+"&api_key="+api_key+"&format=json")

.then((res) => res.json())
.then((json) =>{
    console.log("json length ..."+json.results.artistmatches.artist.length);
   if( json.results.artistmatches.artist.length > 0 ){
      body= JSONtoCSV(json.results.artistmatches.artist);
      fs.writeFileSync("result.csv", body);
   }
   else{
      console.log("getting random Artist Names");
      getRandomArtistNames();
   }
})
.catch(error => console.log('error:', error));

