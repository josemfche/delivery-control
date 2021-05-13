import { auth } from '../../firebase'
import { userContext } from '../../context/createContext/UserContext'
import { useState, useContext } from 'react'
import Link from 'next/link'
import { SET_USER, UNSET_USER } from '../../context/types'

function LoginForm() {

  const { userDispatch } = useContext(userContext)

  const initialState = {
    email: "",
    password: ""
  }

  const [data, setData] = useState(initialState)

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)

  }

  const onSubmit = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        let user = userCredential.user;
        userDispatch({
          type: SET_USER,
          payload: user
        })
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        userDispatch({
          type: UNSET_USER
        })
        console.warn(errorMessage, errorCode)
      });
  }

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="card rounded-3">
            <div className="card-body">
              <h2 className="text-center mb-4">Log In</h2>
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
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
              <div className="mt-3" >
                <Link href="/register" >
                  <a className="btn" >Don't have an account?</a>
                </Link>
                <Link href="/dashboard" >
                  <a className="btn" >Dashboard</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
