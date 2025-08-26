"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventUsePhantomSkill = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUsePhantomSkill extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    if (e && ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
      var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (e.BlackboardPos !== undefined) {
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(r.Entity.Id, e.BlackboardPos.Key, e.BlackboardPos.Value.X ?? 0, e.BlackboardPos.Value.Y ?? 0, e.BlackboardPos.Value.Z ?? 0);
      }
      if (e.BlackboardRot !== undefined) {
        if (!Global_1.Global.BaseCharacter) {
          return;
        }
        ControllerHolder_1.ControllerHolder.BlackboardController.SetRotatorValueByEntity(r.Entity.Id, e.BlackboardRot.Key, e.BlackboardRot.Value.Y ?? 0, e.BlackboardRot.Value.X ?? 0, e.BlackboardRot.Value.Z ?? 0);
      }
      r.Entity.GetComponent(206).AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.SkillType));
    }
  }
}
exports.LevelEventUsePhantomSkill = LevelEventUsePhantomSkill;
//# sourceMappingURL=LevelEventUsePhantomSkill.js.map