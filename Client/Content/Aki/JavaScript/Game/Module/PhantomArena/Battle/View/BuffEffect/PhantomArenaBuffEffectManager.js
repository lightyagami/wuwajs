"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBuffEffectManager = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PhantomArenaBuffEffectAddBuff_1 = require("./PhantomArenaBuffEffectAddBuff"),
  PhantomArenaBuffEffectChooseCard_1 = require("./PhantomArenaBuffEffectChooseCard");
class PhantomArenaBuffEffectManager {
  constructor(e) {
    this.Proxy = e
  }
  ShowSkillEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PopBuffEffectData();
    e && (e.Effect ? e.Effect.j7n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Effect.j7n, e.NotifyId), this.ShowSkillEffect()) : Promise.all([this.l31(e), this._31(e), this.u31(e), this.c31(e), this.d31(e)]) : this.ShowSkillEffect())
  }
  async TriggerSkillEffectByNpc(e) {
    e.Effect && (e.Effect.j7n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Effect.j7n, e.NotifyId) : await Promise.all([this.l31(e), this._31(e), this.u31(e), this.c31(e), this.d31(e)]))
  }
  async l31(e) {
    var t;
    e.Effect?.LM1 && ((t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).RefreshHandCardNum(e.Effect.LM1.wM1, !1), t.RefreshLibraryNum(e.Effect.LM1.yg1), await this.Proxy.OpponentArea.HandArea.RefreshHandCardNum(e.Effect.LM1.wM1))
  }
  _31(e) {
    var t;
    e.Effect?.Ug1 && ((t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).RefreshCardLibraryNum(e.Effect.Ug1.yg1), t.AddHandDataList(e.Effect.Ug1.wg1))
  }
  u31(e) {
    e.Effect?.bx1 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "触发添加buff效果"), new PhantomArenaBuffEffectAddBuff_1.PhantomArenaBuffEffectAddBuff(e, this).ShowBuffEffect())
  }
  c31(e) {
    e.Effect?.W21 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "触发选牌效果"), new PhantomArenaBuffEffectChooseCard_1.PhantomArenaBuffEffectChooseCard(e, this).ShowChooseCard())
  }
  async d31(e) {
    var t;
    e.Effect?.Q21 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "触发抽牌效果"), (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).RefreshHandCardNum(e.Effect.Q21.wM1), t.RefreshLibraryNum(e.Effect.Q21.yg1), await this.Proxy.OpponentArea.HandArea.RefreshHandCardNum(e.Effect.Q21.wM1))
  }
}
exports.PhantomArenaBuffEffectManager = PhantomArenaBuffEffectManager;
//# sourceMappingURL=PhantomArenaBuffEffectManager.js.map