import './program.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from 'react-query';
import { Toaster, toast } from 'sonner';

interface ProgramFormData {
  name: string;
  description?: string;
  department: string;
  startDate: string; // ISO string for Date
  endDate?: string;
  status: string;
}

function Programs() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState<ProgramFormData>({
    name: '',
    description: '',
    department: '',
    startDate: '',
    endDate: '',
    status: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/programs/new-program`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        }),
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
        name: '',
        description: '',
        department: '',
        startDate: '',
        endDate: '',
        status: '',
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error creating program');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="overall-programs-container">
      <Toaster richColors position="top-center" />
      <div className="register-program-container">
        <h3>Register New Program</h3>

        {isLoading && (
          <div className="left-side-spinner-container">
            <div className="spinner-border text-info p-5"></div>
            <h4 className='text-light'>Registering Program...</h4>
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Program Name:</label>
              <input
                type="text"
                name="name"
                className="form-control p-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                name="description"
                className="form-control p-3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Department:</label>
              <input
                type="text"
                name="department"
                className="form-control p-3"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Start Date:</label>
              <input
                type="date"
                name="startDate"
                className="form-control p-3"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">End Date (Optional):</label>
              <input
                type="date"
                name="endDate"
                className="form-control p-3"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status:</label>
              <select
                name="status"
                className="form-select p-3"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">---Select---</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-lg btn-primary mt-3"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Program'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Programs;
