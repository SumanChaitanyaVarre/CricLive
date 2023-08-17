import React from "react";
import { useContext, useState, useEffect } from "react";

const BowlingRankings = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [val, setVal] = useState(false);
  
    useEffect(() => {
        (async () => {
            try {
                let res = await fetch('http://localhost:8080/playerRanks/bowling', {
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
            <h2>Player Bowling Rankings (Purple Cap): </h2>
                <table style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black" }}>Format</th>
                            <th style={{ border: "1px solid black" }}>Player Name</th>
                            <th style={{ border: "1px solid black" }}>Country</th>
                            <th style={{ border: "1px solid black" }}>Wickets</th>
                            <th style={{ border: "1px solid black" }}>Econ</th>
                            <th style={{ border: "1px solid black" }}>SR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ranks => (
                            <tr key={ranks.player_id}>
                                <td style={{ border: "1px solid black" }}>{ ranks.format }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.player_name }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.country_name }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.wickets }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.economy }</td>
                                <td style={{ border: "1px solid black" }}>{ ranks.strike_rate }</td>
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

export default BowlingRankings