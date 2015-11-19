angular.module('pelorus')
    .provider('appModules', [
        function appModulesProvider () {

            var configuration = {
                loaded: false
            };

            this.setConfiguration = function setConfiguration (conf) {
                console.log('this happens', conf);
                angular.extend(configuration, conf);

                // Mark config 'loaded'
                configuration.loaded = true;

            };

            this.$get = function $get () {
                  return configuration;
            };

        }
    ]);
