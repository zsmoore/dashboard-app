import React, { Component } from 'react';
import './bootstrap-navbar-menu/layout-2/assets/css/style.css';

class Navbar extends Component {
  render() {
    return (
    	<div className="top-content">
			<nav className="navbar navbar-inverse" role="navigation">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-navbar-1">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="index.html">Bootstrap Navbar Menu Template</a>
					</div>
					<div className="collapse navbar-collapse" id="top-navbar-1">
						<ul className="nav navbar-nav navbar-right">
							<li><a href="#">Home</a></li>
							<li><a href="#">Features</a></li>
							<li><a href="#">Video</a></li>
							<li><a href="#">Clients</a></li>
							<li><a href="#">Plans</a></li>
							<li><a href="#">Faq</a></li>
							<li><a className="btn btn-link-3" href="#">Button</a></li>
						</ul>
					</div>
				</div>
			</nav>
        
        	<div className="top-content-container">
	        	<div className="container">
					<div className="row">
						<div className="col-sm-12 text wow fadeInLeft">
							<h1>Bootstrap Navbar Menu Template</h1>
							<div className="description">
								<p className="medium-paragraph">
									This is a free "Navbar Menu" made with the Bootstrap framework. 
									Download it on <a href="http://azmind.com">AZMIND</a> and enjoy!
								</p>
							</div>
						</div>
					</div>
	            </div>
            </div>
            
        </div>
    );
  }
}

export default Navbar;
