function Filter({ value, onChange }) {
  return (
    <div>
      <label htmlFor="filter">Filter shown with:</label>
      <input id="filter" value={value} onChange={onChange} />
    </div>
  );
}

export default Filter;
