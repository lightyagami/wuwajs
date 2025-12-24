"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleServerActionQueue = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../Core/Container/Queue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomArenaPassiveSkillTriggerLogic_1 = require("../SkillInteract/PhantomArenaPassiveSkillTriggerLogic");
class PhantomArenaBattleServerActionQueue {
  constructor(o) {
    this.Proxy = o;
    this.ActionQueue = new Queue_1.Queue();
    this.IsInAction = false;
    this.IsInPause = false;
    this.HandleActionPromise = undefined;
  }
  PushFourTaskAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送4c任务,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器4c任务行为开始");
      }
      const o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      o.AddFourCostCard(a);
      const t = new CustomPromise_1.CustomPromise();
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
        o.CanShowFourCostView = false;
        this.Proxy.OwnArea.HandArea.AddCard([o.CoreCardId]);
        t.SetResult();
      });
      await t.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器4c任务行为完成");
      }
    });
  }
  PushChooseCardAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送抽卡行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器抽卡行为开始");
      }
      const t = new CustomPromise_1.CustomPromise();
      var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData;
      o.SelectNum = a.TG1;
      o.SetSelectCardDataList(a.Jg1);
      var o = {
        ConfirmFunc: async o => {
          if (await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardSelect(o)) {
            t.SetResult();
            this.Proxy.ChooseCardPanel.SetActive(false);
          }
        },
        CardDataList: o.GetSelectCardDataList(),
        LimitCount: ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData.SelectNum,
        GuideType: "BvbSelectCard"
      };
      this.Proxy.ChooseCardPanel.SetChooseCardData(o);
      this.Proxy.ChooseCardPanel.SetActive(true);
      await t.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器抽卡行为完成");
      }
    });
  }
  PushDiscardCardAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送弃牌行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器弃牌行为开始");
      }
      const t = new CustomPromise_1.CustomPromise();
      var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      o.DiscardCardNum = a.iG1;
      o.RefreshHandData(a.Jg1);
      var o = o.GetHandCardDataList().filter(o => !o.IsNoAllowDiscard);
      var o = {
        CardDataList: o,
        LimitCount: ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.DiscardCardNum,
        ConfirmFunc: async o => {
          await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleDiscardCard(o);
          this.Proxy.DiscardPanel.SetActive(false);
          t.SetResult();
        },
        TitleTips: "PhantomBattle_1168",
        SelectedTips: "PhantomBattle_1170"
      };
      this.Proxy.DiscardPanel.SetDiscardCardData(o);
      this.Proxy.DiscardPanel.SetActive(true);
      await t.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器弃牌行为完成");
      }
    });
  }
  PushReserveCardAction(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送保留卡行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器保留卡行为开始");
      }
      const t = new CustomPromise_1.CustomPromise();
      var o = e.zau;
      var a = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardDataList(e.Jg1);
      this.Proxy.DiscardPanel.SetDiscardCardData({
        CardDataList: a,
        LimitCount: o,
        ConfirmFunc: async o => {
          await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSelectReserveCard(o);
          this.Proxy.DiscardPanel.SetActive(false);
          await this.Proxy.OwnArea.HandArea.RecycleCard(o);
          t.SetResult();
        },
        TitleTips: "PhantomBattle_1171",
        SelectedTips: "PhantomBattle_1172"
      });
      this.Proxy.DiscardPanel.SetActive(true);
      await t.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器保留卡行为完成");
      }
    });
  }
  PushBattleCallCardAction(n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送召唤卡行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器召唤卡行为开始");
      }
      const t = new CustomPromise_1.CustomPromise();
      var o = n.Vxm;
      var a = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardDataList(n.Nxm);
      const e = n.jxm;
      this.Proxy.DiscardPanel.SetDiscardCardData({
        CardDataList: a,
        LimitCount: o,
        ConfirmFunc: async o => {
          o = await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCallCard(n.Fxm, o, e);
          this.Proxy.DiscardPanel.SetActive(false);
          t.SetResult(o);
        },
        TitleTips: "PhantomBattle_1167",
        SelectedTips: "PhantomBattle_1169",
        GuideType: "BvbSelectCard"
      });
      this.Proxy.DiscardPanel.SetActive(true);
      a = await t.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器召唤卡行为完成");
      }
      this.PushBattleCallCardShowAction(e, a);
      this.TryFinishGuide(n.Gxm);
    });
  }
  PushBattleCallCardShowAction(o, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送召唤卡展示行为,推送到行为队列中");
    }
    const a = t.map(o => o.kg1);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.AddWaitCallCardIdList(a);
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器召唤卡展示行为开始");
      }
      if (o === Protocol_1.Aki.Protocol.Qxm.Proto_Heap) {
        await this.Proxy.OwnArea.CallLibraryCardListToFight(t);
      } else {
        await this.Proxy.OwnArea.CallHandCardListToFight(t);
      }
      ModelManager_1.ModelManager.PhantomArenaBattleModel.RemoveWaitCallCardIdList(a);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器召唤卡展示行为完成");
      }
    });
  }
  PushReconstructCardAction(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送重构卡牌行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器重构卡牌行为开始");
      }
      const t = new CustomPromise_1.CustomPromise();
      var o = e.Vxm;
      var a = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardDataList(e.Nxm);
      this.Proxy.DiscardPanel.SetDiscardCardData({
        CardDataList: a,
        LimitCount: o,
        ConfirmFunc: async o => {
          o = await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleReconstructCard(e.Fxm, o);
          this.Proxy.DiscardPanel.SetActive(false);
          t.SetResult(o);
        },
        TitleTips: "PhantomBattle_1173",
        SelectedTips: "PhantomBattle_1174"
      });
      this.Proxy.DiscardPanel.SetActive(true);
      var a = await t.Promise;
      await this.Proxy.OwnArea.HandArea.ReconstructHandCardToRecycle(a);
      this.TryFinishGuide(e.Gxm);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器重构卡牌行为完成");
      }
    });
  }
  PushTriggerPassiveSkillInteractAction(o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送被动技能选择行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器被动技能选择行为开始");
      }
      await new PhantomArenaPassiveSkillTriggerLogic_1.PhantomArenaPassiveSkillTriggerLogic(o, this.Proxy).Execute();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器被动技能选择行为完成");
      }
    });
  }
  PushSkillEffectAction() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送技能效果行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器技能效果行为开始");
      }
      await this.Proxy.BuffEffectManager.ShowSkillEffect();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器技能效果行为完成");
      }
    });
  }
  PushFieldSkillEffectAction() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "推送领域技能效果行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器领域技能效果行为开始");
      }
      await this.Proxy.OwnArea.ShowField();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器领域技能效果行为完成");
      }
    });
  }
  PushCardDurableEmptyAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送卡牌耐久空通知,推送到行为队列中");
    }
    ModelManager_1.ModelManager.PhantomArenaBattleModel.AddWaitReconstructCardIdList([a.$g1]);
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器卡牌耐久空通知行为开始");
      }
      var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      var t = o.GetBattleCardByCardId(a.$g1);
      if (a.Bxm === Protocol_1.Aki.Protocol.Wxm.Proto_BackHeap) {
        o.RemoveCardToLibrary(a.$g1, a.kxm);
        await this.Proxy.OwnArea.FunctionalArea.RemoveCardToLibrary(t.Index);
      } else if (a.Bxm === Protocol_1.Aki.Protocol.Wxm.Proto_Destroy) {
        o.DestroyFightCard(a.$g1);
        await this.Proxy.OwnArea.FunctionalArea.DestroyCardByLibrary(t.Index);
      }
      ModelManager_1.ModelManager.PhantomArenaBattleModel.RemoveWaitReconstructCardIdList([a.$g1]);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器卡牌耐久空通知行为完成");
      }
    });
  }
  PushCountSkillEffectAction(o, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服推送卡牌计数表现,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器卡牌计数表现行为开始");
      }
      await this.Proxy.OwnArea.FunctionalArea.RefreshEffect(o, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器卡牌计数表现行为完成");
      }
    });
  }
  PushBattleResultAction(o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送战斗结果行为,推送到行为队列中");
    }
    this.AddActionQueue(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器战斗结果行为开始");
      }
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.TriggerPhantomBattleResultShow(o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器战斗结果行为完成");
      }
    });
  }
  PauseAction() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "执行服务器行为暂停");
    }
    this.IsInPause = true;
  }
  async ResumeAction() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "执行服务器行为恢复");
    }
    this.IsInPause = false;
    await this.HandleAction();
  }
  InAction() {
    return this.IsInAction;
  }
  async WaitHandleFinish() {
    await this.HandleActionPromise?.Promise;
  }
  async HandleAction() {
    if (!this.IsInAction && !this.IsInPause) {
      if (this.ActionQueue.Empty) {
        this.IsInAction = false;
        this.HandleActionPromise?.SetResult();
        this.HandleActionPromise = undefined;
      } else {
        this.IsInAction = true;
        var o = this.ActionQueue.Pop();
        if (o) {
          try {
            await o();
          } catch (o) {
            if (o instanceof Error) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.ErrorWithStack("PhantomArena", 10, "执行服务器行为队列异常", o, ["error", o.message]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("PhantomArena", 10, "执行服务器行为队列异常", ["error", o]);
            }
          }
        }
        this.IsInAction = false;
        await this.HandleAction();
      }
    }
  }
  AddActionQueue(o) {
    this.HandleActionPromise ||= new CustomPromise_1.CustomPromise();
    this.ActionQueue.Push(o);
    this.HandleAction();
  }
  TryFinishGuide(o, t) {
    o = {
      CardId: o
    };
    this.Proxy.GuideManager.TryFinishGuideByType("BvbUseItemCardSkill", o);
    this.Proxy.GuideManager.TryFinishGuideByType("BvbUseFieldCardSkill", o);
  }
}
exports.PhantomArenaBattleServerActionQueue = PhantomArenaBattleServerActionQueue;
//# sourceMappingURL=PhantomArenaBattleServerActionQueue.js.map