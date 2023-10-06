import './App.css';
import { Routes, Route } from 'react-router-dom';
import Join from './Component/member/join';
import Login from './Component/member/login';
import Main from './Component/main/main';
import Header from './Component/main/header';
import Makeroom from './Component/room/makeroom';
import Selectroom from './Component/room/Selectroom';
import SelectNotice from './Component/notice/selectnotice';
import WriteAnouncement from './Component/writepage/writeAnouncement';
import Mypage from './Component/member/mypage';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Main/>}/>
        <Route exact path='/join' element={<Join/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/makeroom/' element={<Makeroom/>}/>
        <Route exact path='/mypage/:id/' element={<Mypage/>}/>
        <Route exact path='/room/:id/' element={<Selectroom/>}/>
        <Route exact path='/selectnotice/:id/' element={<SelectNotice/>}/>
        <Route exact path='/room/writeanouncement/:id' element={<WriteAnouncement/>}/>
      </Routes>
    </>
  );
}

export default App;
