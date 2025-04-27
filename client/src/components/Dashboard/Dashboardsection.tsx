import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchActiveInactivePrograms = async () => {
  const response = await fetch(`${apiUrl}/programs/active-inactive-programs`);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to fetch active/inactive programs: ${errorMessage}`);
  }
  return response.json();
};

const fetchTotalPatients = async () => {
  const response = await fetch(`${apiUrl}/clients/all-clients`);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to fetch total patients: ${errorMessage}`);
  }
  return response.json();
};

function Dashboardsection() {
  const { data: programStats, error: programError, isLoading: programLoading } = useQuery(
    'fetch-active-inactive-programs',
    fetchActiveInactivePrograms
  );

  const { data: clients, error: clientError, isLoading: clientLoading } = useQuery(
    'fetch-total-patients',
    fetchTotalPatients
  );

  if (programLoading || clientLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-info p-5" role="status"></div>
        <h4 className="text-light">Loading...</h4>
      </div>
    );
  }

  if (programError || clientError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          {(programError as Error).message || (clientError as Error).message}
        </div>
      </div>
    );
  }

  const totalPatients = clients?.length || 0;
  const activePrograms = programStats?.active || 0;
  const inactivePrograms = programStats?.inactive || 0;

  return (
    <div className="container mt-5">
      <h1 className="text-center display-3 fw-bold text-primary">Doctors Dashboard</h1>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h2 className="fw-bold text-success">Total Patients</h2>
            <p className="display-4 fw-bold">{totalPatients}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h2 className="fw-bold text-info">Active Programs</h2>
            <p className="display-4 fw-bold">{activePrograms}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h2 className="fw-bold text-danger">Inactive Programs</h2>
            <p className="display-4 fw-bold">{inactivePrograms}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboardsection;

