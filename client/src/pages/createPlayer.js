import React, { useState, useEffect } from 'react';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

const CreatePlayer = () => {
    const [loading, setLoading] = useState(true);
    const [NavigationBar, setNavigationBar] = useState(() => NavigationBar1);

    const [playerName, setPlayerName] = useState("");
    const [role, setRole] = useState("select role");
    const [dob, setDob] = useState("");
    const [battingHand, setBattingHand] = useState("batting hand");
    const [bowlingStyle, setBowlingStyle] = useState("");
    const [country, setCountry] = useState("");
    const [profile, setProfile] = useState("");


    const [status, setStatus] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { playerName, role, dob, battingHand, bowlingStyle, country, profile };
            const response = await fetch("http://localhost:8080/addPlayer", {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            console.log({ playerName, role, dob, battingHand, bowlingStyle, country, profile });
            const jsonData = await response.json();
            console.log(jsonData.msg);
            if (jsonData.status) {
                window.location.replace(`http://localhost:3000/home`);
            }
            else {
                setStatus(jsonData.msg);
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
                            window.location.replace(`http://localhost:3000/`);
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

    return (
        <>
            <NavigationBar />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
                <div className="card shadow-sm border-0 px-3 rounded-5 mb-3 py-4 mx-auto mt-5 bg-light">
                    <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>NEW PLAYER</h3></div>
                    <b><p style={{ color: 'red' }}> *USE ONLY BLOCK LETTERS</p></b>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label className="mb-0">PLAYER NAME :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={playerName}
                                    onChange={e => setPlayerName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <div class="dropdown">
                                <label className="mb-0">ROLE : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                    <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                        {role}
                                    </button>
                                    
                                    <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button  onClick={() => { setRole('batsman'); }} class="form-control dropdown-item" >batsman</button>
                                        <button onClick={() => { setRole('bowler'); }} class="form-control dropdown-item" >bowler</button>
                                        <button  onClick={() => { setRole('all-rounder'); }} class="form-control dropdown-item" >all-rounder</button>
                                        <button onClick={() => { setRole('wicketkeeper-batsman'); }} class="form-control dropdown-item" >wicketkeeper-batsman</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label className="mb-0">DATE OF BIRTH :<span className="text-danger">*</span></label>
                                    <input class="form-control" type="date" id="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="dropdown">
                                <label className="mb-0">BATTING HAND : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                    <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                        {battingHand}
                                    </button>
                                    
                                    <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button  onClick={() => { setBattingHand('right'); }} class=" form-control dropdown-item" >right</button>
                                        <button onClick={() => { setBattingHand('left'); }} class="form-control dropdown-item" >left</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mb-0">BOWLING STYLE :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={bowlingStyle}
                                    onChange={e => setBowlingStyle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="mb-0">COUNTRY :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={country}
                                    onChange={e => setCountry(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="mb-0">PROFILE :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={profile}
                                    onChange={e => setProfile(e.target.value)} />
                            </div>

                            <p className="text-center mb-0"><input type="submit" className="btn btn-success" value="CREATE PLAYER" /></p>
                        </form>
                        <b><p style={{ color: 'red' }}>{status}</p></b>
                    </div>
                </div>
            </div>
        </>
    )

};

export default CreatePlayer