
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
            <div className='inp-group'><label>旗子数：</label><input name='flagnum' type='text' value={flagnum} ReadOnly /></div>
            <div className='inp-group'><input name='START' type='submit' value='START' onClick={this.handleSubmit}/></div>
            <div className='inp-group'><label>宽度：</label><input name='width' type='text' value={width} onChange={this.handleWidthInp} /></div>
            <div className='inp-group'><label>长度：</label><input name='height' type='text' value={height} onChange={this.handleHeightInp} /></div>
        </div>;
    }
}

class Grid extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className='Grid'>
        </div>;
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            <Info />
            <Grid />
        </div>
    }
}

ReactDOM.render(
<Info flagnum={10} />,
document.getElementById('game')
);