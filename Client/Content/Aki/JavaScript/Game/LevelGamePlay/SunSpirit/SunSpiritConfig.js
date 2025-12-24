"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritConfig = undefined;
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
class SunSpiritConfig {
  constructor() {
    this.CrowdAiConfig = undefined;
    this.CrowdAiSystemIndex = 0;
    this.AroundPlayerPosQueryRadius = 200;
    this.AroundPlayerPosQueryBoidRadius = 25;
    this.AroundPlayerPosQueryMaxTryCount = 10;
    this.FlyingEffectMaxDist = 10000;
    this.FlyingEffectMinDist = 1;
    this.FlyingEffectUpdateFailMaxTimeSec = 1;
    this.FlyingEffectUpdateFailMaxCount = 3;
    this.FlyingEffectMaxFlyingDuration = 10;
    this.FlyingEffectDaPath = "/Game/Aki/Effect/EffectGroup/SA1Riling/DA_Fx_Group_Riling_Trail02.DA_Fx_Group_Riling_Trail02";
    this.FlyFromPlayerToGearInOrderFromMinToMax = true;
    this.FlyFromPlayerToGearDelayInterval = 0.15;
    this.FlyFromPlayerToGearWaitTimeBeforeFly = 1;
    this.FlyFromPlayerToGearSpeedForCalc = 500;
    this.FlyFromPlayerToGearDefaultDuration = 2;
    this.FlyFromGearToPlayerInOrderFromMinToMax = false;
    this.FlyFromGearToPlayerDelayInterval = 0.15;
    this.FlyFromGearToPlayerWaitTimeBeforeFly = 1;
    this.FlyFromGearToPlayerSpeedForCalc = 500;
    this.FlyFromGearToPlayerDefaultDuration = 2;
    this.FlyFromGearToPlayerMaxOffsetForReQueryTargetLoc = 400;
    this.LauncherHintUiAnchorOffset = Vector2D_1.Vector2D.Create(50, -100);
    this.LauncherHintUiPosLerpSpeed = Vector2D_1.Vector2D.Create(5, 5);
    this.CharacterHintUiAnchorOffset = Vector2D_1.Vector2D.Create(100, -100);
    this.CharacterHintUiPosLerpSpeed = Vector2D_1.Vector2D.Create(5, 5);
    this.CharacterHintUiShowDurationWhenUpdate = 3;
  }
  UpdateFromUeData(t) {
    this.CrowdAiConfig = t.CrowdAiConfig;
    this.CrowdAiSystemIndex = t.CrowdAiSystemIndex;
    this.AroundPlayerPosQueryRadius = t.AroundPlayerPosQueryRadius;
    this.AroundPlayerPosQueryBoidRadius = t.AroundPlayerPosQueryBoidRadius;
    this.AroundPlayerPosQueryMaxTryCount = t.AroundPlayerPosQueryMaxTryCount;
    this.FlyingEffectMaxDist = t.FlyingEffectMaxDist;
    this.FlyingEffectMinDist = t.FlyingEffectMinDist;
    this.FlyingEffectUpdateFailMaxTimeSec = t.FlyingEffectUpdateFailMaxTimeSec;
    this.FlyingEffectUpdateFailMaxCount = t.FlyingEffectUpdateFailMaxCount;
    this.FlyingEffectMaxFlyingDuration = t.FlyingEffectMaxFlyingDuration;
    this.FlyingEffectDaPath = t.FlyingEffectDa.ToAssetPathName();
    this.FlyFromPlayerToGearInOrderFromMinToMax = t.FlyFromPlayerToGearInOrderFromMinToMax;
    this.FlyFromPlayerToGearDelayInterval = t.FlyFromPlayerToGearDelayInterval;
    this.FlyFromPlayerToGearWaitTimeBeforeFly = t.FlyFromPlayerToGearWaitTimeBeforeFly;
    this.FlyFromPlayerToGearSpeedForCalc = t.FlyFromPlayerToGearSpeedForCalc;
    this.FlyFromPlayerToGearDefaultDuration = t.FlyFromPlayerToGearDefaultDuration;
    this.FlyFromGearToPlayerInOrderFromMinToMax = t.FlyFromGearToPlayerInOrderFromMinToMax;
    this.FlyFromGearToPlayerDelayInterval = t.FlyFromGearToPlayerDelayInterval;
    this.FlyFromGearToPlayerWaitTimeBeforeFly = t.FlyFromGearToPlayerWaitTimeBeforeFly;
    this.FlyFromGearToPlayerSpeedForCalc = t.FlyFromGearToPlayerSpeedForCalc;
    this.FlyFromGearToPlayerDefaultDuration = t.FlyFromGearToPlayerDefaultDuration;
    this.FlyFromGearToPlayerMaxOffsetForReQueryTargetLoc = t.FlyFromGearToPlayerMaxOffsetForReQueryTargetLoc;
    this.LauncherHintUiAnchorOffset.FromUeVector2D(t.LauncherHintUiAnchorOffset);
    this.LauncherHintUiPosLerpSpeed.FromUeVector2D(t.LauncherHintUiPosLerpSpeed);
    this.CharacterHintUiAnchorOffset.FromUeVector2D(t.CharacterHintUiAnchorOffset);
    this.CharacterHintUiPosLerpSpeed.FromUeVector2D(t.CharacterHintUiPosLerpSpeed);
    this.CharacterHintUiShowDurationWhenUpdate = t.CharacterHintUiShowDurationWhenUpdate;
  }
}
exports.SunSpiritConfig = SunSpiritConfig;
//# sourceMappingURL=SunSpiritConfig.js.map