import React from 'react'

export default function Sites (props) {
	return (
		<ul>
			{props.onSites.map((site)=> (
				<li key={site.nci_id}>{site.brief_title}</li>
			))}
		</ul>
	)
}

