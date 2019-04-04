import React, { Component } from "react";
import TransactionsContent from "../transactions/TransactionsContent";

class TransactionList extends Component {
  state = {
      showAll: false
  }
  render() {
    const { group } = this.props
    return (
      <div>
        <div className="ui horizontal divider">
          <i className="coffee icon"></i>
          <div className="section-title">Latest transactions</div>
        </div>
          <div className="ui vertical segment row justify-content-center">         
            <TransactionsContent {...this.state} group={group} />
          </div>
      </div>
    )
  }
}

export default TransactionList;