import React from 'react';

const SuggestionsList = props => {
  
    const { suggestions, addMember, deleteSuggestions } = props
    const suggestionsList = (
      <div>
        {
          suggestions.map(suggestion => {
            return  <div key={suggestion._id} className="fluid big ui button" 
                      onClick={() => { addMember(suggestion); deleteSuggestions() } }>
                        {suggestion.username}                        
                    </div>
          })
        }
      </div>
    )

    return (
    	<div>{suggestionsList}</div>
    )
}

export default SuggestionsList