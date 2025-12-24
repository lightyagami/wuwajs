"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadEyeTargetItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const CommonMarkItem_1 = require("../../../LevelGamePlay/Common/CommonMarkItem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const TrackDefine_1 = require("../../Track/TrackDefine");
class DeadEyeTargetItem extends CommonMarkItem_1.CommonMarkItem {
  constructor(e, t, i) {
    super(e);
    this.AimRange = t;
    this.TargetEntity = i;
    this.cie = Rotator_1.Rotator.Create();
    this.OKm = false;
    this.Ocm = false;
    this.D5f = undefined;
    this.U5f = undefined;
    this.NKm = undefined;
  }
  get IsLocked() {
    return this.Ocm;
  }
  set IsLocked(e) {
    this.Ocm = e;
    this.Esf(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetItem(1);
    this.U5f = new LevelSequencePlayer_1.LevelSequencePlayer(e);
    var e = this.GetItem(2);
    this.D5f = new LevelSequencePlayer_1.LevelSequencePlayer(e);
    var e = this.GetItem(4);
    this.NKm = new LevelSequencePlayer_1.LevelSequencePlayer(e);
    this.UpdatePositionAndRotation();
    this.IsLocked = false;
  }
  OnAfterShow() {
    this.InRangeStateChanged(this.IsInRange(), true);
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    if (this.IsLocked) {
      await this.D5f?.PlaySequenceAsync("Close", e);
    } else {
      await this.U5f?.PlaySequenceAsync("Close", e);
    }
  }
  OnBeforeDestroy() {}
  OnTick(e) {
    if (this.RootItem && this.GetActive() && ModelManager_1.ModelManager.DeadEyeModeModel.ViewStartSequenceFinish && (super.OnTick(e), e = this.RootItem.GetAnchorOffset(), (e = this.KKm(e)) !== this.OKm)) {
      this.XKm(e);
    }
  }
  async PlayClickSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.D5f?.PlaySequenceAsync("Click", e);
  }
  OnScreenPositionChanged(e) {
    var t = this.GetItem(4);
    if (!e) {
      this.cie.Reset();
      this.cie.Yaw = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) * TrackDefine_1.RAD_2_DEG;
      t?.SetUIRelativeRotation(this.cie.ToUeRotator());
    }
  }
  InRangeStateChanged(e, t = false) {
    var i = this.GetItem(3);
    var s = this.GetItem(4);
    i?.SetUIActive(e);
    s?.SetUIActive(!e && !this.IsLocked);
    if (this.GetActive() && !this.IsHideOrHiding) {
      if (e) {
        if (this.IsLocked) {
          this.D5f?.PlayLevelSequenceByName(t ? "Start" : "ShowView");
        } else {
          this.U5f?.PlayLevelSequenceByName("Start");
        }
        this.NKm?.PlayLevelSequenceByName("Close");
      } else {
        (this.IsLocked ? this.D5f : this.U5f)?.PlayLevelSequenceByName("Close");
        this.NKm?.PlayLevelSequenceByName("Start");
      }
    }
  }
  XKm(e) {
    this.OKm = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DeadEyeModeTargetPointCanLockStateChange, this.OKm);
    this.m7c();
  }
  KKm(e) {
    var t = this.AimRange.X * 0.5;
    var i = this.AimRange.Y * 0.5;
    return e.X >= -t && e.X <= t && e.Y >= -i && e.Y <= i;
  }
  m7c() {
    if (!this.IsLocked) {
      if (ModelManager_1.ModelManager.DeadEyeModeModel.CheckEnergyEnoughLockTarget()) {
        this.IsLocked = true;
        if (this.TargetEntity) {
          ModelManager_1.ModelManager.DeadEyeModeModel.RecordLockedTarget(this.TargetEntity);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCommon", 18, "死眼跳台目标被锁定");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DeadEyeModeTargetPointLocked);
        this.D5f?.PlayLevelSequenceByName("Start");
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCommon", 18, "当前能量不足以再射一发子弹");
      }
    }
  }
  Esf(e) {
    this.GetItem(1)?.SetUIActive(!e);
    this.GetItem(2)?.SetUIActive(e);
    this.GetItem(6)?.SetUIActive(e);
    this.GetItem(5)?.SetUIActive(!e);
    if (e && this.TargetEntity) {
      ControllerHolder_1.ControllerHolder.DeadEyeModeController.EnableSingleEntityHighlight(this.TargetEntity, 2);
    }
  }
}
exports.DeadEyeTargetItem = DeadEyeTargetItem;
//# sourceMappingURL=DeadEyeTargetItem.js.map