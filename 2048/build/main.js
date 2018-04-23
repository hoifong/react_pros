
// function toLeft(grids){

// }
// function toRight(grids){

// }
// function toUp(grids){

// }
// function toDown(grids){

// }
// 游戏
class Game extends React.Component{
    constructor(props){
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            grids:[
                [2, 4, 6, 8],
                [16, 32, 64, 128],
                [256, 512, 1024, 2048],
                [4096, 0, 0, 0]
            ]
        };
    }
    handleKeyDown(e){
        switch(e.keyCode){
            case 37:
            console.log('left');
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
    var className = getcolor(props.value);
    return React.createElement("div", {className: className}, props.value);
}


ReactDOM.render(React.createElement(Game, null), document.getElementById("game"));