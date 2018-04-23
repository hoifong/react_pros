
function toLeft(grids){
    for(let i=0;i<grids.length;i++){
        for(let j=0;j<grids[i].length-1;j++){
            for(let k=j+1;k<grids[i].length;k++){
                if(grids[i][k] == 0) continue;
                if(grids[i][j] == grids[i][k]){
                    grids[i][j] *= 2;
                    grids[i][k] = 0;
                }
                if(grids[i][j] == 0){
                    grids[i][j] = grids[i][k];
                    grids[i][k] = 0;
                }
            }
        }
    }
    return grids;
}
function toRight(grids){

}
function toUp(grids){

}
function toDown(grids){

}
// 游戏
class Game extends React.Component{
    constructor(props){
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            grids:[
                [2, 2, 2, 2],
                [2, 2, 2, 2],
                [2, 2, 2, 2],
                [2, 0, 0, 0]
            ]
        };
    }
    handleKeyDown(e){
        const grids = this.state.grids;
        switch(e.keyCode){
            case 37:
            this.setState({
                grids:toLeft(grids)
            });
            // 左
            break;
            case 38:
            console.log('up');
            // 上
            break;
            case 39:
            console.log('right');
            // 右
            break;
            case 40:
            console.log('down');
            // 下
            break;
        }
    }
    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyDown);
    }
    render(){
        const grids = this.state.grids;
        return React.createElement("div", null, 
            React.createElement(Grid, {values: grids})
        )
    }
}

// 方阵
function Grid(props){
    let units = props.values.map(function(val){
        return React.createElement("div", {className: "row"}, val.map((val)=>React.createElement(Unit, {value: val})));
    });
    return React.createElement("div", {className: "Grid"}, units);
}

// 计算颜色及字体
function getcolor(value){
    var colors=[
        'def','c2','c4','c8','c16','c32','c64','c128','c256','c512','c1024','c2048','max'
    ];
    let i=0;
    value = value == null?0:value;
    for(;value>1&&i<colors.length;i++,value/=2);
    return colors[i];
}
// 渲染格子
function Unit(props){
    value = props.value;
    var className = getcolor(value);
    return React.createElement("div", {className: className}, value==0?"":value);
}


ReactDOM.render(React.createElement(Game, null), document.getElementById("game"));