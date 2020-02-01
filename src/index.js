const root = document.getElementById('root');
const boardSpace = document.createElement('div');
root.appendChild(boardSpace)
boardSpace.style.width = '410px';
boardSpace.style.height = '410px';
boardSpace.style.backgroundColor='green';


const GAME_STATE = {
    isPLayerOneTurn : true,
    boardState :[
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,-1,1,0,0,0],
        [0,0,0,1,-1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ]
}
const renderCell=(
    root,
    boardNumber,
    x,
    y,
    appState,
    size = 50,

)=>{
    const {isPLayerOneTurn,boardState} = appState;
    const cell = document.createElement('button');
    cell.style.width = `${size}px`;
    cell.style.height = `${size}px`;
    if(boardNumber === 1){
        cell.style.backgroundColor = 'White';
        cell.style.borderRadius=`${size/2}px`;
    }
    else if (boardNumber === -1){
        cell.style.backgroundColor= 'Black';
        cell.style.borderRadius=`${size/2}px`;
    }
    else if (boardNumber === 0){
        cell.style.backgroundColor = 'Green';
        cell.style.borderColor = 'black';
        cell.onclick = () =>{
            if(isPLayerOneTurn){
                boardState[x][y] = 1;
                appState.isPLayerOneTurn = !isPLayerOneTurn;
                root.innerHTML = '';
                render(root, appState);
            }
            else if(!isPLayerOneTurn){
                boardState[x][y] = -1
                appState.isPLayerOneTurn = !isPLayerOneTurn;
                root.innerHTML = '';
                render(root, appState);
            }
        }
    }
    root.appendChild(cell);
}
const render=(
    mount,
    appState,
) =>{
    const {isPLayerOneTurn, boardState} = appState;
    boardState.map(
        (row, rowIndex) => row.map(
            (number,columId) =>{
                renderCell(mount,number,rowIndex, columId, appState);
            }
        )
    )
}
render(boardSpace,GAME_STATE)


