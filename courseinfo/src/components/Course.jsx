const Header = ({ courseName }) => <h2>{courseName}</h2>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Sum = ({ parts }) => {
  const excercises = parts.map(part => part.exercises)
  const sum = excercises.reduce((partialSum, a) => partialSum + a, 0);
  return <p>Number of exercises {sum}</p>
}

const Course = ({ course }) => { 
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
  )
}

export default Course