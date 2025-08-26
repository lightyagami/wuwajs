"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MechanismTimelineModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MechanismEventCenter_1 = require("./MechanismEvent/MechanismEventCenter");
class MechanismTimelineModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.$Fu = new WeakMap();
  }
  OnInit() {
    var e = super.OnInit();
    MechanismEventCenter_1.MechanismEventCenter.RegisterEvents();
    return e;
  }
  OnClear() {
    MechanismEventCenter_1.MechanismEventCenter.Clear();
    return super.OnClear();
  }
  RegisterSequenceContext(e, t) {
    if (e?.IsValid()) {
      this.$Fu.set(e, t);
    }
  }
  UnRegisterSequenceContext(e) {
    if (e?.IsValid()) {
      this.$Fu.delete(e);
    }
  }
  GetContextByPlayer(e) {
    return this.$Fu.get(e);
  }
}
exports.MechanismTimelineModel = MechanismTimelineModel;
//# sourceMappingURL=MechanismTimelineModel.js.map