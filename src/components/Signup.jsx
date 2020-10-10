import React, { useContext } from 'react';
import {firebaseAuth} from '../provider/AuthProvider'

const Signup = (props) => {

    const {handleSignup, inputs, setInputs, errors} = useContext(firebaseAuth)
        console.log(handleSignup)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('handleSubmit')
        await handleSignup()
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(inputs)
        setInputs(prev => ({...prev, [name]: value}))
    }

    return (
        <form onSubmit={handleSubmit}>
          {/* replace the div tags with a form tag */}
          Signup
          {/* make inputs  */}
          <input onChange={handleChange} name="email" placeholder='email' value={inputs.email} />
          <input onChange={handleChange} name="password" placeholder='password' vaule={inputs.password} />
          <button>signup</button>
          {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p>) : null}
        </form>
    );
}

export default Signup
