import React, {useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const inputId = (event) => {
    setId(event.target.value);
  }
  const inputPwd = (event) => { 
    setPwd(event.target.value);
  }
  const checkHandler = () => {
    if(!localStorage.getItem(`${id}`)) {
      return alert('아이디를 다시 확인해주세요!');
    }

    const pwdInStorage = JSON.parse(localStorage.getItem(`${id}`)).password;
    if(pwdInStorage !== pwd) {
      console.log(pwd, pwdInStorage);
      return alert('비밀번호가 잘못되었습니다!');
    }
    alert('로그인 성공!');
  }
  
  return (
    <section className='login'>
      <form className='login-form' onSubmit={checkHandler}>
        <h1>로그인페이지</h1>
        <input id="id" type="text" placeholder='아이디'
        onChange={inputId} value={id}/>
        <input id="password" type="password" placeholder='비밀번호'
        onChange={inputPwd} value={pwd}/>
        <button type='submit'>로그인</button>
        <button type='button' onClick={e => e.preventDefault()}>
          <Link to="/memRegi">회원가입</Link>
        </button>
      </form>
    </section>
  );
}

export default App;
