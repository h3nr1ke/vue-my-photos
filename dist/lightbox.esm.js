'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    props: {
        // images = [{ name:'image1.jpg', alt:'Redwoods', filter:'nature' }, ...]
        images: {
            type: Array,
            required: true
        },
        // Used to display a subset of photos. If used, images array must contain a property
        // titled 'filter' which contains the desired filter string
        filter: {
            type: String,
            default: 'all'
        },
        // Used if images are located in a separate folder (e.g. '/images/')
        directory: {
            type: String,
            default: ''
        },
        // Used to set the duration in miliseconds of key/mouse inactivity before caption
        // and arrows disappear
        timeoutDuration: {
            type: Number,
            default: 3000
        }
    },
    data: function data() {
        return {
            visible: false,        // Lightbox not visible by default
            controlsVisible: true, // Lightbox controls (arrows, caption, close button)
            index: 0,              // Index indicates which photo to display. Default to 1st photo
            timer: null,          // Timer to show/hide lightbox controls
            slideTransitionName: "lightbox-slide-next" //Controls animation's transition direction (next or prev)
        }
    },
    mounted: function mounted() {
        window.addEventListener('keydown', this.keyEventListener);
        window.addEventListener('mousemove',this.mouseEventListener);
        window.addEventListener('touchmove',this.mouseEventListener);
        window.addEventListener('mouseup',this.mouseEventListener);
    },
    destroyed: function destroyed() {
        window.removeEventListener('keydown', this.keyEventListener);
        window.removeEventListener('mousemove',this.mouseEventListener);
        window.removeEventListener('touchmove',this.mouseEventListener);
        window.removeEventListener('mouseup',this.mouseEventListener);
    },
    methods: {
        show: function show(imageName) {
            this.visible = true;
            this.controlsVisible = true;
            var that = this;

            // Find the index of the image passed to Lightbox
            for(var i = 0; i < this.filteredImages.length; i++){
                if(this.filteredImages[i].name == imageName) {
                    this.index = i;
                    break;
                }
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {that.controlsVisible = false;}, that.timeoutDuration);
            this.preloadNextImage();
        },
        hide: function hide() {
            this.visible = false;
            this.$emit('close', this.index);
            this.index = 0;
            clearTimeout(this.timer);
        },
        has_next: function has_next() {
            return (this.index + 1 < this.filteredImages.length);
        },
        has_prev: function has_prev() {
            return (this.index - 1 >= 0);
        },
        prev: function prev() {
            if (this.has_prev()) {
                this.slideTransitionName = "lightbox-slide-prev";
                this.index -= 1;
            }
        },
        next: function next() {
            if (this.has_next()) {
                this.slideTransitionName = "lightbox-slide-next";
                this.index += 1;
                this.preloadNextImage();
            }
        },
        keyEventListener: function keyEventListener(e) {
            if (this.visible) {
                var that = this;
                this.controlsVisible = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(function() {that.controlsVisible = false;}, that.timeoutDuration);

                switch (e.key) {
                    case 'ArrowRight':
                        this.next();
                        break;
                    case 'ArrowLeft':
                        this.prev();
                        break;
                    case 'ArrowDown':
                    case 'ArrowUp':
                    case ' ':
                        e.preventDefault();
                        break;
                    case 'Escape':
                        this.hide();
                        break;
                }
            }
        },
        // This event shows the arrows and caption on the lightbox when the mouse is moved or clicked.
        // Also used for touch events on touchscreen devices. The elements are set to disappear
        // after a given duration via a timer.
        mouseEventListener: function mouseEventListener(e) {
            if (this.visible) {
                var that = this;
                this.controlsVisible = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(function() {that.controlsVisible = false;}, that.timeoutDuration);
            }
        },
        preloadNextImage: function preloadNextImage () {
            if (this.has_next()){
                try {
                    var _img = new Image();
                    _img.src = this.directory + this.filteredImages[this.index + 1].name;
                } catch (e) { }
            }
        }
    },
    computed: {
        filteredImages: function () {
            var that = this;
            if (that.filter === 'all' || !that.filter.length){
                return that.images;
            }
            else {
                return that.images.filter(function (item) {
                    return item.filter === that.filter;
                })
            }
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c("transition", { attrs: { name: "lightbox-fade" } }, [
        _vm.visible
          ? _c(
              "div",
              {
                staticClass: "lightbox",
                on: {
                  mousedown: function($event) {
                    $event.stopPropagation();
                    return _vm.hide($event)
                  },
                  touchdown: function($event) {
                    $event.stopPropagation();
                    return _vm.hide($event)
                  }
                }
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "lightbox-close",
                    on: {
                      mousedown: function($event) {
                        $event.stopPropagation();
                        return _vm.hide($event)
                      },
                      touchdown: function($event) {
                        $event.stopPropagation();
                        return _vm.hide($event)
                      }
                    }
                  },
                  [_vm._v("×")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "lightbox-arrow lightbox-arrow-left",
                    on: {
                      mousedown: function($event) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        return _vm.prev($event)
                      },
                      touchdown: function($event) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        return _vm.prev($event)
                      }
                    }
                  },
                  [
                    _c("transition", { attrs: { name: "lightbox-fade" } }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.has_prev() && _vm.controlsVisible,
                              expression: "has_prev() && controlsVisible"
                            }
                          ],
                          staticClass: "lightbox-arrow-left-icon"
                        },
                        [
                          _c(
                            "svg",
                            {
                              attrs: {
                                height: "24",
                                viewBox: "0 0 24 24",
                                width: "24",
                                xmlns: "http://www.w3.org/2000/svg"
                              }
                            },
                            [
                              _c("circle", {
                                attrs: {
                                  cx: "12",
                                  cy: "12",
                                  r: "12",
                                  fill: "rgba(20, 20, 20, 0.4)"
                                }
                              }),
                              _vm._v(" "),
                              _c("path", {
                                attrs: {
                                  d:
                                    "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z",
                                  fill: "white"
                                }
                              }),
                              _vm._v(" "),
                              _c("path", {
                                attrs: { d: "M0-.5h24v24H0z", fill: "none" }
                              })
                            ]
                          )
                        ]
                      )
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "lightbox-arrow lightbox-arrow-right",
                    on: {
                      mousedown: function($event) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        return _vm.next($event)
                      },
                      touchdown: function($event) {
                        $event.stopPropagation();
                        $event.preventDefault();
                        return _vm.next($event)
                      }
                    }
                  },
                  [
                    _c("transition", { attrs: { name: "lightbox-fade" } }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.has_next() && _vm.controlsVisible,
                              expression: "has_next() && controlsVisible"
                            }
                          ],
                          staticClass: "lightbox-arrow-right-icon"
                        },
                        [
                          _c(
                            "svg",
                            {
                              attrs: {
                                height: "24",
                                viewBox: "0 0 24 24",
                                width: "24",
                                xmlns: "http://www.w3.org/2000/svg"
                              }
                            },
                            [
                              _c("circle", {
                                attrs: {
                                  cx: "12",
                                  cy: "12",
                                  r: "12",
                                  fill: "rgba(20, 20, 20, 0.4)"
                                }
                              }),
                              _vm._v(" "),
                              _c("path", {
                                attrs: {
                                  d:
                                    "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z",
                                  fill: "white"
                                }
                              }),
                              _vm._v(" "),
                              _c("path", {
                                attrs: { d: "M0-.25h24v24H0z", fill: "none" }
                              })
                            ]
                          )
                        ]
                      )
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c("transition", { attrs: { name: "lightbox-fade" } }, [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            _vm.controlsVisible &&
                            _vm.filteredImages[_vm.index].alt,
                          expression:
                            "controlsVisible && filteredImages[index].alt"
                        }
                      ],
                      staticClass: "lightbox-caption",
                      on: {
                        mousedown: function($event) {
                          $event.stopPropagation();
                        },
                        touchdown: function($event) {
                          $event.stopPropagation();
                        }
                      }
                    },
                    [
                      _c("span", { attrs: { unselectable: "on" } }, [
                        _vm._v(_vm._s(_vm.filteredImages[_vm.index].alt))
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "lightbox-main",
                    on: {
                      mousedown: function($event) {
                        $event.stopPropagation();
                        return _vm.hide($event)
                      },
                      touchdown: function($event) {
                        $event.stopPropagation();
                        return _vm.hide($event)
                      }
                    }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "lightbox-image-container",
                        on: {
                          mousedown: function($event) {
                            $event.stopPropagation();
                          },
                          touchdown: function($event) {
                            $event.stopPropagation();
                          }
                        }
                      },
                      [
                        _c(
                          "transition",
                          {
                            attrs: {
                              name: _vm.slideTransitionName,
                              mode: "out-in"
                            }
                          },
                          [
                            _c("div", {
                              key: _vm.index,
                              staticClass: "lightbox-image",
                              style: {
                                backgroundImage:
                                  "url(" +
                                  _vm.directory +
                                  _vm.filteredImages[_vm.index].name +
                                  ")"
                              }
                            })
                          ]
                        )
                      ],
                      1
                    )
                  ]
                )
              ],
              1
            )
          : _vm._e()
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-60786e2c_0", { source: "\n.lightbox {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .9);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 200;\n    color: rgba(255,255,255,0.8);\n}\n.lightbox-close {\n    position: fixed;\n    z-index: 210;\n    right: 0;\n    top: 0;\n    padding: 1rem;\n    font-size: 1.7rem;\n    cursor: pointer;\n    width: 4rem;\n    height: 4rem;\n    color: white;\n}\n.lightbox-main {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    width: 100%;\n    height: 100%;\n}\n.lightbox-arrow {\n    padding: 0 2rem;\n    cursor: pointer;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    padding: 0 2rem;\n    height: 100%;\n    width: 2rem;\n    z-index: 100;\n}\n.lightbox-arrow-right { right: 0;\n}\n.lightbox-arrow-left { left: 0;}\n.lightbox-image-container {\n    -webkit-box-flex: 1;\n    width: 20%;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n}\n.lightbox-image {\n    width: 100%;\n    height: 100%;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: 50% 50%;\n}\n.lightbox-caption {\n    position: absolute;\n    bottom: 15px;\n    width: 100%;\n    z-index: 100;\n    text-align: center;\n    text-shadow: 1px 1px 3px rgb(26, 26, 26);\n}\n.lightbox-caption span {\n    border-radius: 12px;\n    background-color: rgba(0, 0, 0, .6);\n    padding: 2px 10px;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n.lightbox-slide-next-enter-active,\n.lightbox-slide-next-leave-active,\n.lightbox-slide-prev-enter-active,\n.lightbox-slide-prev-leave-active{\n    transition: all 0.4s ease;\n}\n.lightbox-slide-next-enter {\n    -webkit-transform: translateX(100px);\n    -ms-transform: translateX(100px);\n    transform: translateX(100px);\n    opacity: 0;\n}\n.lightbox-slide-next-leave-to {\n    -webkit-transform: translateX(-100px);\n    -ms-transform: translateX(-100px);\n    transform: translateX(-100px);\n    opacity: 0;\n}\n.lightbox-slide-prev-enter {\n    -webkit-transform: translateX(-100px);\n    -ms-transform: translateX(-100px);\n    transform: translateX(-100px);\n    opacity: 0;\n}\n.lightbox-slide-prev-leave-to {\n    -webkit-transform: translateX(100px);\n    -ms-transform: translateX(100px);\n    transform: translateX(100px);\n    opacity: 0;\n}\n.lightbox-fade-enter-active,\n.lightbox-fade-leave-active {\n    transition: all 0.4s ease;\n}\n.lightbox-fade-enter,\n.lightbox-fade-leave-to {\n    opacity: 0;\n}\n\n", map: {"version":3,"sources":["C:\\code\\comunidade\\vue-my-photos\\src\\lightbox.vue"],"names":[],"mappings":";AAoMA;IACA,eAAA;IACA,MAAA;IACA,OAAA;IACA,6BAAA;IACA,WAAA;IACA,YAAA;IACA,oBAAA;IACA,oBAAA;IACA,qBAAA;IACA,aAAA;IACA,uBAAA;IACA,mBAAA;IACA,YAAA;IACA,4BAAA;AACA;AAEA;IACA,eAAA;IACA,YAAA;IACA,QAAA;IACA,MAAA;IACA,aAAA;IACA,iBAAA;IACA,eAAA;IACA,WAAA;IACA,YAAA;IACA,YAAA;AACA;AAEA;IACA,oBAAA;IACA,oBAAA;IACA,qBAAA;IACA,aAAA;IACA,WAAA;IACA,YAAA;AACA;AAEA;IACA,eAAA;IACA,eAAA;IACA,oBAAA;IACA,oBAAA;IACA,qBAAA;IACA,aAAA;IACA,uBAAA;IACA,mBAAA;IACA,kBAAA;IACA,eAAA;IACA,YAAA;IACA,WAAA;IACA,YAAA;AACA;AAEA,wBAAA,QAAA;AAAA;AAEA,uBAAA,OAAA,CAAA;AAEA;IACA,mBAAA;IACA,UAAA;IACA,eAAA;IACA,WAAA;IACA,OAAA;AACA;AAEA;IACA,WAAA;IACA,YAAA;IACA,wBAAA;IACA,4BAAA;IACA,4BAAA;AACA;AAEA;IACA,kBAAA;IACA,YAAA;IACA,WAAA;IACA,YAAA;IACA,kBAAA;IACA,wCAAA;AACA;AAEA;IACA,mBAAA;IACA,mCAAA;IACA,iBAAA;IACA,yBAAA;IACA,sBAAA;IACA,qBAAA;IACA,iBAAA;AACA;AAEA;;;;IAIA,yBAAA;AACA;AAEA;IACA,oCAAA;IACA,gCAAA;IACA,4BAAA;IACA,UAAA;AACA;AAEA;IACA,qCAAA;IACA,iCAAA;IACA,6BAAA;IACA,UAAA;AACA;AAEA;IACA,qCAAA;IACA,iCAAA;IACA,6BAAA;IACA,UAAA;AACA;AAEA;IACA,oCAAA;IACA,gCAAA;IACA,4BAAA;IACA,UAAA;AACA;AAEA;;IAEA,yBAAA;AACA;AAEA;;IAEA,UAAA;AACA","file":"lightbox.vue","sourcesContent":["<template>\r\n    <div>\r\n        <transition name=\"lightbox-fade\">\r\n            <div class=\"lightbox\" v-if=\"visible\" @mousedown.stop=\"hide\" @touchdown.stop=\"hide\">\r\n                    <div class=\"lightbox-close\" @mousedown.stop=\"hide\" @touchdown.stop=\"hide\">&times;</div>\r\n                    <div class=\"lightbox-arrow lightbox-arrow-left\" @mousedown.stop.prevent=\"prev\" @touchdown.stop.prevent=\"prev\">\r\n                        <transition name=\"lightbox-fade\">\r\n                            <div class=\"lightbox-arrow-left-icon\" v-show=\"has_prev() && controlsVisible\">\r\n                                <svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                                    <circle cx=\"12\" cy=\"12\" r=\"12\" fill=\"rgba(20, 20, 20, 0.4)\" />\r\n                                    <path d=\"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z\" fill=\"white\"/>\r\n                                    <path d=\"M0-.5h24v24H0z\" fill=\"none\"/>\r\n                                </svg>\r\n                            </div>\r\n                        </transition>\r\n                    </div>\r\n                    <div class=\"lightbox-arrow lightbox-arrow-right\" @mousedown.stop.prevent=\"next\" @touchdown.stop.prevent=\"next\" >\r\n                        <transition name=\"lightbox-fade\">\r\n                            <div class=\"lightbox-arrow-right-icon\" v-show=\"has_next() && controlsVisible\" >\r\n                                <svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                                    <circle cx=\"12\" cy=\"12\" r=\"12\" fill=\"rgba(20, 20, 20, 0.4)\" />\r\n                                    <path d=\"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z\" fill=\"white\" />\r\n                                    <path d=\"M0-.25h24v24H0z\" fill=\"none\"/>\r\n                                </svg>\r\n                            </div>\r\n                        </transition>\r\n                    </div>\r\n                    <transition name=\"lightbox-fade\">\r\n                        <div class=\"lightbox-caption\" v-show=\"controlsVisible && filteredImages[index].alt\" @mousedown.stop @touchdown.stop>\r\n                            <span unselectable=\"on\">{{ filteredImages[index].alt }}</span>\r\n                        </div>\r\n                    </transition>\r\n                <div class=\"lightbox-main\" @mousedown.stop=\"hide\" @touchdown.stop=\"hide\">\r\n                    <div class=\"lightbox-image-container\" @mousedown.stop @touchdown.stop>\r\n                        <transition :name=\"slideTransitionName\" mode=\"out-in\">\r\n                            <div class=\"lightbox-image\" :key=\"index\" :style=\"{ 'backgroundImage':'url(' + directory + filteredImages[index].name + ')'}\">\r\n                            </div>\r\n                        </transition>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </transition>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        props: {\r\n            // images = [{ name:'image1.jpg', alt:'Redwoods', filter:'nature' }, ...]\r\n            images: {\r\n                type: Array,\r\n                required: true\r\n            },\r\n            // Used to display a subset of photos. If used, images array must contain a property\r\n            // titled 'filter' which contains the desired filter string\r\n            filter: {\r\n                type: String,\r\n                default: 'all'\r\n            },\r\n            // Used if images are located in a separate folder (e.g. '/images/')\r\n            directory: {\r\n                type: String,\r\n                default: ''\r\n            },\r\n            // Used to set the duration in miliseconds of key/mouse inactivity before caption\r\n            // and arrows disappear\r\n            timeoutDuration: {\r\n                type: Number,\r\n                default: 3000\r\n            }\r\n        },\r\n        data() {\r\n            return {\r\n                visible: false,        // Lightbox not visible by default\r\n                controlsVisible: true, // Lightbox controls (arrows, caption, close button)\r\n                index: 0,              // Index indicates which photo to display. Default to 1st photo\r\n                timer: null,          // Timer to show/hide lightbox controls\r\n                slideTransitionName: \"lightbox-slide-next\" //Controls animation's transition direction (next or prev)\r\n            }\r\n        },\r\n        mounted() {\r\n            window.addEventListener('keydown', this.keyEventListener);\r\n            window.addEventListener('mousemove',this.mouseEventListener);\r\n            window.addEventListener('touchmove',this.mouseEventListener);\r\n            window.addEventListener('mouseup',this.mouseEventListener);\r\n        },\r\n        destroyed() {\r\n            window.removeEventListener('keydown', this.keyEventListener);\r\n            window.removeEventListener('mousemove',this.mouseEventListener);\r\n            window.removeEventListener('touchmove',this.mouseEventListener);\r\n            window.removeEventListener('mouseup',this.mouseEventListener);\r\n        },\r\n        methods: {\r\n            show(imageName) {\r\n                this.visible = true;\r\n                this.controlsVisible = true;\r\n                var that = this;\r\n\r\n                // Find the index of the image passed to Lightbox\r\n                for(var i = 0; i < this.filteredImages.length; i++){\r\n                    if(this.filteredImages[i].name == imageName) {\r\n                        this.index = i;\r\n                        break;\r\n                    }\r\n                }\r\n                clearTimeout(this.timer);\r\n                this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);\r\n                this.preloadNextImage();\r\n            },\r\n            hide() {\r\n                this.visible = false;\r\n                this.$emit('close', this.index)\r\n                this.index = 0;\r\n                clearTimeout(this.timer);\r\n            },\r\n            has_next() {\r\n                return (this.index + 1 < this.filteredImages.length);\r\n            },\r\n            has_prev() {\r\n                return (this.index - 1 >= 0);\r\n            },\r\n            prev() {\r\n                if (this.has_prev()) {\r\n                    this.slideTransitionName = \"lightbox-slide-prev\";\r\n                    this.index -= 1;\r\n                }\r\n            },\r\n            next() {\r\n                if (this.has_next()) {\r\n                    this.slideTransitionName = \"lightbox-slide-next\";\r\n                    this.index += 1;\r\n                    this.preloadNextImage();\r\n                }\r\n            },\r\n            keyEventListener(e) {\r\n                if (this.visible) {\r\n                    var that = this;\r\n                    this.controlsVisible = true;\r\n                    clearTimeout(this.timer);\r\n                    this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);\r\n\r\n                    switch (e.key) {\r\n                        case 'ArrowRight':\r\n                            this.next();\r\n                            break;\r\n                        case 'ArrowLeft':\r\n                            this.prev();\r\n                            break;\r\n                        case 'ArrowDown':\r\n                        case 'ArrowUp':\r\n                        case ' ':\r\n                            e.preventDefault();\r\n                            break;\r\n                        case 'Escape':\r\n                            this.hide();\r\n                            break;\r\n                    }\r\n                }\r\n            },\r\n            // This event shows the arrows and caption on the lightbox when the mouse is moved or clicked.\r\n            // Also used for touch events on touchscreen devices. The elements are set to disappear\r\n            // after a given duration via a timer.\r\n            mouseEventListener(e) {\r\n                if (this.visible) {\r\n                    var that = this;\r\n                    this.controlsVisible = true;\r\n                    clearTimeout(this.timer);\r\n                    this.timer = setTimeout(function() {that.controlsVisible = false}, that.timeoutDuration);\r\n                }\r\n            },\r\n            preloadNextImage () {\r\n                if (this.has_next()){\r\n                    try {\r\n                        var _img = new Image();\r\n                        _img.src = this.directory + this.filteredImages[this.index + 1].name;\r\n                    } catch (e) { }\r\n                }\r\n            }\r\n        },\r\n        computed: {\r\n            filteredImages: function () {\r\n                var that = this;\r\n                if (that.filter === 'all' || !that.filter.length){\r\n                    return that.images;\r\n                }\r\n                else {\r\n                    return that.images.filter(function (item) {\r\n                        return item.filter === that.filter;\r\n                    })\r\n                }\r\n            }\r\n        }\r\n    }\r\n</script>\r\n\r\n<style>\r\n    .lightbox {\r\n        position: fixed;\r\n        top: 0;\r\n        left: 0;\r\n        background: rgba(0, 0, 0, .9);\r\n        width: 100%;\r\n        height: 100%;\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: -webkit-flex;\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        z-index: 200;\r\n        color: rgba(255,255,255,0.8);\r\n    }\r\n\r\n    .lightbox-close {\r\n        position: fixed;\r\n        z-index: 210;\r\n        right: 0;\r\n        top: 0;\r\n        padding: 1rem;\r\n        font-size: 1.7rem;\r\n        cursor: pointer;\r\n        width: 4rem;\r\n        height: 4rem;\r\n        color: white;\r\n    }\r\n\r\n    .lightbox-main {\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: -webkit-flex;\r\n        display: flex;\r\n        width: 100%;\r\n        height: 100%;\r\n    }\r\n\r\n    .lightbox-arrow {\r\n        padding: 0 2rem;\r\n        cursor: pointer;\r\n        display: -webkit-box;\r\n        display: -ms-flexbox;\r\n        display: -webkit-flex;\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        position: absolute;\r\n        padding: 0 2rem;\r\n        height: 100%;\r\n        width: 2rem;\r\n        z-index: 100;\r\n    }\r\n\r\n    .lightbox-arrow-right { right: 0; }\r\n    \r\n    .lightbox-arrow-left { left: 0;}\r\n\r\n    .lightbox-image-container {\r\n        -webkit-box-flex: 1;\r\n        width: 20%;\r\n        -webkit-flex: 1;\r\n        -ms-flex: 1;\r\n        flex: 1;\r\n    }\r\n\r\n    .lightbox-image {\r\n        width: 100%;\r\n        height: 100%;\r\n        background-size: contain;\r\n        background-repeat: no-repeat;\r\n        background-position: 50% 50%;\r\n    }\r\n\r\n    .lightbox-caption {\r\n        position: absolute;\r\n        bottom: 15px;\r\n        width: 100%;\r\n        z-index: 100;\r\n        text-align: center;\r\n        text-shadow: 1px 1px 3px rgb(26, 26, 26);\r\n    }\r\n\r\n    .lightbox-caption span {\r\n        border-radius: 12px;\r\n        background-color: rgba(0, 0, 0, .6);\r\n        padding: 2px 10px;\r\n        -webkit-user-select: none;\r\n        -moz-user-select: none;\r\n        -ms-user-select: none;\r\n        user-select: none;\r\n    }\r\n\r\n    .lightbox-slide-next-enter-active,\r\n    .lightbox-slide-next-leave-active,\r\n    .lightbox-slide-prev-enter-active,\r\n    .lightbox-slide-prev-leave-active{\r\n        transition: all 0.4s ease;\r\n    }\r\n    \r\n    .lightbox-slide-next-enter {\r\n        -webkit-transform: translateX(100px);\r\n        -ms-transform: translateX(100px);\r\n        transform: translateX(100px);\r\n        opacity: 0;\r\n    }\r\n    \r\n    .lightbox-slide-next-leave-to {\r\n        -webkit-transform: translateX(-100px);\r\n        -ms-transform: translateX(-100px);\r\n        transform: translateX(-100px);\r\n        opacity: 0;\r\n    }\r\n    \r\n    .lightbox-slide-prev-enter {\r\n        -webkit-transform: translateX(-100px);\r\n        -ms-transform: translateX(-100px);\r\n        transform: translateX(-100px);\r\n        opacity: 0;\r\n    }\r\n    \r\n    .lightbox-slide-prev-leave-to {\r\n        -webkit-transform: translateX(100px);\r\n        -ms-transform: translateX(100px);\r\n        transform: translateX(100px);\r\n        opacity: 0;\r\n    }\r\n\r\n    .lightbox-fade-enter-active,\r\n    .lightbox-fade-leave-active {\r\n        transition: all 0.4s ease;\r\n    }\r\n\r\n    .lightbox-fade-enter,\r\n    .lightbox-fade-leave-to {\r\n        opacity: 0;\r\n    }\r\n    \r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var Lightbox = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('Lightbox', Lightbox);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

exports.default = Lightbox;
exports.install = install;
