import React from 'react';
import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavigationBar2 from "./navigationbar2";
import NavigationBar1 from './navigationbar1';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const Start = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    var NavigationBar = NavigationBar2;
    const [com_matches,setCommatches] = useState(null);
    const [sc_matches,setschedulematches] = useState(null);
    const [og_matches,setOg_matches] =useState(null);
    const [error, setError] = useState(null);

    const [pdata, setPData] = useState([]);
    const [mdata, setMData] = useState([]);
    const [tdata, setData] = useState(["abc"]);
    const [authed, setAuthed] = useState(false);
    var items = [];
    // const [items, setItems] = useState([]);
    const [searched_data, setSearched_data] = useState([items])
    const [pid, setPlayer_id] = useState("");
    const [mid, setMatch_id] = useState("");
    const [status, setStatus] = useState("None");


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
                            window.location.replace(`http://localhost:3000/home`);
                        }
                        else {
                            setLoading(false);
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

    const getPlayers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/players`, {
                method: "GET",
                credentials: 'include'
            }).then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.log('home_page got no response from backend for players');
                        setLoading(true);
                    }
                    else {
                        console.log('home_page got response from backend for players');
                        console.log("pdata:", data['data']);
                        setPData(data['data']);
                        setLoading(false);

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

    const getMatches = async () => {
        try {
            const response = await fetch(`http://localhost:8080/matches`, {
                method: "GET",
                credentials: 'include'
            }).then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.log('home_page got no response from backend for matches');
                        setLoading(true);
                    }
                    else {
                        console.log('home_page got response from backend for matches');
                        console.log("mdata", data['data']);
                        setMData(data['data']);
                        setLoading(false);

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



    const getpreviousMatches = async () =>{
        try {
            let res = await fetch("http://localhost:8080/previousmatches", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            let result = await res.json();
            console.log(result.data.rows);
            setCommatches(result.data.rows);
            
        }
        catch (error) {
            setError(error);
        }
    };
    const getscheduledMatches = async () =>{
        try {
            let res = await fetch("http://localhost:8080/scheduledmatches", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            let result = await res.json();
            console.log(result.data.rows);
            setschedulematches(result.data.rows);
            
        }
        catch (error) {
            setError(error);
        }
    }

    const getongoingMatches = async () =>{
        try {
            let res = await fetch("http://localhost:8080/ongoingmatches", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            let result = await res.json();
            console.log(result.data.rows);
            setOg_matches(result.data.rows);
            
        }
        catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        getData();
        getPlayers();
        getMatches();
        getpreviousMatches();
        getscheduledMatches();
        getongoingMatches();
    }, []);

    if(pdata.length == 0 || mdata.length == 0){
        items = [];
    }
    else{

    const getPItems = (pdata) => {
        var newitems = [];
        var mymap = {};
        for (var i = 0; i < pdata.length; i++) {
            if (pdata[i].player_id in mymap) {
                continue;
            }
            mymap[pdata[i].player_id] = 1;
            newitems.push({ id: pdata[i].player_id, name: pdata[i].player_name });
        }
        return newitems;
    };

    const getMItems = (mdata) => {
        var newitems = [];
        var mymap = {};
        for (var i = 0; i < mdata.length; i++) {
            if (mdata[i].match_id in mymap) {
                continue;
            }
            mymap[mdata[i].match_id] = 1;
            newitems.push({ id: mdata[i].match_id, name: mdata[i].teams });
        }
        return newitems;
    };


    const mergedItems = (items1, items2) => {
        var merge = [];
        for (var i = 0; i < items1.length; i++) {
            merge.push({ id: items1[i].id, name: items1[i].name });
        }
        for (var i = 0; i < items2.length; i++) {
            merge.push({ id: items2[i].id, name: items2[i].name });
        }
        return merge;
    };


    const items1 = getPItems(pdata);
    const items2 = getMItems(mdata);

    // items = items1;

        // setItems(items1);
        // setItems(mergedItems(items1, items2));
    
        items = mergedItems(items1, items2);
    }

        const handleOnSearch = (string, results) => {
            // onSearch will have as the first callback parameter
            // the string searched and for the second the results.
            // setSearched_data(results);
            // console.log("searched data is : ");
            // console.log(searched_data);
            console.log(string, results);
            console.log("items:", items);
            // console.log("searched_data:", searched_data);
            // console.log("searchFunc:", searchFunc(string));
            // setSearched_data(searchFunc(string));
          }
        
          const handleOnHover = (result) => {
            // the item hovered
            
            console.log("hovered")
          }
        
          const handleOnSelect = (item) => {
            if (item.id>1000000){
                window.location.replace(`http://localhost:3000/player/${item.id}`);
            }
            else{
                window.location.replace(`http://localhost:3000/match/${item.id}`);
            }
            console.log("selected item is:");
            // the item selected
            console.log(item.name)
          }
        
          const handleOnFocus = () => {
            console.log('Focused')
          }
        
          const formatResult = (item) => {
            return (
                <>
                  <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
                </>
              );
        };





    return loading ? <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div> : (
        <>
            <NavigationBar />
            <h1 align='center'>Welcome to CricLive</h1>
            <button><a href={'/playerrankings/bat'}> Batting Rankings</a></button>
            <button><a href={'/playerrankings/bowl'}>Bowling Rankings</a></button>
            <div>
                <h1> Previous Matches</h1>
            <table align='center' class="table table-striped table-bordered table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th style={{ border: "1px solid black" }}>match_id</th>
                        <th style={{ border: "1px solid black" }}>Match Type</th>
                        <th style={{ border: "1px solid black" }}>Venue</th>
                        <th style={{ border: "1px solid black" }}>Date</th>
                        <th style={{ border: "1px solid black" }}>Team1</th>
                        <th style={{ border: "1px solid black" }}>Team2</th>
                    </tr>
                </thead>
                <tbody>
                    {com_matches && com_matches.map(item => (
                        <tr key={item.match_id}>
                            <td style={{ border: "1px solid black" }}><a href={'/match/'+item.match_id}> {item.match_id}</a></td>
                            <td style={{ border: "1px solid black" }}>{item.type}</td>
                            <td style={{ border: "1px solid black" }}>{item.venue}</td>
                            <td style={{ border: "1px solid black" }}>{item.time}</td>
                            <td style={{ border: "1px solid black" }}>{item.t1_name}</td>
                            <td style={{ border: "1px solid black" }}>{item.t2_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
       

            <div>
                <h1> Ongoing Matches</h1>
            <table align='center' class="table table-striped table-bordered table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th style={{ border: "1px solid black" }}>match_id</th>
                        <th style={{ border: "1px solid black" }}>Match Type</th>
                        <th style={{ border: "1px solid black" }}>Venue</th>
                        <th style={{ border: "1px solid black" }}>Date</th>
                        <th style={{ border: "1px solid black" }}>Team1</th>
                        <th style={{ border: "1px solid black" }}>Team2</th>
                    </tr>
                </thead>
                <tbody>
                    {og_matches && og_matches.map(item => (
                        <tr key={item.match_id}>
                            <td style={{ border: "1px solid black" }}><a href={'/match/'+item.match_id}> {item.match_id}</a></td>
                            <td style={{ border: "1px solid black" }}>{item.type}</td>
                            <td style={{ border: "1px solid black" }}>{item.venue}</td>
                            <td style={{ border: "1px solid black" }}>{item.time}</td>
                            <td style={{ border: "1px solid black" }}>{item.t1_name}</td>
                            <td style={{ border: "1px solid black" }}>{item.t2_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <div>
                <h1> Scheduled Matches</h1>
            <table align='center' class="table table-striped table-bordered table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th style={{ border: "1px solid black" }}>match_id</th>
                        <th style={{ border: "1px solid black" }}>Match Type</th>
                        <th style={{ border: "1px solid black" }}>Venue</th>
                        <th style={{ border: "1px solid black" }}>Date</th>
                        <th style={{ border: "1px solid black" }}>Team1</th>
                        <th style={{ border: "1px solid black" }}>Team2</th>
                    </tr>
                </thead>
                <tbody>
                    {sc_matches && sc_matches.map(item => (
                        <tr key={item.match_id}>
                            <td style={{ border: "1px solid black" }}><a href={'/match/'+item.match_id}> {item.match_id}</a></td>
                            <td style={{ border: "1px solid black" }}>{item.type}</td>
                            <td style={{ border: "1px solid black" }}>{item.venue}</td>
                            <td style={{ border: "1px solid black" }}>{item.time}</td>
                            <td style={{ border: "1px solid black" }}>{item.t1_name}</td>
                            <td style={{ border: "1px solid black" }}>{item.t2_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <ReactSearchAutocomplete
            items={items}
            fuseOptions={{ keys: ["id", "name"] }}
            resultStringKeyName={"name"}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={() => setStatus("None")}
            autoFocus
            formatResult={formatResult}
          />
                
            
        </>
    )
}

export default Start