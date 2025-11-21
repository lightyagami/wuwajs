"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseCardSkillOperation = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class UseCardSkillOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    var a;
    var r;
    if (this.Info.hC1.length !== 0) {
      r = (a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).GetBattleCardIndexList(this.Info.hC1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行卡牌buff操作", ["添加卡牌buff的索引", r], ["CardId", this.Info.uC1]);
      }
      a.RefreshHandCardNum(a.HandCardNum - 1);
      r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.CreatePhantomCardData(this.Info.uC1, this.Info.Wg1);
      await e.OpponentArea.FunctionalArea.TryUseCardSkill(r);
      a.RefreshLibraryNum(this.Info.aE1);
      if (a.HandCardNum !== this.Info.Hg1) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "使用服务器数量", ["最终手牌数量", this.Info.Hg1], ["当前手牌数量", a.HandCardNum]);
        }
        a.RefreshHandCardNum(this.Info.Hg1, false);
        await e.OpponentArea.HandArea.RefreshHandCardNum(this.Info.Hg1);
      }
      r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.FightId;
      ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataByNpc(r, this.Info, 29772);
    }
  }
}
exports.UseCardSkillOperation = UseCardSkillOperation;
//# sourceMappingURL=UseCardSkillOperation.js.map