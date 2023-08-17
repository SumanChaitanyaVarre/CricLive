const pool = require("./db");
const queries = require("./queries");
var idMatch = 0
var idPlayer = 2000000 

// const cricapi = require("cricapi");
// cricapi.setAPIKey('8077996e-05f9-4c9c-981e-dc7b261fcf92');

const executeQuery = (query, id_query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, id_query, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
};

const checkLogin = async (req, res) => {
    result = await executeQuery(queries.checkidexists, [req.body.username]);
    if (result.rows.length > 0) {
        const isSamePwd = (req.body.password == result.rows[0].hashed_password);
        if (isSamePwd) {
            req.session.user = req.body.username;
            console.log(req.session);
            res.json({ loggedIn: true, status: "Logged in successfully" });
        }
        else {
            res.json({ loggedIn: false, status: "Invalid password!" });
            console.log("not good");
        }
    }
    else {
        res.json({ loggedIn: false, status: "Invalid username" });
        console.log("not good");
    }
};

const login_signup = async (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true });
    }
    else {
        res.json({ authenticated: false });
    }
};


const checkSignUp = async (req, res) => {
    console.log([req.body.username, req.body.password, req.body.confirm_password, req.body.country, req.body.phone_no, req.body.age]);
    result1 = await executeQuery(queries.checkidexists, [req.body.username]);
    if (result1.rows.length > 0) {
        res.json({ exists: true, status: "Username already exists" });
    }
    else {
        console.log("username valid");
        if (req.body.password != req.body.confirm_password) {
            res.json({ exists: true, status: "Passwords doesn't match" });
        }
        else {
            const result2 = await executeQuery(queries.insertuser, [req.body.username, req.body.password, req.body.country, req.body.phone_no, req.body.age]);
            console.log("signed up successfully");
            res.json({ exists: false, status: "Signed up successfully" });
        }
    }
};


const homePage = async (req, res) => {
    console.log("Home page is accessed");
};

const logout = async (req, res) => {
    console.log(req.session.user);
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.send("logged out");
        console.log("logged out");
        console.log(req.session);
    });
};

const matchData = async (req, res) => {
    // console.log(req.body);
    var matchType = [{ type: "international" }, { type: "local" }];
    var teamData = "";
    var venueData = "";
    usertype = await executeQuery(queries.getusertype, [req.session.user]);
    if (usertype.rows[0]["role"] == "logged") {
        matchType = [{ type: "local" }];
    }

    teamData = await executeQuery(queries.getTeams);

    venueData = await executeQuery(queries.getvenues);


    res.json({ matchtypes: matchType, teams: teamData.rows, venues: venueData.rows })

};

const playerMatchData = async (req, res) => {
    const { match_id } = req.params;
    playerData1 = await executeQuery(queries.getplayermatch, [match_id]);
    res.json({ player_data : playerData1.rows});
};

const addMatch = async (req, res) => {
    console.log("match added and the data is below:");
    console.log(req.body);

    id_values = await executeQuery(queries.getIDs);
    new_match_id = Number(id_values.rows[0]["match_id"]) + 1;
    todo1 = await executeQuery(queries.setIDs, [new_match_id, id_values.rows[0]["player_id"], id_values.rows[0]["team_id"], id_values.rows[0]["venue_id"]]);

    usertype = await executeQuery(queries.getusertype, [req.session.user]);
    team1 = await executeQuery(queries.getTeamId, [req.body.team1]);
    team2 = await executeQuery(queries.getTeamId, [req.body.team2]);
    venue = await executeQuery(queries.getVenueId, [req.body.venue]);

    team1Id = team1.rows[0]["team_id"];
    team2Id = team2.rows[0]["team_id"];
    venueId = venue.rows[0]["venue_id"];

    todo = await executeQuery(queries.creatematch, [new_match_id, req.body.format, req.body.matchType, req.body.overs, req.body.scheduledTime, team1Id, team2Id, venueId, req.body.umpire]);
    res.json({ status: 1, msg: "match created successfully" });

};


