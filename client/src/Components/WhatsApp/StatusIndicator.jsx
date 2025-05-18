// export default function StatusIndicator({ status }) {
//     const statusMap = {
//       loading: { text: 'Loading...', color: 'bg-blue-100 text-blue-800' },
//       connected: { text: '✅ Connected', color: 'bg-green-100 text-green-800' },
//       disconnected: { text: '❌ Disconnected', color: 'bg-red-100 text-red-800' },
//       error: { text: '⚠️ Service Error', color: 'bg-yellow-100 text-yellow-800' }
//     };
  
//     return (
//       <div className={`mb-6 p-4 rounded-lg ${statusMap[status]?.color || 'bg-gray-100'}`}>
//         Status: {statusMap[status]?.text || status}
//       </div>
//     );
//   }