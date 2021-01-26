(this["webpackJsonpsatisfactory-notebook"]=this["webpackJsonpsatisfactory-notebook"]||[]).push([[7],{87:function(e,n,t){"use strict";t.r(n);var c=t(14),a=t(38),r=t(6),i=t(1),o=t(10),s=t(74),l=t(15),u=t(77),j=t(39),b=t.p+"static/media/logo.61c5784d.png";function d(){var e=Object(c.a)(["\n\t@media (max-width: 400px) {\n\t\tdisplay: none;\n\t}\n"]);return d=function(){return e},e}function h(){var e=Object(c.a)(["\n\tcolor: darkred;\n\tcursor: pointer;\n\tfont-weight: bold;\n"]);return h=function(){return e},e}function O(){var e=Object(c.a)(["\n\tmax-width: 100%;\n\theight: auto;\n"]);return O=function(){return e},e}function f(){var e=Object(c.a)(["\n\tcolor: darkred;\n\tcursor: pointer;\n"]);return f=function(){return e},e}function g(){var e=Object(c.a)(["\n\tfont-size: 0.8em;\n\tfont-style: italic;\n\tmargin-left: 18px;\n\tmargin-top: 2px;\n\tcolor: #444;\n"]);return g=function(){return e},e}function x(){var e=Object(c.a)(["\n\tfont-size: 0.8em;\n\tmargin: 12px 0 12px 18px;\n"]);return x=function(){return e},e}function p(){var e=Object(c.a)(["\n\tmargin: 12px 0 12px 18px;\n\tfont-size: 0.9em;\n"]);return p=function(){return e},e}function m(){var e=Object(c.a)(["\n\t/* font-weight: bold;\n\tfont-size: 22px;\n\tmargin-bottom: 6px; */\n"]);return m=function(){return e},e}function v(){var e=Object(c.a)(["\n\t/* width: 300px; */\n\tmin-width: 260px;\n\tbackground: #bbb;\n\tposition: sticky;\n\ttop: 0;\n\theight: 100vh;\n\tpadding: 10px;\n\tbox-sizing: content-box;\n\n\t@media print {\n\t\tdisplay: none;\n\t}\n\n\t/* TODO - Extract the max-width to variable */\n\t@media screen and (max-width: 600px) {\n\t\twidth: 100%;\n\t\tposition: unset;\n\t\theight: auto;\n\t}\n"]);return v=function(){return e},e}function k(){var e=Object(c.a)(["\n\tmargin: 6px 0;\n"]);return k=function(){return e},e}function y(){var e=Object(c.a)(["\n\tmargin: 18px 0 12px 0;\n\tfont-weight: bold;\n"]);return y=function(){return e},e}var C=Object(i.memo)((function(e){var n=e.icon,t=e.label;return Object(r.jsxs)(R,{children:[Object(r.jsx)("i",{className:"fas ".concat(n," fa-fw")}),Object(r.jsxs)("span",{children:[" ",t]})]})})),w=Object(i.memo)((function(e){var n=e.label,t=e.name,c=e.checked,a=e.onChange,i=e.hint;return Object(r.jsxs)(_,{children:[Object(r.jsx)("input",{id:t,name:t,type:"checkbox",checked:c,onChange:a}),Object(r.jsx)("label",{htmlFor:t,children:n}),i&&Object(r.jsx)(I,{children:i})]})})),P=Object(i.memo)((function(e){var n=e.slug,t=e.onClick,c=Object(u.a)(n);return Object(r.jsxs)(N,{onClick:function(){return t(n)},children:[c.name," ",Object(r.jsx)("i",{className:"fas fa-times fa-fw"})]})})),L=function(){var e=Object(i.useContext)(j.b),n=Object(a.a)(e,2),t=n[0],c=n[1],l=Object(i.useCallback)((function(e){c({type:j.a.TOGGLE_FRACTION}),o.a({category:"setting-change",message:"Fraction changed",level:s.a.Info})}),[c]),u=Object(i.useCallback)((function(e){c({type:j.a.TOGGLE_LEFT_MARGIN}),o.a({category:"setting-change",message:"Left-margin changed",level:s.a.Info})}),[c]),d=Object(i.useCallback)((function(e){c({type:j.a.TOGGLE_ONE_PER_PAGE}),o.a({category:"setting-change",message:"One-per-page changed",level:s.a.Info})}),[c]),h=Object(i.useCallback)((function(e){c({type:j.a.TOGGLE_CYCLE_AMOUNT}),o.a({category:"setting-change",message:"Cycle-amounts changed",level:s.a.Info})}),[c]),O=Object(i.useCallback)((function(e){c({type:j.a.RETURN_PRODUCT,slug:e}),o.a({category:"product-returned",message:"Returned: ".concat(e),level:s.a.Info})}),[c]),f=Object(i.useCallback)((function(){c({type:j.a.RETURN_ALL_PRODUCTS}),o.a({category:"all-products-returned",message:"Returned all products",level:s.a.Info})}),[c]);return Object(r.jsxs)(E,{children:[Object(r.jsx)(G,{children:Object(r.jsx)(F,{src:b,alt:"Satisfactory Notebook",width:"260",height:"81"})}),Object(r.jsxs)(T,{children:[Object(r.jsx)(C,{icon:"fa-cog",label:"Settings"}),Object(r.jsx)(w,{label:"Use Fractions",name:"fractions",checked:t.checked,onChange:l,hint:"Conversions are hard"}),Object(r.jsx)(w,{label:"Show Cycle Amounts",name:"cycleAmount",checked:t.cycleAmount,onChange:h,hint:"Include per cycle inputs/outputs"}),Object(r.jsxs)(S,{children:[Object(r.jsx)(w,{label:"Pad Left Margin",name:"leftMargin",checked:t.padLeftMargin,onChange:u,hint:"To account for punched holes"}),Object(r.jsx)(w,{label:"One Recipe Per Page",name:"onePerPage",checked:t.onePerPage,onChange:d,hint:"Waste ALL the paper"})]})]}),Object(r.jsx)(S,{children:Object(r.jsxs)(T,{children:[Object(r.jsx)(C,{icon:"fa-print",label:"Print Settings"}),Object(r.jsx)(A,{children:Object(r.jsxs)("ul",{children:[Object(r.jsxs)("li",{children:[Object(r.jsx)("strong",{children:"Margins:"})," None"]}),Object(r.jsxs)("li",{children:[Object(r.jsx)("strong",{children:"Scale:"})," 100"]}),Object(r.jsxs)("li",{children:[Object(r.jsx)("strong",{children:"Background Graphics:"})," \u2705\ufe0f"]})]})})]})}),t.removedProducts.length>0&&Object(r.jsxs)(T,{children:[Object(r.jsx)(C,{icon:"fa-filter",label:"Filtered Items"}),Object(r.jsx)(A,{children:Object(r.jsxs)("ul",{children:[Object(r.jsx)(M,{onClick:f,children:"Reset All"}),t.removedProducts.map((function(e){return Object(r.jsx)(P,{slug:e,onClick:O},e)}))]})})]})]})},R=(n.default=Object(i.memo)(L),l.a.div(y())),T=l.a.div(k()),E=l.a.div(v()),G=l.a.div(m()),_=l.a.div(p()),A=l.a.div(x()),I=l.a.div(g()),N=l.a.li(f()),F=l.a.img(O()),M=l.a.li(h()),S=l.a.div(d())}}]);
//# sourceMappingURL=7.68c8cd36.chunk.js.map