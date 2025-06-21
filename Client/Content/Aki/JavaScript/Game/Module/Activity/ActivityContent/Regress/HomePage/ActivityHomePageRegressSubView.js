"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityHomePageRegressSubView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  RegressDefine_1 = require("../Base/RegressDefine"),
  RegressGradeButtonItem_1 = require("../Base/RegressGradeButtonItem"),
  RegressGradeSignItem_1 = require("../Base/RegressGradeSignItem"),
  ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper"),
  ActivityRegressEntryItemPanel_1 = require("../Panels/ActivityRegressEntryItemPanel");
class ActivityHomePageRegressSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments), this.LNe = void 0, this.iCa = void 0, this.Rl1 = void 0, this.Ll1 = void 0, this.Ida = new Map, this.wl1 = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressMainView", 4)
    }, this.Sjt = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(RegressDefine_1.REGRESS_SKIP_SHOPID), ActivityRegressHelper_1.ActivityRegressHelper.ReportRegressLog1060(), ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetShopRedDotChecked()
    }, this.Al1 = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressQuestionnaireView")
    }, this.Pl1 = e => {
      UiManager_1.UiManager.OpenView("ActivityRegressTaskMainView", 0)
    }, this.Rda = () => {
      var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskProgressFloat01();
      this.GetText(5).SetText(Math.trunc(100 * e) + "%"), this.GetTexture(7).SetFillAmount(e)
    }, this.itt = () => {
      this.OnRefreshView()
    }, this.TDa = () => {
      this.Rda()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIButtonComponent],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UITexture],
      [23, UE.UITexture],
      [21, UE.UIText],
      [24, UE.UIText],
      [22, UE.UIButtonComponent],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem]
    ], this.BtnBindInfo = [
      [9, this.wl1],
      [22, this.wl1],
      [11, this.Sjt],
      [13, this.Al1]
    ]
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0),
      t = (this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA, this.GetItem(8)),
      i = this.GetItem(17),
      t = (this.Rl1 = new RegressGradeButtonItem_1.RegressGradeButtonItem(new ButtonItem_1.ButtonItem(t), new ButtonItem_1.ButtonItem(i)), this.Rl1.Bind(this.Pl1), this.Ll1 = new RegressGradeSignItem_1.RegressGradeSignItem(this.xl1(), this.Dl1()), this.Ida.set(1, new ActivityRegressEntryItemPanel_1.ActivityRegressEntryItemPanel), this.Ida.set(2, new ActivityRegressEntryItemPanel_1.ActivityRegressEntryItemPanel), this.Ida.set(3, new ActivityRegressEntryItemPanel_1.ActivityRegressEntryItemPanel), this.GetItem(3).GetOwner()),
      i = this.GetItem(2).GetOwner(),
      s = this.GetItem(4).GetOwner(),
      r = this.GetItem(6).GetOwner();
    this.iCa = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA, await Promise.all([this.LNe.CreateThenShowByActorAsync(e.GetOwner()), ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestGachaInfo(), this.iCa.CreateThenShowByActorAsync(r), this.Ida.get(1).CreateByActorAsync(t), this.Ida.get(2).CreateByActorAsync(i), this.Ida.get(3).CreateByActorAsync(s)])
  }
  xl1() {
    return {
      Btn: this.GetButton(9),
      RedDotItem: this.GetItem(10),
      CurrencyTexNode: this.GetTexture(20),
      CurrencyText: this.GetText(21),
      BubbleNode: this.GetItem(26)
    }
  }
  Dl1() {
    return {
      Btn: this.GetButton(22),
      RedDotItem: this.GetItem(25),
      CurrencyTexNode: this.GetTexture(23),
      CurrencyText: this.GetText(24),
      BubbleNode: this.GetItem(27)
    }
  }
  OnStart() {
    ModelManager_1.ModelManager.ActivityRegressModel.SetFirstShowChecked(), this.iCa.SetContentByTextId("Activity_101800001_Desc"), this.Rl1.BindRedDot("ActivityRecallTask"), this.Ll1.BindRedDot("ActivityRecallSignEntry"), RedDotController_1.RedDotController.BindRedDot("ActivityRegressQuestionnaire", this.GetItem(14)), RedDotController_1.RedDotController.BindRedDot("ActivityRegressShopDiscount", this.GetItem(12))
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityRegressQuestionnaire", this.GetItem(14)), RedDotController_1.RedDotController.UnBindGivenUi("ActivityRegressShopDiscount", this.GetItem(12));
    for (var [, e] of this.Ida) e.DestroyAsync();
    this.Ida.clear(), this.Ll1.Clear(), this.Rl1.Clear()
  }
  OnRefreshView() {
    this.mGe(), this.Dda(), this.Rda(), this.Ul1(), this.Bl1(), this.N01()
  }
  OnTimer(e) {
    this.mGe()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa)
  }
  mGe() {
    this.LNe.SetTitleByText(ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTitle());
    var [e, t] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(ModelManager_1.ModelManager.ActivityRegressModel.ActivityData);
    this.LNe.SetTimeTextVisible(e), e && this.LNe.SetTimeTextByText(t)
  }
  Ul1() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
    this.Rl1.Grade = e, this.Ll1.Grade = e, this.GetItem(18).SetUIActive(1 === e), this.GetItem(19).SetUIActive(2 === e)
  }
  Dda() {
    this.Ada(1), this.Ada(2), this.Uda()
  }
  Ada(e) {
    var t = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressEntrySingleConfigByType(e);
    this.Ida.get(e).RefreshData(e, t)
  }
  Uda() {
    var e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetSortedOpenRegressEntryConfigList()[0];
    this.Ida.get(3).RefreshData(3, e)
  }
  Bl1() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.TodayFirstShowSign(),
      t = ModelManager_1.ModelManager.ActivityRegressModel.HasSignRewardCanClaimed(),
      i = this.Ll1.GetActivateContext(),
      t = t && e;
    t && (e = ModelManager_1.ModelManager.ActivityRegressModel.GetLatestSignRewardItemInfo(), i.CurrencyText.SetText("x" + e.ItemCount)), this.Ll1.SetClaimRewardBubbleActive(t)
  }
  N01() {
    this.GetItem(15).SetUIActive(!1)
  }
}
exports.ActivityHomePageRegressSubView = ActivityHomePageRegressSubView;
//# sourceMappingURL=ActivityHomePageRegressSubView.js.map