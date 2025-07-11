"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleServerActionQueue = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../Core/Container/Queue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class PhantomArenaBattleServerActionQueue {
  constructor(o) {
    this.Proxy = o;
    this.ActionQueue = new Queue_1.Queue();
    this.IsInAction = false;
    this.IsInPause = false;
  }
  PushFourTaskAction(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送4c任务,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器4c任务行为开始");
      }
      const o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      o.AddFourCostCard(e);
      const t = new CustomPromise_1.CustomPromise();
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
        o.CanShowFourCostView = false;
        this.Proxy.OwnArea.HandArea.AddCard(this.Proxy.GetOwnCardLibraryItem(), [o.CoreCardId]);
        t.SetResult();
      });
      await t.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器4c任务行为完成");
      }
    });
  }
  PushChooseCardAction(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送抽卡行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器抽卡行为开始");
      }
      const o = new CustomPromise_1.CustomPromise();
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData;
      t.SelectNum = e.TG1;
      t.SetSelectCardDataList(e.Jg1);
      this.Proxy.ChooseCardPanel.ConfirmFunc = () => {
        this.Proxy.BuffEffectManager.ShowSkillEffect();
        o.SetResult();
      };
      this.Proxy.ChooseCardPanel.SetActive(true);
      await o.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器抽卡行为完成");
      }
    });
  }
  PushDiscardCardAction(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送弃牌行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器弃牌行为开始");
      }
      const t = new CustomPromise_1.CustomPromise();
      var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      o.DiscardCardNum = e.iG1;
      o.RefreshHandData(e.Jg1);
      var o = o.GetHandCardDataList().filter(o => !o.IsFourCost);
      var o = {
        CardDataList: o,
        LimitCount: ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.DiscardCardNum,
        ConfirmFunc: async o => {
          await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleDiscardCard(o);
          this.Proxy.DiscardPanel.SetActive(false);
          t.SetResult();
        }
      };
      this.Proxy.DiscardPanel.SetDiscardCardData(o);
      this.Proxy.DiscardPanel.SetActive(true);
      await t.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器弃牌行为完成");
      }
    });
  }
  PushReserveCardAction(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "服务器推送保留卡行为,推送到行为队列中");
    }
    this.AddActionQueue(async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器保留卡行为开始");
      }
      const t = new CustomPromise_1.CustomPromise();
      var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData;
      o.InitSelectCardSaveData(a);
      var e = o.SelectCardSaveData.ReserveCardNum;
      var o = o.SelectCardSaveData.CardDataList;
      this.Proxy.DiscardPanel.SetDiscardCardData({
        CardDataList: o,
        LimitCount: e,
        ConfirmFunc: async o => {
          await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSelectReserveCard(o);
          this.Proxy.DiscardPanel.SetActive(false);
          await this.Proxy.OwnArea.HandArea.RecycleCard(this.Proxy.CardRecycle.GetRootItem(), o);
          t.SetResult();
        }
      });
      this.Proxy.DiscardPanel.SetActive(true);
      await t.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行服务器保留卡行为完成");
      }
    });
  }
  PauseAction() {
    this.IsInPause = true;
  }
  ResumeAction() {
    this.IsInPause = false;
    this.HandleAction();
  }
  async HandleAction() {
    var o;
    if (!this.IsInAction && !this.IsInPause) {
      if (this.ActionQueue.Empty) {
        this.IsInAction = false;
      } else {
        this.IsInAction = true;
        if (o = this.ActionQueue.Pop()) {
          await o();
        }
        this.IsInAction = false;
        await this.HandleAction();
      }
    }
  }
  AddActionQueue(o) {
    this.ActionQueue.Push(o);
    this.HandleAction();
  }
}
exports.PhantomArenaBattleServerActionQueue = PhantomArenaBattleServerActionQueue;
//# sourceMappingURL=PhantomArenaBattleServerActionQueue.js.map