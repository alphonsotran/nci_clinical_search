import React from 'react'
import Site from './Site'
import {
	Route,
	Link
} from 'react-router-dom'

const Sites = (props) => {
	console.log('Sites', props.USstate)
	return (
		<div className="sites">
			<div className="search">
				<h2>Clinical Cancer Trials</h2>
				<p>Please enter your U.S. zipcode into the search bar below to find sites near you.</p>
				<input
					type='text'
					placeholder='Enter Valid Zipcode'
					value={props.value}
					onChange={props.onChange}
				/>
				<button onClick={() => {
					props.getClinicalSites(props.value)
					props.getZipcode(props.value)
				}}>Search</button>
			</div>
			<div className="results">
				{props.onSites.map((site)=> (
					<ul key={site.nci_id}>
						<li><Link to={{
									pathname: '/site',
									state: {
										title: site.brief_title,
										summary: site.brief_summary,
										clinic: site.sites,
										USstate: props.USstate
									}
								}}>{site.brief_title}</Link>
						</li>
						<li>Trial status: {site.current_trial_status}</li>
						<li>Gender: {site.eligibility.structured.gender}</li>
						<li>Minimum Age: {site.eligibility.structured.min_age}</li>
						<Route path='/site' component={Site} />
					</ul>
				))}
			</div>
		</div>
	)
}

export default Sites

