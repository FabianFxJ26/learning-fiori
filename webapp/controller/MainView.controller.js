sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param{typeof sap.ui.model.FilterOperator}
     */
    function (Controller, Filter, FilterOperator) {
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
                oView.setModel(oJSONModel, "selectionScreen");
                //Otra forma
                //this.getView().setModel(oJSONModel,"selectionScreen");
            },
            onFilter: function (oEvent) {
                const oData = this.getView().getModel("selectionScreen").getData();
                let filters = [];
                //Si en el campo de la interfaz Ship name es diferente a vacio dato que trae del archivo
                //modelo SelectionScreenMenu.json
                if (oData.ShipName !== "") {
                    //Agrega al array de filtro si contiene al menos una parte de la cadena ingresada
                    //Por ejemplo: Alfred's Futterkiste (Shipname) es suficiente si filtra por Alf
                    filters.push(new Filter("ShipName", FilterOperator.Contains, oData.ShipName));
                }
                //Si en el campo de la interfaz Country es diferente a vacio dato que trae del archivo
                //modelo SelectionScreenMenu.json
                //El pais debe ser ES equals igual.
                if (oData.CountryKey !== "") {
                    filters.push(new Filter("Country", FilterOperator.EQ, oData.CountryKey));
                }
                //Obtengo la lista de la interfaz por su id = invoicesList
                const objectList = this.getView().byId("invoicesList");
                //Obtengo los bindin (vinculacion) de la lista object list items="{/Invoices}"
                const oBinding = objectList.getBinding("items");
                //Llamo la funcion filter y le paso el filtro (let filters = [];) construido anteriormente
                oBinding.filter(filters);
            },
            //MetodO que me permite limpiar filtros cuando se selecciona uno.
            onClearFilter: function () {
                const oModelSelectionScreen = this.getView().getModel("selectionScreen");
                //Capturo el ship name de mi modelo SelecionScreenMenu y la seteo cmo vacio"",
                //como es un input le asigno value="{selectionScreen>/ShipName}"
                oModelSelectionScreen.setProperty("/ShipName", "");
                //Capturo el Country key de mi modelo SelecionScreenMenu y la seteo como vacio ""
                oModelSelectionScreen.setProperty("/CountryKey", "");
                //Obtengo la lista de la interfaz por su id = invoicesList
                const objectList = this.getView().byId("invoicesList");
                //Obtengo los bindin (vinculacion) de la lista object list items="{/Invoices}"
                const oBinding = objectList.getBinding("items");
                //Llamo la funcion filter y le paso el filtro (let filters = [];) construido anteriormente
                oBinding.filter([]);
            }
        });
    });
