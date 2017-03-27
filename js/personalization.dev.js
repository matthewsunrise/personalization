let modal_template = `
<div class="modal" id="sunrise_integration_modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Personalization</p>
      <button class="delete"></button>
    </header>
    <section class="modal-card-body" id="personalizationApp">
      <div class="box">
        <figure class="image">
           <div id="textZone" class="text-zone"></div>
          <img src="//cdn.shopify.com/s/files/1/0727/6341/products/pattern-1-product_a7f62414-c082-430c-965a-a73afde7cdfb_grande.jpg?v=1487960977" width="350" height="350">
        </figure>
      </div>
      <div class="box">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="Enter text here" id="personalizationText">
          </p>
          <p class="control">
    <span class="select">
      <select id="personalizationColor">
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
        <option value="violent">Violet</option>
      </select>
    </span>
  </p>
        </div>

      </div>
    </section>
    <footer class="modal-card-foot">
      <a class="button is-success button-add-to-cart">Add To Cart</a>
      <a class="button button-cancel">Cancel</a>
    </footer>
  </div>
</div>
`;

const remote_url = 'https://apps.sunriseintegration.com/a/teelaunch/remote';
const bulma_url = 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css';

import axios from 'axios';

let Personalizer;

(($) => {

    if (typeof __st.p !== 'undefined' && __st.p === 'product' && __st.rid > 0) {
        let shop_url = __st.pageurl;
        shop_url = shop_url.substr(0, shop_url.indexOf('/'));


        let personalization_check = axios.get(remote_url + '/ajax.php', {
            params: {
                action: 'getProduct',
                product_id: __st.rid,
                shop: shop_url
            }
        });

        personalization_check.then(response =>  {
            console.log(response);

            if(response.data.success) {
                Personalizer = new Personalization(response.data.data);
            }
        });

    }


    $(document).ready(e =>  {

        $(document).on('click', '#personalizeProduct', function(e) {
            e.preventDefault();

            $('#sunrise_integration_modal').addClass('is-active');
        });

        $(document).on('change paste keyup', '#personalizationText', function(e) {
            $('#textZone').html($(this).val());
        });

        $(document).on('change', '#personalizationColor', function(e) {

            console.log($(this).val());
            $('#textZone').css('color', $(this).val());
        });

        $(document).on('click', '.button.button-cancel', function(e) {
            e.preventDefault();

            $('#sunrise_integration_modal').removeClass('is-active');
        });

        $(document).on('click', '.button.button-add-to-cart', function(e) {
            e.preventDefault();

            const val = $('[name=id]').val();

            Personalization.addToCart(val);
        });

        $(document).on('click', '.button.delete', function(e) {
            e.preventDefault();

            $('#sunrise_integration_modal').removeClass('is-active');
        });
    });

    // extend jQuery to allow for grabbing the outer html of an element
    $.fn.outerHTML = function(s) {
        return s
        ? this.before(s).remove()
        : $("<p>").append(this.eq(0).clone()).html()
    }
})(jQuery);

class Personalization {
    constructor({ top, left, width, height}) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height= height;

        this.inject()
    }

    inject() {

        $('head').append(`<link href="${remote_url}/css/modal.css" rel="stylesheet">`);
        $('body').append(modal_template);

        const $addToCart = $('#addToCart');
        const $parent = $addToCart.parent();
        let buttonTemplate = $parent.outerHTML();

        buttonTemplate = buttonTemplate.replace('addToCart', 'personalizeProduct');
        buttonTemplate = buttonTemplate.replace('name="add"', 'name="personalize"');
        buttonTemplate = buttonTemplate.replace('value="Add to Cart"', 'value="Personalize"');
        $parent.after(buttonTemplate);

        const $textZone = $('#textZone');

        $textZone
            .css('top', this.top)
            .css('left', this.left)
            .css('width', this.width)
            .css('height', this.height);
    }

    static addToCart(variant_id) {

        axios.post('/cart/add.js', {
            quantity: 1,
            id: variant_id,
            properties: {
                text: $('#personalizationText').val(),
                color: $('#personalizationColor').val()
            }
        }).then(response => {
            console.log(response);
            $('#sunrise_integration_modal').removeClass('is-active');
        });
    }

}