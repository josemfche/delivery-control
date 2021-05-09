import { auth } from '../../firebase'
import { useState } from 'react'
import Link from 'next/link'

function RegisterForm() {

  const initialState = {
    email: "",
    password: ""
  }

  const [data, setData] = useState(initialState)
  const [userData, setUser] = useState(null)

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        var user = userCredential.user
        setUser(user)
        console.log(userData)
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.warn(errorCode, errorMessage)
      })
  }

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="card rounded-3">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign In</h2>
              <form onSubmit={onSubmit} className="">
                <div className="form-group mb-3">
                  <label className="form-label" id="inputGroup-sizing-sm">Email</label>
                  <input onChange={onChange} type="email" name="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" id="inputGroup-sizing-sm">Password</label>
                  <input onChange={onChange} type="password" name="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
              <div className="" >
                <Link href="/login" >
                  <a>Already have an account?</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
