import './main.css';

const Header = () => {

    const userId = localStorage.getItem("id");

    const logout = () => {
        localStorage.removeItem("id");
        window.location.replace("/");
    }

    return (
        <>
        <header id='header'>
            <div className="container">
                <a className="logo" href="http://localhost:3000">MOVA</a>
                <div>
                    {userId ? 
                        (
                           
                            <>
                                <a className="create-btn" href="http://localhost:3000/makeroom">방개설</a>
                                <a className="mypage-btn" href="http://localhost:3000/makeroom">마이페이지</a>
                                <a className="logout-btn" href="#!" onClick={logout}>로그아웃</a>
                            </>
                        ) : 
                        (
                            <>
                                <a className="create-btn" href="http://localhost:3000/join">회원가입</a>
                                <a className="login-btn" href="http://localhost:3000/login">로그인</a>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </header>
        </>
    )
}

export default Header;