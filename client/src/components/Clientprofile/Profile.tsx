import './profile.css';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useProfileStore from '../../store/useProfileStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Enrollment from '../Enrollment/Enrollment';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

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
  const closeProfile = useProfileStore((state) => state.closeProfile); // Close profile action
  const queryClient = useQueryClient();

  const [view, setView] = useState(true);
  const [enroll, setEnroll] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(['fetch-user', id], () => fetchUser(id!), {
    enabled: !!id,
    refetchInterval: 1000, // Refetch every 1 second
  });

  const deleteEnrollmentMutation = useMutation({
    mutationFn: async (enrollmentId: string) => {
      const response = await fetch(`http://localhost:4000/enrollments/remove/${enrollmentId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete enrollment');
      }
      return result;
    },
    onSuccess: () => {
      toast.success('Enrollment deactivated successfully!');
      queryClient.invalidateQueries(['fetch-user', id]); // Immediately refetch on success
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error deactivating enrollment');
    },
  });

  const handleDeleteEnrollment = (enrollmentId: string) => {
    if (window.confirm('Are you sure you want to deactivate this enrollment?')) {
      deleteEnrollmentMutation.mutate(enrollmentId);
    }
  };

  const handleDeleteUser = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:4000/clients/remove/${user?.id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
          toast.success('User deleted successfully!');
          closeProfile(); // Close the profile after deletion
          // Optionally, redirect or refresh here
        })
        .catch((error) => {
          toast.error(error.message || 'Error deleting user');
        });
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary p-5" role="status"></div>
        <h2 className="mt-3 text-secondary fs-2">Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    toast.error('Something went wrong while loading profile!');
    return null;
  }

  return (
    <div className="container my-5">
      <Toaster richColors position="top-center" />

      <div className="nav-links-profile">
        <ul className="list-unstyled">
          <li className={view ? 'active-profile-link' : ''} onClick={() => { setView(true); setEnroll(false); }}>View</li>
          <li className={enroll ? 'active-profile-link' : ''} onClick={() => { setView(false); setEnroll(true); }}>Enroll</li>
        </ul>
      </div>

      <>
        {view && (
          <>
            <div className="text-center mb-5">
              <h1 className="fw-bold display-2">Profile Overview</h1>
              <p className="text-muted fs-3">Detailed user information and enrollments</p>
            </div>

            {user ? (
              <>
                <div className="card shadow-lg p-5 mb-5">
                  <div className="text-end mb-3">
                    <button className="btn btn-danger btn-lg" onClick={handleDeleteUser}>
                      🗑️ Delete User
                    </button>
                  </div>

                  <div className="card-body">
                    <h2 className="card-title fw-bold display-4">
                      {user.firstName} {user.middleName && `${user.middleName} `}{user.lastName}
                    </h2>
                    <hr />
                    <div className="row fs-4">
                      <div className="col-md-6 mb-4"><strong>📞 Phone:</strong><br />{user.phone}</div>
                      <div className="col-md-6 mb-4"><strong>📧 Email:</strong><br />{user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : 'N/A'}</div>
                      <div className="col-md-6 mb-4"><strong>🎂 Age:</strong><br />{user.age}</div>
                      <div className="col-md-6 mb-4"><strong>🧑 Gender:</strong><br />{user.gender}</div>
                      <div className="col-md-6 mb-4"><strong>🏠 Address:</strong><br />{user.address}</div>
                      <div className="col-md-6 mb-4"><strong>🩺 Medical History:</strong><br />{user.medicalHistory || 'None'}</div>
                    </div>
                  </div>
                </div>

                {/* Enrollment Info */}
                <div>
                  <h2 className="mb-4 display-3 fw-bold">Enrollments</h2>

                  {user.enrollments.length === 0 ? (
                    <div className="alert alert-warning fs-4 p-4">Not enrolled in any program.</div>
                  ) : (
                    <div className="row">
                      {user.enrollments.map((enrollment) => (
                        <div key={enrollment.id} className="col-md-6 mb-4">
                          <div className="card h-100 shadow-lg p-5 d-flex flex-column justify-content-between">
                            <div className="card-body">
                              <h3 className="card-title text-primary fw-bold display-4">{enrollment.program.name}</h3>
                              <p className="fs-4"><strong>🏢 Department:</strong> {enrollment.program.department}</p>
                              <p className="fs-4">
                                <strong>⚡ Status:</strong>
                                <span className={`badge ms-2 ${enrollment.program.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                  {enrollment.program.status}
                                </span>
                              </p>
                            </div>
                            <div className="card-footer bg-transparent border-top-0 text-center mt-4">
                              <button
                                className="btn btn-outline-danger btn-lg fs-5 px-4"
                                onClick={() => handleDeleteEnrollment(enrollment.id)}
                                disabled={deleteEnrollmentMutation.isLoading}
                              >
                                🗑️ {deleteEnrollmentMutation.isLoading ? 'Processing...' : 'Deactivate'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              toast.error('No user data found!') && null
            )}
          </>
        )}

        {enroll && (
          <div className="enroll-section-profile">
            <Enrollment />
          </div>
        )}
      </>
    </div>
  );
}

export default Profile;

