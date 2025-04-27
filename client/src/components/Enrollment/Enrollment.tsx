// Enrollment.tsx
import './enrollment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation } from 'react-query';
import { Toaster, toast } from 'sonner';
import useProfileStore from '../../store/useProfileStore';

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

function Enrollment() {
  const { data: programs, isLoading, error } = useQuery(['fetch-programs'], fetchPrograms);
  const userId = useProfileStore((state) => state.id);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'; // fallback

  const { mutate: enrollClient, isLoading: enrolling } = useMutation({
    mutationFn: async (programId: string) => {
      try {
        const response = await fetch(`${apiUrl}/enrollments/new-enroll`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId: userId, programId }),
        });

        const text = await response.text();
        console.log("Raw response:", text);

        if (!response.ok) {
          throw new Error(`Failed to enroll: ${text}`);
        }

        return JSON.parse(text);
      } catch (error) {
        console.error("Enrollment error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Successfully enrolled!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Enrollment failed');
    },
  });

  const handleEnroll = (programId: string) => {
    if (!userId) {
      toast.error('User ID not found. Please log in first.');
      return;
    }
    enrollClient(programId);
  };

  return (
    <div className="overall-enrollment-container">
      <Toaster richColors position="top-center" />
      <div className="text-center my-5">
        <h1 className="display-2 fw-bold">Enroll in a Program</h1>
        <p className="text-muted fs-3">Browse available programs and enroll</p>
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

                  {/* Enroll Button */}
                  <div className="mt-4 text-center">
                    <button 
                      className="btn btn-lg btn-success px-5 py-3 fs-4"
                      onClick={() => handleEnroll(program.id)}
                      disabled={enrolling}
                    >
                      {enrolling ? 'Enrolling...' : '➕ Enroll'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Enrollment;






