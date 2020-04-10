import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class WorkShow extends React.Component {


  constructor() {
    super()

    this.state = {
      corpse: {


      }

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.draw = this.draw.bind(this)

  }


  componentDidMount() {
    console.log(this.props.match)
    axios.get(`/api/drawings/${this.props.match.params.id}`)
      .then(res => this.setState({corpse: res.data}))

  }

  draw(e){
    console.log(e)
  }

  render(){
    console.log(this)

    return(

      <div className='container'>
        <div className='columns is-multiline'>
          <div className='column is-2 side'>
            hiya

          </div>
          <div className='column main'>
            {this.state.corpse && this.state.corpse.first ==='first' && <canvas  className='first' width={640} height={240} onMouseMove={this.draw}> </canvas>}

            {this.state.corpse && this.state.corpse.second ==='second' && <canvas  className='second' width={640} height={240} onMouseMove={this.draw}> </canvas>}

            {this.state.corpse && this.state.corpse.third ==='third' && <canvas  className='third' width={640} height={240} onMouseMove={this.draw}> </canvas>}


          </div>
        </div>
      </div>


    )
  }
}
export default WorkShow
