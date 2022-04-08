const input = document.querySelector("input");
const form = document.getElementById("data-form");
const fileInput = document.getElementById("file-upload");
const para = document.getElementById("para");
const popup = document.getElementById("pop-menu");
const popupMessage = document.getElementById("popup-message");
const okBtn = document.getElementById("okBtn");
const loading = document.getElementById("loading");

const submitForm = async (e) => {
  e.preventDefault();

  // No file provided
  if (fileInput.files[0] == null) {
    loading.classList.add("hide");
    popup.classList.remove("hide");
    para.classList.remove("safe");
    para.innerText = "Please provide a valid file :(";
  } else {
    const mime = fileInput.files[0].type.split("/");
    if (mime[0] === "audio") {
      try {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        popup.classList.remove("hide");

        // Check if the file is provided or not
        if (fileInput.files[0]) {
          const res = await axios.post(
            "https://cursed-detector.herokuapp.com/response",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form",
              },
            }
          );

          if (res.data.message == "Safe!") {
            loading.classList.add("hide");
            popupMessage.classList.remove("hide");
            para.classList.add("safe");
            para.innerText = res.data.message;
          }
          if (res.data.message == "Not safe!") {
            loading.classList.add("hide");
            popupMessage.classList.remove("hide");
            para.classList.remove("safe");
            para.innerText = res.data.message;
          } else {
            loading.classList.add("hide");
            popupMessage.classList.remove("hide");
            para.classList.remove("safe");
            para.innerText = "Something went wrong :(";
          }
          para.innerText = res.data.message;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      loading.classList.add("hide");
      popup.classList.remove("hide");
      para.classList.remove("safe");
      para.innerText = "File is not an Audio :(";
    }
  }
};

// function to remove popup
const removePopUp = () => {
  popup.classList.add("hide");
  location.reload();
};

form.addEventListener("submit", submitForm);
