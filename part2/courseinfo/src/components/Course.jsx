import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => (
    <div>
        {parts.map((p) =>
            <Part key={p.id} part={p} />
        )}
    </div>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Total = ({ parts }) => {
    const total = parts.map(p => p.exercises).reduce((a, b) => a + b, 0)

    return (
        <h3>total of {total} exercises</h3>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course