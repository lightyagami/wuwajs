"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.motorcycleVisionSkill1OnRelease = exports.motorcycleVisionSkill1OnPress = undefined;
const Info_1 = require("../../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Global_1 = require("../../../../../../Global");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiBlueprintFunctionLibrary_1 = require("../../../../../../Module/BpBridge/UiBlueprintFunctionLibrary");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const InputDefine_1 = require("./InputDefine");
const InputFunctionCommon_1 = require("./InputFunctionCommon");
function visionSkill1Function(n) {
  var o = Global_1.Global.BaseCharacter;
  if (o) {
    var o = o.CharacterActorComponent?.Entity;
    var i = o?.GetComponent(233)?.VehicleEntity;
    if (i) {
      var e = (0, InputFunctionCommon_1.createInputCommandFromDataTable)(i.Id, 7, 1);
      if (e) {
        return e;
      }
      e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
      if (e) {
        let n = 0;
        e = PhantomUtil_1.PhantomUtil.GetVisionData(e);
        if ((n = e && e.类型 === 2 ? e.技能ID : n) === InputDefine_1.SKILL_ID_HOOK && o?.GetComponent(102)?.CanActivateFixHook()) {
          n = InputDefine_1.SKILL_ID_FIX_HOOK_1;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 82, "Motorcycle VisionSkill1", ["skillId", n]);
        }
        if (n !== 0 && ModelManager_1.ModelManager.ExploreSkillFlagModel.GetExploreSkillFlagEnable(n)) {
          return (0, InputFunctionCommon_1.createSkillCommand)(i, n);
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
exports.motorcycleVisionSkill1OnPress = motorcycleVisionSkill1OnPress;
exports.motorcycleVisionSkill1OnRelease = motorcycleVisionSkill1OnRelease; //# sourceMappingURL=InputFunctionMotorcycle.js.map