import React, { Component } from "react";
import axios from "axios";
import TransactionsContent from "./TransactionsContent";
import LeftArrow from "../shared/LeftArrow";
import RightArrow from "./RightArrow";
import PagePoints from "./PagePoints";

class TransactionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAll: true,
      group: {},
      page: 1,
      totalPages: 1
    }
    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }
  componentDidMount(){
    const { group_id } = this.props.match.params;
    axios.get(`/api/groups/${group_id}`)
    .then(response => {
      const group = response.data
      const transfersNumber = group.items.length + group.transfers.length;
      const totalPages = Math.floor((transfersNumber - 1) / 10) + 1
      this.setState({
        group: group,
        totalPages: totalPages
      })
    })
  }
  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.componentDidMount()
    }
  }
  previousPage = () => {
    const { page } = this.state
    if(page > 0){
      this.setState({ page: page - 1 })
    }
  }
  nextPage = () => {
    const { page, totalPages } = this.state
    if(page < totalPages)
    this.setState({ page: page + 1})
  }
  render() {
    const { group, page } = this.state
    if(page === 0) window.history.back()
    const { items, transfers } = group
    const transLength = (items || transfers) ? (items.length + transfers.length) : ''
    const transactions = group.items ? <TransactionsContent {...this.state} /> : ''

    return (
      <div className="row h-75">
        <LeftArrow {...this.state} previousPage={this.previousPage} />
        <div className="col-8">
          <div>
            <h1 className="centered h-25">
              {`Transactions (${(page-1)*10 + 1} - ${Math.min(page * 10, transLength)})`}
            </h1>
            {transactions}
            <div className="ui teal fluid button" onClick={() => window.history.back()}>
                Go back
            </div>
          </div>
          <PagePoints {...this.state} />
        </div>
        <RightArrow {...this.state} nextPage={this.nextPage} />
      </div>
    )
  }
}

export default TransactionList;