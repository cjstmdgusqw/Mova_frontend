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
                                <a className="create-btn" href="./makeroom">방개설</a>
                                <a className="login-btn" href="/login" onClick={logout}>로그아웃</a>
                            </>
                        ) : 
                        (
                            <>
                                <a className="create-btn" href="./join">회원가입</a>
                                <a className="login-btn" href="/login">로그인</a>
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