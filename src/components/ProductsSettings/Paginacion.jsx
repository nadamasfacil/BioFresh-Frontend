//import {useSelector}  from 'react-redux';
import st from "./Paginacion.module.css";

const Paginacion = ({
  totalItems,
  itemsPerPage,
  pageCurrent,
  setPageCurrent,
}) => {
  // const countries= useSelector(state=>state.countriesView)
  //    console.log(pageCurrent+' pcurrent');
  let pageNumber = [];
  const cantPage = Math.ceil(totalItems / itemsPerPage);
  for (let i = 1; i <= cantPage; i++) {
    pageNumber.push(i);
  }
  const goToFirts = () => {
    setPageCurrent(1);
  };
  const goToLast = () => {
    setPageCurrent(cantPage);
  };
  const goToPage = (n) => {
    setPageCurrent(n);
  };
  const goToPrev = () => {
    setPageCurrent(pageCurrent - 1);
  };
  const goToNext = () => {
    setPageCurrent(pageCurrent + 1);
  };

  return (
    <div className={st.containerPag}>
      <nav className={st.navPagination}>
        <div className={st.navButtons}>
          <button
            onClick={goToFirts}
            className={st.linkPagSig}
            disabled={pageCurrent === 1 ? true : false}
          >
            First
          </button>
          <button
            onClick={goToPrev}
            className={st.linkPagSig}
            disabled={pageCurrent === 1 ? true : false}
          >
            Previous
          </button>
        </div>
        <div className={st.divNoPaginas}>
          {pageNumber.map((noPage,index) =>
            noPage <= pageCurrent + 2 && noPage >= pageCurrent - 2 ? (
              <div key={index}
                onClick={() => goToPage(noPage)}
                className={
                  noPage === pageCurrent ? st.isCurrent : st.linkPagination
                }
                // key={noPage}
              >
                {noPage}
              </div>
            ) : noPage === pageCurrent + 3 ? (
              <span key={index}>...</span>
            ) : noPage === pageCurrent - 3 ? (
              <span key={index}>...</span>
            ) : (
              ""
            )
          )}
        </div>
        <div className={st.navButtons}>
          <button
            onClick={goToNext}
            className={st.linkPagSig}
            disabled={pageCurrent >= cantPage ? true : false}
          >
            Next
          </button>
          <button
            onClick={goToLast}
            className={st.linkPagSig}
            disabled={pageCurrent >= cantPage ? true : false}
          >
            Last
          </button>
        </div>
      </nav>
    </div>
  );
};
export default Paginacion;
