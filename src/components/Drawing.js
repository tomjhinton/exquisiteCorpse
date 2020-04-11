import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SwatchesPicker } from 'react-color'

class Drawing extends React.Component {


  constructor() {
    super()

    this.state = {
      corpse: {


      },
      click: false,
      color: 'black',
      brush: 'rect',
      brushH: 4,
      brushW: 4,
      image: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.draw = this.draw.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.increaseB = this.increaseB.bind(this)
    this.decreaseB = this.decreaseB.bind(this)
    this.submit = this.submit.bind(this)

  }


  componentDidMount() {
    console.log(this.props.match)
    axios.get(`/api/drawings/${this.props.match.params.id}`)
      .then(res => this.setState({corpse: res.data}))

  }


  mouseUp(){

    this.setState({click: false})

  }

  mouseDown(){

    this.setState({click: true})

  }



  draw(e){
    let canvas, ctx

    if(e.target.id ==='first' && this.state.click){
      canvas = document.getElementById('first')
      ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      console.log(e)
      ctx.fillStyle = this.state.color
      ctx.fillRect(e.clientX-rect.left-(this.state.brushW/2), e.clientY-rect.top-(this.state.brushH/2), this.state.brushW, this.state.brushH)


    }
    if(e.target.id ==='second' && this.state.click){
      canvas = document.getElementById('second')
      ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      console.log(e)
      ctx.fillStyle = this.state.color
      ctx.fillRect(e.clientX-rect.left-(this.state.brushW/2), e.clientY-rect.top-(this.state.brushH/2), this.state.brushW, this.state.brushH)
    }

    if(e.target.id ==='third' && this.state.click){
      canvas = document.getElementById('third')
      ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = this.state.color
      ctx.fillRect(e.clientX-rect.left-(this.state.brushW/2), e.clientY-rect.top-(this.state.brushH/2), this.state.brushW, this.state.brushH)


    }
  }

  submit(e){

    let canvas, ctx
    if(this.state.corpse.first ==='first'){
      canvas = document.getElementById('first')
      ctx = canvas.getContext('2d')
      let image = canvas.toDataURL()
      console.log(image)
      console.log(typeof(image))
      let corpse = {...this.state.corpse}
      corpse.first = image
      this.setState({corpse: corpse})

    }
    else if(this.state.corpse.second ==='second'){
      canvas = document.getElementById('second')
      ctx = canvas.getContext('2d')
      let image = canvas.toDataURL()
      console.log(image)
      console.log(typeof(image))
      let corpse = {...this.state.corpse}
      corpse.second = image
      this.setState({corpse: corpse})

    }

    else if(this.state.corpse.third ==='third'){
      canvas = document.getElementById('third')
      ctx = canvas.getContext('2d')
      let image = canvas.toDataURL()
      console.log(image)
      console.log(typeof(image))
      let corpse = {...this.state.corpse}
      corpse.third = image
      this.setState({corpse: corpse})



    }

  }

  handleChangeComplete(color){
    this.setState({ color: color.hex })
  }

  increaseB(e){
    console.log('hiya')
    if(this.state[e.target.id]>=0){
      this.setState({ [e.target.id]: this.state[e.target.id]+ 1 })
    }

  }

  decreaseB(e){
    if(this.state[e.target.id]>1){
      this.setState({ [e.target.id]: this.state[e.target.id]- 1})
    }
  }

  render(){
    console.log(this)

    return(

      <div className='container' onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
        <div className='columns is-multiline'>
          <div className='column is-3 side'>
            <SwatchesPicker onChangeComplete={ this.handleChangeComplete }/>
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
            <div className='submit' onClick={this.submit}>
            SUBMIT
            </div>
          </div>
          <div className='column main'>
            {this.state.corpse && this.state.corpse.first ==='first' && <canvas  className='first'  id='first' width={640} height={240} onMouseMove={this.draw}> </canvas>}

            {this.state.corpse.first !=='first' && <img src={this.state.corpse.first} className='firstImage'/>}

            {this.state.corpse && this.state.corpse.second ==='second' && this.state.corpse.first !=='first' && <canvas  className='second' id='second' width={640} height={240} onMouseMove={this.draw}> </canvas>}

            {this.state.corpse.second !=='second' && <img src={this.state.corpse.second} className='firstImage'/>}

            {this.state.corpse && this.state.corpse.third ==='third' && this.state.corpse.first !=='first' && this.state.corpse.second !=='second' && <canvas  className='third' id='third' width={640} height={240} onMouseMove={this.draw}> </canvas>}

            {this.state.corpse.third !=='third' && <img src={this.state.corpse.third} className='firstImage'/>}


          </div>
        </div>
      </div>


    )
  }
}
export default Drawing
