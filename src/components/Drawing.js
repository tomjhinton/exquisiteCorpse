import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Drawing extends React.Component {


  constructor() {
    super()

    this.state = {
      corpse: {


      },
      click: false

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.draw = this.draw.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseDown = this.mouseDown.bind(this)

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
      ctx.moveTo(e.clientX, e.clientY)
      ctx.rect(e.clientX-rect.left, e.clientY-rect.top, 5, 1)
      ctx.stroke()

    }
    if(e.target.id ==='second' && this.state.click){
      canvas = document.getElementById('second')
      ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      console.log(e)
      ctx.moveTo(e.clientX, e.clientY)
      ctx.rect(e.clientX-rect.left, e.clientY-rect.top, 5, 1)
      ctx.stroke()

    }

    if(e.target.id ==='third' && this.state.click){
      canvas = document.getElementById('third')
      ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      console.log(e)
      ctx.moveTo(e.clientX, e.clientY)
      ctx.rect(e.clientX-rect.left, e.clientY-rect.top, 5, 1)
      ctx.stroke()

    }
  }

  render(){
    console.log(this)

    return(

      <div className='container' onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
        <div className='columns is-multiline'>
          <div className='column is-2 side'>
            hiya

          </div>
          <div className='column main'>
            {this.state.corpse && this.state.corpse.first ==='first' && <canvas  className='first'  id='first' width={640} height={240} onMouseMove={this.draw}> </canvas>}

            {this.state.corpse && this.state.corpse.second ==='second' && <canvas  className='second' id='second' width={640} height={240} onMouseMove={this.draw}> </canvas>}

            {this.state.corpse && this.state.corpse.third ==='third' && <canvas  className='third' id='third' width={640} height={240} onMouseMove={this.draw}> </canvas>}


          </div>
        </div>
      </div>


    )
  }
}
export default Drawing
