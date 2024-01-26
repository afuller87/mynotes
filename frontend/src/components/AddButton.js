import React from 'react'
import { Link } from 'react-router-dom'
import addIcon from '../assets/add.png'

const AddButton = () => {
    return (
        <Link to="/note/new" className="floating-button">
            <img src={addIcon} alt="Add" />
        </Link>
    )
}

export default AddButton
