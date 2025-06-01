import { useEffect, useState, useCallback } from "react";
import axiosClient from "../axiosClient.js";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import { FaPlus } from "react-icons/fa"; 
import Swal from "sweetalert2";

export default function Contact() {
  //const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchTimeout, setFetchTimeout] = useState(null);
  //const {user: currentUser } = useAuth();
  const users = [
    { 
      id: 1, 
      name: 'User 1',
      email: 'tyrel91@example.net',
      phone: '+62895321009825',
      role: '-',
      date: '2025-05-22T09:06:38.000000Z' 
    },
    { 
      id: 2, 
      name: 'User 2',
      email: 'qwqeqw@example.net',
      phone: '+6285806571191',
      role: '-',
      date: '2025-05-22T09:06:38.000000Z' 
    },
    { 
      id: 3, 
      name: 'User 3',
      email: 'asdfsadf@example.net',
      phone: '+625156762511',
      role: '-',
      date: '2025-05-22T09:06:38.000000Z' 
    },
  ]

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
      axiosClient.get(`/user?page=${pagination.current_page}`)
        .then(({ data }) => {
          //setUsers(data.data);
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
  }, [getUsers]);

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
            // if (users.length === 1 && pagination.current_page > 1) {
            //   setPagination(prev => ({...prev, current_page: prev.current_page - 1}));
            // } else {
            //   getUsers();
            // }

            getUsers();
            
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
  const isAdmin = true;

return (
  <div className="p-8 bg-neutral-50 min-h-screen">
    <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary mb-6">
      <h2 className="text-lg font-semibold mb-4 text-primary-dark flex items-center gap-2">
        <FaPlus className="text-primary" />
        Manage Users
      </h2>

      {isAdmin && (
        <div className="mb-4">
          <Link
            to="/users/new"
            className="inline-block px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-md"
          >
            + Add New User
          </Link>
        </div>
      )}

      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Create Date</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{u.id}</td>
                  <td className="px-6 py-4">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/send-message?phone=${u.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {u.phone}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{u.date}</td>
                  <td className="px-6 py-4">{u.role}</td>
                  <td className="px-6 py-4 space-x-2">
                    {isAdmin ? (
                      <>
                        <Link
                          to={`/users/${u.id}`}
                          className="inline-block px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => onDeleteClick(u)}
                          className="inline-block px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && pagination.last_page > 1 && (
        <div className="flex flex-col items-center mt-6">
          <nav className="inline-flex rounded-md shadow mb-2">
            <button
              onClick={() => changePage(1)}
              disabled={pagination.current_page === 1}
              className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              &laquo;
            </button>
            <button
              onClick={() => changePage(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              &lsaquo;
            </button>

            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`px-3 py-1 border-t border-b border-gray-300 text-sm ${
                  pagination.current_page === page
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => changePage(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              &rsaquo;
            </button>
            <button
              onClick={() => changePage(pagination.last_page)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
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
    </section>
  </div>
);

}