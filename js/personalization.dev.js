const bulma_url = 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css';
const remote_url = 'https://apps.sunriseintegration.com/a/teelaunch/remote';

import axios from 'axios';
import Personalization from './classes/Personalization.js';

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

            if(response.status === 200) {
                Personalizer = new Personalization(response.data);
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

        $(document).on('click', 'button.delete', function(e) {
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