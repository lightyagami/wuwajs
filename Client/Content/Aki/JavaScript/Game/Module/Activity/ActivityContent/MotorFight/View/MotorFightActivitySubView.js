"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightActivitySubView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class MotorFightActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.s6e = undefined;
    this.tWt = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("MotorFightMainView", this.ActivityBaseData);
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.g6e = () => {
      UiManager_1.UiManager.OpenView("MotorFightRewardView", this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    var i = [this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())];
    await Promise.all(i);
    this.CommonInfoPanel?.SetBtnText("MotorFightGame_join01");
    this.CommonInfoPanel?.SetClickFunc(this.tWt);
    this.s6e = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.s6e.SetFunction(this.g6e);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0;
    var i = i ? "T_MotorcycleBattleFemale" : "T_MotorcycleBattleMale";
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetTextureByPath(i, this.GetTexture(2));
  }
  OnRefreshView() {
    this.CommonInfoPanel.SetFunctionRedDotVisible(this.ActivityBaseData.RedPointShowState);
    this.CommonInfoPanel?.OnRefreshView();
    this.s6e?.SetRedDotVisible(this.ActivityBaseData.IsTaskHasRedDot());
    this.s6e?.SetText(this.ActivityBaseData.GetFinishedTaskNum() + "/" + this.ActivityBaseData.GetTotalTaskNum());
  }
}
exports.MotorFightActivitySubView = MotorFightActivitySubView;
//# sourceMappingURL=MotorFightActivitySubView.js.map