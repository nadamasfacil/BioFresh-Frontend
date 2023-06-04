import React from 'react';

const SetPages = ({productsPerPage, allProductsLength, paged, previousPage, nextPage, currentPage}) => {

    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(allProductsLength/productsPerPage); i++) {
      pageNumbers.push(i+1);
    };
  
    return (
      <nav className='row mb-3'>
        <div className='col-6 offset-6'>
          <div className='row justify-content-end pe-3 mt-3'>
            <button type="button" className="col-1 btn btn-outline-secondary" disabled={currentPage <= 1} onClick={previousPage}>{'<'}</button>
            { 
            pageNumbers?.map( num => {
              return (
                  <button 
                    key={num}
                    type="button"
                    className={num === currentPage ? "col-1 btn bg-secondary text-white text-center" : "col-1 btn btn-outline-secondary"}
                    onClick={() => paged(num)} 
                  >
                    {num}
                  </button>
              )
            })
            }
            <button type="button" className="col-1 btn btn-outline-secondary align-item-center" disabled={currentPage >= Math.ceil(allProductsLength/productsPerPage)} onClick={nextPage}>{'>'}</button>
          </div>
        </div>
      </nav>
    );
  };

  export default SetPages;