/**
 * Build Craft Repair — catalogue.js
 * Renders the product catalogue and handles filtering/searching.
 */

(function () {
  'use strict';

  /* ============================================================
     PRODUCT DATA
     Add new products here. Fields:
       id          – unique string
       title       – product name
       category    – 'furniture' | 'decor' | 'restored' | 'workshop'
       type        – 'handcrafted' | 'restored' | 'new'
       description – short blurb
       price       – number (0 = contact for pricing)
       emoji       – placeholder icon when no image available
       image       – path to image (optional, relative to site root)
       etsy        – Etsy listing URL (optional)
       amazon      – Amazon listing URL (optional)
       available   – true / false
  ============================================================ */
  var PRODUCTS = [
    {
      id: 'farmhouse-dining-table',
      title: 'Farmhouse Dining Table',
      category: 'furniture',
      type: 'handcrafted',
      description: 'Solid white oak farmhouse table with hand-planed top and mortise-and-tenon joinery. Seats 6–8 comfortably. Made to order in your choice of stain.',
      price: 0,
      emoji: '🪵',
      available: true
    },
    {
      id: 'walnut-coffee-table',
      title: 'Live-Edge Walnut Coffee Table',
      category: 'furniture',
      type: 'handcrafted',
      description: 'Book-matched black walnut slab with a clear satin finish and hairpin legs. Each piece is truly one-of-a-kind — natural edge preserved.',
      price: 650,
      emoji: '🌳',
      available: true,
      etsy: 'https://www.etsy.com/shop/BuildCraftRepair'
    },
    {
      id: 'floating-shelves',
      title: 'Floating Wall Shelves',
      category: 'decor',
      type: 'handcrafted',
      description: 'Set of three solid pine floating shelves with hidden bracket mounting system. Available in multiple lengths and stain colors.',
      price: 120,
      emoji: '📦',
      available: true,
      etsy: 'https://www.etsy.com/shop/BuildCraftRepair',
      amazon: 'https://www.amazon.com/handmade'
    },
    {
      id: 'restored-dresser',
      title: 'Restored Victorian Dresser',
      category: 'restored',
      type: 'restored',
      description: 'Late 1800s oak dresser fully stripped and refinished with hand-rubbed tung oil. Original hardware cleaned and polished. Dovetail joints intact.',
      price: 485,
      emoji: '🗄️',
      available: true,
      etsy: 'https://www.etsy.com/shop/BuildCraftRepair'
    },
    {
      id: 'cutting-board',
      title: 'End-Grain Cutting Board',
      category: 'decor',
      type: 'handcrafted',
      description: 'Checkerboard end-grain cutting board in maple and walnut. Food-safe mineral oil finish. A perfect gift for home cooks.',
      price: 85,
      emoji: '🍴',
      available: true,
      etsy: 'https://www.etsy.com/shop/BuildCraftRepair',
      amazon: 'https://www.amazon.com/handmade'
    },
    {
      id: 'barn-door',
      title: 'Sliding Barn Door',
      category: 'furniture',
      type: 'handcrafted',
      description: 'Reclaimed pine sliding barn door with hand-forged steel hardware. Custom sizes available — contact us with your opening dimensions.',
      price: 0,
      emoji: '🚪',
      available: true
    },
    {
      id: 'restored-rocking-chair',
      title: 'Restored Shaker Rocking Chair',
      category: 'restored',
      type: 'restored',
      description: 'Early 20th-century Shaker rocker re-glued, re-woven seat and back in natural rush. Refinished in linseed oil.',
      price: 320,
      emoji: '🪑',
      available: true,
      etsy: 'https://www.etsy.com/shop/BuildCraftRepair'
    },
    {
      id: 'workshop-bench',
      title: 'Craftsman Workbench',
      category: 'workshop',
      type: 'handcrafted',
      description: 'Heavy-duty maple top workbench with twin-screw leg vise and built-in tool tray. Designed for a lifetime of use.',
      price: 0,
      emoji: '🔨',
      available: true
    },
    {
      id: 'bathroom-vanity',
      title: 'Reclaimed Wood Bathroom Vanity',
      category: 'furniture',
      type: 'handcrafted',
      description: 'Single-sink vanity built from reclaimed barn wood, waterproofed with marine-grade finish. Includes vessel sink cutout.',
      price: 0,
      emoji: '🛁',
      available: true
    },
    {
      id: 'serving-tray',
      title: 'Personalized Serving Tray',
      category: 'decor',
      type: 'handcrafted',
      description: 'Handmade cherry wood serving tray with rope handles and optional laser-engraved personalization. Great for gifts.',
      price: 55,
      emoji: '🍽️',
      available: true,
      etsy: 'https://www.etsy.com/shop/BuildCraftRepair',
      amazon: 'https://www.amazon.com/handmade'
    },
    {
      id: 'restored-secretary-desk',
      title: 'Restored Secretary Desk',
      category: 'restored',
      type: 'restored',
      description: 'Mid-century secretary desk with fold-down writing surface. Veneers re-bonded, drawers re-fitted, and finished in a soft wax.',
      price: 0,
      emoji: '📝',
      available: true
    },
    {
      id: 'adirondack-chair',
      title: 'Cedar Adirondack Chair',
      category: 'furniture',
      type: 'handcrafted',
      description: 'Western red cedar Adirondack chair sanded smooth and finished with exterior oil. Naturally rot-resistant. Flat-packed for shipping.',
      price: 195,
      emoji: '🌲',
      available: true,
      etsy: 'https://www.etsy.com/shop/BuildCraftRepair'
    }
  ];

  /* ---- State ---- */
  var state = {
    query: '',
    category: 'all',
    sort: 'default'
  };

  /* ---- DOM refs ---- */
  var grid       = document.getElementById('catalogue-grid');
  var countInfo  = document.getElementById('catalogue-count');
  var searchInput = document.getElementById('catalogue-search');
  var filterBtns  = document.querySelectorAll('.filter-btn');
  var sortSelect  = document.getElementById('catalogue-sort');

  if (!grid) return; // Not on the catalogue page

  /* ---- Helpers ---- */
  function priceLabel(product) {
    if (!product.available) return '<span class="product-price price-contact">Sold</span>';
    if (product.price === 0)  return '<span class="product-price price-contact">Contact for pricing</span>';
    return '<span class="product-price">$' + product.price.toLocaleString() + '</span>';
  }

  function tagHTML(type) {
    var map = {
      handcrafted: { cls: 'tag-handcrafted', label: 'Handcrafted' },
      restored:    { cls: 'tag-restored',    label: 'Restored'    },
      new:         { cls: 'tag-new',         label: 'New'         }
    };
    var t = map[type];
    if (!t) return '';
    return '<span class="tag ' + t.cls + '">' + t.label + '</span>';
  }

  function buyLinksHTML(product) {
    if (!product.available) return '';
    var links = [];
    if (product.etsy) {
      links.push('<a href="' + escapeAttr(product.etsy) + '" class="buy-link buy-link-etsy" target="_blank" rel="noopener noreferrer">Etsy</a>');
    }
    if (product.amazon) {
      links.push('<a href="' + escapeAttr(product.amazon) + '" class="buy-link buy-link-amazon" target="_blank" rel="noopener noreferrer">Amazon</a>');
    }
    if (product.price === 0 && links.length === 0) {
      links.push('<a href="contact.html" class="buy-link buy-link-site">Enquire</a>');
    }
    return links.length ? '<div class="buy-links">' + links.join('') + '</div>' : '';
  }

  function escapeAttr(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderCard(product) {
    var imageContent = product.image
      ? '<img src="' + escapeAttr(product.image) + '" alt="' + escapeAttr(product.title) + '" loading="lazy">'
      : '<span aria-hidden="true">' + product.emoji + '</span>';

    return '<article class="product-card" data-id="' + product.id + '">'
      + '<div class="product-card-image">'
      +   imageContent
      +   '<div class="product-tag-overlay">' + tagHTML(product.type) + '</div>'
      + '</div>'
      + '<div class="product-card-body">'
      +   '<p class="product-card-category">' + escapeHTML(categoryLabel(product.category)) + '</p>'
      +   '<h3 class="product-card-title">' + escapeHTML(product.title) + '</h3>'
      +   '<p class="product-card-desc">'   + escapeHTML(product.description) + '</p>'
      +   '<div class="product-card-footer">'
      +     priceLabel(product)
      +     buyLinksHTML(product)
      +   '</div>'
      + '</div>'
      + '</article>';
  }

  function categoryLabel(cat) {
    var map = {
      furniture: 'Furniture',
      decor:     'Home Décor & Gifts',
      restored:  'Restored Antiques',
      workshop:  'Workshop & Tools'
    };
    return map[cat] || cat;
  }

  /* ---- Filter & sort ---- */
  function filtered() {
    var q = state.query.toLowerCase().trim();
    var results = PRODUCTS.filter(function (p) {
      var matchCat = state.category === 'all' || p.category === state.category;
      var matchQ   = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (state.sort === 'price-asc') {
      results.sort(function (a, b) {
        var pa = a.price || Infinity;
        var pb = b.price || Infinity;
        return pa - pb;
      });
    } else if (state.sort === 'price-desc') {
      results.sort(function (a, b) {
        var pa = a.price || 0;
        var pb = b.price || 0;
        return pb - pa;
      });
    } else if (state.sort === 'name') {
      results.sort(function (a, b) { return a.title.localeCompare(b.title); });
    }

    return results;
  }

  function render() {
    var results = filtered();
    if (countInfo) {
      countInfo.textContent = 'Showing ' + results.length + ' of ' + PRODUCTS.length + ' items';
    }
    if (results.length === 0) {
      grid.innerHTML = '<p class="no-results">No items found. Try adjusting your search or filters.</p>';
      return;
    }
    grid.innerHTML = results.map(renderCard).join('');
  }

  /* ---- Event wiring ---- */
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      state.query = this.value;
      render();
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      state.category = this.dataset.filter || 'all';
      render();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      state.sort = this.value;
      render();
    });
  }

  /* ---- Initial render ---- */
  render();

  /* ---- Expose for home page featured items (optional) ---- */
  window.BCR = window.BCR || {};
  window.BCR.PRODUCTS = PRODUCTS;
  window.BCR.renderCard = renderCard;
})();
