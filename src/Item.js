import React, { Component } from "react"
import { findDOMNode } from "react-dom"

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }
  }
  componentWillReceiveProps() {
    const isTrue = this.selected()
    if (isTrue === true) {
      console.log(this.props.selectKey, isTrue)
    }
  }

  selected = currentItem => {
    const findDOMNODE = findDOMNode(this.item).getBoundingClientRect()

    const selectT = findDOMNODE.top
    const selectH = findDOMNODE.height
    const selectL = findDOMNODE.left
    const selectW = findDOMNODE.width
    const elementW = Math.abs(this.props.marqueeEndPos.x)
    const elementH = Math.abs(this.props.marqueeEndPos.y)
    const elementL = Math.min(
      this.props.marqueeStartPos.x,
      this.props.marqueeOldMouse.x
    )
    const elementT = Math.min(
      this.props.marqueeStartPos.y,
      this.props.marqueeOldMouse.y
    )
    const tolerance = 0
    return !(
      elementT + elementH - tolerance < selectT ||
      elementT + tolerance > selectT + selectH ||
      elementL + elementW - tolerance < selectL ||
      elementL + tolerance > selectL + selectW
    )
  }

  render() {
    return (
      <div ref={c => (this.item = c)} className="flex-item">
        <span>{this.props.item}</span>
      </div>
    )
  }
}
