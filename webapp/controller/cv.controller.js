sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("com.cv.cv.controller.CV", {
			onInit: function () {

				// get model
				var oCvModel = this.getOwnerComponent().getModel("cvMod");

				// convert tab global information
				var oData = oCvModel.getData();
				//oData.header = this._convertConsultant(oData.Consultant);
				oCvModel.setData(oData);

				// set information in the view
				this.getView().setModel(oCvModel, "cv");
			},
		});
	});
