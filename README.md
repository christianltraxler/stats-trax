
# Stats Trax
Stats Trax is a sports (currently only hockey) website built by Christian Traxler to display various information about games, teams, and players. 

General TODOs:  
Fix formatting for mobile  
Fix website background design to account for longer pages   
Add mini popup on stat table columns to explain the meaning of each stat  

## Sections
### Home 
Standard welcome page for the website 

TODO:  
Replace old way of fetching popular players
Add recent/upcoming games in middle  
Add/create logo(?) for website  

### Teams
[/teams](https://stats-trax.web.app/teams)  
Broken down by Conference and Division, displays links to each teams site  

[/teams/:abbreviation](https://stats-trax.web.app/teams/TOR)  
Contains information about the team  

TODO:  
Add team schedules 

### Players
#### [/players](https://stats-trax.web.app/players)
Directory of players broken down by first letter of last name. 

TODO:   
(Not currently needed) Add multiple pages for each letter (add player limit for single page) 

#### [/players/:id](https://stats-trax.web.app/players/8479318)
Information about the player specified  

TODO:   
Add more information about the player  
Add player stats over the years  

### Games 
Currently not implemented

TODO:  
Add game information (teams, arena, etc...)  
Add player box score  
Add team stats comparison  
Add shot charts for game (from shot charts page)  
Add line charts for game (from line charts page)  

### Shot Charts
Currently not implemented 

TODO:  
Add chart to incorporate all shots  
Filter by player(s) (for + against), team(s), all)  
Filter by shot type (goal, shot, missed, blocked)  
Filter by shot distance  
Filter by shot angle  
Upload csv data to be displayed  

### Line Charts
Currently not implemented 

TODO:  
Add chart to incorporate lines based on the game   
Filter by game  
Colour parts with PP, PK, 4v4, and EN  
Determine the lines (5v5, 4v4, PP, PK, EN) based on the common playing time  
