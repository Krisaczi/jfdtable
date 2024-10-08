import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import UserTable from "./Table/Table";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserTable />
      </div>
    </Provider>
  );
};

export default App;
