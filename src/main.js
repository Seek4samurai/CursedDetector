const audio = document.getElementById("audio");
const mainAudio = document.createElement("audio");
const paragraph = document.getElementById("para");
var items = [];

const start = async () => {
  var device = navigator.mediaDevices.getUserMedia({ audio: true });
  device.then((stream) => {
    var recorder = new MediaRecorder(stream);

    recorder.ondataavailable = async (e) => {
      items.push(e.data);
      if (recorder.state == "inactive") {
        var blob = new Blob(items, { type: "audio/webm" });

        mainAudio.setAttribute("controls", "controls");
        audio.appendChild(mainAudio);

        mainAudio.innerHTML =
          '<source src="' + URL.createObjectURL(blob) + '" type="video/webm"/>';

        const audioURL = window.URL.createObjectURL(blob);

        const res = await axios.post("http://127.0.0.1:5000/response", {
          audioURL: audioURL,
          mimeType: "video/webm",
        });
        paragraph.innerText = res.data;
      }
    };
    recorder.start(100);
    console.log("started!");

    setTimeout(() => {
      recorder.stop();
    }, 5000);
  });
};
