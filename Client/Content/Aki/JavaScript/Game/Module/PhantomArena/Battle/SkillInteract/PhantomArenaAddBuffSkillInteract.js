"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAddBuffSkillInteract = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine"),
  PhantomArenaSkillInteractBase_1 = require("./PhantomArenaSkillInteractBase");
class PhantomArenaAddBuffSkillInteract extends PhantomArenaSkillInteractBase_1.PhantomArenaSkillInteractBase {
  constructor() {
    super(...arguments), this.qn1 = new Map, this.Gn1 = -1, this._81 = 0
  }
  u81() {
    if (!this.Data.IsRole && this.Data.DataId) {
      let t = void 0;
      t = this.Data.LastCardIndex !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardByCardId(this.Data.DataId) : ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(this.Data.DataId);
      var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
      this.BattleProxy.SkillTriggerMask.ShowTriggerMask(i.ActiveSkillId), this.BattleProxy.SkillTriggerMask.RefreshSkill(i.Name, i.CardEffectDescription, i.CardEffectDescriptionParams)
    } else {
      var t, e, a;
      this.BattleProxy.SkillTriggerMask.ShowTriggerMask(this.Data.DataId), this.Data.DataId && (i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId, t = (i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(i)).ActiveSkillId.indexOf(this.Data.DataId), e = i.SkillNameList[t], a = i.SkillDescList[t], i = i.SkillDescParamsList[t] ? i.SkillDescParamsList[t].ArrayString : [], this.BattleProxy.SkillTriggerMask.RefreshSkill(e, a, i))
    }
    this.BattleProxy.SkillTriggerMask.RefreshTips(this.qn1.size, this._81)
  }
  c81() {
    var t = [0, 1];
    this.Data.IsRole && t.push(2), this.BattleProxy.CanvasManager.SortOrderAreaCanvas(t, this.Data, this)
  }
  async OnExecute(t) {
    var i = this.Data.SelectNum;
    return i < 0 ? await this.RequestSelectResultInfo([]) ? 0 : 1 : (this._81 = Math.max(i, 1), await this.Info.StartSkillInteract?.(), t.ShowLine(), this.u81(), this.c81(), t.RegisterCantDragReason(0), 2)
  }
  async TryHandleFinish() {
    var t;
    return !!this.OnCheckCondition() && ((t = await this.OnHandleFinish()) && Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "结束执行Buff交互操作"), t)
  }
  av() {
    this.BattleProxy.HideLine(), this.BattleProxy.SkillTriggerMask.HideTriggerMask(), this.BattleProxy.CanvasManager.ResetAreaCanvas();
    for (const t of this.qn1.values()) this.BattleProxy.OwnArea.FunctionalArea.ResetCardSelectState(t);
    this.BattleProxy.UnRegisterCantDragReason(0)
  }
  OnReceiveClickData(t, i, e) {
    return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "Buff期间,接收到卡牌点击", ["卡牌Id", t], ["是否选中", e]), e && this.qn1.size >= this._81 ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "Buff期间,已经选择的卡牌数量达到上限,无法再选择"), !1) : (e ? (this.qn1.set(t, i), this.Gn1 = t) : this.qn1.delete(t), this.BattleProxy.SkillTriggerMask.RefreshTips(this.qn1.size, this._81), !0)
  }
  OnCheckCondition() {
    return this.qn1.size >= this._81
  }
  async OnHandleFinish() {
    var t, i = ModelManager_1.ModelManager.PhantomArenaBattleModel.GetFightIdList(Array.from(this.qn1.keys())),
      i = await this.RequestSelectResultInfo(i);
    return i ? (this.av(), this.Info.FinishSkillInteract?.()) : -1 === this.Gn1 && (t = this.qn1.get(this.Gn1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行Buff交互操作失败,回滚上一次选择的道具", ["CardId", this.Gn1]), this.BattleProxy.OwnArea.FunctionalArea.ResetCardSelectState(t)), i
  }
  ReceiveClickData(t, ...i) {
    return 0 === t ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "取消执行Buff交互操作"), this.av(), this.Info.CancelSkillInteract?.(this.Data.LastCardIndex), !0) : 1 === t ? (this.TryHandleFinish(), !0) : this.OnReceiveClickData(i[0], i[1], i[2])
  }
}
exports.PhantomArenaAddBuffSkillInteract = PhantomArenaAddBuffSkillInteract;
//# sourceMappingURL=PhantomArenaAddBuffSkillInteract.js.map