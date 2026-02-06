"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImplementedInterfaces = exports.RegisterUiModelComponentImplements = undefined;
const Log_1 = require("../../../../Core/Common/Log");
function RegisterUiModelComponentImplements(...o) {
  return function (e) {
    if (e.Id < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiComponent", 97, "组件未注册, 请检查装饰器RegisterUiModelComponent注册顺序", ["componentName", e.name]);
      }
    } else {
      e.InterfacesMap.set(e.Id, o);
    }
    return e;
  };
}
function getImplementedInterfaces(e) {
  e = e.constructor;
  return e.InterfacesMap.get(e.Id) ?? [];
}
exports.RegisterUiModelComponentImplements = RegisterUiModelComponentImplements;
exports.getImplementedInterfaces = getImplementedInterfaces; //# sourceMappingURL=UiModelComponentInterface.js.map