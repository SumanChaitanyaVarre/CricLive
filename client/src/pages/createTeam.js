import React, { useState, useEffect } from 'react';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

const CreateTeam = () => {
    const [loading, setLoading] = useState(true);
    const [NavigationBar, setNavigationBar] = useState(() => NavigationBar1);

    const [teamName, setTeamName] = useState(null);
    const [status, setStatus] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { teamName };
            const response = await fetch("http://localhost:8080/addTeam", {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            console.log({ teamName })
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
                    <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>NEW TEAM</h3></div>
                    <b><p style={{ color: 'red' }}> *USE ONLY BLOCK LETTERS</p></b>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label className="mb-0">TEAM NAME :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={teamName}
                                    onChange={e => setTeamName(e.target.value)} />
                            </div>

                            <p className="text-center mb-0"><input type="submit" className="btn btn-success" value="CREATE TEAM" /></p>
                        </form>
                        <b><p style={{ color: 'red' }}>{status}</p></b>
                    </div>
                </div>
            </div>
        </>
    )

};

export default CreateTeam