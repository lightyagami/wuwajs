"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressMainView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Time_1 = require("../../../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const ActivityRegressAdventureView_1 = require("./30RegressMainSubView/ActivityRegressAdventureView");
const ActivityRegressDoubleDropView_1 = require("./30RegressMainSubView/ActivityRegressDoubleDropView");
const ActivityRegressRecommendView_1 = require("./30RegressMainSubView/ActivityRegressRecommendView");
const ActivityRegressNewVersionMainQuestView_1 = require("./30RegressNewVersion/ActivityRegressNewVersionMainQuestView");
const ActivityRegressNewVersionRoleView_1 = require("./30RegressNewVersion/ActivityRegressNewVersionRoleView");
const RegressBpMainView_1 = require("./BPView/RegressBpMainView");
const ActivityRegressMainCaptionListPanel_1 = require("./Panels/ActivityRegressMainCaptionListPanel");
const ActivityRegressTabItemPanel_1 = require("./Panels/ActivityRegressTabItemPanel");
const ActivityRegressSignInSubView_1 = require("./SignIn/ActivityRegressSignInSubView");
const TAB_CD = 600;
class ActivityRegressMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.HVf = 0;
    this.GOe = undefined;
    this._da = new Map();
    this.uda = undefined;
    this.cda = undefined;
    this.z3f = [];
    this.lBa = false;
    this.Ftl = "";
    this.kOe = () => {
      var e;
      if (this.CNe?.CheckIfInShowTime()) {
        e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.CNe.EndShowTime, this.Ftl);
        this.GetText(5).SetText(e);
      } else {
        this.CloseMe();
      }
    };
    this.itt = () => {
      this.Og();
    };
    this.jdi = (e, i) => {
      return new ActivityRegressTabItemPanel_1.ActivityRegressTabItemPanel();
    };
    this.zno = e => {
      if (this.lBa) {
        this.lBa = false;
      } else {
        this.L6e = Time_1.Time.Now;
        this.mda(this.z3f[e]);
      }
    };
    this.yqe = e => {
      var e = this.z3f[e];
      var i = this.J3f(e) ?? "";
      var e = this.Z3f(e);
      var e = e !== undefined ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e) : "";
      return new CommonTabData_1.CommonTabData(e, new CommonTabTitleData_1.CommonTabTitleData(i));
    };
    this.L6e = 0;
    this.CanToggleChange = e => {
      var i;
      return !!Info_1.Info.IsInGamepad() || (i = TAB_CD, !this.L6e) || Time_1.Time.Now - this.L6e >= i;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    var e = this.OpenParam;
    var i = e.SubView;
    this.HVf = e.OpenType;
    switch (e.OpenType) {
      case 0:
        this.CNe = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData;
        break;
      case 1:
        this.CNe = ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController.ActivityData;
        var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_ActivityBeginnerSupportRecommendBg");
        this.SetTextureByPath(t, this.GetTexture(1));
    }
    await this.sso();
    this.cda.SelectToggleByIndex(this.z3f.indexOf(i) ?? 0, true, true);
    this.cda.SetPnlListUiActive(i !== 6);
    this.cda.BindCanExecuteChange(this.CanToggleChange);
  }
  OnBeforeShow() {
    var e;
    var i = this._da.get(this.uda);
    if (i) {
      e = i.IsShowOrShowing;
      i.SetActive(true);
      if (!e) {
        this.UiViewSequence.StopSequenceByKey("Switch");
        this.PlaySequenceAsync("Switch", true);
        i.OnParentShow();
      }
    }
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
    this.kOe();
  }
  jm() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.GOe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  OnAfterHide() {
    this.jm();
    var e = this._da.get(this.uda);
    if (e) {
      e.SetActive(false);
    }
  }
  OnBeforeDestroy() {
    this.Cda();
    if (this.cda) {
      var e;
      for ([, e] of this.cda?.GetTabItemMap()) {
        e.Clear();
      }
      this.cda.Destroy();
      this.cda = undefined;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt);
  }
  async gda(i, e) {
    if (!this._da.has(i)) {
      await this.vda(i).then(e => {
        if (e) {
          this._da.set(i, e);
        }
      });
    }
    var t = this._da.get(i);
    await t.ShowAsync();
    t.Update(e);
  }
  async pda(e) {
    if (this._da.has(e)) {
      await this._da.get(e).HideAsync();
    }
  }
  Cda() {
    this._da.forEach(e => {
      e.UnBindPassRecallBaseCallBack();
      e.CloseMeAsync();
    });
    this._da.clear();
  }
  async vda(e) {
    let i = undefined;
    var t = this.GetItem(2);
    switch (e) {
      case 6:
        await (i = new ActivityRegressSignInSubView_1.ActivityRegressSignInSubView()).CreateThenShowByResourceIdAsync("UiItem_CircumfluenceSignin", t);
        break;
      case 0:
        await (i = new RegressBpMainView_1.RegressBpMainView()).CreateThenShowByResourceIdAsync("UiItem_CircumfluenceBPRoot", t);
        break;
      case 1:
        await (i = new ActivityRegressRecommendView_1.ActivityRegressRecommendView()).CreateThenShowByResourceIdAsync(this.HVf === 1 ? "UiItem_BeginnerSupportRecommend" : "UiItem_CircumfluenceRecommend30", t);
        break;
      case 2:
        await (i = new ActivityRegressDoubleDropView_1.ActivityRegressDoubleDropView()).CreateThenShowByResourceIdAsync("UiItem_CircumfluenceChallenge", t);
        break;
      case 3:
        await (i = new ActivityRegressAdventureView_1.ActivityRegressAdventureView()).CreateThenShowByResourceIdAsync(this.HVf === 1 ? "UiItem_BeginnerSupportRoleDevelop" : "UiItem_CircumfluenceRoleDevelop30", t);
        break;
      case 4:
        await (i = new ActivityRegressNewVersionRoleView_1.ActivityRegressNewVersionRoleView()).CreateThenShowByResourceIdAsync("UiItem_InvocationGuide", t);
        break;
      case 5:
        await (i = new ActivityRegressNewVersionMainQuestView_1.ActivityRegressNewVersionMainQuestView()).CreateThenShowByResourceIdAsync("UiItem_MissionGuide", t);
    }
    return i;
  }
  async mda(e, i = 0) {
    if (e !== this.uda) {
      if (this.uda !== undefined) {
        await this.pda(this.uda);
      }
      await this.gda(e, i);
      this.uda = e;
      this.qEi();
      if (e === 1) {
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.SetRecommendRedDotChecked();
      }
      if (e === 2) {
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.SetDoubleDropRedDotChecked();
      }
      if (e === 3) {
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.SetAdventureRedDotChecked();
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController?.NotifyRedDotRefresh();
      }
      if (this.uda === 4 || this.uda === 5) {
        this.GetItem(4).SetUIActive(false);
      } else {
        this.GetItem(4).SetUIActive(true);
      }
    }
  }
  qEi() {
    let e = undefined;
    if (this.uda === 6) {
      e = "RecallActivity_Sign_Title";
    }
    var i = this.gTa();
    var i = i !== undefined ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i) : "";
    if (e) {
      this.cda.UpdateTitle(i, new CommonTabTitleData_1.CommonTabTitleData(e));
    }
    this.GetItem(4).SetUIActive(this.uda !== 6);
  }
  Z3f(e) {
    switch (e) {
      case 0:
        return "SP_IconCircumfluence1";
      case 1:
        return "SP_IconTab01";
      case 2:
        return "SP_IconCircumfluence3";
      case 3:
        return "SP_IconBeginnerDev";
      case 6:
        return "SP_IconCircumfluence1";
      case 4:
        return "SP_IconComDrawcard";
      case 5:
        return "SP_FuncIconRenwu";
    }
  }
  J3f(e) {
    switch (e) {
      case 0:
        return "Regress_BattlePass_Title";
      case 1:
        return "Regress_Recommend_Title";
      case 2:
        return "Regress_DoubleDrop_Title";
      case 3:
        return "Regress_Adventure_Title";
      case 6:
        return "Regress_Sign_Title";
      case 4:
        return "Regress_NewVersion_Role_Title";
      case 5:
        return "Regress_NewVersion_MainLine_Title";
    }
  }
  gTa() {
    switch (this.uda) {
      case 0:
        return "SP_IconCircumfluence1";
      case 1:
        return "SP_IconTab01";
      case 2:
        return "SP_IconCircumfluence3";
      case 3:
        return "SP_IconBeginnerDev";
      case 6:
        return "SP_IconCircumfluence1";
      case 4:
        return "SP_IconComDrawcard";
      case 5:
        return "SP_FuncIconRenwu";
    }
  }
  Og() {
    var e = this._da.get(this.uda);
    if (e) {
      e.Update();
    }
  }
  async sso() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.jdi, this.zno, this.yqe);
    this.cda = new ActivityRegressMainCaptionListPanel_1.ActivityRegressMainCaptionListPanel();
    var i = this.GetItem(0).GetOwner();
    this.cda.Init(e);
    await this.cda.CreateThenShowByActorAsync(i);
    await this.Tfa();
    this.cda.BindTabTitleCallBack(() => {
      UiManager_1.UiManager.CloseView("ActivityRegressMainView");
    });
  }
  async Tfa() {
    this.z3f = ModelManager_1.ModelManager.ActivityRegressModel.GetNewRegressSubView(this.OpenParam.SubView === 6, this.HVf);
    var i = new Array();
    for (let e = 0; e < this.z3f.length; e++) {
      var t = new CommonTabItemBase_1.CommonTabItemData();
      t.Index = e;
      t.Data = this.cda.GetTabComponentData(e);
      i.push(t);
      if (this.z3f[e] === 1) {
        t.RedDotName = "ActivityRegressRecommend";
      }
      if (this.z3f[e] === 2) {
        t.RedDotName = "ActivityRegressDoubleDrop";
      }
      if (this.z3f[e] === 3) {
        t.RedDotName = "ActivityRegressAdventure";
      }
    }
    await this.cda.RefreshTabItemByDataAsync(i);
  }
}
exports.ActivityRegressMainView = ActivityRegressMainView;
//# sourceMappingURL=ActivityRegressMainView.js.map