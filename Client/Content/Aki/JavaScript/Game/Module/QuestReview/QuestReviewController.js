"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const QuestReviewDefine_1 = require("./QuestReviewDefine");
class QuestReviewController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.JJ1();
    this.BurnFinishPromise = new CustomPromise_1.CustomPromise();
    this.FusionFinishPromise = new CustomPromise_1.CustomPromise();
    this.NewTabUnlockPromise = new CustomPromise_1.CustomPromise();
    return true;
  }
  static OnClear() {
    this.z51.length = 0;
    this.ZJ1();
    return true;
  }
  static AddViewRefreshDelegate(e) {
    this.z51.push(e);
  }
  static RemoveViewRefreshDelegate(e) {
    e = this.z51.indexOf(e);
    if (e >= 0) {
      this.z51.splice(e, 1);
    }
  }
  static TriggerViewRefresh(e = 0) {
    for (const t of this.z51) {
      t(e);
    }
  }
  static OpenQuestReview(e, t = true) {
    e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewEntryDataById(e);
    if (e) {
      UiManager_1.UiManager.OpenView("QuestReviewMainView", [e, t]);
    }
  }
  static async OpenQuestReviewAsync(e, t = true) {
    e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewEntryDataById(e);
    return !!e && !!(await UiManager_1.UiManager.OpenViewAsync("QuestReviewMainView", [e, t]));
  }
  static async OpenQuestReviewTipsViewAsync(e, t) {
    e = {
      EntryId: e,
      NodeId: t
    };
    return !!(await UiManager_1.UiManager.OpenViewAsync("QuestReviewTipsView", e));
  }
  static OpenQuestNodeDetail(e) {
    e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewNodeDataById(e);
    if (e) {
      UiManager_1.UiManager.OpenView("QuestReviewDetailView", e);
    }
  }
  static JJ1() {
    Net_1.Net.Register(18986, this.eZ1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterGameSuccess, this.TJt);
  }
  static ZJ1() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, this.TJt);
    Net_1.Net.UnRegister(18986);
  }
  static async RequestQuestReviewData() {
    var e = new Protocol_1.Aki.Protocol.eJ1();
    var e = await Net_1.Net.CallAsync(20710, e);
    if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22133);
    }
  }
  static SetBurnFinish() {
    if (this.BurnFinishPromise) {
      this.BurnFinishPromise.SetResult();
      this.BurnFinishPromise = undefined;
    }
  }
  static SetFusionFinish() {
    if (this.FusionFinishPromise) {
      this.FusionFinishPromise.SetResult();
      this.FusionFinishPromise = undefined;
      ControllerHolder_1.ControllerHolder.QuestReviewController.TriggerViewRefresh(QuestReviewDefine_1.REFRESH_TIMING_AFTER_BURN);
    }
  }
  static SetNewTabUnlockFinish() {
    if (this.NewTabUnlockPromise) {
      this.NewTabUnlockPromise.SetResult();
      this.NewTabUnlockPromise = undefined;
      ControllerHolder_1.ControllerHolder.QuestReviewController.TriggerViewRefresh(QuestReviewDefine_1.REFRESH_TIMING_AFTER_FUSION);
    }
  }
  static GmResetBurn() {
    this.SetBurnFinish();
    this.SetFusionFinish();
    this.BurnFinishPromise = new CustomPromise_1.CustomPromise();
    this.FusionFinishPromise = new CustomPromise_1.CustomPromise();
    this.NewTabUnlockPromise = new CustomPromise_1.CustomPromise();
    ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.NEW_QUEST_LINE).HasFused = false;
    ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.NEW_QUEST_LINE).IsFirstTimeShow = true;
    ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(QuestReviewDefine_1.BURN_QUEST_LINE).IsFirstTimeDestroy = true;
    ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(3400).IsFirstTimeDestroy = true;
    ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(3500).IsFirstTimeDestroy = true;
    ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(3600).IsFirstTimeDestroy = true;
    ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewTabDataById(3).IsFirstTimeShow = true;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.QuestReviewHasFused, false);
  }
}
exports.QuestReviewController = QuestReviewController;
(_a = QuestReviewController).z51 = [];
QuestReviewController.TJt = () => {
  _a.RequestQuestReviewData();
};
QuestReviewController.eZ1 = e => {
  ModelManager_1.ModelManager.QuestReviewModel.UpdateAllQuestReviewEntryData(e.nJ1);
  ModelManager_1.ModelManager.QuestReviewModel.UpdateAllQuestReviewTabData(e.oJ1);
  ModelManager_1.ModelManager.QuestReviewModel.UpdateAllQuestReviewLineData(e.rJ1);
  ModelManager_1.ModelManager.QuestReviewModel.UpdateAllQuestReviewNodeData(e.iJ1);
};
QuestReviewController.BurnFinishPromise = undefined;
QuestReviewController.FusionFinishPromise = undefined;
QuestReviewController.NewTabUnlockPromise = undefined; //# sourceMappingURL=QuestReviewController.js.map