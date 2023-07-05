const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => {
  const total = parts.reduce(
    (total_exercises, part) => total_exercises + part.exercises,
    0
  );
  return <p>Number of exercises {total}</p>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;