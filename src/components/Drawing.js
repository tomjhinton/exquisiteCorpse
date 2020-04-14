import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SwatchesPicker } from 'react-color'
import floodfill from 'floodfill'
class Drawing extends React.Component {


  constructor() {
    super()

    this.state = {
      corpse: {


      },
      click: false,
      color: 'black',
      brushShape: 'rect',
      brushH: 4,
      brushW: 4,
      circle: 8,
      image: '',
      fill: false,
      straight: false,
      new: {
        first: 'first',
        second: 'second',
        third: 'third'
      }

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.draw = this.draw.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.increaseB = this.increaseB.bind(this)
    this.decreaseB = this.decreaseB.bind(this)
    this.submit = this.submit.bind(this)
    this.newGame = this.newGame.bind(this)
    this.clear = this.clear.bind(this)
    this.toggleFill = this.toggleFill.bind(this)
    this.fill = this.fill.bind(this)
    this.toggleStraight = this.toggleStraight.bind(this)
    this.keyUp = this.keyUp.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.brushShape = this.brushShape.bind(this)


  }


  componentDidMount() {
    axios.get(`/api/drawings/${this.props.match.params.id}`)
      .then(res => this.setState({corpse: res.data}))

    const brush = document.getElementById('brush')
    const  context = brush.getContext('2d')

    setInterval(() =>{
      context.clearRect(0, 0, brush.width, brush.height)
      context.fillStyle = this.state.color
      if(this.state.brushShape === 'rect'){
        context.fillRect(50-(this.state.brushW/2),50-(this.state.brushH/2), this.state.brushW, this.state.brushH)
      }
      if(this.state.brushShape === 'circ'){
        context.clearRect(0, 0, brush.width, brush.height)
        context.fillRect(50-(this.state.brushW/2),50-(this.state.brushH/2), this.state.brushW, this.state.brushH)
        context.beginPath()
        context.arc(50, 50, this.state.circle, 0, 2 * Math.PI, false)
        context.fillStyle = this.state.color
        context.fill()
        context.lineWidth = 1
        context.strokeStyle = this.state.color
        context.stroke()


      }


      if(this.state.corpse.third!=='third'){
        const final =  document.getElementById('final')
        const contextF =  final.getContext('2d')
        var img1 = new Image()
        img1.src = this.state.corpse.first
        var img2 = new Image()
        img2.src = this.state.corpse.second
        var img3 = new Image()
        img3.src = this.state.corpse.third
        contextF.drawImage(img1, 0, 0)
        contextF.drawImage(img2, 0, 240)
        contextF.drawImage(img3, 0, 480)
      }


    }, 10)

  }

  componentDidUpdate(prevProps){
    if (this.props.match.params.id !== prevProps.match.params.id) {
      axios.get(`/api/drawings/${this.props.match.params.id}`)
        .then(res => this.setState({corpse: res.data}))
    }

  }

  mouseUp(e){
    let ctx, canvas
    this.setState({click: false})
    if(this.state.straight){
      canvas = document.getElementById(e.target.id)
      ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      ctx.strokeStyle = this.state.color
      ctx.lineWidth = this.state.brushW
      if(this.state.brushShape === 'circ'){
        ctx.lineCap = 'round'
        ctx.lineWidth = (this.state.circle *2)
      }
      ctx.lineTo(e.clientX-rect.left,e.clientY-rect.top)
      if(e.touches){
        ctx.lineTo(e.touches[0].clientX-rect.left,e.touches[0].clientY-rect.top)

      }
      ctx.stroke()



    }


  }

  mouseDown(e){
    let ctx, canvas
    this.setState({click: true})
    if(this.state.straight){
      canvas = document.getElementById(e.target.id)
      ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      ctx.strokeStyle = this.state.color
      ctx.lineWidth = this.state.brushW
      ctx.beginPath()
      ctx.moveTo(e.clientX-rect.left,e.clientY-rect.top)
      if(e.touches){
        ctx.moveTo(e.touches[0].clientX-rect.left,e.touches[0].clientY-rect.top)

      }




    }

  }

  newGame(e){
    e.preventDefault()
    axios.post('/api/drawings', this.state.new)
      .then(res  => this.props.history.push(`/corpse/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))

  }

  clear(){
    let canvas, ctx
    if(this.state.corpse.first ==='first'){
      canvas = document.getElementById('first')
      ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)


    } else if(this.state.corpse.second ==='second'){
      canvas = document.getElementById('second')
      ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)


    } else if(this.state.corpse.third ==='third'){
      canvas = document.getElementById('third')
      ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)






    }
  }

  draw(e){
    let canvas, ctx


    e.preventDefault()
    if(!this.state.fill){


      if(this.state.click && !this.state.straight){
        canvas = document.getElementById(e.target.id)
        ctx = canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect()
        ctx.fillStyle = this.state.color
        if(this.state.brushShape === 'rect'){
          ctx.fillRect(e.clientX-rect.left-(this.state.brushW/2), e.clientY-rect.top-(this.state.brushH/2), this.state.brushW, this.state.brushH)

        }
        if(this.state.brushShape === 'circ'){
          ctx.beginPath()
          ctx.arc(e.clientX-rect.left-(this.state.circle/2), e.clientY-rect.top-(this.state.brushH/2), this.state.circle, 0, 2 * Math.PI, false)
          ctx.fillStyle = this.state.color
          ctx.fill()
          ctx.lineWidth = 1
          ctx.strokeStyle = this.state.color
          ctx.stroke()
        }

      }


      if(e.touches && this.state.click && !this.state.straight){
        canvas = document.getElementById(e.touches[0].target.id)
        ctx = canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect()
        ctx.fillStyle = this.state.color
        if(this.state.brushShape === 'rect'){
          ctx.fillRect(e.touches[0].clientX-rect.left-(this.state.brushW/2), e.touches[0].clientY-rect.top-(this.state.brushH/2), this.state.brushW, this.state.brushH)
        }
        if(this.state.brushShape === 'circ'){
          ctx.beginPath()
          ctx.arc(e.touches[0].clientX-rect.left-(this.state.circle/2), e.touches[0].clientY-rect.top-(this.state.brushH/2), this.state.circle, 0, 2 * Math.PI, false)
          ctx.fillStyle = this.state.color
          ctx.fill()
          ctx.lineWidth = 1
          ctx.strokeStyle = this.state.color
          ctx.stroke()
        }

      }

    }
  }

  submit(e){

    let canvas, ctx
    if(this.state.corpse.first ==='first'){
      canvas = document.getElementById('first')
      ctx = canvas.getContext('2d')
      const image = canvas.toDataURL()
      const corpse = {...this.state.corpse}
      corpse.first = image
      delete corpse.id
      this.setState({corpse: corpse})
      axios.put(`/api/drawings/${this.props.match.params.id}`, corpse)
        .then(res => console.log(res))


    } else if(this.state.corpse.second ==='second'){
      canvas = document.getElementById('second')
      ctx = canvas.getContext('2d')
      const image = canvas.toDataURL()
      const corpse = {...this.state.corpse}
      corpse.second = image
      delete corpse.id
      this.setState({corpse: corpse})
      axios.put(`/api/drawings/${this.props.match.params.id}`, corpse)
        .then(res => console.log(res))

    } else if(this.state.corpse.third ==='third'){
      canvas = document.getElementById('third')
      ctx = canvas.getContext('2d')
      const image = canvas.toDataURL()
      const corpse = {...this.state.corpse}
      corpse.third = image
      delete corpse.id
      this.setState({corpse: corpse})
      axios.put(`/api/drawings/${this.props.match.params.id}`, corpse)
        .then(res => console.log(res))





    }

  }

  handleChangeComplete(color){
    this.setState({ color: color.hex })
  }

  increaseB(e){
    if(this.state[e.target.id]>=0){
      this.setState({ [e.target.id]: this.state[e.target.id]+ 1 })
    }

  }

  decreaseB(e){
    if(this.state[e.target.id]>1){
      this.setState({ [e.target.id]: this.state[e.target.id]- 1})
    }
  }
  toggleFill(){
    this.setState(prevState => ({
      fill: !prevState.fill
    }))
    if(this.state.straight){
      this.setState(prevState => ({
        straight: !prevState.straight
      }))
    }
  }

  toggleStraight(){
    this.setState(prevState => ({
      straight: !prevState.straight
    }))
    if(this.state.fill){
      this.setState(prevState => ({
        fill: !prevState.fill
      }))
    }
  }

  keyDown(e){
    console.log(e.keyCode)
    if(e.keyCode === 16){


      if(!this.state.straight){
        this.setState(prevState => ({
          straight: !prevState.straight
        }))
      }
    }
  }

  keyUp(e){

    if(e.keyCode === 16){
      if(this.state.straight){
        this.setState(prevState => ({
          straight: !prevState.straight
        }))
      }
    }

  }

  fill(e){
    let canvas, ctx
    if(this.state.fill){

      canvas = document.getElementById(e.target.id)
      ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = this.state.color
      ctx.fillFlood(Math.floor(e.clientX-rect.left),Math.floor( e.clientY-rect.top), 32)
    }
  }

  brushShape(e){
    this.setState({brushShape: e.target.id})
    console.log(this.state)
  }



  render(){


    return(

      <div className='container' onMouseDown={this.mouseDown} onTouchStart={this.mouseDown} onMouseUp={this.mouseUp} onTouchEnd={this.mouseUp}  onKeyDown={this.keyDown}  onKeyUp={this.keyUp}
        tabIndex="0">
        <div className='columns is-multiline'>
          <div className='column is-4 side'>
            <SwatchesPicker onChangeComplete={ this.handleChangeComplete }/>

            <div className='brushes'>Brush  Shape </div>
            <div className='columns is-multiline'>
              <div className='column'>
                <div className='brushW'id={'brushW'} onClick={this.brushShape}>
                  <div id='rect'> Squared</div>
                </div>
              </div>
              <div className='column'>
                <div className='brushW'id={'brushW'}  onClick={this.brushShape}>
                  <div id='circ'> Circular</div>
                </div>

              </div>
            </div>

            {this.state.brushShape === 'circ' && <div>
              <div className='brushes'>Brush  Size : {this.state.circle}</div>
              <div className='columns is-multiline'>
                <div className='column'>
                  <div className='circle'id={'circle'} onClick={this.increaseB}>
                      +
                  </div>
                </div>
                <div className='column'>
                  <div className='circle'id={'circle'}  onClick={this.decreaseB}>
                      -
                  </div>

                </div>
              </div>
            </div>}

            {this.state.brushShape === 'rect' && <div>
              <div className='brushes'>Brush  Width : {this.state.brushW}</div>
              <div className='columns is-multiline'>
                <div className='column'>
                  <div className='brushW'id={'brushW'} onClick={this.increaseB}>
                      +
                  </div>
                </div>
                <div className='column'>
                  <div className='brushW'id={'brushW'}  onClick={this.decreaseB}>
                      -
                  </div>

                </div>
              </div>
              <div> Brush Height : {this.state.brushH}</div>
              <div className='columns is-multiline'>
                <div className='column'>
                  <div className='brushH'id={'brushH'} onClick={this.increaseB}>
                      +
                  </div>
                </div>
                <div className='column'>
                  <div className='brushH'id={'brushH'} onClick={this.decreaseB}>
                      -
                  </div>

                </div>
              </div>
            </div>}
            <p>Brush</p>
            <canvas  className='brush' id='brush' width={100} height={100} > </canvas>
            <div className='columns'>
              <div className='column'>
                <div className={'fill '+  (this.state.fill ? 'selected' : '')} onClick={this.toggleFill}>
                FILL
                </div>

                <div className={'straight '+  (this.state.straight ? 'selected' : '')} onClick={this.toggleStraight}>
                Straight Line
                </div>
              </div>
              <div className='column'>
                <div className='clear' onClick={this.clear}>
                CLEAR
                </div>

                <div className='submit' onClick={this.submit}>
                SUBMIT
                </div>

                <div className='new' onClick={this.newGame}>
                New Game
                </div>
              </div>
            </div>
          </div>
          <div className='column main'>
            <div className='board'>
              {this.state.corpse && this.state.corpse.first ==='first' && this.state.corpse.third ==='third' && <canvas  className='first'  id='first' width={640} height={240} onMouseMove={this.draw} onTouchMove={this.draw} onClick={this.fill}> </canvas>}

              {this.state.corpse.first !=='first' && this.state.corpse.third ==='third' && <img src={this.state.corpse.first} className={'firstImage '  +  (this.state.corpse.second!=='second' ? 'blur' : '') +  (this.state.corpse.second==='second' ? 'clip' : '')}/>}

              {this.state.corpse && this.state.corpse.second ==='second' && this.state.corpse.first !=='first' && this.state.corpse.third ==='third' && <canvas  className='second' id='second' width={640} height={240} onMouseMove={this.draw} onTouchMove={this.draw} onClick={this.fill}> </canvas>}

              {this.state.corpse.second !=='second' && this.state.corpse.third ==='third' && <img src={this.state.corpse.second} className={'secondImage'}/>}

              {this.state.corpse && this.state.corpse.third ==='third' && this.state.corpse.first !=='first' && this.state.corpse.second !=='second' && <canvas  className='third' id='third' width={640} height={240} onMouseMove={this.draw} onTouchMove={this.draw} onClick={this.fill}> </canvas>}

              {this.state.corpse.third !=='third' && <canvas  className='final' id='final' width={640} height={720} > </canvas>}
            </div>


          </div>
        </div>
      </div>


    )
  }
}
export default Drawing
