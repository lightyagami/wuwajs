"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSideEnergyHandle = exports.RoleSideEnergyBarInfo = undefined;
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoleSideEnergyUnit_1 = require("../HudUnit/RoleSideEnergyUnit");
const HudUnitUtils_1 = require("../Utils/HudUnitUtils");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const roleSideEnergyUnitClassMap = new Map([["UiItem_LupaEmerge", RoleSideEnergyUnit_1.RoleSideEnergyUnit]]);
class RoleSideEnergyBarInfo {
  constructor() {
    this.EntityId = 0;
    this.BuffCueConfig = undefined;
    this.RoleSideEnergyUnit = undefined;
  }
}
exports.RoleSideEnergyBarInfo = RoleSideEnergyBarInfo;
class RoleSideEnergyHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.Wst = undefined;
    this.E0 = 0;
    this.mic = new Map();
    this.fic = false;
    this.jma = new Vector2D_1.Vector2D();
    this.gic = false;
    this.Cic = (e, t, i, s) => {
      if (this.E0 === e) {
        if (i) {
          this.vic(t, s);
        } else {
          this.yic(s);
        }
      }
    };
    this.xie = () => {
      this.bl();
      this.Sic();
    };
    this.zpe = e => {
      for (var [t, i] of this.mic) {
        if (i.RoleSideEnergyUnit) {
          this.yic(t);
        }
      }
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.bl();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddRoleSideEnergyBar, this.Cic);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiRemoveRoleData, this.zpe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddRoleSideEnergyBar, this.Cic);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiRemoveRoleData, this.zpe);
  }
  Sic() {
    for (const e of this.mic.values()) {
      if (e.RoleSideEnergyUnit) {
        e.RoleSideEnergyUnit.SetVisible(e.EntityId === this.E0);
      }
    }
  }
  bl() {
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (e !== this.Wst) {
      if (e?.EntityHandle?.Valid) {
        this.Wst = e;
        this.E0 = e.EntityHandle.Entity?.Id ?? 0;
      } else {
        this.Wst = undefined;
        this.E0 = 0;
      }
      this.Mic();
    }
  }
  Mic() {
    if (this.Wst) {
      for (const t of this.Wst.EntityHandle.Entity.GetComponent(21).GetAllCurrentCueRef()) {
        var e = t.CueConfig;
        if (e.CueType === 20) {
          this.vic(e, t.BuffHandleId);
        }
      }
    }
  }
  vic(t, i) {
    if (!this.mic.has(i)) {
      const s = new RoleSideEnergyBarInfo();
      s.EntityId = this.E0;
      s.BuffCueConfig = t;
      this.mic.set(i, s);
      let e = roleSideEnergyUnitClassMap.get(t.Path);
      e = e || RoleSideEnergyUnit_1.RoleSideEnergyUnit;
      this.NewHudUnit(e, t.Path).then(e => {
        var t;
        if (e) {
          if (s.BuffCueConfig && (t = ModelManager_1.ModelManager.BattleUiModel?.GetRoleData(s.EntityId))) {
            (s.RoleSideEnergyUnit = e).InitInfo(s.BuffCueConfig, t);
            e.SetVisible(s.EntityId === this.E0);
          } else {
            this.DestroyHudUnit(e);
          }
        }
      }, () => {});
    }
  }
  yic(e) {
    var t = this.mic.get(e);
    if (t && (this.mic.delete(e), t.BuffCueConfig = undefined, t.RoleSideEnergyUnit)) {
      this.DestroyHudUnit(t.RoleSideEnergyUnit);
      t.RoleSideEnergyUnit = undefined;
    }
  }
  OnTick(e) {
    this.fic = false;
    for (const t of this.mic.values()) {
      if (t.RoleSideEnergyUnit && t.EntityId === this.E0 && (this.fic || (this.Eic(), this.fic = true), this.gic)) {
        t.RoleSideEnergyUnit.RefreshTargetPosition(e, this.jma);
      }
    }
  }
  Eic() {
    this.gic = false;
    var e = this.Wst?.EntityHandle?.Entity?.GetComponent(3);
    if (e && e.Actor?.IsValid()) {
      e = e.ActorLocation;
      this.gic = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(e, this.jma);
    }
  }
}
exports.RoleSideEnergyHandle = RoleSideEnergyHandle;
//# sourceMappingURL=RoleSideEnergyHandle.js.map