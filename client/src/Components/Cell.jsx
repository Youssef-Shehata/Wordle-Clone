import React from 'react'

const cell = ({ classy, char }) => {

  const classyy = "wordle-cell " + classy
  return (

    <>

      <div className={classyy}>
        {char == "_" ? " " : char}
      </div>
    </>

  )
}

export default cell