import React from 'react'

function LatestStudenUpdate() {
  return (
    <div className="col-lg-12">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title mb-4">Latest Student Update</h4>
            <div className="table-responsive">
                <table className="table align-middle table-nowrap mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>
                                <div className="form-check font-size-16 align-middle">
                                    <input className="form-check-input" type="checkbox" id="transactionCheck01"/>
                                    <label className="form-check-label" ></label>
                                </div>
                            </th>
                            <th className="align-middle">Student ID</th>
                            <th className="align-middle">Student Name</th>
                            <th className="align-middle">Date</th>
                            <th className="align-middle">Total</th>
                            <th className="align-middle">Scholarship Status</th>
                            <th className="align-middle">Academic Level</th>
                            <th className="align-middle">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="form-check font-size-16">
                                    <input className="form-check-input" type="checkbox" id="transactionCheck02"/>
                                    <label className="form-check-label" ></label>
                                </div>
                            </td>
                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2540</a> </td>
                            <td>Neal Matthews</td>
                            <td>
                                07 Oct, 2019
                            </td>
                            <td>
                                $400
                            </td>
                            <td>
                                <span className="badge badge-pill badge-soft-success font-size-11">Passed</span>
                            </td>
                            <td>
                                <i className="fab fa-cc-mastercard me-1"></i> Mastercard
                            </td>
                            <td>
                                
                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                    View Details
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="form-check font-size-16">
                                    <input className="form-check-input" type="checkbox" id="transactionCheck03"/>
                                    <label className="form-check-label" ></label>
                                </div>
                            </td>
                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2541</a> </td>
                            <td>Jamal Burnett</td>
                            <td>
                                07 Oct, 2019
                            </td>
                            <td>
                                $380
                            </td>
                            <td>
                                <span className="badge badge-pill badge-soft-danger font-size-11">Discontinued</span>
                            </td>
                            <td>
                                <i className="fab fa-cc-visa me-1"></i> Visa
                            </td>
                            <td>
                                
                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                    View Details
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="form-check font-size-16">
                                    <input className="form-check-input" type="checkbox" id="transactionCheck04"/>
                                    <label className="form-check-label" ></label>
                                </div>
                            </td>
                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2542</a> </td>
                            <td>Juan Mitchell</td>
                            <td>
                                06 Oct, 2019
                            </td>
                            <td>
                                $384
                            </td>
                            <td>
                                <span className="badge badge-pill badge-soft-success font-size-11">Passed</span>
                            </td>
                            <td>
                                <i className="fab fa-cc-paypal me-1"></i> Paypal
                            </td>
                            <td>
                               
                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                    View Details
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check font-size-16">
                                    <input className="form-check-input" type="checkbox" id="transactionCheck05"/>
                                    <label className="form-check-label" ></label>
                                </div>
                            </td>
                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2543</a> </td>
                            <td>Barry Dick</td>
                            <td>
                                05 Oct, 2019
                            </td>
                            <td>
                                $412
                            </td>
                            <td>
                                <span className="badge badge-pill badge-soft-success font-size-11">Passed</span>
                            </td>
                            <td>
                                <i className="fab fa-cc-mastercard me-1"></i> Mastercard
                            </td>
                            <td>
                               
                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                    View Details
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check font-size-16">
                                    <input className="form-check-input" type="checkbox" id="transactionCheck06"/>
                                    <label className="form-check-label" ></label>
                                </div>
                            </td>
                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2544</a> </td>
                            <td>Ronald Taylor</td>
                            <td>
                                04 Oct, 2019
                            </td>
                            <td>
                                $404
                            </td>
                            <td>
                                <span className="badge badge-pill badge-soft-warning font-size-11">Refund</span>
                            </td>
                            <td>
                                <i className="fab fa-cc-visa me-1"></i> Visa
                            </td>
                            <td>
                                
                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                    View Details
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check font-size-16">
                                    <input className="form-check-input" type="checkbox" id="transactionCheck07"/>
                                    <label className="form-check-label" ></label>
                                </div>
                            </td>
                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2545</a> </td>
                            <td>Jacob Hunter</td>
                            <td>
                                04 Oct, 2019
                            </td>
                            <td>
                                $392
                            </td>
                            <td>
                                <span className="badge badge-pill badge-soft-success font-size-11">Passed</span>
                            </td>
                            <td>
                                <i className="fab fa-cc-paypal me-1"></i> Paypal
                            </td>
                            <td>
                                
                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
</div>
  )
}

export default LatestStudenUpdate
