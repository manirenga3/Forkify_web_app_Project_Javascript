import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const { goToPage } = btn.dataset;
      handler(+goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      const markupBtn = this._generateMarkupBtnNext(curPage);
      return markupBtn;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      const markupBtn = this._generateMarkupBtnPrev(curPage);
      return markupBtn;
    }

    // Other pages
    if (curPage < numPages) {
      const markupBtn =
        this._generateMarkupBtnPrev(curPage) +
        this._generateMarkupBtnNext(curPage);
      return markupBtn;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupBtnPrev(curPage) {
    return `
        <button data-go-to-page="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
  }

  _generateMarkupBtnNext(curPage) {
    return `
        <button data-go-to-page="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
  }
}

export default new PaginationView();
