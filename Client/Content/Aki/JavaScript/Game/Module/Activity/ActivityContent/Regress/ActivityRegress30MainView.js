"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegress30MainView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const RegressDefine_1 = require("./Base/RegressDefine");
const ActivityRegressHelper_1 = require("./Misc/ActivityRegressHelper");
class ActivityRegress30MainView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.r9f = undefined;
    this.a4f = undefined;
    this.h4f = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressMainView", {
        SubView: 0,
        OpenType: 0
      });
    };
    this.l4f = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.OpenTrialRoleView();
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetTrialRoleRedDotChecked(true);
    };
    this._4f = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressMainView", {
        SubView: 6,
        OpenType: 0
      });
    };
    this.u4f = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressNewVersionMainView");
    };
    this.c4f = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressMainView", {
        SubView: 3,
        OpenType: 0
      });
    };
    this.d4f = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressStartupView", true);
    };
    this.m4f = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressQuestionnaireView");
    };
    this.f4f = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(RegressDefine_1.REGRESS_SKIP_SHOPID);
      ActivityRegressHelper_1.ActivityRegressHelper.ReportRegressLog1060();
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetShopRedDotChecked();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [5, UE.UIButtonComponent], [2, UE.UIButtonComponent], [4, UE.UIButtonComponent], [3, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [15, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem]];
    this.BtnBindInfo = [[1, this.h4f], [5, this.l4f], [2, this._4f], [4, this.u4f], [3, this.c4f], [6, this.d4f], [7, this.m4f], [8, this.f4f]];
  }
  async OnBeforeStartAsync() {
    this.a4f = new ActivityRegressRoleItem();
    await this.a4f.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.r9f = new SignItem();
    await this.r9f.CreateThenShowByActorAsync(this.GetButton(2).RootUIComp.GetOwner());
  }
  OnTimer(e) {
    this.mGe();
  }
  mGe() {
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [e, i] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e);
    if (e) {
      this.LNe.SetTimeTextByText(i);
    }
  }
  OnRefreshView() {
    var e = this.ActivityBaseData.CurrentUseTrialRole;
    this.a4f?.RefreshItem(e);
    var e = this.ActivityBaseData.LocalConfig;
    var e = e.DescTheme;
    var i = !StringUtils_1.StringUtils.IsEmpty(e);
    this.LNe.SetSubTitleVisible(i);
    if (i) {
      this.LNe.SetSubTitleByTextId(e);
    }
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(e);
    }
    var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetCurLevelProgressData();
    this.GetText(10).SetText("Lv." + i.Level);
    this.GetText(11).SetText("/" + i.MaxLevel);
    this.r9f?.RefreshSignItem(ModelManager_1.ModelManager.ActivityRegressModel.Grade === 2, ModelManager_1.ModelManager.ActivityRegressModel.HasSignRewardCanClaimed());
  }
  OnStart() {
    RedDotController_1.RedDotController.BindRedDot("ActivityRegressQuestionnaire", this.GetItem(16));
    RedDotController_1.RedDotController.BindRedDot("ActivityRegressShopDiscount", this.GetItem(17));
    RedDotController_1.RedDotController.BindRedDot("ActivityRecallSignEntry", this.GetItem(12));
    RedDotController_1.RedDotController.BindRedDot("ActivityRegressDisposableReward", this.GetItem(15));
    RedDotController_1.RedDotController.BindRedDot("ActivityRegressTrialRole", this.GetItem(14));
    RedDotController_1.RedDotController.BindRedDot("ActivityRegressBp", this.GetItem(13));
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRegressQuestionnaire", this.GetItem(16));
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRegressShopDiscount", this.GetItem(17));
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRecallSignEntry", this.GetItem(12));
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRegressDisposableReward", this.GetItem(15));
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRegressTrialRole", this.GetItem(14));
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRegressBp", this.GetItem(13));
  }
}
exports.ActivityRegress30MainView = ActivityRegress30MainView;
class ActivityRegressRoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UITexture]];
  }
  RefreshItem(e) {
    var i;
    if (e) {
      this.GetItem(1).SetUIActive(false);
      this.GetItem(3).SetUIActive(true);
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      this.SetRoleIcon(i.FormationRoleCard, this.GetTexture(4), e);
    } else {
      this.GetItem(1).SetUIActive(true);
      this.GetItem(3).SetUIActive(false);
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i === 1 ? "T_RoleTrialBoy" : "T_RoleTrialGirl");
      this.SetTextureByPath(e, this.GetTexture(2));
    }
  }
}
class SignItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [10, UE.UIItem]];
  }
  RefreshSignItem(e, i) {
    this.GetItem(1).SetUIActive(!e);
    this.GetItem(2).SetUIActive(!e);
    this.GetItem(3).SetUIActive(!e);
    this.GetItem(4).SetUIActive(e);
    this.GetItem(5).SetUIActive(e);
    this.GetItem(6).SetUIActive(e);
    this.GetItem(7).SetUIActive(e && i);
  }
}
//# sourceMappingURL=ActivityRegress30MainView.js.map