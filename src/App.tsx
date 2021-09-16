import React, { useEffect, createContext } from "react";
import RouterComp from "./router";
import "./App.css";
import { useHistory } from "react-router";
import GetAuth from "@/api/GetAuth";
import { useRequest, useSetState } from "ahooks";
import { message } from "antd";

export interface IUserInfo {
  username: string;
  setUserName: (username: string) => void;
}

const initContext: IUserInfo = {
  username: null,
  setUserName: null,
};

const UserContext = createContext<IUserInfo>(initContext);

const App = () => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useSetState<IUserInfo>(initContext);

  const setUserName = (username: string) => {
    setUserInfo({ username });
  };

  const { run: getAuth } = useRequest(GetAuth.request, {
    manual: true,
    onSuccess: (result) => {
      setUserName(result.data.username);
    },
    onError: () => {
      message.error("请先登录");
      history.push("/login");
    },
  });

  const getUserInfo = () => {
    if (window.location.pathname !== "/login") {
      getAuth({});
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ username: userInfo.username, setUserName }}>
      <RouterComp />
    </UserContext.Provider>
  );
};

export default App;
