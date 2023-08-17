import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const BattingRankings = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [val, setVal] = useState(false);
  
    useEffect(() => {
        (async () => {
            try {
                let res = await fetch('http://localhost:8080/playerRanks/batting', {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                });
                let result = await res.json();
                // console.log(result);
                setData(result.data);
                if(result.status){
                    setVal(true);
                }
            } 
            catch (error) {
                setError(error);
            }
        })();
    });

    return (
        <div>
            { val
        ?   (<div>
            <h2>Player Batting Rankings (Orange Cap): </h2>
                <table style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black" }}>Format</th>
                            <th style={{ border: "1px solid black" }}>Player Name</th>
                            <th style={{ border: "1px solid black" }}>Country</th>
                            <th style={{ border: "1px solid black" }}>Runs</th>
                            <th style={{ border: "1px solid black" }}>SR</th>
                            <th style={{ border: "1px solid black" }}>100s</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ranks => (
                            <tr key={ranks.player_id}>
                                <td style={{ border: "1px solid black" }}>{ ranks.format }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.player_name }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.country_name }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.runs_scored }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.strike_rate }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.centuries }</td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div>)
        :   (<h2> No rankings assigned yet! </h2>)
        } 
        </div>      
    );


};

export default BattingRankings