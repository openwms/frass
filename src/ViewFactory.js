/**
 *
 */
define(
[
    '_libs/ractive/ractive.min',
    'common/repository/ServiceRepository'
],
function (Ractive, ServiceRepository)
{
    "use strict";

    /**
     * Services which we need
     */
    var i18n = ServiceRepository.get("i18n");


    /**
     * All instances of template engine has this function as default.
     */
    Ractive.defaults.data.i18n = i18n;



    /**
     * This module is the responsible for creating template views
     * @module common/ViewFactory
     * @type {{create: Function}}
     */
    var module = 
    {

        /**
         * @param pContainer
         * @param pTemplateSource
         * @param pData
         * @param pCallback
         */
        create: function(pContainer, pTemplateSource, pData, pCallback)
        {
            require(['_libs/requirejs-text/text!domain/' + pTemplateSource],
                function (pTemplate) {
                    module.createByText(pContainer, pTemplate, pData, pCallback);
                }
            );
        },

        createByLoading: function(pContainer, pTemplateSource, pData, pCallback){
            $.ajax({url: pTemplateSource}).done(function(pTemplate){
                module.createByText(pContainer, pTemplate, pData, pCallback);
            });
        },

        createByText: function(pContainer, pTemplate, pData, pCallback)
        {
            var ractive =
                new Ractive({
                    el: pContainer,
                    template: pTemplate,
                    data: pData ? pData : {},
                    lazy: true
                });

            pCallback(ractive);
        }
    };


    return module;
}); 