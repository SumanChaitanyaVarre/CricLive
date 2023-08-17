const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/check_login', controller.checkLogin);
router.get('/login', controller.login_signup);
router.post('/check_signup', controller.checkSignUp);
router.get('/signup', controller.login_signup);
router.get('/home', controller.homePage);
router.get('/logout', controller.logout);
router.get('/matchData', controller.matchData);
router.get('/playerMatchData/:match_id', controller.playerMatchData);
router.post('/addMatch', controller.addMatch);
router.post('/addTeam', controller.addTeam);
router.post('/addVenue', controller.addVenue);
router.post('/addPlayer', controller.addPlayer);
router.post('/addBall', controller.addBall);

router.get('/players', controller.players);
router.get('/matches', controller.matches);
router.post('/addPlayertoMatch', controller.addPlayertoMatch);
router.post('/previousmatches',controller.previousMatches);
router.post('/match/:id',controller.matchbyid);
router.post('/score/:id',controller.playermatch);
router.post('/ball_score/:id',controller.bowlscore);
router.post('/wickets/:id',controller.wicketscore);
router.post('/ongoingmatches',controller.ongoingmatches);
router.post('/scheduledmatches',controller.scheduledMatches);
router.post('/addtoss', controller.addToss);
router.post('/commentary/:id', controller.commentary);

router.post('/playerData/:player_id', controller.playerData);
router.post('/player/bat/:player_id', controller.playerBat);
router.post('/player/bowl/:player_id', controller.playerBowl);
router.get('/playerRanks/batting', controller.playerBatRankings);
router.get('/playerRanks/bowling', controller.playerBowlRankings);

router.post('/addManoftheMatch', controller.manofthematch);







module.exports = router;