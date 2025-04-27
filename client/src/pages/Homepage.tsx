import './homepage.css';
import doctors from '../assets/images/jafar-ahmed-E285pJbC4uE-unsplash.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, ChangeEvent } from 'react';
import { useMutation } from 'react-query';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/userStore'


interface UserFormData {
  email: string;
  password: string;
}

function Homepage() {
  const [loginData, setLoginData] = useState<UserFormData>({
    email: '',
    password: '',
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Get the login function from the store
  const login = useAuthStore((state) => state.login);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/doctors/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const info = await response.json();
      const message = info.message;

      if (!response.ok) {
        toast.error(message);
        return;
      }

      // Successful login: Store token and user data in the Zustand store
      login(info.authToken, {
        id: info.doctor.id,
        firstName: info.doctor.firstName,
        lastName: info.doctor.lastName,
        email: info.doctor.email,
      });

      toast.success(message);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      return info;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="overall-homepage-container">
        <div className="left-side-homepage-section">
          <img src={doctors} alt="Doctors at work" />
        </div>

        <div className="right-side-homepage-section">
          <div className="right-side-content-container">
            <h1 className="right-side-content-header">Welcome to our Clinic</h1>

            {isLoading && (
              <div className="left-side-spinner-container">
                <div className="spinner-border text-info p-5"></div>
                <h4 className="text-light">Logging in...</h4>
              </div>
            )}

            {!isLoading && (
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                  placeholder="Enter Email Address"
                  className="form-control"
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="password">Password</label>
                <input
                  placeholder="Enter password"
                  className="form-control"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />

                <div className="button-container">
                  <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;


