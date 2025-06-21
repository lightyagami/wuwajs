"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShowerModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
class ShowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.wlu = new Map, this.Alu = new Map, this.V$1 = 0, this.Rz1 = [], this.Lz1 = [], this.IsInShower = !1
  }
  get CurSelectPosIndex() {
    return this.V$1
  }
  get PosCount() {
    return this.Lz1.length
  }
  GetInviteNumString() {
    return this.wlu.size + "/" + this.PosCount
  }
  GetRoleInstanceByPos(e) {
    return this.wlu?.get(e)
  }
  SetShowerSeatConfigIds(e) {
    if (e && !this.IsInShower) {
      var t = ((Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity)?.GetComponent(229))?.Seat ?? -1;
      if (-1 === t) Log_1.Log.CheckError() && Log_1.Log.Error("Vehicle", 78, "共浴 玩家座位id undefined");
      else {
        this.Rz1 = e;
        for (let e = this.Lz1.length = 0; e < this.Rz1.length; ++e) e !== t && this.Lz1.push(e)
      }
    }
  }
  GetShowerSeatEntityByPos(e) {
    if (!(e >= this.PosCount)) {
      e = this.Rz1[this.Lz1[e]];
      if (0 !== e) {
        var t = new Array,
          e = (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(e, t), t[0]?.Entity);
        if (e) return e
      }
    }
  }
  RightPos() {
    this.V$1 >= this.PosCount - 1 ? this.V$1 = 0 : this.V$1 = this.V$1 + 1
  }
  LeftPos() {
    this.V$1 <= 0 ? this.V$1 = this.PosCount - 1 : this.V$1 = this.V$1 - 1
  }
  ChangePos(e) {
    e >= this.PosCount || e < 0 || (this.V$1 = e)
  }
  InviteRole(e) {
    var t, i, s, r = this.V$1;
    let h = -1;
    for ([t, i] of this.wlu.entries())
      if (i.GetRoleId() === e.GetRoleId()) {
        h = t;
        break
      } r === h ? this.wlu?.delete(r) : (s = this.wlu.get(r)) ? (this.wlu.set(r, e), -1 !== h && this.wlu.set(h, s)) : (this.wlu.delete(h), this.wlu.set(r, e))
  }
  GetRolePos(e) {
    for (var [t, i] of this.wlu.entries())
      if (i.GetRoleId() === e.GetRoleId()) return t;
    return -1
  }
  CheckRoleInCurPos(e) {
    return this.wlu.get(this.V$1)?.GetRoleId() === e.GetRoleId()
  }
  ExitAndClear() {
    this.Rz1.length = 0, this.Lz1.length = 0, this.wlu.clear(), this.Alu.clear(), this.IsInShower = !1, this.V$1 = 0, UiManager_1.UiManager.IsViewOpen("ShowerMainView") && UiManager_1.UiManager.CloseView("ShowerMainView"), UiManager_1.UiManager.IsViewOpen("ShowerInviteView") && UiManager_1.UiManager.CloseView("ShowerInviteView")
  }
  ClearCurInviteRoles() {
    this.wlu.clear(), this.V$1 = 0
  }
  ResetCurInviteRoles() {
    this.wlu.clear();
    for (var [e, t] of this.Alu.entries()) this.wlu.set(e, t)
  }
  SendAndSave() {
    this.IsInShower = !0;
    for (var [e, t] of this.Alu.entries()) this.wlu.has(e) || EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveRideSharingPassenger, t.GetRoleId(), this.Lz1[e]);
    for (var [i, s] of this.wlu.entries()) EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeRideSharingPassenger, s.GetRoleId(), this.Lz1[i]);
    this.Alu.clear();
    for (var [r, h] of this.wlu.entries()) this.Alu.set(r, h)
  }
}
exports.ShowerModel = ShowerModel;
//# sourceMappingURL=ShowerModel.js.map