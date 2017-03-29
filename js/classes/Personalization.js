const remote_url = 'https://apps.sunriseintegration.com/a/teelaunch/remote';
const google_font_url = 'https://fonts.googleapis.com/css?family=';


import axios from 'axios';

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
        <figure class="image" id="personalizationImage">
           <div id="textZone" class="text-zone"></div>
          <img src="" width="350" height="350">
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

class Personalization {
    constructor({ textTop, textLeft, textWidth, textHeight, font, image_url}) {

        this.textTop   = textTop;
        this.textLeft  = textLeft;
        this.width     = textWidth;
        this.height    = textHeight;
        this.image_url = image_url;
        this.font = font.capitalize();

        console.log(this.image_url);

        this.inject()
    }

    inject() {

        $('head').append(`<link href="${remote_url}/css/modal.css" rel="stylesheet">`);
        $('head').append(`<link href="${google_font_url}${this.font}" rel="stylesheet">`);
        $('body').append(modal_template);

        const $addToCart = $('[name=add]');
        const $parent = $addToCart.parent();

        let buttonTemplate = $parent.outerHTML();

        buttonTemplate = buttonTemplate.replace('addToCart', 'personalizeProduct');
        buttonTemplate = buttonTemplate.replace('name="add"', 'name="personalize"');
        buttonTemplate = buttonTemplate.replace('value="Add to Cart"', 'value="Personalize"');

        if($parent.length > 0 ) {
            $parent.after(buttonTemplate);
        } else {
            $addToCart.after(buttonTemplate);
        }

        let $img = $('#personalizationImage img');
        const $textZone = $('#textZone');

        $img.attr('src', this.image_url);

        $textZone
            .css({ 'top': this.textTop + 'px'})
            .css({ 'left': this.textLeft+ 'px'})
            .css({ 'width': this.width + 'px'})
            .css({ 'height': this.height + 'px'})
            .css({'font-family': this.font});
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

export default Personalization;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
