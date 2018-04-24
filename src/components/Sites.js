import React from 'react'
import Site from './Site'
import {
	Route,
	Link
} from 'react-router-dom'

const Sites = (props) => {
	console.log('Sites', props.USstate)
	return (
		<div>
			<input
				type='text'
				placeholder='Enter Location'
				value={props.value}
				onChange={props.onChange}
			/>
			<button onClick={() => {
				props.getClinicalSites(props.value)
				props.getZipcode(props.value)
			}}>Search</button>
			{props.onSites.map((site)=> (
				<ul key={site.nci_id}>
					<li><Link to={{
							pathname: '/site',
							state: {
								title: site.brief_title,
								clinic: site.sites,
								USstate: props.USstate
								}
							}}>{site.brief_title}</Link></li>
					<li>Trial status: {site.current_trial_status}</li>
					<li>Gender: {site.eligibility.structured.gender}</li>
					<li>Minimum Age: {site.eligibility.structured.min_age}</li>
					<Route path='/site' component={Site} />
				</ul>
			))}
		</div>
	)
}

export default Sites

