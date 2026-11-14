// import { useContext, useEffect } from "react";
// import { AuthContext } from "../auth.context";
// import { login, logout, register, getMe } from "../services/auth.api"


// export const useAuth = () => {
//     const context = useContext(AuthContext);

//     const { user, setUser, loading, setloading } = context

//     const handleLogin = async ({ email, password }) => {
//         setloading(true)
//         try {
//             const data = await login({ email, password })
//             setUser(data.user)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setloading(false)
//         }


//     }

//     const handleRegister = async ({ email, password, user }) => {
//         setloading(true)
//         try {
//             const data = await register({ email, password, user })
//             setUser(data.user)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setloading(false)
//         }


//     }

//     const handleLogout = async () => {
//         setloading(true)
//         try {
//             const data = await logout()
//             setUser(null)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setloading(false)
//         }


//     }
//     useEffect(() => {

//         const GetAndSetme = async () => {

//             try {
//                 const data = await getMe()
//                 setUser(data.user)
//             }
//             catch (error) {
               
//             }finally{
//                  setloading(false)
//             }


//         }

//         GetAndSetme()

//     }, [])

//     return { user, loading, handleRegister, handleLogin, handleLogout }
// }


// import { useContext, useEffect } from "react";
// import { AuthContext } from "../auth.context";
// import {
//     login,
//     logout,
//     register,
//     getMe
// } from "../services/auth.api";

// export const useAuth = () => {
//     const context = useContext(AuthContext);

//     if (!context) {
//         throw new Error("useAuth must be used inside AuthProvider");
//     }

//     const { user, setUser, loading, setloading } = context;

//     // LOGIN
//     const handleLogin = async ({ email, password }) => {
//         setloading(true);

//         try {
//             const data = await login({ email, password });

//             setUser(data.user);

//             return data;
//         } catch (error) {
//             console.error("Login failed:", error);
//             throw error;
//         } finally {
//             setloading(false);
//         }
//     };

//     // REGISTER
//     const handleRegister = async ({ username, email, password }) => {
//         setloading(true);

//         try {
//             const data = await register({
//                 username,
//                 email,
//                 password
//             });

//             setUser(data.user);

//             return data;
//         } catch (error) {
//             console.error("Registration failed:", error);
//             throw error;
//         } finally {
//             setloading(false);
//         }
//     };

//     // LOGOUT
//     const handleLogout = async () => {
//         setloading(true);

//         try {
//             await logout();
//             setUser(null);
//         } catch (error) {
//             console.error("Logout failed:", error);
//             throw error;
//         } finally {
//             setloading(false);
//         }
//     };

//     // GET CURRENT USER
//     useEffect(() => {
//         const GetAndSetme = async () => {
//             try {
//                 const data = await getMe();
//                 setUser(data.user);
//             } catch (error) {
//                 if (error.response?.status === 401) {
//                     // User is not logged in.
//                     setUser(null);
//                 } else {
//                     console.error("Authentication check failed:", error);
//                     setUser(null);
//                 }
//             } finally {
//                 setloading(false);
//             }
//         };

//         GetAndSetme();
//     }, [setUser, setloading]);

//     return {
//         user,
//         loading,
//         handleRegister,
//         handleLogin,
//         handleLogout
//     };
// };


import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
    login,
    logout,
    register
} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const { user, setUser, loading, setloading } = context;

    // LOGIN
    const handleLogin = async ({ email, password }) => {
        setloading(true);

        try {
            const data = await login({ email, password });
            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    // REGISTER
    const handleRegister = async ({ username, email, password }) => {
        setloading(true);

        try {
            const data = await register({
                username,
                email,
                password
            });

            setUser(data.user);
            return data;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    // LOGOUT
    const handleLogout = async () => {
        setloading(true);

        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    };
};
