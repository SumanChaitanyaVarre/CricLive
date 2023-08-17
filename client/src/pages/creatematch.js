import React, { useState, useEffect } from 'react';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
// import Autocomplete from 'react-autocomplete'

// const API_KEY = "8077996e-05f9-4c9c-981e-dc7b261fcf92"; //suman
// const API_KEY = "6c457d76-b1db-48d4-a11c-1ee7334b85f3"; //bhavana
// const API_KEY = "69815f80-e2a3-4329-b243-df3422192286"; //gowri
const API_KEY = "cf66066f-ad1b-4872-adfd-fb05b9c49307"; //bhavana2
// const url = "https://api.cricapi.com/v1/currentMatches?apikey=" + API_KEY + "&offset=0";

const CreateMatch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const [NavigationBar, setNavigationBar] = useState(() => NavigationBar1);

    const [format, setFormat] = useState('t20i');
    const [matchType, setMatchType] = useState('international');

    const [overs, setOvers] = useState("");

    const [scheduledTime, setScheduledTime] = useState(new Date().toISOString());
    const [team1, setTeam1] = useState("team 1");
    const [team2, setTeam2] = useState("team 2");
    const [venue, setVenue] = useState(null);
    const [umpire, setUmpire] = useState(null);
    const [matchData, setMatchData] = useState(null);
    // const [tossWinner, setTossWinner] = useState(null);
    // const [tossChoice, setTossChoice] = useState(null);
    // const [matchWinner, setMatchWinner] = useState(null);
    // const [winType, setWinType] = useState(null);
    // const [manOfTheMatch, setManOfTheMatch] = useState(null);
    // const [winMargin, setWinMargin] = useState(null);
    // const [attendance, setAttendance] = useState(null);


    // const [searched_data, setSearched_data] = useState([]);
    const [status, setStatus] = useState("None");
    // const items = "";


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { format, matchType, overs, scheduledTime, team1, team2, venue, umpire };
            const response = await fetch("http://localhost:8080/addMatch", {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })

            console.log({ format, matchType, overs, scheduledTime, team1, team2, venue, umpire })
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
                        setLoading1(true);
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
                        setLoading1(false);
                    }

                })
                .catch((error) => {
                    console.error(error);
                    setLoading1(true);
                })
        } catch (err) {
            console.error(err.message);
        }
    };

    const getMatchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/matchData", {
                method: "GET",
                credentials: 'include'
            }).then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.log('page got no response from backend');
                        setLoading2(true);
                    }
                    else {
                        console.log('\page got response from backend');
                        console.log(data);
                        setMatchData(data);
                        setLoading2(false);
                    }

                })
                .catch((error) => {
                    console.error(error);
                    setLoading2(true);
                })
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {

        getAuthenticationData();
        getMatchData();
    }, []);
    if (error) {
        return (
            <p>
                An error occurred ({error.message})
                Kindly reload the page!
            </p>
        );
    }

    return loading1 || loading2 ?<p>Loading...</p>: (
        <>
            <NavigationBar />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
                <div className="card shadow-sm border-0 px-3 rounded-5 mb-3 py-4 mx-auto mt-5 bg-light">
                    <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>NEW MATCH</h3></div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div>
                                    <div class="dropdown">
                                        <label htmlFor="option">FORMAT : &nbsp;</label>
                                        <button class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {format}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button onClick={() => { setFormat('t20i'); }} class="dropdown-item" >t20i</button>
                                            <button onClick={() => { setFormat('odi'); }} class="dropdown-item" >odi</button>
                                            <button onClick={() => { setFormat('test'); }} class="dropdown-item" >test</button>
                                            <button onClick={() => { setFormat('others'); }} class="dropdown-item" >others</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="mb-0">OVERS :<span className="text-danger">*</span></label>
                                <input type="number" className="form-control" name="uname" required value={overs}
                                    onChange={e => setOvers(e.target.value)} />
                            </div>


                            <div className="form-group">
                                <div>
                                    <div class="dropdown">
                                        <label htmlFor="option">VENUE : &nbsp;</label>
                                        <button class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {venue}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {matchData['venues'].map(d => (
                                                <button onClick={() => { setVenue(d['venue_name']); }} class="dropdown-item" >{d['venue_name']}, {d['city_name']}, {d['country_name']}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div>
                                    <div class="dropdown">
                                        <label htmlFor="option">MATCH TYPE : &nbsp;</label>
                                        <button class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {matchType}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {matchData['matchtypes'].map(d => (
                                                <button onClick={() => { setMatchType(d['type']); }} class="dropdown-item" >{d['type']}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div>
                                    <div class="dropdown">
                                        <label htmlFor="option">TEAM 1 : &nbsp;</label>
                                        <button class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {team1}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {matchData['teams'].map(d => (
                                                <button onClick={() => { setTeam1(d['team_name']); }} class="dropdown-item" >{d['team_name']}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div>
                                    <div class="dropdown">
                                        <label htmlFor="option">TEAM 2 : &nbsp;</label>
                                        <button class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {team2}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {matchData['teams'].map(d => (
                                                <button onClick={() => { setTeam2(d['team_name']); }} class="dropdown-item" >{d['team_name']}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group">
                                <div>
                                    <label htmlFor="date">SCHEDULE : &nbsp;</label>
                                    <input class="form-control" type="datetime-local" id="date" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="mb-0">UMPIRE :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={umpire}
                                    onChange={e => setUmpire(e.target.value)} />
                            </div>




                            <p className="text-center mb-0"><input type="submit" className="btn btn-success" value="CREATE MATCH" /></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

};

export default CreateMatch