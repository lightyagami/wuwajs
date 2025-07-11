"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmGoldSubView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class FarmGoldSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.jwl = undefined;
    this.Q6a = undefined;
    this.lRo = () => {
      this.R2e();
    };
    this.R2e = () => {
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", this.jwl.GetRewardPopUpViewData(), (e, i) => {
        UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(i);
      });
    };
    this.DFe = e => {
      var i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
      if (i > 0) {
        UiManager_1.UiManager.OpenView("QuestView", i);
      } else {
        i = {
          MarkId: ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldMarkByActivityId(this.ActivityBaseData.Id).MarkId,
          MarkType: 0,
          OpenFogId: 0
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.lRo]];
  }
  async OnBeforeStartAsync() {
    this.Q6a = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.Q6a.SetData(this.ActivityBaseData);
    this.Q6a.SetClickFunc(this.DFe);
    this.Q6a.SetRewardButtonFunction(this.R2e);
    await this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.jwl = this.ActivityBaseData;
  }
  OnBeforeShow() {
    if (this.ActivityBaseData.GetUnFinishPreGuideQuestId() > 0) {
      this.Q6a.SetBtnText("FarmGoldEnterText");
    } else {
      this.Q6a.SetBtnText("PrefabTextItem_2701983798_Text");
    }
    this.Zl_();
    RedDotController_1.RedDotController.BindRedDot("FarmGoldReward", this.GetItem(2), undefined, this.ActivityBaseData?.Id);
  }
  OnRefreshView() {
    this.BNe();
  }
  BNe() {
    var e = this.jwl.EntranceRedDot();
    var i = this.jwl.GetPreGuideQuestFinishState();
    this.Q6a.SetFunctionRedDotVisible(i && e);
  }
  OnBeforeHide() {
    this.Zl_();
  }
  Zl_() {
    RedDotController_1.RedDotController.UnBindGivenUi("FarmGoldReward", this.GetItem(2));
  }
}
exports.FarmGoldSubView = FarmGoldSubView;
//# sourceMappingURL=FarmGoldSubView.js.map