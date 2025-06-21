"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SettingCardOperation = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class SettingCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  async ExecuteAiOperation(e) {
    var r = this.Info.Vg1.gg1,
      t = (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行设置卡牌操作", ["放置索引", r.Ig1], ["CardId", r.Mg1]), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData);
    t.RefreshHandCardNum(this.Info.wM1), t.SetBattleCardData(this.Info.Vg1), await e.OpponentArea.FunctionalArea.TrySettingCard(r.Mg1, r.Ig1)
  }
}
exports.SettingCardOperation = SettingCardOperation;
//# sourceMappingURL=SettingCardOperation.js.map