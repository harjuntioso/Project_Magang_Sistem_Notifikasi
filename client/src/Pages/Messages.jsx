import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { checkWhatsAppStatus } from '../axiosClient';


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - replace with actual API calls to your Laravel backend
  const mockMessages = [
    {
      id: 1,
      number: '6281234567890',
      message: 'Your appointment is confirmed for tomorrow at 2 PM',
      status: 'delivered',
      timestamp: '2023-05-15T14:30:00Z',
      direction: 'outgoing'
    },
    {
      id: 2,
      number: '6289876543210',
      message: 'Payment received. Thank you!',
      status: 'read',
      timestamp: '2023-05-14T10:15:00Z',
      direction: 'outgoing'
    },
    {
      id: 3,
      number: '6281122334455',
      message: 'Hello, I have a question about my order',
      status: 'pending',
      timestamp: '2023-05-13T09:45:00Z',
      direction: 'incoming'
    },
  ];

  useEffect(() => {
    const fetchStatusAndMessages = async () => {
      try {
        // Check WhatsApp connection status
        const statusResponse = await checkWhatsAppStatus();
        setStatus(statusResponse.data.status);
        
        // In a real app, you would fetch messages from your API here
        // const messagesResponse = await getMessages();
        // setMessages(messagesResponse.data);
        
        // Using mock data for now
        setMessages(mockMessages);
      } catch (err) {
        setError('Failed to load messages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusAndMessages();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      // Add actual refresh logic here
      const statusResponse = await checkWhatsAppStatus();
      setStatus(statusResponse.data.status);
      // Simulate refresh delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Refresh failed');
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    // Apply search filter
    const matchesSearch = 
      message.number.includes(searchTerm) || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesFilter = 
      selectedFilter === 'all' || 
      (selectedFilter === 'incoming' && message.direction === 'incoming') ||
      (selectedFilter === 'outgoing' && message.direction === 'outgoing');
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      delivered: 'bg-blue-100 text-blue-800',
      read: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getDirectionIcon = (direction) => {
    return direction === 'outgoing' ? (
      <span className="text-green-500">↑</span>
    ) : (
      <span className="text-blue-500">↓</span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Message History</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`flex items-center px-3 py-2 border rounded-md ${loading ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'} transition-colors`}
          >
            <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">
              WhatsApp: {status === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {filteredMessages.length} {filteredMessages.length === 1 ? 'message' : 'messages'} found
          </span>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by number or message..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Messages</option>
              <option value="outgoing">Sent</option>
              <option value="incoming">Received</option>
            </select>
          </div>
        </div>
      </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
          <div className="animate-pulse flex flex-col space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No messages found</div>
          ) : (
            <ul className="divide-y divide-gray-200">
          {filteredMessages.map((message) => (
            <li key={message.id} className="hover:bg-gray-50 transition-colors">
              <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getDirectionIcon(message.direction)}
                <p className="font-medium text-gray-900 truncate">
              {message.number}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(message.timestamp).toLocaleString()}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 line-clamp-2">
                {message.message}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                {getStatusBadge(message.status)}
              </div>
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => window.location.href = '/send-message'}
              >
                View Details
              </button>
            </div>
              </div>
            </li>
          ))}
            </ul>
          )}
        </div>

        {/* Pagination would go here */}
      {filteredMessages.length > 0 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded border bg-blue-500 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Messages;