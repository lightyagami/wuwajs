"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventDeliverQuestBehavior = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventDeliverQuestBehavior extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(r, e) {
    if (r) {
      var l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r.EntityId);
      let e = "";
      if (l) {
        e = l.Entity.GetComponent(128)?.PawnName ?? "";
      }
      ControllerHolder_1.ControllerHolder.ItemDeliverController.OpenItemDeliverViewByHandInItem(r.Items, e, undefined, r.DescText);
    }
  }
}
exports.LevelEventDeliverQuestBehavior = LevelEventDeliverQuestBehavior;
//# sourceMappingURL=LevelEventDeliverQuestBehavior.js.map