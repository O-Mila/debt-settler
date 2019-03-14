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
          <span>     </span>
          Latest transactions
        </div>
          <div className="ui vertical segment">         
          <TransactionsContent {...this.state} group={group} />
          </div>
      </div>
    )
  }
}

export default TransactionList;