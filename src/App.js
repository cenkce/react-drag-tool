import React, { Component } from "react"
import "./App.css"
import ReactDOM from "react-dom"
import { data } from "./data"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marqueeSelection: false,
      items: [],
      marqueeStartPos: {
        x: 0,
        y: 0
      },
      marqueeEndPos: {
        x: 0,
        y: 0
      },
      marqueeOldMouse: {
        x: 0,
        y: 0
      }
    }

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.mouseMove.bind(this)
    this._rect = null
  }
  componentWillMount() {
    this.initialState = this.state
  }
  componentDidMount() {
    this._rect = this._getInitialCoordinates()
    console.log(this._rect)
  }
  _getInitialCoordinates() {
    const style = window.getComputedStyle(document.body)
    const t = style.getPropertyValue("margin-top")
    const l = style.getPropertyValue("margin-left")
    const mLeft = parseInt(l.slice(0, l.length - 2), 10)
    const mTop = parseInt(t.slice(0, t.length - 2), 10)

    const bodyRect = document.body.getBoundingClientRect()
    const elemRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    console.log(elemRect)
    return {
      x: Math.round(elemRect.left - bodyRect.left + mLeft),
      y: Math.round(elemRect.top - bodyRect.top + mTop)
    }
  }
  onMouseDown(e) {
    const mouseUp = e => {
      document.body.removeEventListener("mouseup", mouseUp)
      document.body.removeEventListener("mousemove", this.onMouseMove)

      if (this.state.marqueeSelection == true) {
        e.stopPropagation()
        this.setState({
          marqueeSelection: false
        })
      } else {
        this.setState(this.initialState)
      }

      clearTimeout(timeout)
    }

    document.body.addEventListener("click", mouseUp)
    const parentRect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - parentRect.left
    const offsetY = e.clientY - parentRect.top

    this.setState({
      marqueeStartPos: {
        x: offsetX,
        y: offsetY
      },
      marqueeOldMouse: {
        x: e.clientX,
        y: e.clientY
      },
      marqueeEndPos: {
        x: 0,
        y: 0
      }
    })

    const timeout = setTimeout(_ => {
      this.startSelection()
    })
  }

  startSelection() {
    console.log("items null")

    this.setState({
      marqueeSelection: true
    })

    document.body.addEventListener("mousemove", this.onMouseMove)
  }
  mouseMove(e) {
    var delta = {
      x: e.clientX - this.state.marqueeOldMouse.x,
      y: e.clientY - this.state.marqueeOldMouse.y
    }

    this.setState({
      marqueeEndPos: {
        x: this.state.marqueeEndPos.x + delta.x,
        y: this.state.marqueeEndPos.y + delta.y
      },
      marqueeOldMouse: {
        x: e.clientX,
        y: e.clientY
      }
    })
  }

  render() {
    const widthBox = Math.abs(this.state.marqueeEndPos.x)
    const heightBox = Math.abs(this.state.marqueeEndPos.y)
    const boxLeft = Math.min(
      this.state.marqueeStartPos.x,
      this.state.marqueeOldMouse.x
    )

    const boxTop = Math.min(
      this.state.marqueeStartPos.y,
      this.state.marqueeOldMouse.y
    )

    return (
      <div className="App" onMouseDown={this.onMouseDown}>
        <div
          className={!this.state.marqueeSelection ? "hidden" : ""}
          style={{
            width: widthBox,
            height: heightBox,
            position: "absolute",
            cursor: "default",
            zIndex: "9999",
            border: "1px solid red",
            left: boxLeft,
            top: boxTop
          }}
        />
      </div>
    )
  }
}

export default App
