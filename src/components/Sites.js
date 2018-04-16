import React from 'react'

export default function Sites (props) {
	return (
		<div>
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

