const checkidexists = "SELECT ID, hashed_password FROM user_password WHERE ID = $1";

const insertuser = "INSERT INTO user_password VALUES ($1, $2, 'logged', $3, $4, $5)";

const getusertype = "SELECT role from user_password where ID = $1";

const creatematch = "INSERT INTO match VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, null, null, null, null, null, null, null)";

const createbowlscorecard = "INSERT INTO bowl_scorecard VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

const createbatscorecard = "INSERT INTO bat_scorecard VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

const createtotalscore = "INSERT INTO total_score VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

const createfallofwkts = "INSERT INTO fall_of_wickets VALUES ($1, $2, $3, $4, $5, $6, $7)";

const getIDs = "SELECT * from id_value;" // {match_id, player_id, team_id, venue_id}

const setIDs = "UPDATE id_value SET match_id = $1, player_id = $2, team_id = $3, venue_id = $4;"

const getTeams = "SELECT * from team ;"

const getvenues = "SELECT * from venue ;"

const getPlayerId = "SELECT player_id from player where player_name = $1 ;"

const getTeamId = "SELECT team_id from team where team_name = $1 ;"

const getVenueId = "SELECT venue_id from venue where venue_name = $1 ;"

const getbatscorecard = "SELECT * from bat_scorecard where match_id = $1 and innings = $2 and player_id = $3 ;"

const getbowlscorecard = "SELECT * from bowl_scorecard where match_id = $1 and innings = $2 and player_id = $3 ;"

const gettotalscore = "SELECT * from total_score where match_id = $1 and innings = $2;"

const checkteamexists = "SELECT * from team where team_name = $1;"

const checkvenueexists = "SELECT * from venue where venue_name = $1 and city_name = $2 and country_name = $3;"

const checkplayerexists = "SELECT * from player where player_name = $1 and dob = $2 and country_name = $3;"

const checkballexists = "SELECT * from ball_by_ball where match_id = $1 and over_id = $2 and ball_id = $3 and ball_count = $4;"

const checkbatscorecardexists = "SELECT * from bat_scorecard where match_id = $1 and innings = $2 and player_id = $3;"

const checkbowlscorecardexists = "SELECT * from bowl_scorecard where match_id = $1 and innings = $2 and player_id = $3;"

const checktotalscoreexists = "SELECT * from total_score where match_id = $1 and innings = $2 ;"

const checkfallofwktsexists = "SELECT * from fall_of_wickets where match_id = $1 and innings = $2 ;"

const insertteam = "INSERT INTO team VALUES ($1, $2);"

const insertvenue = "INSERT INTO venue VALUES ($1, $2, $3, $4, $5);"

const insertplayer = "INSERT INTO player VALUES ($1, $2, $3, $4, $5, $6, $7, null, null, null, null, null, null, $8);"

const updatebatscorecard = "UPDATE bat_scorecard SET runs_scored = $1, balls_faced = $2, fours = $3, sixes = $4, strike_rate = $5, out_type = $6, bowler = $7, fielder = $8 where match_id = $9 and innings = $10 and player_id = $11;"

const updatebowlscorecard = "UPDATE bowl_scorecard SET over_id = $1, ball_id = $2, maidens = $3, runs_given = $4, wickets = $5, economy = $6 where match_id = $7 and innings = $8 and player_id = $9;"

const updatetotalscore = "UPDATE total_score SET tot_score = $1, wickets = $2, over_id = $3, ball_id = $4, extra_b = $5, extra_lb = $6, extra_nb = $7, extra_w = $8, extra_p = $9 where match_id = $10 and innings = $11;"

const insertballbyball = "INSERT INTO ball_by_ball VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);"

const getplayermatch = "SELECT player.player_name from player_match, player where player_match.player_id = player.player_id and  match_id = $1";

const getplayerinfo = "SELECT player_id, player_name from player;"

const getmatchinfo = "SELECT match_id, CONCAT(t1.team_name, ' vs. ', t2.team_name) AS teams FROM match INNER JOIN team t1 ON match.team1 = t1.team_id INNER JOIN team t2 ON match.team2 = t2.team_id;"

const getteaminfo = "SELECT * from team;"

const getmatchplayers = "SELECT * from player_match where match_id = $1;"

const insertplayertomatch = "INSERT INTO player_match (playermatch_key, match_id, player_id, role_desc, team_id) VALUES ($1, $2, $3, $4, $5);"

const checkplayermatchexists = "SELECT * from player_match where match_id = $1 and player_id = $2;"

const getmatchid = "SELECT match_id FROM match WHERE scheduled_time = $3 AND ((team1 = $1 AND team2 = $2) OR (team1 = $2 AND team2 = $1));"
const getpreviousMatches = "select match.match_id ,type ,scheduled_time as time,venue_name as venue,t1.team_name as t1_name,t2.team_name as t2_name  from match,team as t1,team as t2,venue where  scheduled_time >= now() - interval '24 hours' and man_of_match is not  null and match.team1=t1.team_id and match.team2=t2.team_id and match.venue_id=venue.venue_id;"


