import './program.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Toaster, toast } from 'sonner';

interface ProgramFormData {
  name: string;
  description?: string;
  department: string;
  startDate: string; // ISO string for Date
  endDate?: string;
  status: string;
}

interface Program {
  id: string;
  name: string;
  description?: string;
  department: string;
  startDate: string;
  endDate?: string;
  status: string;
}

const fetchPrograms = async (): Promise<Program[]> => {
  const response = await fetch('http://localhost:4000/programs/all-programs');
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to fetch programs: ${errorMessage}`);
  }
  return response.json();
};

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

  const { data: programs, isLoading, error } = useQuery(
    ['fetch-programs'],
    fetchPrograms,
    {
      refetchInterval: 1000, // Refetch every 1 second
    }
  );

  const { mutate, isLoading: registering } = useMutation({
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

  const { mutate: deleteProgram, isLoading: deleting } = useMutation({
    mutationFn: async (programId: string) => {
      try {
        const response = await fetch(`http://localhost:4000/programs/remove/${programId}`, {
          method: 'DELETE',
        });

        const text = await response.text();
        if (!response.ok) {
          throw new Error(`Failed to delete program: ${text}`);
        }

        return JSON.parse(text);
      } catch (error) {
        console.error('Delete program error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Successfully deleted program!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete program');
    },
  });

  const handleDelete = (programId: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      deleteProgram(programId);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="overall-programs-container">
      <Toaster richColors position="top-center" />

      <div className="all-programs-available">
        <div className="text-center my-5">
          <h1 className="display-2 fw-bold">Manage Programs</h1>
          <p className="text-muted fs-3">Browse, edit, and delete programs</p>
        </div>

        {isLoading ? (
          <div className="text-center fs-2">Please wait....</div>
        ) : error ? (
          <div className="alert alert-danger fs-3 p-4 text-center">
            {(error as Error).message || 'Failed to load programs!'}
          </div>
        ) : (
          <div className="row">
            {programs?.map((program) => (
              <div key={program.id} className="col-md-6 mb-4">
                <div className="card h-100 shadow-lg p-5">
                  <div className="card-body">
                    <h3 className="card-title text-primary fw-bold display-4">{program.name}</h3>
                    <p className="fs-4">
                      <strong>📄 Description:</strong> {program.description || 'No description available'}
                    </p>
                    <p className="fs-4">
                      <strong>🏢 Department:</strong> {program.department}
                    </p>
                    <p className="fs-4">
                      <strong>📅 Duration:</strong> {new Date(program.startDate).toLocaleDateString()} - {program.endDate ? new Date(program.endDate).toLocaleDateString() : 'Ongoing'}
                    </p>
                    <p className="fs-4">
                      <strong>Status:</strong>
                      <span className={`badge ms-2 ${program.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {program.status}
                      </span>
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0 text-center mt-4">
                    <button 
                      className="btn btn-outline-danger btn-lg px-5 py-3 fs-4"
                      onClick={() => handleDelete(program.id)}
                      disabled={deleting}
                    >
                      {deleting ? 'Deleting...' : '🗑️ Delete Program'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="register-program-container">
        <h3>Register New Program</h3>

        {registering && (
          <div className="left-side-spinner-container">
            <div className="spinner-border text-info p-5"></div>
            <h4 className="text-light">Registering Program...</h4>
          </div>
        )}

        {!registering && (
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
              disabled={registering}
            >
              {registering ? 'Registering...' : 'Register Program'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Programs;



