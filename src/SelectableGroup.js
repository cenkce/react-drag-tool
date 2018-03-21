import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import Item from "./Item"

export default class SelectableGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }
  }

  handleSelection = e => {
    //console.log(e)
  }
  selectItem = item => {
    this.state.selected.push(item)
  }

  render() {
    return this.props.items.map((item, i) => {

      return (
        <Item
          onSelection={this.handleSelection}
          item={item.title}
          key={i}
          selectKey={i}
          marqueeStartPos={this.props.marqueeStartPos}
          marqueeOldMouse={this.props.marqueeOldMouse}
          marqueeEndPos={this.props.marqueeEndPos}
        />
      )
    })
  }
}
