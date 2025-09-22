"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const TrapDefenseEntryBtnItem_1 = require("./Entry/TrapDefenseEntryBtnItem");
const TrapDefenseEntrySideBtnItem_1 = require("./Entry/TrapDefenseEntrySideBtnItem");
class TrapDefenseMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.f$c = undefined;
    this.g$c = undefined;
    this.p$c = undefined;
    this.v$c = undefined;
    this.y$c = undefined;
    this.S$c = undefined;
    this.M$c = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewKeySetting();
    };
    this.E$c = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewLimitReward();
    };
    this.I$c = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewFixedReward();
    };
    this.T$c = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewTalentTree();
    };
    this.b$c = () => {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenOrganDevelop(false, this);
    };
    this.AOe = () => {
      this.Og();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[1, this.M$c]];
  }
  async OnBeforeStartAsync() {
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Qyi.SetHelpCallBack(() => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdFixedReward();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    });
    this.f$c = new TrapDefenseEntryBtnItem_1.TrapDefenseEntryBtnItem(1);
    this.g$c = new TrapDefenseEntryBtnItem_1.TrapDefenseEntryBtnItem(2);
    this.p$c = new TrapDefenseEntrySideBtnItem_1.TrapDefenseEntrySideBtnItem();
    this.p$c.SetFunction(this.E$c);
    this.v$c = new TrapDefenseEntrySideBtnItem_1.TrapDefenseEntrySideBtnItem();
    this.v$c.SetFunction(this.I$c);
    this.y$c = new TrapDefenseEntrySideBtnItem_1.TrapDefenseEntrySideBtnItem();
    this.y$c.SetFunction(this.T$c);
    this.S$c = new TrapDefenseEntrySideBtnItem_1.TrapDefenseEntrySideBtnItem();
    this.S$c.SetFunction(this.b$c);
    var e = [];
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    e.push(this.f$c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    e.push(this.g$c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    e.push(this.p$c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    e.push(this.v$c.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    e.push(this.y$c.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    e.push(this.S$c.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(e);
    this.p$c.BindRedDot("TrapDefenseLimitReward");
    this.v$c.BindRedDot("TrapDefenseFixedReward");
    this.y$c.BindRedDot("TrapDefenseTalentTree");
    this.S$c.BindRedDot("TrapDefenseDevelopBranchAll");
  }
  OnBeforeShow() {
    this.Og();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseLevelDataListUpdate, this.AOe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate, this.AOe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseRewardUpdate, this.AOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseLevelDataListUpdate, this.AOe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate, this.AOe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseRewardUpdate, this.AOe);
  }
  OnBeforeDestroy() {
    this.v$c?.UnBindRedDot();
    this.p$c?.UnBindRedDot();
    this.y$c?.UnBindRedDot();
    this.S$c?.UnBindRedDot();
  }
  OnTick(e) {
    this.g$c?.RefreshUnlockTimer();
    this.GetText(4)?.SetText(ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetLimitRewardRemainTimeStr());
    this.GetItem(9)?.SetUIActive(ModelManager_1.ModelManager.TrapDefenseModel.RewardData.IsOpenLimitReward());
  }
  Og() {
    var [e, t] = ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetLimitRewardTotalProgress();
    this.p$c.SetProgressText(e + "/" + t);
    this.p$c.SetUiActive(ModelManager_1.ModelManager.TrapDefenseModel.RewardData.IsOpenLimitReward());
    var [e, t] = ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetFixedRewardTotalProgress();
    this.v$c.SetProgressText(e + "/" + t);
    this.f$c.RefreshByMode();
    this.g$c.RefreshByMode();
  }
}
exports.TrapDefenseMainView = TrapDefenseMainView;
//# sourceMappingURL=TrapDefenseMainView.js.map