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
    $.fn.endlessScroll = function() {

        //////private variables
        var plugin        = this;
        var jqueryElement = this;

        ///////public variables
        plugin.currentlyScrolling = false;

        //Default settings
        plugin.settings = {
            pageStart      : 0,
            pageSize       : 25,
            heightBuffer   : 50,
            smartScrolling : true,
            loadingHtml    : '<div class="scrollLoading">Loading more...</div>',
            url            : "",
            data           : {},
            requestType    : "GET",
            customFunction : ""
        };


        //////Public Methods
        plugin.setup = function(userSettings) {

            plugin.settings = $.extend({}, plugin.settings, userSettings); //Merge default settings with the user settings

            enableScrolling();

            if(plugin.settings.smartScrolling == true) //Setup Smart Scrolling
            {
                //This is a "safer" version of setInterval
                function startInterval(){
                    if(plugin.currentlyScrolling == false && inScrollPosition() == true)
                        plugin.scroll();

                    window.setTimeout(startInterval, 200); //repeat the same code
                }
                startInterval();
            }
            else  //Or Setup normal scroll detection
            {
                $(window).scroll(function () {
                    if(plugin.currentlyScrolling == false && inScrollPosition() == true)
                        plugin.scroll();
                });
            }

            return this; //So jquery chaining will still work
        };

        //Where the magic happens!
        plugin.scroll = function() {

            disableScrolling();

            //If user defined a function, use that instead
            if(plugin.settings.customFunction != ""){

                plugin.settings.customFunction(plugin.settings.pageStart, getPageEnd(), plugin.settings.data); //call the function
                enableScrolling();
                incrementPage();
                return this; //So jquery chaining will still work
            }

            //Check if user is using Ajax
            if(plugin.settings.url != ""){
                //Build out the ajax data (Note: the parameters are sorted alphabetically)
                var pagingData = { pageStart: plugin.settings.pageStart, pageEnd: getPageEnd() };
                var ajaxData = $.extend(pagingData, plugin.settings.data);

                //Make the call, Ajax!
                $.ajax({
                           type: plugin.settings.requestType,
                           url : plugin.settings.url,
                           data: ajaxData,
                           success:function(data){
                               jqueryElement.append(data);
                               enableScrolling();
                               incrementPage();
                           },
                           error:function(){
                               jqueryElement.append('<div class="scrollError" style="position: fixed; bottom: 0; right: 0; font-weight: bold; font-size: 20px; border: 2px;">Error loading data.</div>');

                               var errorPopup = $('.scrollError');
                               errorPopup.fadeOut(3000);
                               setTimeout(function(){
                                   errorPopup.remove();
                               }, 3000);
                           }
                       });
            }

            return this; //So jquery chaining will still work
        };



        //////Private Methods
        var enableScrolling = function(){
            $('.scrollLoading').remove();
            jqueryElement.append('<div class="scrollActivator">&nbsp;</div>');
            plugin.currentlyScrolling = false;
        };

        var disableScrolling = function(){
            plugin.currentlyScrolling = true;
            jqueryElement.find('.scrollActivator').remove();
            jqueryElement.after(plugin.settings.loadingHtml);
        };

        var incrementPage = function() {
            plugin.settings.pageStart += plugin.settings.pageSize;
        };

        var getPageEnd = function(){
            return (plugin.settings.pageStart + plugin.settings.pageSize);
        };

        var inScrollPosition = function(){
            var pageHeight = $(window).height() + $(window).scrollTop();

            var activator       = plugin.find('.scrollActivator');

            if(typeof activator === 'undefined')
                return false;

            var activatorHeight = activator.offset().top;
            var heightBuffer    = ($(document).height() - activatorHeight) * ( (plugin.settings.heightBuffer + .001) / 100);
            var bufferedActivatorHeight = activatorHeight + heightBuffer;

            return bufferedActivatorHeight <= pageHeight && activator.is(':visible');
        };

        return this;  //So jquery chaining will still work
    };

})(jQuery);