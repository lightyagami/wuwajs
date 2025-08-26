"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectEffectPlayPerform = undefined;
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager");
const ItemInspectEffectBase_1 = require("./ItemInspectEffectBase");
class ItemInspectEffectPlayPerform extends ItemInspectEffectBase_1.ItemInspectEffectBase {
  Execute(e) {
    var t = ModelManager_1.ModelManager.ItemInspectModel.CurItemId;
    for (const r of e.Tags) {
      var a = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
      if (a) {
        SceneInteractionManager_1.SceneInteractionManager.Get().PlayExtraEffectByTag(t, a, false);
      }
    }
    this.FinishExecute(true);
  }
}
exports.ItemInspectEffectPlayPerform = ItemInspectEffectPlayPerform;
//# sourceMappingURL=ItemInspectEffectPlayPerform.js.map