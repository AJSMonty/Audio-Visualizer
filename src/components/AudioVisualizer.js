import React, { Component } from 'react';

class AudioVisualizer extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            red: 99,
            green: 30,
            blue: 60
        }
    }

    changeColor() {
        this.state.red === 99 ? this.setState({ red: 0 }) : this.setState(state => ({ red: state.red += 1}));
        this.state.green === 99 ? this.setState({ green: 0 }) : this.setState(state => ({ green: state.green += 1}));
        this.state.blue === 99 ? this.setState({ blue: 0 }) : this.setState(state => ({ blue: state.blue += 1}));
    }

    drawOne() {
        const { audioData } = this.props;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1.0) / audioData.length;

        context.lineWidth = 5;
        context.strokeStyle = `#${this.state.red}${this.state.green}${this.state.blue}`;
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(0, height / 2);
        for (const item of audioData) {
            const y = (item / 255.0) * height;
            context.lineTo(x, y)
            x += sliceWidth;
        }

        context.lineTo(x, height / 2);
        context.stroke();
    }
    
    componentDidUpdate() {
        this.drawOne();
        this.lightsInterval = setInterval(() => this.changeColor(), 4000);
    }


    render() {
        return <canvas className="vizual" width="1500" height="400" ref={this.canvas}/>;
    }
}

export default AudioVisualizer;