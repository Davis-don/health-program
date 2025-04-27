import './homepage.css'
import doctors from '../assets/images/jafar-ahmed-E285pJbC4uE-unsplash.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
function Homepage() {
    
  return (
    <div className="overall-homepage-container">
       <div className="left-side-homepage-section">
        <img src={doctors} alt="" />
       </div>
       <div className="right-side-homepage-section">
       <div className="right-side-content-container">
        <h1 className="right-side-content-header">Welcome to our Clinic</h1>
        <form>
            <label htmlFor="email">Email Address</label>
            <input placeholder='Enter Email Address' className='form-control' type="email" />
            <label htmlFor="email">Passoword</label>
            <input placeholder='Enter password' className='form-control' type="password" />
            <div className="button-container">
            <button className='btn' type='submit'>Sign in</button>
            </div>
    
        </form>
       </div>
       </div>
        </div>
  )
}

export default Homepage