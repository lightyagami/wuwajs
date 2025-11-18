"use strict";

var CollectComponent_1;
var __decorate = this && this.__decorate || function (e, t, o, n) {
  var l;
  var r = arguments.length;
  var c = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    c = Reflect.decorate(e, t, o, n);
  } else {
    for (var C = e.length - 1; C >= 0; C--) {
      if (l = e[C]) {
        c = (r < 3 ? l(c) : r > 3 ? l(t, o, c) : l(t, o)) || c;
      }
    }
  }
  if (r > 3 && c) {
    Object.defineProperty(t, o, c);
  }
  return c;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectComponent = undefined;
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
let CollectComponent = CollectComponent_1 = class CollectComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.IPa = false;
  }
  OnInitData(e) {
    e = e.GetParam(CollectComponent_1)[0];
    this.IPa = e.IsDisableOneClickCollection ?? false;
    return true;
  }
  GetIsDisableOneClickCollection() {
    return this.IPa;
  }
};
CollectComponent = CollectComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(258)], CollectComponent);
exports.CollectComponent = CollectComponent; //# sourceMappingURL=CollectComponent.js.map