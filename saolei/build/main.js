const VAL = {
    BLANK:0x0000, //空白
    MINE:-0x0001, //有雷
};
const STATUS = {
    INIT:0x1000,
    SHOW:0x1001,
    FLAG:0x1002,
    UNSURE:0x1003,
    INDENT:0x1004,

};
const STYLES = {
    BASE:'cell',
    INIT:'cell init',
    FLAG:'cell flag',
    UNSURE:'cell unsure ',
    MINE_RED:'cell mine-red',
    MINE_BLACK:'cell mine-BLACK',
    INDENT:'cell indent',
    NUM:'cell number n'
};
function getClassName(status){
    switch(status.status){
        case STATUS.INIT:
            // 初始化
            return STYLES.INIT;
        break;
        case STATUS.SHOW:
            // 被点击后
            if(status.val == VAL.BLANK){
                return STYLES.BASE;
            }
            if(status.val == VAL.MINE){
                return STYLES.MINE_RED;
            }
            return STYLES.NUM+status.val;
        break;
        case STATUS.FLAG:
            // 旗子
            return STYLES.FLAG;
        break;
        case STATUS.UNSURE:
            // 问号
            return STYLES.UNSURE;
        break;
        case STATUS.INDENT:
            // 内嵌
            return STYLES.INDENT;
        break;
    }
    return STATUS.BASE;
}

const EVENTCODE={ 
    EVENT_LMD : 0x1001,  // 鼠标左键按下
    EVENT_LMU : 0x1002,  // 鼠标左键抬起
    EVENT_RMD : 0x1003,  // 鼠标右键按下
    EVENT_RMU : 0x1004,  // 鼠标右键抬起
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
    // console.log(grid);
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
            minenum:90,
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
        var val = parseInt(e.target.value);
        val = isNaN(val)?1:val;
        val = val<=0?1:val;
        val = val>=this.state.width*this.state.height?this.state.width*this.state.height-1:val;
        this.setState({
            minenum:val
        });
    }
    handleWidthInp(e){
        // 宽度输入
        var val = parseInt(e.target.value);
        val = isNaN(val)?3:val;
        val = val<=2?3:val;
        val = val>60?60:val;
        this.setState({
            width:parseInt(val)
        });
    }
    handleHeightInp(e){
        // 长度输入
        var val = parseInt(e.target.value);
        val = isNaN(val)?3:val;
        val = val<=2?3:val;
        val = val>60?60:val;
        this.setState({
            height:parseInt(val)
        });
    }
    handleSubmit(){
        // 这里应该重新开局
        // 需要向上传递地雷数、宽度及长度
        // console.log('Submit');
        // console.log(this.state);
        this.props.onSubmit(this.state.minenum,this.state.width,this.state.height);
    }
    render(){
        const minenum = this.state.minenum;
        const width = this.state.width;
        const height = this.state.height;
        const flagnum = this.props.flagnum;
        return React.createElement("div", {className: "Info"}, 
            React.createElement("div", {className: "inp-group"}, React.createElement("label", null, "所有雷数(大于0，小于总格数)："), React.createElement("input", {name: "minenum", type: "text", value: minenum, onChange: this.handleMineNumInp})), 
            React.createElement("div", {className: "inp-group"}, React.createElement("label", null, "旗子数："), React.createElement("input", {name: "flagnum", type: "text", value: flagnum, Disable: true})), 
            React.createElement("div", {className: "inp-group"}, React.createElement("button", {onClick: this.handleSubmit}, "开始")), 
            React.createElement("div", {className: "inp-group"}, React.createElement("label", null, "宽度(最大60)："), React.createElement("input", {name: "width", type: "text", value: width, onChange: this.handleWidthInp})), 
            React.createElement("div", {className: "inp-group"}, React.createElement("label", null, "长度(最大60)："), React.createElement("input", {name: "height", type: "text", value: height, onChange: this.handleHeightInp}))
        );
    }
}

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    // handleClick(e){
    // }
    // 事件均交给上级处理
    handleMouseDown(e){
        e.preventDefault();
        if(e.nativeEvent.which == 1){
            this.props.handleEvent(this.props.pos, EVENTCODE.EVENT_LMD);
        }else if(e.nativeEvent.which == 3){
            this.props.handleEvent(this.props.pos, EVENTCODE.EVENT_RMD);
        }
    }
    handleMouseUp(e){
        e.preventDefault();
        if(e.nativeEvent.which == 1){
            this.props.handleEvent(this.props.pos, EVENTCODE.EVENT_LMU);
        }else if(e.nativeEvent.which == 3){
            this.props.handleEvent(this.props.pos, EVENTCODE.EVENT_RMU);
        }
    }
    handleContextMenu(e){
        e.preventDefault();
        // this.props.handleEvent(this.props.pos, EVENTCODE.EVENT_CM);
    }
    handleClick(e){
        e.preventDefault();
    }
    // handleMouseUp(){
    // }
    render(){
        const status = this.props.status;
        var className = getClassName(status);
        return React.createElement("div", {
            className: className, 
            onMouseDown: this.handleMouseDown, 
            onMouseUp: this.handleMouseUp, 
            onContextMenu: this.handleContextMenu, 
            onClick: this.handleClick}
        )
    }
}

