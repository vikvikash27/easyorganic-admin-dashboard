// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// interface ProtectedRouteProps {
//   children: React.ReactElement;
// }

// // This component checks if the user is authenticated.
// // If they are, it renders the children components.
// // If not, it redirects to the /admin/login page.
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//         <div className="flex items-center justify-center h-screen">
//             <div>Loading...</div>
//         </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
