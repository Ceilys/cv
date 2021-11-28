sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/cv/cv/gs/gSheet"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,gs) {
		"use strict";

		return Controller.extend("com.cv.cv.controller.cv", {
			onInit: function () {

				// get model
				var oCvModel = this.getOwnerComponent().getModel("cvMod");

				// convert tab global information
				var oData = oCvModel.getData();
				oData.cv = gs.getGS();   // Get Google sheet information
				oCvModel.setData(oData);

				// set information in the view
				this.getView().setModel(oCvModel, "cv");

			}
		});
	});
