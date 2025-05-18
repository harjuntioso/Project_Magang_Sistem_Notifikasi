// import { Head } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import StatusIndicator from '@/Components/WhatsApp/StatusIndicator';
// import QRScanner from '@/Components/WhatsApp/QRScanner';
// import MessageForm from '@/Components/WhatsApp/MessageForm';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function WhatsAppSender({ auth }) {
//   const [status, setStatus] = useState('loading');
//   const [qrCode, setQrCode] = useState(null);

//   // Check WhatsApp status every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       axios.get('/api/whatsapp/status')
//         .then(response => {
//           setStatus(response.data.status);
//           setQrCode(response.data.qr_code);
//         })
//         .catch(() => setStatus('error'));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <AuthenticatedLayout user={auth.user}>
//       <Head title="WhatsApp Sender" />

//       <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            
//             <StatusIndicator status={status} />
            
//             {status !== 'connected' && qrCode && (
//               <QRScanner qrCode={qrCode} />
//             )}

//             <MessageForm disabled={status !== 'connected'} />
//           </div>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }