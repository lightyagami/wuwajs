"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncUtil = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const EntityHelper_1 = require("../../Core/Entity/EntityHelper");
const JsModelManager_1 = require("../../Core/Model/JsModelManager");
const AiConfig_1 = require("../AI/Common/AiConfig");
const CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
class AsyncUtil {
  static InitializeEnvironment() {
    if (!this.Sq_) {
      JsModelManager_1.JsModelManager.InitializeEnvironment();
      AiConfig_1.AiConfig.AsyncAiPerception = true;
      AiConfig_1.AiConfig.CppAsyncAiPerception = true;
      if (AiConfig_1.AiConfig.CppAsyncAiPerception) {
        var e = UE.NewArray(UE.BuiltinName);
        for (const t of EntityHelper_1.globalEntityTypeQueryName) {
          e.Add(new UE.FName(t));
        }
        cpp_1.FKuroAIPerceptionUtils.Initialize(e, 62, 1, 6, CharacterUnifiedStateTypes_1.ECharMoveState.Other, CharacterUnifiedStateTypes_1.ECharMoveState.Stand, CharacterUnifiedStateTypes_1.ECharMoveState.Walk, CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop, CharacterUnifiedStateTypes_1.ECharMoveState.Glide, CharacterUnifiedStateTypes_1.ECharPositionState.Ground, 0);
      }
      this.Sq_ = true;
    }
  }
  static DestroyEnvironment() {
    if (this.Sq_) {
      cpp_1.FKuroAIPerceptionUtils.Clear();
      JsModelManager_1.JsModelManager.DestroyEnvironment();
      this.Sq_ = false;
    }
  }
}
(exports.AsyncUtil = AsyncUtil).Sq_ = false;
//# sourceMappingURL=AsyncUtil.js.map