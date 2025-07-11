"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerSubView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const PayShopViewData_1 = require("../../../PayShop/PayShopData/PayShopViewData");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.DFe = () => {
      var e;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("BabelTowerMainView");
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.Ud_ = () => {
      var e;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("BabelTowerQuestView");
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.zDo = () => {
      var e;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        if (BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()) {
          (e = new PayShopViewData_1.PayShopViewData()).PayShopId = 213;
          e.ShowShopIdList = [213];
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(e);
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BabelTowerIsNotOpen");
        }
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Ud_], [5, this.zDo]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var i = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var r = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(e.GetOwner()), this.DNe.CreateThenShowByActorAsync(t.GetOwner()), this.UNe.CreateThenShowByActorAsync(i.GetOwner()), this.ANe.CreateThenShowByActorAsync(r.GetOwner())]);
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.ANe.FunctionButton.SetFunction(this.DFe);
    this.ANe.SetRewardButtonVisible(false);
  }
  OnStart() {
    RedDotController_1.RedDotController.BindRedDot("BabelTowerQuestRedDot", this.GetItem(7));
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerQuestRedDot", this.GetItem(7));
  }
  OnRefreshView() {
    if (this.ActivityBaseData.LocalConfig) {
      this.Pqe();
      this.mGe();
      this.jqe();
      this._Oe();
      this.gbc();
      this.LLc();
    }
  }
  Pqe() {
    var e = this.ActivityBaseData.LocalConfig;
    var t = e.DescTheme;
    var e = e.Desc;
    var i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.LNe.SetSubTitleVisible(i);
    if (i) {
      this.LNe.SetSubTitleByTextId(t);
    }
    this.DNe.SetContentByTextId(e);
  }
  mGe() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e);
    if (e) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  jqe() {
    var e = this.ActivityBaseData.GetPreviewReward();
    this.UNe.RefreshItemLayout(e);
  }
  _Oe() {
    var e = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!e);
    if (!e) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.FunctionButton.SetUiActive(e);
  }
  gbc() {
    var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    var e = e.GetDifficultyNewLevelRedDot(0) || e.GetDifficultyNewLevelRedDot(1);
    this.ANe.SetFunctionRedDotVisible(e);
  }
  LLc() {
    var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    this.GetText(6).SetText(e.CurrentItemCount + "/" + ModelManager_1.ModelManager.BabelTowerModel.ItemCountMax);
  }
}
exports.BabelTowerSubView = BabelTowerSubView;
//# sourceMappingURL=BabelTowerSubView.js.map