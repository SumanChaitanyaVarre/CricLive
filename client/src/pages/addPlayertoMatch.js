import React from "react";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import NavigationBar1 from "./navigationbar1";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useParams } from "react-router-dom";

const AddPlayertoMatch = () => {

    // const navigate = useNavigate();
    var NavigationBar = NavigationBar1;
    // const [authed, setAuthed] = useState(false);
    const [pdata, setPData] = useState([]);
    const [mdata, setMData] = useState([]);
    // const [fdata, setData] = useState(["abc"]);
    // const [check, setCheck] = useState([]);
    // const items = fdata[0];
    var items = [];
    const [searched_data, setSearched_data] = useState([])
    const [pid, setPlayer_id] = useState("");
    var { match_id, team_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [status, setStatus] = useState("None");
    const [selectedRole, setSelectedRole] = useState("batsman");
    // const [sections, setSections] = useState(["Personal Information", "Contact Information", "Payment"]);

    const getData = async () => {
        try {
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
                            setLoading(false);
                        }
                        else {
                            window.location.replace(`http://localhost:3000/`);
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

    useEffect(() => {
        getData();
        getPlayers();
        getMatches();
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

    items = items1;
}
    // setItems(items1);
    // setItems(mergedItems(items1, items2));

    // items = mergedItems(items1, items2);

    const searchFunc = (string) => {
        console.log("searching for ", string);
        var newitems = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].name.toLowerCase().includes(string.toLowerCase())) {
                newitems.push(items[i]);
            }
        }
        return newitems;
    }

    const handleOnSearch = (string, results) => {
        setStatus("None");
        setSearched_data(results);
        console.log("searched data is : ")
        console.log(searched_data);
        console.log(results);

    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result);
        setSearched_data([result]);

    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item);
        setSearched_data([item]);
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }
    const handleRegister = async (player_id, role_desc) => {
        // console.log("player_id is : ", player_id);
        // console.log("role is : ", role_desc['selectedRole']);
        const role = role_desc['selectedRole'];
        try {
            setPlayer_id(player_id);
            const body = { match_id, player_id, role, team_id };
            const response = await fetch("http://localhost:8080/addPlayertoMatch", {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.log('got no response from backend');
                        setLoading1(true);
                    }
                    else {
                        console.log('got response from backend');
                        console.log(data);

                        if (data['status'] == 0) {
                            setStatus("Player already registered for this match");
                        }
                        else {
                            setStatus("Player registered successfully");
                        }

                        // setCheck(data);
                        setLoading1(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setLoading1(true);
                })
        }
        catch (err) {
            console.error(err.message);
        }

    }

    // useEffect(() => {
    //     console.log(check);

    //     if (check[2]) {
    //         console.log(`Can't be registered. Course already taken`);
    //         setStatus(`Can't be registered. Course already taken`);
    //         document.getElementById('searchbar').inputSearchString = "";
    //     }
    //     else if (!check[0] && !check[1]) {
    //         console.log(`Can't be registered. Slot clash occurred and Prerequisites not satisfied`);

    //     }
    //     else if (!check[0]) {
    //         console.log(`Can't be registered. Slot clash occurred`);
    //         setStatus(`Can't be registered. Slot clash occurred`);
    //         document.getElementById('searchbar').inputSearchString = "";
    //     }
    //     else if (!check[1]) {
    //         console.log(`Can't be registered. Prerequisites not satisfied`);
    //         setStatus(`Can't be registered. Prerequisites not satisfied`);
    //         document.getElementById('searchbar').inputSearchString = "";
    //     }
    //     else {
    //         console.log(`Successfully registered for course ${pid}`);
    //         setStatus(`Successfully registered for course ${pid}`);
    //         document.getElementById('searchbar').inputSearchString = "";
    //     }
    // }, [check]);

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }} >{item.name}</span>
            </>
        )
    }

    return loading ? <p>loading...</p> : (
        <>
            <NavigationBar />
            <div >
                <header>
                    <div id='searchbar' style={{ width: 1000 }}>
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
                            placeholder="search for players"
                        />
                    </div>
                </header>
                {searched_data &&
                    <table class="table table-striped table-bordered table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th>Player ID</th>
                                <th>Player Name</th>
                                <th>Role</th>
                                <th>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searched_data.map(d => (
                                <tr>
                                    <td><a href={`http://localhost:3000/player/${d['id']}`}>{d['id']}</a></td>
                                    <td>
                                        {d['name']}
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-primary">Role</button>
                                            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <div class="dropdown-menu">
                                                <button onClick={() => { setSelectedRole('batsman'); setStatus(`selected role : batsman`) }} class="dropdown-item" >batsman</button>
                                                <button onClick={() => { setSelectedRole('bowler'); setStatus(`selected role : bowler`) }} class="dropdown-item" >bowler</button>
                                                <button onClick={() => { setSelectedRole('all-rounder'); setStatus(`selected role : all-rounder`) }} class="dropdown-item" >all-rounder</button>
                                                <button onClick={() => { setSelectedRole('wicketkeeper-batsman'); setStatus(`selected role : wicketkeeper-batsman`) }} class="dropdown-item" >wicketkeeper-batsman</button>
                                                <button onClick={() => { setSelectedRole('captain'); setStatus(`selected role : captain`) }} class="dropdown-item" >captain</button>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary" onClick={() => handleRegister(d['id'], { selectedRole })}>Register</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
            <h5>status : {status}</h5>
            <a href={"/match/"+match_id}> <button type="button">Go back to match page</button> </a>
        </>
    )
};


export default AddPlayertoMatch;
