    //              // source URL                                     // resulting url
    // amazon       // http://www.amazon.com/?tag=sniggleme-20
    // amazon       // http://www.amazon.co.uk/?tag=sniggleme02-21
    // amazon       // http://www.amazon.de/?tag=sniggleme-21
	// amazon		// http://www.amazon.es/?tag=sniggleme01-21
	// amazon		// http://www.amazon.it/?tag=sniggleme0a6-21
	// amazon		// http://www.amazon.fr/?tag=sniggleme00-21

    var configurations = {
        amazon : {
            rx: /^http.*?\.amazon.com.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
            params: [
                { param: "tag", paramValue: "sniggleme-20" }
            ]
        },
        amazonuk : {
            rx: /^http.*?\.amazon.co.uk.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
            params: [
                { param: "tag", paramValue: "sniggleme02-21" }
            ]
        },
        amazonde : {
            rx: /^http.*?\.amazon.de.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
            params: [
                { param: "tag", paramValue: "sniggleme-21" }
            ]
        },
        amazones : {
            rx: /^http.*?\.amazon.es.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
            params: [
                { param: "tag", paramValue: "sniggleme01-21" }
            ]
        },
        amazonfr : { 
            rx: /^http.*?\.amazon.fr.*?(\/dp\/|obidos.tg.detail|.gp.product)/i, 
            params: [
                { param: "tag", paramValue: "sniggleme00-21" }
            ]
        },
        amazonit : { 
            rx: /^http.*?\.amazon.it.*?(\/dp\/|obidos.tg.detail|.gp.product)/i, 
            params: [
                { param: "tag", paramValue: "sniggleme0a6-21" }
            ]
        }
    };
    
    function addTag(info) {
        var tUrl = info.url;
        var r = { cancel: false };
        
        console.log("Inside addTag() "); 
        
        for( var config in configurations ) { 
          if( configurations.hasOwnProperty(config) ) {
            if ( tUrl.match(configurations[config].rx) ) { 
                if (tUrl.indexOf(configurations[config].params[0].param+ "=") == -1 ) {    
                  r = { redirectUrl: tUrl+(tUrl.indexOf("?") == -1 ? "?" : "&")+ createTag(configurations[config].params) };
                  // A supported site was found
                  // get the current window
                  chrome.windows.getCurrent(function (currentWindow) {
    				// get the selected tab inside the current window
    				chrome.tabs.query({active: true, windowId: currentWindow.id}, function(tabs) {
    					chrome.pageAction.show(tabs[0].id);
    				 });
    			  });
                  break;
                } 
              }
          }
        }
        
        return r;
    }

    function createTag(params) {
        var result = "";
        for( var i=0; i < params.length; i++ ) {
            if(i > 0) {
                result = result + "&";
            }
            result = result + params[i].param + "=" + params[i].paramValue;
        }
        return result;
    }

  
  if (!chrome.webRequest.onBeforeRequest.hasListener(addTag)) {   
//    var site_urls = []; 
//    for (x in sites) { 
//      site_urls.push("*://*."+sites[x].url+"/*");
//    }
    
   var site_urls = [ 
            "http://*.amazon.com/*/dp/*",
            "http://*.amazon.com/dp/*",
            "http://*.amazon.com/exec/obidos/tg/detail/*",
            "http://*.amazon.com/gp/product/*",
            "http://*.amazon.com/o/*",
            "http://*.amazon.co.uk/*/dp/*",
            "http://*.amazon.co.uk/dp/*",
            "http://*.amazon.co.uk/exec/obidos/tg/detail/*",
            "http://*.amazon.co.uk/gp/product/*",
            "http://*.amazon.co.uk/o/*",
            "http://*.amazon.de/*/dp/*",
            "http://*.amazon.de/dp/*",
            "http://*.amazon.de/exec/obidos/tg/detail/*",
            "http://*.amazon.de/gp/product/*",
            "http://*.amazon.de/o/*",
            "http://*.amazon.es/*/dp/*",
            "http://*.amazon.es/dp/*",
            "http://*.amazon.es/exec/obidos/tg/detail/*",
            "http://*.amazon.es/gp/product/*",
            "http://*.amazon.es/o/*",
            "http://*.amazon.it/*/dp/*",
            "http://*.amazon.it/dp/*",
            "http://*.amazon.it/exec/obidos/tg/detail/*",
            "http://*.amazon.it/gp/product/*",
            "http://*.amazon.it/o/*",
            "http://*.amazon.fr/*/dp/*",
            "http://*.amazon.fr/dp/*",
            "http://*.amazon.fr/exec/obidos/tg/detail/*",
            "http://*.amazon.fr/gp/product/*",
            "http://*.amazon.fr/o/*"
    ];
  
    chrome.webRequest.onBeforeRequest.addListener(addTag, { urls: site_urls }, [ "blocking" ]); 
  }