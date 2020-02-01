const root = document.getElementById('root');
const boardSpace = document.createElement('div');
root.appendChild(boardSpace)
boardSpace.style.width = '400px';
boardSpace.style.height = '400px';
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
    size = 50,

)=>{
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

    }
    root.appendChild(cell);
}


boardState :[
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,-1,1,0,0,0],
    [0,0,0,1,-1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
].map(
    (row, rowIndex) => row.map(
        (number,columId) =>{
            renderCell(boardSpace,number);
        }
    )
)

