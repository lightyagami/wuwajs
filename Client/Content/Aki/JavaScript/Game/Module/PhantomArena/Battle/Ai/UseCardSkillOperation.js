"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UseCardSkillOperation = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class UseCardSkillOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  async ExecuteAiOperation(e) {
    var a, r;
    0 !== this.Info.Gg1.length && (r = (a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).GetBattleCardIndexList(this.Info.Gg1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行卡牌buff操作", ["添加卡牌buff的索引", r], ["CardId", this.Info.jg1]), a.RefreshHandCardNum(a.HandCardNum - 1), r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.CreatePhantomCardData(this.Info.jg1, this.Info.Eg1), await e.OpponentArea.FunctionalArea.TryUseCardSkill(r), a.RefreshLibraryNum(this.Info.OM1), a.HandCardNum !== this.Info.Sg1 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "使用服务器数量", ["最终手牌数量", this.Info.Sg1], ["当前手牌数量", a.HandCardNum]), a.RefreshHandCardNum(this.Info.Sg1, !1), await e.OpponentArea.HandArea.RefreshHandCardNum(this.Info.Sg1)), r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.FightId, ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PushBuffEffectDataByNpc(r, this.Info, 29772))
  }
}
exports.UseCardSkillOperation = UseCardSkillOperation;
//# sourceMappingURL=UseCardSkillOperation.js.map