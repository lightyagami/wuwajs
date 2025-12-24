"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryActivityView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../Activity/View/SubView/ActivitySubViewGeneralInfo");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class HonamiStoryActivityView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.fs1 = undefined;
    this.Zmu = undefined;
    this.tWt = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        i = {
          MarkId: this.ActivityBaseData.MarkId,
          MarkType: 6
        };
        ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, i);
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.efu = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryLimitTaskView");
    };
    this.tfu = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryPermanentTaskView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.SpineSkeletonAnimationComponent], [4, UE.SpineSkeletonAnimationComponent], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    await this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.CommonInfoPanel.SetBtnText("LongShanStage_Join01");
    this.CommonInfoPanel.SetClickFunc(this.tWt);
    this.CommonInfoPanel.HideRemainTime();
    this.fs1 = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.fs1.SetFunction(this.efu);
    this.GetItem(1)?.SetUIActive(this.ActivityBaseData.CheckIfInLimitTime());
    this.Zmu = new ButtonItem_1.ButtonItem(this.GetItem(2));
    this.Zmu.SetFunction(this.tfu);
  }
  OnBeforeShow() {
    this.KV_();
  }
  OnRefreshView() {
    this.Bim();
    this._Fe();
    this.CommonInfoPanel.SetFunctionRedDotVisible(this.ActivityBaseData.CheckAllFunctionRedDot());
    this.Zmu.SetRedDotVisible(this.ActivityBaseData.IsPermanentTaskHasRedDot());
    this.fs1.SetRedDotVisible(this.ActivityBaseData.IsLimitTaskHasRedDot());
  }
  OnTimer() {
    this.sSt();
  }
  sSt() {
    var i = this.ActivityBaseData.CheckIfInLimitTime();
    this.GetItem(1).SetUIActive(i);
    var i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.ActivityBaseData.EndRewardTime, "{0}");
    this.fs1?.SetText(i);
  }
  KV_() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1;
    this.GetItem(5).SetUIActive(i);
    this.GetItem(6).SetUIActive(!i);
    this.GetSpine(3).SetAutoPlay(false);
    this.GetSpine(4).SetAutoPlay(false);
    (i ? this.GetSpine(3) : this.GetSpine(4)).SetAutoPlay(true);
  }
  Bim() {
    var i = this.ActivityBaseData.GetPermanentTaskIdsByState(2).length;
    var t = this.ActivityBaseData.GetPermanentTaskTotalNum();
    this.Zmu.SetText(i + "/" + t);
  }
  _Fe() {
    var i = this.CommonInfoPanel.GetFunctional();
    var t = {
      UnlockBtnTextId: "LongShanStage_Join01",
      UnlockBtnFunction: this.tWt
    };
    i.RefreshGeneralPerformance(t);
  }
}
exports.HonamiStoryActivityView = HonamiStoryActivityView;
//# sourceMappingURL=HonamiStoryActivityView.js.map