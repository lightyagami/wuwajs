"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleServerActionQueue = void 0;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Queue_1 = require("../../../../../Core/Container/Queue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class PhantomArenaBattleServerActionQueue {
  constructor(o) {
    this.Proxy = o, this.ActionQueue = new Queue_1.Queue, this.IsInAction = !1, this.IsInPause = !1
  }
  PushFourTaskAction(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "服务器推送4c任务,推送到行为队列中");
    this.AddActionQueue(async () => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行服务器4c任务行为开始");
      const o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData,
        t = (o.AddFourCostCard(e), new CustomPromise_1.CustomPromise);
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaCoreCardView(() => {
        o.CanShowFourCostView = !1, this.Proxy.OwnArea.HandArea.AddCard(this.Proxy.GetOwnCardLibraryItem(), [o.CoreCardId]), t.SetResult()
      }), await t.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行服务器4c任务行为完成")
    })
  }
  PushChooseCardAction(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "服务器推送抽卡行为,推送到行为队列中");
    this.AddActionQueue(async () => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行服务器抽卡行为开始");
      const o = new CustomPromise_1.CustomPromise;
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.SelectCardData;
      t.SelectNum = e.K21, t.SetSelectCardDataList(e.wg1), this.Proxy.ChooseCardPanel.ConfirmFunc = () => {
        this.Proxy.BuffEffectManager.ShowSkillEffect(), o.SetResult()
      }, this.Proxy.ChooseCardPanel.SetActive(!0), await o.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行服务器抽卡行为完成")
    })
  }
  PushDiscardCardAction(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "服务器推送弃牌行为,推送到行为队列中");
    this.AddActionQueue(async () => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行服务器弃牌行为开始");
      const t = new CustomPromise_1.CustomPromise;
      var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData,
        o = (o.DiscardCardNum = e.T21, o.RefreshHandData(e.wg1), o.GetHandCardDataList().filter(o => !o.IsFourCost)),
        o = {
          CardDataList: o,
          LimitCount: ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.DiscardCardNum,
          ConfirmFunc: async o => {
            await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleDiscardCard(o), this.Proxy.DiscardPanel.SetActive(!1), t.SetResult()
          }
        };
      this.Proxy.DiscardPanel.SetDiscardCardData(o), this.Proxy.DiscardPanel.SetActive(!0), await t.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行服务器弃牌行为完成")
    })
  }
  PushReserveCardAction(a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "服务器推送保留卡行为,推送到行为队列中");
    this.AddActionQueue(async () => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行服务器保留卡行为开始");
      const t = new CustomPromise_1.CustomPromise;
      var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData,
        e = (o.InitSelectCardSaveData(a), o.SelectCardSaveData.ReserveCardNum),
        o = o.SelectCardSaveData.CardDataList;
      this.Proxy.DiscardPanel.SetDiscardCardData({
        CardDataList: o,
        LimitCount: e,
        ConfirmFunc: async o => {
          await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleSelectReserveCard(o), this.Proxy.DiscardPanel.SetActive(!1), await this.Proxy.OwnArea.HandArea.RecycleCard(this.Proxy.CardRecycle.GetRootItem(), o), t.SetResult()
        }
      }), this.Proxy.DiscardPanel.SetActive(!0), await t.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行服务器保留卡行为完成")
    })
  }
  PauseAction() {
    this.IsInPause = !0
  }
  ResumeAction() {
    this.IsInPause = !1, this.HandleAction()
  }
  async HandleAction() {
    var o;
    this.IsInAction || this.IsInPause || (this.ActionQueue.Empty ? this.IsInAction = !1 : (this.IsInAction = !0, (o = this.ActionQueue.Pop()) && await o(), this.IsInAction = !1, await this.HandleAction()))
  }
  AddActionQueue(o) {
    this.ActionQueue.Push(o), this.HandleAction()
  }
}
exports.PhantomArenaBattleServerActionQueue = PhantomArenaBattleServerActionQueue;
//# sourceMappingURL=PhantomArenaBattleServerActionQueue.js.map