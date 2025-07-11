"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlashGameplayController = undefined;
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
class SlashGameplayController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEntityBeSlashAim, this.db1);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEntityBeSlashAim, this.db1);
    this.rL1.clear();
    this._b1.clear();
    this.oL1.clear();
    return true;
  }
  static CheckGroups() {
    if (this._b1.size === 0) {
      return true;
    }
    for (const t of this.rL1) {
      let e = true;
      for (const r of t) {
        if (!this._b1.has(r)) {
          e = false;
          break;
        }
      }
      if (e) {
        return true;
      }
    }
    return false;
  }
  static AddGroupEntities(e) {
    this.rL1.add(e);
    var t = new Set();
    for (const r of this.oL1) {
      if (e.has(r)) {
        this._b1.add(r);
        t.add(r);
      }
    }
    for (const o of t) {
      this.oL1.delete(o);
    }
  }
  static RemoveGroupEntities(e) {
    this.rL1.delete(e);
  }
}
exports.SlashGameplayController = SlashGameplayController;
(_a = SlashGameplayController).rL1 = new Set();
SlashGameplayController._b1 = new Set();
SlashGameplayController.oL1 = new Set();
SlashGameplayController.db1 = (e, t) => {
  let r = false;
  for (const o of _a.rL1) {
    if (o.has(e)) {
      r = true;
      break;
    }
  }
  if (r || e.GetComponent(0)?.GetRemoveState()) {
    if (t) {
      _a._b1.add(e);
    } else {
      _a._b1.delete(e);
    }
  } else {
    _a.oL1.add(e);
  }
}; //# sourceMappingURL=SlashGameplayController.js.map