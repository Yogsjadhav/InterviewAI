

// import { RouterProvider } from 'react-router-dom'
// // import { router } from './auth.routes.jsx'

// import { router } from './auth.routes.jsx'
// import { AuthProvider } from './features/auth/auth.context.jsx'
// import { InterviewProvider} from './features/interview/interview.context.jsx'


// function App() {


//   return (
//     <AuthProvider>
//       <InterviewProvider>
//         <RouterProvider router={router} />
//       </InterviewProvider>
//     </AuthProvider>
//   )
// }

// export default App


import { RouterProvider } from "react-router-dom";
import router from "./auth.routes.jsx";

function App() {
    return <RouterProvider router={router} />;
}

export default App;

