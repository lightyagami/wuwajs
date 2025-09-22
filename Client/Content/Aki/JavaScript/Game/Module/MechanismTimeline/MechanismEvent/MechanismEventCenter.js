"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MechanismEventCenter = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MechanismEventAddTagToSelf_1 = require("./MechanismEventAddTagToSelf");
const MechanismEventFireBullet_1 = require("./MechanismEventFireBullet");
class MechanismEventCenter {
  static RegisterEvents() {
    var e = MechanismEventCenter.QLe;
    e("SeqEventAddTagToSelf", MechanismEventAddTagToSelf_1.MechanismEventAddTagToSelf);
    e("SeqEventFireBullet", MechanismEventFireBullet_1.MechanismEventFireBullet);
  }
  static Clear() {
    MechanismEventCenter.RNu.clear();
  }
  static GetEventClass(e) {
    return MechanismEventCenter.RNu.get(e);
  }
  static GetEventIsServerAction(e) {
    return MechanismEventCenter.SYc.get(e) ?? false;
  }
  static DeleteEvent(e, t, n, s) {
    return t === 3 && ((t = this.wNu.get(n)) ? t.delete(s) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "MechanismEventCenter.DeleteEvent,通过sequencePlayer获取EventStates失败", ["eventType", e], ["sequence", n.Sequence], ["sectionId", s]), false));
  }
}
(exports.MechanismEventCenter = MechanismEventCenter).RNu = new Map();
MechanismEventCenter.SYc = new Map();
MechanismEventCenter.wNu = new WeakMap();
MechanismEventCenter.QLe = (e, t, n = false) => {
  if (!MechanismEventCenter.RNu.has(e)) {
    MechanismEventCenter.RNu.set(e, t);
  }
  MechanismEventCenter.SYc.set(e, n);
}; //# sourceMappingURL=MechanismEventCenter.js.map