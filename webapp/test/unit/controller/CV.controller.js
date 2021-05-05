/*global QUnit*/

sap.ui.define([
	"comcv./cv/controller/CV.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CV Controller");

	QUnit.test("I should test the CV controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
