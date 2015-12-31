/*!
inputCloak
version 0.1.0
by Philip Ermish
license: Apache v.2 or GNU General Public License v.3 or later
*/
/*
Assumes one-byte-encoded characters in the password

Settings (default is shown first)
type: 'all' ('ssn' shows ***-**-1234,
 'credit' shows *1234
 'see4' shows last 4 chars ******1234
 'see1' shows last 1 char ******4 
 'all' shows none *******,
 irrelevant if customCloak is used)
symbol: '*' (any single-char e.g. '*',\u2022 (dot), 'x')
delay: 0 (mSec delay between blur event and cloak-application)
revealOnFocus: true (or false)
cloakOnBlur: true (or false)
customCloak: undefined (or name of callback, as
  callback(value, $element, $cloakedElement) {
    var cloakedValue = func(value);
    $cloakedElement.val(cloakedValue);
  }
  )

API
properties added to each selected element
.settings = object containing default parameters as modified by initiating application
._defaults = object containing default parameters
._name = constant name of this plugin
methods added to each selected element
.cloak(value)
.reveal()
*/

(function($) {
"$:nomunge"; //yuicompressor directive
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
                    $element.val(value);
                    return this; //So jquery chaining will still work
                }
    
                var symbol = $element.settings.symbol,
                len = value.length,
                cloakedValue;
    
                switch($element.settings.type.toLowerCase()){
                    case 'ssn':
                        if(len > 4) {
                            var first = value.substr(0, len-4),
                                flen = first.length;
                            if(flen < 3) {
                                cloakedValue = Array(flen + 1).join(symbol);
                            } else {
                                cloakedValue = Array(3 + 1).join(symbol) + '-';
                                if(flen >= 5) {
                                    cloakedValue += Array(2 + 1).join(symbol) + '-';
                                } else {
                                    cloakedValue += Array(flen - 3 + 1).join(symbol);
                                }
                            }
                            cloakedValue += value.substr(len-4, 4);//***-**-1234
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
                    case 'see4':
                        if(len > 4) {
                            cloakedValue = Array(len - 4 + 1).join(symbol) + value.substr(len-4,4);//****1234
                        } else {
                            cloakedValue = value;
                        }
                        break;
                    case 'see1':
                        if(len > 1) {
                            cloakedValue = Array(len).join(symbol) + value.substr(len-1,1);//****4
                        } else {
                            cloakedValue = '';
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
