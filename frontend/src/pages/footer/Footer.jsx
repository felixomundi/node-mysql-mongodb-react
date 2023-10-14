import React from 'react'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import './footer.css'
const Footer = () => {
return (
<Fragment>
<footer className="footer bg-footer">
<div className="container">
<div className="row">
<div className="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
<p className="mt-4">Build responsive, mobile-first projects on the web with the world's most popular front-end component library.</p>
</div>
{/* Start */}
<div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
<h4 className="text-light footer-head">Landing</h4>
<ul className="list-unstyled footer-list mt-4">
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Agency</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Software</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Startup</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Business</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Hosting</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Studio</Link></li>
</ul>
</div>
{/* end */}
<div className="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
<h4 className="text-light footer-head">About</h4>
<ul className="list-unstyled footer-list mt-4">
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> About us</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Services</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Team</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Terms Policy</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Privacy Policy</Link></li>
</ul>
</div>
{/* start */}
<div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
<h4 className="text-light footer-head">Locations</h4>
<ul className="list-unstyled footer-list mt-4">
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> Rongai Kajiado Kenya</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> <i className='fa fa-phone'></i> +254745566505</Link></li>
<li><Link to="#" className="text-foot"><i className="fa fa-angle-right text-light mr-2"></i> <i className='fa fa-envelope mr-1'></i>omundifelix30@gmail.com</Link></li>

</ul>
</div>
{/* end of col */}
</div>
{/* end of row */}
</div>
{/* end of container */}
</footer>
<footer className="footer bg-footer footer-bar">
<div className="container text-center">
<div className="row align-items-center">
<div className="col-sm-6">
<div className="text-sm-left">
<p className="mb-0">&copy; 2022.<i className="fa fa-heart text-danger"></i></p>
</div>
</div>
<div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
<ul className="list-unstyled text-sm-right social-icon social mb-0">
<li className="list-inline-item"><Link to="#" className="rounded bg-white"><i className="fab fa-facebook-f fw-bold text-primary" title="Facebook"></i></Link></li>
<li className="list-inline-item"><Link to="#" className="rounded bg-white"><i className="fab fa-instagram text-primary" title="Instagram"></i></Link></li>
<li className="list-inline-item"><Link to="#" className="rounded bg-white"><i className="fab fa-twitter text-primary" title="Twitter"></i></Link></li>
<li className="list-inline-item"><Link to="#" className="rounded bg-white"><i className="fab fa-google-plus text-primary" title="Google +"></i></Link></li>
<li className="list-inline-item"><Link to="#" className="rounded bg-dark"><i className="fab fa-linkedin text-light" title="Linkedin"></i></Link></li>
</ul>

</div>
</div>
</div>
</footer>
</Fragment>
)
}

export default Footer