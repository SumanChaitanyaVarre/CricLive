DROP TABLE IF EXISTS id_value;
DROP TABLE IF EXISTS user_password;
DROP TABLE IF EXISTS ball_by_ball;
DROP TABLE IF EXISTS fall_of_wickets;
DROP TABLE IF EXISTS total_score;
DROP TABLE IF EXISTS bowl_scorecard;
DROP TABLE IF EXISTS bat_scorecard;
DROP TABLE IF EXISTS player_match;
DROP TABLE IF EXISTS match;
DROP TABLE IF EXISTS player_bowl_stats;
DROP TABLE IF EXISTS player_bat_stats;
DROP TABLE IF EXISTS venue;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS team;

CREATE TABLE team (
    team_id INT,
    team_name TEXT,
    PRIMARY KEY(team_id)
);

CREATE TABLE player (
    player_id INT,
    player_name TEXT, 
    dob DATE ,
    role TEXT check (role in ('batsman', 'bowler', 'all-rounder', 'wicketkeeper-batsman')),
    batting_hand TEXT check (batting_hand in ('left', 'right')),
    bowling_style TEXT,
    country_name TEXT,
    test_bat_rank INT,
    test_bowl_rank INT,
    odi_bat_rank INT,
    odi_bowl_rank INT,
    t20i_bat_rank INT,
    t20i_bowl_rank INT,
    profile TEXT,
    PRIMARY KEY(player_id)
);

CREATE TABLE venue (
    venue_id INT,
    venue_name TEXT,
    city_name TEXT,
    country_name TEXT,
    capacity INT,
    PRIMARY KEY(venue_id)
);

CREATE TABLE player_bat_stats (
    player_id INT,
    format TEXT check (format in ('test', 'odi', 't20i')) ,
    matches_played INT,
    innings_played INT,
    notouts INT,
    runs_scored INT,
    highest_score INT,
    average numeric(4,2),
    balls_faced INT,
    strike_rate numeric(3,2),
    double_centuries INT,
    centuries INT,
    half_centuries INT,
    fours INT,
    sixes INT,
    PRIMARY KEY(player_id, format),
    FOREIGN KEY(player_id) REFERENCES player(player_id) ON DELETE set null
);

CREATE TABLE player_bowl_stats (
    player_id INT,
    format TEXT check (format in ('test', 'odi', 't20i')) ,
    matches_played INT,
    innings_played INT,
    balls INT,
    runs INT,
    wickets INT,
    maidens INT,
    BBI TEXT,
    BBM TEXT,
    economy numeric (2, 2),
    average numeric(5,2),
    strike_rate numeric(5,2),
    five_wkts INT,
    ten_wkts INT,
    PRIMARY KEY(player_id, format),
    FOREIGN KEY(player_id) REFERENCES player(player_id) ON DELETE set null
);

CREATE TABLE match (
    match_id INT,
    format TEXT check (format in ('test', 'odi', 't20i', 'others')) ,
    type TEXT check (type in ('international', 'local' )) ,
    overs INT,
    scheduled_time timestamp,
    team1 INT,
    team2 INT,
    venue_id INT,
    umpire TEXT,
    toss_winner INT,
    match_winner INT,
    toss_choice TEXT check (toss_choice in ('bat', 'field')),
    win_type TEXT,
    man_of_match INT,
    win_margin INT,
    attendance INT,
    PRIMARY KEY(match_id),
    FOREIGN KEY(venue_id) REFERENCES venue ON DELETE set null,
    FOREIGN KEY(team1) REFERENCES team ON DELETE set null,
    FOREIGN KEY(team2) REFERENCES team ON DELETE set null,
    FOREIGN KEY(toss_winner) REFERENCES team ON DELETE set null,
    FOREIGN KEY(match_winner) REFERENCES team ON DELETE set null,
    FOREIGN KEY(man_of_match) REFERENCES player ON DELETE set null
);

