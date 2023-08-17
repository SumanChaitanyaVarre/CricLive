import React from "react";
import { useContext, useState, useEffect } from "react";
import background from "./banner-2.jpg";
import { useNavigate } from "react-router";

const SignupPage = () => {
  // const { setUser } = useContext(AccountContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [country, setCountry] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true);
  const [error_msg, setError_msg] = useState("");
  const [error, setError] = useState(null);
  // var error_msg = "(Password valid or invalid message)";
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password, confirm_password, country, phone_no, age };
      const response = await fetch("http://localhost:8080/check_signup", {
        credentials: 'include',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      console.log(`Username : ${username} Password : ${password}`)
      const jsonData = await response.json();
      console.log(`username already exists : ${jsonData.exists}`);
      if (!jsonData.exists) {
        // navigate('/login');
        window.location.replace(`http://localhost:3000/login`);

      }
      else {
        setUsername("");
        setPassword("");
        setConfirm_password("");
        setError_msg(jsonData.status);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getData = async () => {
    try {
      const cookie = document.cookie;
      const cookieArray = cookie.split(";");
      const cookieExists = cookieArray.some((item) => item.trim().startsWith("nameOfCookie="));
      console.log('checking cookie');
      console.log(cookieExists);
      const response = await fetch("http://localhost:8080/signup", {
        method: "GET",
        credentials: 'include'
      }).then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log('home_page got no response from backend');
            // setAuthed(data['authenticated']);
            setLoading(true);
          }
          else {
            console.log('home_page got response from backend');
            console.log(data);
            if (data['authenticated']) {
              // navigate('/home');
              window.location.replace(`http://localhost:3000/home`);

              // setAuthed(data['authenticated']);
            }
            else {
              // setAuthed(data['authenticated']);
              setLoading(false);
            }

          }

        })
        .catch((error) => {
          console.error(error);
          // setAuthed(data['authenticated']);
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
            <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>Create Account</h3></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <>
                    <label className="mb-0">Username<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" name="uname" required value={username}
                      onChange={e => setUsername(e.target.value)} />
                  </>
                </div>
                <div className="form-group">
                  <label className="mb-0">Password<span className="text-danger">*</span></label>
                  <input type="password" className="form-control" name="pass" required value={password}
                    onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <>
                    <label className="mb-0">confirm Password<span className="text-danger">*</span></label>
                    <input type="password" className="form-control" name="pass" required value={confirm_password}
                      onChange={e => setConfirm_password(e.target.value)} />
                  </>
                </div>
                <div className="form-group">
                  <>
                    <label className="mb-0">Country<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" name="uname" required value={country}
                      onChange={e => setCountry(e.target.value)} />
                  </>
                </div>
                <div className="form-group">
                  <>
                    <label className="mb-0">Phone No.<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" name="uname" required value={phone_no}
                      onChange={e => setPhone_no(e.target.value)} />
                  </>
                </div>
                <div className="form-group">
                  <>
                    <label className="mb-0">Age<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" name="uname" required value={age}
                      onChange={e => setAge(e.target.value)} />
                  </>
                </div>
                <p className="text-center mb-0"><input type="submit" className="btn btn-success" value="Signup" /></p>
              </form>
              <p align='center'> Already have an account? <a href={`/login`}>Login</a></p>
              <b><p style={{ color: 'red' }}>{error_msg}</p></b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;