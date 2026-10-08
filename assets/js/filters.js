// Search the complete posts list before paginating the matching cards.
function initFilters() {
  const postsContainer = document.getElementById("posts-container");
  if (!postsContainer || !document.getElementById("post-search-input") || postsContainer.dataset.filtersReady) return;
  postsContainer.dataset.filtersReady = "true";

  const tagSearchInput = document.getElementById("tag-search-input");
  const postSearchInput = document.getElementById("post-search-input");
  const tagInputs = Array.from(document.querySelectorAll("#all-tags-container .filter-tag-input"));
  const tagSearchEmpty = document.getElementById("tag-search-empty");
  const filteredCount = document.getElementById("filtered-count");
  const countLabel = document.getElementById("filtered-count-label");
  const noResults = document.getElementById("posts-no-results");
  const pagination = document.getElementById("posts-pagination");
  const previousPage = document.getElementById("posts-page-prev");
  const nextPage = document.getElementById("posts-page-next");
  const pageInfo = document.getElementById("posts-page-info");
  const pageSize = Math.max(1, Number.parseInt(postsContainer.dataset.pageSize, 10) || 10);
  let currentPage = Number.parseInt(postsContainer.dataset.initialPage, 10) || 1;

  function normalize(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }

  const posts = Array.from(postsContainer.querySelectorAll(".post-card")).map((card) => ({
    card,
    text: normalize(card.dataset.searchText || card.textContent),
    tags: JSON.parse(card.dataset.filterTags || "[]"),
  }));

  function updateTagList() {
    const query = normalize(tagSearchInput.value);
    let visibleTags = 0;
    tagInputs.forEach((input) => {
      // Keep selected tags visible so the reader can always deselect them.
      const visible = input.checked || normalize(input.value).includes(query);
      input.closest(".filter-tag-checkbox").hidden = !visible;
      if (visible) visibleTags++;
    });
    tagSearchEmpty.hidden = visibleTags > 0;
  }

  function applyFilters(resetPage = true) {
    if (resetPage) currentPage = 1;
    const selectedTags = tagInputs.filter((input) => input.checked).map((input) => input.value);
    const words = normalize(postSearchInput.value).split(/\s+/).filter(Boolean);
    const matches = posts.filter((post) => {
      const matchesTags = !selectedTags.length || selectedTags.some((tag) => post.tags.includes(tag));
      const matchesWords = !words.length || words.some((word) => post.text.includes(word));
      return matchesTags && matchesWords;
    });
    const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);

    posts.forEach((post) => { post.card.hidden = true; });
    const start = (currentPage - 1) * pageSize;
    matches.slice(start, start + pageSize).forEach((post) => { post.card.hidden = false; });

    filteredCount.textContent = matches.length;
    countLabel.textContent = matches.length === 1 ? countLabel.dataset.singular : countLabel.dataset.plural;
    noResults.hidden = matches.length > 0;
    pagination.hidden = totalPages <= 1;
    previousPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  tagSearchInput.addEventListener("input", updateTagList);
  postSearchInput.addEventListener("input", () => applyFilters());
  tagInputs.forEach((input) => input.addEventListener("change", () => {
    updateTagList();
    applyFilters();
  }));

  document.getElementById("clear-filters").addEventListener("click", () => {
    tagInputs.forEach((input) => { input.checked = false; });
    tagSearchInput.value = "";
    postSearchInput.value = "";
    updateTagList();
    applyFilters();
  });

  previousPage.addEventListener("click", () => {
    currentPage--;
    applyFilters(false);
    postsContainer.scrollIntoView({ block: "start", behavior: "auto" });
  });
  nextPage.addEventListener("click", () => {
    currentPage++;
    applyFilters(false);
    postsContainer.scrollIntoView({ block: "start", behavior: "auto" });
  });

  const toggle = document.getElementById("filter-toggle-btn");
  const content = document.getElementById("posts-filter-content");
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.classList.toggle("expanded", expanded);
    content.classList.toggle("expanded", expanded);
    content.hidden = !expanded;
  });

  updateTagList();
  applyFilters(false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFilters);
} else {
  initFilters();
}
