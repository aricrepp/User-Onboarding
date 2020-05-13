import React from "react";
import "./User.css";

const UserChunk = props => {
    const { user } = props;

    return(
        <div className="users">
          <pre>{user.length > 0 ? <code>{JSON.stringify(user, null, 2)}</code> : null}</pre>  
        </div>
        
    );
    
}

export default UserChunk;