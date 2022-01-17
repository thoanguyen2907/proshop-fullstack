import React from 'react'

export default function Rating({value, text}) {
    return (
        <div>
         <span>
             <i className= {value >= 1? "fas fa-star" : value >= 0.5? "fas fa-star-half-alt" :  "fas fa-star"  }></i>
         </span>
         <span>
             <i className= {value >= 1? "fas fa-star" : value >= 0.5? "fas fa-star-half-alt" :  "fas fa-star"  }></i>
         </span>
         <span>
             <i className= {value >= 1? "fas fa-star" : value >= 0.5? "fas fa-star-half-alt" :  "fas fa-star"  }></i>
         </span>
         <span>
             <i className= {value >= 1? "fas fa-star" : value >= 0.5? "fas fa-star-half-alt" :  "fas fa-star"  }></i>
         </span>
        </div>
    )
}
