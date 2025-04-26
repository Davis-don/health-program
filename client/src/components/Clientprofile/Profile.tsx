import './profile.css';
import { useQuery } from 'react-query';
import useProfileStore from '../../store/useProfileStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Enrollform from '../enrollform/Enrollform';

interface Enrollment {
  id: string;
  program: {
    id: string;
    name: string;
    department: string;
    startDate: string;
    endDate: string | null;
    status: string;
  };
}

interface UserData {
  id: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  age: number;
  gender: string;
  phone: string;
  email?: string;
  address: string;
  medicalHistory?: string;
  createdAt: string;
  updatedAt: string;
  enrollments: Enrollment[];
}

const fetchUser = async (id: string): Promise<UserData> => {
  const response = await fetch(`http://localhost:4000/clients/get/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};

function Profile() {
  const id = useProfileStore((state) => state.id);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(['fetch-user', id], () => fetchUser(id!), {
    enabled: !!id, // Only fetch if id exists
  });

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary p-5" role="status"></div>
        <h2 className="mt-3 text-secondary fs-2">Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger fs-3 p-4">Something went wrong while loading profile!</div>;
  }

  return (
    <div className="container my-5">
      <div className="enroll-in-program-container">
        <h3>Enroll into a new program</h3>
        <button className='btn btn-lg btn-danger'>Enroll Now!!</button>
      </div>
      
      <div className="text-center mb-5">
        <h1 className="fw-bold display-2">Profile Overview</h1>
        <p className="text-muted fs-3">Detailed user information and enrollments</p>
      </div>

      {user ? (
        <>
          {/* User Info */}
          <div className="card shadow-lg p-5 mb-5">
            <div className="card-body">
              <h2 className="card-title fw-bold display-4">{user.firstName} {user.middleName && `${user.middleName} `}{user.lastName}</h2>
              <hr />
              <div className="row fs-4">
                <div className="col-md-6 mb-4">
                  <strong>📞 Phone:</strong> <br /> {user.phone}
                </div>
                <div className="col-md-6 mb-4">
                  <strong>📧 Email:</strong> <br /> 
                  {user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : 'N/A'}
                </div>
                <div className="col-md-6 mb-4">
                  <strong>🎂 Age:</strong> <br /> {user.age}
                </div>
                <div className="col-md-6 mb-4">
                  <strong>🧑 Gender:</strong> <br /> {user.gender}
                </div>
                <div className="col-md-6 mb-4">
                  <strong>🏠 Address:</strong> <br /> {user.address}
                </div>
                <div className="col-md-6 mb-4">
                  <strong>🩺 Medical History:</strong> <br /> {user.medicalHistory || 'None'}
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Info */}
          <div>
            <h2 className="mb-4 display-3 fw-bold">Enrollments</h2>

            {user.enrollments.length === 0 ? (
              <div className="alert alert-warning fs-4 p-4">
                Not enrolled in any program.
              </div>
            ) : (
              <div className="row">
                {user.enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="col-md-6 mb-4">
                    <div className="card h-100 shadow-lg p-5">
                      <div className="card-body">
                        <h3 className="card-title text-primary fw-bold display-4">{enrollment.program.name}</h3>
                        <p className="fs-4"><strong>🏢 Department:</strong> {enrollment.program.department}</p>
                        <p className="fs-4">
                          <strong>⚡ Status:</strong> 
                          <span className={`badge ms-2 ${enrollment.program.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                            {enrollment.program.status}
                          </span>
                        </p>
                        <p className="fs-4"><strong>📅 Start Date:</strong> {new Date(enrollment.program.startDate).toLocaleDateString()}</p>
                        <p className="fs-4"><strong>🔚 End Date:</strong> {enrollment.program.endDate ? new Date(enrollment.program.endDate).toLocaleDateString() : 'Ongoing'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="alert alert-danger fs-4">No user data found!</div>
      )}
    </div>
  );
}

export default Profile;




