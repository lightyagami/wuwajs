"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressBpMainView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonTabData_1 = require("../../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../../Common/TabComponent/CommonTabTitleData");
const TabComponent_1 = require("../../../../Common/TabComponent/TabComponent");
const CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase");
const TabViewComponent_1 = require("../../../../Common/TabComponent/TabViewComponent");
const ActivityRegressDefine_1 = require("../ActivityRegressDefine");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
const EXP_BAR_ANIM_DURATION = 0.4;
class RegressBpMainView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.Ivt = undefined;
    this.Tvt = undefined;
    this.yvt = [];
    this.Pug = undefined;
    this.Aug = undefined;
    this.Dug = undefined;
    this.TDa = e => {
      if (e === ActivityRegressDefine_1.RECALL_SCORE_ITEM_ID) {
        this.R5e();
      }
    };
    this.Og = e => {
      var t = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetCurLevelProgressData();
      this.GetText(2).SetText(t.Level.toString());
      this.GetText(3).SetText(t.CurScore + "/" + t.NeedScore);
      this.GetSprite(4).SetFillAmount(t.CurScore / t.NeedScore);
      this.ZGe();
      this.R5e(e);
    };
    this.fqe = (e, t) => {
      return new TabItem();
    };
    this.pqe = e => {
      e = this.yvt[e];
      this.Tvt?.ToggleCallBack(e, e.ChildViewName);
      this.Tvt?.GetCurrentTabView()?.RefreshBtnClaimVisible(this.GetButton(7).RootUIComp);
      this.SequencePlayer?.StopSequenceByKey("Switch");
      this.SequencePlayer?.PlaySequence("Switch");
    };
    this.ENf = () => {
      UiManager_1.UiManager.OpenView("RegressBpBuyLevelView");
    };
    this.INf = () => {
      this.Tvt?.GetCurrentTabView()?.OnClickBtnClaimAll();
    };
    this.TNf = () => {
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetBpPayButtonRedDotChecked();
      UiManager_1.UiManager.OpenView("RegressBpPayView", undefined, (e, t) => {
        UiManager_1.UiManager.GetViewByName("ActivityRegressMainView")?.AddChildViewById(t);
      });
      this.Og();
    };
    this.Uug = async (e, t, i, s) => {
      if (e < t) {
        await this.xug(i, 1);
        this.Og();
        this.SequencePlayer?.PlaySequence("LevelUp");
        await this.xug(0, s);
        UiManager_1.UiManager.OpenView("RegressBpLevelUpTipsView", {
          PrevLevel: e,
          CurLevel: t
        });
      } else {
        await this.xug(i, s);
        this.Og();
      }
    };
    this.Bug = e => {
      var t = this.GetSprite(4);
      if (t) {
        t.SetFillAmount(e);
      }
    };
    this.tco = () => {
      this.kug();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIItem]];
    this.BtnBindInfo = [[5, this.ENf], [7, this.INf], [8, this.TNf]];
  }
  OnUpdate(e) {
    this.ZGe();
    this.R5e();
  }
  async OnBeforeStartAsync() {
    this.Ivt = new TabComponent_1.TabComponent(this.GetItem(0), this.fqe, this.pqe, this.GetItem(1));
    this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(6));
    this.yvt = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("RegressBpMainView");
    await this.Ivt.RefreshTabItemAsync(this.CreateTabItemDataByLength(this.yvt.length));
    this.Ivt.SelectToggleByIndex(0);
    this.Og();
    this.Aug = (0, puerts_1.toManualReleaseDelegate)(this.Bug);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RegressBpExpAnim, this.Uug);
    this.Og(true);
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RegressBpExpAnim, this.Uug);
    this.kug();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.kug();
    (0, puerts_1.releaseManualReleaseDelegate)(this.Bug);
  }
  ZGe() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetCurLevelProgressData();
    this.GetButton(5).SetSelfInteractive(e.Level < e.MaxLevel);
    this.GetButton(8).RootUIComp.SetUIActive(!ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.IsPayRewardUnlock());
    this.GetItem(9).SetUIActive(ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.CheckBpPayButtonRedDot());
  }
  R5e(e) {
    var t = this.Tvt?.GetCurrentTabView();
    t?.RefreshView(e);
    t?.RefreshBtnClaimVisible(this.GetButton(7).RootUIComp);
  }
  CreateTabItemDataByLength(t) {
    var i = new Map();
    i.set("RegressBpRewardTabView", "ActivityRegressBpReward");
    i.set("RegressBpTaskTabView", "ActivityRegressBpTask");
    var s = new Array();
    for (let e = 0; e < t; e++) {
      var a = new CommonTabItemBase_1.CommonTabItemData();
      a.Index = e;
      var n = this.yvt[e];
      a.Data = new CommonTabData_1.CommonTabData("", new CommonTabTitleData_1.CommonTabTitleData(n.TabName));
      a.RedDotName = i.get(n.ChildViewName);
      s.push(a);
    }
    return s;
  }
  async xug(e, t) {
    this.kug();
    var i = this.GetSprite(4);
    if (i && this.Aug && (i.SetFillAmount(e), this.Dug?.SetResult(), this.Dug = new CustomPromise_1.CustomPromise(), this.Pug = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Aug, e, t, EXP_BAR_ANIM_DURATION, 0, 12), this.Pug && this.Pug.OnCompleteCallBack.Bind(this.tco), this.Dug)) {
      await this.Dug.Promise;
    }
  }
  kug() {
    if (this.Dug) {
      this.Dug.SetResult();
      this.Dug = undefined;
    }
    if (this.Pug && this.Pug.IsValid()) {
      this.Pug.Kill();
    }
    this.Pug = undefined;
  }
}
exports.RegressBpMainView = RegressBpMainView;
class TabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.Bke = e => {
      if (e === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnRefresh(e, t, i) {
    this.GetText(1).ShowTextNew(e.Data?.GetTitleData()?.TextId ?? "");
    this.UnBindRedDot();
    if (e.RedDotName) {
      this.BindRedDot(e.RedDotName, e.RedDotUid);
    }
  }
  BindRedDot(e, t = 0) {
    this.l4e = e;
    if (this.l4e) {
      RedDotController_1.RedDotController.BindRedDot(e, this.GetItem(4), undefined, t);
    }
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindRedDot(this.l4e);
      this.l4e = undefined;
    }
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  OnSelected(e) {
    this.SelectedCallBack(this.GridIndex);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  OnClear() {
    this.UnBindRedDot();
  }
}
//# sourceMappingURL=RegressBpMainView.js.map