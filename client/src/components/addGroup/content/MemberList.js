import React from 'react';

const MemberList = props => {
    
    const { members, deleteMember } = props;
    const fluid = members.length > 3 ? '' : 'fluid';
    const memberClass = `ui big ${fluid} teal basic button members`;

    return (
	    <div className='members'>
		{
		    members.map(member => {
			    return  <div key={member._id} className={memberClass}
			                onClick={deleteMember}>
			                    {member.username}
			            </div>
			    })
		}
	    </div>
    )
}

export default MemberList;