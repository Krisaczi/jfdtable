import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchUsers } from "../userSlice";
import style from "./style.module.scss";

const Table: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className={style.container}>
      <h1 className={style.title}>User Table</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={style.searchBar}
      />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th className={style.tableHeaders}>Name</th>
            <th className={style.tableHeaders}>Username</th>
            <th className={style.tableHeaders}>Email</th>
            <th className={style.tableHeaders}>Phone</th>
          </tr>
        </thead>
        <tbody className={style.tBody}>
          {filteredUsers.map((user) => (
            <tr key={user.id} className={style.tRow}>
              <td className={style.tCells}>{user.name}</td>
              <td className={style.tCells}>{user.username}</td>
              <td className={style.tCells}>{user.email}</td>
              <td className={style.tCells}>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
