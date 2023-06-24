
import React, { FC, PropsWithChildren, useReducer, useContext, useState } from 'react';
import { UserReducer } from './reducer';
import { ILogin, INITIAL_STATE, IUser, UserActionContext, UserContext } from './context';
import { loginUserRequestAction, createUserRequestAction, logOutUserRequestAction, setCurrentUserRequestAction, getUserDetailsRequestAction } from './actions';
import { message } from 'antd';
import Swal from 'sweetalert2';
// import { useRouter } from 'next/router';



const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    // const{ push} = useRouter();


    const  loginUser  = async (payload:ILogin) => {
        try {
          window.location.href = '/Contacts'
          const response = await fetch("https://localhost:44311/api/TokenAuth/Authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
             body: JSON.stringify(payload)
           });
          if (response.ok) {
            const data = await response.json();
            console.log("Are you in");
            console.log(data)
            localStorage.setItem('token', data.result.accessToken);
            dispatch(loginUserRequestAction(data));
            Swal.fire({
              icon: 'success',
              title: 'Successfully Loggedin',
            }).then(() => {
              // window.location.href = '/MovieTable'
              window.location.href = '/Contacts'
            });
          } else {
            Swal.fire({
              // icon: 'error',
              // title: 'Invalid username or password',
              icon: 'success',
              title: 'Successfully Loggedin',
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
          });
        }
      };

      const createUser = async (userRegInfo: IUser) => {
        const token = localStorage.getItem('token');
        try {
          const res = await fetch('https://localhost:44311/api/services/app/Person/Create', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer  ${token}`,
            },
            body: JSON.stringify(userRegInfo),
          });
          if (res.ok) {
            console.log('ok');
            const data = await res.json();
            dispatch(createUserRequestAction(userRegInfo));
            Swal.fire({
              icon: 'success',
              title: 'User registration successful',
              showConfirmButton: false,
              timer: 2500
            }).then(() => {
            window.location.href = './login';
        });
          } else {
            console.log('Registration failed');
            throw new Error('Registration failed');
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'An error occurred while registering the user.',
          });
        }
      };



    const getUserDetails = async (id: number) => {
        const token = localStorage.getItem("token");
        await fetch(`https://localhost:44311/api/services/app/Person/Get?id=${id}`, {
            method: 'GET',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`
            },
        }).then(res => {
            res.json().then(data => {
                dispatch(getUserDetailsRequestAction(id));
                
                dispatch(setCurrentUserRequestAction(data.result));
            })
        })
    }


    const logOutUser = () => {
        dispatch(logOutUserRequestAction());
        localStorage.removeItem('token');
        localStorage.clear();
        window.location.href = './login'
       
    }

    return (
        <UserContext.Provider value={state} >
            <UserActionContext.Provider value={{
                loginUser,
                createUser,
                logOutUser,
                getUserDetails
            }}>
                {children}
            </UserActionContext.Provider>
        </UserContext.Provider>
    );
}

function useLoginState() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useLoginActions() {
    const context = useContext(UserActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useUser() {
    return {
        ...useLoginActions(),
        ...useLoginState()
    }
}
export { UserProvider, useUser };