getData();
deleteAll();

function clearList() {
  // document.getElementById("todo-list-container").innerHTML = "";
  while (document.getElementById("todo-list-container").firstChild) {
    document
      .getElementById("todo-list-container")
      .removeChild(document.getElementById("todo-list-container").firstChild);
  }
}
function getData() {
  clearList();
  axios
  .get("https://api.vschool.io/pauldamico/todo")
    .then((response) => listData(response.data))
    .catch((error) => console.log(error));
}

function listData(data) {

  for (let x = 0; x < data.length; x++) {
    const div = document.createElement("div");
    div.className = "list-div";
    let titleEl = document.createElement("h3");
    let priceEl = document.createElement("h3");
    let descriptionEl = document.createElement("h3");
    descriptionEl.className = "description";
    let imageurlEL = document.createElement("img");
  
    let completeCheckBox = document.createElement("input");
    let checkBoxLabel = document.createElement("label");
    let checkBoxLabelDiv = document.createElement("span");
    checkBoxLabel.textContent = "Finished?";
    completeCheckBox.type = "checkbox";   
    completeCheckBox.name = "checkbox";
    completeCheckBox.addEventListener("click", function(){
      checkboxColor(completeCheckBox, div, data[x]._id)
     console.log(completeCheckBox.checked)
    })
    
    const deleteButtonEl = document.createElement("button"); //deleteButton event
    deleteButtonEl.addEventListener("click", function () {
      removeItem(data[x]._id, data[x].title);
      getData();
    });

    const editButtonEl = document.createElement("button"); //editButton event
    editButtonEl.addEventListener("click", function () {
      console.dir(document.getElementById("todo-list-container"));

      div.removeChild(titleEl); //removes first inputs from list
      div.removeChild(priceEl);
      div.removeChild(descriptionEl);
      div.removeChild(imageurlEL);
      div.removeChild(deleteButtonEl);
      div.removeChild(editButtonEl);
      div.removeChild(checkBoxLabelDiv);          ///not this

      // console.log(this.parentElement)

      let titleElInput = document.createElement("input");
      // titleEl.name="title"
      titleElInput.value = data[x].title;

      let priceElInput = document.createElement("input");
      priceElInput.value = data[x].price;
      let descriptionElInput = document.createElement("textarea");
      descriptionElInput.className = "description";
      descriptionElInput.value = data[x].description;
      let imageurlELInput = document.createElement("input");
      imageurlELInput.value = data[x].imgUrl;
      // completeCheckBox.checked = data[x].completed
      let saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      div.appendChild(titleElInput);
      div.appendChild(priceElInput);
      div.appendChild(descriptionElInput);
      div.appendChild(imageurlELInput);
      div.appendChild(deleteButtonEl);
      div.appendChild(saveButton);
      div.appendChild(checkBoxLabelDiv);                  
      checkBoxLabelDiv.appendChild(checkBoxLabel);
      checkBoxLabelDiv.appendChild(completeCheckBox);

      editButtonEl.textContent = "Save";
      saveButton.addEventListener("click", function () {  // Save eventListener
        
        editItem(
          data[x]._id,
          titleElInput,
          priceElInput,
          descriptionElInput,
          imageurlELInput,
          completeCheckBox
        );
      });

      // getData();
    });
    editButtonEl.textContent = "Edit";
    deleteButtonEl.textContent = "Delete";
    titleEl.textContent = `Name: ${data[x].title}`;
    priceEl.textContent = `Price: ${data[x].price}`;
    descriptionEl.textContent = `Info: ${data[x].description}`;
    imageurlEL.src = `${data[x].imgUrl}`;
    completeCheckBox.checked=data[x].completed
    document.getElementById("todo-list-container").appendChild(div);
    div.appendChild(titleEl);
    div.appendChild(priceEl);
    div.appendChild(descriptionEl);
    div.appendChild(imageurlEL);
    div.appendChild(deleteButtonEl);
    div.appendChild(editButtonEl);
    div.appendChild(checkBoxLabelDiv);
    checkBoxLabelDiv.appendChild(checkBoxLabel);
    checkBoxLabelDiv.appendChild(completeCheckBox);
    completeCheckBox.checked ? div.className = "list-complete" : "list-div" ;
  }
}

function checkboxColor(completeCheckBox, div, id){
  const checkBoxUpdate = {completed: completeCheckBox.checked}
  axios.put(`https://api.vschool.io/pauldamico/todo/${id}`, checkBoxUpdate)
  .then(res=>getData())
  .catch(err=>console.log(err))
  if(completeCheckBox.checked === true){div.className = "list-complete"}
  else if(completeCheckBox.checked === false){div.className = "list-div"}

}

function editItem(
  id,
  titleElInput,
  priceElInput,
  descriptionElInput,
  imageurlELInput,
  completeCheckBox
) {
  const updates = {
    title: titleElInput.value,
    price: priceElInput.value,
    description: descriptionElInput.value,
    imgUrl: imageurlELInput.value,
    completed: completeCheckBox.checked
  };
console.log(completeCheckBox.checked)
  axios
    .put(`https://api.vschool.io/pauldamico/todo/${id}`, updates)
    .then((response) => getData())
    .catch((error) => console.log(error));
}

function removeItem(id, title) {
  alert(`${title} has been deleted`)
  axios
    .delete(`https://api.vschool.io/pauldamico/todo/${id}`)
    .then((response) => getData())
    .catch((error) => console.log(error));
}

function deleteAll() {
  const removeButton = document.getElementById("remove-all");
  removeButton.addEventListener("click", () => {  
    axios
      .get("https://api.vschool.io/pauldamico/todo")
      .then((response) => {
        const apiData = response.data;
        console.log(apiData);
        let idList;
        let titleList;
        for (let x = 0; x < apiData.length; x++) {
          idList = apiData[x]._id;
          titleList = apiData[x].title;
          console.log(`Removed: ${titleList}`);
          axios.delete(`https://api.vschool.io/pauldamico/todo/${idList}`);
        }
      })
      .catch((error) => console.log(error));
    clearList();
  });
}

const todoForm = document.todoForm;
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTodoData = {
    title: document.todoForm.title.value,
    price: document.todoForm.price.value,
    description: document.todoForm.description.value,
    imgUrl: document.todoForm.imgurl.value,
    completed: false
  };

  axios
    .post("https://api.vschool.io/pauldamico/todo", newTodoData)
    .then((response) => getData())
    .catch((error) => console.log(error));

  document.todoForm.title.value = "";
  document.todoForm.price.value = "";
  document.todoForm.description.value = "";
  document.todoForm.imgurl.value = "";
});


