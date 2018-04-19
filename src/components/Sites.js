import React from 'react'
import Site from './Site'

export default function Sites (props) {
	return (
		<div>
			<input
				type='text'
				placeholder='Enter Location'
				value={props.value}
				onChange={props.onChange}
			/>
			<button onClick={() => props.getClinicalSites(props.value)}>Search</button>
			{props.onSites.map((site)=> (
				<ul key={site.nci_id}>
					<li>{site.brief_title}</li>
					<li>Trial status: {site.current_trial_status}</li>
					<li>Gender: {site.eligibility.structured.gender}</li>
					<li>Minimum Age: {site.eligibility.structured.min_age}</li>
				</ul>
			))}

		</div>
	)
}

