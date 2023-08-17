import React from "react";
import { useContext, useState, useEffect } from "react";
import background from "./banner-2.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error_msg, setError_msg] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await fetch("http://localhost:8080/check_login", {
        credentials: 'include',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      console.log(`Username : ${username} Password : ${password}`)
      const jsonData = await response.json();
      console.log(`response in login : ${jsonData.loggedIn}`);
      if (jsonData.loggedIn) {
        window.location.replace(`http://localhost:3000/home`);
      }
      else {
        setUsername("");
        setPassword("");
        setError_msg(jsonData.status);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "GET",
        credentials: 'include'
      }).then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log('home_page got no response from backend');
            setLoading(true);
          }
          else {
            console.log('home_page got response from backend');
            console.log(data);
            if (data['authenticated']) {
              window.location.replace(`http://localhost:3000/home`);
            }
            else {
              setLoading(false);

            }
          }

        })
        .catch((error) => {
          console.error(error);
          setLoading(true);
        })
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return loading ? <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div> : (
    <>
      <div style={{
        backgroundImage: `url(${background})`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}>
          <div className="card shadow-sm border-0 px-3 rounded-5 mb-3 py-4 mx-auto mt-5 bg-light">
            <h1 align='center'>CricLive</h1>
            <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>User Login</h3></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="mb-0">Username<span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="uname" required value={username}
                    onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="mb-0">Password<span className="text-danger">*</span></label>
                  <input type="password" className="form-control" name="pass" required value={password}
                    onChange={e => setPassword(e.target.value)} />
                </div>
                <p className="text-center mb-0"><input type="submit" className="btn btn-success" value="Login" /></p>
              </form>
              <p align='center'> Create an account? <a href={`/signup`}>SignUp</a></p>
              <b><p style={{ color: 'red' }}>{error_msg}</p></b>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginPage;