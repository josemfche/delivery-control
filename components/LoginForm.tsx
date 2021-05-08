import React from 'react'

function LoginForm() {
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-6 d-flex flex-column align-items-center">
            <form className=" row border">
              <div className="input-group input-group-sm mb-3">
                <label className="form-label" id="inputGroup-sizing-sm">Email</label>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
              </div>
              <div className="input-group input-group-sm mb-3">
                <label className="form-label" id="inputGroup-sizing-sm">Password</label>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
              </div>
              <button className="btn btn-primary">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
