//Author: Philip Ermish
//Created: 12/7/2015
//License: GNU General Public License
// 	This program is free software: you can redistribute it and/or modify
// 	it under the terms of the GNU General Public License as published by
// 	the Free Software Foundation, either version 3 of the License, or
//	 (at your option) any later version.

// 	This program is distributed in the hope that it will be useful,
// 	but WITHOUT ANY WARRANTY; without even the implied warranty of
// 	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//	 GNU General Public License for more details.

// 	You should have received a copy of the GNU General Public License
// 	along with this program.  If not, see <http://www.gnu.org/licenses/>.


(function($) {
    $.fn.inputCloak = function(userSettings) {

        //////private variables
        var $element = this;
        var $backingElement;

        var defaults = {
            dataType: 'ssn', //ssn, credit, all
            symbol : 'star', //Options: star, dot, x
            delay: 0,
            revealOnFocus: true,
            cloakOnBlur: true,
            customCloak : undefined
        };

        ///////public variables
        $element.settings = $.extend({}, $element.settings, userSettings); //Merge default settings with the user settings
        $element._defaults = defaults;
        $element._name = 'inputCloak';

        //////Public Methods
        $element.cloak = function(value) {
            if($element.settings.customCloak){
                $element.settings.customCloak();
                return;
            }

            var symbol = $element.settings.symbol;
            var cloakedValue;

            switch($element.settings.dataType.toLowerCase()){
                case 'ssn':
                    cloakedValue = Array(3).join(symbol) +
                                       Array(2).join(symbol) +
                                       value.substr(value.length-4, 4); //***-**-1234
                    break;
                case 'credit':
                    cloakedValue = symbol + value.substr(value.length-4, 4);//*1234
                    break;
                default:
                    cloakedValue = Array(value.length).join($element.settings.symbol); //1234 -> ****
                    break;
            }

            $backingElement.val(value);
            $element.val(cloakedValue);

            return this; //So jquery chaining will still work
        };

        $element.reveal = function() {
            $element.val($backingElement.val());

            return this; //So jquery chaining will still work
        };


        //////Private Methods
        var init = function(){
            createBackingInput($element);

            $element.on('focus', function(e){
                $element.reveal(e.value);
            });

            $element.on('blur', function(e){
                setTimeout($element.cloak(e.value), $element.settings.delay);
            });
        };

        var createBackingInput = function(){
            //Create input
        };

        init();

        return this;  //So jquery chaining will still work
    };

})(jQuery);