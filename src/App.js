import Home from "./components/home/Home";
import Register from "./components/register/Register";
import LogInForm from "./components/login/LogIn";
import { Routes, Route } from "react-router-dom";
import HomeLogged from "./components/home/HomeLogged";
import CreatePost from "./components/home/CreatePost";
import UserInfo from "./components/home/UserInfo";
import Topic1 from "./components/home/topic/Topic1";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="login" element={<LogInForm />}></Route>
      <Route path="home" element={<HomeLogged />}></Route>
      <Route path="create-post" element={<CreatePost />}></Route>
      <Route path="user-info" element={<UserInfo />}></Route>

      {/* Chủ đề bài viết */}
      <Route path="/topic1" element={<Topic1 />}></Route>
    </Routes>
  );
}

export default App;
