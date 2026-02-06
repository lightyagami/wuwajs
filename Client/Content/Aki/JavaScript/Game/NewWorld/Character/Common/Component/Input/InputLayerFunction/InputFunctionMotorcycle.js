"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisionSkill1SkillId = exports.motorcycleVisionSkill1OnRelease = exports.motorcycleVisionSkill1OnPress = undefined;
const Info_1 = require("../../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Global_1 = require("../../../../../../Global");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiBlueprintFunctionLibrary_1 = require("../../../../../../Module/BpBridge/UiBlueprintFunctionLibrary");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const InputDefine_1 = require("./InputDefine");
const InputFunctionCommon_1 = require("./InputFunctionCommon");
const pullCollectionMutexSkillIds = new Set([InputDefine_1.SKILL_ID_MOTORCYCLE_SHOW_VISION_ENTRY, InputDefine_1.SKILL_ID_MOTORCYCLE_CRUISE, InputDefine_1.SKILL_ID_MOTOCYCLE_PHOTOGRAPH, InputDefine_1.SKILL_ID_MOTOCYCLE_EAGLE_EYE]);
function visionSkill1Function(n, e = false) {
  var o = Global_1.Global.BaseCharacter;
  if (o) {
    o = o.CharacterActorComponent?.Entity?.GetComponent(242)?.VehicleEntity;
    if (o) {
      var l = o.GetComponent(217);
      if (l) {
        var r = (0, InputFunctionCommon_1.createInputCommandFromDataTable)(o.Id, 7, 1);
        if (r) {
          return r;
        }
        let n = 0;
        let i = 0;
        var r = o?.GetComponent(59);
        var t = r?.GetSkillIdByCurrentTarget();
        if (t) {
          n = t;
          i = 6004;
        }
        if (n === 0) {
          i = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
          t = PhantomUtil_1.PhantomUtil.GetVisionData(i);
          if ((n = t && t.类型 === 2 ? t.技能ID : n) === InputDefine_1.SKILL_ID_MOTORCYCLE_SHOW_VISION_ENTRY && l.HasAnyTag([-1330336472, -1699006823, 761126017, -1281364710])) {
            return;
          }
          if (pullCollectionMutexSkillIds.has(n) && l.HasTag(1376124731)) {
            return;
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "摩托车释放技能", ["skillId", n]);
        }
        if (n !== 0 && (e || ModelManager_1.ModelManager.ExploreSkillFlagModel.GetExploreSkillFlagEnable(n))) {
          ModelManager_1.ModelManager.RouletteModel.TrySendExploreToolGeneralUseLogData(i, n, r?.FocusTarget?.EntityConfigId);
          return (0, InputFunctionCommon_1.createSkillCommand)(o, n);
        } else {
          return undefined;
        }
      }
    }
  }
}
function motorcycleVisionSkill1OnPress(n) {
  if (!Info_1.Info.IsInTouch()) {
    return visionSkill1Function(n);
  }
}
function motorcycleVisionSkill1OnRelease(n) {
  if (Info_1.Info.IsInTouch() && !UiBlueprintFunctionLibrary_1.default.IsLongPressExploreButton()) {
    return visionSkill1Function(n);
  }
}
function getVisionSkill1SkillId(n = false) {
  n = visionSkill1Function(0, n);
  if (n) {
    return n.IntValue;
  }
}
exports.motorcycleVisionSkill1OnPress = motorcycleVisionSkill1OnPress;
exports.motorcycleVisionSkill1OnRelease = motorcycleVisionSkill1OnRelease;
exports.getVisionSkill1SkillId = getVisionSkill1SkillId; //# sourceMappingURL=InputFunctionMotorcycle.js.map