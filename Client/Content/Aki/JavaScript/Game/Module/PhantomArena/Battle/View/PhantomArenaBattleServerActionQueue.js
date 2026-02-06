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
  constructor(t) {
    this.Proxy = t;
    this.ActionQueue = new Queue_1.Queue();
    this.IsInAction = false;
    this.IsInPause = false;
    this.HandleActionPromise = undefined;
  }
  PushFourTaskAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送4c任务,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器4c任务行为开始");
        }
        const t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
        t.AddFourCostCard(a);
        const o = new CustomPromise_1.CustomPromise();
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
          t.CanShowFourCostView = false;
          this.Proxy.OwnArea.HandArea.AddCard([t.CoreCardId]);
          o.SetResult();
        });
        await o.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器4c任务行为完成");
        }
      }],
      Type: 0
    });
  }
  PushChooseCardAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送抽卡行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器抽卡行为开始");
        }
        const o = new CustomPromise_1.CustomPromise();
        var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData;
        t.SelectNum = a.TG1;
        t.SetSelectCardDataList(a.Jg1);
        var t = {
          ConfirmFunc: async t => {
            if (await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardSelect(t)) {
              o.SetResult();
              this.Proxy.ChooseCardPanel.SetActive(false);
            }
          },
          CardDataList: t.GetSelectCardDataList(),
          LimitCount: ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData.SelectNum,
          GuideType: "BvbSelectCard"
        };
        this.Proxy.ChooseCardPanel.SetChooseCardData(t);
        this.Proxy.ChooseCardPanel.SetActive(true);
        await o.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器抽卡行为完成");
        }
      }],
      Type: 1
    });
  }
  PushDiscardCardAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送弃牌行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器弃牌行为开始");
        }
        const o = new CustomPromise_1.CustomPromise();
        var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
        t.DiscardCardNum = a.iG1;
        t.RefreshHandData(a.Jg1);
        var t = t.GetHandCardDataList().filter(t => !t.IsNoAllowDiscard);
        var t = {
          CardDataList: t,
          LimitCount: ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.DiscardCardNum,
          ConfirmFunc: async t => {
            await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleDiscardCard(t);
            this.Proxy.DiscardPanel.SetActive(false);
            o.SetResult();
          },
          TitleTips: "PhantomBattle_1168",
          SelectedTips: "PhantomBattle_1170"
        };
        this.Proxy.DiscardPanel.SetDiscardCardData(t);
        this.Proxy.DiscardPanel.SetActive(true);
        await o.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器弃牌行为完成");
        }
      }],
      Type: 2
    });
  }
  PushReserveCardAction(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送保留卡行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器保留卡行为开始");
        }
        const o = new CustomPromise_1.CustomPromise();
        var t = e.zau;
        var a = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardDataList(e.Jg1);
        this.Proxy.DiscardPanel.SetDiscardCardData({
          CardDataList: a,
          LimitCount: t,
          ConfirmFunc: async t => {
            await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSelectReserveCard(t);
            this.Proxy.DiscardPanel.SetActive(false);
            await this.Proxy.OwnArea.HandArea.RecycleCard(t);
            o.SetResult();
          },
          TitleTips: "PhantomBattle_1171",
          SelectedTips: "PhantomBattle_1172"
        });
        this.Proxy.DiscardPanel.SetActive(true);
        await o.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器保留卡行为完成");
        }
      }],
      Type: 3
    });
  }
  PushBattleCallCardAction(n) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送召唤卡行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器召唤卡行为开始");
        }
        const o = new CustomPromise_1.CustomPromise();
        var t = n.fBm;
        var a = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardDataList(n.mBm);
        const e = n.gBm;
        this.Proxy.DiscardPanel.SetDiscardCardData({
          CardDataList: a,
          LimitCount: t,
          ConfirmFunc: async t => {
            t = await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCallCard(n.dBm, t, e);
            this.Proxy.DiscardPanel.SetActive(false);
            o.SetResult(t);
          },
          TitleTips: "PhantomBattle_1167",
          SelectedTips: "PhantomBattle_1169",
          GuideType: "BvbSelectCard"
        });
        this.Proxy.DiscardPanel.SetActive(true);
        a = await o.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器召唤卡行为完成");
        }
        this.PushBattleCallCardShowAction(e, a);
        this.TryFinishGuide(n.cBm);
      }],
      Type: 4
    });
  }
  PushBattleCallCardShowAction(t, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送召唤卡展示行为,推送到行为队列中");
    }
    const a = o.map(t => t.kg1);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.AddWaitCallCardIdList(a);
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器召唤卡展示行为开始");
        }
        if (t === Protocol_1.Aki.Protocol.yBm.Proto_Heap) {
          await this.Proxy.OwnArea.CallLibraryCardListToFight(o);
        } else {
          await this.Proxy.OwnArea.CallHandCardListToFight(o);
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.RemoveWaitCallCardIdList(a);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器召唤卡展示行为完成");
        }
      }],
      Type: 5
    });
  }
  PushReconstructCardAction(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送重构卡牌行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器重构卡牌行为开始");
        }
        const o = new CustomPromise_1.CustomPromise();
        var t = e.fBm;
        var a = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardDataList(e.mBm);
        this.Proxy.DiscardPanel.SetDiscardCardData({
          CardDataList: a,
          LimitCount: t,
          ConfirmFunc: async t => {
            t = await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleReconstructCard(e.dBm, t);
            this.Proxy.DiscardPanel.SetActive(false);
            o.SetResult(t);
          },
          TitleTips: "PhantomBattle_1173",
          SelectedTips: "PhantomBattle_1174"
        });
        this.Proxy.DiscardPanel.SetActive(true);
        var a = await o.Promise;
        await this.Proxy.OwnArea.HandArea.ReconstructHandCardToRecycle(a);
        this.TryFinishGuide(e.cBm);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器重构卡牌行为完成");
        }
      }],
      Type: 6
    });
  }
  PushTriggerPassiveSkillInteractAction(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送被动技能选择行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器被动技能选择行为开始");
        }
        await new PhantomArenaPassiveSkillTriggerLogic_1.PhantomArenaPassiveSkillTriggerLogic(t, this.Proxy).Execute();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器被动技能选择行为完成");
        }
      }],
      Type: 7
    });
  }
  PushSkillEffectAction() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送技能效果行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器技能效果行为开始");
        }
        await this.Proxy.BuffEffectManager.ShowSkillEffect();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器技能效果行为完成");
        }
      }],
      Type: 8
    });
  }
  PushFieldSkillEffectAction() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "推送领域技能效果行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器领域技能效果行为开始");
        }
        await this.Proxy.OwnArea.ShowField();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器领域技能效果行为完成");
        }
      }],
      Type: 9
    });
  }
  PushCardDurableEmptyAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送卡牌耐久空通知,推送到行为队列中");
    }
    ModelManager_1.ModelManager.PhantomArenaBattleModel.AddWaitReconstructCardIdList([a.$g1]);
    this.AddActionQueue({
      ActionList: [async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器卡牌耐久空通知行为开始");
        }
        var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
        var o = t.GetBattleCardByCardId(a.$g1);
        if (a.hBm === Protocol_1.Aki.Protocol.vBm.Proto_BackHeap) {
          t.RemoveCardToLibrary(a.$g1, a.lBm);
          await this.Proxy.OwnArea.FunctionalArea.RemoveCardToLibrary(o.Index);
        } else if (a.hBm === Protocol_1.Aki.Protocol.vBm.Proto_Destroy) {
          t.DestroyFightCard(a.$g1);
          await this.Proxy.OwnArea.FunctionalArea.DestroyCardByLibrary(o.Index);
        }
        ModelManager_1.ModelManager.PhantomArenaBattleModel.RemoveWaitReconstructCardIdList([a.$g1]);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器卡牌耐久空通知行为完成");
        }
      }],
      Type: 10
    });
  }
  PushCountSkillEffectAction(t, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服推送卡牌计数表现,推送到行为队列中");
    }
    var a = async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器卡牌计数表现行为开始");
      }
      await this.Proxy.OwnArea.FunctionalArea.RefreshEffect(t, o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器卡牌计数表现行为完成");
      }
    };
    const e = this.ActionQueue.Get(this.ActionQueue.Size - 1);
    if (e && e.Type === 11) {
      for (const n of e.CardIdList) {
        if (t === n) {
          const e = {
            ActionList: [a],
            Type: 11,
            CardIdList: [t]
          };
          this.AddActionQueue(e);
          return;
        }
      }
      e.ActionList.push(a);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "服务器卡牌计数表现插入到最尾部已存在的行为列表中");
      }
    } else {
      const e = {
        ActionList: [a],
        Type: 11,
        CardIdList: [t]
      };
      this.AddActionQueue(e);
    }
  }
  PushBattleResultAction(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送战斗结果行为,推送到行为队列中");
    }
    this.AddActionQueue({
      ActionList: [() => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器战斗结果行为开始");
        }
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.TriggerPhantomBattleResultShow(t);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "执行服务器战斗结果行为完成");
        }
      }],
      Type: 12
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
        var t = this.ActionQueue.Pop();
        if (t) {
          try {
            var o = [];
            for (const a of t.ActionList) {
              o.push(a());
            }
            await Promise.all(o);
          } catch (t) {
            if (t instanceof Error) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.ErrorWithStack("PhantomArena", 10, "执行服务器行为队列异常", t, ["error", t.message]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("PhantomArena", 10, "执行服务器行为队列异常", ["error", t]);
            }
          }
        }
        this.IsInAction = false;
        await this.HandleAction();
      }
    }
  }
  AddActionQueue(t) {
    this.HandleActionPromise ||= new CustomPromise_1.CustomPromise();
    this.ActionQueue.Push(t);
    this.HandleAction();
  }
  TryFinishGuide(t, o) {
    t = {
      CardId: t
    };
    this.Proxy.GuideManager.TryFinishGuideByType("BvbUseItemCardSkill", t);
    this.Proxy.GuideManager.TryFinishGuideByType("BvbUseFieldCardSkill", t);
  }
}
exports.PhantomArenaBattleServerActionQueue = PhantomArenaBattleServerActionQueue;
//# sourceMappingURL=PhantomArenaBattleServerActionQueue.js.map