const getmatchbyid = "select * from match where match_id = $1;"
const getteam1byid = "select  team_name from match,team where   match.team1=team.team_id and match_id = $1;"
const getteam2byid = "select  team_name from match,team where   match.team2=team.team_id and match_id = $1;"
const getvenuebyid = "select venue_name from match,venue where match_id = $1 and match.venue_id=venue.venue_id;"
const gettosswinnerbyid = "select team_name from match,team where match.toss_winner= team.team_id and match.match_id= $1;"
const getmatchwinnerbyid = "select team_name from match,team where match.match_winner= team.team_id and match.match_id= $1;"
const getinningsbyid = "select innings,tot_score,wickets,over_id from total_score where match_id= $1 and innings%2 = $2;"

const getplayersMatches = "select * from player natural join bat_scorecard where match_id=$1 and innings = $2;"
const getallwickets = "select * from fall_of_wickets natural join player where match_id=$1 and innings= $2 order by (over_id,ball_id);"

const getballplayersMatches = "select * from player natural join bowl_scorecard where match_id=$1 and innings=$2;" 

const getball_by_ball = "select commentary from ball_by_ball where match_id=$1 and innings = $2 order by (over_id,ball_id) desc;"

const getwickets = "select * from fall_of_wickets where match_id=$1;"

const getongoingMatches = "select match.match_id ,type ,scheduled_time as time,venue_name as venue,t1.team_name as t1_name,t2.team_name as t2_name  from match,team as t1,team as t2,venue where  scheduled_time <= now()  and man_of_match is  null and match.team1=t1.team_id and match.team2=t2.team_id and match.venue_id=venue.venue_id;"

const getscheduledmatches = "select match.match_id ,type ,scheduled_time as time,venue_name as venue,t1.team_name as t1_name,t2.team_name as t2_name  from match,team as t1,team as t2,venue where  scheduled_time < now() + interval '24 hours' and scheduled_time > now() and toss_winner is null and match.team1=t1.team_id and match.team2=t2.team_id and match.venue_id=venue.venue_id;"

const gettoss_winner = "select * from match where scheduled_time < now() +interval '1 hours' and match_id=$1 and toss_winner is  null;" 

const addtoss = "update match  set toss_winner= $2 , toss_choice= $3 where match_id = $1;"


// player info
const playerData = "SELECT * FROM player WHERE player_id::integer = $1;"
//calculation of batting stats
const ifbat = "SELECT match.match_id  FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const matchesbat = "SELECT COUNT(DISTINCT match.match_id) AS matches_played FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const inningsbat = "SELECT COUNT(*) AS innings_played FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const notouts = "SELECT COUNT(*) AS notouts FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND out_type ILIKE 'notout' AND type ILIKE 'international');"
const runsbat = "SELECT COALESCE(SUM(runs_scored), 0) AS runs_scored FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const hsbat = "SELECT COALESCE(MAX(runs_scored), 0) AS highest_score FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const ballsbat = "SELECT COALESCE(SUM(balls_faced), 0) AS balls_faced FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const doubleh = "SELECT COUNT(*) AS double_centuries FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND runs_scored >= 200 AND type ILIKE 'international');"
const hundreds = "SELECT COUNT(*) AS centuries FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND (runs_scored >= 100 AND runs_scored < 200) AND type ILIKE 'international');"
const fifties = "SELECT COUNT(*) AS half_centuries FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND (runs_scored >= 50 AND runs_scored < 100) AND type ILIKE 'international');"
const fours = "SELECT COALESCE(SUM(fours), 0) AS fours FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND type ILIKE 'international');"
const sixes = "SELECT COALESCE(SUM(sixes), 0) AS sixes FROM match, bat_scorecard WHERE (match.match_id = bat_scorecard.match_id AND bat_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND type ILIKE 'international');"
//insertion of batting stats
const checkbatstats = "select * from player_bat_stats where player_id::integer = $1 and format ilike $2";
const createbatstats = "INSERT INTO player_bat_stats VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);"
const updatebatstats = "UPDATE player_bat_stats SET matches_played=$3, innings_played=$4, notouts=$5, runs_scored=$6, highest_score=$7, average=$8, balls_faced=$9, strike_rate=$10, double_centuries=$11, centuries=$12, half_centuries=$13, fours=$14, sixes=$15 WHERE player_id=$1 AND format ILIKE $2;"
//batting ranks
// const getbatranks = "SELECT player.player_id, player_name, country_name, runs_scored, strike_rate, centuries FROM player_bat_stats, player WHERE player_bat_stats.player_id=player.player_id ORDER BY runs_scored DESC, strike_rate DESC, centuries DESC;"
//calculation of bowling stats
const ifbowl = "SELECT match.match_id FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const matchesbowl = "SELECT COUNT(DISTINCT match.match_id) AS matches_played FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const inningsbowl = "SELECT COUNT(*) AS innings_played FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const runsbowl = "SELECT COALESCE(SUM(runs_given), 0) AS runs FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const wkts = "SELECT COALESCE(SUM(wickets), 0) AS wickets FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const maidens = "SELECT COALESCE(SUM(maidens), 0) AS maidens FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format ILIKE $2 AND type ILIKE 'international');"
const fivewkts = "SELECT COUNT(*) AS five_wickets FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND wickets >= 5 AND type ILIKE 'international');"
const tenwkts = "SELECT COUNT(*) AS ten_wickets FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND wickets = 10 AND type ILIKE 'international');"
const ballsbowl = "SELECT ((6*COALESCE(SUM(over_id), 0))+COALESCE(SUM(ball_id), 0)) AS balls_bowled FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND type ILIKE 'international');"
const bbi = "SELECT CONCAT(wickets, '/', runs_given) AS bBI FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND type ILIKE 'international');"
const bbm = "WITH x AS (SELECT COALESCE(SUM(wickets), 0) AS wickets, COALESCE(SUM(runs_given), 0) AS runs_given FROM match, bowl_scorecard WHERE (match.match_id = bowl_scorecard.match_id AND bowl_scorecard.player_id::integer = $1 AND man_of_match IS NOT NULL AND format LIKE $2 AND type ILIKE 'international') GROUP BY match.match_id) SELECT CONCAT(wickets, '/', runs_given) AS bBM FROM x;"
//insertion of bowling stats
const checkbowlstats = "select * from player_bowl_stats where player_id::integer = $1 and format ilike $2";
const createbowlstats = "INSERT INTO player_bowl_stats VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);"
const updatebowlstats = "UPDATE player_bowl_stats SET matches_played=$3, innings_played=$4, balls=$5, runs=$6, wickets=$7, maidens=$8, BBI=$9, BBM=$10, economy=$11, average=$12, strike_rate=$13, five_wkts=$14, ten_wkts=$15 WHERE player_id=$1 AND format ILIKE $2;"
//bowling stats
// const getbowlranks = "SELECT player.player_id, player_name, country_name, wickets, economy, strike_rate FROM player_bowl_stats, player WHERE player_bowl_stats.player_id=player.player_id ORDER BY wickets DESC, economy ASC, strike_rate ASC;"

