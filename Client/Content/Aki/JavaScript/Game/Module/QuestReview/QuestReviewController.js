"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewController = void 0;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  QuestReviewDefine_1 = require("./QuestReviewDefine");
class QuestReviewController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.Dz1(), this.BurnFinishPromise = new CustomPromise_1.CustomPromise, this.FusionFinishPromise = new CustomPromise_1.CustomPromise, this.NewTabUnlockPromise = new CustomPromise_1.CustomPromise, !0
  }
  static OnClear() {
    return this.g51.length = 0, this.Bz1(), !0
  }
  static AddViewRefreshDelegate(e) {
    this.g51.push(e)
  }
  static RemoveViewRefreshDelegate(e) {
    e = this.g51.indexOf(e);
    0 <= e && this.g51.splice(e, 1)
  }
  static TriggerViewRefresh(e = 0) {
    for (const t of this.g51) t(e)
  }
  static OpenQuestReview(e) {
    e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewEntryDataById(e);
    e && UiManager_1.UiManager.OpenView("QuestReviewMainView", e)
  }
  static async OpenQuestReviewAsync(e) {
    e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewEntryDataById(e);
    return !!e && !!await UiManager_1.UiManager.OpenViewAsync("QuestReviewMainView", e)
  }
  static async OpenQuestReviewTipsViewAsync(e, t) {
    e = {
      EntryId: e,
      NodeId: t
    };
    return !!await UiManager_1.UiManager.OpenViewAsync("QuestReviewTipsView", e)
  }
  static OpenQuestNodeDetail(e) {
    e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewNodeDataById(e);
    e && UiManager_1.UiManager.OpenView("QuestReviewDetailView", e)
  }
  static Dz1() {
    Net_1.Net.Register(23486, this.kz1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterGameSuccess, this.TJt)
  }
  static Bz1() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, this.TJt), Net_1.Net.UnRegister(23486)
  }
  static async RequestQuestReviewData() {
    var e = new Protocol_1.Aki.Protocol.UY1,
      e = await Net_1.Net.CallAsync(28739, e);
    e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18799)
  }
  static SetBurnFinish() {
    this.BurnFinishPromise && (this.BurnFinishPromise.SetResult(), this.BurnFinishPromise = void 0)
  }
  static SetFusionFinish() {
    this.FusionFinishPromise && (this.FusionFinishPromise.SetResult(), this.FusionFinishPromise = void 0, ControllerHolder_1.ControllerHolder.QuestReviewController.TriggerViewRefresh(QuestReviewDefine_1.REFRESH_TIMING_AFTER_BURN))
  }
  static SetNewTabUnlockFinish() {
    this.NewTabUnlockPromise && (this.NewTabUnlockPromise.SetResult(), this.NewTabUnlockPromise = void 0, ControllerHolder_1.ControllerHolder.QuestReviewController.TriggerViewRefresh(QuestReviewDefine_1.REFRESH_TIMING_AFTER_FUSION))
  }
  static GmResetBurn() {
    this.SetBurnFinish(), this.SetFusionFinish(), this.BurnFinishPromise = new CustomPromise_1.CustomPromise, this.FusionFinishPromise = new CustomPromise_1.CustomPromise, this.NewTabUnlockPromise = new CustomPromise_1.CustomPromise, ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.NEW_QUEST_LINE).HasFused = !1, ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.NEW_QUEST_LINE).IsFirstTimeShow = !0, ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.BURN_QUEST_LINE).IsFirstTimeDestroy = !0, ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(3400).IsFirstTimeDestroy = !0, ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(3500).IsFirstTimeDestroy = !0, ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(3600).IsFirstTimeDestroy = !0, ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(3).IsFirstTimeShow = !0, LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewHasFused, !1)
  }
}
exports.QuestReviewController = QuestReviewController, (_a = QuestReviewController).g51 = [], QuestReviewController.TJt = () => {
  _a.RequestQuestReviewData()
}, QuestReviewController.kz1 = e => {
  ModelManager_1.ModelManager.QuestReviewModel.UpdateAllQuestReviewEntryData(e.qY1), ModelManager_1.ModelManager.QuestReviewModel.UpdateAllQuestReviewTabData(e.OY1), ModelManager_1.ModelManager.QuestReviewModel.UpdateAllQuestReviewLineData(e.kY1), ModelManager_1.ModelManager.QuestReviewModel.UpdateAllQuestReviewNodeData(e.BY1)
}, QuestReviewController.BurnFinishPromise = void 0, QuestReviewController.FusionFinishPromise = void 0, QuestReviewController.NewTabUnlockPromise = void 0;
//# sourceMappingURL=QuestReviewController.js.map