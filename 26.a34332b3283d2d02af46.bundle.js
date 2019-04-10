(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{1025:function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
!function defineMustache(global,factory){exports&&"string"!=typeof exports.nodeName?factory(exports):(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],void 0===(__WEBPACK_AMD_DEFINE_RESULT__="function"==typeof(__WEBPACK_AMD_DEFINE_FACTORY__=factory)?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__)||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))}(0,function mustacheFactory(mustache){var objectToString=Object.prototype.toString,isArray=Array.isArray||function isArrayPolyfill(object){return"[object Array]"===objectToString.call(object)};function isFunction(object){return"function"==typeof object}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return null!=obj&&"object"==typeof obj&&propName in obj}var regExpTest=RegExp.prototype.test;var nonSpaceRe=/\S/;function isWhitespace(string){return!function testRegExp(re,string){return regExpTest.call(re,string)}(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};var whiteRe=/\s*/,spaceRe=/\s+/,equalsRe=/\s*=/,curlyRe=/\s*\}/,tagRe=/#|\^|\/|>|\{|&|=|!/;function Scanner(string){this.string=string,this.tail=string,this.pos=0}function Context(view,parentContext){this.view=view,this.cache={".":this.view},this.parent=parentContext}function Writer(){this.cache={}}Scanner.prototype.eos=function eos(){return""===this.tail},Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||0!==match.index)return"";var string=match[0];return this.tail=this.tail.substring(string.length),this.pos+=string.length,string},Scanner.prototype.scanUntil=function scanUntil(re){var match,index=this.tail.search(re);switch(index){case-1:match=this.tail,this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index),this.tail=this.tail.substring(index)}return this.pos+=match.length,match},Context.prototype.push=function push(view){return new Context(view,this)},Context.prototype.lookup=function lookup(name){var value,primitive,propName,cache=this.cache;if(cache.hasOwnProperty(name))value=cache[name];else{for(var intermediateValue,names,index,context=this,lookupHit=!1;context;){if(name.indexOf(".")>0)for(intermediateValue=context.view,names=name.split("."),index=0;null!=intermediateValue&&index<names.length;)index===names.length-1&&(lookupHit=hasProperty(intermediateValue,names[index])||(primitive=intermediateValue,propName=names[index],null!=primitive&&"object"!=typeof primitive&&primitive.hasOwnProperty&&primitive.hasOwnProperty(propName))),intermediateValue=intermediateValue[names[index++]];else intermediateValue=context.view[name],lookupHit=hasProperty(context.view,name);if(lookupHit){value=intermediateValue;break}context=context.parent}cache[name]=value}return isFunction(value)&&(value=value.call(this.view)),value},Writer.prototype.clearCache=function clearCache(){this.cache={}},Writer.prototype.parse=function parse(template,tags){var cache=this.cache,cacheKey=template+":"+(tags||mustache.tags).join(":"),tokens=cache[cacheKey];return null==tokens&&(tokens=cache[cacheKey]=function parseTemplate(template,tags){if(!template)return[];var openingTagRe,closingTagRe,closingCurlyRe,sections=[],tokens=[],spaces=[],hasTag=!1,nonSpace=!1;function stripSpace(){if(hasTag&&!nonSpace)for(;spaces.length;)delete tokens[spaces.pop()];else spaces=[];hasTag=!1,nonSpace=!1}function compileTags(tagsToCompile){if("string"==typeof tagsToCompile&&(tagsToCompile=tagsToCompile.split(spaceRe,2)),!isArray(tagsToCompile)||2!==tagsToCompile.length)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*"),closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1])),closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);for(var start,type,value,chr,token,openSection,scanner=new Scanner(template);!scanner.eos();){if(start=scanner.pos,value=scanner.scanUntil(openingTagRe))for(var i=0,valueLength=value.length;i<valueLength;++i)isWhitespace(chr=value.charAt(i))?spaces.push(tokens.length):nonSpace=!0,tokens.push(["text",chr,start,start+1]),start+=1,"\n"===chr&&stripSpace();if(!scanner.scan(openingTagRe))break;if(hasTag=!0,type=scanner.scan(tagRe)||"name",scanner.scan(whiteRe),"="===type?(value=scanner.scanUntil(equalsRe),scanner.scan(equalsRe),scanner.scanUntil(closingTagRe)):"{"===type?(value=scanner.scanUntil(closingCurlyRe),scanner.scan(curlyRe),scanner.scanUntil(closingTagRe),type="&"):value=scanner.scanUntil(closingTagRe),!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);if(token=[type,value,start,scanner.pos],tokens.push(token),"#"===type||"^"===type)sections.push(token);else if("/"===type){if(!(openSection=sections.pop()))throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else"name"===type||"{"===type||"&"===type?nonSpace=!0:"="===type&&compileTags(value)}if(openSection=sections.pop())throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return function nestTokens(tokens){for(var token,nestedTokens=[],collector=nestedTokens,sections=[],i=0,numTokens=tokens.length;i<numTokens;++i)switch((token=tokens[i])[0]){case"#":case"^":collector.push(token),sections.push(token),collector=token[4]=[];break;case"/":sections.pop()[5]=token[2],collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}return nestedTokens}(function squashTokens(tokens){for(var token,lastToken,squashedTokens=[],i=0,numTokens=tokens.length;i<numTokens;++i)(token=tokens[i])&&("text"===token[0]&&lastToken&&"text"===lastToken[0]?(lastToken[1]+=token[1],lastToken[3]=token[3]):(squashedTokens.push(token),lastToken=token));return squashedTokens}(tokens))}(template,tags)),tokens},Writer.prototype.render=function render(template,view,partials,tags){var tokens=this.parse(template,tags),context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template,tags)},Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate,tags){for(var token,symbol,value,buffer="",i=0,numTokens=tokens.length;i<numTokens;++i)value=void 0,"#"===(symbol=(token=tokens[i])[0])?value=this.renderSection(token,context,partials,originalTemplate):"^"===symbol?value=this.renderInverted(token,context,partials,originalTemplate):">"===symbol?value=this.renderPartial(token,context,partials,tags):"&"===symbol?value=this.unescapedValue(token,context):"name"===symbol?value=this.escapedValue(token,context):"text"===symbol&&(value=this.rawValue(token)),void 0!==value&&(buffer+=value);return buffer},Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this,buffer="",value=context.lookup(token[1]);if(value){if(isArray(value))for(var j=0,valueLength=value.length;j<valueLength;++j)buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate);else if("object"==typeof value||"string"==typeof value||"number"==typeof value)buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate);else if(isFunction(value)){if("string"!=typeof originalTemplate)throw new Error("Cannot use higher-order sections without the original template");null!=(value=value.call(context.view,originalTemplate.slice(token[3],token[5]),function subRender(template){return self.render(template,context,partials)}))&&(buffer+=value)}else buffer+=this.renderTokens(token[4],context,partials,originalTemplate);return buffer}},Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&0===value.length)return this.renderTokens(token[4],context,partials,originalTemplate)},Writer.prototype.renderPartial=function renderPartial(token,context,partials,tags){if(partials){var value=isFunction(partials)?partials(token[1]):partials[token[1]];return null!=value?this.renderTokens(this.parse(value,tags),context,partials,value):void 0}},Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(null!=value)return value},Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(null!=value)return mustache.escape(value)},Writer.prototype.rawValue=function rawValue(token){return token[1]},mustache.name="mustache.js",mustache.version="3.0.1",mustache.tags=["{{","}}"];var defaultWriter=new Writer;return mustache.clearCache=function clearCache(){return defaultWriter.clearCache()},mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)},mustache.render=function render(template,view,partials,tags){if("string"!=typeof template)throw new TypeError('Invalid template! Template should be a "string" but "'+function typeStr(obj){return isArray(obj)?"array":typeof obj}(template)+'" was given as the first argument for mustache#render(template, view, partials)');return defaultWriter.render(template,view,partials,tags)},mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(!isFunction(send))return result;send(result)},mustache.escape=function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function fromEntityMap(s){return entityMap[s]})},mustache.Scanner=Scanner,mustache.Context=Context,mustache.Writer=Writer,mustache})},1506:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var mustache__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1025),mustache__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(mustache__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(0),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);var propTypes={className:prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,height:prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,url:prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,width:prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired},Iframe=function(a){function b(){return a.apply(this,arguments)||this}return function _inheritsLoose(a,b){a.prototype=Object.create(b.prototype),a.prototype.constructor=a,a.__proto__=b}(b,a),b.prototype.render=function render(){var a=this.props,b=a.className,c=a.url,d=a.width,e=a.height,f=mustache__WEBPACK_IMPORTED_MODULE_0___default.a.render(c,{height:e,width:d});return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("iframe",{className:b,title:"superset-iframe",src:f,style:{height:e,width:"100%"}})},b}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent);Iframe.propTypes=propTypes,Iframe.defaultProps={className:"",url:""},__webpack_exports__.default=Iframe}}]);
//# sourceMappingURL=26.a34332b3283d2d02af46.bundle.js.map