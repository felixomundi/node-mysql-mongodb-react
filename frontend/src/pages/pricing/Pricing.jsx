import React from 'react'
import './pricing.css'
import { Link } from 'react-router-dom'
import {Card, Col} from  'react-bootstrap'
const Pricing = () => {
    
  return (
    
<section className="section" id="pricing">
    <div className="container">

        <div className="row my-4">
            <div className="col-lg-12 bg-light">
                <div className="title-box text-center">
                    <h3 className="title-heading mt-4">Best Pricing Package </h3>
                    <p className="text-muted f-17 d-block mt-3">Vivamus ac nulla ultrices laoreet neque mollis mi morbi
                        .</p>
                </div>
            </div>
        </div>


              <div className="row my-4  pt-2"> 
                  
                  <Col lg={4} sm={12} className='mb-3'>
                      <Card>                          
                <div className="pricing-box mt-4">
                    <i className="mdi mdi-account h1"></i>
                    <h4 className="f-20">Starter</h4>
                    <div className="mt-4 pt-2">
                        <p className="mb-2 f-18">Features</p>

                        <p className="mb-2"><i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i><b>Unlimited</b>
                            Target Audience</p>
                        <p className="mb-2"><i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i><b>1</b>
                            User Account</p>
                        <p className="mb-2"><i className="mdi mdi-close-circle text-danger f-18 mr-2"></i><b>100+</b>
                            Video Tuts</p>
                        <p className="mb-2"><i className="mdi mdi-close-circle text-danger f-18 mr-2"></i><b>Public</b>
                            Displays
                        </p>
                    </div>

                    <p className="mt-4 pt-2 text-muted">Semper urna veal tempus pharetra elit habisse platea dictumst.
                    </p>
                    <div className="pricing-plan mt-4 pt-2">
                        <h4 className="text-muted"><s> $9.99</s> <span className="plan pl-3 text-dark">$8.99 </span></h4>
                        <p className="text-muted mb-0">Per Month</p>
                    </div>
                    <div className="mt-4 pt-3">
                        <Link to="" className="btn btn-primary btn-rounded">Purchase Now</Link>
                    </div>
                </div>
                      </Card>
                  </Col>
                  <Col lg={4}>
                      <Card>                          
                <div className="pricing-box mt-4">
                    <i className="mdi mdi-account h1"></i>
                    <h4 className="f-20">Starter</h4>
                    <div className="mt-4 pt-2">
                        <p className="mb-2 f-18">Features</p>

                        <p className="mb-2"><i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i><b>Unlimited</b>
                            Target Audience</p>
                        <p className="mb-2"><i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i><b>1</b>
                            User Account</p>
                        <p className="mb-2"><i className="mdi mdi-close-circle text-danger f-18 mr-2"></i><b>100+</b>
                            Video Tuts</p>
                        <p className="mb-2"><i className="mdi mdi-close-circle text-danger f-18 mr-2"></i><b>Public</b>
                            Displays
                        </p>
                    </div>

                    <p className="mt-4 pt-2 text-muted">Semper urna veal tempus pharetra elit habisse platea dictumst.
                    </p>
                    <div className="pricing-plan mt-4 pt-2">
                        <h4 className="text-muted"><s> $9.99</s> <span className="plan pl-3 text-dark">$8.99 </span></h4>
                        <p className="text-muted mb-0">Per Month</p>
                    </div>
                    <div className="mt-4 pt-3">
                        <Link to="" className="btn btn-primary btn-rounded">Purchase Now</Link>
                    </div>
                </div>
                      </Card>
                  </Col>
                  
                  
          </div>         
    </div>
</section>
  )
}

export default Pricing