"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSelectSkillInteract = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomArenaSkillInteractBase_1 = require("./PhantomArenaSkillInteractBase");
class PhantomArenaSelectSkillInteract extends PhantomArenaSkillInteractBase_1.PhantomArenaSkillInteractBase {
  constructor() {
    super(...arguments);
    this.os1 = new Map();
    this.ns1 = -1;
    this.$81 = 0;
  }
  URf() {
    let t = undefined;
    t = this.Data.IsFight ? ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardByCardId(this.Data.DataId) : ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(this.Data.DataId);
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    this.BattleProxy.SkillTriggerMask.ShowTriggerMask(i.ActiveSkillId);
    this.BattleProxy.SkillTriggerMask.RefreshSkill(i.Name, i.CardEffectDescription, i.CardEffectDescriptionParams);
  }
  xRf() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardByCardId(this.Data.DataId);
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    this.BattleProxy.SkillTriggerMask.ShowTriggerMask(t.ClickActiveSkillId);
    this.BattleProxy.SkillTriggerMask.RefreshSkill(i.Name, i.DurableSkillDescription, i.DurableSkillDescriptionParams);
  }
  BRf() {
    var t;
    var i;
    var a;
    this.BattleProxy.SkillTriggerMask.ShowTriggerMask(this.Data.DataId);
    if (this.Data.DataId) {
      i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardByCardId(this.Data.DataId);
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(i.ConfigId);
      if (i.IsField) {
        i = t.PassiveSkillId.length > 0 ? t.CardEffectDescription : t.CountSkillDescription;
        a = t.PassiveSkillId.length > 0 ? t.CardEffectDescriptionParams : t.CountSkillDescriptionParams;
        this.BattleProxy.SkillTriggerMask.RefreshSkill(t.Name, i, a);
      } else {
        this.BattleProxy.SkillTriggerMask.RefreshSkill(t.Name, t.CardEffectDescription, t.CardEffectDescriptionParams);
      }
    }
  }
  kRf() {
    var t;
    var i;
    var a;
    var e;
    this.BattleProxy.SkillTriggerMask.ShowTriggerMask(this.Data.DataId);
    if (this.Data.DataId) {
      e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
      t = (e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e)).ActiveSkillId.indexOf(this.Data.DataId);
      i = e.SkillNameList[t];
      a = e.SkillDescList[t];
      e = e.SkillDescParamsList[t] ? e.SkillDescParamsList[t].ArrayString : [];
      this.BattleProxy.SkillTriggerMask.RefreshSkill(i, a, e);
    }
  }
  qRf() {
    if (this.Data.IsRole) {
      this.kRf();
    } else if (this.Data.IsPassive) {
      this.BRf();
    } else if (this.Data.DataId) {
      if (this.Data.IsClickInteract) {
        this.xRf();
      } else {
        this.URf();
      }
    }
  }
  W81() {
    this.qRf();
    this.BattleProxy.SkillTriggerMask.RefreshTips(this.os1.size, this.$81);
    this.BattleProxy.SkillTriggerMask.RefreshCancelBtnActive(this.Data.IsPassive);
  }
  Q81() {
    var t = [0, 1];
    if (this.Data.IsRole) {
      t.push(2);
    }
    this.BattleProxy.CanvasManager.SortOrderAreaCanvas(t, this.Data, this);
  }
  async OnExecute(t) {
    var i = this.Data.SelectNum;
    if (i < 0) {
      if (await this.RequestSelectResultInfo([])) {
        return 0;
      } else {
        return 1;
      }
    } else {
      t.RegisterCantDragReason(5);
      this.$81 = Math.max(i, 1);
      await this.Info.StartSkillInteract?.();
      t.ShowLine();
      this.W81();
      this.Q81();
      return 2;
    }
  }
  async TryHandleFinish() {
    var t;
    return !!this.OnCheckCondition() && ((t = await this.OnHandleFinish()) && Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "结束执行Buff交互操作"), t);
  }
  av() {
    this.BattleProxy.HideLine();
    this.BattleProxy.SkillTriggerMask.HideTriggerMask();
    this.BattleProxy.CanvasManager.ResetAreaCanvas();
    for (const t of this.os1.values()) {
      this.BattleProxy.OwnArea.FunctionalArea.ResetCardSelectState(t);
    }
    this.BattleProxy.UnRegisterCantDragReason(5);
  }
  OnReceiveClickData(t, i, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "Buff期间,接收到卡牌点击", ["卡牌Id", t], ["是否选中", a]);
    }
    if (a && this.os1.size >= this.$81) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "Buff期间,已经选择的卡牌数量达到上限,无法再选择");
      }
      return false;
    } else {
      if (a) {
        this.os1.set(t, i);
        this.ns1 = t;
      } else {
        this.os1.delete(t);
      }
      this.BattleProxy.SkillTriggerMask.RefreshTips(this.os1.size, this.$81);
      return true;
    }
  }
  OnCheckCondition() {
    return this.os1.size >= this.$81;
  }
  async OnHandleFinish() {
    var t;
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.GetFightIdList(Array.from(this.os1.keys()));
    var i = await this.RequestSelectResultInfo(i);
    if (i) {
      this.av();
      this.Info.FinishSkillInteract?.();
    } else if (this.ns1 === -1) {
      t = this.os1.get(this.ns1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行Buff交互操作失败,回滚上一次选择的道具", ["CardId", this.ns1]);
      }
      this.BattleProxy.OwnArea.FunctionalArea.ResetCardSelectState(t);
    }
    return i;
  }
  ReceiveClickData(t, ...i) {
    if (t === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "取消执行Buff交互操作");
      }
      this.av();
      this.Info.CancelSkillInteract?.();
      return true;
    } else if (t === 1) {
      this.TryHandleFinish();
      return true;
    } else {
      return this.OnReceiveClickData(i[0], i[1], i[2]);
    }
  }
}
exports.PhantomArenaSelectSkillInteract = PhantomArenaSelectSkillInteract;
//# sourceMappingURL=PhantomArenaSelectSkillInteract.js.map