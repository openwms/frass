
    import radio from 'radio';
    import ControllerRepository from './repository/ControllerRepository';




    /** Privates */
    function extractControllerName(pTopic){
        return pTopic.split('.')[1];
    }




    /**
     * This module is the responsible for managing events
     */
    var module =
    {
        subscribe: function(pTopic, pObserver){
            radio(pTopic).subscribe(pObserver);
        },

        broadcast: function (pTopic, pData){
            if( pTopic[0] === "*" ){
                radio(pTopic).broadcast(pData);
            }
            else {
                ControllerRepository.get(extractControllerName(pTopic), function () {
                    radio(pTopic).broadcast(pData);
                });
            }
        }
    };



    export default module;