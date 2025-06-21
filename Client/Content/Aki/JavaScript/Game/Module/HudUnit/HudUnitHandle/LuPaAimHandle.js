"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LuPaAimHandle = void 0;
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LuPaAimUnit_1 = require("../HudUnit/LuPaAimUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  BUFF_ID = 12076110101;
class LuPaAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments), this.roi = !1, this.noi = void 0, this.rqo = void 0, this.oXe = !1, this.m1t = void 0, this.bst = void 0, this.p2a = 0, this.auu = void 0, this.xie = () => {
      this.uoi()
    }, this.huu = t => {
      this.auu = t, this.wke()
    }, this.lp1 = (t, i) => {
      this.oXe = i, this.oXe ? this.foi() : this._p1()
    }
  }
  OnInitialize() {
    super.OnInitialize(), this.uoi()
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpecialSkillLuPaSwitchLockTarget, this.huu)
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SpecialSkillLuPaSwitchLockTarget, this.huu)
  }
  _p1() {
    this.noi && this.noi.SetTargetVisible(this.oXe)
  }
  wke() {
    this.noi && (this.auu?.Valid ? this.noi.SetLockState(!0) : this.noi.SetLockState(!1))
  }
  uoi() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    1207 !== t?.CreatureRoleId ? this.poi() : (this.rqo = t.GameplayTagComponent.ListenForTagAddOrRemove(-307383857, this.lp1), this.oXe = t.GameplayTagComponent.HasTag(-307383857), this.m1t = t.BuffComponent, this.oXe && this.foi())
  }
  foi() {
    this.noi ? this._p1() : this.roi || (this.roi = !0, this.NewHudUnit(LuPaAimUnit_1.LuPaAimUnit, "UiItem_AimLuPa").then(t => {
      this.noi = t, this._p1(), this.wke()
    }).finally(() => {
      this.roi = !1
    }))
  }
  poi() {
    this.rqo && (this.rqo.EndTask(), this.rqo = void 0), this.m1t = void 0, this.oXe = !1, this.auu = void 0, this._p1()
  }
  OnTick(t) {
    super.OnTick(t), this.oXe && this.noi && this.m1t && (this.bst && this.m1t?.GetBuffByHandle(this.p2a) || (this.bst = this.m1t?.GetBuffById(BUFF_ID), this.p2a = this.bst?.Handle ?? 0), this.bst) && 0 < this.bst.Duration && this.noi.SetProgress(this.bst.GetRemainDuration() / this.bst.Duration)
  }
}
exports.LuPaAimHandle = LuPaAimHandle;
//# sourceMappingURL=LuPaAimHandle.js.map