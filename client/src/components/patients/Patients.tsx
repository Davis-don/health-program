import './patient.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from 'react-query';
import { Toaster, toast } from 'sonner';

interface ClientFormData {
  firstName: string;
  middleName?: string;
  lastName?: string;
  age: number;
  gender: string;
  phone: string;
  email?: string;
  address: string;
  medicalHistory?: string;
}

function Patients() {
  const apiUrl = import.meta.env.VITE_API_URL;  // Dynamically load the API URL from the environment

  const [formData, setFormData] = useState<ClientFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    age: 0,
    gender: '',
    phone: '',
    email: '',
    address: '',
    medicalHistory: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/clients/new-client`, {  // Use dynamic API URL here
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const message = result.message || 'Action completed.';

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
        middleName: '',
        lastName: '',
        age: 0,
        gender: '',
        phone: '',
        email: '',
        address: '',
        medicalHistory: '',
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error registering patient');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="overall-patients-container">
      <Toaster richColors position="top-center" />
      <div className="register-client-container">
        <h3>Register Patient</h3>

        {isLoading && (
          <div className="left-side-spinner-container">
            <div className="spinner-border text-info p-5"></div>
            <h4 className='text-light'>Registering Patient...</h4>
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">First Name:</label>
              <input type="text" name="firstName" className="form-control p-3" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Middle Name:</label>
              <input type="text" name="middleName" className="form-control p-3" value={formData.middleName} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input type="text" name="lastName" className="form-control p-3" value={formData.lastName} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input type="number" name="age" className="form-control p-3" value={formData.age} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <select name="gender" className="form-select p-3" value={formData.gender} onChange={handleChange} required>
                <option value="">---Select---</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Phone:</label>
              <input type="text" name="phone" className="form-control p-3" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" name="email" className="form-control p-3" value={formData.email} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Address:</label>
              <input type="text" name="address" className="form-control p-3" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Medical History:</label>
              <textarea name="medicalHistory" className="form-control p-3" value={formData.medicalHistory} onChange={handleChange}></textarea>
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

export default Patients;



