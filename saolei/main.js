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
        return <div className='Info'>
            <div className='inp-group'><label>所有雷数：</label><input name='minenum' type='text' value={minenum} onChange={this.handleMineNumInp} /></div>
            <div className='inp-group'><label>旗子数：</label><input name='flagnum' type='text' value={flagnum} Disable /></div>
            <div className='inp-group'><button onClick={this.handleSubmit}>开始</button></div>
            <div className='inp-group'><label>宽度：</label><input name='width' type='text' value={width} onChange={this.handleWidthInp} /></div>
            <div className='inp-group'><label>长度：</label><input name='height' type='text' value={height} onChange={this.handleHeightInp} /></div>
        </div>;
    }
}

class Cell extends React.Component{
    constructor(props){
        super(props);
    }
    // handleClick(e){
    // }
    handleMouseDown(){
    }
    // handleMouseUp(){
    // }
    render(){
        return <div className='cell'></div>
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
    }
    render(){
        var grid = this.state.grid;
        var show = grid.map(function(row, xindex){
            return <div>{row.map(function(val, yindex){
                return <Cell pos={[xindex,yindex]} status={val}/>;
            })}</div>;
        });
        return <div className='Grid'>
            {show}
        </div>;
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className='Game'>
            <Info />
            <Grid />
        </div>
    }
}

ReactDOM.render(
    <div>
        <Info flagnum={10} />
        <Grid minenum={10} width={20} height={10} />
    </div>,
document.getElementById('game')
);