import React from 'react';

const DeletedMembers = props => {
    
    const { deletedMembers, addOldMember } = props;
    const size = deletedMembers.length > 8 ? 'medium' : 'big';
    const memberClass = `ui ${size} orange fluid button members`;
    const header = deletedMembers.length ? (
    	<div className="ui horizontal divider">
    		Deleted members
   		</div>
    	) : ''

    return (
    	<div>
    		{header}
		    <div className="members h-25">
			{
			    deletedMembers.map(member => {
				    return  <div key={member.user._id} className={memberClass}
				                onClick={addOldMember}>
				                    {member.user.username}
				            </div>
				    })
			}
		    </div>
	    </div>
    )
}

export default DeletedMembers;