const getbatranks = "SELECT format, player.player_id, player_name, country_name, runs_scored, strike_rate, centuries FROM player_bat_stats, player WHERE player_bat_stats.player_id=player.player_id ORDER BY format DESC, runs_scored DESC, strike_rate DESC, centuries DESC;"
const getbowlranks = "SELECT format, player.player_id, player_name, country_name, wickets, economy, strike_rate FROM player_bowl_stats, player WHERE player_bowl_stats.player_id=player.player_id ORDER BY format DESC, wickets DESC, economy ASC, strike_rate ASC;"

const addManoftheMatch = "update match  set man_of_match= $2  where match_id = $1;"

module.exports = {
    checkidexists,
    insertuser,
    getusertype,
    creatematch,
    createbatscorecard,
    createbowlscorecard,
    createtotalscore,
    createfallofwkts,
    getIDs, 
    checkteamexists,
    checkvenueexists,
    checkplayerexists,
    checkballexists,
    checkbatscorecardexists,
    checkbowlscorecardexists,
    checktotalscoreexists,
    checkfallofwktsexists,
    insertteam,
    insertvenue,
    insertplayer,
    setIDs,
    getPlayerId,
    getTeamId,
    getVenueId,
    getTeams,
    getvenues,
    getbatscorecard,
    getbowlscorecard,
    gettotalscore,
    updatebatscorecard,
    updatebowlscorecard,
    updatetotalscore,
    insertballbyball,
    getplayermatch,
    getplayerinfo,
    getmatchinfo,
    getteaminfo,
    getmatchplayers,
    insertplayertomatch,
    checkplayermatchexists,
    getmatchid,
    getpreviousMatches,
    getongoingMatches,
    getscheduledmatches,
    getmatchbyid,
    getplayersMatches,
    getballplayersMatches,
    getball_by_ball,
    getwickets,
    getteam1byid,
    getteam2byid,
    getvenuebyid,
    gettosswinnerbyid,
    getmatchwinnerbyid,
    getinningsbyid,
    getallwickets,
    gettoss_winner,
    addtoss,
    playerData,
    matchesbat,
    inningsbat,
    notouts,
    runsbat,
    hsbat,
    ballsbat,
    doubleh,
    hundreds,
    fifties,
    fours,
    sixes,
    createbatstats,
    updatebatstats,
    getbatranks,
    matchesbowl,
    inningsbowl,
    runsbowl,
    wkts,
    maidens,
    fivewkts,
    tenwkts,
    ballsbowl,
    bbi,
    bbm,
    createbowlstats,
    updatebowlstats,
    getbowlranks,
    ifbat,
    ifbowl,
    checkbatstats,
    checkbowlstats,
    addManoftheMatch,
};