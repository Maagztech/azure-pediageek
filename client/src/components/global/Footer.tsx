import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootStore } from "../../utils/TypeScript";
const Footer = (props) => {
  const { auth } = useSelector((state: RootStore) => state);
  return (
    <div className={`text-center bg-${props.mode} text-${props.mode==='light'?'dark':'light'} py-4`} >
      <footer className={`text-center text-lg-start text-muted text-${props.mode==='light'?'dark':'light'} `}  >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom ">
          <div className="me-5 d-none d-lg-block " >
            <span className={`text-${props.mode==='light'?'dark':'light'}`}>Get connected with us on social networks:</span>
          </div>

          <div>
            {/* <a href="" className="me-4 text-reset" target="_blank">
              <i className="fab fa-facebook-f"></i>
            </a> */}
            {/* <a href="" className="me-4 text-reset" target="_blank">
              <i className="fab fa-twitter"></i>
            </a> */}
            {/* <a href="" className="me-4 text-reset" target="_blank">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="me-4 text-reset" target="_blank">
              <i className="fab fa-instagram"></i>
            </a> */}
            <a
              href="https://www.linkedin.com/company/pediageek.com/"
              className="me-4 text-reset"
              target="_blank"
            >
              <i className={`fab fa-linkedin text-${props.mode==='light'?'dark':'primary'}`}></i>
            </a>
            {/* <a href="" className="me-4 text-reset" target="_blank">
              <i className="fab fa-github"></i>
            </a> */}
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className={`text-uppercase fw-bold mb-4  text-${props.mode==='light'?'dark':'light'}`}>
                  <img
                    src="/logo192.png"
                    alt="pediageek logo"
                    width={25}
                    height={25}
                  />
                  Pedia<span className="text-success ">Geek</span>
                </h6>
                <p className={`text-${props.mode==='light'?'dark':'light'}`}>
                  PediaGeek is the best way to express your idea to the World.

                </p>
              </div>

              <div className={`"col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-${props.mode==='light'?'dark':'light'}`}>
                <h6 className="text-uppercase fw-bold mb-4 ">Products</h6>
                <p>
                  <Link className="text-reset text-capitalize text-decoration-none" to="/">
                    Home
                  </Link>
                </p>
                <p>
                  <Link className="text-reset text-capitalize text-decoration-none" to={auth.access_token ? '/create_blog' : '/login  '}>
                    Create Blog
                  </Link>
                </p>
                <p>
                  <Link className="text-reset text-capitalize text-decoration-none" to="/blog/629d49634487380016bd44a7">
                    Writer Policy
                  </Link>

                </p>

              </div>

              <div className={`col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-${props.mode==='light'?'dark':'light'}`}>
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link to='/about_us' className="text-reset text-capitalize text-decoration-none">
                    About Us
                  </Link>
                </p>
                <p>
                  <Link to='/privacy_policy' className="text-reset text-capitalize text-decoration-none">
                    Privacy Policy
                  </Link>
                </p>
                <p>
                  <Link to='/disclaimer' className="text-reset text-capitalize text-decoration-none">
                    Disclaimer
                  </Link>
                </p>

              </div>

              <div className={`col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-${props.mode==='light'?'dark':'light'}`}>
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> India
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  contact@pediageek.com                </p>
                <p>
                  <i className="fas fa-phone-office me-3"></i> +91 8114694441
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{color:props.mode==='dark'?'white':'black'}}
        >
          © 2022 Copyright:
          <a className="text-reset fw-bold text-capitalize text-decoration-none" href="http://pediageek.com/">
            PediaGeek
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
