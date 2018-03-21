import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export default class Item extends Component {
  componentDidMount() {
    const selectBox = this.item
    const findSelectBox = findDOMNode(selectBox)
    console.log(findSelectBox)
  }

  render() {
    return (
      <div ref={c => (this.item = c)} className="flex-item">
        <span>{this.props.item}</span>
      </div>
    )
  }
}
