import React from "react";
import { Link } from "react-router-dom";

const TransactionsContent = props => {
  const { group, showAll, page } = props
  const { items, transfers } = group

  const transactions = items.concat(transfers)
      .sort((a, b) => a.date < b.date ? 1 : -1);

  const transactionsClass = showAll ? "ui olive button fluid" : "ui olive button";

  const expandList = transactions.length > 3 && !showAll ? (
    <Link to={`/groups/${group._id}/items`} className="ui yellow button">
      <div>SHOW ALL</div>
    </Link>
  ) : ''
  const newExpenseClass = (showAll || transactions.length === 0) ? 
    "ui fluid yellow button" : ''
  const newExpenseLink = (showAll || transactions.length === 0) ? (
    <div>Add a new expense</div>
    ) : (
    <span><i className="plus big olive circle icon"></i></span>
  )
  const newExpense = (
    <Link to={`/groups/${group._id}/items/new`} className={newExpenseClass}>
      {newExpenseLink}
    </Link>
  )

  const fullList = transactions.map(transaction => {
    return transaction.name ? (
        <Link to={`/groups/${group._id}/items/${transaction._id}`} key={transaction._id} 
            className={transactionsClass}>                
                {transaction.name}                      
        </Link>

      ) : (
        <div key={transaction._id} className={`${transactionsClass} disabled`}>
            {`${transaction.payer.username} 
            paid ${transaction.amount} ${group.currency}
            to ${transaction.receiver.username}`}
        </div>
      )
    })
    const limitedList = fullList.slice(0, 3)
    const expandedList = fullList.slice((page - 1) * 10, page * 10)
    const transactionList = showAll ? expandedList : limitedList
    return (
      <div>
          {transactionList}
          {expandList}
          {newExpense}
      </div>
  )
}

export default TransactionsContent;