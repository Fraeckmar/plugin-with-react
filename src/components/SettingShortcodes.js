import React from 'react'

class SettingShortcodes extends React.Component
{
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={'card border-0 shadow xw-100 p-0 '+this.props.className}>
				<div className='card-header h6 m-0'>Shortcode List</div>
				<div className='card-body p-0'>
					<table className='table table-bordered m-0'>
						<thead>
							<tr>
								<th className='px-3'>Shortcode</th>
								<th className='px-3'>Description</th>
							</tr>
						</thead>
						<tbody>
							{Object.values(this.props.shortcodes)?.map((section, idx) => {
								return <>
									<tr>
										<td colSpan={2} className='fw-semibold text-center'>{section.heading}</td>
									</tr>
									{Object.keys(section.fields)?.map((key, idx) => {
										return <tr>
											<td className='px-3'>
												<span style={{ backgroundColor: '#dde1e5' }} className='p-1 rounded-1'>{key}</span>
											</td>
											<td className='px-3'>{section.fields[key]}</td>
										</tr>
									})}
									
								</>
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default SettingShortcodes