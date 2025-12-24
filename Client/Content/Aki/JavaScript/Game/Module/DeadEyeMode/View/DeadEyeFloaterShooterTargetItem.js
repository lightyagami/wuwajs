"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadEyeFloaterShooterTargetItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const CommonMarkItem_1 = require("../../../LevelGamePlay/Common/CommonMarkItem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class DeadEyeFloaterShooterTargetItem extends CommonMarkItem_1.CommonMarkItem {
  constructor(e, t, s) {
    super(e);
    this.AimRange = t;
    this.TargetEntity = s;
    this.Ocm = false;
    this.D5f = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.D5f = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.UpdatePositionAndRotation();
    this.GetItem(0).SetUIActive(false);
    this.Ocm = false;
  }
  async OnBeforeHideAsync() {
    var e;
    if (this.IsLocked) {
      e = new CustomPromise_1.CustomPromise();
      await this.D5f?.PlaySequenceAsync("Close", e);
    }
  }
  OnTick(e) {
    var t;
    if (this.RootItem && !this.IsCreateOrCreating && (t = Global_1.Global.CharacterController)) {
      UE.GameplayStatics.D_ProjectWorldToScreen(t, this.TargetPosition, this.ScreenPositionRef);
      t = (0, puerts_1.$unref)(this.ScreenPositionRef);
      this.ScreenPosition.Set(t.X, t.Y);
      t = ModelManager_1.ModelManager.BattleUiModel;
      this.ScreenPosition.MultiplyEqual(t.ScreenPositionScale).AdditionEqual(t.ScreenPositionOffset).MultiplyEqual(this.PointTransport);
      t = this.ScreenPosition.AdditionEqual(this.Center);
      this.RootItem.SetAnchorOffset(t.ToUeVector2D());
      if (!this.IsLocked) {
        t = this.RootItem.GetAnchorOffset();
        if (this.KKm(t)) {
          this.m7c();
          this.Ocm = true;
        }
      }
      this.GetItem(0).SetUIActive(this.IsLocked);
    }
  }
  async PlayClickSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.D5f?.PlaySequenceAsync("Click", e);
  }
  KKm(e) {
    var t = this.AimRange.X * 0.5;
    var s = this.AimRange.Y * 0.5;
    return e.X >= -t && e.X <= t && e.Y >= -s && e.Y <= s;
  }
  m7c() {
    if (!this.IsLocked) {
      if (this.TargetEntity) {
        ModelManager_1.ModelManager.DeadEyeModeModel.RecordLockedTarget(this.TargetEntity);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DeadEyeModeTargetPointLocked);
      this.D5f?.PlayLevelSequenceByName("Start");
    }
  }
  get IsLocked() {
    return this.Ocm;
  }
}
exports.DeadEyeFloaterShooterTargetItem = DeadEyeFloaterShooterTargetItem;
//# sourceMappingURL=DeadEyeFloaterShooterTargetItem.js.map