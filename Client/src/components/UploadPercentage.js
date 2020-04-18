import React from 'react'
import PropTypes from 'prop-types'

const UploadPercentage = ({percent}) => {
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={ { width: `${percent}%`} } >{ percent}%</div>
</div>
    )
}

UploadPercentage.propTypes = {
percentage: PropTypes.number.isRequired,
}

export default UploadPercentage
