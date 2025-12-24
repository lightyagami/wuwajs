"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadEyeModeModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class DeadEyeModeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.A5f = 0;
    this.bcm = undefined;
    this.Rcm = [];
    this.UQm = [];
    this.EKm = [];
    this.RevertMaterialComponentsMaps = new Map();
    this.CharRenderingComponents = new Map();
    this.wcm = 0;
    this.IKm = 0.02;
    this.NHf = 0;
    this.Lcm = 0;
    this.CurrentEnergy = 0;
    this.TimeScaleTransitionTime = 0;
    this.TriggerEntityCreatureDataId = 0;
    this.FilterEffectPath = undefined;
    this.TargerNotLockDaPath = undefined;
    this.TargerLockedDaPath = undefined;
    this.FinishEvent = undefined;
    this.HideFollowShooterWhenFinish = true;
    this.LerpElapsedTime = 0;
    this.ViewStartSequenceFinish = false;
    this.DeadEyeFollowShooterConfig = undefined;
    this.HighlightDataLockedAsset = undefined;
    this.HighlightDataNotLockAsset = undefined;
  }
  get Type() {
    return this.A5f;
  }
  get CurDeadEyeModeStage() {
    return this.wcm;
  }
  get IsInDeadEyeMode() {
    return this.CurDeadEyeModeStage === 1 || this.CurDeadEyeModeStage === 2;
  }
  get MaxEnergy() {
    return this.NHf;
  }
  get BulletConsumption() {
    return this.bcm.BulletConsumption;
  }
  get TimeConsumption() {
    return this.bcm.TimeConsumption;
  }
  get SubCameraTag() {
    return this.Lcm;
  }
  get TimeScale() {
    return this.IKm;
  }
  OnLeaveLevel() {
    return !(this.HighlightDataLockedAsset = undefined);
  }
  StartDeadEyeMode(t, e, i, s, h, r, o, n, d) {
    this.A5f = t;
    this.bcm = e;
    this.IKm = r;
    this.Lcm = o ?? 0;
    this.NHf = i;
    this.CurrentEnergy = this.MaxEnergy;
    this.TimeScaleTransitionTime = s;
    this.TriggerEntityCreatureDataId = h;
    this.FilterEffectPath = n?.FilterEffect;
    this.TargerNotLockDaPath = n?.TargetIdleMaterialDa;
    this.TargerLockedDaPath = n?.TargetLockedMaterialDa;
    this.FinishEvent = d;
    this.LerpElapsedTime = 0;
    this.ViewStartSequenceFinish = false;
    this.RevertMaterialComponentsMaps.clear();
    this.CharRenderingComponents.clear();
  }
  EnterNextStage() {
    this.wcm++;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDeadEyeModeStageChange);
  }
  EndDeadEyeMode() {
    this.wcm = 0;
    this.Rcm.length = 0;
    this.EKm.length = 0;
    this.UQm.length = 0;
  }
  AddFocusEntity(t) {
    this.Rcm.push(t);
  }
  GetFocusEntities() {
    return this.Rcm;
  }
  AddTargetLocation(t) {
    this.UQm.push(t);
  }
  GetTargetLocations() {
    return this.UQm;
  }
  CheckEnergyEnoughLockTarget() {
    return this.CurrentEnergy >= this.BulletConsumption;
  }
  RecordLockedTarget(t) {
    this.EKm.push(t);
  }
  GetLockedEntities() {
    return this.EKm;
  }
}
exports.DeadEyeModeModel = DeadEyeModeModel;
//# sourceMappingURL=DeadEyeModeModel.js.map