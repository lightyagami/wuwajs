"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingCardOperation = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class SettingCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    var r = this.Info.cC1.Gg1;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "执行设置卡牌操作", ["放置索引", r.Qg1], ["CardId", r.$g1]);
    }
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    t.RefreshHandCardNum(this.Info.ZM1);
    t.SetBattleCardData(this.Info.cC1);
    await e.OpponentArea.FunctionalArea.TrySettingCard(r.$g1, r.Qg1);
  }
}
exports.SettingCardOperation = SettingCardOperation;
//# sourceMappingURL=SettingCardOperation.js.map