const addTeam = async (req, res) => {
    console.log(req.body);
    id_values = await executeQuery(queries.getIDs);
    result = await executeQuery(queries.checkteamexists, [req.body.teamName]);
    if (result.rows.length > 0) {
        res.json({ status: 0, msg: "Team Name already exists" });
    }
    else {
        new_team_id = Number(id_values.rows[0]["team_id"]) + 1;
        console.log(new_team_id);
        todo1 = await executeQuery(queries.setIDs, [id_values.rows[0]["match_id"], id_values.rows[0]["player_id"], new_team_id, id_values.rows[0]["venue_id"]]);
        todo2 = await executeQuery(queries.insertteam, [new_team_id, req.body.teamName]);
        res.json({ status: 1, msg: "Team created successfully" });
    }

};

const addVenue = async (req, res) => {
    console.log(req.body);
    id_values = await executeQuery(queries.getIDs);
    result = await executeQuery(queries.checkvenueexists, [req.body.venueName, req.body.cityName, req.body.countryName]);
    if (result.rows.length > 0) {
        res.json({ status: 0, msg: "Venue already exists" });
    }
    else {
        new_venue_id = Number(id_values.rows[0]["venue_id"]) + 1;
        console.log(new_venue_id);
        todo1 = await executeQuery(queries.setIDs, [id_values.rows[0]["match_id"], id_values.rows[0]["player_id"], id_values.rows[0]["team_id"], new_venue_id]);
        todo2 = await executeQuery(queries.insertvenue, [new_venue_id, req.body.venueName, req.body.cityName, req.body.countryName, req.body.capacity]);
        res.json({ status: 1, msg: "Venue created successfully" });
    }

};


const addPlayer = async (req, res) => {
    console.log(req.body);
    id_values = await executeQuery(queries.getIDs);
    result = await executeQuery(queries.checkplayerexists, [req.body.playerName, req.body.dob, req.body.country]);
    if (result.rows.length > 0) {
        res.json({ status: 0, msg: "Player already exists" });
    }
    else {
        new_player_id = Number(id_values.rows[0]["player_id"]) + 1;
        console.log(new_player_id);
        todo1 = await executeQuery(queries.setIDs, [id_values.rows[0]["match_id"], new_player_id, id_values.rows[0]["team_id"], id_values.rows[0]["venue_id"]]);
        todo2 = await executeQuery(queries.insertplayer, [new_player_id, req.body.playerName, req.body.dob, req.body.role, req.body.battingHand, req.body.bowlingStyle, req.body.country, req.body.profile]);
        res.json({ status: 1, msg: "Player created successfully" });
    }

};

