import React from 'react';

const NewMembers = props => {
    
    const { newMembers, deleteNewMember } = props;
    const size = newMembers.length > 8 ? 'medium' : 'big';
    const memberClass = `ui ${size} olive fluid button members`;
    const header = newMembers.length ? (
    	<div className="ui horizontal divider">
    		New members
   		</div>
    ) : ''

    return (
    	<div>
    		{header}
		    <div className="members h-25">
			{
			    newMembers.map(member => {
				    return  <div key={member._id} className={memberClass}
				                onClick={deleteNewMember}>
				                    {member.username}
				            </div>
				    })
			}
		    </div>
	    </div>
    )
}

export default NewMembers;