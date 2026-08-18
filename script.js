const storage = 'DB_key';

function getData(){
    let data = localStorage.getItem(storage);
    return JSON.parse(data);
}

function storeData(entries){
    let temp = JSON.stringify(entries);
    localStorage.setItem(storage,temp);
}

const entryBody = document.getElementById('entryBody');
const entryTable  = document.getElementById('entryTable');
const noEntriesMsg = document.getElementById("no-entries");

function displayEntries(){
    const entry = getData();
    if (entries.length === 0) {
    entryTable.style.display = "none";
    noEntriesMsg.style.display = "block";
    return;
  } else {
    entryTable.style.display = "table";
    noEntriesMsg.style.display = "none";
  }

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const row = document.createElement("tr");
    const dateStr = new Date(entry.date).toLocaleDateString();

    row.innerHTML =
      "<td>" + entry.country + "</td>" +
      "<td>" + entry.title + "</td>" +
      "<td>" + entry.notes + "</td>" +
      "<td>" + dateStr + "</td>" +
      "<td><button class='btn delete-btn' data-id='" + entry.id + "'>Delete</button></td>";

    entryBody.appendChild(row);
  }
}

entryBody.addEventListener("click", function (e) {
  if (!e.target.classList.contains("delete-btn")) {
    return;
  }

  const id = e.target.getAttribute("data-id");
  let entries = getEntries();
  entries = entries.filter(function (entry) {
    return entry.id != id;
  });

  storeData(entries);
  displayEntries();
});

journalForm.addEventListener("submit", function (e) {
  e.preventDefault();

   const country = countrySelect.value;
  const title = document.getElementById("title").value;
  const notes = document.getElementById("notes").value;

  if (country === "" || title === "" || notes === "") {
    alert("please fill everything");
    return;
  }

  const entries = getData();

  const newEntry = {
    id: Date.now(),
    country: country,
    title: title,
    notes: notes,
    date: new Date().toISOString()
  };

   entries.push(newEntry);
  storeData(entries);
  displayEntries();
  journalForm.reset();
});

displayEntries();