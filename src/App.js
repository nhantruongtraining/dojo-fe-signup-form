import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import SignupForm from './view/SignupForm';
import UserList from './view/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} element={<UserList />} />
        <Route exact path={"/signup"} element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
