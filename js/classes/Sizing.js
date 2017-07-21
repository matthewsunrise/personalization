const SR_REMOTE_URL = 'https://apps.sunriseintegration.com/a/teelaunch';

let modalTemplate = `
<div class="modal" id="sunrise_integration_sizing_modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Sizing Chart<small class="sunrise_variant_title"></small></p>
      <button class="delete"></button>
    </header>
    <section class="modal-card-body" id="sizingApp">
    <div class="box">
    <div class="columns">
    <div class="column">
        <span>Please select:</span>
    </div>
    <div class="column">
        <p class="control">
    <span class="select">
      <select name="sizingProducts" id="sizingProduct">
    <option value="">Select Product</option>
    </select>
    </span>
</p>
    </div>
    <div class="column">
        <p class="control">
    <span class="select">
    <select name="sizingUnit" id="sizingUnit">
    <option value="">Select Unit</option>
    </select>
</span>
</p>
    </div>
    </div>
    </div>
      <div class="box">
      <div class="columns">
      <div class="column">
      <table class="table is-bordered">
      <thead id="sizingHeaders">
      </thead>
      <tbody id="sizingRows">
      </tbody>
      </table>
</div>
<div class="column">
   <figure class="image" id="sizingImage">
          <img src="">
        </figure>
</div>
</div>
      </div>
    </section>
    <footer class="modal-card-foot">
    </footer>
  </div>
</div>
`;

class Sizing {
  constructor(options) {
    this.options = options;

    this.unit = {
      abbreviation: '',
      name: ''
    };

    this.init();
  }

  init() {
    const first = this.options[Object.keys(this.options)[0]];

    this.setUnit(first.units[0]);

    if ($('#SR_modal_css').length === 0) {
      $('head').append(
        `<link href="${SR_REMOTE_URL}/remote/css/modal.css" rel="stylesheet" id="SR_modal_css">`
      );
    }

    if ($('#teelaunch_modals').length === 0) {
      modalTemplate = '<div id="teelaunch_modals">' + modalTemplate + '</div>';
      $('body').append(modalTemplate);
    } else {
      $('#teelaunch_modals').append(modalTemplate);
    }

    this.setActiveProduct(first.productSKU);
    this.setSizingImage();

    this.renderHeaders();
    this.renderRows();

    this.renderProductSelections();
    this.renderProductUnits(first.units);

    const $addToCart = $('[name=add]');
    let buttonTemplate = $addToCart.outerHTML();

    buttonTemplate = buttonTemplate.replace(
      /(id="([^"]*)")/,
      'id="sizingChart"'
    );
    buttonTemplate = buttonTemplate.replace(
      /(name="([^"]*)")/,
      'name="sizingChart"'
    );
    buttonTemplate = buttonTemplate.replace(
      /(value="([^"]*)")/,
      'value="Sizing Chart"'
    );
    buttonTemplate = buttonTemplate.replace(/Add to Cart/i, 'Sizing Chart');

    $addToCart.after(buttonTemplate);
  }

  openModal(sku) {}

  renderHeaders() {
    let markup = [
      '<tr>',
      `<th>${this.activeProduct.sizeLabel}</th>`,
      `<th>${this.activeProduct.column1Header}</th>`
    ];
    if (this.activeProduct.column2Header) {
      markup.push(`<th>${this.activeProduct.column2Header}</th>`);
    }
    if (this.activeProduct.column3Header) {
      markup.push(`<th>${this.activeProduct.column3Header}</th>`);
    }
    markup.push('</tr>');
    $('#sizingHeaders').html(markup.join());
  }

  renderRows() {
    let markup = [];

    this.activeProduct.rows.forEach((row, i) => {
      if (row.unit_id == this.unit.id) {
        let html = `<tr>
        <td>${row.sizeName}</td>
        <td>${row.column1Value}</td>
      `;

        if (row.column2Value !== null) {
          html += `<td>${row.column2Value}</td>`;
        }
        if (row.column3Value !== null) {
          html += `<td>${row.column3Value}</td>`;
        }
        html += '</tr>';
        markup.push(html);
      }
    });
    $('#sizingRows').html(markup.join());
  }

  renderProductSelections() {
    var markup = [];
    for (let prop in this.options) {
      let option = `<option value="${prop}">${this.options[prop]
        .title}</option>`;
      markup.push(option);
    }
    $('#sizingProduct').html(markup.join());
  }

  renderProductUnits(units) {
    var markup = [];
    units.forEach((unit, i) => {
      let option = `<option value="${i}">${unit.name}</option>`;
      markup.push(option);
    });
    $('#sizingUnit').html(markup.join());
  }

  setActiveProduct(sku) {
    this.activeProduct = this.options[sku];
    this.setUnit(this.activeProduct.units[0]);
    this.renderProductUnits(this.activeProduct.units);

    console.log(this.activeProduct);
  }

  setSizingImage() {
    console.log(this.activeProduct.imageUrl);
    $('#sizingImage img').attr('src', this.activeProduct.imageUrl);
  }

  setUnit({ abbreviation, name, id }) {
    console.log(id);
    this.unit.abbreviation = abbreviation;
    this.unit.name = name;
    this.unit.id = id;
  }
}

export default Sizing;
