import React from 'react';
import style from './style.scss';

const AutoCompleteResultItem = (props) => {

	return (
		<li id={props.id} onClick={props.selectPlace.bind(null, props.id)}>
			{props.placeName}
		</li>
	);
}

export default AutoCompleteResultItem;