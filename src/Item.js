import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export default class Item extends Component {
  componentDidMount() {
    this.selected()
  }

  selected = currentItem => {
    console.log(findDOMNode(this.item).getBoundingClientRect())
    const left = findDOMNode(this.item).offsetLeft
    this.setState({
      left
    })
    this.props.onSelection('2')
  }

  render() {
    return (
      <div ref={c => (this.item = c)} className="flex-item">
        <span>{this.props.item}</span>
      </div>
    )
  }
}
