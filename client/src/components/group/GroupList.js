import React from 'react';
import { Link } from 'react-router-dom';

const GroupList = props => {
	const { groups, changeGroup } = props
	const groupList = groups.length ? (
      <div>
          {
            groups.map((group, i) => {
              return  <div onClick={() => changeGroup(i)} key={group._id}
                        className="circular ui button">
                          {group.name}
                      </div>
            })
          }
        <Link to='/groups/new'><i className="plus big teal circle icon"></i></Link>
      </div>
    ) : <Link to='/groups/new' className="ui teal button">Create new group</Link>

	return <div className="h-25">{groupList}</div>
}

export default GroupList;