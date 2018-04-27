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
                    else if(grids[i][j] == 0){
                        grids[i][j] = grids[i][k];
                        grids[i][k] = 0;
                    }
                    else{
                        break;
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
                    else if(grids[i][j] == 0){
                        grids[i][j] = grids[i][k];
                        grids[i][k] = 0;
                    }
                    else{
                        break;
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
                    else if(grids[j][i] == 0){
                        grids[j][i] = grids[k][i];
                        grids[k][i] = 0;
                    }
                    else{
                        break;
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
                    else if(grids[j][i] == 0){
                        grids[j][i] = grids[k][i];
                        grids[k][i] = 0;
                    }
                    else{
                        break;
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
    if(unfillednum==0)
        return -1;
    var fill =Math.floor(Math.random()*unfillednum+1);
    return fill;
}

function getmax(grids){
    var max = 0;
    for(let i=0;i<grids.length;i++){
        for(let j=0;j<grids.length;j++){
            if(max<grids[i][j]){
                max = grids[i][j];
            }
        }
    }
    return max;
}

function anyCanMerge(grids){
    if(grids[0][0] == grids[0][1]||grids[0][0] == grids[1][0]){
        return true
    }
    for(let i=1;i<grids.length;i++){
        for(let j=1;j<grids.length;j++){
            if(grids[i][j] == grids[i][j-1]||grids[i][j] == grids[i-1][j]){
                return true;
            }
        }
    }
    return false;
}

function randomfilltwo(grids){
    const unfillednum = countUnfilled(grids);
    var fill1 = getrandom(unfillednum);
    var fill2 = getrandom(unfillednum);
    for(let i=0;i<grids.length;i++){
        if(fill1<0&&fill2<0)break;
        for(let j=0;j<grids.length;j++){
            if(grids[i][j]==0){
                if(fill1==1){
                    grids[i][j]=getrandom(2)*2;
                    fill1 = -1;
                    continue;
                }
                if(fill2==1){
                    grids[i][j]=getrandom(2)*2;
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

function Gridinit(){
    var grids = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    randomfilltwo(grids);
    return grids;
}

// 游戏
class Game extends React.Component{
    constructor(props){
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.GameReStart = this.GameReStart.bind(this);
        this.state = {
            grids:Gridinit(),
            grade:0
        };
    }
    handleKeyDown(e){
        var grids = this.state.grids;
        var unfillednum = countUnfilled(grids);        
        // 得到空格个数
        if(keydownHandler[e.key] === undefined){
            return;
        }
        grids = randomfilltwo(keydownHandler[e.key](grids));
        this.setState({
            grids:grids,
            grade:getmax(grids)
        });
        if(countUnfilled(grids)<1 && !anyCanMerge(grids)){
            console.log('Game Over');
        }
    }

    GameReStart(){
        this.setState({
            grids:Gridinit(),
            grade:0
        });
    }

    componentDidMount(){
        // 绑定键入事件
        window.addEventListener('keydown', this.handleKeyDown);
    }
    render(){
        const grids = this.state.grids;
        const grade = this.state.grade;
        return React.createElement("div", {className: "Game"}, 
            React.createElement(Title, {grade: grade, GameReStart: this.GameReStart}), 
            React.createElement(Grid, {values: grids})
        )
    }
}

class Title extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maxRecord:0
        }
    }

    componentWillUpdate(){
        const grade = this.props.grade;
        if (grade > this.state.maxRecord){
            this.setState({
                maxRecord:grade
            });
        }
    }

    render(){
        const maxRecord = this.state.maxRecord;
        const grade = this.props.grade;
        return React.createElement("div", {className: "title"}, 
            React.createElement("h2", null, "2048"), 
            React.createElement("small", null, "当前最高纪录：", React.createElement("strong", null, maxRecord), "当前分数：", React.createElement("strong", null, grade)), 
            React.createElement("a", {href: "#", className: "again", onClick: this.props.GameReStart}, "重新来一局")
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


// 计算颜色
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