import React from 'react'

function UpcomingActivities() {
  return (
    <div className="col-xl-8">
    <div className="card">
        <div className="card-body">
            <h4 className="card-title mb-5">Upcoming Activity</h4>
            <ul className="verti-timeline list-unstyled">
                <li className="event-list">
                    <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                    </div>
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <h5 className="font-size-14">22 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                        </div>
                        <div className="flex-grow-1">
                            <div>
                                Moringa Camp Event
                            </div>
                        </div>
                    </div>
                </li>
                <li className="event-list">
                    <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                    </div>
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <h5 className="font-size-14">17 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                        </div>
                        <div className="flex-grow-1">
                            <div>
                                Everyone realizes why a new common language would be desirable... <a href="javascript: void(0);">Read more</a>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="event-list active">
                    <div className="event-timeline-dot">
                        <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
                    </div>
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <h5 className="font-size-14">15 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                        </div>
                        <div className="flex-grow-1">
                            <div>
                                Joined the group “Boardsmanship Forum”
                            </div>
                        </div>
                    </div>
                </li>
                <li className="event-list">
                    <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                    </div>
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <h5 className="font-size-14">12 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                        </div>
                        <div className="flex-grow-1">
                            <div>
                                Responded to need “In-Kind Opportunity”
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="text-center mt-4"><a href="javascript: void(0);" className="btn btn-primary waves-effect waves-light btn-sm">View More <i className="mdi mdi-arrow-right ms-1"></i></a></div>
        </div>
    </div>
</div>
  )
}

export default UpcomingActivities