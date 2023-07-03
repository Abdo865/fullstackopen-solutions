function PersonForm({ name, onNameChange, number, onNumberChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name:</label>
      <input id="name" value={name} onChange={onNameChange} />
      <br />

      <label htmlFor="number">Number:</label>
      <input id="number" value={number} onChange={onNumberChange} />
      <br />

      <button type="submit">Add</button>
    </form>
  );
}

export default PersonForm;
