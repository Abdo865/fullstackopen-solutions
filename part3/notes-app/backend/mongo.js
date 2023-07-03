const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://abdo:${password}@testcluster.xwksv6b.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({ content: String, important: Boolean });
const Note = mongoose.model("Note", noteSchema);

// const note = new Note({ content: "HTML is easy", important: true });

// note.save().then((result) => {
//   console.log("note Saved!");
//   mongoose.connection.close();
// });

Note.find({important: true}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
