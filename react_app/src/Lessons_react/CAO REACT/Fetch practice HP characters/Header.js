import React from 'react';

const Header = (props) => {
    return (
        <div className="flex j-end gap10 pad">
                <a href={props.link.link}>{props.link.title}</a>
        </div>
    );
};

export default Header;