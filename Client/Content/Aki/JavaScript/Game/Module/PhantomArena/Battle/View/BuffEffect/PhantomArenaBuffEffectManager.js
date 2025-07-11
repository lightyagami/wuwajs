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
  constructor(e) {
    this.Proxy = e;
  }
  ShowSkillEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.PopBuffEffectData();
    if (e) {
      if (e.Effect) {
        if (e.Effect.j7n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Effect.j7n, e.NotifyId);
          this.ShowSkillEffect();
        } else {
          Promise.all([this.N31(e), this.V31(e), this.j31(e), this.H31(e), this.$31(e)]);
        }
      } else {
        this.ShowSkillEffect();
      }
    }
  }
  async TriggerSkillEffectByNpc(e) {
    if (e.Effect) {
      if (e.Effect.j7n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Effect.j7n, e.NotifyId);
      } else {
        await Promise.all([this.N31(e), this.V31(e), this.j31(e), this.H31(e), this.$31(e)]);
      }
    }
  }
  async N31(e) {
    var t;
    if (e.Effect?.JM1) {
      (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).RefreshHandCardNum(e.Effect.JM1.ZM1, false);
      t.RefreshLibraryNum(e.Effect.JM1.jg1);
      await this.Proxy.OpponentArea.HandArea.RefreshHandCardNum(e.Effect.JM1.ZM1);
    }
  }
  V31(e) {
    var t;
    if (e.Effect?.iC1) {
      (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).RefreshCardLibraryNum(e.Effect.iC1.jg1);
      t.AddHandDataList(e.Effect.iC1.Jg1);
    }
  }
  j31(e) {
    if (e.Effect?.tD1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发添加buff效果");
      }
      new PhantomArenaBuffEffectAddBuff_1.PhantomArenaBuffEffectAddBuff(e, this).ShowBuffEffect();
    }
  }
  H31(e) {
    if (e.Effect?.EG1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发选牌效果");
      }
      new PhantomArenaBuffEffectChooseCard_1.PhantomArenaBuffEffectChooseCard(e, this).ShowChooseCard();
    }
  }
  async $31(e) {
    var t;
    if (e.Effect?.IG1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "触发抽牌效果");
      }
      (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).RefreshHandCardNum(e.Effect.IG1.ZM1);
      t.RefreshLibraryNum(e.Effect.IG1.jg1);
      await this.Proxy.OpponentArea.HandArea.RefreshHandCardNum(e.Effect.IG1.ZM1);
    }
  }
}
exports.PhantomArenaBuffEffectManager = PhantomArenaBuffEffectManager;
//# sourceMappingURL=PhantomArenaBuffEffectManager.js.map