function findConnectBlank(grid, pos,marks){
    var x=pos[0],y=pos[1];
    // console.log(pos);
    // if(grid[x][y].val>VAL.BLANK)return marks.push;
    for(let i=0;i<marks.length;i++){
        if(marks[i][0] == x && marks[i][1] == y)return marks;
    }
    marks.push([x,y]);
    if(grid[x][y].val>VAL.BLANK)return marks;
    if(x+1<grid.length)marks = findConnectBlank(grid, [x+1,y],marks);
    if(x-1>=0)marks = findConnectBlank(grid, [x-1,y],marks);
    if(y+1<grid[0].length)marks = findConnectBlank(grid, [x,y+1],marks);
    if(y-1>=0)marks = findConnectBlank(grid, [x,y-1],marks);
    if(x-1>=0&&y-1>=0)marks = findConnectBlank(grid, [x-1,y-1],marks);
    if(x-1>=0&&y+1<grid[0].length)marks = findConnectBlank(grid, [x-1,y+1],marks);
    if(x+1<grid.length&&y-1>=0)marks = findConnectBlank(grid, [x+1,y-1],marks);
    if(x+1<grid.length&&y+1<grid[0].length)marks = findConnectBlank(grid, [x+1,y+1],marks);
    return marks;
}

function WinorLose(grid){
    var unknown=0, mine=0, flag=0;
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j].val==VAL.MINE&&grid[i][j].status==STATUS.SHOW)return -1;
            if(grid[i][j].status!=STATUS.FLAG&&grid[i][j].status!=STATUS.SHOW) unknown++;
            if(grid[i][j].val==VAL.MINE)mine++;
            if(grid[i][j].status==STATUS.FLAG)flag++;
        }
    }
    if(unknown==0&&mine==flag)return 1;
    return 0;
}

