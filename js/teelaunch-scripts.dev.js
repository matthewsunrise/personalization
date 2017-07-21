const bulma_url =
  'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css';
const sr_remote_url = 'https://apps.sunriseintegration.com/a/teelaunch';

import axios from 'axios';
import Personalization from './classes/Personalization.js';
import Sizing from './classes/Sizing.js';

let Personalizer;
let SizingChart;

($ => {
  console.log(meta);

  if (
    typeof __st.p !== 'undefined' &&
    __st.p === 'product' &&
    __st.rid > 0 &&
    meta.product.vendor === 'teelaunch'
  ) {
    let shop_url = __st.pageurl;
    shop_url = shop_url.substr(0, shop_url.indexOf('/'));

    const $modal = $('#sunrise_integration_modal');
    const skus = [];

    if (meta.product.variants.length > 0) {
      meta.product.variants.forEach(cur => {
        if (skus.indexOf(cur.sku) === -1) {
          skus.push(cur.sku);
        }
      });
    }

    if ($modal.length === 0) {
      let product_check = axios.get(sr_remote_url + '/remote/ajax.php', {
        params: {
          action: 'getProduct',
          product_id: __st.rid,
          shop: shop_url,
          sku: skus
        }
      });

      product_check.then(response => {
        console.log(response.data);

        if (response.status === 200) {
          if (typeof response.data.sizing !== 'undefined') {
            console.log(response.data.sizing);
            SizingChart = new Sizing(response.data.sizing);
          }

          if (typeof response.data.personalization !== 'undefined') {
            Personalizer = new Personalization(response.data.personalization);
          }
        }
      });
    }
  }

  $(() => {
    // sizing event listeners

    $(document).on('change', '#sizingProduct', e => {
      SizingChart.setActiveProduct(e.target.value);
      SizingChart.setSizingImage();
      SizingChart.renderHeaders();
      SizingChart.renderRows();
    });

    $(document).on('change', '#sizingUnit', e => {
      SizingChart.setUnit(SizingChart.activeProduct.units[e.target.value]);
      SizingChart.renderHeaders();
      SizingChart.renderRows();
    });

    $(document).on('click', '#sizingChart', e => {
      e.preventDefault();

      let variant_id = $('[name=id]').val();
      let sku = meta.product.variants.find(variant => variant.id == variant_id)
        .sku;

      if (typeof SizingChart !== 'undefined') SizingChart.openModal(sku);

      $('#sunrise_integration_sizing_modal').addClass('is-active');
    });

    // personalization event listeners
    $(document).on('click', '#personalizeProduct', e => {
      e.preventDefault();

      let variant_id = $('[name=id]').val();

      if (typeof Personalizer !== 'undefined')
        Personalizer.openModal(variant_id);

      $('#sunrise_integration_modal').addClass('is-active');
    });

    $(document).on('change paste keyup', '#personalizationText', function(e) {
      let personalized_text = encodeURIComponent($(this).val())
        .replace(/'/g, '%27')
        .replace(/\(/, '%28')
        .replace(/\)/, '%29')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E');
      let color = encodeURIComponent($('#personalizationColor').val());
      let variant_id = encodeURIComponent($('[name=id]').val());
      let font = encodeURIComponent($(this).data('initial-font'));

      if (typeof Personalizer !== 'undefined') {
        font = encodeURIComponent(Personalizer.details[variant_id].font);
      }

      if ($(this).val().length === 0) {
        personalized_text = Personalizer.details[variant_id].placeholderText;
        console.log(personalized_text);
        $('.button-add-to-cart').attr('disabled', 'disabled');
      } else {
        $('.button-add-to-cart').removeAttr('disabled');
      }

      let dynamic_img_url = `${sr_remote_url}/images/font-preview-img.php?size=100&text=${personalized_text}&color=${color}&font=${font}`;

      $('#textZoneImg').css({
        'background-image': 'url(' + dynamic_img_url + ')'
      });

      Personalization.resizeText();
    });

    $(document).on('change', '#personalizationColor', function(e) {
      let personalized_text = encodeURI($('#personalizationText').val());
      let color = $(this).val();
      let variant_id = $('[name=id]').val();
      let font = $(this).data('initial-font');

      if (typeof Personalizer !== 'undefined') {
        font = Personalizer.details[variant_id].font;
      }

      let dynamic_img_url = `${sr_remote_url}/images/font-preview-img.php?size=100&text=${personalized_text}&color=${color}&font=${font}`;

      $('#textZoneImg').css({
        'background-image': 'url(' + dynamic_img_url + ')'
      });
      $('#personalizationText').trigger('change');
      $('#textZone').css('color', $(this).val());
    });

    $(document).on('click', '.button.button-cancel', function(e) {
      e.preventDefault();

      $(this).parent().parent().parent().removeClass('is-active');
    });

    $(document).on('click', '.button.button-add-to-cart', function(e) {
      e.preventDefault();

      const val = $('[name=id]').val();
      Personalization.addToCart(val, Shopify.shop);
    });

    $(document).on('click', 'button.delete', function(e) {
      e.preventDefault();

      $(this).parent().parent().parent().removeClass('is-active');
    });

    $(document).on('change', 'select,input', function(e) {
      if ($('#addToCart').prop('disabled')) {
        $('#personalizeProduct')
          .prop('disabled', true)
          .text('Unavailable')
          .val('Unavailable');
      } else {
        $('#personalizeProduct')
          .prop('disabled', false)
          .text('Personalize')
          .val('Personalize');
      }
    });
  });

  // extend jQuery to allow for grabbing the outer html of an element
  $.fn.outerHTML = function(s) {
    return s
      ? this.before(s).remove()
      : $('<p>').append(this.eq(0).clone()).html();
  };
})(jQuery);
