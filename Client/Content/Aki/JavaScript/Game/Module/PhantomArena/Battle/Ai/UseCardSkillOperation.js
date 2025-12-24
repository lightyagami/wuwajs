"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseCardSkillOperation = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class UseCardSkillOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "上阵变化卡牌", ["CardId", this.Info.uC1]);
    }
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    var r = a.HandCardNum - 1;
    a.RefreshHandCardNum(r, false);
    var i = a.CreatePhantomCardData(this.Info.uC1, this.Info.Wg1);
    if (ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Info.Wg1).Type === 3) {
      a.FieldData.SetCardData(i);
    }
    await Promise.all([e.OpponentArea.FunctionalArea.TryUseCardSkill(i), e.OpponentArea.HandArea.RefreshHandCardNum(r)]);
    a.RefreshCardLibraryNum(this.Info.aE1);
    if (a.HandCardNum !== this.Info.Hg1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "使用服务器数量", ["最终手牌数量", this.Info.Hg1], ["当前手牌数量", r]);
      }
      a.RefreshHandCardNum(this.Info.Hg1, false);
      await e.OpponentArea.HandArea.RefreshHandCardNum(this.Info.Hg1);
    }
    var i = a.FightId;
    ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataByNpc(i, this.Info, 29772, false);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "执行上阵变化卡牌附带效果", ["CardId", this.Info.uC1]);
    }
    await e.BuffEffectManager.ShowSkillEffect();
  }
}
exports.UseCardSkillOperation = UseCardSkillOperation;
//# sourceMappingURL=UseCardSkillOperation.js.map