import React from 'react';

const Alert = props => {
	const { alert } = props;
    const currentAlert = alert.message ? (
      <div className={`alert alert-${alert.type}`} role='alert'>{alert.message}</div>
    ) : (<div></div>)
    return (
      <div className="container">{currentAlert}</div>
    )
}

export default Alert;