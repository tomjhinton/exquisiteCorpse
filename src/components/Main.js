import React from 'react'
import axios from 'axios'




class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: '',
      new: {
        first: 'first',
        second: 'second',
        third: 'third'
      }

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.create = this.create.bind(this)






  }


  componentDidMount(){
    axios.get('/api/drawings')
      .then(res => {
        this.setState({drawings: res.data})
      })
  }

  componentDidUpdate(){



  }

  create(e){
    e.preventDefault()
    axios.post('/api/drawings', this.state.new)
      .then(res  => this.props.history.push(`/corpse/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))

  }



  render() {
    console.log(this.state)


    return (
      <div className="body">

        <div className='explanation'>
          A collaborative drawing game, take turns drawing sections of a person, beast, robot etc... The first person draws the head, the second the torso, the third the feet/tentacles/wheels.
        </div>
        <div onClick={this.create} className='create'>NEW CORPSE</div>
      </div>




    )
  }
}
export default Main
