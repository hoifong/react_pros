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
        if(keydownHandler[e.key] === undefined)
            return
        this.setState({
            grids:keydownHandler[e.key](grids)
        });
    }
    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyDown);
    }
    render(){
        const grids = this.state.grids;
        return <div>
            <Grid values={grids}/>
        </div>
    }
}

// 方阵
function Grid(props){
    let units = props.values.map(function(val){
        return <div className='row'>{val.map((val)=><Unit value={val}/>)}</div>;
    });
    return <div className='Grid'>{units}</div>;
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
    return <div className={className}>{value==0?"":value}</div>;
}


ReactDOM.render(<Game />, document.getElementById("game"));