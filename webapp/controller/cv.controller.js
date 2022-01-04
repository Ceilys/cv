sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/cv/cv/gs/gSheet"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, gs) {
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

			},

			onTechnPress: function (oEvent) {
				// Filter
				var vfilter = [];

				// Case of selection change
				if (oEvent.getId() === 'selectionChange' && this.byId("bu-tech").getType() === 'Default') {
					return; // No action if filter is not selected
				}

				// Check if filter on functionnal
				if (this.byId("bu-fct").getType() === 'Emphasized') {
					vfilter.push(this.byId("sb-fct").getSelectedKey());
				}

				// Add filter if selected or on change of selection
				if (this.byId("bu-tech").getType() === 'Default' || oEvent.getId() === 'selectionChange') {
					this.byId("bu-tech").setType('Emphasized');
					vfilter.push(this.byId("sb-tech").getSelectedKey());

					this._restrictHistory(vfilter);
				}

				// Unfilter
				else {
					this.byId("bu-tech").setType('Default');
					this._restrictHistory(vfilter);
				}
			},

			onFctPress: function (oEvent) {
				// Filter
				var vfilter = [];

				// Case of selection change
				if (oEvent.getId() === 'selectionChange' && this.byId("bu-fct").getType() === 'Default') {
					return; // No action if filter is not selected
				}

				// Check if filter on functionnal
				if (this.byId("bu-tech").getType() === 'Emphasized') {
					vfilter.push(this.byId("sb-tech").getSelectedKey());
				}

				// Add filter if selected or on change of selection
				if (this.byId("bu-fct").getType() === 'Default' || oEvent.getId() === 'selectionChange') {
					this.byId("bu-fct").setType('Emphasized');
					vfilter.push(this.byId("sb-fct").getSelectedKey());

					this._restrictHistory(vfilter);
				}

				// Unfilter
				else {
					this.byId("bu-fct").setType('Default');
					this._restrictHistory(vfilter);
				}
			},

			_restrictHistory: function (vSelected) {
				// We're looking on history if we found the keywords
				var oCvModel = this.getOwnerComponent().getModel("cvMod");
				var oData = oCvModel.getData();

				if (vSelected.length === 0) {
					// empty table => reset to history
					oData.cv.hist = oData.cv.histS;
				} else {
					// Check keywords
					oData.cv.hist = [];
					for (let index = 0, found = 0; index < oData.cv.histS.length; index++) {
						const ekw = oData.cv.histS[index].KW;
						found = 0;
						for (let j = 0; j < vSelected.length; j++) {
							const eSel = vSelected[j];
							if (ekw.indexOf(eSel) >= 0) {
								found++;
							}
						}
						// It's necessary that the 2 filters are cumulative
						if (found === vSelected.length) {
							oData.cv.hist.push(oData.cv.histS[index]);
						}
					}
				}
				oCvModel.setData(oData);
			}
		});
	});
