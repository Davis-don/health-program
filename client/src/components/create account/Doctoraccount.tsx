import 'bootstrap/dist/css/bootstrap.min.css';
import './doctoraccount.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from 'react-query';
import { Toaster, toast } from 'sonner';

interface DoctorFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Doctoraccount() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState<DoctorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        throw new Error('Passwords do not match');
      }

      const response = await fetch(`${apiUrl}/doctors/new-doctor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      const message = result.message || 'Doctor registered successfully.';

      if (!response.ok) {
        toast.error(message);
        throw new Error(message);
      }

      toast.success(message);
      return result;
    },
    onSuccess: () => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error registering doctor');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="overall-doctor-account-container">
      <Toaster richColors position="top-center" />
      <div className="register-doctor-container">
        <h3>Register Doctor</h3>

        {isLoading && (
          <div className="left-side-spinner-container">
            <div className="spinner-border text-info p-5"></div>
            <h4 className='text-light'>Registering Doctor...</h4>
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">First Name:</label>
              <input 
                type="text" 
                name="firstName" 
                className="form-control p-3" 
                value={formData.firstName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input 
                type="text" 
                name="lastName" 
                className="form-control p-3" 
                value={formData.lastName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input 
                type="email" 
                name="email" 
                className="form-control p-3" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input 
                type="password" 
                name="password" 
                className="form-control p-3" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input 
                type="password" 
                name="confirmPassword" 
                className="form-control p-3" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-lg btn-primary mt-3"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Doctoraccount;


