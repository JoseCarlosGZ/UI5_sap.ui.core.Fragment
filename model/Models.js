// @ts-nocheck
sap.ui.define([
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function (JSONModel) {
        "use strict";

        return {

            instanciarMiModelo: function () {

                var oData = {
                    "resultSet": [
                        { "name": "World" },
                        { "name": "Noe"  },
                        { "name": "Pepe"  },
                        { "name": "Juan"  }
                    ]
                };

                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(oData);
                return oModel;
            }

        }
    });