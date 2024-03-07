sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        //Vemos en consola los errores
        "use strict";
        //Prototipado, y pasamos un objeto tipo json.
        return Controller.extend("learningfiori.invoices.controller.MainView", {
            onInit: function () {
                const oJSONModel = new sap.ui.model.json.JSONModel();
                //Enlazar json model con la vista
                const oView = this.getView();
                //Cargo la data definida en el archivo json
                oJSONModel.loadData("../model/SelectionScreenMenu.json");
                oView.setModel(oJSONModel,"selectionScreen");
                //Otra forma
                //this.getView().setModel(oJSONModel,"selectionScreen");
            }
        });
    });
