"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrengthHandle = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const StrengthUnit_1 = require("../HudUnit/StrengthUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const flyTag = -2027866845;
const motorcycleTag = 346080557;
class StrengthHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.vni = undefined;
    this.Rni = 0;
    this.X9e = undefined;
    this.ldt = [];
    this.xie = () => {
      StrengthHandle.kQe.Start();
      var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      if (this.X9e) {
        this.HDr(this.X9e);
      } else {
        this.vni.SetVisible(true);
      }
      this.c$e(t);
      if (this.vni) {
        this.vni.RefreshRoleData(t);
        this.zAl(t);
      }
      StrengthHandle.kQe.Stop();
    };
    this.zpe = (t, e) => {
      this.HDr(e);
    };
    this.UWi = (t, e) => {
      var i;
      if (this.vni) {
        i = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        this.zAl(i);
      }
    };
    this.VQ_ = (t, e) => {
      if (this.vni) {
        this.vni.SetVisible(!e, 1);
      }
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.NewHudUnit(StrengthUnit_1.StrengthUnit, "UiItem_PhysicalBar").then(t => {
      this.vni = t;
      if (this.vni) {
        if (t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()) {
          this.c$e(t);
          this.vni.RefreshRoleData(t);
          this.zAl(t);
        } else {
          this.vni.SetVisible(false);
        }
      }
    }, () => {});
  }
  OnDestroyed() {
    this.vni = undefined;
    if (this.X9e) {
      this.HDr(this.X9e);
    }
    super.OnDestroyed();
  }
  OnShowHud() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick, this.xie);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
  HDr(t) {
    this.m$e(t);
    this.Rni = 0;
    this.X9e = undefined;
  }
  c$e(t) {
    var e;
    if (t && (e = t.EntityHandle.Id, this.Rni !== e) && (this.Rni = e, this.X9e = t.EntityHandle, EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe), e = t.GameplayTagComponent)) {
      this.mdt(e, flyTag, this.UWi);
      this.mdt(e, motorcycleTag, this.UWi);
      this.mdt(e, -689911122, this.VQ_, true);
    }
  }
  m$e(t) {
    if (t?.Valid && this.Rni === t.Id) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      for (const e of this.ldt) {
        e.EndTask();
      }
      this.ldt.length = 0;
    }
  }
  mdt(t, e, i, s = false) {
    if (s && t.HasTag(e)) {
      i(e, true);
    }
    s = t.ListenForTagAddOrRemove(e, i, StrengthHandle.SYe);
    if (s) {
      this.ldt.push(s);
    }
  }
  zAl(t) {
    if (this.vni && (t = t?.GameplayTagComponent)) {
      if (t.HasTag(flyTag)) {
        this.vni.AddStrengthItem(2, 1);
        this.vni.SwapPlace(true);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("HudUnit", 17, "增加飞行体力条");
        }
      } else if (t.HasTag(motorcycleTag)) {
        this.vni.AddStrengthItem(3, 1);
        this.vni.SwapPlace(true);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("HudUnit", 17, "增加摩托车体力条");
        }
      } else {
        this.vni.SwapPlace(false);
      }
    }
  }
}
(exports.StrengthHandle = StrengthHandle).kQe = Stats_1.Stat.Create("[ChangeRole]StrengthHandle");
StrengthHandle.SYe = Stats_1.Stat.Create("[StrengthHandle]ListenTag"); //# sourceMappingURL=StrengthHandle.js.map