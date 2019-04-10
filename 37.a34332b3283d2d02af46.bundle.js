(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{1529:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var reactify=__webpack_require__(669),d3=__webpack_require__(48),d3_default=__webpack_require__.n(d3),prop_types=__webpack_require__(0),prop_types_default=__webpack_require__.n(prop_types),dataTables_bootstrap=__webpack_require__(786),dataTables_bootstrap_default=__webpack_require__.n(dataTables_bootstrap),purify=__webpack_require__(98),purify_default=__webpack_require__.n(purify),NumberFormatterRegistrySingleton=__webpack_require__(135),NumberFormats=__webpack_require__(54),TimeFormatterRegistrySingleton=__webpack_require__(626);__webpack_require__(788);window.$&&dataTables_bootstrap_default()(window,window.$);var $=window.$||dataTables_bootstrap_default.a.$,propTypes={data:prop_types_default.a.arrayOf(prop_types_default.a.object),height:prop_types_default.a.number,alignPositiveNegative:prop_types_default.a.bool,colorPositiveNegative:prop_types_default.a.bool,columns:prop_types_default.a.arrayOf(prop_types_default.a.shape({key:prop_types_default.a.string,label:prop_types_default.a.string,format:prop_types_default.a.string})),filters:prop_types_default.a.object,includeSearch:prop_types_default.a.bool,metrics:prop_types_default.a.arrayOf(prop_types_default.a.oneOfType([prop_types_default.a.string,prop_types_default.a.object])),onAddFilter:prop_types_default.a.func,onRemoveFilter:prop_types_default.a.func,orderDesc:prop_types_default.a.bool,pageLength:prop_types_default.a.oneOfType([prop_types_default.a.number,prop_types_default.a.string]),percentMetrics:prop_types_default.a.arrayOf(prop_types_default.a.oneOfType([prop_types_default.a.string,prop_types_default.a.object])),tableFilter:prop_types_default.a.bool,tableTimestampFormat:prop_types_default.a.string,timeseriesLimitMetric:prop_types_default.a.oneOfType([prop_types_default.a.string,prop_types_default.a.object])},formatValue=Object(NumberFormatterRegistrySingleton.b)(NumberFormats.a.INTEGER),formatPercent=Object(NumberFormatterRegistrySingleton.b)(NumberFormats.a.PERCENT_3_POINT);function NOOP(){}function TableVis(a,b){function c(a){for(var b=[],c=0;c<d.length;c+=1)b.push(d[c][a]);return b}var d=b.data,e=b.height,f=b.alignPositiveNegative,g=void 0!==f&&f,h=b.colorPositiveNegative,j=b.columns,k=b.filters,l=void 0===k?{}:k,m=b.includeSearch,n=b.metrics,o=b.onAddFilter,p=void 0===o?NOOP:o,q=b.onRemoveFilter,r=void 0===q?NOOP:q,s=b.orderDesc,t=b.pageLength,u=b.percentMetrics,v=b.tableFilter,w=b.tableTimestampFormat,x=b.timeseriesLimitMetric,y=$(a);y.addClass("superset-legacy-chart-table");for(var z=(n||[]).map(function(a){return a.label||a}).concat((u||[]).map(function(a){return"%"+a})).filter(function(a){return"number"==typeof d[0][a]}),A={},B={},C=0;C<z.length;C+=1)g?A[z[C]]=d3_default.a.max(c(z[C]).map(Math.abs)):(A[z[C]]=d3_default.a.max(c(z[C])),B[z[C]]=d3_default.a.min(c(z[C])));var D=Object(TimeFormatterRegistrySingleton.b)(w),E=d3_default.a.select(a);E.html("");var F=E.append("table").classed("dataframe dataframe table table-striped table-condensed table-hover dataTable no-footer",!0).attr("width","100%");F.append("thead").append("tr").selectAll("th").data(j.map(function(a){return a.label})).enter().append("th").text(function(a){return a}),F.append("tbody").selectAll("tr").data(d).enter().append("tr").selectAll("td").data(function(a){return j.map(function(b){var c,d=b.key,e=b.format,f=a[d],g=0<=z.indexOf(d);return"__timestamp"===d&&(c=D(f)),"string"==typeof f&&(c='<span class="like-pre">'+purify_default.a.sanitize(f)+"</span>"),g&&(c=Object(NumberFormatterRegistrySingleton.b)(e)(f)),"%"===d[0]&&(c=formatPercent(f)),{col:d,val:f,html:c,isMetric:g}})}).enter().append("td").style("background-image",function(a){if(a.isMetric){var i=void 0!==h&&h&&0>a.val?150:0;if(g){var j=Math.abs(Math.round(a.val/A[a.col]*100));return"linear-gradient(to right, rgba("+i+",0,0,0.2), rgba("+i+",0,0,0.2) "+j+"%, rgba(0,0,0,0.01) "+j+"%, rgba(0,0,0,0.001) 100%)"}var b=Math.abs(Math.max(A[a.col],0)),c=Math.abs(Math.min(B[a.col],0)),d=b+c,e=Math.round(Math.min(c+a.val,c)/d*100),f=Math.round(Math.abs(a.val)/d*100);return"linear-gradient(to right, rgba(0,0,0,0.01), rgba(0,0,0,0.001) "+e+"%, rgba("+i+",0,0,0.2) "+e+"%, rgba("+i+",0,0,0.2) "+(e+f)+"%, rgba(0,0,0,0.01) "+(e+f)+"%, rgba(0,0,0,0.001) 100%)"}return null}).classed("text-right",function(a){return a.isMetric}).attr("title",function(a){return"string"==typeof a.val?a.val:Number.isNaN(a.val)?null:formatValue(a.val)}).attr("data-sort",function(a){return a.isMetric?a.val:null}).classed("filtered",function(a){return l&&l[a.col]&&0<=l[a.col].indexOf(a.val)}).on("click",function(a){!a.isMetric&&v&&(d3_default.a.select(this).classed("filtered")?(r(a.col,[a.val]),d3_default.a.select(this).classed("filtered",!1)):(d3_default.a.select(this).classed("filtered",!0),p(a.col,[a.val])))}).style("cursor",function(a){return a.isMetric?"":"pointer"}).html(function(a){return a.html?a.html:a.val});var G=y.find(".dataTable").DataTable({paging:t&&0<t,pageLength:t,aaSorting:[],searching:void 0!==m&&m,bInfo:!1,scrollY:e+"px",scrollCollapse:!0,scrollX:!0});!function fixTableHeight(a,b){var c=a.find(".dataTables_scrollHead").height(),d=a.find(".dataTables_filter").height()||0,e=a.find(".dataTables_length").height()||0,f=a.find(".dataTables_paginate").height()||0,g=e>d?e:d;a.find(".dataTables_scrollBody").css("max-height",b-c-g-f)}(y.find(".dataTables_wrapper"),e);var H,I=Array.isArray(x)?x[0]:x;if(I?H=I.label||I:0<z.length&&(H=z[0]),H){var K=j.map(function(a){return a.key}).indexOf(H);G.column(K).order(s?"desc":"asc"),0>z.indexOf(H)&&G.column(K).visible(!1)}G.draw()}TableVis.displayName="TableVis",TableVis.propTypes=propTypes;var Table=TableVis;__webpack_exports__.default=Object(reactify.a)(Table)}}]);
//# sourceMappingURL=37.a34332b3283d2d02af46.bundle.js.map