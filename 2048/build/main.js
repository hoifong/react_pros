keydownHandler={
    ArrowLeft:function toLeft(grids){
        for(let i=0;i<grids.length;i++){
            for(let j=0;j<grids.length-1;j++){
                for(let k=j+1;k<grids.length;k++){
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
    },
    ArrowRight:function toRight(grids){
        for(let i=0;i<grids.length;i++){
            for(let j=grids.length-1;j>0;j--){
                for(let k=j-1;k>=0;k--){
                    if(grids[i][k] == 0)continue;
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
    },
    ArrowUp:function toUp(grids){
        for(let i=0;i<grids.length;i++){
            for(let j=0;j<grids.length-1;j++){
                for(let k=j+1;k<grids.length;k++){
                    if(grids[k][i] == 0)continue;
                    if(grids[j][i] == grids[k][i]){
                        grids[j][i] *= 2;
                        grids[k][i] = 0;
                    }
                    if(grids[j][i] == 0){
                        grids[j][i] = grids[k][i];
                        grids[k][i] = 0;
                    }
                }
            }
        } 
        return grids;
    },
    ArrowDown:function toDown(grids){
        for(let i=0;i<grids.length;i++){
            for(let j=grids.length-1;j>0;j--){
                for(let k=j-1;k>=0;k--){
                    if(grids[k][i] == 0)continue;
                    if(grids[j][i] == grids[k][i]){
                        grids[j][i] *= 2;
                        grids[k][i] = 0;
                    }
                    if(grids[j][i] == 0){
                        grids[j][i] = grids[k][i];
                        grids[k][i] = 0;
                    }
                }
            }
        } 
        return grids;
    }
}
function countUnfilled(grids){
    var counter = 0;
    for(let i=0;i<grids.length;i++){
        for(let j=0;j<grids.length;j++){
            if(grids[i][j] == 0){
                counter++;
            }
        }
    }
    return counter;
}

function getrandom(unfillednum){
    var fill =Math.floor(Math.random()*unfillednum+1);
    return fill;
}

function randomfilltwo(grids){
    const unfillednum = countUnfilled(grids);
    var fill1 = getrandom(unfillednum);
    var fill2 = getrandom(unfillednum);
    console.log([fill1, fill2]);
    for(let i=0;i<grids.length;i++){
        if(fill1<0&&fill2<0)break;
        for(let j=0;j<grids.length;j++){
            if(grids[i][j]==0){
                if(fill1==1){
                    grids[i][j]=2;
                    fill1 = -1;
                    continue;
                }
                if(fill2==1){
                    grids[i][j]=2;
                    fill2 = -1;
                    continue
                }

                fill1--;
                fill2--;
            }
        }
    }
    return grids;
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
        var grids = this.state.grids;
        if(keydownHandler[e.key] === undefined)
            return
        grids =randomfilltwo(keydownHandler[e.key](grids));

        this.setState({
            grids:keydownHandler[e.key](grids)
        });
        getrandom(countUnfilled(grids));
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