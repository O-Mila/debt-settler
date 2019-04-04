import React from 'react';
import { Link } from 'react-router-dom';

const GroupList = props => {
	const { groups, changeGroup } = props
  const divider = (
    <div className="ui horizontal divider">
      <i className="sliders horizontal icon"></i>
      <div className="section-title">User Groups</div>
    </div>
    )
	const groupList = groups.length ? (
      <div>
          {divider}
          <div className="row justify-content-around">
          {
            groups.map((group, i) => {
              return  <div onClick={() => changeGroup(i)} key={group._id}
                        className="ui button">
                          {group.name}
                      </div>
            })
          }
          <Link to="/groups/new"><span><i className="plus big teal circle icon"></i></span></Link>
          </div>        
      </div>
    ) : <Link to="/groups/new" className="ui massive fluid teal button">
          <div>Create new group</div>
        </Link>

	return (
    <div className="mb-5">
      {groupList}
    </div>
  )
}

export default GroupList;