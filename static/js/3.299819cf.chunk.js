(this["webpackJsonpsatisfactory-notebook"]=this["webpackJsonpsatisfactory-notebook"]||[]).push([[3],{71:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){},76:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){},81:function(e,t,n){"use strict";n.r(t);var a=n(14),c=n(1),r=n.n(c),l=n(41),i=n(68),o=n(8),s=function(e){var t=e.children,n=Object(c.useContext)(o.b),l=Object(a.a)(n,1)[0],i=l.padLeftMargin,s=l.onePerPage;return r.a.createElement(m,{leftMargin:i,onePerPage:s},r.a.createElement(b,null,t))},u=Object(c.memo)(s),m=Object(l.a)("div")({name:"PageBorder",class:"pyxce0d",vars:{"pyxce0d-0":[function(e){return e.debug?"lightgreen":"white"}],"pyxce0d-1":[function(e){return e.debug?"1px solid black":"none"}],"pyxce0d-2":[function(e){return e.leftMargin?"12mm":"4mm"}],"pyxce0d-3":[function(e){return e.onePerPage?"always":"inherit"}],"pyxce0d-4":[function(e){return e.onePerPage?"inherit":"avoid"}]}}),b=Object(l.a)("div")({name:"PageContent",class:"p1q25hxx"});n(71);var d=function(e){var t=e.slug;return r.a.createElement(u,null,r.a.createElement(f,null,r.a.createElement("i",{className:"fa fa-bomb"}),r.a.createElement("span",null,' An error occurred trying to render "',t,'". It has been reported and we will look into it.')))},p=Object(c.memo)(d),f=Object(l.a)("div")({name:"ErrorWrapper",class:"e1hxtn3n"});n(72);var j=n(15),O=function(e){var t=e.perCycle,n=e.perCycleLabel,l=Object(c.useContext)(j.b);return Object(a.a)(l,1)[0].cycleAmount?r.a.createElement(v,null,t,n):null},E=Object(c.memo)(O),v=Object(l.a)("span")({name:"CycleAmount",class:"chdv3lq"});n(73);var g=Object(l.a)("span")({name:"SmallPart",class:"s1hb0rnj"}),y=function(e){var t=e.fraction;if(!t)return null;if(t.indexOf("/")<0)return t;var n=t.split(" "),a=t.includes(" "),c=a?n[0]:null,l=a?n[1].split("/")[0]:n[0].split("/")[0],i=a?n[1].split("/")[1]:n[0].split("/")[1];return r.a.createElement(r.a.Fragment,null,c&&"".concat(c," "),r.a.createElement(g,null,r.a.createElement("sup",null,l),"\u2044",r.a.createElement("sub",null,i),"\xa0"))},h=Object(c.memo)(y);n(74);var k=function(e){var t=e.perMinFraction,n=e.perMin,l=Object(c.useContext)(j.b),i=Object(a.a)(l,1)[0].fractions;return r.a.createElement("strong",null,i?r.a.createElement(h,{fraction:t}):n)},x=Object(c.memo)(k),C=function(e){console.log("IMAGE ERROR",e)},w=function(e){var t=e.ingredient;return r.a.createElement(P,{"test-id":t.slug},r.a.createElement(q,null,t.icon?r.a.createElement(A,{src:"".concat("https://d1ba7e9b4ql0yd.cloudfront.net/satisfactory-notebook/static/media/").concat(t.icon),alt:t.name,width:30,height:30,loading:"lazy",onError:C}):null,r.a.createElement(E,{perCycleLabel:t.rate.perCycleLabel,perCycle:t.rate.perCycle}),r.a.createElement(I,{href:"#".concat(t.slug)},t.name)),r.a.createElement(R,null,r.a.createElement(x,{perMin:t.rate.perMin,perMinFraction:t.rate.perMinFraction}),r.a.createElement("small",null,t.rate.perMinLabel)))},M=Object(c.memo)(w),P=Object(l.a)("div")({name:"Wrapper",class:"w1svspc8"}),q=Object(l.a)("div")({name:"Header",class:"h1ngor6o"}),A=Object(l.a)("img")({name:"Image",class:"i1pidkv"}),I=Object(l.a)("a")({name:"Name",class:"nzw4xp6"}),R=Object(l.a)("div")({name:"Quantity",class:"q1diaxd9"});n(75);var z=function(e){var t=e.recipe,n=Object(c.useContext)(j.b);return!Object(a.a)(n,1)[0].includeAlternates&&t.isAlt?null:r.a.createElement(T,{id:t.name},r.a.createElement(S,null,r.a.createElement(H,null,"\xa0"),r.a.createElement(F,null,t.name),r.a.createElement(H,null,t.producedIn)),r.a.createElement(D,null,r.a.createElement(N,null,t.ingredients.map((function(e){return r.a.createElement(M,{ingredient:e,key:"in-".concat(e.slug)})}))),r.a.createElement(W,null,r.a.createElement("i",{className:"fa fa-arrow-alt-right"})),r.a.createElement(N,null,t.products.map((function(e){return r.a.createElement(M,{ingredient:e,key:"out-".concat(e.slug)})})))))},L=Object(c.memo)(z),W=Object(l.a)("div")({name:"Arrow",class:"ah4xf8l"}),T=Object(l.a)("div")({name:"Wrapper",class:"wy5vo25"}),F=Object(l.a)("h2")({name:"Title",class:"t156y6ts"}),N=Object(l.a)("div")({name:"Column",class:"c1507wbx"}),D=Object(l.a)("div")({name:"IngredientsWrapper",class:"i1v2bpqu"}),H=Object(l.a)("div")({name:"Secondary",class:"s15i99l1"}),S=Object(l.a)("div")({name:"Header",class:"h1g9nyev"});n(76);var J=n(5),_=n(67),B=function(e){var t=e.slug,n=Object(c.useContext)(o.b),l=Object(a.a)(n,2)[1],i=Object(c.useCallback)((function(){l({type:o.a.REMOVE_PRODUCT,slug:t}),J.a({category:"product-removed",message:"Removed: ".concat(t),level:_.a.Info})}),[l,t]);return r.a.createElement(Q,{onClick:i},r.a.createElement("i",{className:"fas fa-times-circle",title:"Remove"}))},G=Object(c.memo)(B),Q=Object(l.a)("span")({name:"Wrapper",class:"w1bznyqd"});n(77);var U=function(e){var t=e.item,n=e.slug,a=t.icon;return r.a.createElement(u,null,r.a.createElement(K,{id:n},r.a.createElement(X,null,r.a.createElement(Y,null,t.name," ",r.a.createElement(G,{slug:n})),r.a.createElement(Z,null,t.description)),a&&r.a.createElement($,{alt:t.name,src:"".concat("https://d1ba7e9b4ql0yd.cloudfront.net/satisfactory-notebook/static/media/").concat(a),width:100,height:100,loading:"lazy"})),t.recipes.map((function(e){return r.a.createElement(L,{recipe:e,key:e.slug})})))},V=Object(c.memo)(U),K=Object(l.a)("div")({name:"Header",class:"hb3qhfv"}),X=Object(l.a)("div")({name:"Details",class:"degqpjz"}),Y=Object(l.a)("h1")({name:"Title",class:"t14k67ue"}),Z=Object(l.a)("div")({name:"Description",class:"d13c0kfu"}),$=Object(l.a)("img")({name:"Image",class:"i1sjr514",vars:{"i1sjr514-0":[function(e){return e.src?"inherit":"none"}]}});n(78);var ee=n(31),te=function(){var e=Object(c.useContext)(o.b),t=Object(a.a)(e,1)[0],n=t.removedProducts,l=t.hiddenTypes,s=Object(c.useState)({}),u=Object(a.a)(s,2),m=u[0],b=u[1],d=Object(c.unstable_useTransition)({timeoutMs:3e3}),f=Object(a.a)(d,2),j=f[0];f[1];Object(c.useEffect)((function(){fetch("/data-v4.json").then((function(e){return e.json()})).then((function(e){return j((function(){b(e)}))})).catch((function(e){return console.error(e)}))}),[]);var O=Object(c.useMemo)((function(){return Object.keys(m).reduce((function(e,t){return n.includes(t)||l.filter((function(e){return e.toLowerCase()===m[t].category})).length>0||(e[t]=m[t]),e}),{})}),[m,l,n]);return 0===Object.keys(O).length?r.a.createElement(ee.a,null):r.a.createElement(ne,null,Object.keys(O).map((function(e){return r.a.createElement(i.a,{key:e,fallback:r.a.createElement(p,{slug:e})},r.a.createElement(V,{slug:e,item:m[e]}))})))},ne=Object(l.a)("div")({name:"Wrapper",class:"w1pozjp9"});t.default=Object(c.memo)(te);n(79)}}]);
//# sourceMappingURL=3.299819cf.chunk.js.map