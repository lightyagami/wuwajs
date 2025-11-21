"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowTimeHandle = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SlowTimeUnit_1 = require("../HudUnit/SlowTimeUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class SlowTimeHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.qTu = undefined;
    this.KHu = false;
    this.XHu = false;
    this.GTu = false;
    this.DP_ = false;
    this.MEu = (e, t) => {
      this.KHu = e === 5;
      this.YHu();
    };
    this.zHu = (e, t) => {
      if (e === 1) {
        this.XHu = t;
        this.YHu();
      }
    };
    this.Pni = (e, t, i) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "UpdateTimeScaleStrength", ["value", t], ["id", e]);
      }
      this.VTu();
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.XHu = ModelManager_1.ModelManager.BattleUiModel.GetRoleSpecialState(1);
  }
  OnDestroyed() {
    this.jTu();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiRoleSpecialStateChanged, this.zHu);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(12, this.Pni);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddMaxListener(12, this.Pni);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiRoleSpecialStateChanged, this.zHu);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(12, this.Pni);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveMaxListener(12, this.Pni);
  }
  YHu() {
    this.GTu = this.KHu || this.XHu;
    if (this.GTu) {
      this.FTu();
      this.qTu?.SetTranslucence(false);
    } else {
      this.NTu();
      this.qTu?.SetTranslucence(true);
    }
  }
  VTu() {
    var e = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(12);
    var t = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(12);
    this.DP_ = e <= t;
    this.qTu?.UpdateProgress(t, e);
    this.NTu();
  }
  FTu() {
    if (!this.qTu) {
      this.qTu = this.NewHudUnitWithReturn(SlowTimeUnit_1.SlowTimeUnit, "UiView_SlowMotionProgress", true, () => {
        this.VTu();
        if (!this.GTu) {
          this.qTu?.SetTranslucence(true);
        }
      });
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSlowTimeVisibleChanged, true);
    }
  }
  NTu() {
    if (!this.GTu && this.DP_) {
      this.jTu();
    }
  }
  jTu() {
    if (this.qTu) {
      this.DestroyHudUnit(this.qTu);
      this.qTu = undefined;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSlowTimeVisibleChanged, false);
    }
  }
}
exports.SlowTimeHandle = SlowTimeHandle;
//# sourceMappingURL=SlowTimeHandle.js.map