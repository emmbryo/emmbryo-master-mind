// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      font-family: 'Aclonica';
    }
    #master-mind {
      width: 480px;
      display: grid;
      padding: 5px;
      border-radius: 5px;
      border: solid 3px black;
      background-color: rgb(194, 239, 239);
      grid-template-columns: 85px 320px 70px;
      grid-template-rows: auto auto auto auto auto;
      grid-template-areas: 
        "header header header"
        " . master . "
        "left row right"
        "play-delete row right"
        "footer footer footer";
    }
    button {
      margin: 5px;
      padding: 5px;
      border-radius: 5px;
      font-family: 'Aclonica';
    }
    #game {
      border: solid 1px black;
    }
    #left-side-container {
      grid-area: left;
      padding-left: 5px;
    }
    #left-side {
      gap: 5px;
      display: flex;
      flex-direction: column;
    }
    #right-side-container {
      width: 70px;
      grid-area: right;
    }
    #rows {
      width: 280px;
      text-align: center;
    }
    #rows-container {
      grid-area: row;
    }
    #rows h1 {
      margin-top: 50px;
    }
    header {
      grid-area: header;
    }
    footer {
      grid-area: footer;
    }
    header, footer {
      text-align: center
    }
    #master-row-container {
      width: 95%;
      grid-area: master;
      border-radius: 5px;
      text-align: center;
      background-color: #99dade;     
    }
    img {
      width: 60px;
      height: 60px;
    }
    #play-delete {
      text-align: top;
      margin-top: 15px;
      grid-area: play-delete;     
    }
    #restart {
      padding: 10px;
      margin-top: 10px;  
    }
    #play, #delete, #restart {
      padding: 8px;
      background-color: #99dade;     
    }
    emmbryo-status-square {
      margin: 10px;
    }
  </style>

  <div id="master-mind">
    <header part="" id="">
      <h1>MasterMind</h1>
    </header> 
    <div id="master-row-container">
      <emmbryo-item-row></emmbryo-item-row>
    </div>
    <div id="left-side-container">
      <div id="left-side"></div>
    </div>
    <div id="right-side-container">
      <div id="right-side"></div>
    </div>
    <div id=rows-container>
      <div id="rows"></div>
    </div>
    <div id="play-delete">
      <button id="play"><b>PLAY</b></button>
      <button id ="delete"><b>DELETE</b></button>
    </div>    
    <footer>
      <button id="restart"><b>RESTART GAME</b></button>
    </footer>
    <div>
    </div>
  </div>
`

export { template }
