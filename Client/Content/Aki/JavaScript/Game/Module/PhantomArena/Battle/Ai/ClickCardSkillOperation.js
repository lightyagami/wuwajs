"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickCardSkillOperation = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class ClickCardSkillOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(a) {
    super();
    this.Info = a;
  }
  async ExecuteAiOperation(a) {
    var e;
    if (this.Info.hC1.length !== 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "点击卡牌技能", ["CardId", this.Info.uC1]);
      }
      e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
      if (ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Info.Wg1).Type === 3) {
        await a.OpponentArea.FiledArea?.TriggerSkill();
      }
      e.RefreshCardLibraryNum(this.Info.aE1);
      if (e.HandCardNum !== this.Info.Hg1) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "使用服务器数量", ["最终手牌数量", this.Info.Hg1], ["当前手牌数量", e.HandCardNum]);
        }
        e.RefreshHandCardNum(this.Info.Hg1, false);
        await a.OpponentArea.HandArea.RefreshHandCardNum(this.Info.Hg1);
      }
      e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.FightId;
      ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataByNpc(e, this.Info, 24412, false);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行点击技能附带效果", ["CardId", this.Info.uC1]);
      }
      await a.BuffEffectManager.ShowSkillEffect();
    }
  }
}
exports.ClickCardSkillOperation = ClickCardSkillOperation;
//# sourceMappingURL=ClickCardSkillOperation.js.map