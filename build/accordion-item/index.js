!function(){"use strict";var o,e={664:function(){var o=window.wp.blocks,e=window.wp.i18n,n=window.wp.element,c=window.wp.blockEditor,r=window.wp.data,t=JSON.parse('{"u2":"accordion/accordion-item"}');(0,o.registerBlockType)(t.u2,{title:(0,e.__)("Accordion Item","accordion"),icon:"layout",category:"design",parent:["accordion/accordion-container"],edit:function(o){let{clientId:t}=o;const i=[["accordion/accordion-header",{placeholder:(0,e.__)("Add Accordion Heading Here","accordion")}],["accordion/accordion-content",{placeholder:(0,e.__)("Add Accordion Content Here","accordion")}]],a=(0,r.useSelect)((o=>o("core/block-editor").getBlock(t).innerBlocks[0])),d=(0,r.useSelect)((o=>o("core/block-editor").getBlock(t).innerBlocks[1]));if(d&&a){const o=d.attributes.myAnchor;(0,r.dispatch)("core/block-editor").updateBlockAttributes(a.clientId,{target:o});const e=a.attributes.myAnchor;(0,r.dispatch)("core/block-editor").updateBlockAttributes(d.clientId,{headerId:e})}const l=(0,c.useBlockProps)();return(0,n.createElement)("div",l,(0,n.createElement)(c.InnerBlocks,{allowedBlocks:["accordion/accordion-header","accordion/accordion-content"],template:i,templateLock:"all"}))},save:function(){return(0,n.createElement)(c.InnerBlocks.Content,null)}})}},n={};function c(o){var r=n[o];if(void 0!==r)return r.exports;var t=n[o]={exports:{}};return e[o](t,t.exports,c),t.exports}c.m=e,o=[],c.O=function(e,n,r,t){if(!n){var i=1/0;for(u=0;u<o.length;u++){n=o[u][0],r=o[u][1],t=o[u][2];for(var a=!0,d=0;d<n.length;d++)(!1&t||i>=t)&&Object.keys(c.O).every((function(o){return c.O[o](n[d])}))?n.splice(d--,1):(a=!1,t<i&&(i=t));if(a){o.splice(u--,1);var l=r();void 0!==l&&(e=l)}}return e}t=t||0;for(var u=o.length;u>0&&o[u-1][2]>t;u--)o[u]=o[u-1];o[u]=[n,r,t]},c.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},function(){var o={430:0,363:0};c.O.j=function(e){return 0===o[e]};var e=function(e,n){var r,t,i=n[0],a=n[1],d=n[2],l=0;if(i.some((function(e){return 0!==o[e]}))){for(r in a)c.o(a,r)&&(c.m[r]=a[r]);if(d)var u=d(c)}for(e&&e(n);l<i.length;l++)t=i[l],c.o(o,t)&&o[t]&&o[t][0](),o[t]=0;return c.O(u)},n=self.webpackChunkaccordion=self.webpackChunkaccordion||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var r=c.O(void 0,[363],(function(){return c(664)}));r=c.O(r)}();