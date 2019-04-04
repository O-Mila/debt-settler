import React from 'react';

const MemberList = props => {
    
    const { members, deleteMember } = props;

    return (
	    <div className='row justify-content-around mt-5 mb-5'>
		{
		    members.map(member => {
			    return  <div key={member._id} 
			    		className='ui big teal basic button mr-1 ml-1 mt-1 mb-1'
			            onClick={deleteMember}>
			                    {member.username}
			            </div>
			    })
		}
	    </div>
    )
}

export default MemberList;