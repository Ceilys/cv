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
			var oMainModel = this.getOwnerComponent().getModel("cvMod");

			// set information in the view
			var oview = this.getView();
			oview.setModel(oMainModel);

			}
		});
	});
