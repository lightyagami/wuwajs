"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueScoreItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueScoreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.rV_ = () => {
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.WeeklyRogueModel.GetScoreRewardData(), (e, r) => {
        if (e && UiManager_1.UiManager.IsViewShow("WeeklyRogueActivityView")) {
          UiManager_1.UiManager.GetViewByName("WeeklyRogueActivityView")?.AddChildViewById(r);
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.rV_]];
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData;
    var r = e.GetCycleConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "PrefabTextItem_1382682910_Text", e.Score.toString(), r.MaxScore);
    this.GetSprite(1).SetFillAmount(e.Score / r.MaxScore);
    RedDotController_1.RedDotController.BindRedDot("WeeklyRogueScoreReward", this.GetItem(4));
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi("WeeklyRogueScoreReward", this.GetItem(4));
  }
}
exports.WeeklyRogueScoreItem = WeeklyRogueScoreItem;
//# sourceMappingURL=WeekyRogueScoreItem.js.map