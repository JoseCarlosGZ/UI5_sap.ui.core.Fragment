// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/SAPUI5/model/Models",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Models, Fragment) {
        "use strict";

        return Controller.extend("logaligroup.SAPUI5.controller.App", {

            onInit: function () {
                var oModel = Models.instanciarMiModelo();
                this.getView().setModel(oModel, "MiModelo");
            },
            onOpenDialog: function () {

                /*Para que el sap.m.Dialog que abrimos desde esta vista tenga acceso a los modelos bindeados en esta vista, así como a los métodos 
                creados en el controlador asociado a esta vista, tenemos que pasarle el objeto de esta vista. Eso lo hacemos a la hora de cargar el
                Fragment>Dialog en la sentencia oView.addDependent(oDialog) */
                const oView = this.getView();

                /*Si el Fragment no existe en esta vista (no se ha instanciado todavía ninguna vez mediante el método .load() ), entonces se crea 
                la instancia de dicho Fragment, pero si la instancia del Fragment ya ha sido creada, entonces el flujo de la app pasa al else de
                este condicional y sólo se abre el Fragment sin volver a reinstanciarlo. Un Fragment no se puede instanciar más de una vez porque 
                saltará un error de duplicidad de ids en la consola del Devtools.*/
                if (!oView.byId("id_MiDialogo")) {

                    /*Creamos la instancia del Fragment y a continuación se ejecuta la función anónima function (oDialog) la cual recibirá 
                    automáticamente la instancia del Dialog embebido en el Fragment cuya instancia se crea en el load():*/
                    sap.ui.core.Fragment.load(
                            {
                                comment_id: "id de esta vista desde la que se carga el Fragment",
                                id: oView.getId(),

                                comment_name: "path del Fragment>Dialog que queremos cargar",
                                name: "logaligroup.SAPUI5.view.MiDialogo",

                                comment_controller: "El controlador que gestionará el Dialog es este mismo en el que nos encontramos",
                                controller: this
                            }
                    ).then(
                                function (oDialog) {
                                    /*Se añaden las dependencias que tenga esta vista al propio Dialog, así por ejemplo este también tendrá acceso a los
                                     modelos seteados en la vista de este controlador.*/
                                    oView.addDependent(oDialog);
                                    oDialog.open();
                                }
                            );
                } else {
                    oView.byId("id_MiDialogo").open();
                }
            },
            onCloseDialog: function () {
                this.byId("id_MiDialogo").close();
            }
            
        });
    });
