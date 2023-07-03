const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://abdo:${password}@testcluster.xwksv6b.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const PersonSchema = new mongoose.Schema({ name: String, number: String });
const Person = mongoose.model("Person", PersonSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook: ");
    result.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
} else {
  const person = new Person({ name: process.argv[3], number: process.argv[4] });

  person.save().then((result) => {
    console.log(`added ${process.argv[3]}, number: ${process.argv[4]}`);
    mongoose.connection.close();
  });

  // Note.find({important: true}).then((result) => {
  //   result.forEach((note) => {
  //     console.log(note);
  //   });
  //   mongoose.connection.close();
  // });
}
