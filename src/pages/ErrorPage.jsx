import React from 'react';

function ErrorPage() {
  return (
    <div className="account-pages my-5 pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center mb-5">
                            <h1 className="display-2 fw-medium">4<i className="bx bx-buoy bx-spin text-primary display-3"></i>4</h1>
                            <h4 className="text-uppercase">Sorry, page not found</h4>
                            <div className="mt-5 text-center">
                                <a className="btn btn-primary waves-effect waves-light" href="/">Back to Dashboard</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-xl-6">
                        <div>
                            <img src="assets/images/error-img.png" alt="" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ErrorPage;
