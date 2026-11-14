// import { createContext , useState } from "react";
// import { getMe } from "./services/auth.api";

// export const AuthContext = createContext();


// export const AuthProvider = ({children}) =>{

//     const [user, setUser] = useState(null);
//     const [loading, setloading] = useState(false)

   
    

//     return(
//         <AuthContext.Provider value={{user,setUser, loading, setloading}}>
//             {children}
//         </AuthContext.Provider>
//     )

// }


import {
    createContext,
    useState,
    useEffect
} from "react";

import { getMe } from "./services/auth.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // Start with true to prevent premature login redirects
    const [loading, setloading] = useState(true);

    useEffect(() => {

        const checkAuth = async () => {

            try {
                const data = await getMe();

                if (data?.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }

            } catch (error) {

                console.error(
                    "Authentication Error:",
                    error.response?.data || error.message
                );

                setUser(null);

            } finally {
                setloading(false);
            }
        };

        checkAuth();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setloading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
