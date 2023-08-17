import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

const CreateBall = () => {

    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const [NavigationBar, setNavigationBar] = useState(() => NavigationBar1);
    const { match_id } = useParams();
    const [innings, setInnings] = useState(null);
    const [overId, setOverId] = useState(null);
    const [ballId, setBallId] = useState(null);
    const [ballCount, setBallCount] = useState(null);
    const [runsScored, setRunsScored] = useState(null);
    const [extraRuns, setExtraRuns] = useState(null);
    const [extraType, setExtraType] = useState(null);
    const [outType, setOutType] = useState(null);
    const [fielder, setFielder] = useState(null);
    const [striker, setStriker] = useState(null);
    const [nonStriker, setNonStriker] = useState(null);
    const [bowler, setBowler] = useState(null);
    const [area, setArea] = useState(null);
    const [playerRunout, setPlayerRunout] = useState(null);

    const [playerMatchData, setPlayerMatchData] = useState(null);



    const [status, setStatus] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { match_id, innings, overId, ballId, ballCount, runsScored, extraRuns, extraType, outType, playerRunout, fielder, striker, nonStriker, bowler, area };
            console.log({ match_id, innings, overId, ballId, ballCount, runsScored, extraRuns, extraType, outType, playerRunout, fielder, striker, nonStriker, bowler, area });

            if(match_id && innings && overId && ballId && ballCount && runsScored && extraRuns && extraType && outType && playerRunout && fielder && striker && nonStriker && bowler && area){
            
                const response = await fetch("http://localhost:8080/addBall", {
                    credentials: 'include',
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                })


            const jsonData = await response.json();
            console.log(jsonData.msg);
            if (jsonData.status) {
                window.location.replace(`http://localhost:3000/home`);
            }
            else {
                setStatus(jsonData.msg);
            }
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

    const getPlayerMatchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/playerMatchData/${match_id}`, {
                method: "GET",
                credentials: 'include'
            }).then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.log('got no response from backend');
                        setLoading2(true);
                    }
                    else {
                        console.log('got response from backend');
                        console.log(data);
                        setPlayerMatchData(data);
                        setLoading2(false)
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
        // console.log(id);
        getAuthenticationData();
        getPlayerMatchData();
    }, []);

    return loading1 || loading2 ?<p>Loading...</p>: (
        <>
            <NavigationBar />

            <div style={{
                flexwrap: 'wrap',
                display: 'flex',
                direction: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                // height: '100vh',
            }}>
                <div className="card shadow-sm border-0 px-3 rounded-5 mb-3 py-4 mx-auto mt-5 bg-light">
                    <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>NEW BALL</h3></div>
                    <b><p style={{ color: 'red' }}> *USE ONLY BLOCK LETTERS</p></b>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className='parent'>
                                <div className="form-group">
                                    <label className="mb-0">INNINGS :<span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name="uname" required value={innings}
                                        onChange={e => setInnings(e.target.value)} />
                                </div>
                                {/* <div className="form-group">
                                    <label className="mb-0">STRIKER :<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="uname" required value={striker}
                                        onChange={e => setStriker(e.target.value)} />
                                </div> */}

                                <div className="form-group">
                                    <div class="dropdown">
                                        <label className="mb-0">STRIKER : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                        <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                            {striker}
                                        </button>

                                        <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {playerMatchData['player_data'].map(d => (
                                                <button onClick={() => { setStriker(d['player_name']); }} class="dropdown-item" >{d['player_name']}</button>
                                            ))}
                                        </div>


                                    </div>
                                </div>

                                {/* <div className="form-group">
                                    <label className="mb-0">NON STRIKER :<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="uname" required value={nonStriker}
                                        onChange={e => setNonStriker(e.target.value)} />
                                </div> */}

                                <div className="form-group">
                                    <div class="dropdown">
                                        <label className="mb-0">NON STRIKER : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                        <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                            {nonStriker}
                                        </button>

                                        <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {playerMatchData['player_data'].map(d => (
                                                <button onClick={() => { setNonStriker(d['player_name']); }} class="dropdown-item" >{d['player_name']}</button>
                                            ))}
                                        </div>


                                    </div>
                                </div>

                                {/* <div className="form-group">
                                    <label className="mb-0">BOWLER :<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="uname" required value={bowler}
                                        onChange={e => setBowler(e.target.value)} />
                                </div> */}

                                <div className="form-group">
                                    <div class="dropdown">
                                        <label className="mb-0">BOWLER : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                        <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                            {bowler}
                                        </button>

                                        <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {playerMatchData['player_data'].map(d => (
                                                <button onClick={() => { setBowler(d['player_name']); }} class="dropdown-item" >{d['player_name']}</button>
                                            ))}
                                        </div>


                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="mb-0">OVER :<span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name="uname" required value={overId}
                                        onChange={e => setOverId(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="dropdown">
                                    <label className="mb-0">BALL : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                    <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                        {ballId}
                                    </button>

                                    <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button onClick={() => { setBallId('1'); }} class="form-control dropdown-item" >1</button>
                                        <button onClick={() => { setBallId('2'); }} class="form-control dropdown-item" >2</button>
                                        <button onClick={() => { setBallId('3'); }} class="form-control dropdown-item" >3</button>
                                        <button onClick={() => { setBallId('4'); }} class="form-control dropdown-item" >4</button>
                                        <button onClick={() => { setBallId('5'); }} class="form-control dropdown-item" >5</button>
                                        <button onClick={() => { setBallId('6'); }} class="form-control dropdown-item" >6</button>
                                    </div>

                                </div>
                            </div>

                            <div className="form-group">
                                <label className="mb-0">BALL COUNT :<span className="text-danger">*</span></label>
                                <input type="number" className="form-control" name="uname" required value={ballCount}
                                    onChange={e => setBallCount(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <div class="dropdown">
                                    <label className="mb-0">STRIKER RUNS : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                    <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                        {runsScored}
                                    </button>

                                    <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button onClick={() => { setRunsScored('0'); }} class="form-control dropdown-item" >0</button>
                                        <button onClick={() => { setRunsScored('1'); }} class="form-control dropdown-item" >1</button>
                                        <button onClick={() => { setRunsScored('2'); }} class="form-control dropdown-item" >2</button>
                                        <button onClick={() => { setRunsScored('3'); }} class="form-control dropdown-item" >3</button>
                                        <button onClick={() => { setRunsScored('4'); }} class="form-control dropdown-item" >Four</button>
                                        {/* <button  onClick={() => { setRunsScored('5'); }} class="form-control dropdown-item" >5</button> */}
                                        <button onClick={() => { setRunsScored('6'); }} class="form-control dropdown-item" >Six</button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div class="dropdown">
                                    <label className="mb-0">EXTRAS : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                    <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                        {extraRuns}
                                    </button>

                                    <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button onClick={() => { setExtraRuns('0'); }} class="form-control dropdown-item" >0</button>
                                        <button onClick={() => { setExtraRuns('1'); }} class="form-control dropdown-item" >1</button>
                                        <button onClick={() => { setExtraRuns('2'); }} class="form-control dropdown-item" >2</button>
                                        <button onClick={() => { setExtraRuns('3'); }} class="form-control dropdown-item" >3</button>
                                        <button onClick={() => { setExtraRuns('4'); }} class="form-control dropdown-item" >4</button>
                                        <button onClick={() => { setExtraRuns('5'); }} class="form-control dropdown-item" >5</button>
                                        <button onClick={() => { setExtraRuns('6'); }} class="form-control dropdown-item" >6</button>
                                        <button onClick={() => { setExtraRuns('7'); }} class="form-control dropdown-item" >7</button>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group">
                                <div class="dropdown">
                                    <label className="mb-0">EXTRA TYPE : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                    <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                        {extraType}
                                    </button>

                                    <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button onClick={() => { setExtraType('b'); }} class="form-control dropdown-item" >bye</button>
                                        <button onClick={() => { setExtraType('lb'); }} class="form-control dropdown-item" >leg bye</button>
                                        <button onClick={() => { setExtraType('nb'); }} class="form-control dropdown-item" >no ball</button>
                                        <button onClick={() => { setExtraType('wd'); }} class="form-control dropdown-item" >wide</button>
                                        <button onClick={() => { setExtraType('p'); }} class="form-control dropdown-item" >penalty</button>
                                        <button onClick={() => { setExtraType('no_extra'); }} class="form-control dropdown-item" >no extra</button>

                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="mb-0">AREA :<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={area}
                                    onChange={e => setArea(e.target.value)} />
                            </div>

                            
                            <div className="form-group">
                                <div class="dropdown">
                                    <label className="mb-0">OUT TYPE : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                    <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                        {outType}
                                    </button>

                                    <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button onClick={() => { setOutType('lbw'); }} class="form-control dropdown-item" >lbw</button>
                                        <button onClick={() => { setOutType('bowled'); }} class="form-control dropdown-item" >bowled</button>
                                        <button onClick={() => { setOutType('stump'); }} class="form-control dropdown-item" >stump</button>
                                        <button onClick={() => { setOutType('catch'); }} class="form-control dropdown-item" >catch</button>
                                        <button onClick={() => { setOutType('runout'); }} class="form-control dropdown-item" >runout</button>
                                        <button onClick={() => { setOutType('hitwicket'); }} class="form-control dropdown-item" >hit wicketkeeper</button>
                                        <button onClick={() => { setOutType('notout'); }} class="form-control dropdown-item" >not out</button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div class="dropdown">
                                    <label className="mb-0">PLAYER RUNOUT : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                    <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                        {playerRunout}
                                    </button>

                                    <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button onClick={() => { setPlayerRunout('striker'); }} class="form-control dropdown-item" >Striker</button>
                                        <button onClick={() => { setPlayerRunout('non_striker'); }} class="form-control dropdown-item" >Non Striker</button>
                                        <button onClick={() => { setPlayerRunout('None'); }} class="form-control dropdown-item" >None</button>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="form-group">
                                <label className="mb-0">FIELDER:<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" name="uname" required value={fielder}
                                    onChange={e => setFielder(e.target.value)} />
                            </div> */}

                            <div className="form-group">
                                    <div class="dropdown">
                                        <label className="mb-0">FIELDER : <span className="text-danger">*&nbsp;&nbsp;</span></label>

                                        <button class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                            {fielder}
                                        </button>

                                        <div class="form-control dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {playerMatchData['player_data'].map(d => (
                                                <button onClick={() => { setFielder(d['player_name']); }} class="dropdown-item" >{d['player_name']}</button>
                                            ))}
                                            <button onClick={() => { setFielder("NONE"); }} class="dropdown-item" >NONE</button>
                                        </div>
                                    </div>
                                </div>
                        </form>
                        <button class="register-btn" onClick={() => handleSubmit( )}>Submit</button>
                        <b><p style={{ color: 'red' }}>{status}</p></b>
                    </div>
                </div>
            </div>
        </>
    )

};

export default CreateBall