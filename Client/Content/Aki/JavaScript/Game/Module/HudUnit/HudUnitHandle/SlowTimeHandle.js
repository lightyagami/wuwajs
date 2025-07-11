"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlowTimeHandle = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SlowTimeUnit_1 = require("../HudUnit/SlowTimeUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class SlowTimeHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.pTu = undefined;
    this.B9c = false;
    this.k9c = false;
    this.vTu = false;
    this.DP_ = false;
    this.wyu = (e, t) => {
      this.B9c = e === 5;
      this.O9c();
    };
    this.q9c = (e, t) => {
      if (e === 1) {
        this.k9c = t;
        this.O9c();
      }
    };
    this.Pni = (e, t, i) => {
      this.MTu();
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.k9c = ModelManager_1.ModelManager.BattleUiModel.GetRoleSpecialState(1);
  }
  OnDestroyed() {
    this.ETu();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.wyu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiRoleSpecialStateChanged, this.q9c);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(12, this.Pni);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddMaxListener(12, this.Pni);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.wyu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiRoleSpecialStateChanged, this.q9c);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(12, this.Pni);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveMaxListener(12, this.Pni);
  }
  O9c() {
    this.vTu = this.B9c || this.k9c;
    if (this.vTu) {
      this.yTu();
      this.pTu?.SetTranslucence(false);
    } else {
      this.STu();
      this.pTu?.SetTranslucence(true);
    }
  }
  MTu() {
    var e = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(12);
    var t = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(12);
    this.DP_ = e <= t;
    this.pTu?.UpdateProgress(t, e);
    this.STu();
  }
  yTu() {
    this.pTu ||= this.NewHudUnitWithReturn(SlowTimeUnit_1.SlowTimeUnit, "UiView_SlowMotionProgress", true, () => {
      this.MTu();
      if (!this.vTu) {
        this.pTu?.SetTranslucence(true);
      }
    });
  }
  STu() {
    if (!this.vTu && this.DP_) {
      this.ETu();
    }
  }
  ETu() {
    if (this.pTu) {
      this.DestroyHudUnit(this.pTu);
      this.pTu = undefined;
    }
  }
}
exports.SlowTimeHandle = SlowTimeHandle;
//# sourceMappingURL=SlowTimeHandle.js.map