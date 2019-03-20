import React from 'react';

const MemberList = props => {
    
    const { members, deleteMember } = props;
    const size = members.length > 8 ? 'medium' : 'big';
    const memberClass = `ui ${size} teal basic button members`;

    return (
	    <div className="members h-25">
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