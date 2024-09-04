import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { fetchUsers } from "./userSlice";

const Table: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, status, error } = useSelector((state: RootState) => state.users);
    const [search, setSearch] = useState('');
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchUsers());
      }
    }, [status, dispatch]);
  
    const filteredUsers = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    )}


    return (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>{error}</p>}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default UserTable;