"use client"
import {  gql, useQuery } from "@apollo/client";
const ALL_USERS  = gql(`query ALL_USERS {
  users {
    name
  }
}`);

 export const User = () => {
    const { data, loading, error } = useQuery(ALL_USERS)

    if(loading) return <p>Loading...</p>
    return (
        <div>
            <h1>User</h1>
            {data && data.users.map((v,i) => (
                <div key={i}>
                    <p>{v?.name}</p>
                </div>
            ))}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
 }