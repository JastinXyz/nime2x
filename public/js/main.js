/* == form click event == */
const form = document.querySelector("form")
const fileInput = document.querySelector(".file-input")
const progressArea = document.getElementById('nanti')

form.addEventListener("click", () => {
  fileInput.click();
});
/* == end form click event == */


/* == Receive image == */

fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    let fileName = file.name; //getting file name
    /* if(fileName.length >= 12){ //if file name length is greater than 12 then split it and add ...
       let splitName = fileName.split('.');
       fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }*/
    uploadFile(fileName); //calling uploadFile with passing file name as an argument
  }
}

  // file upload function
  function uploadFile(name) {

    progressArea.innerHTML = "";
    let uploadedHTML = `<p><i class="fas fa-check-circle" style="font-size: 1em;"></i> ${name}</p>`;

    progressArea.insertAdjacentHTML("afterbegin", uploadedHTML);
  }

 /* == end Receive image == */

 

function downloadFile(elmnt) {
  document.getElementById('download').innerHTML = `<i class="fas fa-spinner fa-spin" style="font-size: 1em;"></i> Working...`
  const link = elmnt
  const url = link.getAttribute("data-href");
const options = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

  
 fetch(url, options)
  .then( response => {
    response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "preview-nime2x.png";
        a.click();
        document.getElementById('download').innerHTML = "Download Again"
      });
    }); 
}

function checkform() {
    
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        
        if(inputs[i].hasAttribute("required")){
            if(inputs[i].value == ""){
              
                return false;
            }
        }
    }
    return true;
}

  function loading() {
  if(checkform() === false) {
  console.log("tidak ada gambar")
  } else {
  document.getElementById('submitbutton').innerHTML = `<i class="fas fa-spinner fa-spin" style="font-size: 1em;"></i> Working...`
  }
  }