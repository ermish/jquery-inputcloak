/*!
 inputCloak
 version 12/7/2015 + mods
 by Philip Ermish
 license: GNU General Public License v.3 or later
 */

(function($) {
    $.fn.inputCloak = function(userSettings) {
        return this.each(function() {
            //////private variables
            var $element = $(this);
            var $cloakedElement;

            var defaults = {
                type: 'all', //ssn, credit, all
                symbol : '*', //Options: *, \u2022 (dot), x
                delay: 0,
                revealOnFocus: true,
                cloakOnBlur: true,
                customCloak : undefined
            };

            ///////public variables
            $element.settings = $.extend({}, defaults, userSettings); //Merge default settings with the user settings
            $element._defaults = defaults;
            $element._name = 'inputCloak';

            //////Public Methods
            $element.cloak = function(value) {
                if($element.settings.customCloak){
                    $element.settings.customCloak(value, $element, $cloakedElement);
                    return this;
                }

                var symbol = $element.settings.symbol,
                    len = value.length,
                    cloakedValue;

                switch($element.settings.type.toLowerCase()){
                    case 'ssn':
                        if(len > 4) {
                            cloakedValue = Array(3 + 1).join(symbol) + '-' +
                                Array(2 + 1).join(symbol) + '-' +
                                value.substr(len-4, 4); //***-**-1234
                        } else {
                            cloakedValue = value; //user hasn't finished
                        }
                        break;
                    case 'credit':
                        if(len > 4) {
                            cloakedValue = symbol + value.substr(len-4, 4);//*1234
                        } else {
                            cloakedValue = value; //user hasn't finished
                        }
                        break;
                    default:
                        cloakedValue = Array(len + 1).join(symbol); //1234 -> ****
                        break;
                }

                $cloakedElement.val(cloakedValue, true);
                $element.val(value, true);

                return this; //So jquery chaining will still work
            };

            $element.reveal = function() {
                $cloakedElement.val($element.val(), true);

                return this; //So jquery chaining will still work
            };


            //////Private Methods
            var init = function(){
                if($element.attr('data-cloaked-id')){
                    return;
                }

                createCloakedElement($element);

                $cloakedElement.on('focus', function(e){
                    $element.reveal(e.currentTarget.value);
                });

                $cloakedElement.on('blur', function(e){
                    setTimeout(function(){
                        $element.cloak(e.currentTarget.value);
                    }, $element.settings.delay);
                });

                //start as cloaked
                $element.cloak($element.val());
            };

            var createCloakedElement = function(){
                var newDataId = Math.floor((Math.random() * 100000000) + 1);
                $element.attr('data-cloaked-id', newDataId);
                $cloakedElement = $element.clone();

                $cloakedElement.attr('data-cloaked-for', newDataId);
                $cloakedElement.removeAttr('name');

                $element.css( 'display', 'none' );
                $element.after($cloakedElement);
            };

            init();

            return this;  //So jquery chaining will still work
        });
    };
})(jQuery);
