import React from 'react'

function LoginForm() {
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Log In</h2>
              <form className="">
                <div className="form-group mb-3">
                  <label className="form-label" id="inputGroup-sizing-sm">Email</label>
                  <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" id="inputGroup-sizing-sm">Password</label>
                  <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn btn-primary">Log In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
