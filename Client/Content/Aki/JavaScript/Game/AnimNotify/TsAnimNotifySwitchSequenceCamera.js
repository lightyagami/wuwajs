"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const CameraUtility_1 = require("../Camera/CameraUtility");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifySwitchSequenceCamera extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.生效客户端 = 0;
    this.特写镜头配置 = undefined;
    this.bResetLockOnCamera = false;
    this.AdditiveRotation = undefined;
    this.CameraAttachSocket = "";
    this.CameraDetectSocket = "";
    this.强制播放Sequence = false;
    this.ExtraDetectSphereRadius = -0;
    this.ExtraSphereLocation = undefined;
    this.IsShowExtraSphere = false;
    this.IsIgnoreCharacterCollision = false;
    this.DisableMovementInput = true;
    this.DisableLookAtInput = true;
    this.DisableMotionBlur = true;
    this.启用特定功能下的镜头配置 = false;
    this.特定功能下的镜头配置 = undefined;
    this.ShotBeforePlaying = false;
    this.ShotDuration = 5;
  }
  Constructor() {}
  K2_Notify(t, e) {
    const i = t.GetOwner();
    if (!(i instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i.EntityId);
    if (!t?.Valid) {
      return false;
    }
    if (!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(t)) {
      return false;
    }
    let r = undefined;
    let s = this.生效客户端;
    if (this.启用特定功能下的镜头配置 && (r = this.GetSpecificConfig())) {
      s = r.OverrideCondition;
    }
    return !!CameraUtility_1.CameraUtility.CheckCameraSequenceCondition(i, s) && (this.ShotBeforePlaying ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.GetSceneColorShotBeforeTonemapNow 1"), TimerSystem_1.TimerSystem.Next(() => {
      ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(this.特写镜头配置, this.bResetLockOnCamera, this.AdditiveRotation, i, FNameUtil_1.FNameUtil.GetDynamicFName(this.CameraAttachSocket), FNameUtil_1.FNameUtil.GetDynamicFName(this.CameraDetectSocket), this.ExtraSphereLocation, this.ExtraDetectSphereRadius, this.IsShowExtraSphere, this.IsIgnoreCharacterCollision, this.DisableMovementInput, this.DisableLookAtInput, this.DisableMotionBlur, this.强制播放Sequence, r);
    }), TimerSystem_1.TimerSystem.Delay(() => {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.ReleaseGetSceneColorShotBefore();
    }, this.ShotDuration)) : ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(this.特写镜头配置, this.bResetLockOnCamera, this.AdditiveRotation, i, FNameUtil_1.FNameUtil.GetDynamicFName(this.CameraAttachSocket), FNameUtil_1.FNameUtil.GetDynamicFName(this.CameraDetectSocket), this.ExtraSphereLocation, this.ExtraDetectSphereRadius, this.IsShowExtraSphere, this.IsIgnoreCharacterCollision, this.DisableMovementInput, this.DisableLookAtInput, this.DisableMotionBlur, this.强制播放Sequence, r), true);
  }
  GetNotifyName() {
    return "特写镜头";
  }
  GetSpecificConfig() {
    if (this.特定功能下的镜头配置) {
      var e = this.特定功能下的镜头配置.Num();
      for (let t = 0; t < e; t++) {
        var i = this.特定功能下的镜头配置.Get(t);
        if (i && i.SpecificType !== 0 && i.SpecificType === 1 && ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()) {
          return i;
        }
      }
    }
  }
}
exports.default = TsAnimNotifySwitchSequenceCamera;
//# sourceMappingURL=TsAnimNotifySwitchSequenceCamera.js.map