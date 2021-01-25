(this["webpackJsonpsatisfactory-notebook"]=this["webpackJsonpsatisfactory-notebook"]||[]).push([[5],{85:function(n,t,e){"use strict";e.r(t);var r=e(14),i=e(6),c=e(1),a=e.n(c),u=e(15),o=e(38),s=e(77),l=e(76),d=e(39);function j(){var n=Object(r.a)(["\n\tfont-size: 0.8em;\n"]);return j=function(){return n},n}var b=u.a.span(j()),f=function(n){var t=n.fraction;if(!t)return null;if(t.indexOf("/")<0)return t;var e=t.split(" "),r=t.includes(" "),c=r?e[0]:null,a=r?e[1].split("/")[0]:e[0].split("/")[0],u=r?e[1].split("/")[1]:e[0].split("/")[1];return Object(i.jsxs)(i.Fragment,{children:[c&&"".concat(c," "),Object(i.jsxs)(b,{children:[Object(i.jsx)("sup",{children:a}),"\u2044",Object(i.jsx)("sub",{children:u}),"\xa0"]})]})},x=Object(c.memo)(f);function p(){var n=Object(r.a)(["\n\tline-height: 1.2;\n\twhite-space: nowrap;\n"]);return p=function(){return n},n}function O(){var n=Object(r.a)(["\n\tmargin-right: 5px;\n"]);return O=function(){return n},n}function h(){var n=Object(r.a)(["\n\tpadding-right: 3px;\n"]);return h=function(){return n},n}function m(){var n=Object(r.a)(["\n\tmax-width: 100%;\n\twidth: ","px;\n\theight: ","px;\n\tmargin-right: 3px;\n"]);return m=function(){return n},n}function g(){var n=Object(r.a)(["\n\tdisplay: flex;\n\talign-items: center;\n\tfont-size: 12px;\n\tline-height: 1.2;\n"]);return g=function(){return n},n}function v(){var n=Object(r.a)(["\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\talign-items: center;\n\tmargin: 2px 0px;\n\tbackground: #ededed;\n\tpadding: 4px 5px;\n\tborder-radius: 5px;\n"]);return v=function(){return n},n}var y=Object(c.memo)((function(n){var t=n.perMinFraction,e=n.perMin,r=Object(c.useContext)(d.b),a=Object(o.a)(r,1)[0].fractions;return Object(i.jsx)("strong",{children:a?Object(i.jsx)(x,{fraction:t}):e})})),w=Object(c.memo)((function(n){var t=n.perCycle,e=n.perCycleLabel,r=Object(c.useContext)(d.b);return Object(o.a)(r,1)[0].cycleAmount?Object(i.jsxs)(D,{children:[t,e]}):null})),C=function(n){var t=n.slug,e=n.amount,r=n.duration,c=Object(s.a)(t),a=Object(l.a)(e,r,2===c.form);return Object(i.jsxs)(k,{children:[Object(i.jsxs)(z,{children:[c.icon?Object(i.jsx)(F,{src:Object(s.b)(t),alt:c.name,width:30,height:30}):null,Object(i.jsx)(w,{perCycleLabel:a.perCycleLabel,perCycle:a.perCycle}),Object(i.jsx)(L,{href:"#".concat(t),children:c.name})]}),Object(i.jsxs)(I,{children:[Object(i.jsx)(y,{perMin:a.perMin,perMinFraction:a.perMinFraction}),Object(i.jsx)("small",{children:a.perMinLabel})]})]},t)},M=Object(c.memo)(C),k=u.a.div(v()),z=u.a.div(g()),F=u.a.img(m(),30,30),L=u.a.a(h()),D=u.a.span(O()),I=u.a.div(p()),J=e(80);function A(){var n=Object(r.a)(["\n\tdisplay: flex;\n\tmargin-bottom: 4px;\n\twidth: 100%;\n"]);return A=function(){return n},n}function q(){var n=Object(r.a)(["\n\tflex: 1 1 20%;\n\ttext-align: right;\n\tfont-size: 11px;\n\tfont-style: italic;\n\tjustify-content: flex-end;\n\talign-items: center;\n\tdisplay: flex;\n\tcolor: #444;\n"]);return q=function(){return n},n}function B(){var n=Object(r.a)(["\n\tdisplay: flex;\n\talign-items: center;\n\twidth: 100%;\n\n\t@media (max-width: 400px) {\n\t\tflex-direction: column;\n\t}\n"]);return B=function(){return n},n}function E(){var n=Object(r.a)(["\n\tflex: 1;\n\twidth: 100%;\n"]);return E=function(){return n},n}function G(){var n=Object(r.a)(["\n\tmargin: 0;\n\ttext-align: center;\n\tfont-size: 16px;\n\tline-height: 1.2;\n\twidth: 100%;\n"]);return G=function(){return n},n}function H(){var n=Object(r.a)(["\n\tdisplay: flex;\n\tborder: 1px solid #999;\n\tflex-direction: column;\n\talign-items: center;\n\tpadding: 8px;\n\tborder-radius: 5px;\n\tmargin: 4px 0;\n\tpage-break-inside: avoid;\n\tbreak-inside: avoid;\n\tmax-width: 100%;\n"]);return H=function(){return n},n}function K(){var n=Object(r.a)(["\n\tflex: 0;\n\tmargin: 8px;\n\n\t@media (max-width: 400px) {\n\t\ttransform: rotate(90deg);\n\t}\n"]);return K=function(){return n},n}var N=function(n){var t=n.slug,e=Object(l.c)(t),r=a.a.useMemo((function(){return e.producedIn.filter((function(n){return!l.e.has(n)}))}),[e.producedIn]);if(0===r.length)return null;var c=Object(J.b)(r[0]);return Object(i.jsxs)(Q,{id:t,children:[Object(i.jsxs)(V,{children:[Object(i.jsx)(U,{children:"\xa0"}),Object(i.jsx)(R,{children:e.name}),Object(i.jsx)(U,{children:c})]}),Object(i.jsxs)(T,{children:[Object(i.jsx)(S,{children:e.ingredients.map((function(n){return Object(i.jsx)(M,{amount:n.amount,slug:n.slug,duration:e.manufacturingDuration},"in-".concat(n.slug))}))}),Object(i.jsx)(P,{children:"\u27a4"}),Object(i.jsx)(S,{children:e.products.map((function(n){return Object(i.jsx)(M,{amount:n.amount,slug:n.slug,duration:e.manufacturingDuration},"out-".concat(n.slug))}))})]})]})},P=(t.default=Object(c.memo)(N),u.a.div(K())),Q=u.a.div(H()),R=u.a.h2(G()),S=u.a.div(E()),T=u.a.div(B()),U=u.a.div(q()),V=u.a.div(A())}}]);
//# sourceMappingURL=5.42dad15e.chunk.js.map