import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import API from './custom/API'
import Spinner from "./custom/Spinner"
import SettingForm from "./forms/SettingForm"
import SettingShortcodes from "./SettingShortcodes"

const Settings = () => {
    const [showLoading, setShowLoading] = useState(false)
    const [fields, setFields] = useState({})
    const [sections, setSections] = useState({})
    const [activeMenu, setActiveMenu] = useState('general')
    const [shortcodes, setShortcodes] = useState({})

    const menuClick = (e) => {
        setActiveMenu(e.target.value)
    }

    const getSettingsData = () => {
        setShowLoading(true)
        API.get('wpcb/setting_fields')
        .then(res => {
            let data = res.data
            setFields(data.fields)
            setSections(data.labels)
            setShortcodes(data.shortcodes)
            setShowLoading(false)
        })
        .catch(err => {
            console.log('Error in retrieving setting fields')
            console.log(err)
            setShowLoading(false)
        })
    }

    useEffect(() => {
        setShowLoading(true)
        getSettingsData()
    }, [])
    return (
        <>
        <Spinner isVisible={showLoading} />
		<div>
            <div className="row">
                <div className='col-12 col-md-2'>
                    <div className="card card-body bg-secondary h-100 min-vh-100 m-0 border-bottom border-light shadow rounded-0 p-0">
                        {Object.keys(sections)?.map((key, idx) => {
                            return <div key={idx}>
                                <button 
                                    className={"bg-secondary w-100 p-3 border border-light border-top-0 border-start-0 border-end-0 "+(activeMenu == key ? 'bg-light text-dark' : 'text-white')}
                                    value={key}
                                    onClick={(e) => menuClick(e)}
                                >
                                    {sections[key]}
                                </button>
                            </div>
                        })}
                    </div>
                </div>
                <div className='col-12 col-md-10'>
                    {Object.keys(fields)?.map((key, idx) => {    
                        return <div className={'row '+(activeMenu == key ? '' : 'd-none')}>
                            <div className='col-12 col-md-6'>
                                <SettingForm formData={fields[key]} setting={key} getSettingsData={getSettingsData} setShowLoading={setShowLoading}/>
                            </div>
                            <div className='col-12 col-md-6'>
                                <SettingShortcodes shortcodes={shortcodes} className={['email_client', 'email_admin'].includes(key) ? '' : 'd-none'} />
                            </div>
                        </div>              
                    })}
                </div>
            </div>
        </div>
		</>
    )
}
export default Settings