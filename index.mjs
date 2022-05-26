//const https = require('https')
//const fs =  require('fs')
import fs from 'fs'
import converter from 'json-2-csv';

//const express = requirr('express')
const API_KEY="c7a09f858955d6b0de7222ed22ceab86"
var jsonObj ;
var jsonContent;
import fetch from 'node-fetch'

var body = '';

function JSONtoCSV(jsonArray){

    body += "name"  +  ', ' + "mbid"+  ', ' + "url"+  ', ' +"image_small"+'\r\n';
    for(var i=0; i<jsonArray.length; i++){
        var item = jsonArray[i];
        console.log(item);
        body += item.name  + ', ' +item.mbid +  ', ' + item.url+  ', ' + item.image[0].size+  ', ' + item.image+ '\r\n';    
    
    }

    return body;
}
fetch("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key="+API_KEY+"&format=json")

.then((res) => res.json())

.then((json) =>{
    console.log(json.results.artistmatches.artist);
   body= JSONtoCSV(json.results.artistmatches.artist)
   fs.writeFileSync("result.csv", body);
})
