"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBuffEffectManager = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PhantomArenaBuffEffectAddBuff_1 = require("./PhantomArenaBuffEffectAddBuff");
const PhantomArenaBuffEffectChooseCard_1 = require("./PhantomArenaBuffEffectChooseCard");
class PhantomArenaBuffEffectManager {
  constructor(a) {
    this.Proxy = a;
  }
  async ShowSkillEffect() {
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PopBuffEffectData();
    if (a) {
      if (a.Effect) {
        if (a.Effect.j7n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Effect.j7n, a.NotifyId);
          await this.ShowSkillEffect();
        } else {
          await this.ABm(a);
        }
      } else {
        await this.ShowSkillEffect();
      }
    }
  }
  async TriggerSkillEffectByNpc(a) {
    if (a.Effect) {
      if (a.Effect.j7n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Effect.j7n, a.NotifyId);
      } else {
        await this.ABm(a);
      }
    }
  }
  async ABm(a) {
    await Promise.all([this.N31(a), this.V31(a), this.j31(a), this.H31(a), this.$31(a), this.DBm(a), this.UBm(a), this.xBm(a), this.BBm(a), this.xJm(a), this.BJm(a), this.rnf(a)]);
  }
  async N31(a) {
    if (a.Effect?.iC1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发抽牌效果");
      }
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      t.RefreshCardLibraryNum(a.Effect.iC1.jg1);
      t.AddHandDataList(a.Effect.iC1.Jg1, false);
      var o = [];
      for (const e of a.Effect.iC1.Jg1) {
        o.push(e.$g1);
      }
      await this.Proxy.OwnArea.HandArea.AddCard(o);
    }
  }
  async V31(a) {
    var t;
    if (a.Effect?.JM1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发Npc抽牌效果");
      }
      (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).RefreshHandCardNum(a.Effect.JM1.ZM1, false);
      t.RefreshCardLibraryNum(a.Effect.JM1.jg1);
      await this.Proxy.OpponentArea.HandArea.RefreshHandCardNum(a.Effect.JM1.ZM1);
    }
  }
  j31(a) {
    if (a.Effect?.tD1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发添加buff效果");
      }
      new PhantomArenaBuffEffectAddBuff_1.PhantomArenaBuffEffectAddBuff(a, this).ShowBuffEffect();
    }
  }
  H31(a) {
    if (a.Effect?.EG1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发选牌效果");
      }
      new PhantomArenaBuffEffectChooseCard_1.PhantomArenaBuffEffectChooseCard(a, this).ShowChooseCard();
    }
  }
  async $31(a) {
    var t;
    if (a.Effect?.IG1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发Npc选牌效果");
      }
      (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).RefreshHandCardNum(a.Effect.IG1.ZM1, false);
      t.RefreshCardLibraryNum(a.Effect.IG1.jg1);
      await this.Proxy.OpponentArea.HandArea.RefreshHandCardNum(a.Effect.IG1.ZM1);
    }
  }
  async DBm(a) {
    var t;
    if (a.Effect?.zxm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发复制效果");
      }
      if (a.Effect.zxm?.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
        t = a.Effect.zxm.cC1;
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.AddCardListToFight(t);
        await this.Proxy.OwnArea.FunctionalArea.CopyCardListToFight(t);
        this.Proxy.OwnArea.HandArea.RefreshHandCardSequence();
      } else if (a.Effect.zxm?.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterNpc) {
        t = a.Effect.zxm.cC1;
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetBattleCardDataList(t);
        await this.Proxy.OpponentArea.FunctionalArea.CopyCardListToFight(t);
      }
    }
  }
  async UBm(a) {
    var t;
    var o;
    var e;
    var r;
    if (a.Effect?.Jxm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发销毁效果");
      }
      t = a.Effect.Jxm.cC1;
      if (a.Effect.Jxm?.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
        o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
        e = t.kg1;
        r = o.GetBattleCardByCardId(e);
        o.DestroyFightCard(e);
        await this.Proxy.OwnArea.FunctionalArea.DestroyCardByLibrary(r.Index);
        this.Proxy.OwnArea.HandArea.RefreshHandCardSequence();
      } else if (a.Effect.Jxm?.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterNpc) {
        o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
        e = t.kg1;
        r = o.GetBattleCardByCardId(e);
        o.RemoveBattleCardDataByIndex(r.Index);
        await this.Proxy.OpponentArea.FunctionalArea.DestroyCardByIndex(r.Index);
      }
    }
  }
  xBm(a) {
    if (a.Effect?.Zxm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发获取目标属性效果");
      }
      if (a.Effect.Zxm.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshCardAttr(a.Effect.Zxm.nBm, a.Effect.Zxm.sBm.Vg1);
      } else if (a.Effect.Zxm.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterNpc) {
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshCardAttr(a.Effect.Zxm.nBm, a.Effect.Zxm.sBm.Vg1);
      }
    }
  }
  async BBm(a) {
    var t;
    var o;
    var e;
    if (a.Effect?.tBm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发召唤卡效果");
      }
      if (a.Effect.tBm?.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
        e = a.Effect.tBm.cC1;
        o = a.Effect.tBm.iBm;
        (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).CallCardListToFight(e, o);
        t.RefreshCardLibraryNum(a.Effect.tBm.rBm);
        if (o === Protocol_1.Aki.Protocol.yBm.Proto_HandCard) {
          await this.Proxy.OwnArea.CallHandCardListToFight(e);
        } else if (o === Protocol_1.Aki.Protocol.yBm.Proto_Heap) {
          await this.Proxy.OwnArea.CallLibraryCardListToFight(e);
        }
        this.Proxy.OwnArea.HandArea.RefreshHandCardSequence();
      } else if (a.Effect.tBm?.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterNpc) {
        t = a.Effect.tBm.cC1;
        o = a.Effect.tBm.iBm;
        (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).SetBattleCardDataList(t);
        if (o === Protocol_1.Aki.Protocol.yBm.Proto_HandCard) {
          e.RefreshHandCardNum(a.Effect.tBm.oBm);
          await this.Proxy.OpponentArea.CallHandCardListToFight(t);
        } else if (o === Protocol_1.Aki.Protocol.yBm.Proto_Heap) {
          e.RefreshCardLibraryNum(a.Effect.tBm.rBm);
          await this.Proxy.OpponentArea.CallLibraryCardListToFight(t);
        }
      }
    }
  }
  async rHm(a) {
    var t;
    if (a.Tvm === Protocol_1.Aki.Protocol.Dvm.Suc) {
      if (a.Pvm) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发封印Npc领域效果");
        }
        if ((t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).FieldData?.IsInSeal ?? false) {
          t.RefreshFieldLockData(a.Rvm);
        } else {
          t.RefreshFieldLockData(a.Rvm, false);
          await this.Proxy.ShowNpcFieldSealEffect();
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发解封Npc领域效果");
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshFieldLockData(a.Rvm, false);
        await this.Proxy.ShowNpcFieldUnlockEffect();
      }
    }
  }
  async oHm(a) {
    var t;
    var o;
    if (a.Tvm === Protocol_1.Aki.Protocol.Dvm.Suc) {
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      if (a.Pvm) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发封印己方领域效果");
        }
        t.RefreshFieldLockData(a.Rvm);
        await this.Proxy.ShowOwnFieldSealEffect();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发解封己方领域效果");
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshFieldLockData(a.Rvm);
        await this.Proxy.ShowOwnFieldUnlockEffect();
      }
      if (o = t.FieldData?.CardData) {
        t.HandCardToFightCard(o, a.cC1);
      }
    } else if (a.Tvm === Protocol_1.Aki.Protocol.Dvm.Proto_Retrieve) {
      if (a.Pvm) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发封印己方回收效果");
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发解封己方回收效果");
      }
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshRecycleLockData(a.Rvm, false);
    }
  }
  async xJm(a) {
    if (a.Effect?.Yxm) {
      if ((a = a.Effect.Yxm).nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterNpc) {
        await this.rHm(a);
      } else if (a.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
        await this.oHm(a);
      }
    }
  }
  async BJm(a) {
    var t;
    if (a.Effect?.pzm) {
      if ((a = a.Effect.pzm).vzm) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发Npc直伤效果");
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshBattleHpStatus(a.Szm, false);
        t = this.Proxy.OwnArea.RolePanel.GetRoleRootItem();
        await this.Proxy.OpponentArea.FunctionalArea.PlayDamageHitEffect(a.yzm, t);
        await this.Proxy.OwnArea.RolePanel.PlayBeHitEffect(-a.nAs);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发己方直伤效果");
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshBattleHpStatus(a.Szm, false);
        t = this.Proxy.OpponentArea.RolePanel.GetRoleRootItem();
        await this.Proxy.OwnArea.FunctionalArea.PlayDamageHitEffect(a.yzm, t);
        await this.Proxy.OpponentArea.RolePanel.PlayBeHitEffect(-a.nAs);
      }
    }
  }
  async rnf(a) {
    var t;
    if (a.Effect?.Xof) {
      if ((a = a.Effect.Xof).nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterPlayer) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发己方重构效果");
        }
        (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).RemoveFightCardListToRecycle(a.$g1);
        t.RefreshCardLibraryNum(a.rBm);
        await this.Proxy.OwnArea.FunctionalArea.ReconstructFightCardToRecycle(a.$g1);
        ModelManager_1.ModelManager.PhantomArenaBattleModel.RemoveWaitReconstructCardIdList(a.$g1);
        this.Proxy.OwnArea.HandArea.RefreshHandCardSequence();
      } else if (a.nys === Protocol_1.Aki.Protocol.pBm.Proto_GamerFighterNpc) {
        (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).RefreshCardLibraryNum(a.rBm);
        if (a.h5n === Protocol_1.Aki.Protocol.cog.Proto_FromTypeFighter) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "触发Npc重构场上效果");
          }
          t.RefreshCardLibraryNum(a.rBm);
          t.RemoveFightCardListToRecycle(a.$g1);
          await this.Proxy.OpponentArea.FunctionalArea.ReconstructFightCardToRecycle(a.$g1);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "触发Npc重构手牌效果");
          }
          await this.Proxy.OpponentArea.HandArea.BackToRecycle(a.$g1.length);
          t.RefreshCardLibraryNum(a.rBm);
          t.RefreshHandCardNum(a.uog, false);
          await this.Proxy.OpponentArea.HandArea.RefreshHandCardNum(a.uog);
        }
      }
    }
  }
}
exports.PhantomArenaBuffEffectManager = PhantomArenaBuffEffectManager;
//# sourceMappingURL=PhantomArenaBuffEffectManager.js.map