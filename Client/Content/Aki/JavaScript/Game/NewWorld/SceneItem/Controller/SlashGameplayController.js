"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SlashGameplayController = void 0;
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem");
class SlashGameplayController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEntityBeSlashAim, this.NT1), !0
  }
  static OnClear() {
    return EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEntityBeSlashAim, this.NT1), this.PR1.clear(), this.qT1.clear(), this.xR1.clear(), !0
  }
  static CheckGroups() {
    if (0 === this.qT1.size) return !0;
    for (const t of this.PR1) {
      let e = !0;
      for (const r of t)
        if (!this.qT1.has(r)) {
          e = !1;
          break
        } if (e) return !0
    }
    return !1
  }
  static AddGroupEntities(e) {
    this.PR1.add(e);
    var t = new Set;
    for (const r of this.xR1) e.has(r) && (this.qT1.add(r), t.add(r));
    for (const o of t) this.xR1.delete(o)
  }
  static RemoveGroupEntities(e) {
    this.PR1.delete(e)
  }
}
exports.SlashGameplayController = SlashGameplayController, (_a = SlashGameplayController).PR1 = new Set, SlashGameplayController.qT1 = new Set, SlashGameplayController.xR1 = new Set, SlashGameplayController.NT1 = (e, t) => {
  let r = !1;
  for (const o of _a.PR1)
    if (o.has(e)) {
      r = !0;
      break
    } r || e.GetComponent(0)?.GetRemoveState() ? t ? _a.qT1.add(e) : _a.qT1.delete(e) : _a.xR1.add(e)
};
//# sourceMappingURL=SlashGameplayController.js.map