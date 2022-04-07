const input = document.querySelector("input");
const form = document.getElementById("data-form");
const fileInput = document.getElementById("file-upload");
const para = document.getElementById("para");
const popup = document.getElementById("pop-menu");
const okBtn = document.getElementById("okBtn");

const submitForm = async (e) => {
  e.preventDefault();

  // No file provided
  if (fileInput.files[0] == null) {
    popup.classList.remove("hide");
    para.classList.remove("safe");
    para.innerText = "Please provide a valid file :(";
  } else {
    const mime = fileInput.files[0].type.split("/");
    if (mime[0] === "audio") {
      try {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        // Check if the file is provided or not
        if (fileInput.files[0]) {
          const res = await axios.post(
            "http://127.0.0.1:5000/response",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form",
              },
            }
          );

          popup.classList.remove("hide");
          if (res.data.message == "Safe!") {
            para.classList.add("safe");
            para.innerText = res.data.message;
          }
          if (res.data.message == "Not safe!") {
            para.classList.remove("safe");
            para.innerText = res.data.message;
          } else {
            para.classList.remove("safe");
            para.innerText = "Something went wrong :(";
          }
          para.innerText = res.data.message;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
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