CREATE TABLE player_match (
    playermatch_key bigINT,
    match_id INT,
    player_id INT,
    role_desc TEXT,
    team_id INT ,
    PRIMARY KEY(match_id, player_id),
    FOREIGN KEY(match_id) REFERENCES match ON DELETE set null,
    FOREIGN KEY(player_id) REFERENCES player ON DELETE set null,
    FOREIGN KEY(team_id) REFERENCES team ON DELETE set null
);

CREATE TABLE bat_scorecard (
    match_id INT,
    innings INT,
    player_id INT,
    runs_scored INT,
    balls_faced INT,
    fours INT,
    sixes INT,
    strike_rate numeric(3,2),
    out_type TEXT check (out_type in ('lbw', 'bowled', 'stump', 'catch', 'runout', 'hitwicket', 'notout')),
    bowler INT,
    fielder INT,
    PRIMARY KEY (match_id, innings, player_id),
    FOREIGN KEY(match_id) REFERENCES match(match_id) ON DELETE set null,
    FOREIGN KEY(player_id) REFERENCES player(player_id) ON DELETE set null,
    FOREIGN KEY(bowler) REFERENCES player(player_id) ON DELETE set null,
    FOREIGN KEY(fielder) REFERENCES player(player_id) ON DELETE set null
);

CREATE TABLE bowl_scorecard (
    match_id INT,
    innings INT,
    player_id INT,
    over_id INT,
    ball_id INT,
    maidens INT,
    runs_given INT,
    wickets INT,
    economy numeric(2,2),
    PRIMARY KEY (match_id, innings, player_id),
    FOREIGN KEY(match_id) REFERENCES match(match_id) ON DELETE set null,
    FOREIGN KEY(player_id) REFERENCES player(player_id) ON DELETE set null
);

CREATE TABLE total_score (
    match_id INT,
    innings INT,
    tot_score INT,
    wickets INT,
    over_id INT,
    ball_id INT,
    extra_b INT,
    extra_lb INT,
    extra_nb INT,
    extra_w INT,
    extra_p INT,
    PRIMARY KEY (match_id, innings),
    FOREIGN KEY(match_id) REFERENCES match(match_id) ON DELETE set null
);

CREATE TABLE fall_of_wickets (
    match_id INT,
    innings INT,
    player_id INT,
    tot_score INT,
    wickets INT,
    over_id INT,
    ball_id INT,
    PRIMARY KEY (match_id, innings, player_id),
    FOREIGN KEY(match_id) REFERENCES match(match_id) ON DELETE set null,
    FOREIGN KEY(player_id) REFERENCES player(player_id) ON DELETE set null
);


CREATE TABLE ball_by_ball (
    match_id INT,
    innings INT,
    over_id INT,
    ball_id INT,
    ball_count INT,
    runs_scored INT,
    extra_runs INT,
    extra_type TEXT check (extra_type in ('b', 'lb', 'nb', 'wd', 'p', 'no_extra')),
    out_type TEXT check (out_type in ('lbw', 'bowled', 'stump', 'catch', 'runout', 'hitwicket', 'notout')),
    fielder INT,
    striker INT,
    non_striker INT,
    bowler INT,
    area TEXT,
    PRIMARY KEY(match_id, innings, over_id, ball_count),
    FOREIGN KEY(match_id) REFERENCES match ON DELETE set null,
    FOREIGN KEY(fielder) REFERENCES player ON DELETE set null,
    FOREIGN KEY(striker) REFERENCES player ON DELETE set null,
    FOREIGN KEY(non_striker) REFERENCES player ON DELETE set null,
    FOREIGN KEY(bowler) REFERENCES player ON DELETE set null
);

CREATE TABLE user_password(
    ID varchar(5),
    hashed_password    varchar(80),
    role TEXT check (role in ('admin', 'unlogged', 'logged')),
    country varchar(50),
    mobile_number varchar(15),
    age INT  
);

CREATE TABLE id_value(
    match_id bigINT,
    player_id bigINT,
    team_id bigINT,
    venue_id bigINT
);

/* insert into id_value values (0, 1000000, 2000000, 3000000); */