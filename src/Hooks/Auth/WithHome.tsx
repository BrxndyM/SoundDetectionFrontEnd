import {  useUser } from '../../providers/SignIn';
import React, { ComponentType, FC, useState, useEffect } from 'react';


/**
 *
 * @param Component - the component that is passed into the HOC can be either a function component or class component.
 *
 * @see https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
 */

// eslint-disable-next-line react/display-name
export const withHome = <P extends object>(Component: ComponentType<P>): FC<P> => (props: P) => {
 
  const {currentUser ,getUserDetails } = useUser();

useEffect(() => {
if(!currentUser?.userName){
    let userId=JSON.parse(localStorage.getItem('userInfo'))?.userId;
   if(userId) getUserDetails(userId)

}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);



  return (
   <Component {...props} />
  );
  }

export default withHome;