"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkActivitySubView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../Activity/View/SubView/ActivitySubViewGeneralInfo");
const DreamLinkScoreRewardItem_1 = require("./DreamLinkScoreRewardItem");
const DreamLinkLimitTimeRewardItem_1 = require("./SubView/DreamLinkLimitTimeRewardItem");
class DreamLinkActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.GeneralActivityInfo = undefined;
    this.Atl = undefined;
    this.qsi = undefined;
    this.eje = () => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityContentView(this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.GeneralActivityInfo = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.GeneralActivityInfo.SetData(this.ActivityBaseData);
    this.GeneralActivityInfo.SetClickFunc(this.eje);
    e.push(this.GeneralActivityInfo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.qsi = new DreamLinkScoreRewardItem_1.DreamLinkScoreRewardItem(this.ActivityBaseData);
    e.push(this.qsi.CreateByActorAsync(this.GetItem(2).GetOwner()));
    this.Atl = new DreamLinkLimitTimeRewardItem_1.DreamLinkLimitTimeRewardItem(this.ActivityBaseData);
    e.push(this.Atl.CreateByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(e);
  }
  async OnBeforeHideSelfAsync() {
    this.qsi.SetActive(false);
    this.Atl.SetActive(false);
  }
  OnRefreshView() {
    this.Rtl();
    this.ZGe();
    this.Atl.RefreshActive();
    this.qsi.SetActive(this.ActivityBaseData.IsUnLock());
    if (this.ActivityBaseData.IsUnLock()) {
      this.qsi.RefreshPerformance();
    }
  }
  Rtl() {
    var e = this.ActivityBaseData.GetInstStage() === 0;
    this.GetItem(3).SetUIActive(e);
    this.GetItem(4).SetUIActive(!e);
  }
  ZGe() {
    var e;
    var i;
    if (this.ActivityBaseData.IsDreamLinkFunctionUnlock(0)) {
      if (e = ModelManager_1.ModelManager.SubPackageDownLoadModel.CheckActivityTeleportHaveSubPackage(this.ActivityBaseData.Id)) {
        this.GeneralActivityInfo.SetFunctionRedDotVisible(this.ActivityBaseData.RedPointShowState);
        this.GeneralActivityInfo?.SetBtnText("FragmentMemoryEnterText");
      } else {
        (i = this.GeneralActivityInfo.GetFunctional()).SetPerformanceSubPackageLock(this.ActivityBaseData.LocalConfig.AreaTips, this.ActivityBaseData.LocalConfig.AreaList);
        i.SetLockTextByTextId("SubPackageDownLoad_ActivityLock_Des");
        i.SetPanelConditionVisible(!e);
        i.FunctionButton.SetUiActive(e);
        i.PanelActivate.SetUiActive(e);
      }
    } else {
      this.GeneralActivityInfo.SetFunctionRedDotVisible(this.ActivityBaseData.GetQuestRedDotState());
      this.GeneralActivityInfo?.SetBtnText("PrefabTextItem_2152138235_Text");
    }
  }
}
exports.DreamLinkActivitySubView = DreamLinkActivitySubView;
//# sourceMappingURL=DreamLinkActivitySubView.js.map