import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Item from './Item'

export default class SelectableGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }
  }

  handleSelection = e => {
    let index = this.state.selected.indexOf(e) > -1
    if (!index) {
      this.state.selected.push(e)
    }
  }

  render() {
    return this.props.items.map((item, i) => {
      const isElementSelected = this.state.selected.includes(i)
      return (
        <Item
          selectedItem={isElementSelected}
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
