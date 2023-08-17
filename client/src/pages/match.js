import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

// const API_KEY = "8077996e-05f9-4c9c-981e-dc7b261fcf92"; //suman
// const API_KEY = "6c457d76-b1db-48d4-a11c-1ee7334b85f3"; //bhavana
// const API_KEY = "69815f80-e2a3-4329-b243-df3422192286"; //gowri
const API_KEY = "cf66066f-ad1b-4872-adfd-fb05b9c49307"; //bhavana2
const url = "https://api.cricapi.com/v1/currentMatches?apikey=" + API_KEY + "&offset=0";

const Matches = () => {
    let { match_id } = useParams();
    //console.log(match_id);
    const [data, setData] = useState(null);
    const [islogin, setIslogin] =  useState(false);
    const [isCompleted , setIscompleted ] = useState(false);
    //const [score,setScore] = useState(null);
    const [team1,setteam1] = useState(null);
    const [team2,setteam2] = useState(null);
    const [venue,setvenue] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tosswinner,settosswinner] = useState(null);
    const [matchwinner,setmatchwinner] = useState(null);
    const [team1_sc,setteam1sc] = useState(null);
    const [team2_sc,setteam2sc] =  useState(null);
    const [toss,setToss] = useState(false);
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
                        //console.log('home_page got no response from backend');
                        setLoading(true);
                    }
                    else {
                        //console.log('home_page got response from backend');
                        //console.log(data);
                        if (data['authenticated']) {
                            console.log("hello");
                            setIslogin(true);
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
        
        getData();
        (async () => {
            try {
                let res = await fetch("http://localhost:8080/match/"+match_id, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ match_id }),
                });
                let result = await res.json();
                        console.log(result.match.rows[0]);
                        console.log(result.team1.rows[0].team_name);
                        console.log(result.team2.rows[0].team_name);
                        console.log(result.venue.rows[0].venue_name);
                        //console.log(result.match.rows[0]);
                        setData(result.match.rows[0]);
                    //}

                    //if(result.team1.rows.length() >0){
                        
                        setteam1(result.team1.rows[0].team_name);
                    //}
                    //if(result.team2.rows.length() >0){
                        setteam2(result.team2.rows[0].team_name);
                    //}
                    //if(result.venue.rows.length() >0){
                        setvenue(result.venue.rows[0].venue_name);
                   // }
                   console.log(result.login);
                   //setIslogin(result.login);
                    

                   // if(result.toss_status.rows.length > 0){
                        //setToss(true);
                   // }                   
                    if(result.toss_win.rows.length>0){
                        //console.log(islogin);
                        settosswinner(result.toss_win.rows[0].team_name);
                    }
                   if(result.winner.rows.length>0){
                        setmatchwinner(result.winner.rows[0].team_name);
                   }
                   if(result.team1_score.rows.length>0){
                        setteam1sc(result.team1_score.rows);
                   }
                   if(result.team2_score.rows.length>0){
                        setteam2sc(result.team2_score.rows);
                    }

                    //if(result.match.rows[0].man_of_match !=null){
                        //setIscompleted(true);
                   // }
            }
            catch (error) {
                setError(error);
            }
        })();
    }, [match_id]);
    if (error) {
        return (
            <h1> loading... </h1>
        );
    }
    



    return (
        <>
        <NavigationBar/>
                        
            <div>
                    
                {data && (
                    <>
                    <h1> {team1}  vs {team2} </h1>
                    <h2> Venue: {venue} </h2>
                    <h2> match format : {data.format}</h2>
                    <h2> match type : {data.type} </h2>
                    <h2> total overs: {data.overs} </h2>
                    <h2> Empire : {data.umpire} </h2> 
                    {tosswinner ? (
                        <div>
                        <h2>
                            team {tosswinner} wins toss and chooses {data.toss_choice}ing
                        </h2>

                        </div>
                        ) 
                    : ( 
                        <div>
                        {islogin && (
                                <div>
                                <h2>
                                <button><a href={'/'+match_id+'/'+data.team1+'/addPlayertomatch'}>Add Player To Match for team {team1}</a></button>
                                <button><a href={'/'+match_id+'/'+data.team2+'/addPlayertomatch'}>Add Player To Match for team {team2}</a></button>
                                <a href= {"/toss/"+match_id} > ADD TOSS</a>
                                </h2>
        
                                </div>
                                )

                        }
                        </div>


                    )
                        
                        
                        
                    }
                    
                    
                    

                    {matchwinner && (
                        <h2>team {matchwinner} wins match by {data.win_margin} runs</h2>
                        )}
                                            
                    
                
                    <>
                    <div>
                        <h1> {team1} Score </h1>
                        <table class="table table-striped table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th style={{ border: "1px solid black" }}>Match Score</th>
                                    <th style={{ border: "1px solid black" }}>innings</th>
                                    <th style={{ border: "1px solid black" }}>wickets</th>
                                    <th style={{ border: "1px solid black" }}>overs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {team1_sc && team1_sc.map(item => (
                                    <tr key={item.innings}>
                                        <td style={{ border: "1px solid black" }}>{item.tot_score}</td>
                                        <td style={{ border: "1px solid black" }}><a href={"/match/score/"+match_id+"/"+item.innings}>{item.innings}</a></td>
                                        <td style={{ border: "1px solid black" }}>{item.wickets}</td>
                                        <td style={{ border: "1px solid black" }}>{item.over_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h1> {team2} Score </h1>
                        <table class="table table-striped table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th style={{ border: "1px solid black" }}>Match Score</th>
                                    <th style={{ border: "1px solid black" }}>innings</th>
                                    <th style={{ border: "1px solid black" }}>wickets</th>
                                    <th style={{ border: "1px solid black" }}>overs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {team2_sc && team2_sc.map(item => (
                                    <tr key={item.innings}>
                                        <td style={{ border: "1px solid black" }}>{item.tot_score}</td>
                                        <td style={{ border: "1px solid black" }}><a href={"/match/score/"+match_id+"/"+item.innings}>{item.innings}</a></td>
                                        <td style={{ border: "1px solid black" }}>{item.wickets}</td>
                                        <td style={{ border: "1px solid black" }}>{item.over_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {data.man_of_match ? (
                        <div>

                        </div>
                        
                        )
                    
                    : ( 
                        <div>
                        {islogin  && (
                                <div>

                                <h2>
                                    <a href= {"/"+match_id+"/createball/"} > BALL BY BALL</a><br></br>
                                    <a href= {"/manofthematch/"+match_id} > ADD MAN OF THE MATCH</a>

                                </h2>
        
                                </div>
                                )

                        }
                        </div>


                    )
                    
                    
                    }
                    
                    </>

                    </>
                )}
            
            </div>
            
        </>
    )
    
};

export default Matches