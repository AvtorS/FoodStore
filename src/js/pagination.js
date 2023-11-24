// const container = document.querySelector('pagination-container');

function renderPagination(pages) {
  return `<div class="pagination-container container">

  <div class="pagination-item-arrow">
<svg class="pagination-arrow" width="24" height="24">
  <use href="./images/icons.svg#icon-caret-small-left"></use>
</svg>
  </div>
    <div class="pagination-number-container">
  <div class="pagination-item ">1</div>
  <div class="pagination-item ">2</div>
  <div class="pagination-item ">...</div>
  <div class="pagination-item ">${pages - 1}</div>
  <div class="pagination-item ">${pages}</div>
    </div>
  <div class="pagination-item-arrow">
<svg class="pagination-arrow" width="24" height="24">
  <use href="./images/icons.svg#icon-caret-small-right"></use>
</svg>

</div>
</div>`;
}
