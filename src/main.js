const input = document.querySelector("input");
const para = document.getElementById("para");
const form = document.getElementById("data-form");
const fileInput = document.getElementById("file-upload");

const submitForm = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    const res = await axios.post("http://127.0.0.1:5000/response", formData, {
      headers: {
        "Content-Type": "multipart/form",
      },
    });
    para.innerText = res.data.message;
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", submitForm);
