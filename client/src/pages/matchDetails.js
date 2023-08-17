import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './/Styling/matchdetails.css';
import NavigationBar1 from './navigationbar1';
import NavigationBar2 from './navigationbar2';

function PrintData (props) {
    return (
        <div className="team-container">
            <h2>{props.data.name}</h2>
            <div className="img-container">
                <img src={props.data.img} alt={props.data.shortname} />
            </div>

        </div>
    );
}

const MatchDetails = () => {
    let { id } = useParams();
    // const API_KEY = "8077996e-05f9-4c9c-981e-dc7b261fcf92"; //suman
    // const API_KEY = "6c457d76-b1db-48d4-a11c-1ee7334b85f3"; //bhavana1
    // const API_KEY = "69815f80-e2a3-4329-b243-df3422192286"; //gowri
    const API_KEY = "cf66066f-ad1b-4872-adfd-fb05b9c49307"; //bhavana2
    const url = "https://api.cricapi.com/v1/match_info?apikey=" + API_KEY + "&offset=0&id=" + id;
    
    const [status, setStatus] = useState(null);
    const [score, setScore] = useState(null);
    const [teamData, setTeamData] = useState([]);
    const [tc, setTossChoice] = useState(null);
    const [tw, setTossWinner] = useState(null);
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


    useEffect(() => {
        getData();
        (async () => {
            try {
                let res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                let result = await res.json();
                console.log(result.info);
                console.log(result.data);
                setTossChoice(result.data.tossChoice);
                setTossWinner(result.data.tossWinner);
                setStatus(result.data.status);
                setTeamData([result.data.teamInfo[0], result.data.teamInfo[1]]);
                setScore(result.data.score);
            }
            catch (error) {
                setError(error);
            }
        })();
    }, [ ]);
    
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
        <NavigationBar/>
        <div>
            <div className="teams-container">
                {teamData.map((team, index) => (
                    <PrintData
                        key={index}
                        data={team}
                    />
                ))}
            </div>
            <h3>{tw} won the toss and chose to {tc} first</h3>
            <ul>
                {score && score.map((item, index) => (
                    <li key={index}>
                        {item.inning}: {item.r}/{item.w} ({item.o})
                    </li>
                ))}
            </ul>
            <h3>{status}</h3>
        </div>
        </>
    );
};

export default MatchDetails;