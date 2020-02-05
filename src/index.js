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
                flipCoinsHR(appState,x,y)
                flipCoinsHL(appState,x,y)
                appState.isPLayerOneTurn = !isPLayerOneTurn;
                root.innerHTML = '';
                render(root, appState);
            }
            else if(!isPLayerOneTurn){
                boardState[x][y] = -1
                flipCoinsHR(appState,x,y)
                flipCoinsHL(appState,x,y)
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
const flipCoinsHR = function FC(GAME_STATE, xpos, ypos){
    const{isPLayerOneTurn, boardState}= GAME_STATE;
    let nextEqualCoinY=null;
    for(var i =ypos+1; i<8; i++){
        if(isPLayerOneTurn){
            if(boardState[xpos][i]===1){
                nextEqualCoinY =i
                break
            }
            else if(boardState[xpos][i]===0){
                break
            }
        }
        else{
            if(boardState[xpos][i]=== -1){
                nextEqualCoinY =i
                break
            }
            else if(boardState[xpos][i]===0){
                break
            }
        }
    } 
    if(nextEqualCoinY!== null){
        for(var i = ypos; i< nextEqualCoinY; i++){
            if(isPLayerOneTurn && boardState[xpos][i]!==0){
                boardState[xpos][i]=1
            }
            else if(!isPLayerOneTurn && boardState[xpos][i]!==0){
                boardState[xpos][i]=-1
            }
        }
    }
}
const flipCoinsHL = function FC(GAME_STATE, xpos, ypos){
    const{isPLayerOneTurn, boardState}= GAME_STATE;
    let nextEqualCoinY=null;
    for(var i =ypos-1; i>0; i--){
        if(isPLayerOneTurn){
            if(boardState[xpos][i]===1){
                nextEqualCoinY =i
                break
            }
            else if(boardState[xpos][i]===0){
                break
            }
        }
        else{
            if(boardState[xpos][i]=== -1){
                nextEqualCoinY =i
                break
            }
            else if(boardState[xpos][i]===0){
                break
            }
        }
    }
    if(nextEqualCoinY!== null){
        for(var i = ypos; i> nextEqualCoinY; i--){
            if(isPLayerOneTurn && boardState[xpos][i]!==0){
                boardState[xpos][i]=1
            }
            else if(!isPLayerOneTurn && boardState[xpos][i]!==0){
                boardState[xpos][i]=-1
            }
        }
    }
}
render(boardSpace,GAME_STATE)


