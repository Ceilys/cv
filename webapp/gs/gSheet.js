sap.ui.define([
], function () {
    "use strict";

    return {

        getGS: function () {
			// Build Object list
            var objCv = { lastName : "", firstName : "", email : "", tel : "", add : "", life : "", skills : [], hist : [], train : [] };

			// XMLHttpRequest
			var urlIdent = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCVKJQhLDUBeZL3Rl6Y-V5eyloLleJNUVz4dRTvsJ47jXl8CyRW5DhCxNuv0oxfQxZ5vY0t3TKa-Zz/pub?gid=0&single=true&output=csv";
            var urlHist = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCVKJQhLDUBeZL3Rl6Y-V5eyloLleJNUVz4dRTvsJ47jXl8CyRW5DhCxNuv0oxfQxZ5vY0t3TKa-Zz/pub?gid=672234878&single=true&output=csv"
			var urlTrain = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCVKJQhLDUBeZL3Rl6Y-V5eyloLleJNUVz4dRTvsJ47jXl8CyRW5DhCxNuv0oxfQxZ5vY0t3TKa-Zz/pub?gid=600468264&single=true&output=csv"
            var urlSkill = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQCVKJQhLDUBeZL3Rl6Y-V5eyloLleJNUVz4dRTvsJ47jXl8CyRW5DhCxNuv0oxfQxZ5vY0t3TKa-Zz/pub?gid=1521485011&single=true&output=csv"

            // Get identity
            var xmlHttp = null;
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", urlIdent, false );
			xmlHttp.send( null );
			var Treturn = xmlHttp.responseText.split('\r\n');
            objCv.lastName = Treturn[0].split(',')[1];
            objCv.firstName = Treturn[1].split(',')[1];
            objCv.email = Treturn[2].split(',')[1]; 
            objCv.tel = Treturn[3].split(',')[1];  
            objCv.add = Treturn[4].split(',')[1]; 
            objCv.life = Treturn[5].split(',')[1].split(';');

            // Get skills
            objCv.skills = [];           
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", urlSkill, false );
			xmlHttp.send( null );
			Treturn = xmlHttp.responseText.split('\r\n');
            for (let index = 0, oline = { cat : "", typ : "" ,kw : "" }; index < Treturn.length; index++) {
                const eline = Treturn[index].split(',');
                oline.cat = eline[0];
                oline.typ = eline[1];
                oline.kw = eline[2];
                objCv.skills.push($.extend({},oline));
            }

            // Get Historical
            objCv.hist = [];           
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", urlHist, false );
			xmlHttp.send( null );
			Treturn = xmlHttp.responseText.split('EOL\r\n');
            for (let index = 1, oline = { dtDeb : "", dtEnd : "" ,company : "", Logo : "", Lang : "", Role : "", Detail : "", KW : "", duration : "" }; index < Treturn.length; index++) {
                const eline = Treturn[index].split(',');
                oline.dtDeb = eline[0];
                oline.dtEnd = eline[1];
                oline.company = eline[2];
                oline.Logo = eline[3];
                oline.Lang = eline[4];
                oline.Role = eline[5];
                oline.Detail = eline[6].split('\n');
                oline.KW = eline[7].split(';');
                oline.duration = eline[8];
                objCv.hist.push($.extend({},oline));
            }

            
            // Get Training
            objCv.train = [];           
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", urlTrain, false );
			xmlHttp.send( null );
			Treturn = xmlHttp.responseText.split('\r\n');
            for (let index = 0, oline = { year : "", training : "" }; index < Treturn.length; index++) {
                const eline = Treturn[index].split(',');
                oline.year = eline[0];
                oline.training = eline[1];
                objCv.train.push($.extend({},oline));
            }

            return objCv;
        }

    }

});