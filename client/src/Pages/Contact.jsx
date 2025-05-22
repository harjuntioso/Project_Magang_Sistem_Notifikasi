import { useEffect, useState, useCallback } from "react";
import axiosClient from "../axiosClient.js";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import Swal from "sweetalert2";

export default function Contact() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchTimeout, setFetchTimeout] = useState(null);
  const { user: currentUser } = useAuth();

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  });

  // Memoized function to prevent unnecessary recreations
  const getUsers = useCallback(() => {
    // Clear any pending request
    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }

    setLoading(true);
    
    // Debounce the request by 300ms
    const timeout = setTimeout(() => {
      axiosClient.get(`/users?page=${pagination.current_page}`)
        .then(({ data }) => {
          setUsers(data.data);
          setPagination({
            current_page: data.current_page,
            last_page: data.last_page,
            per_page: data.per_page,
            total: data.total
          });
        })
        .catch((error) => {
          if (error.response?.status === 429) {
            Swal.fire({
              title: 'Too Many Requests',
              text: 'Please wait before trying again.',
              icon: 'warning'
            });
          } else {
            //setNotification('Failed to load users');
            console.error('Error fetching users:', error);
          }
        })
        .finally(() => {
          setLoading(false);
          setFetchTimeout(null);
        });
    }, 300);

    setFetchTimeout(timeout);
  }, [pagination.current_page]);

  useEffect(() => {
    getUsers();
    
    // Cleanup on unmount
    return () => {
      if (fetchTimeout) {
        clearTimeout(fetchTimeout);
      }
    };
  }, [getUsers, fetchTimeout]);

  const onDeleteClick = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            // Check if this was the last item on the current page
            if (users.length === 1 && pagination.current_page > 1) {
              setPagination(prev => ({...prev, current_page: prev.current_page - 1}));
            } else {
              getUsers();
            }
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          })
          .catch(error => {
            Swal.fire('Error!', 'Failed to delete user.', 'error');
            console.error('Delete error:', error);
          });
      }
    });
  };

  const changePage = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setPagination(prev => ({...prev, current_page: page}));
    }
  }

  // Simplified admin check
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Users</h1>
          {currentUser && <span>Welcome, {currentUser.name}!</span>}
          {isAdmin && (
            <Link className="btn-add" to="/users/new" style={{ marginLeft: '10px' }}>Add new</Link>
          )}
      </div>
      
      <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Create Date</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map(u => (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  key={u.id}>
                  <td className="px-6 py-4">{u.id}</td>
                  <td className="px-6 py-4">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{u.phone}</td>
                  <td className="px-6 py-4">{u.created_at}</td>
                  <td className="px-6 py-4">{u.role}</td>
                  {/* <td className="px-6 py-4 space-x-2">
                    {isAdmin && (
                      <>
                        <Link className="btn-edit" to={`/users/${u.id}`}>Edit</Link>
                        <button 
                          className="btn-delete" 
                          onClick={() => onDeleteClick(u)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {!loading && pagination.last_page > 1 && (
          <div className="flex flex-col items-center mt-4">
            <nav className="inline-flex rounded-md shadow mb-2">
              <button
                onClick={() => changePage(1)}
                disabled={pagination.current_page === 1}
                className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo;
              </button>
              <button
                onClick={() => changePage(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lsaquo;
              </button>
              
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-3 py-1 border-t border-b border-gray-300 text-sm font-medium ${
                    pagination.current_page === page 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => changePage(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &rsaquo;
              </button>
              <button
                onClick={() => changePage(pagination.last_page)}
                disabled={pagination.current_page === pagination.last_page}
                className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &raquo;
              </button>
            </nav>
            
            <div className="text-sm text-gray-600">
              Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to{' '}
              {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
              {pagination.total} users
            </div>
          </div>
        )}
      </div>
    </div>
  );
}