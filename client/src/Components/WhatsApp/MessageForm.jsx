// import { useForm } from '@inertiajs/react';

// export default function MessageForm({ disabled }) {
//   const { data, setData, post, processing, errors } = useForm({
//     number: '',
//     message: ''
//   });


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     post('/api/whatsapp/send');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//         <input
//           type="text"
//           placeholder="628xxxxxxx"
//           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
//             disabled ? 'bg-gray-100' : ''
//           }`}
//           value={data.number}
//           onChange={(e) => setData('number', e.target.value)}
//           disabled={disabled || processing}
//           required
//         />
//         {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number}</p>}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Message</label>
//         <textarea
//           rows={4}
//           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
//             disabled ? 'bg-gray-100' : ''
//           }`}
//           value={data.message}
//           onChange={(e) => setData('message', e.target.value)}
//           disabled={disabled || processing}
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={disabled || processing}
//         className={`px-4 py-2 rounded-md text-white ${
//           disabled ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
//         }`}
//       >
//         {processing ? 'Sending...' : 'Send Message'}
//       </button>
//     </form>
//   );
// }