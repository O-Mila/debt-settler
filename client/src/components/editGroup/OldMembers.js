import React from 'react';

const OldMembers = props => {
    
    const { oldMembers, deleteOldMember } = props;
    const size = oldMembers.length > 8 ? 'medium' : 'big';
	const active = balance => {
		if(balance !== 0) return 'disabled'
	}
    return (
    	<div>	
    		<div className="ui horizontal divider">
    			Current members
    		</div>
		    <div className="members h-25">
			{
			    oldMembers.map(member => {
				    return  <div key={member.user._id} onClick={deleteOldMember}
				    			className={`ui ${size} ${active(member.balance)} button members`}>
				                    {member.user.username}
				            </div>
				    })
			}
		    </div>
		</div>
    )
}

export default OldMembers;