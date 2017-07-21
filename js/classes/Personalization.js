const SR_REMOTE_URL   = 'https://apps.sunriseintegration.com/a/teelaunch';
const GOOGLE_FONT_URL = 'https://fonts.googleapis.com/css?family=';

import axios from 'axios';

let modalTemplate = `
<div class="modal" id="sunrise_integration_modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Personalization - <small id="sunrise_variantTitle"></small></p>
      <button class="delete"></button>
    </header>
    <section class="modal-card-body" id="personalizationApp">
      <div class="box">
        <figure class="image" id="personalizationImage">
           <div id="textZone" class="text-zone">
               <div id="innerTextZone">
                    <span class="personalization-text"></span>
                    <div id="textZoneImg"></div>
                </div>
            </div>
          <img src="" width="350" height="350">
        </figure>
      </div>
      <div class="box">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="Enter text here" id="personalizationText" maxlength="20">
          </p>
          <p class="control">
    <span class="select">
      <select id="personalizationColor">
        <option value="white">White</option>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="indigo">Indigo</option>
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

let toastTemplate = `
<div class="modal" id="sunrise_integration_toast">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" id="toastText"></p>
      <button class="delete"></button>
    </header>
  </div>
</div>
`;

class Personalization {
  constructor(details) {

    this.details = details;
    console.log(this.details);

    // originally saved for placement on 500x500 image
    this.ratio = 350 / 500;

    this.inject();
  }

  inject() {

    const first = this.details[Object.keys(this.details)[0]];
    this.font   = first.fontGooleUrlVar;

    if($('#SR_modal_css').length === 0) {
      $('head').append(`<link href="${SR_REMOTE_URL}/remote/css/modal.css" rel="stylesheet" id="SR_modal_css">`);
    }

    $('head').append(`<link href="${GOOGLE_FONT_URL}${this.font}" rel="stylesheet">`);

    if($('#teelaunch_modals').length === 0) {
      modalTemplate = '<div id="teelaunch_modals">' + modalTemplate + '</div>';
      $('body').append(modalTemplate);
      $('#teelaunch_modals').append(toastTemplate);
    } else {
      $('#teelaunch_modals').append(modalTemplate);
      $('#teelaunch_modals').append(toastTemplate);
    }

    const $addToCart        = $('[name=add]');
    const $parent           = $addToCart.parent();
    const button_color      = $addToCart.css('color');
    const button_background = $addToCart.css('background-color');
    const font_size         = $addToCart.css('font-size');

    let buttonTemplate = $addToCart.outerHTML();

    buttonTemplate = buttonTemplate.replace(/(addToCart|AddToCart[^\"$]*)/, 'personalizeProduct');
    buttonTemplate = buttonTemplate.replace('name="add"', 'name="personalize"');
    buttonTemplate = buttonTemplate.replace('value="Add to Cart"', 'value="Personalize"');
    buttonTemplate = buttonTemplate.replace(/Add to Cart/i, 'Personalize');

    $addToCart.after(buttonTemplate);

    $('[name=personalize]').attr('id', 'personalizeProduct');

    $('#personalizeProduct').css({
      color: button_color,
      backgroundColor: button_background,
      width: '100%',
      fontSize: font_size
    }).addClass('btn');

    $addToCart.css({ display: 'none' });

    let $img           = $('#personalizationImage img');
    let variantId      = $('[name=id]').val();
    const $textZone    = $('#textZone');
    const $textInput   = $('#personalizationText');
    const $colorSelect = $('#personalizationColor');


    $colorSelect.val(first.fontColor.toLowerCase());
    $textInput.attr('data-initial-font', first.font);
    $textInput.attr('data-initial-text', first.placeholderText);
    $colorSelect.attr('data-initial-font', first.font);
    $textInput.val(first.placeholderText);
    $textInput.trigger('change');
    $colorSelect.trigger('change');

    $img.attr('src', this.details[variantId].variantImageNoTextUrl);

    let scaled_top    = this.details[variantId].textTop;
    let scaled_left   = this.details[variantId].textLeft;
    let scaled_width  = this.details[variantId].width;
    let scaled_height = this.details[variantId].height;
    let font          = this.details[variantId].font.ucwords();

    $textZone
        .css({ 'top': scaled_top + 'px'})
        .css({ 'left': scaled_left + 'px'})
        .css({ 'width': scaled_width + 'px'})
        .css({ 'height': scaled_height + 'px'})
        .css({ 'font-family': font});
  }

  openModal(variantId) {
    let $img = $('#personalizationImage img');

    let $variantTitle = $('#sunrise_variantTitle');

    const $textZone = $('#textZone');

    $img.attr('src', this.details[variantId].variantImageNoTextUrl);

    $variantTitle.text(this.details[variantId].variantTitle);

    console.log(this.details[variantId]);

    let scaled_top  = this.details[variantId].textTop * this.ratio;
    let scaled_left = this.details[variantId].textLeft * this.ratio;

    let scaled_width  = this.details[variantId].textWidth * this.ratio;
    let scaled_height = this.details[variantId].textHeight * this.ratio;

    let font = this.details[variantId].font.ucwords();

    $textZone
        .css({'top': scaled_top + 'px'})
        .css({'left': scaled_left + 'px'})
        .css({'width': scaled_width + 'px'})
        .css({'height': scaled_height + 'px'})
        .css({'font-family': font});

    $textZone.find('#textZoneImg').css({'height': scaled_height + 'px'});
  }

  static addToCart(variantId, shop) {

    let quantity = $('[name=quantity]').val();

    axios.post('/cart/add.js', {
      quantity: quantity,
      id: variantId,
      properties: {
        'Custom Text': $('#personalizationText').val(),
        'Font Color': $('#personalizationColor').val(),
      }
    }).then(response => {
      console.log(response);
      $('#sunrise_integration_modal').removeClass('is-active');
      if (response.status === 200) {
        $('#toastText').text('Product successfully added to cart!');
      } else {
        $('#toastText').text('Failed to add product to cart');
      }

      $('#sunrise_integration_toast').addClass('is-active');
      setTimeout(() => {
        $('#sunrise_integration_toast').removeClass('is-active');
      }, 2000);

      window.location = 'https://' + shop + '/cart';
    });
  }

  static resizeText() {
    const $textZone    = $('#textZone');
    const HEIGHT_RATIO = 0.9;
    let $textSpan      = $('#innerTextZone span');
    let height         = $textZone.height();
    let fontSize       = Math.round(height * HEIGHT_RATIO);

    $textSpan
        .css('font-size', fontSize + 'px')
        .css('line-height', fontSize + 'px');

    let textZoneWidth = $textZone.width();

    while ($textSpan.width() > textZoneWidth && fontSize > 0) {

      console.log(`Text Zone Width: ${textZoneWidth}px`);
      console.log(`Text Span Width: ${$textSpan.width()}px`);

      console.log(`Font size is ${fontSize}px`);
      fontSize = fontSize - 1;
      $textSpan.css('font-size', fontSize + 'px');
    }
  }

}

export default Personalization;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.ucwords = function() {
  return (this + '')
      .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
        return $1.toUpperCase()
      });
};

String.prototype.lcwords = function() {
  return (this + '')
      .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
        return $1.toLowerCase()
      });
};
