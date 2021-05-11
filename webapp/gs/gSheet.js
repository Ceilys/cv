sap.ui.define([
], function () {
    "use strict";

    return {

        parseIndex: function (sPath) {
            return sPath.match(/\d+/)[0];
        },

        updateModel: function (oModel, oView) {
            var sSheetsUrl = "1BaRM37lx5vx-TC9xvF20MWCoCdLkKgj9uU36WoAzdsk";
            var that = this;

            this.parseSheets(sSheetsUrl, function (data) {
                data.busy = true;
                if (data.Consultant) {
                    data.header = that._convertConsultant(data.Consultant);
                    data.Consultant = "";
                }
                if (data.Activity && data.header && data.Synthesis) {
                    data.busy = false;
                }
                oModel.setData(data);
            });
        },

        _convertConsultant: function (oConsult) {
            var retHeader = {};
            for (let index = 0; index < oConsult.length; index++) {
                const element = oConsult[index];
                retHeader[element.Key] = element.Info;
            }
            return retHeader;
        },

        parseSheet: function (sKey, mSheetMeta, callback) {
            if (typeof (mSheetMeta) == "function") {
                callback = mSheetMeta;
                mSheetMeta = undefined;
            }

            var sUrl = "https://spreadsheets.google.com/feeds/cells/"
                + sKey
                + "/"
                + (!mSheetMeta ? 1 : mSheetMeta['index'])
                + "/public/values?alt=json";

            $.getJSON(sUrl, function (data) {
                var aHeaders = [];
                var mEntry = {};
                var mEntries = {};
                var aEntries = [];

                var sTitle = !mSheetMeta ? data.feed.title.$t : mSheetMeta['title'];
                var aEntriesFeed = data.feed.entry;
                var iNumOfCol = aEntriesFeed[aEntriesFeed.length - 1].gs$cell.col;

                // extract headers from the feed into array (first row)
                for (var i = 0, aHeaderFeed = {}; i < iNumOfCol; i++) {
                    aHeaderFeed = aEntriesFeed.shift().gs$cell.$t;
                    aHeaders[i] = aHeaderFeed;
                }

                // extract the entries from the feed
                while (aEntriesFeed.length > 0) {
                    for (var i = 0; i < iNumOfCol; i++) {
                        try {
                            var mEntryFeed = aEntriesFeed.shift().gs$cell;
                        }
                        catch(err){
                            break;
                        }
                        mEntry[aHeaders[i]] = mEntryFeed.$t;
                    }
                    aEntries.push(mEntry);
                    mEntry = {};
                }

                mEntries[sTitle] = aEntries;
                callback(mEntries);
            })
        },

        parseSheets: function (sKey, callback) {
            var sUrl = "https://spreadsheets.google.com/feeds/worksheets/"
                + sKey
                + "/public/full?alt=json";

            var aSheetsMeta = [];
            var mModel = {};
            var that = this;

            $.getJSON(sUrl, function (data) {
                // extract sheets meta data (index and title) into array
                var mSheetMeta = {};

                $.each(data.feed.entry, function (index, mEntry) {
                    mSheetMeta['index'] = index + 1;
                    mSheetMeta['title'] = mEntry.title.$t;
                    aSheetsMeta.push(mSheetMeta);
                    mSheetMeta = {};
                });
            }).done(function () {
                while (aSheetsMeta.length > 0) {
                    var mSheetMeta = aSheetsMeta.shift();
                    that.parseSheet(sKey, mSheetMeta, function (data) {
                        $.extend(mModel, data);
                        callback(mModel);
                    });
                }
            });
        }
    }

});