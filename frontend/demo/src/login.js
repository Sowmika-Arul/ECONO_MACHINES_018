// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function LoginForm() {
//   const [role, setRole] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
//     try {
//       console.log('Sending request with role:', role, 'email:', email, 'password:', password);
//       const response = await axios.post('http://localhost:4000/login', { role, email, password });
//       console.log('Response:', response);
//       setMessage(response.data.message);
//       if (response.status === 200) {
//         const { role } = response.data;
//         if (role === 'admin') {
//           navigate('/dashboard'); // Redirect to admin dashboard
//         } else if (role === 'phycist') {
//           navigate('/dashboard1'); // Redirect to physicist dashboard
//         } else {
//           setMessage('Unauthorized role'); // Handle unauthorized role (optional)
//         }
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage('Login failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-form">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Role:</label>
//           <input
//             type="text"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="button" onClick={() => setShowPassword(!showPassword)}>
//             {showPassword ? 'Hide' : 'Show'}
//           </button>
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default LoginForm;
