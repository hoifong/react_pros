// class Board extends React.Component{
//     renderSquare(i){
//         return <Square value={i}/>;
//     }
// }
//
// class Square extends React.Component{
//     render(){
//         return(
//             <button className="square">
//                 {this.props.value}
//             </button>
//         );
//     }
// }
class Square extends React.Component{
    // 渲染棋格
    // 参数：id、status、点击回调函数
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        // 处理点击
        this.props.handleClick(this.props.id);
    }
    render(){
        const value = this.props.value;
        const styles = ['white', 'red', 'black'];
        return (React.createElement("button", {className: "Square "+styles[value], onClick: this.handleClick}));
    }
}

class Board extends React.Component{
    // 渲染棋盘
    // 参数：棋盘当前状态、点击回调
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(id){
        // 处理点击
        this.props.move(id);
    }
    render(){
        let squares = this.props.squares.map((value, index)=>React.createElement(Square, {id: index, value: value, handleClick: this.handleClick}));
        return (
            React.createElement("div", {className: "board"}, 
                squares
            )
        );
    }
}

class Record extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(id){
        this.props.handleclick(id);
    }

    render(){
        const len = this.props.len;
        const list = new Array(len);
        for (let i=0;i<len;i++){
            list[i]=React.createElement("li", null, React.createElement("a", {href: "#", onClick: ()=>this.handleClick(i)}, "#move to ", i));
        }
        return (
            React.createElement("ol", {className: "record"}, list)
        );
    }
}

function ifWinner(squares){
    const lins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i=0;i<lins.length;i++){
        const [a,b,c] = lins[i];
        if(squares[a]&& squares[a] == squares[b] && squares[b] == squares[c]){
            return squares[a];
        }
    }
    return null;
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history:[
                {
                    status:1,
                    squares:[
                        0,0,0,
                        0,0,0,
                        0,0,0
                    ],
                    winner:null
                }
            ]
        };

        this.move = this.move.bind(this);
        this.backto = this.backto.bind(this);
    }

    move(id){
        // 下棋
        const len = this.state.history.length;
        const current = this.state.history[len-1];
        const squares = current.squares.slice();

        if(squares[id] || current.winner){
            return
        }

        const nextstatus = current.status == 1?2:1;
        squares[id] = current.status;

        const winner = ifWinner(squares);
        this.setState({
            history:this.state.history.concat({
                status:nextstatus,
                squares:squares,
                winner:winner
            })
        });

    }
    backto(step){
        const history = this.state.history;
        this.setState({
            history:history.slice(0,step+1)
        });
    }

    render(){
        const len = this.state.history.length;
        const current = this.state.history[len-1];
        let str = "";
        if(current.winner){

            str = (current.winner == 1?'红':'黑')+'方胜！';
        }else{
            str = '当前为'+(current.status == 1?'红':'黑')+'方';                    
        }


        return (
            React.createElement("div", null, 
                React.createElement("h1", null, str), 
                React.createElement(Board, {squares: current.squares, move: this.move}), 
                React.createElement(Record, {len: len, handleclick: this.backto})
            )
        )
    }
}


ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));