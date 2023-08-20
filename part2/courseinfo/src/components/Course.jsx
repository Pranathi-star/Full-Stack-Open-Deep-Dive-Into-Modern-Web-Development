const Total = ({ parts }) => {
    const initialValue = 0;
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue)
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Header = ({ text }) => {
    return (
        <h1>{text}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    const partsList = parts.map(part => <Part name = {part.name} exercises = {part.exercises} /> )
    return (
        <>  
           {partsList}
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header text = {course.name} />
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
        </>
    )
}

export default Course;