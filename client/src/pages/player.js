import React from "react";
import { useContext, useState, useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';

const Player = () => {
    let { player_id } = useParams();
    console.log(player_id);
    const [playerBatT20i, setPlayerBatT20i] = useState(null);
    const [playerBatOdi, setPlayerBatOdi] = useState(null);
    const [playerBatTest, setPlayerBatTest] = useState(null);

    const [playerBowlT20i, setPlayerBowlT20i] = useState(null);
    const [playerBowlOdi, setPlayerBowlOdi] = useState(null);
    const [playerBowlTest, setPlayerBowlTest] = useState(null);

    const [error, setError] = useState(null);
    
    const [data, setData] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                console.log('http://localhost:8080/playerData/'+player_id);
                let res = await fetch('http://localhost:8080/playerData/'+player_id, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ player_id }),
                });
                let result = await res.json();
                console.log(result);
                setData(result);
            } 
            catch (error) {
                setError(error);
            }
        })();
    }, [player_id]);

    useEffect(() => {
        (async () => {
            try {
                let str = 't20i';
                let res = await fetch('http://localhost:8080/player/bat/'+player_id, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ player_id, str }),
                });
                let result = await res.json();
                console.log(result);
                setPlayerBatT20i(result);
            } 
            catch (error) {
                setError(error);
            }
        })();
    }, [player_id]);

    useEffect(() => {
        (async () => {
            try {
                let str = 'odi';
                let res = await fetch('http://localhost:8080/player/bat/'+player_id, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ player_id, str }),
                });
                let result = await res.json();
                // console.log(result);
                setPlayerBatOdi(result);
            } 
            catch (error) {
                setError(error);
            }
        })();
    }, [player_id]);

    useEffect(() => {
        (async () => {
            try {
                let str = 'test';
                let res = await fetch('http://localhost:8080/player/bat/'+player_id, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ player_id, str }),
                });
                let result = await res.json();
                // console.log(result);
                setPlayerBatTest(result);
            } 
            catch (error) {
                setError(error);
            }
        })();
    }, [player_id]);

    useEffect(() => {
        (async () => {
            try {
                let str = 't20i';
                let res = await fetch('http://localhost:8080/player/bowl/'+player_id, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ player_id, str }),
                });
                let result = await res.json();
                // console.log(result);
                setPlayerBowlT20i(result);
            } 
            catch (error) {
                setError(error);
            }
        })();
    }, [player_id]);

    useEffect(() => {
        (async () => {
            try {
                let str = 'odi';
                let res = await fetch('http://localhost:8080/player/bowl/'+player_id, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ player_id, str }),
                });
                let result = await res.json();
                // console.log(result);
                setPlayerBowlOdi(result);
            } 
            catch (error) {
                setError(error);
            }
        })();
    }, [player_id]);

    useEffect(() => {
        (async () => {
            try {
                let str = 'test';
                let res = await fetch('http://localhost:8080/player/bowl/'+player_id, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ player_id, str }),
                });
                let result = await res.json();
                // console.log(result);
                setPlayerBowlTest(result);
            } 
            catch (error) {
                setError(error);
            }
        })();
    }, [player_id]);

    if (error) {
        return (
            <p>
                An error occurred ({error.message})
                Kindly reload the page!
            </p>
        );
    }

    return (
        <div>
            {data && (
                <>
                <h2>Player Name: {  data.player_name } </h2>
                <h3>Date Of Birth: { data.dob }</h3>
                <h3>Country: {  data.country_name }</h3>
                <h3>Playing Role: {  data.role }</h3>
                <h3>Batting Hand: {  data.batting_hand }</h3>
                <h3>Bowling Style: { data.bowling_style }</h3>
                <h4>Profile: { data.profile }</h4>
                </>
            )}
    

            <h3>Career Stats:</h3>

                <h4>Batting:-</h4>
                <table style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                        <th style={{ border: "1px solid black" }}>Format</th>
                        <th style={{ border: "1px solid black" }}>Mat</th>
                        <th style={{ border: "1px solid black" }}>Inns</th>
                        <th style={{ border: "1px solid black" }}>NO</th>
                        <th style={{ border: "1px solid black" }}>Runs</th>
                        <th style={{ border: "1px solid black" }}>HS</th>
                        <th style={{ border: "1px solid black" }}>Ave</th>
                        <th style={{ border: "1px solid black" }}>BF</th>
                        <th style={{ border: "1px solid black" }}>SR</th>
                        <th style={{ border: "1px solid black" }}>200s</th>
                        <th style={{ border: "1px solid black" }}>100s</th>
                        <th style={{ border: "1px solid black" }}>50s</th>
                        <th style={{ border: "1px solid black" }}>4s</th>
                        <th style={{ border: "1px solid black" }}>6s</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerBatT20i && (
                        <>
                            <tr>
                            <td style={{ border: "1px solid black" }}>T20Is</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.matc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.inn }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.no }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.runs }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.hs }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.avrg }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.balls }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.sr }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.dc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.c }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.hc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.fours }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatT20i.sixes }</td>
                            </tr>
                        </>
                        )}
                        {playerBatOdi && (
                        <>
                            <tr>
                            <td style={{ border: "1px solid black" }}>ODIs</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.matc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.inn }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.no }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.runs }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.hs }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.avrg }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.balls }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.sr }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.dc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.c }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.hc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.fours }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatOdi.sixes }</td>
                            </tr>
                        </>
                        )}
                        {playerBatTest && (
                        <>  
                            <tr>
                            <td style={{ border: "1px solid black" }}>Tests</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.matc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.inn }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.no }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.runs }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.hs }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.avrg }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.balls }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.sr }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.dc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.c }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.hc }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.fours }</td>
                            <td style={{ border: "1px solid black" }}>{ playerBatTest.sixes }</td>
                            </tr>
                        </>
                        )}
                    </tbody>
                </table>

                <h4>Bowling:-</h4>
                <table style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                        <th style={{ border: "1px solid black" }}>Format</th>
                        <th style={{ border: "1px solid black" }}>Mat</th>
                        <th style={{ border: "1px solid black" }}>Inns</th>
                        <th style={{ border: "1px solid black" }}>Balls</th>
                        <th style={{ border: "1px solid black" }}>Runs</th>
                        <th style={{ border: "1px solid black" }}>Wkts</th>
                        <th style={{ border: "1px solid black" }}>Maidens</th>
                        <th style={{ border: "1px solid black" }}>BBI</th>
                        <th style={{ border: "1px solid black" }}>BBM</th>
                        <th style={{ border: "1px solid black" }}>Econ</th>
                        <th style={{ border: "1px solid black" }}>Ave</th>
                        <th style={{ border: "1px solid black" }}>SR</th>
                        <th style={{ border: "1px solid black" }}>5w</th>
                        <th style={{ border: "1px solid black" }}>10w</th>
                        </tr>
                    </thead>
                    <tbody>
                    {playerBowlT20i && (
                    <>
                        <tr>
                        <td>T20Is</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.matc }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.inn }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.balls }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.runs_given }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.wkts }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.maidens }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.bbi }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.bbm }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.econ }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.avrg }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.sr }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.fwkt }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlT20i.twkt }</td>
                        </tr>
                    </>
                    )}
                    {playerBowlOdi && (
                    <>
                        <tr>
                        <td style={{ border: "1px solid black" }}>ODIs</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.matc }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.inn }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.balls }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.runs_given }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.wkts }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.maidens }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.bbi }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.bbm }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.econ }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.avrg }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.sr }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.fwkt }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlOdi.twkt }</td>
                        </tr>
                    </>
                    )}
                    {playerBowlTest && (
                    <>
                        <tr>
                        <td style={{ border: "1px solid black" }}>Tests</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.matc }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.inn }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.balls }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.runs_given }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.wkts }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.maidens }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.bbi }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.bbm }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.econ }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.avrg }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.sr }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.fwkt }</td>
                        <td style={{ border: "1px solid black" }}>{ playerBowlTest.twkt }</td>
                        </tr>
                    </>
                    )}
                    </tbody>
                </table>
        </div>

  );

};

export default Player
