"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isComponentInstance = exports.RegisterComponent = exports.RegisterComponentFinish = undefined;
const Log_1 = require("../Common/Log");
const EntityComponent_1 = require("./EntityComponent");
let finish = false;
function RegisterComponentFinish() {
  finish = true;
}
function RegisterComponent(t) {
  return function (n) {
    if (finish) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "调用RegisterComponentFinish函数后不再允许注册组件", ["Type", n.name], ["id", t]);
      }
    } else {
      n.Id = t;
    }
    return n;
  };
}
function isComponentInstance(t, e) {
  if (t) {
    let n = t?.__proto__;
    while (n?.constructor && n instanceof EntityComponent_1.EntityComponent && n.constructor !== EntityComponent_1.EntityComponent) {
      var o = n.constructor.Id;
      if (o === undefined) {
        return false;
      }
      if (o === e) {
        return true;
      }
      n = n?.__proto__;
    }
  }
  return false;
}
exports.RegisterComponentFinish = RegisterComponentFinish;
exports.RegisterComponent = RegisterComponent;
exports.isComponentInstance = isComponentInstance; //# sourceMappingURL=RegisterComponent.js.map