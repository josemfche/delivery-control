import React from 'react'

const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-white ">
            <div className="container">
                {/*                 <div className="row d-flex justify-content-evenly text-center">
                    <div className="col-6 col-md-3 my-3"> Elementto 1</div>
                    <div className="col-6 col-md-3 my-3"> Elementto 2</div>
                    <div className="col-6 col-md-3 my-3"> Elementto 3</div>
                    <div className="col-6 col-md-3 my-3"> Elementto 4</div>
                </div> */}
                <div className="row d-flex justify-content-evenly">
                    <div className="col col-md-6 text-center my-2">
                        <a className="text-decoration-none text-white" href="https://github.com/josemfche">Hecho por @josemfche</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
