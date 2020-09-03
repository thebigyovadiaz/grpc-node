const client = require("./client");

let newNote = {
  title: "New Note",
  content: "New note content"
};

client.insert(newNote, (error, note) => {
  if (error) {
    console.error(error);
  }

  console.log('New note created successfully', note);
})
