import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from './pages/startPage';
import HomePage from './pages/homepage';
import LoginPage from './pages/loginpage';
import SignupPage from './pages/signuppage';
import CurrentMatches from './pages/currentMatches';
import MatchDetails from './pages/matchDetails';
import CreateMatch from './pages/creatematch';
import CreateTeam from './pages/createTeam';
import CreateVenue from './pages/createVenue';
import CreatePlayer from './pages/createPlayer';
import CreateBall from './pages/createBall';
import AddPlayertoMatch from './pages/addPlayertoMatch'


import PreviousMatch from './pages/previousMatches';
import Matches from './pages/match';
import Bat_scorecard from './pages/bat_scorecard';
import Bowl_scorecard from './pages/bowl_scorecard';
import Scorecard from './pages/score';
import AddResult from './pages/toss_choice';
import Comm_scorecard from './pages/commentery';


import Player from './pages/player';
import BattingRankings from './pages/batrankings';
import BowlingRankings from './pages/bowlrankings';
import AddManooftheMatch from './pages/manofthematch';

function App() {
	return (	  
		<div className='app'>
			<BrowserRouter>
				<Routes>
				<Route path = "/" element={<Start/>} />
					<Route path = "/login" element = {<LoginPage/>} />
					<Route path = "/home" element = {<HomePage/>} />
					<Route path = "/signup" element = {<SignupPage/>} />
					<Route path = "/creatematch" element = {<CreateMatch/>} />
					<Route path = "/currentMatches" element = {<CurrentMatches/>} />
					<Route path = "/createteam" element = {<CreateTeam/>} />
					<Route path = "/createvenue" element = {<CreateVenue/>} />
					<Route path = "/createplayer" element = {<CreatePlayer/>} />
					 <Route path = "/:match_id/createball" element = {<CreateBall/>} />
					{/* <Route path = "/createball" element = {<CreateBall/>} /> */}
					<Route path = "/matchDetails/:id" element = {<MatchDetails/>} />
					<Route path = "/:match_id/:team_id/AddPlayertoMatch" element = {<AddPlayertoMatch/>} />

					
					<Route path = "/previousMatches" element = {<PreviousMatch/>} />
					<Route path = "/match/:match_id" element = {<Matches/>} />
					<Route path = "/bat_score/:match_id/:innings" element = {<Bat_scorecard/>} />
					<Route path = "/bowl_score/:match_id/:innings" element = {<Bowl_scorecard/>} />
					<Route path = "match/score/:match_id/:innings" element = {<Scorecard/>} />
					<Route path = "/toss/:match_id/" element = {<AddResult/>} />
					<Route path = "/Commentary/:match_id/:innings" element = {<Comm_scorecard/>} />

					<Route path = "/player/:player_id" element = {<Player/>} />
					<Route path = "/playerrankings/bat" element = {<BattingRankings/>} />
					<Route path = "/playerrankings/bowl" element = {<BowlingRankings/>} />

					<Route path = "/manofthematch/:match_id/" element = {<AddManooftheMatch/>} />


					
				</Routes>
			</BrowserRouter>
		</div>
	)
}


export default App;