import React from 'react'

export default function FormContainer({children}) {
    return (
        <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-6">
                        {children}
                    </div>
                </div>
        </div>
    )
}
