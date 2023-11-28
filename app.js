window.onload = () => {
	const form1 = document.querySelector("#addForm");

	let items = document.getElementById("items");

	let submit = document.getElementById("submit");

	let editItem = null;
    //local storage ki kahani
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    
    //event listner lga dia h form pr and ul pr
	form1.addEventListener("submit", addItem);
	items.addEventListener("click", removeItem);
	items.addEventListener("click",complete);

    //localstrorage se data get kar rhe h yha
	for(let i=0;i<localStorage.length;i++){
		let li = document.createElement("li");
	    li.className = "list-group-item";

	    let deleteButton = document.createElement("button");

	    deleteButton.className =
		"btn-danger btn btn-sm float-right m-2 delete";

	    deleteButton.appendChild(document.createTextNode("Delete"));

	    let editButton = document.createElement("button");

	    editButton.className =
			"btn-secondary btn btn-sm float-right m-2 edit";

	    editButton.appendChild(document.createTextNode("Edit"));

	    let completeButton= document.createElement("button");

	    completeButton.className = "btn-success btn btn-sm float-right m-2 complete";

	    completeButton.appendChild(document.createTextNode("Completed"));

		let newDiv1=document.createElement("span");
		newDiv1.className="col-9";

	    newDiv1.appendChild(document.createTextNode(values[i]));

		let newDiv=document.createElement("span");
		newDiv.className="col-3 float-right mt-0";

	    newDiv.appendChild(deleteButton);
	    newDiv.appendChild(editButton);
	    newDiv.appendChild(completeButton);
		li.appendChild(newDiv1);
		li.appendChild(newDiv);

	    items.appendChild(li);
	}

};

function complete(e){
	//console.log(e.target.parentNode.parentNode.firstChild.innerText)
	localStorage.removeItem(e.target.parentNode.parentNode.firstChild.innerText.toLowerCase())
	const task=e.target.parentNode.parentNode.firstChild.innerText;
	if(e.target.classList.contains("complete")){
		e.target.parentNode.parentNode.innerHTML=`Task Completed: <b>${task}</b>`;
	}
}
function addItem(e) {
	e.preventDefault();

	if (submit.value != "Add") {
		console.log("Hello");

		editItem.target.parentNode.childNodes[0].data= document.getElementById("item").value;

		submit.value = "Add";
		document.getElementById("item").value = "";

		//return false;
	}
	let newItem = document.getElementById("item").value;

    let localstorageValue = localStorage.getItem(newItem.toLowerCase());

	if(localstorageValue!=null){
		alert("Already exists");
		return false;
	}

	
	
	if (newItem.trim() == "" || newItem.trim() == null){
		alert("Enter a valid task");
		return false;
	}
	else
		document.getElementById("item").value = "";

	localStorage.setItem(newItem.toLowerCase(),newItem.trim());

	let li = document.createElement("li");
	li.className = "list-group-item";

	let deleteButton = document.createElement("button");

	deleteButton.className =
		"btn-danger btn btn-sm float-right m-2 delete";

	deleteButton.appendChild(document.createTextNode("Delete"));

	let editButton = document.createElement("button");

	editButton.className =
			"btn-secondary btn btn-sm float-right m-2 edit";

	editButton.appendChild(document.createTextNode("Edit"));

	let completeButton= document.createElement("button");
	completeButton.className = "btn-success btn btn-sm float-right m-2 complete";

	completeButton.appendChild(document.createTextNode("Completed"));

	let myDiv2=document.createElement("span");
	myDiv2.className="col-9";
    myDiv2.appendChild(document.createTextNode(newItem));

	let myDiv=document.createElement("span");
    myDiv.className="col-3 float-right mt-0";
	
	myDiv.appendChild(deleteButton);
	myDiv.appendChild(editButton);
	myDiv.appendChild(completeButton);
	li.appendChild(myDiv2);
    li.appendChild(myDiv);
	items.appendChild(li);
}

function removeItem(e) {
	e.preventDefault();
	if (e.target.classList.contains("delete")) {   
		    
			let li = e.target.parentNode.parentNode;
			//console.log(li);
			li.remove();
			console.log(li.firstChild.innerText);
			//console.log(e.target.parentNode.childNode[0].data)		
			localStorage.removeItem(li.firstChild.innerText.toLowerCase());	
		}
	if (e.target.classList.contains("edit")) {
		document.getElementById("item").value =
		e.target.parentNode.parentNode.firstChild.innerText;
			//console.log(e.target.parentNode.parentNode.firstChild.innerText);
		let li=e.target.parentNode.parentNode;
		li.remove();
		submit.value="Add";
		localStorage.removeItem(li.firstChild.innerText.toLowerCase());
		editItem = e;
	}
}

