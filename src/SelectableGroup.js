import React, { Component } from 'react'
import Item from './Item'

export default class SelectableGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }
  }

  handleSelection = selectedItem => {
    console.log(selectedItem)
  }

  selectItem = item => {
    this.state.selected.push(item)
  }

  render() {
    return this.props.items.map((item, i) => {
      return (
        <Item onSelection={this.handleSelection} key={i} item={item.title} />
      )
    })
  }
}
