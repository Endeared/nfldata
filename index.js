
    let cityName = document.getElementById('cityName')
    let teamName = document.getElementById('teamName')
    let receptionsName = document.getElementById('receptions')
    let touchdownsName = document.getElementById('touchdowns')
    let receivingYdsName = document.getElementById('receivingYards')

    let rushYdsName = document.getElementById('rushYds')
    let rushTdsName = document.getElementById('rushTds')

    let winLossPct = document.getElementById('winLossPct')

    let teamNameArrPass = [];
    let teamArrPass = [];
    let receptionArrPass = [];
    let touchdownArrPass = [];
    let receivingYdsArrPass = [];
    let cities = ['Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills', 'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns', 'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers', 'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins', 'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants', 'New York Jets', 'Philadelphia Eagles', 'Pittsburgh Steelers', 'San Francisco 49ers', 'Seattle Seahawks', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders']
    let teamArrRush = [];
    let teamNameArrRush = [];
    let rushYdsArrRush = [];
    let touchdownsArrRush = [];
    let teamArrWins = [];
    let teamNameArrWins = [];
    let winArr = [];
    let lossArr = [];
    let pctArr = [];

    let searchBar = document.getElementById('search');
    searchBar.setAttribute("onkeydown", "check(this)");


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '15ec37c6e1msh41118b97b21f529p1dd1d0jsn409e2039107c',
            'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
        }
    };

    for (let i = 0; i < 5; i++) {
        for (let i = 0; i < 32; i++) {
            fetch('https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/receiving-stats/offense/2022', options)
                .then(response => response.json())
                .then(response => {

                    let teamName = response._embedded.teamReceivingStatsList[i].name
                    let lowerTeam = teamName.toLowerCase();
                    let receptions = response._embedded.teamReceivingStatsList[i].receives
                    let touchdowns = response._embedded.teamReceivingStatsList[i].touchdowns
                    let receivingYards = response._embedded.teamReceivingStatsList[i].yards

                    teamNameArrPass.push(teamName)
                    teamArrPass.push(lowerTeam)
                    receptionArrPass.push(receptions)
                    touchdownArrPass.push(touchdowns)
                    receivingYdsArrPass.push(receivingYards)


                })
                .catch(err => console.error(err));
        }

        for (let i = 0; i < 32; i++) {
            fetch('https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/rushing-stats/defense/2022', options)
                .then(response => response.json())
                .then(response => {

                    let teamName = response._embedded.teamRushingStatsList[i].name
                    let lowerTeam = teamName.toLowerCase();
                    let rushYds = response._embedded.teamRushingStatsList[i].yards
                    let touchdowns = response._embedded.teamRushingStatsList[i].touchdowns

                    teamNameArrRush.push(teamName);
                    teamArrRush.push(lowerTeam);
                    rushYdsArrRush.push(rushYds);
                    touchdownsArrRush.push(touchdowns);



                })
                .catch(err => console.error(err));
        }

        for (let i = 0; i < 32; i++) {
            fetch('https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/win-stats/2022', options)
                .then(response => response.json())
                .then(response => {

                    let teamName = response._embedded.teamWinStatsList[i].name
                    let lowerTeam = teamName.toLowerCase();
                    let wins = response._embedded.teamWinStatsList[i].wins
                    let losses = response._embedded.teamWinStatsList[i].losses
                    let pct = response._embedded.teamWinStatsList[i].winRatePercentage

                    teamNameArrWins.push(teamName);
                    teamArrWins.push(lowerTeam);
                    winArr.push(wins);
                    lossArr.push(losses);
                    pctArr.push(pct);



                })
                .catch(err => console.error(err));
        }
    }


    function check(ele) {
        if (event.key === 'Enter') {
            let lower = ele.value.toLowerCase();
            for (let i = 0; i < teamArrPass.length; i++) {
                let currentTeam = teamArrPass[i];
                if (lower === currentTeam) {
                    teamArrPass.indexOf(lower);
                    receptionsName.innerHTML = receptionArrPass[i] + " rec. ";
                    touchdownsName.innerHTML = touchdownArrPass[i] + " pass TDs";
                    receivingYdsName.innerHTML = receivingYdsArrPass[i] + " pass yds";
                    for (let i = 0; i < 32; i++) {
                        const search = lower.charAt(0).toUpperCase() + lower.slice(1);
                        let currentName = cities[i];
                        if (currentName.includes(search)) {
                            cityName.innerHTML = currentName;
                        }
                    }
                }
            }
            for (let i = 0; i < teamArrRush.length; i++) {
                let currentTeam = teamArrRush[i];
                if (lower === currentTeam) {
                    teamArrRush.indexOf(lower);
                    rushYdsName.innerHTML = rushYdsArrRush[i] + " rush yds"
                    rushTdsName.innerHTML = touchdownsArrRush[i] + " rush TDs"
                }
            }
            for (let i = 0; i < teamArrWins.length; i++) {
                let currentTeam = teamArrWins[i];
                if (currentTeam.includes(lower)) {
                    teamArrWins.indexOf(lower);

                    winLossPct.innerHTML = winArr[i] + "W - " + lossArr[i] + "L [" + pctArr[i] + "]";
                }
            }
        }
    }
