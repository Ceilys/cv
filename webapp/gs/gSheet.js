sap.ui.define([
], function () {
    "use strict";

    return {

        getGS: function (vLang) {
            // 0 pour fr / 1 pour en
            let indL = 0;
            if (vLang.indexOf('fr') >= 0) {
                vLang = 'fr';
            } else {
                vLang = 'en';
                indL = 1;
            }

			// Build Object list
            var objCv = { lastName : "", firstName : "", email : "", tel : "", add : "", life : "", photo : "", 
                           resume : "", histo : "", form : "", comp : "", kw1 : "", kw2 : "",
                           skTotT : "", skTotF : "",skills : [], hist : [], histS : [], train : [] };
    
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
            objCv.life = Treturn[6].split(',')[1].split(';');
            objCv.photo = Treturn[5].split(',')[1]; 
            objCv.title = Treturn[7].split(',')[1 + indL]; 
            objCv.resume = Treturn[8].split(',')[1 + indL].toString().replaceAll('"',''); 
            objCv.histo = Treturn[9].split(',')[1 + indL]; 
            objCv.form = Treturn[10].split(',')[1 + indL]; 
            objCv.comp = Treturn[11].split(',')[1 + indL]; 
            objCv.kw1 = Treturn[12].split(',')[1 + indL]; 
            objCv.kw2 = Treturn[13].split(',')[1 + indL]; 

            // Get skills
            objCv.skills = [];           
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", urlSkill, false );
			xmlHttp.send( null );
			Treturn = xmlHttp.responseText.split('\r\n');
            for (let index = 0, oline = { cat : "", typ : "" ,kw : "" }; index < Treturn.length; index++) {
                const eline = Treturn[index].split(',');
                oline.cat = eline[0];
                oline.typ = eline[1 + indL];
                oline.kw = eline[3];
                oline.perc = parseFloat(eline[4]);
                objCv.skills.push($.extend({},oline));
                if (oline.cat === 'Technique')  objCv.skTotT++;
                if (oline.cat === 'Fonctionnel')  objCv.skTotF++;
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
                oline.Detail = oline.Detail.toString().replaceAll('"','');
                oline.Detail = "\n" + oline.Detail.toString().replaceAll(',','\n');
                oline.KW = eline[7].split(';');
                if (eline[9].toString().replaceAll('"','') !== "") {
                    oline.duration = eline[8].toString().replaceAll('"','') + ',' + eline[9].toString().replaceAll('"','');
                } else {
                    oline.duration = eline[8].toString().replaceAll('"','');
                }
                

                if (vLang === oline.Lang) {
                    objCv.hist.push($.extend({},oline));
                }
            }
            objCv.histS = objCv.hist; // Save historical for future filters

            
            // Get Training
            objCv.train = [];           
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open( "GET", urlTrain, false );
			xmlHttp.send( null );
			Treturn = xmlHttp.responseText.split('\r\n');
            for (let index = 0, oline = { year : "", training : "" }; index < Treturn.length; index++) {
                const eline = Treturn[index].split(',');
                oline.year = eline[0];
                oline.training = eline[1 + indL];
                objCv.train.push($.extend({},oline));
            }

            return objCv;
        }

    }

});