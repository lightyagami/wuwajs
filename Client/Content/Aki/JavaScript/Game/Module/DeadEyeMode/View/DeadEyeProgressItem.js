"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadEyeProgressItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LERP_TIME = 1000;
class DeadEyeProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.zYm = undefined;
    this.JYm = undefined;
    this.l0u = undefined;
    this.CT1 = 1001;
    this.ezm = 0;
    this.C_g = false;
    this.Ucm = () => {
      var e = ModelManager_1.ModelManager.DeadEyeModeModel;
      var t = e.CurrentEnergy;
      e.CurrentEnergy -= ModelManager_1.ModelManager.DeadEyeModeModel.BulletConsumption;
      this.tzm(e.CurrentEnergy);
      this.CT1 = t === e.CurrentEnergy ? LERP_TIME : 0;
      this.ezm = this.JYm.GetValue();
      this.Xhf(true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DeadEye", 18, "Progress:OnLockedTarget", ["oldEnergy", t], ["ReduceSliderLerpStartValue", this.ezm], ["curEnergy", e.CurrentEnergy]);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UISliderComponent], [3, UE.UISliderComponent], [4, UE.UIItem]];
  }
  OnStart() {
    this.l0u = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.zYm = this.GetSlider(3);
    this.JYm = this.GetSlider(2);
    this.tzm(ModelManager_1.ModelManager.DeadEyeModeModel.CurrentEnergy);
    this.izm(ModelManager_1.ModelManager.DeadEyeModeModel.CurrentEnergy);
    this.Xhf(false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DeadEyeModeTargetPointLocked, this.Ucm);
  }
  OnAfterShow() {
    var e = new CustomPromise_1.CustomPromise();
    this.l0u?.PlaySequenceAsync("Start", e).then(() => {
      this.C_g = true;
    });
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    await this.l0u?.PlaySequenceAsync("Close", e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DeadEyeModeTargetPointLocked, this.Ucm);
  }
  OnTick(e) {
    var t;
    var s;
    if (this.C_g) {
      s = ModelManager_1.ModelManager.DeadEyeModeModel;
      t = e * TimeUtil_1.TimeUtil.Millisecond;
      t = s.TimeConsumption * t;
      s.CurrentEnergy = Math.max(0, s.CurrentEnergy - t);
      this.tzm(s.CurrentEnergy);
      if (this.CT1 <= LERP_TIME) {
        this.CT1 += e;
        t = this.CT1 / LERP_TIME;
        s = MathCommon_1.MathCommon.Lerp(this.ezm, this.zYm.GetValue(), t);
        this.rzm(s);
      } else if (this.JYm?.RootUIComp.IsUIActiveSelf()) {
        this.Xhf(false);
      }
    }
  }
  Xhf(e) {
    this.JYm?.RootUIComp.SetUIActive(e);
    this.GetItem(4)?.SetUIActive(e);
  }
  tzm(e) {
    this.ozm(e / ModelManager_1.ModelManager.DeadEyeModeModel.MaxEnergy);
  }
  izm(e) {
    this.rzm(e / ModelManager_1.ModelManager.DeadEyeModeModel.MaxEnergy);
  }
  ozm(e) {
    this.nzm(this.zYm, e);
  }
  rzm(e) {
    this.nzm(this.JYm, e);
  }
  nzm(e, t) {
    e?.SetValue(t);
  }
}
exports.DeadEyeProgressItem = DeadEyeProgressItem;
//# sourceMappingURL=DeadEyeProgressItem.js.map