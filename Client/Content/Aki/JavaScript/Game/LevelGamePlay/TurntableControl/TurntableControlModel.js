"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TurntableControlModel = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class TurntableControlModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Vwe = undefined;
    this.Hwe = undefined;
  }
  get CurControllerEntity() {
    return this.Vwe;
  }
  get CurControllerEntityComp() {
    return this.Hwe;
  }
  SetCurControllerEntity(t) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    var e = t?.GetComponent(135);
    if (!e) {
      this.ClearCurControllerEntity();
    }
    this.Vwe = t;
    this.Hwe = e;
  }
  ClearCurControllerEntity() {
    this.Vwe = undefined;
    this.Hwe = undefined;
  }
  OnClear() {
    this.ClearCurControllerEntity();
    return true;
  }
}
exports.TurntableControlModel = TurntableControlModel;
//# sourceMappingURL=TurntableControlModel.js.map