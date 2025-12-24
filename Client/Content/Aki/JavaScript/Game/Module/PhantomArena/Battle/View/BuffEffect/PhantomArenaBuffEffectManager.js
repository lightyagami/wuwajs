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
          await this.oBm(a);
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
        await this.oBm(a);
      }
    }
  }
  async oBm(a) {
    await Promise.all([this.N31(a), this.V31(a), this.j31(a), this.H31(a), this.$31(a), this.nBm(a), this.sBm(a), this.aBm(a), this.hBm(a), this.cYm(a), this.dYm(a), this.Hif(a)]);
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
  async nBm(a) {
    var t;
    if (a.Effect?.Ixm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发复制效果");
      }
      if (a.Effect.Ixm?.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterPlayer) {
        t = a.Effect.Ixm.cC1;
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.AddCardListToFight(t);
        await this.Proxy.OwnArea.FunctionalArea.CopyCardListToFight(t);
      } else if (a.Effect.Ixm?.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterNpc) {
        t = a.Effect.Ixm.cC1;
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetBattleCardDataList(t);
        await this.Proxy.OpponentArea.FunctionalArea.CopyCardListToFight(t);
      }
    }
  }
  async sBm(a) {
    var t;
    var o;
    var e;
    var r;
    if (a.Effect?.Txm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发销毁效果");
      }
      t = a.Effect.Txm.cC1;
      if (a.Effect.Txm?.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterPlayer) {
        o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
        e = t.kg1;
        r = o.GetBattleCardByCardId(e);
        o.DestroyFightCard(e);
        await this.Proxy.OwnArea.FunctionalArea.DestroyCardByLibrary(r.Index);
      } else if (a.Effect.Txm?.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterNpc) {
        o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
        e = t.kg1;
        r = o.GetBattleCardByCardId(e);
        o.RemoveBattleCardDataByIndex(r.Index);
        await this.Proxy.OpponentArea.FunctionalArea.DestroyCardByIndex(r.Index);
      }
    }
  }
  aBm(a) {
    if (a.Effect?.bxm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发获取目标属性效果");
      }
      if (a.Effect.bxm.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterPlayer) {
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshCardAttr(a.Effect.bxm.Dxm, a.Effect.bxm.Uxm.Vg1);
      } else if (a.Effect.bxm.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterNpc) {
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshCardAttr(a.Effect.bxm.Dxm, a.Effect.bxm.Uxm.Vg1);
      }
    }
  }
  async hBm(a) {
    var t;
    var o;
    var e;
    if (a.Effect?.wxm) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发召唤卡效果");
      }
      if (a.Effect.wxm?.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterPlayer) {
        e = a.Effect.wxm.cC1;
        o = a.Effect.wxm.Lxm;
        (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).CallCardListToFight(e, o);
        t.RefreshCardLibraryNum(a.Effect.wxm.Pxm);
        if (o === Protocol_1.Aki.Protocol.Qxm.Proto_HandCard) {
          await this.Proxy.OwnArea.CallHandCardListToFight(e);
        } else if (o === Protocol_1.Aki.Protocol.Qxm.Proto_Heap) {
          await this.Proxy.OwnArea.CallLibraryCardListToFight(e);
        }
      } else if (a.Effect.wxm?.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterNpc) {
        t = a.Effect.wxm.cC1;
        o = a.Effect.wxm.Lxm;
        (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).SetBattleCardDataList(t);
        if (o === Protocol_1.Aki.Protocol.Qxm.Proto_HandCard) {
          e.RefreshHandCardNum(a.Effect.wxm.Axm);
          await this.Proxy.OpponentArea.CallHandCardListToFight(t);
        } else if (o === Protocol_1.Aki.Protocol.Qxm.Proto_Heap) {
          e.RefreshCardLibraryNum(a.Effect.wxm.Pxm);
          await this.Proxy.OpponentArea.CallLibraryCardListToFight(t);
        }
      }
    }
  }
  async M9m(a) {
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
  async E9m(a) {
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
  async cYm(a) {
    if (a.Effect?.Exm) {
      if ((a = a.Effect.Exm).nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterNpc) {
        await this.M9m(a);
      } else if (a.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterPlayer) {
        await this.E9m(a);
      }
    }
  }
  async dYm(a) {
    var t;
    if (a.Effect?.YKm) {
      if ((a = a.Effect.YKm).zKm) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发Npc直伤效果");
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshBattleHpStatus(a.ZKm, false);
        t = this.Proxy.OwnArea.RolePanel.GetRoleRootItem();
        await this.Proxy.OpponentArea.FunctionalArea.PlayDamageHitEffect(a.JKm, t);
        await this.Proxy.OwnArea.RolePanel.PlayBeHitEffect(-a.nAs);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发己方直伤效果");
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshBattleHpStatus(a.ZKm, false);
        t = this.Proxy.OpponentArea.RolePanel.GetRoleRootItem();
        await this.Proxy.OwnArea.FunctionalArea.PlayDamageHitEffect(a.JKm, t);
        await this.Proxy.OpponentArea.RolePanel.PlayBeHitEffect(-a.nAs);
      }
    }
  }
  async Hif(a) {
    var t;
    if (a.Effect?.Bif) {
      if ((a = a.Effect.Bif).nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterPlayer) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "触发己方重构效果");
        }
        (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).RemoveFightCardListToRecycle(a.$g1);
        t.RefreshCardLibraryNum(a.Pxm);
        await this.Proxy.OwnArea.FunctionalArea.ReconstructFightCardToRecycle(a.$g1);
        ModelManager_1.ModelManager.PhantomArenaBattleModel.RemoveWaitReconstructCardIdList(a.$g1);
      } else if (a.nys === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterNpc) {
        (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).RefreshCardLibraryNum(a.Pxm);
        if (a.h5n === Protocol_1.Aki.Protocol.b$f.Proto_FromTypeFighter) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "触发Npc重构场上效果");
          }
          t.RefreshCardLibraryNum(a.Pxm);
          t.RemoveFightCardListToRecycle(a.$g1);
          await this.Proxy.OpponentArea.FunctionalArea.ReconstructFightCardToRecycle(a.$g1);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "触发Npc重构手牌效果");
          }
          await this.Proxy.OpponentArea.HandArea.BackToRecycle(a.$g1.length);
          t.RefreshCardLibraryNum(a.Pxm);
          t.RefreshHandCardNum(a.T$f, false);
          await this.Proxy.OpponentArea.HandArea.RefreshHandCardNum(a.T$f);
        }
      }
    }
  }
}
exports.PhantomArenaBuffEffectManager = PhantomArenaBuffEffectManager;
//# sourceMappingURL=PhantomArenaBuffEffectManager.js.map