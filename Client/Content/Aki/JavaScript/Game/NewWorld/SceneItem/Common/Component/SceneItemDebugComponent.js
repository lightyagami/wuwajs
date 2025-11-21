"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var r;
  var i = arguments.length;
  var c = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    c = Reflect.decorate(e, t, n, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (r = e[s]) {
        c = (i < 3 ? r(c) : i > 3 ? r(t, n, c) : r(t, n)) || c;
      }
    }
  }
  if (i > 3 && c) {
    Object.defineProperty(t, n, c);
  }
  return c;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemDebugComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let SceneItemDebugComponent = class SceneItemDebugComponent extends EntityComponent_1.EntityComponent {
  GetTagDebugStrings() {
    return this.Entity.GetComponent(200).GetTagDebugStrings();
  }
};
SceneItemDebugComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(130)], SceneItemDebugComponent);
exports.SceneItemDebugComponent = SceneItemDebugComponent; //# sourceMappingURL=SceneItemDebugComponent.js.map