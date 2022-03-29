const dotenv = require("dotenv");
const badWords = require("./badwords.json");

dotenv.config();
const badWordsArray = badWords.words;

const { Deepgram } = require("@deepgram/sdk");
const deepgramApiKey = process.env.KEY;

// Hosted sample file
const audioUrl =
  "https://rr5---sn-npoeenle.googlevideo.com/videoplayback?expire=1648560007&ei=J7NCYvfaJcb71gLZ3puYDA&ip=191.33.90.15&id=o-AMfkkow2xdyjcdtpuDrAAGwD4i317og162ycMFGhq3-Q&itag=18&source=youtube&requiressl=yes&spc=4ocVC-KDbra9AWddDbxufS__Ga7o&vprv=1&mime=video%2Fmp4&ns=Vgx62roqlNR4QwEQ4dlusH4G&gir=yes&clen=295911&ratebypass=yes&dur=6.314&lmt=1632196522954154&fexp=23886203,24001373,24007246,24162928&beids=23886203&c=WEB&txp=6310224&n=ikYVoIWyW81lBA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAPARKBUsfmGAHDpuw8fNsbQo5R8zmgE08xP8wE4bMj3_AiEA9g1-f3eO8mA5Gn3EMNr1qjc1EqTt6BasbRRHblcrqnU%3D&rm=sn-b8u-j28e7e&req_id=2485822adb1a3ee&cmsv=e&redirect_counter=2&cm2rm=sn-bg0de7s&cms_redirect=yes&mh=YK&mip=45.113.107.178&mm=34&mn=sn-npoeenle&ms=ltu&mt=1648551271&mv=u&mvi=5&pl=24&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgZNZ8jU5DYRDjmq67Ooygz4J5fRrsCdnhY3Raq5yH1xICIQDAl356XJyZhkKrAP8G-x8_YFLLLrJgiyWQ56Nriy4_RQ%3D%3D";
// Initializes the Deepgram SDK
const deepgram = new Deepgram(deepgramApiKey);

console.log("Searching...");
const transcriptionArray = [];

// Function definition with passing two arrays
function findCommonElement(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        return true;
      }
    }
  }
  return false;
}

deepgram.transcription
  .preRecorded({ url: audioUrl }, { punctuate: true, language: "en-GB" })
  .then((transcription) => {
    const transcriptionObject =
      transcription.results.channels[0].alternatives[0].words;

    transcriptionObject.map((wordData) => {
      transcriptionArray.push(wordData.word);
    });
    if (findCommonElement(transcriptionArray, badWordsArray)) {
      console.log("Not safe!");
    } else {
      console.log("Safe!");
    }
  })
  .catch((err) => {
    console.log(err);
  });
