import React from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonTable from "./components/PersonTable";
import FlashMessage from "./components/FlashMessage";
import personService from "./services/persons";

function App() {
  const [persons, setPersons] = React.useState([]);
  const [personFilter, setPersonFilter] = React.useState("");
  const [newName, setNewName] = React.useState("");
  const [newNumber, setNewNumber] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [flashMessage, setFlashMessage] = React.useState(null);

  React.useEffect(() => {
    const refetch = async () => {
      try {
        const persons = await personService.list();
        setPersons(persons);
      } catch (err) {
        console.error(err);
        showTimedErrorMessage(`Failed to load persons`);
      }
    };
    refetch();
  }, []);

  function showTimedFlashMessage(message) {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(null), 4000);
  }

  function showTimedErrorMessage(message) {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 4000);
  }

  async function handleCreate(name, number) {
    try {
      const createdPerson = await personService.create({ name, number });
      setPersons((old) => old.concat(createdPerson));
      setNewName("");
      setNewNumber("");
      showTimedFlashMessage(`Added ${createdPerson.name}`);
    } catch (err) {
      console.error(err);
      showTimedErrorMessage(`Failed to create a new person +"${err}"`);
    }
  }

  async function handleDelete(id) {
    const person = persons.find((person) => person.id === id);
    if (!person) return;
    if (!confirm(`Delete ${person.name}?`)) return;

    try {
      await personService.remove(id);
      setPersons((old) => old.filter((person) => person.id !== id));
    } catch (err) {
      console.error(err);
      // @IMPORTANT: Wrong to assume the failure reason. Following the exercises.
      setPersons((old) => old.filter((person) => person.id !== id));
      showTimedErrorMessage(
        `Information of ${person.name} has already been removed from server`
      );
    }
  }

  async function handleUpdate(person, newNumber) {
    const id = person.id;
    try {
      const updatedPerson = await personService.update(id, {
        ...person,
        number: newNumber,
      });
      setPersons((old) => old.map((p) => (p.id === id ? updatedPerson : p)));
      setNewName("");
      setNewNumber("");
    } catch (err) {
      console.error(err);
      // @IMPORTANT: Wrong to assume the failure reason. Following the exercises.
      setPersons((old) => old.filter((person) => person.id !== id));
      showTimedErrorMessage(
        `Information of ${person.name} has already been removed from server`
      );
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    if (newName === "") {
      alert("name can't be empty");
      return;
    }

    if (newNumber === "") {
      alert("number can't be empty");
      return;
    }

    const person = persons.find(
      (p) =>
        p.name.localeCompare(newName, undefined, { sensitivity: "base" }) === 0
    );
    if (person) {
      if (
        confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        handleUpdate(person, newNumber);
      }
    } else {
      handleCreate(newName, newNumber);
    }
  }

  const onPersonFilterChange = (e) => setPersonFilter(e.target.value);
  const onNameChange = (e) => setNewName(e.target.value);
  const onNumberChange = (e) => setNewNumber(e.target.value);

  const personsToShow =
    personFilter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(personFilter.toLowerCase())
        );

  return (
    <>
      <h1>Phonebook</h1>
      <FlashMessage message={errorMessage} type="error" />
      <FlashMessage message={flashMessage} type="success" />
      <Filter value={personFilter} onChange={onPersonFilterChange} />

      <h2>Add new</h2>
      <PersonForm
        name={newName}
        onNameChange={onNameChange}
        number={newNumber}
        onNumberChange={onNumberChange}
        onSubmit={onSubmit}
      />

      <h2>Numbers</h2>
      <PersonTable persons={personsToShow} onDelete={handleDelete} />
    </>
  );
}

export default App;
