/*!
inputCloak
version 12/7/2015 + mods
by Philip Ermish
license: GNU General Public License v.3 or later
*/
/*
Settings (default is shown first)
type: 'all' ('ssn','credit' or 'all'
  for display like ***-**-1234,*1234 or ****,
  irrelevant if customCloak is used)
symbol : '*' (any single-char e.g. '*',\u2022 (dot), 'x')
delay: 0 (mSec delay between blur event and cloak-application)
revealOnFocus: true (or false)
cloakOnBlur: true (or false)
customCloak : undefined (or name of callback, as
  callback(value, $element, $cloakedElement) {
    determine cloakedValue from value
    $cloakedElement.val(cloakedValue);
    $element.val(value);
  }
  )
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
                    return true;
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
                            cloakedValue = value; //wacker didn't finish
                        }
                        break;
                    case 'credit':
                        if(len > 4) {
                            cloakedValue = symbol + value.substr(len-4, 4);//*1234
                        } else {
                            cloakedValue = value; //not finished
                        }
                        break;
                    default:
                        cloakedValue = Array(len + 1).join(symbol); //1234 -> ****
                        break;
                }
    
                $cloakedElement.val(cloakedValue);
                $element.val(value);
    
                return this; //So jquery chaining will still work
            };
    
            $element.reveal = function() {
                $cloakedElement.val($element.val());
    
                return this; //So jquery chaining will still work
            };
    
    
            //////Private Methods
            var init = function(){
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
                var cloakedId = 'cloaked' + Math.floor((Math.random() * 100000000) + 1);
                $cloakedElement = $element.clone();
                $cloakedElement.attr('id','#' + cloakedId);
                $cloakedElement.removeAttr('name');
    
                $element.css( 'display', 'none' );
                $element.after($cloakedElement);
            };
    
            init();
    
            return this;  //So jquery chaining will still work
        });
    };
})(jQuery);
