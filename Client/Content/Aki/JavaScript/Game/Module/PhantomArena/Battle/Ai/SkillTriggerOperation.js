"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillTriggerOperation = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class SkillTriggerOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.NewBuffEffectData(this.Info);
    await e.BuffEffectManager.TriggerSkillEffectByNpc(r);
  }
}
exports.SkillTriggerOperation = SkillTriggerOperation;
//# sourceMappingURL=SkillTriggerOperation.js.map