class Grid extends React.Component{
    constructor(props){
        super(props);
        const minenum = props.minenum;
        const width = props.width;
        const height = props.height;
        this.state = {};

        this.handleEvent = this.handleEvent.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState){
        // 重新开游戏
        console.log(nextProps);
        if(nextProps.update == 2)
            return {
                grid:GridInit(nextProps.minenum, nextProps.width, nextProps.height)
            };
        return null;
    }
    handleEvent(pos, eventkind){
        // 处理单元格传来的事件
        // console.log(pos);
        var grid = this.state.grid;
        const cellstatus = grid[pos[0]][pos[1]];
        switch(eventkind){
            case EVENTCODE.EVENT_LMD:
            case EVENTCODE.EVENT_RMD:
            // 鼠标按下
                if(cellstatus.status == STATUS.SHOW){
                    // 点击已知区域
                    for(let i=pos[0]-1;i<=pos[0]+1;i++){
                        if(i<0||i>=grid.length)continue;
                        for(let j=pos[1]-1;j<=pos[1]+1;j++){
                            if(j<0||j>=grid[0].length)continue;
                            if(grid[i][j].status==STATUS.INIT){
                                grid[i][j].status=STATUS.INDENT;
                            }
                        }
                    }
                }
            // console.log('鼠标按下了');
            break;
            case EVENTCODE.EVENT_LMU:
            // 鼠标左键抬起
                if(cellstatus.status == STATUS.INDENT || cellstatus.status == STATUS.INIT){
                    // 点开操作
                    grid[pos[0]][pos[1]].status = STATUS.SHOW;
                    let marks = findConnectBlank(grid, pos, []);
                    // console.log(marks);
                    for(let i=0;i<marks.length;i++){
                        grid[marks[i][0]][marks[i][1]].status = STATUS.SHOW;
                    }
                }
                if(cellstatus.status == STATUS.SHOW){
                    // 对应鼠标按下
                    for(let i=pos[0]-1;i<=pos[0]+1;i++){
                        if(i<0||i>=grid.length)continue;
                        for(let j=pos[1]-1;j<=pos[1]+1;j++){
                            if(j<0||j>=grid[0].length)continue;
                            if(grid[i][j].status==STATUS.INDENT){
                                grid[i][j].status=STATUS.INIT;
                            }
                        }
                    }
                }
            // console.log('鼠标抬起了');
            break;
            case EVENTCODE.EVENT_RMU:
                switch(cellstatus.status){
                    case STATUS.INIT:
                        grid[pos[0]][pos[1]].status=STATUS.FLAG;
                        this.props.onFlagsChange(1);
                        break;
                    case STATUS.FLAG:
                        grid[pos[0]][pos[1]].status=STATUS.UNSURE;
                        this.props.onFlagsChange(-1);
                        break;
                    case STATUS.UNSURE:
                        grid[pos[0]][pos[1]].status=STATUS.INIT;
                        break;
                    case STATUS.SHOW:
                        let flags = 0;
                        let unsure = 0;
                        for(let i=pos[0]-1;i<=pos[0]+1;i++){
                            if(i<0||i>=grid.length)continue;
                            for(let j=pos[1]-1;j<=pos[1]+1;j++){
                                if(j<0||j>=grid[0].length)continue;
                                if(grid[i][j].status==STATUS.INDENT){
                                    grid[i][j].status=STATUS.INIT;
                                    unsure++;
                                }
                                if(grid[i][j].status==STATUS.FLAG){
                                    flags++;
                                }
                            }
                        }
                        if(flags==grid[pos[0]][pos[1]].val){
                            for(let i=pos[0]-1;i<=pos[0]+1;i++){
                                if(i<0||i>=grid.length)continue;
                                for(let j=pos[1]-1;j<=pos[1]+1;j++){
                                    if(j<0||j>=grid[0].length)continue;
                                    if(grid[i][j].status==STATUS.INIT){
                                        grid[i][j].status=STATUS.SHOW;
                                        let marks = findConnectBlank(grid, [i,j], []);
                                        // console.log(marks);
                                        for(let i=0;i<marks.length;i++){
                                            grid[marks[i][0]][marks[i][1]].status = STATUS.SHOW;
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            // 右键抬起
            // console.log('抬起了右键');
            break;
        }
        this.setState({
            grid:grid
        });
        var res = WinorLose(grid);
        if(res==-1){
            alert('你输了！');
        }else if(res==1){
            alert('你赢了！');
        }
    }
    render(){
        var grid = this.state.grid;
        var handleEvent = this.handleEvent;
        var view = grid.map(function(row, xindex){
            return React.createElement("div", null, row.map(function(val, yindex){
                {/* 向下传递格子的位置，以及状态值（value、status）,事件反应 */}
                return React.createElement(Cell, {pos: [xindex,yindex], status: val, handleEvent: handleEvent});
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
        this.state={
            minenum:90,
            width:20,
            height:20,
            flagnum:0,
            known:0,
            update:2,
        };

        this.startGame = this.startGame.bind(this);
        this.changeFlags = this.changeFlags.bind(this);
    }
    changeFlags(add){
        this.setState({
            flagnum:this.state.flagnum+add,
            update:1
        });
    }
    startGame(minenum, width, height){
        this.setState({
            minenum:minenum,
            width:width,
            height:height,
            update:2
        });
    }
    render(){

        return React.createElement("div", {className: "Game"}, 
            React.createElement(Info, {
                flagnum: this.state.flagnum, 
                onSubmit: this.startGame, 
                update: this.state.update}), 
            React.createElement(Grid, {
                minenum: this.state.minenum, 
                width: this.state.width, 
                height: this.state.height, 
                update: this.state.update, 
                onFlagsChange: this.changeFlags})
        )
    }
}

ReactDOM.render(
        React.createElement(Game, null),
document.getElementById('game')
);