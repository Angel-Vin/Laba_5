var modal = document.getElementById("my-Modal");
var modalImg = document.getElementById("img01");


showModalWindow = function (img) {
  CUR_IMAGE_INDEX =  getNumberPosition(img);
  modal.style.display = "block";
  switchImage();
  updatePositionBox();
};

var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};

function prevImage () {
  decIndex();
  switchImage();
}

function nextImage () {
  incIndex();
  switchImage();
}

function switchImage () {
  modalImg.src = ITEMS[CUR_IMAGE_INDEX].sizes[8].url;
  updatePositionBox();
}

function incIndex() {
  if (CUR_IMAGE_INDEX !== IMAGE_COUNT - 1){
    CUR_IMAGE_INDEX++;
  } else CUR_IMAGE_INDEX = 0;
}

function decIndex() {
  if (CUR_IMAGE_INDEX !== 0){
    CUR_IMAGE_INDEX--;
  } else CUR_IMAGE_INDEX = IMAGE_COUNT - 1;
}

function getNumberPosition (target) {
  var parent = target.parentNode;
  parent = parent.getElementsByClassName("myImg");
  for(var i = 0; i < parent.length; i++) {
    if(parent[i] === target)  return i;
  }
}

function updatePositionBox() {
  var positionBox = document.getElementsByClassName("number")[0];
  positionBox.innerHTML = (CUR_IMAGE_INDEX + 1) + "/" + IMAGE_COUNT;
}


