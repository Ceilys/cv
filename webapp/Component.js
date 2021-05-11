sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/cv/cv/model/models",
	"com/cv/cv/gs/gSheet"
], function (UIComponent, Device, models, gs) {
	"use strict";

	return UIComponent.extend("com.cv.cv.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.createViewModel(), "cvMod");

			// create root view // CHRIS
			var oModel = this.getModel("cvMod");

			//oView.setModel(oI18nModel, "i18n");
			gs.updateModel(oModel); // CHRIS end
			this.setModel(oModel, "cvMod");
		}
	});
});
