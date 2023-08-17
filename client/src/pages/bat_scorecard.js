import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

// const API_KEY = "8077996e-05f9-4c9c-981e-dc7b261fcf92"; //suman
// const API_KEY = "6c457d76-b1db-48d4-a11c-1ee7334b85f3"; //bhavana
// const API_KEY = "69815f80-e2a3-4329-b243-df3422192286"; //gowri
const API_KEY = "cf66066f-ad1b-4872-adfd-fb05b9c49307"; //bhavana2
const url = "https://api.cricapi.com/v1/currentMatches?apikey=" + API_KEY + "&offset=0";

const Bat_scorecard = () => {
    let { match_id ,innings } = useParams();
    console.log(match_id);
    const [data, setData] = useState(null);
    const [score, setScore] = useState(null);
    const [wickets, setWickets] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [NavigationBar, setNavigationBar] = useState(() => NavigationBar1);



    const getData = async () => {
        try {
            //   const cookie = document.cookie;
            //   const cookieArray = cookie.split(";");
            //   const cookieExists = cookieArray.some((item) => item.trim().startsWith("nameOfCookie="));
            //   console.log('checking cookie');
            //   console.log(cookieExists);
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

    const getwickets = async () =>{
        try {
            let res = await fetch("http://localhost:8080/wickets/"+match_id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ match_id ,innings}),
            },[match_id,innings]);
            let result = await res.json();
            console.log(result.data);
            setWickets(result.data);
            
        }
        catch (error) {
            setError(error);
        }
    }



    


    useEffect(() => {
        
        getData();
        getwickets();
        (async () => {
            try {
                let res = await fetch("http://localhost:8080/score/"+match_id, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ match_id ,innings}),
                });
                let result = await res.json();
                console.log(result);
                setScore(result.team_score.rows);
            }
            catch (error) {
                setError(error);
            }
        })();
    }, [match_id,innings]);
    
    
    if (error) {
        return (
            <h1> **** </h1>
        );
    }

    
    
    

    return (
        <>
        <NavigationBar/>

                {  (
                    <div>
                    <h1> {innings} </h1>
                    <table class="table table-striped table-bordered table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th style={{ border: "1px solid black" }}>Player </th>
                                <th style={{ border: "1px solid black" }}>runs</th>
                                <th style={{ border: "1px solid black" }}>balls</th>
                                <th style={{ border: "1px solid black" }}>4s</th>
                                <th style={{ border: "1px solid black" }}>6s</th>
                                <th style={{ border: "1px solid black" }}>strike rate</th>
                                <th style={{ border: "1px solid black" }}>out type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {score && score.map(item => (
                                <tr key={ item.player_id}>
                                    <td style={{ border: "1px solid black" }}><a href = {"/player/"+item.player_id}>{item.player_name}</a></td>
                                    <td style={{ border: "1px solid black" }}>{item.runs_scored}</td>
                                    <td style={{ border: "1px solid black" }}>{item.balls_faced}</td>
                                    <td style={{ border: "1px solid black" }}>{item.fours}</td>
                                    <td style={{ border: "1px solid black" }}>{item.sixes}</td>
                                    <td style={{ border: "1px solid black" }}>{item.strike_rate}</td>
                                    <td style={{ border: "1px solid black" }}>{item.out_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    
                )} 

                {wickets && (
                        <h3> {wickets} </h3>
                        )}
            
            
            
        </>
    )
    
};

export default Bat_scorecard