const addBall = async (req, res) => {

    console.log(req.body);

    // body = id, innings, overId, ballId, ballCount, runsScored, extraRuns, extraType, outType, playerRunout, fielder, striker, nonStriker, bowler, area

    match_id = req.body.match_id;
    innings = req.body.innings;

    striker_id = await executeQuery(queries.getPlayerId, [req.body.striker]);
    striker_id = striker_id.rows[0]["player_id"];
    non_striker_id = await executeQuery(queries.getPlayerId, [req.body.nonStriker]);
    non_striker_id = non_striker_id.rows[0]["player_id"];
    bowler_id = await executeQuery(queries.getPlayerId, [req.body.bowler]);
    bowler_id = bowler_id.rows[0]["player_id"];
    // console.log(bowler_id.body);
    if (req.body.fielder != 'NONE') {
        fielder_id = await executeQuery(queries.getPlayerId, [req.body.fielder]);
        fielder_id = fielder_id.rows[0]["player_id"];
    }
    else {
        fielder_id = null;
    }


    result = await executeQuery(queries.checkballexists, [match_id, req.body.overId, req.body.ballId, req.body.ballCount]);
    bat_sc_result = await executeQuery(queries.checkbatscorecardexists, [match_id, req.body.innings, striker_id]);
    bowl_sc_result = await executeQuery(queries.checkbowlscorecardexists, [match_id, req.body.innings, bowler_id]);
    total_score_result = await executeQuery(queries.checktotalscoreexists, [match_id, req.body.innings]);
    fall_of_wkts_result = await executeQuery(queries.checkfallofwktsexists, [match_id, req.body.innings]);


    if (bat_sc_result.rows.length <= 0) {
        // create new scorecard;
        todo = await executeQuery(queries.createbatscorecard, [match_id, innings, striker_id, 0, 0, 0, 0, 0, 'notout', null, null]);
    }

    if (bowl_sc_result.rows.length <= 0) {
        // create new scorecard;
        todo = await executeQuery(queries.createbowlscorecard, [match_id, innings, bowler_id, 0, 0, 0, 0, 0, 0]);
    }

    if (total_score_result.rows.length <= 0) {
        // create new total_score;
        todo = await executeQuery(queries.createtotalscore, [match_id, innings, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    // get data from bat score card
    var bat_sc_data = await executeQuery(queries.getbatscorecard, [match_id, innings, striker_id]);

    var striker_runs = bat_sc_data.rows[0]["runs_scored"];
    var balls_faced = bat_sc_data.rows[0]["balls_faced"];
    var fours = bat_sc_data.rows[0]["fours"];
    var sixes = bat_sc_data.rows[0]["sixes"];
    var strike_rate = bat_sc_data.rows[0]["strike_rate"];


    // get data from bowl score card
    var bowl_sc_data = await executeQuery(queries.getbowlscorecard, [match_id, innings, bowler_id]);

    var bowler_over = bowl_sc_data.rows[0]["over_id"];
    var bowler_balls = bowl_sc_data.rows[0]["ball_id"];
    var runs_given = bowl_sc_data.rows[0]["runs_given"];
    var bowler_wkts = bowl_sc_data.rows[0]["wickets"];
    var maidens = bowl_sc_data.rows[0]["maidens"];


    // get total score data
    var total_sc_data = await executeQuery(queries.gettotalscore, [match_id, innings]);

    var total_score = total_sc_data.rows[0]["tot_score"];
    var wkts = total_sc_data.rows[0]["wickets"];
    var extra_b = total_sc_data.rows[0]["extra_b"];
    var extra_lb = total_sc_data.rows[0]["extra_lb"];
    var extra_nb = total_sc_data.rows[0]["extra_nb"];
    var extra_w = total_sc_data.rows[0]["extra_w"];
    var extra_p = total_sc_data.rows[0]["extra_p"];

    var commentary = req.body.overId + "." + req.body.ballId + ", " + req.body.bowler + " to " + req.body.striker + " , ";

    if (req.body.extraType != "no_extra") {
        commentary += req.body.extraType;
        if (parseInt(req.body.extraRuns) > 1) {
            commentary += ", " + req.body.extraRuns + " runs";
        }
    }

    if (req.body.extraType == "wd") {
        balls_faced -= 1;
    }

    balls_faced += 1;
    striker_runs += parseInt(req.body.runsScored);

    if (req.body.extraType != "no_extra") {
        runs_given += parseInt(req.body.extraRuns);
        total_score += parseInt(req.body.extraRuns);
    }
    else {
        runs_given += parseInt(req.body.runsScored);
        total_score += parseInt(req.body.runsScored);
    }

    if (req.body.extraType == "b") extra_b += parseInt(req.body.extraRuns);
    else if (req.body.extraType == "lb") extra_lb += parseInt(req.body.extraRuns);
    else if (req.body.extraType == "nb") extra_nb += parseInt(req.body.extraRuns);
    else if (req.body.extraType == "wd") extra_w += parseInt(req.body.extraRuns);
    else if (req.body.extraType == "p") extra_p += parseInt(req.body.extraRuns);


    if (parseInt(req.body.runsScored) == 4) fours += 1;
    if (parseInt(req.body.runsScored) == 6) sixes += 1;

    strike_rate = striker_runs * 100 / balls_faced;

    ball_count = bowler_over * 6 + bowler_balls;
    ball_count += 1;
    if (req.body.extraType == "wd" || req.body.extraType == "nb") {
        ball_count -= 1;
    }
    bowler_balls = ball_count % 6;
    bowler_over = (ball_count - bowler_balls) / 6;


    outType = req.body.outType

    if (outType == "bowled" || outType == "lbw") {
        commentary += "OUT, " + outType + ".";
        bat_sc_bowler = bowler_id;
        bat_sc_fielder = null;
        bowler_wkts += 1;
        todo = await executeQuery(queries.createfallofwkts, [match_id, innings, striker_id, total_score, wkts, req.body.overId, req.body.ballId]);

    }
    else if (outType == "catch" || outType == "stump") {
        commentary += "OUT, " + outType + " by " + req.body.fielder + ".";
        bat_sc_bowler = bowler_id;
        bat_sc_fielder = fielder_id;
        bowler_wkts += 1;
        todo = await executeQuery(queries.createfallofwkts, [match_id, innings, striker_id, total_score, wkts, req.body.overId, req.body.ballId]);


    }
    else if (outType == "runout") {
        bat_sc_bowler = null;
        bat_sc_fielder = fielder_id;
        if (req.body.playerRunout == "striker") {
            todo = await executeQuery(queries.createfallofwkts, [match_id, innings, striker_id, total_score, wkts, req.body.overId, req.body.ballId]);
            commentary += req.body.striker + " OUT, " + outType + " by " + req.body.fielder + ".";
        }
        else if (req.body.playerRunout == "non_striker") {
            todo = await executeQuery(queries.createfallofwkts, [match_id, innings, non_striker_id, total_score, wkts, req.body.overId, req.body.ballId]);
            commentary += req.body.non_striker + " OUT, " + outType + " by " + req.body.fielder + ".";
        }

    }
    else if (req.body.extraType == "no_extra") {
        commentary += req.body.runsScored + " runs, to " + req.body.area + ".";
    }

    if (outType != "notout") {
        wkts += 1;
    }
    else {
        bat_sc_bowler = null;
        bat_sc_fielder = null;
    }

    economy = runs_given / (bowler_over + (1 / 6) * bowler_balls);


    // update both scorecards and total_score

    // console.log([striker_runs, balls_faced, fours, sixes, strike_rate, outType, bat_sc_bowler, bat_sc_fielder, match_id, innings, striker_id]);


    todo = await executeQuery(queries.updatebatscorecard, [striker_runs, balls_faced, fours, sixes, strike_rate, outType, bat_sc_bowler, bat_sc_fielder, match_id, innings, striker_id]);


    // console.log([bowler_over, bowler_balls, maidens, runs_given, bowler_wkts, economy, match_id, innings, bowler_id]);

    todo = await executeQuery(queries.updatebowlscorecard, [bowler_over, bowler_balls, maidens, runs_given, bowler_wkts, economy, match_id, innings, bowler_id]);


    // console.log([total_score, wkts, req.body.overId, req.body.ballId, extra_b, extra_lb, extra_nb, extra_w, extra_p, match_id, innings]);

    todo = await executeQuery(queries.updatetotalscore, [total_score, wkts, req.body.overId, bowler_balls, extra_b, extra_lb, extra_nb, extra_w, extra_p, match_id, innings]);


    // console.log([match_id, innings, req.body.overId, req.body.ballId, req.body.ballCount, parseInt(req.body.runsScored), parseInt(req.body.extraRuns), req.body.extraType, req.body.outType, fielder_id, striker_id, non_striker_id, bowler_id, req.body.area, commentary]);


    todo = await executeQuery(queries.insertballbyball, [match_id, innings, req.body.overId, req.body.ballId, req.body.ballCount, parseInt(req.body.runsScored), parseInt(req.body.extraRuns), req.body.extraType, req.body.outType, fielder_id, striker_id, non_striker_id, bowler_id, req.body.area, commentary]);


    res.json({ status: 1, msg: "Ball created successfully" });

};


const players = async (req, res) => {
    const result = await executeQuery(queries.getplayerinfo);
    if(result.rows.length > 0) {
        res.json({status : 1, msg : "Player info fetched successfully", data : result.rows});
    }
    else {
        res.json({status : 0, msg : "Player doesn't exist"});
    }
};

const matches = async (req, res) => {
    const result = await executeQuery(queries.getmatchinfo);
    if(result.rows.length > 0) {
        res.json({status : 1, msg : "Match info fetched successfully", data : result.rows});
    }
    else {
        res.json({status : 0, msg : "Match doesn't exist"});
    }
};

const addPlayertoMatch = async (req, res) => {

    // [player_name, role, team1_name, team2_name, time] = [req.body.player_name, req.body.role, req.body.team1_name, req.body.team2_name, req.body.time];

    // player = await executeQuery(queries.getPlayerId, [player_name]);
    // team1 = await executeQuery(queries.getTeamId, [team1_name]);
    // team2 = await executeQuery(queries.getTeamId, [team2_name]);

    // match = await executeQuery(queries.getmatchid, [team1.rows[0].team_id, team2.rows[0].team_id, time]);

    // [player_id, team1_id, team2_id, match_id] = [player.rows[0].player_id, team1.rows[0].team_id, team2.rows[0].team_id, match.rows[0].match_id];
    console.log(req.body);
    [match_id, player_id, role, team_id] = [req.body.match_id, req.body.player_id, req.body.role, req.body.team_id];
    console.log([match_id, player_id, role, team_id])
    // res.json({status : 1, msg : "Player added to match successfully", data : [player_id, team1_id, team2_id, match_id]});

    const checkPlayerMatch = await executeQuery(queries.checkplayermatchexists, [match_id, player_id]);
    if(checkPlayerMatch.rows.length > 0) {
        res.json({status : 0, msg : "Player already exists in the match"});
        return;
    }
    new_playermatchkey = 100000*match_id + 5*player_id;
    todo = await executeQuery(queries.insertplayertomatch, [new_playermatchkey, match_id, player_id, role, team_id]);
    res.json({status : 1, msg : "Player added to match successfully"});
};

const previousMatches = async (req,res) => {
    result = await executeQuery(queries.getpreviousMatches);
    console.log(result);
    res.json({data:result});

}

const matchbyid = async (req,res) => {
    //////console.log(req.body.match_id);
    result = await executeQuery(queries.getmatchbyid,[req.body.match_id]);
    result1 = await executeQuery(queries.getteam1byid,[req.body.match_id]); 
    result2 = await executeQuery(queries.getteam2byid,[req.body.match_id]); 
    result3 = await executeQuery(queries.getvenuebyid,[req.body.match_id]); 
    result4 = await executeQuery(queries.gettosswinnerbyid,[req.body.match_id]);
    result5 = await executeQuery(queries.getmatchwinnerbyid,[req.body.match_id]);
    result8 = await executeQuery( queries.gettoss_winner,[req.body.match_id]);
    let logedin=false;
    
    if(result.rows[0].team1 == result.rows[0].tosswinner){
        if(result.rows[0].toss_choice=='bat'){
            console.log("1");
            result6 = await executeQuery(queries.getinningsbyid,[req.body.match_id,1]);
            result7 = await executeQuery(queries.getinningsbyid,[req.body.match_id,0]);
            if(req.session.user){
                console.log("2");
                logedin=true;
                res.json({login:true,toss_status:result8,match:result, team1:result1, team2:result2, venue:result3 , toss_win: result4, winner: result5, team1_score:result6,team2_score:result7});
            }
            res.json({login:false,toss_status:result8,match:result, team1:result1, team2:result2, venue:result3 , toss_win: result4, winner: result5, team1_score:result6,team2_score:result7});

        }
        else{
            console.log("3");
            result6 = await executeQuery(queries.getinningsbyid,[req.body.match_id,0]);
            result7 = await executeQuery(queries.getinningsbyid,[req.body.match_id,1]);
            if(req.session.user){
                console.log("4");
                logedin=true;
                res.json({login:true,toss_status:result8,match:result, team1:result1, team2:result2, venue:result3 , toss_win: result4, winner: result5, team1_score:result6,team2_score:result7});
            }
            res.json({login:false,toss_status:result8,match:result, team1:result1, team2:result2, venue:result3 , toss_win: result4, winner: result5, team1_score:result6,team2_score:result7});
        }
    }
    else{
        console.log("5");
        if(result.rows[0].toss_choice=='bat'){
            console.log("6");
            result6 = await executeQuery(queries.getinningsbyid,[req.body.match_id,0]);
            result7 = await executeQuery(queries.getinningsbyid,[req.body.match_id,1]);
            if(req.session.user){
                console.log("7");
                logedin=true;
                res.json({login:true,toss_status:result8,match:result, team1:result1, team2:result2, venue:result3 , toss_win: result4, winner: result5, team1_score:result6,team2_score:result7});
            }
            res.json({login:false,toss_status:result8,match:result, team1:result1, team2:result2, venue:result3 , toss_win: result4, winner: result5, team1_score:result7,team2_score:result6});
        }
        else{
            console.log("8");
            result6 = await executeQuery(queries.getinningsbyid,[req.body.match_id,1]);
            result7 = await executeQuery(queries.getinningsbyid,[req.body.match_id,0]);
            if(req.session.user != null){
                console.log("9");
                logedin=true;
                res.json({login:true,toss_status:result8,match:result, team1:result1, team2:result2, venue:result3 , toss_win: result4, winner: result5, team1_score:result6,team2_score:result7});
            }
            res.json({login:false,toss_status:result8,match:result, team1:result1, team2:result2, venue:result3 , toss_win: result4, winner: result5, team1_score:result7,team2_score:result6});
        }
    }
    

    
}

const playermatch = async (req,res) => {
    // get score of all players
    //////console.log(req.body);
    result1= await executeQuery(queries.getplayersMatches,[req.body.match_id,req.body.innings]);
    let text;
    /*for (let i=0;i<result2.body.rows.length;i++){
        text=text+" "+result2.body.rows[i].total_score+" ("+result2.body.rows[i].player_name+ ", "+ result2.bodey.rows[i]
    }*/
    res.json({team_score:result1});
}

const bowlscore = async (req,res) => {
    //////console.log(req.body);
    result1= await executeQuery(queries.getballplayersMatches,[req.body.match_id,req.body.innings]);
    res.json({team_score:result1});
}

const commentary = async (req,res) => {
    result1= await executeQuery(queries.getball_by_ball,[req.body.match_id,req.body.innings]);
    res.json({comm:result1});
}

const wicketscore = async (req,res) => {
    result= await executeQuery(queries.getallwickets,[req.body.match_id,req.body.innings]);
    let text="";
    //let init_score=0;
    for(let i=0 ; i<result.rows.length ; i++){
        console.log(text);
        //let tot_score = parseInt(result.rows[i].tot_score) - init_score;
        if(i==result.rows.length -1){
            text = text + result.rows[i].player_name + " (" +result.rows[i].tot_score+"/" + result.rows[i].over_id + "." + result.rows[i].ball_id + ")" ;
        }
        else{
        text = text + result.rows[i].player_name + " (" +result.rows[i].tot_score+"/" + result.rows[i].over_id + "." + result.rows[i].ball_id + "), ";
        }//init_score=parseInt(result.rows[i].tot_score); 
    }
    res.json({data: text});
}

const toss_option = async (req,res) => {
    result1 = await executeQuery( queries.gettoss_winner,[req.body.match_id]);
    

    res.json({toss:result1});
}

const scheduledMatches = async (req,res) => {
    result = await executeQuery(queries.getscheduledmatches);
    console.log(result);
    res.json({data:result});

}

const ongoingmatches = async (req,res) => {
    result = await executeQuery(queries.getongoingMatches);
    console.log(result);
    res.json({data:result});

}

const addToss = async (req,res) => {

    
    todo = await executeQuery(queries.addtoss, [req.body.match_id, req.body.tossWinner,req.body.tossChoice]);
    res.json({loggedIn:true});
    

}

const playerData = async (req, res) => {

    const player_id = req.body.player_id;
    //console.log("hi");
    todo = await executeQuery(queries.playerData, [player_id]);
    console.log(todo.rows[0]);
     res.send(todo.rows[0]);
    
    };

const playerBat = async (req, res) => {
    const player_id = req.body.player_id;
    const str = req.body.str;

    resultx = await executeQuery(queries.ifbat, [player_id, str]);
    if(resultx.rows.length > 0) {
    result1 = await executeQuery(queries.inningsbat, [player_id, str]);
    const inn = parseInt(result1.rows[0].innings_played);
    console.log('Innings: '+inn);
    result2 = await executeQuery(queries.matchesbat, [player_id, str]);
    const matc = parseInt(result2.rows[0].matches_played);
    console.log('Matches: '+matc);
    result3 = await executeQuery(queries.notouts, [player_id, str]);
    const no = parseInt(result3.rows[0].notouts);
    console.log('Not Outs: '+no);
    result4 = await executeQuery(queries.runsbat, [player_id, str]);
    const runs_scored = parseInt(result4.rows[0].runs_scored);
    console.log('Runs: '+runs_scored);
    result5 = await executeQuery(queries.hsbat, [player_id, str]);
    // console.log(result5);
    const hs = parseInt(result5.rows[0].highest_score);
    console.log('Highest Score: '+hs);
    // const avrg = (runs_scored/(inn-no)).toFixed(2);
    let avrg = 0.00;
    if((inn > 0) && (inn-no)==0) {
        avrg = runs_scored.toFixed(2);
    }
    else if((inn == 0) && (inn-no)==0) {
        avrg = 0.00;
    }
    else {
        avrg = (runs_scored/(inn-no)).toFixed(2);
    }
    console.log('Average: '+avrg);
    result6 = await executeQuery(queries.ballsbat, [player_id, str]);
    // console.log(result6);
    const balls = parseInt(result6.rows[0].balls_faced);
    console.log('Balls: '+balls);
    // const sr = ((runs_scored/balls)*100).toFixed(2);
    let sr = 0.00;
    if(balls>0) {
        sr = ((runs_scored/balls)*100).toFixed(2);
    }
    result7 = await executeQuery(queries.doubleh, [player_id, str]);
    console.log('Strike Rate: '+sr);
    const dc = parseInt(result7.rows[0].double_centuries);
    console.log('200s: '+dc);
    result8 = await executeQuery(queries.hundreds, [player_id, str]);
    console.log(result8);
    const c = parseInt(result8.rows[0].centuries);
    console.log('100s: '+c);
    result9 = await executeQuery(queries.fifties, [player_id, str]);
    const hc = parseInt(result9.rows[0].half_centuries);
    console.log('50s: '+hc);
    result10 = await executeQuery(queries.fours, [player_id, str]);
    const fours = parseInt(result10.rows[0].fours);
    console.log('4s: '+fours);
    result11 = await executeQuery(queries.sixes, [player_id, str]);
    const sixes = parseInt(result11.rows[0].sixes);
    console.log('6s: '+sixes);
    resulty = await executeQuery(queries.checkbatstats,[player_id, str]);
    console.log(resulty.rows.length);
    if(resulty.rows.length == 0){
        todo= await executeQuery(queries.createbatstats,[player_id, str, matc, inn, no, runs_scored, hs, avrg, balls, sr, dc, c, hc, fours, sixes]);
        console.log("create bat stats done");
    }
    else{
        todo = await executeQuery(queries.updatebatstats, [player_id, str, matc, inn, no, runs_scored, hs, avrg, balls, sr, dc, c, hc, fours, sixes]);
        console.log("update bat stats done");
    }
    const data = {format: str, matc: matc, inn: inn, no: no, runs: runs_scored, hs: hs, avrg: avrg, balls: balls, sr: sr, dc: dc, c: c, hc: hc, fours: fours, sixes: sixes};
    res.send(data);
    return;
}
    else {
        // todo = await executeQuery(queries.createbatstats, [player_id, str, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']);
        const data = {format: str, matc: '0', inn: '0', no: '0', runs: '0', hs: '0', avrg: '0', balls: '0', sr: '0', dc: '0', c: '0', hc: '0', fours: '0', sixes: '0'};
        res.send(data);
        return;
    }
};

const playerBowl = async (req, res) => {
    const player_id = req.body.player_id;
    const str = req.body.str;
    
    resultx = await executeQuery(queries.ifbowl, [player_id, str]);
    if(resultx.rows.length > 0) {
    result1 = await executeQuery(queries.inningsbowl, [player_id, str]);
    const inn = parseInt(result1.rows[0].innings_played);
    console.log('Innings: '+inn);
    result2 = await executeQuery(queries.matchesbowl, [player_id, str]);
    const matc = parseInt(result2.rows[0].matches_played);
    console.log('Matches: '+matc);
    result3 = await executeQuery(queries.ballsbowl, [player_id, str]);
    const balls = parseInt(result3.rows[0].balls_bowled);
    console.log('Balls: '+balls);
    result4 = await executeQuery(queries.runsbowl, [player_id, str]);
    const runs_given = parseInt(result4.rows[0].runs);
    console.log('Runs: '+runs_given);
    result5 = await executeQuery(queries.wickets, [player_id, str]);
    const wkt = parseInt(result5.rows[0].wickets);
    console.log('Wickets: '+wkt);
    result6 = await executeQuery(queries.maidens, [player_id, str]);
    const md = parseInt(result6.rows[0].maidens);
    console.log('Maidens: '+md);
    result7 = await executeQuery(queries.bbi, [player_id, str]);
    const bbi = result7.rows[0].bBI;
    console.log('BBI: '+bbi);
    result8 = await executeQuery(queries.bbm, [player_id, str]);
    const bbm = result8.rows[0].bBM;
    console.log('BBM: '+bbm);
    let econ = 0.00;
    if(balls>0) {
        econ = ((runs_given/balls)*6).toFixed(2);
    }
    console.log('Economy: '+econ);
    let avrg = 0.00;
    if(wkt>0) {
        avrg = (runs_given/wkt).toFixed(2);
    }
    console.log('Average: '+avrg);
    let sr = 0.00;
    if(wkt>0) {
        sr = (balls/wkt).toFixed(2);
    }
    console.log('Strike Rate: '+sr);
    result9 = await executeQuery(queries.fivewkts, [player_id, str]);
    const fwkt = parseInt(result9.rows[0].five_wickets);
    console.log('5 Wicket Hauls: '+fwkt);
    result10 = await executeQuery(queries.tenwkts, [player_id, str]);
    const twkt = parseInt(result10.rows[0].ten_wickets);
    console.log('10 Wicket Hauls: '+twkt);
    resulty = await executeQuery(queries.checkbowlstats,[player_id, str]);
    console.log(resulty.rows.length);
    if(resulty.rows.length == 0){
        todo = await executeQuery(queries.createbowlstats, [player_id, str, matc, inn, balls, runs_given, wkt, md, bbi, bbm, econ, avrg, sr, fwkt, twkt]);
        console.log("create bowl stats done");
    }
    else {
        todo = await executeQuery(queries.updatebowlstats, [player_id, str, matc, inn, balls, runs_given, wkt, md, bbi, bbm, econ, avrg, sr, fwkt, twkt]);
        console.log("update bowl stats done");
    }
    const data = {format: str, matc: matc, inn: inn, balls: balls, runs_given: runs_given, wkts: wkt, maidens: md, bbi: bbi, bbm: bbm, econ: econ, avrg: avrg, sr: sr, fwkt: fwkt, twkt: twkt};
    res.send(data);
    return;
}
else {
    // todo = await executeQuery(queries.createbowlstats, [player_id, str, '0', '0', '0', '0', '0', '0', '-', '-', '0', '0', '0', '0', '0']);
    const data = {format: str, matc: '0', inn: '0', balls: '0', runs_given: '0', wkts: '0', maidens: '0', bbi: '-', bbm: '-', econ: '0', avrg: '0', sr: '0', fwkt: '0', twkt: '0'};
    res.send(data);
    return;
}
};

const playerBatRankings = async (req, res) => {
    todo = await executeQuery(queries.getbatranks, []);
    if(todo.rows.length > 0) {
        res.send({status: 1, data: todo.rows});
        return;
    }
    res.send({status: 0, data: todo.rows});
    return;
};

const playerBowlRankings = async (req, res) => {
    todo = await executeQuery(queries.getbowlranks, []);
    if(todo.rows.length > 0) {
        res.send({status: 1, data: todo.rows});
        return;
    }
    res.send({status: 0, data: todo.rows});
    return;
};


const manofthematch = async (req,res) => {

    
    todo = await executeQuery(queries.addManoftheMatch, [req.body.match_id, req.body.player_id]);
    res.json({loggedIn:true});
    

}



module.exports = {
    checkLogin,
    login_signup,
    checkSignUp,
    homePage,
    logout,
    matchData,
    addMatch,
    playerMatchData,
    addTeam,
    addVenue,
    addPlayer,
    addBall,
    players,
    matches,
    addPlayertoMatch,
    previousMatches,
    playermatch,
    commentary,
    matchbyid,
    bowlscore,
    toss_option,
    wicketscore,
    scheduledMatches,
    ongoingmatches,
    addToss,
    playerBat,
    playerBowl,
    playerBatRankings,
    playerBowlRankings,
    playerData,
    manofthematch,
};