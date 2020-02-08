const root = document.getElementById('root');
root.style.width = '410px'
root.style.height = '100%'; 
root.style.backgroundColor='orange';
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
                flipCoinsVD(appState,x,y)
                flipCoinsVU(appState,x,y)
                flipCoinsIDD(appState,x,y)
                flipCoinsIDU(appState,x,y)
                flipCoinsILU(appState,x,y)
                flipCoinsILD(appState,x,y)
                appState.isPLayerOneTurn = !isPLayerOneTurn;
                root.innerHTML = '';
                render(root, appState);
            }
            else if(!isPLayerOneTurn){
                boardState[x][y] = -1
                flipCoinsHR(appState,x,y)
                flipCoinsHL(appState,x,y)
                flipCoinsVD(appState,x,y)
                flipCoinsVU(appState,x,y)
                flipCoinsIDD(appState,x,y)
                flipCoinsIDU(appState,x,y)
                flipCoinsILU(appState,x,y)
                flipCoinsILD(appState,x,y)
                appState.isPLayerOneTurn = !isPLayerOneTurn;
                root.innerHTML = '';
                render(root, appState);
            }
        }
    }
    
    root.appendChild(cell);
}
const renderBoard = (
    mount
) =>{
    const boardSpace = document.createElement('div');
    boardSpace.style.width = '410px';
    boardSpace.style.height = '550px';
    boardSpace.style.borderColor ='Black';
    mount.appendChild(boardSpace)
    return boardSpace
}
const render=(
    mount,
    appState,
) =>{
    renderTitle(mount);
    renderTurn(mount,appState);
    const {isPLayerOneTurn, boardState} = appState;    
    boardState.map(
        (row, rowIndex) => row.map(
            (number,columId) =>{
                renderCell(boardSpace,number,rowIndex, columId, appState);
            }
        )
    )
}
const renderTurn = (
    mount, 
    appState,
) =>{
    const {isPLayerOneTurn} = appState;
    const title = document.createElement('div');
    title.style.backgroundColor = 'orange';
    title.style.display = 'inline-box';
    title.style.width = '410px'
    if(isPLayerOneTurn){
        const text = document.createElement('div');
        const coin= document.createElement('div');
        text.innerHTML="CURRENTLY PLAYING"
        coin.style.backgroundColor = 'white';
        coin.style.textAlign = 'center';
        coin.style.verticalAlign= 'middle'
        coin.style.border='5px'
        coin.style.width= '50px'
        coin.style.height= '50px'
        coin.style.borderRadius='25px';
        title.appendChild(text)
        title.appendChild(coin)
    }else{
        title.innerHTML="CURRENTLY PLAYING:"
        const coin= document.createElement('div');
        title.innerHTML="CURRENTLY PLAYING"
        title.style.textAlign='center';
        title.style.backgroundColor = 'orange';
        coin.style.backgroundColor = 'black';
        coin.style.textAlign = 'center';
        coin.style.border='5px'
        coin.style.width= '50px'
        coin.style.height= '50px'
        coin.style.borderRadius='25px';
        title.appendChild(coin)
    }
    mount.appendChild(title)
}
const renderTitle =(mount) =>{
    const title =document.createElement('div')
    title.innerHTML= 'OTHELO';
    title.style.textAlign ='center';
    title.style.fontSize='50px';
    title.style.color ='green';
    mount.appendChild(title)
}
// Functions that check game rules 
const flipCoinsHR = function (GAME_STATE, xpos, ypos){
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
const flipCoinsHL = function (GAME_STATE, xpos, ypos){
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
const flipCoinsVD = function (GAME_STATE, xpos, ypos){
    const{isPLayerOneTurn, boardState}= GAME_STATE;
    let nextEqualCoinX=null;
    for(var i =xpos+1; i<8; i++){
        if(isPLayerOneTurn){
            if(boardState[i][ypos]===1){
                nextEqualCoinX =i
                break;
            }
            else if(boardState[i][ypos]===0){
                break;
            }
        }
        else{
            if(boardState[i][ypos]=== -1){
                nextEqualCoinX =i
                break;
            }
            else if(boardState[i][ypos]===0){
                break;
            }
        }
    } 
    if(nextEqualCoinX!== null){
        for(var i = xpos; i< nextEqualCoinX; i++){
            if(isPLayerOneTurn && boardState[i][ypos]!==0){
                boardState[i][ypos]=1;
            }
            else if(!isPLayerOneTurn && boardState[i][ypos]!==0){
                boardState[i][ypos]=-1;
            }
        }
        return true;
    }else{
        return false;
    }
}
const flipCoinsVU = function (GAME_STATE, xpos, ypos){
    const{isPLayerOneTurn, boardState}= GAME_STATE;
    let nextEqualCoinX=null;
    for(var i =xpos-1; i>0; i--){
        if(isPLayerOneTurn){
            if(boardState[i][ypos]===1){
                nextEqualCoinX =i
                break
            }
            else if(boardState[i][ypos]===0){
                break
            }
        }
        else{
            if(boardState[i][ypos]=== -1){
                nextEqualCoinX =i
                break
            }
            else if(boardState[i][ypos]===0){
                break
            }
        }
    } 
    if(nextEqualCoinX!== null){
        for(var i = xpos; i> nextEqualCoinX; i--){
            if(isPLayerOneTurn && boardState[i][ypos]!==0){
                boardState[i][ypos]=1
            }
            else if(!isPLayerOneTurn && boardState[i][ypos]!==0){
                boardState[i][ypos]=-1
            }
        }
    }
}
const flipCoinsIDD = function (GAME_STATE, xpos, ypos){
    const{isPLayerOneTurn, boardState}= GAME_STATE;
    let nextEqualCoinX = null;
    let nextEqualCoinY=null;
    let currX = xpos + 1;
    let currY = ypos + 1;
    let foundCoin = false;
    while(!foundCoin && currX<8 && currY<8){
        if(isPLayerOneTurn){
            if(boardState[currX][currY]=== 1){
                foundCoin = true;
            }
            else if(boardState[currX][currY]=== 0){
                break
            }
            else{
                currX+=1;
                currY+=1;
            }
        }else{
            if(boardState[currX][currY]=== -1){
                foundCoin = true;
            }
            else if(boardState[currX][currY]=== 0){
                break
            }
            else{
                currX+=1;
                currY+=1;
            }
        }
    }   
    if(foundCoin){
        for(var k = xpos; k< currX; k++){
            for(var l = ypos; l < currY; l++ ){
                if(isPLayerOneTurn && boardState[k][l]!==0 ){
                    boardState[k][l]=1
                }
                else if(!isPLayerOneTurn && boardState[k][l]!==0 ){
                    boardState[k][l]=-1
                }
            }
        }
    }
}
const flipCoinsIDU = function (GAME_STATE, xpos, ypos){
    const{isPLayerOneTurn, boardState}= GAME_STATE;
    let nextEqualCoinX = null;
    let nextEqualCoinY=null;
    let currX = xpos - 1;
    let currY = ypos - 1;
    let foundCoin = false;
    while(!foundCoin && currX>0 && currY>0){
        if(isPLayerOneTurn){
            if(boardState[currX][currY]=== 1){
                foundCoin = true;
            }
            else if(boardState[currX][currY]=== 0){
                break
            }
            else{
                currX-=1;
                currY-=1;
            }
        }else{
            if(boardState[currX][currY]=== -1){
                foundCoin = true;
            }
            else if(boardState[currX][currY]=== 0){
                break
            }
            else{
                currX-=1;
                currY-=1;
            }
        }
    }   
    if(foundCoin){
        for(var k = xpos; k> currX; k--){
            for(var l = ypos; l > currY; l-- ){
                if(isPLayerOneTurn && boardState[k][l]!==0){
                    boardState[k][l]=1
                }
                else if(!isPLayerOneTurn && boardState[k][l]!==0){
                    boardState[k][l]=-1
                }
            }
        }
    }
}
const flipCoinsILU = function (GAME_STATE, xpos, ypos){
    const{isPLayerOneTurn, boardState}= GAME_STATE;
    let nextEqualCoinX = null;
    let nextEqualCoinY=null;
    let currX = xpos - 1;
    let currY = ypos + 1;
    let foundCoin = false;
    while(!foundCoin && currX>0 && currY<8){
        if(isPLayerOneTurn){
            if(boardState[currX][currY]=== 1){
                foundCoin = true;
            }
            else if(boardState[currX][currY]=== 0){
                break
            }
            else{
                currX-=1;
                currY+=1;
            }
        }else{
            if(boardState[currX][currY]=== -1){
                foundCoin = true;
            }
            else if(boardState[currX][currY]=== 0){
                break
            }
            else{
                currX-=1;
                currY+=1;
            }
        }
    }   
    if(foundCoin){
        for(var k = xpos; k> currX; k--){
            for(var l = ypos; l < currY; l++ ){
                if(isPLayerOneTurn && boardState[k][l]!==0){
                    boardState[k][l]=1
                }
                else if(!isPLayerOneTurn && boardState[k][l]!==0){
                    boardState[k][l]=-1
                }
            }
        }
    }
}
const flipCoinsILD = function (GAME_STATE, xpos, ypos){
    const{isPLayerOneTurn, boardState}= GAME_STATE;
    let nextEqualCoinX = null;
    let nextEqualCoinY=null;
    let currX = xpos + 1;
    let currY = ypos - 1;
    let foundCoin = false;
    while(!foundCoin && currX<8 && currY>0){
        if(isPLayerOneTurn){
            if(boardState[currX][currY]=== 1){
                foundCoin = true;
            }
            else if(boardState[currX][currY]=== 0){
                break
            }
            else{
                currX+=1;
                currY-=1;
            }
        }else{
            if(boardState[currX][currY]=== -1){
                foundCoin = true;
            }
            else if(boardState[currX][currY]=== 0){
                break
            }
            else{
                currX+=1;
                currY-=1;
            }
        }
    }   
    if(foundCoin){
        for(var k = xpos; k< currX; k++){
            for(var l = ypos; l > currY; l-- ){
                if(isPLayerOneTurn && boardState[k][l]!==0){
                    boardState[k][l]=1
                }
                else if(!isPLayerOneTurn && boardState[k][l]!==0){
                    boardState[k][l]=-1
                }
            }
        }
    }
}
const boardSpace = renderBoard(root)
render(boardSpace,GAME_STATE)