const addButton = document.querySelector('#add');//reference for "Add Note"

const updateLSData = () => {//function for updating local storage

    const textAreaData = document.querySelectorAll('textArea');//reference for all the texts written in text area

    const notes = [];//array for storing all the texts

    textAreaData.forEach((note) => {//pushing every text one by one onto array(notes)
        notes.push(note.value);
    })

    localStorage.setItem('saved', JSON.stringify(notes));
    //firstly converting JS object into json string 
    //then saving it on local storage with key = "saved"
}

const addNewNote = (text = '') => {    
    const note = document.createElement('div');//creating element node of div

    note.classList.add('note');//adding class = 'note' to div

    //adding below html data inside the div 
    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"} "></div>
    <textarea class="${text ? "hidden" : ""} "></textarea> `;
    
    note.insertAdjacentHTML('afterbegin', htmlData);//adding after beginning

    const editButton = note.querySelector('.edit');//reference for "edit" button
    const delButton = note.querySelector('.delete');//reference for "delete" button
    const mainDiv = note.querySelector('.main');//reference for that/those noted which has been saved already
    const textArea = note.querySelector('textarea');//reference for that note which we are editing

    //! button for deleting
    delButton.addEventListener('click', () => {
        note.remove();//deleting the note

        updateLSData();//updates local storage
    })

    textArea.value = text;
    mainDiv.innerHTML = text;
    
    //! button for editing
    editButton.addEventListener('click', () => {//toggle- switch off if it's on and vice-versa
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event;
        mainDiv.innerHTML = value.target.value;

        updateLSData();
    })

    document.body.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem('saved'));//getting the text from local storage and converting it back to JS object

if (notes) { notes.forEach((note) => addNewNote(note)) }//making individual notes to be shown one by one(will fetch data back after refreshing)

addButton.addEventListener("click", () => addNewNote())//makes new note 
