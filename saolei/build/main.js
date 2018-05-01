const VAL = {
    BLANK:0x0000,
    MINE:-0x0001,
};
const STATUS = {
    INIT:0x1000,
    SHOW:0x1001,
    FLAG:0x1002,
    UNSURE:0x1003,
    INDENT:0x1004
};
const EVENTCODE={ 
    EVENT_MD : 0x1001,  // 鼠标按下
    EVENT_MU : 0x1002,  // 鼠标抬起
    EVENT_CM : 0x1003   // 右键
};
const initCell = function(val, status){
    if (val == undefined)
        val = VAL.BLANK;
    if (status == undefined)
        status = STATUS.INIT;
    return {
        val:val,
        status:status
    }
};

function getrandom(num){
    if(num==0)
        return -1;
    var res =Math.floor(Math.random()*num+1);
    return res;
}
function getrandomlist(num, total){
    var reslist = [];
    while(num--){
        let rand = getrandom(total--);
        reslist.push(rand);
    }
    return reslist.sort((a,b)=>a-b);
}
function GridInit(minenum, width, height){
    var grid = new Array();
    var Minelist = getrandomlist(minenum, width*height);
    console.log(Minelist);
    for(let i=0;i<height;i++){
        grid.push(new Array(width));
    }
    for(let i=0;i<height;i++){
        for(let j=0;j<width;j++){
            if (grid[i][j] == undefined){
                grid[i][j] = initCell();
            }
            for(let k=0;k<minenum;k++){
                if(Minelist[k] == -1)continue;
                if(Minelist[k] == 1){
                    Minelist[k] = -1;
                    grid[i][j] = initCell(VAL.MINE);
                    for(let l=(i-1)<0?0:i-1;l<=(i+1>=height?height-1:i+1);l++){
                        for (let m=(j-1)<0?0:j-1;m<=(j+1>=width?width-1:j+1);m++){
                            if(grid[l][m] == undefined){
                                grid[l][m] = initCell();
                            }
                            let val = grid[l][m].val;
                            if(val == VAL.MINE) continue;
                            else{
                                grid[l][m].val = val+1;
                            }
                        }
                    }
                    break;
                }
                Minelist[k]--;
            }
        }
    }
    console.log(grid);
    return grid;
}

// ======
// *
// * 组件
// *
// ======

class Info extends React.Component{
    constructor(props){
        super(props);
        this.state={
            minenum:20,
            width:20,
            height:20
        }

        this.handleMineNumInp = this.handleMineNumInp.bind(this);
        this.handleHeightInp = this.handleHeightInp.bind(this);
        this.handleWidthInp = this.handleWidthInp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleMineNumInp(e){
        // 雷数输入
        this.setState({
            minenum:e.target.value
        });
    }
    handleWidthInp(e){
        // 宽度输入
        this.setState({
            width:e.target.value
        });
    }
    handleHeightInp(e){
        // 长度输入
        this.setState({
            height:e.target.value
        });
    }
    handleSubmit(){
        // 这里应该重新开局
        // 需要向上传递地雷数、宽度及长度
        console.log('Submit');
        console.log(this.state);
    }
    render(){
        const minenum = this.state.minenum;
        const width = this.state.width;
        const height = this.state.height;
        const flagnum = this.props.flagnum;
        return React.createElement("div", {className: "Info"}, 
            React.createElement("div", {className: "inp-group"}, React.createElement("label", null, "所有雷数："), React.createElement("input", {name: "minenum", type: "text", value: minenum, onChange: this.handleMineNumInp})), 
            React.createElement("div", {className: "inp-group"}, React.createElement("label", null, "旗子数："), React.createElement("input", {name: "flagnum", type: "text", value: flagnum, Disable: true})), 
            React.createElement("div", {className: "inp-group"}, React.createElement("button", {onClick: this.handleSubmit}, "开始")), 
            React.createElement("div", {className: "inp-group"}, React.createElement("label", null, "宽度："), React.createElement("input", {name: "width", type: "text", value: width, onChange: this.handleWidthInp})), 
            React.createElement("div", {className: "inp-group"}, React.createElement("label", null, "长度："), React.createElement("input", {name: "height", type: "text", value: height, onChange: this.handleHeightInp}))
        );
    }
}

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }
    // handleClick(e){
    // }
    // 事件均交给上级处理
    handleMouseDown(e){
        e.preventDefault();
        this.props.handleEvent(this.props.pos, EVENTCODE.EVENT_MD);
    }
    handleMouseUp(e){
        e.preventDefault();
        this.props.handleEvent(this.props.pos, EVENTCODE.EVENT_MU);
    }
    handleContextMenu(e){
        e.preventDefault();
        // this.props.handleEvent(this.props.pos, EVENTCODE.EVENT_CM);
    }
    // handleMouseUp(){
    // }
    render(){
        return React.createElement("div", {
            className: "cell", 
            onMouseDown: this.handleMouseDown, 
            onMouseUp: this.handleMouseUp, 
            onContextMenu: this.handleContextMenu}
        )
    }
}

class Grid extends React.Component{
    constructor(props){
        super(props);
        const minenum = props.minenum;
        const width = props.width;
        const height = props.height;
        this.state = {
            grid:GridInit(minenum,width,height)
        };

        this.handleEvent = this.handleEvent.bind(this);
    }
    handleEvent(pos, eventkind){
        // 处理单元格传来的事件
        console.log(pos);
        const grid = this.state.grid;
        const cellstatus = grid[pos[0]][pos[1]];
        switch(eventkind){
            case EVENTCODE.EVENT_MD:
            // 鼠标按下
            console.log('鼠标按下了');
            break;
            case EVENTCODE.EVENT_MU:
            // 鼠标抬起
            console.log('鼠标抬起了');
            break;
            case EVENTCODE.EVENT_CM:
            // 右键
            console.log('点击了右键');
            break;
        }
    }
    render(){
        var grid = this.state.grid;
        var handleEvent = this.handleEvent;
        var view = grid.map(function(row, xindex){
            return React.createElement("div", null, row.map(function(val, yindex){
                {/* 向下传递格子的位置，以及状态值（value、status）,事件反应 */}
                return React.createElement(Cell, {pos: [xindex,yindex], handleEvent: handleEvent});
            }));
        });
        return React.createElement("div", {className: "Grid"}, 
            view
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return React.createElement("div", {className: "Game"}, 
            React.createElement(Info, null), 
            React.createElement(Grid, null)
        )
    }
}

ReactDOM.render(
    React.createElement("div", null, 
        React.createElement(Info, {flagnum: 10}), 
        React.createElement(Grid, {minenum: 10, width: 20, height: 10})
    ),
document.getElementById('game')
);