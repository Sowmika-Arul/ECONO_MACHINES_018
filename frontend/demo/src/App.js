
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginForm from './LoginForm';
// import Dashboard from './Dashboard';
// import EntriesTable from './EntriesTable';
// import NotFound from './NotFound'; // Import the NotFound component

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/entries" component={<EntriesTable/>} />
//         <Route path="*" element={<NotFound />} /> {/* Handle undefined paths */}
//       </Routes>
//     </Router>
//   );
// }
// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Dashboard1 from './Dashboard1';
import EntriesTable from './EntriesTable';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/entries" component={<EntriesTable/>} />
      </Routes>
    </Router>
  );
}

export default App;



