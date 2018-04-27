
class Cell extends React.Component{
    constructor(props){
        super(props);
    }
}

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
        console.log('Submit');
        console.log(this.state);
    }
    render(){
        const minenum = this.state.minenum;
        const width = this.state.width;
        const height = this.state.height;
        const flagnum = this.props.flagnum;
        return React.createElement("div", null, 
            React.createElement("label", null, "所有雷数"), React.createElement("input", {name: "minenum", type: "text", value: minenum, onChange: this.handleMineNumInp}), 
            React.createElement("label", null, "旗子数"), React.createElement("input", {name: "flagnum", type: "text", value: flagnum, ReadOnly: true}), 
            React.createElement("input", {name: "START", type: "submit", value: "START", onClick: this.handleSubmit}), 
            React.createElement("label", null, "宽度"), React.createElement("input", {name: "width", type: "text", value: width, onChange: this.handleWidthInp}), 
            React.createElement("label", null, "长度"), React.createElement("input", {name: "height", type: "text", value: height, onChange: this.handleHeightInp})
        );
    }
}

class Grid extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return React.createElement("div", {className: "Grid"}
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mines:0,
            grids:[]
        }
    }
    render(){
        return React.createElement("div", null, 
            React.createElement(Info, null), 
            React.createElement(Grid, null)
        )
    }
}

ReactDOM.render(
React.createElement(Info, {flagnum: 10}),
document.getElementById('game')
);