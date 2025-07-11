"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointSubView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class LifePointSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.MPu = undefined;
    this.Q6a = undefined;
    this.DFe = e => {
      var i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
      if (i > 0) {
        UiManager_1.UiManager.OpenView("QuestView", i);
      } else {
        i = {
          MarkId: ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointDrawActivityById(this.ActivityBaseData.Id).MarkId,
          MarkType: 0,
          OpenFogId: 0
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, i);
      }
    };
    this.$R1 = () => {
      var e = this.MPu.RedPointShowState;
      this.Q6a?.SetFunctionRedDotVisible(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.Q6a = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.Q6a.SetData(this.ActivityBaseData);
    this.Q6a.SetClickFunc(this.DFe);
    await this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.MPu = this.ActivityBaseData;
  }
  OnBeforeShow() {
    if (this.ActivityBaseData.GetUnFinishPreGuideQuestId() > 0) {
      this.Q6a.SetBtnText("LifePointQuestUnFinish");
    } else {
      this.Q6a.SetBtnText("LifePointQuestFinish");
    }
    this.RefreshProgressText();
    this.$R1();
  }
  RefreshProgressText() {
    var e = ModelManager_1.ModelManager.LifePointDrawModel.GetProgressByActivityId(this.MPu.Id, "Colorful_Finish_Progress_Activity");
    this.GetText(1)?.SetText(e);
  }
}
exports.LifePointSubView = LifePointSubView;
//# sourceMappingURL=LifePointSubView.js.map