import 'bootstrap/dist/css/bootstrap.min.css';
import './searchuser.css';
import { useState, useEffect } from 'react';
import useProfileStore from '../../store/useProfileStore';

function Searchuser() {
  const apiUrl = import.meta.env.VITE_API_URL;  // Dynamically load the API URL from the environment
  const [searchParam, setSearchParam] = useState(''); // Search input state
  const openProfile = useProfileStore((state) => state.openProfile); // Function to toggle sidebar
  const [searchResults, setSearchResults] = useState<any[]>([]); // State to hold search results
  const addId = useProfileStore((state) => state.setId); // Function to set the id in the store

  // Handle change in the search input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  // Automatically trigger search when the component mounts (onLoad)
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchParam.trim() === '') {
        setSearchResults([]); // Clear results if search param is empty
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/clients/search?name=${searchParam.trim()}`);
        const result = await response.json();

        if (response.ok) {
          setSearchResults(result.clients || []); // Store search results
        } else {
          setSearchResults([]); // Clear results if no data
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Clear results on error
      }
    };

    // Automatically trigger the search when the page loads (on first render)
    fetchSearchResults();
  }, []); // Empty dependency array means this effect runs only once on load

  // Trigger search when the user changes the search input
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchParam.trim() === '') {
        setSearchResults([]); // Clear results if search param is empty
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/clients/search?name=${searchParam.trim()}`);
        const result = await response.json();

        if (response.ok) {
          setSearchResults(result.clients || []); // Store search results
        } else {
          setSearchResults([]); // Clear results if no data
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Clear results on error
      }
    };

    // Fetch search results whenever searchParam changes
    fetchSearchResults();
  }, [searchParam]);

  return (
    <div className='overall-search-user-container'>
        <div className="top-search-section">
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search...</label>
                <input
                  onChange={handleChange}
                  value={searchParam}
                  type="text"
                  className='form-control'
                  placeholder='Search by name'
                />
            </form>
        </div>

        <div className="bottom-side-display-search-content mt-4">
          {searchResults.length === 0 && searchParam && (
            <p>No results found for "{searchParam}"</p>
          )}

          {searchResults.length > 0 && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((client: any) => (
                  <tr onClick={() => { openProfile(); addId(client.id); }} style={{cursor: 'pointer'}} key={client.id}>
                    <td>{`${client.firstName} ${client.middleName ? client.middleName + ' ' : ''}${client.lastName}`}</td>
                    <td>{client.phone}</td>
                    <td>
                      {client.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
    </div>
  );
}

export default Searchuser;


