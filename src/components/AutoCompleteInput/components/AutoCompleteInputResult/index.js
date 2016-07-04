import React from 'react';
import style from './style.scss';

import AutoCompleteResultItem from './components/AutoCompleteResultItem/index';

const AutoCompleteResults = (props) => {

	const handleSelect = (item) => {
		console.log("selected event from list. item", item);
		props.handleClick(item);
	}

	const matchedItems = props.items.map( (item)=> {
		return <AutoCompleteResultItem 
					key={item.id} 
					placeName={item.place_name}
					id={item.id}
					selectPlace={handleSelect.bind(null, item)}
				/>

	});
	const display = props.items.length > 0 ? "block" : "none";

	return (<ul className="places-litm-el" style={{display: display}}>{matchedItems}</ul>);
}

export default AutoCompleteResults;