import { Routes, Route } from "react-router-dom";
import { PageRoutes } from "./config";
import { Login } from "../components/module/login";
import { Register } from "../components/module/register";
import { AddContact } from "../components/module/chat/addContact";
import { Chats } from "../components/module/chat/chat";

export const RouterOptions = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path={PageRoutes.Register} element={<Register />} />
      <Route path={PageRoutes.AddContact} element={<AddContact />} />
      <Route path={PageRoutes.Chats} element={<Chats />} />
    </Routes>
  );
};
