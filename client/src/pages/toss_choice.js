import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

const AddResult = () => {
  let { match_id } = useParams();
  const [tossWinner, setTossWinner] = useState(null);
  const [tossChoice, setTossChoice] = useState(null);
  const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [NavigationBar, setNavigationBar] = useState(() => NavigationBar1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Submit the form data to the server
    try {
        const body = {tossWinner,tossChoice,match_id};
        const response = await fetch("http://localhost:8080/addtoss", {
            credentials: 'include',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        //console.log({format, matchType, scheduledTime, team1, team2, venue, umpire})
        const jsonData = await response.json();
        console.log(`response in login : ${jsonData.loggedIn}`);
        if (jsonData.loggedIn) {
            // navigate('/home');
            window.location.replace(`http://localhost:3000/home`);
        }
        else {
            // setUsername("");
            // setPassword("");
            // setError_msg(jsonData.status);
        }
    } catch (err) {
        console.error(err.message);
    }

  };

  const getAuthenticationData = async () => {
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
                        setNavigationBar(() => NavigationBar1);
                    }
                    else {
                        setNavigationBar(() => NavigationBar2);
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

    getAuthenticationData();
}, []);
if (error) {
    return (
        <p>
            An error occurred ({error.message})
            Kindly reload the page!
        </p>
    );
}

  return (
    <>
            <NavigationBar />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>

            <form onSubmit={handleSubmit}>

                                <div>
                                <label className="mb-0">Toss winner :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={tossWinner}
                                onChange={e => setTossWinner(e.target.value)} />
                                </div>
                            

                                <div>
                                    <div class="dropdown">
                                        <label htmlFor="option">Toss Choice : &nbsp;</label>
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {tossChoice}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button onClick={() => { setTossChoice('bat'); }} class="dropdown-item" >bat</button>
                                            <button onClick={() => { setTossChoice('field'); }} class="dropdown-item" >field</button>
                                        </div>
                                    </div>
                                </div>

                </form>
                            <button class="register-btn" onClick={() => handleSubmit( )}>Submit</button>


                        </div>



            </>
    
  );
};



export default AddResult;
