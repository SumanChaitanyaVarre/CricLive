import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

// const API_KEY = "8077996e-05f9-4c9c-981e-dc7b261fcf92"; //suman
// const API_KEY = "6c457d76-b1db-48d4-a11c-1ee7334b85f3"; //bhavana
// const API_KEY = "69815f80-e2a3-4329-b243-df3422192286"; //gowri
const API_KEY = "cf66066f-ad1b-4872-adfd-fb05b9c49307"; //bhavana2
const url = "https://api.cricapi.com/v1/currentMatches?apikey=" + API_KEY + "&offset=0";

const Scorecard = () => {
    let { match_id ,innings } = useParams();
    console.log(match_id);
    console.log(innings)
    const [data, setData] = useState(null);
    const [score, setScore] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [NavigationBar, setNavigationBar] = useState(() => NavigationBar1);
    const navigate = useNavigate();



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

    


    useEffect(() => {
        
        getData();

    }, [ ]);
    if (error) {
        return (
            <h1> **** </h1>
        );
    }
    
    

    return (
        <>
        <NavigationBar/>
            <div>
                <button onClick={() => navigate("/bat_score/"+match_id+"/"+innings)}>
                    Batting Score
                </button>
                <button onClick={() => navigate("/bowl_score/"+match_id+"/"+innings)}>
                    Bowling Score
                </button>
                <button onClick={() => navigate("/Commentary/"+match_id+"/"+innings)}>
                    commentary
                </button>
            
            </div>
            
        </>
    )
    
};

export default Scorecard