const Total = (props) =>{
  const number=props.number;
  const total=number.map(n=>n.exercises).reduce((a,b)=>a+b,0);
    return(
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}

const Part =(props)=>{
    return (
        <p>{props.part} {props.exercise}</p>
    )
}

const Content = (props) => {

    return (
        <div>
            {props.parts.map((p,index) => <Part key={index} part={p.name} exercise={p.exercises}/>)}
        </div>

    )
}

const Header = (props) =>{
    console.log(props)
    return(
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total number={course.parts} />

    </div>
  )
}

export default App