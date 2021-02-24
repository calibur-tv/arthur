"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports[Symbol.toStringTag] = "Module";
var viteSsg = require("vite-ssg");
var vueRouter = require("vue-router");
var vue = require("vue");
var serverRenderer = require("@vue/server-renderer");
var App_vue_vue_type_style_index_0_lang = "\n#app {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n}\n";
const _sfc_main = {
  setup() {
    const router = vueRouter.useRouter();
    const route = vueRouter.useRoute();
    console.log(route);
    console.log(router);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<!--[--><h1>Hello App!</h1><p><!--\u4F7F\u7528 router-link \u7EC4\u4EF6\u8FDB\u884C\u5BFC\u822A --><!--\u901A\u8FC7\u4F20\u9012 \`to\` \u6765\u6307\u5B9A\u94FE\u63A5 --><!--\`<router-link>\` \u5C06\u5448\u73B0\u4E00\u4E2A\u5E26\u6709\u6B63\u786E \`href\` \u5C5E\u6027\u7684 \`<a>\` \u6807\u7B7E-->`);
  _push(serverRenderer.ssrRenderComponent(_component_router_link, {to: "/"}, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Go to Home`);
      } else {
        return [
          vue.createTextVNode("Go to Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_router_link, {to: "/about"}, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Go to About`);
      } else {
        return [
          vue.createTextVNode("Go to About")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p><!-- \u8DEF\u7531\u51FA\u53E3 --><!-- \u8DEF\u7531\u5339\u914D\u5230\u7684\u7EC4\u4EF6\u5C06\u6E32\u67D3\u5728\u8FD9\u91CC -->`);
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`<!--]-->`);
}
_sfc_main.ssrRender = _sfc_ssrRender;
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/yuistack/Documents/calibur/arthur/packages/core/src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const routes = [
  {path: "/", component: () => Promise.resolve().then(function() {
    return index;
  })},
  {path: "/about", component: () => Promise.resolve().then(function() {
    return about;
  })}
];
vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes
});
const createApp = viteSsg.ViteSSG(_sfc_main, {
  routes
}, ({app, router, isClient}) => {
});
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>index page</div>`);
}
_sfc_main$1.ssrRender = _sfc_ssrRender$1;
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/yuistack/Documents/calibur/arthur/packages/core/src/pages/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$1
});
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>about page</div>`);
}
_sfc_main$2.ssrRender = _sfc_ssrRender$2;
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/Users/yuistack/Documents/calibur/arthur/packages/core/src/pages/about.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main$2
});
exports.createApp = createApp;
