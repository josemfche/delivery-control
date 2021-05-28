import { auth } from '../../firebase'
import { useState } from 'react'
import Link from 'next/link'
import Router from "next/router";

function RegisterForm() {

  const initialState = {
    email: "",
    password: "",
    password1: "",
    name: ""
  }

  const [data, setData] = useState(initialState)
  const [userData, setUser] = useState(null)

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
    console.log(userData)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (data.password == data.password1) {
      auth.createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          var user = userCredential.user
          setUser(user)

          user.updateProfile({
            displayName: data.name,
          }).then(function () {
            console.log("Updated")
          }, function (error) {
            console.log(error)
          });

          alert("Registro exitoso")
          Router.push("/dashboard")
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
          console.warn(errorCode, errorMessage)
        })
    } else {
      alert("Passwords don't coincide")
    }
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
                  <label className="form-label" id="inputGroup-sizing-sm">Name</label>
                  <input onChange={onChange} type="text" name="name" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" id="inputGroup-sizing-sm">Password</label>
                  <input onChange={onChange} type="password" name="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" id="inputGroup-sizing-sm">Confirm Password</label>
                  <input onChange={onChange} type="password" name="password1" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
              <div className="mt-3" >
                <Link href="/login" >
                  <a className="btn" >Already have an account?</a>
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
