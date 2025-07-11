"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityCreateSystem = undefined;
const FloroRanchEntityBase_1 = require("./FloroRanchEntityBase");
const FloroRanchEntityDefine_1 = require("./FloroRanchEntityDefine");
class FloroRanchEntityCreateSystem {
  static CreateFloroRanchEntity(t) {
    var e = (0, FloroRanchEntityDefine_1.getFloroRanchEntityComponentDefine)(t.h5n);
    var o = new FloroRanchEntityBase_1.FloroRanchEntityBase(t);
    for (const n of e.Components) {
      o.AddComponent(n);
    }
    o.Init();
    o.RefreshEntityData(t);
    return o;
  }
}
exports.FloroRanchEntityCreateSystem = FloroRanchEntityCreateSystem;
//# sourceMappingURL=FloroRanchEntityCreateSystem.js.map