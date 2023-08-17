import React, { useState, useEffect } from 'react';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

const CreateVenue = () => {
    const [loading, setLoading] = useState(true);
    const [NavigationBar, setNavigationBar] = useState(() => NavigationBar1);

    const [venueName, setVenueName] = useState("");
    const [cityName, setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [capacity, setCapacity] = useState("");

    const [status, setStatus] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { venueName, cityName, countryName, capacity };
            const response = await fetch("http://localhost:8080/addVenue", {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            console.log({ venueName, cityName, countryName, capacity })
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
                    <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>NEW VENUE</h3></div>
                    <b><p style={{ color: 'red' }}> *USE ONLY BLOCK LETTERS</p></b>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label className="mb-0">VENUE :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={venueName}
                                    onChange={e => setVenueName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="mb-0">CITY :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={cityName}
                                    onChange={e => setCityName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="mb-0">COUNTRY :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={countryName}
                                    onChange={e => setCountryName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="mb-0">CAPACITY :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={capacity}
                                    onChange={e => setCapacity(e.target.value)} />
                            </div>

                            <p className="text-center mb-0"><input type="submit" className="btn btn-success" value="CREATE VENUE" /></p>
                        </form>
                        <b><p style={{ color: 'red' }}>{status}</p></b>
                    </div>
                </div>
            </div>
        </>
    )

};

export default CreateVenue