"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPrizeDrawingData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityPrizeDrawingData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.D8d = -1;
    this.U8d = new Map();
    this.x8d = -1;
  }
  PhraseEx(t) {
    if (t && t.LOd) {
      t.LOd.UOd.forEach(t => {
        this.U8d.set(t.s5n, t.GOd);
      });
      this.D8d = t.LOd.DOd;
      this.x8d = t.LOd.B5n;
    }
  }
  GetCostCoinId() {
    return ConfigManager_1.ConfigManager.PrizeDrawingConfig.GetKujiActivityByActivityId(this.Id).CostItemId;
  }
  GetCostCoinAmount() {
    return ConfigManager_1.ConfigManager.PrizeDrawingConfig.GetKujiActivityByActivityId(this.Id).CostItemCount;
  }
  GetAllAwardGroup() {
    return ConfigManager_1.ConfigManager.PrizeDrawingConfig.GetKujiAwardsGroupByKujiId(this.D8d);
  }
  GetAllAwardItem() {
    var t = [];
    for (const r of this.GetAllAwardGroup()) {
      var e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(r.RewardId)[0];
      t.push({
        ItemId: e[0].ItemId,
        Count: e[1],
        Times: r.Amount,
        Rare: r.Rank
      });
    }
    return t;
  }
  GetAwardCurrentAmount(t) {
    return this.U8d.get(t) ?? 0;
  }
  GetAwardMaxAmount(t) {
    return ConfigManager_1.ConfigManager.PrizeDrawingConfig?.GetKujiAwardsGroupById(t)?.Amount ?? 0;
  }
  IsGotAward(t) {
    return this.GetAwardCurrentAmount(t) >= this.GetAwardMaxAmount(t);
  }
  GetCurrentProgress() {
    let e = 0;
    this.U8d.forEach(t => {
      e += t;
    });
    return e;
  }
  GetTotalProgress() {
    var t = ConfigManager_1.ConfigManager.PrizeDrawingConfig?.GetKujiAwardsGroupByKujiId(this.D8d);
    let e = 0;
    t?.forEach(t => {
      e += t.Amount;
    });
    return e;
  }
  IsAllFinished() {
    return this.GetCurrentProgress() >= this.GetTotalProgress();
  }
  GetCurrentQuestId() {
    return this.x8d;
  }
  GetQuestProgress() {
    var e = ConfigManager_1.ConfigManager.PrizeDrawingConfig.GetKujiQuestConfigByKujiId(this.D8d);
    for (let t = 0; t < e.length; t++) {
      if (ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(e[t].CoinQuestId) !== 3) {
        return t;
      }
    }
    return e?.length ?? 0;
  }
  GetQuestTotalProgress() {
    return ConfigManager_1.ConfigManager.PrizeDrawingConfig?.GetKujiQuestConfigByKujiId(this.D8d)?.length ?? 0;
  }
  IsQuestAllCompleted() {
    return this.GetQuestProgress() >= this.GetQuestTotalProgress();
  }
  IsKujiQuestId(e) {
    return ConfigManager_1.ConfigManager.PrizeDrawingConfig?.GetKujiQuestConfigByKujiId(this.D8d)?.some(t => t.CoinQuestId === e) ?? false;
  }
  ReadRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 0, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  ReadQuestRedDot() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, 1, 0, 0, this.x8d);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  IsCurQuestReaded() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 1, 0, 0) === this.x8d;
    var e = ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(this.x8d) === 3;
    return t || e;
  }
  GetExDataRedPointShowState() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, 0, 0, 0) === 0 || !this.IsCurQuestReaded() || !this.IsAllFinished() && (!!this.HaveEnoughCoinToRoll() || !!this.NeedFinishGuideQuest());
  }
  GetExDataFinishShowState() {
    return this.IsAllFinished();
  }
  ShouldShowButtonRedDot() {
    return !this.IsAllFinished() && this.HaveEnoughCoinToRoll();
  }
  HaveEnoughCoinToRoll() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.GetCostCoinId()) >= this.GetCostCoinAmount();
  }
  NeedFinishGuideQuest() {
    return !this.GetPreGuideQuestFinishState() && this.GetUnFinishPreGuideQuestId() !== ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id;
  }
  OnAwardsUpdate(t) {
    if (t) {
      for (const r of t.AOd) {
        var e = this.U8d.get(r.S9n) ?? 0;
        this.U8d.set(r.S9n, e + r.$Us);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPrizeDrawingRewardStatusChanged);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  QuestCompletedNotify(t) {
    if (!!this.GetPreGuideQuestIds()?.includes(t) || this.x8d === t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPrizeDrawingQuestUpdated);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  QuestAddNotify(t) {
    if (this.IsKujiQuestId(t)) {
      this.x8d = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPrizeDrawingQuestUpdated);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
}
exports.ActivityPrizeDrawingData = ActivityPrizeDrawingData;
//# sourceMappingURL=ActivityPrizeDrawingData.js.map