"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashRootView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const HandBookController_1 = require("../../HandBook/HandBookController");
const HelpController_1 = require("../../Help/HelpController");
const CalabashTabItem_1 = require("./CalabashTabItem");
const CALABASH_LEVEL_UP_HELP_ID = 48;
const CALABASH_COLLECT_HELP_ID = 47;
const VISION_RECOVERY_HELP_ID = 70;
const viewHelpId = new Map([["CalabashLevelUpTabView", CALABASH_LEVEL_UP_HELP_ID], ["CalabashCollectTabView", CALABASH_COLLECT_HELP_ID], ["VisionRecoveryTabView", VISION_RECOVERY_HELP_ID]]);
class CalabashRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yvt = undefined;
    this.Ivt = undefined;
    this.Tvt = undefined;
    this.Lvt = undefined;
    this.Dvt = false;
    this.t5e = 0;
    this.Rvt = () => {
      if (!this.g1c()) {
        this.CloseMe();
      }
    };
    this.dpt = () => {
      HelpController_1.HelpController.OpenHelpById(this.t5e);
    };
    this.Uvt = e => {
      var t = this.yvt.findIndex(e => e.ChildViewName === "CalabashCollectTabView");
      if (this.Lvt) {
        this.Lvt.TabViewName = "CalabashCollectTabView";
        this.Lvt.Param = e;
      } else {
        this.Lvt = {
          TabViewName: "CalabashCollectTabView",
          Param: e
        };
      }
      this.Ivt.SelectToggleByIndex(t);
    };
    this.Avt = e => {
      var t = this.yvt.findIndex(e => e.ChildViewName === "PhantomBattleFettersTabView");
      if (this.Lvt) {
        this.Lvt.TabViewName = "PhantomBattleFettersTabView";
        this.Lvt.Param = e;
      } else {
        this.Lvt = {
          TabViewName: "PhantomBattleFettersTabView",
          Param: e
        };
      }
      this.Ivt.SelectToggleByIndex(t);
    };
    this.fqe = e => new CalabashTabItem_1.CalabashTabItem();
    this.pqe = e => {
      var t = this.yvt[e];
      var i = t.ChildViewName;
      var e = this.Ivt.GetTabItemByIndex(e);
      var a = i === this.Lvt?.TabViewName ? this.Lvt?.Param : undefined;
      this.Tvt.ToggleCallBack(t, i, e, a);
      if (this.Lvt) {
        this.Lvt.Param = undefined;
      }
      this.t5e = viewHelpId.get(i) ?? -1;
      this.Ivt.SetHelpButtonShowState(this.t5e > 0);
      this.GetItem(3)?.SetUIActive(i === "CalabashCollectTabView");
    };
    this.yqe = e => {
      e = this.yvt[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.Bvt = e => {
      ModelManager_1.ModelManager.CalabashModel.SaveIfSimpleState(!e);
    };
    this.Pvt = () => {
      this.Ivt?.HideItem();
    };
    this.xvt = () => {
      this.Ivt?.ShowItem();
    };
    this.wvt = e => {
      if (e) {
        this.UiViewSequence.PlaySequence("SwitchA");
      } else {
        this.UiViewSequence.PlaySequence("SwitchB");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIExtendToggle], [3, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Bvt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.JumpToCalabashCollect, this.Uvt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView, this.Avt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CalabashEnterInternalView, this.Pvt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CalabashQuitInternalView, this.xvt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshCalabashTabShowState, this.wvt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.JumpToCalabashCollect, this.Uvt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.JumpToPhantomBattleFettersTabView, this.Avt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CalabashEnterInternalView, this.Pvt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CalabashQuitInternalView, this.xvt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshCalabashTabShowState, this.wvt);
  }
  async OnBeforeStartAsync() {
    this.Dvt = true;
    await HandBookController_1.HandBookController.SendIllustratedInfoRequestAsync([1]);
    ModelManager_1.ModelManager.CalabashModel.CheckSimpleStateSave();
    var e = ModelManager_1.ModelManager.CalabashModel.GetIfSimpleState() ? 0 : 1;
    this.GetExtendToggle(2)?.SetToggleState(e);
    this.Lvt = this.OpenParam;
    this.bvt();
    await this.qvt();
    this.Gvt();
  }
  bvt() {
    this.yvt = ModelManager_1.ModelManager.CalabashModel?.GetViewTabList();
  }
  async qvt() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.Rvt);
    this.Ivt.SetHelpButtonCallBack(this.dpt);
    var e = this.yvt.length;
    await this.Ivt.RefreshTabItemByLengthAsync(e);
  }
  Gvt() {
    this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  Nvt() {
    const t = this.Lvt?.TabViewName;
    let e = 0;
    var i;
    e = t ? this.yvt.findIndex(e => e.ChildViewName === t) : (i = this.Ivt.GetSelectedIndex()) !== CommonDefine_1.INVALID_VALUE ? i : 0;
    this.Ivt.SelectToggleByIndex(e);
  }
  K8e() {
    this.p1c("CalabashLevelUpTabView", "CalabashTab", true);
    this.p1c("VisionRecoveryTabView", "VisionRecovery", true);
    this.p1c("VisionRefineTabView", "VisionRefine", true);
  }
  p1c(t, e, i) {
    var a = this.yvt.findIndex(e => e.ChildViewName === t);
    if (a >= 0) {
      a = this.Ivt.GetTabItemByIndex(a);
      if (i) {
        a?.BindRedDot(e);
      } else {
        a?.UnBindRedDot();
      }
    }
  }
  OnBeforeShow() {
    if (this.Dvt) {
      this.Nvt();
    } else {
      this.Tvt.SetCurrentTabViewState(true);
    }
    this.Dvt = false;
    this.K8e();
  }
  OnBeforeHide() {
    this.Ovt();
    this.Tvt.SetCurrentTabViewState(false);
  }
  OnAfterHide() {
    var e = this.Tvt.GetTabViewByTabKey("VisionRecoveryTabView");
    if (e !== undefined) {
      e.RemoveAllVisionItemOutside();
    }
  }
  Ovt() {
    this.p1c("CalabashLevelUpTabView", "CalabashTab", false);
    this.p1c("VisionRecoveryTabView", "VisionRecovery", false);
    this.p1c("VisionRefineTabView", "VisionRefine", false);
  }
  OnBeforeDestroy() {
    this.Ivt.Destroy();
    this.Tvt.DestroyTabViewComponent();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const t = Number(e[0]);
    var i = this.Ivt.GetTabItemByIndex(this.yvt.findIndex(e => e.Id === t)).GetRootItem();
    if (i) {
      return [i, i];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    }
  }
  g1c() {
    if (this.Tvt && this.Tvt.GetCurrentTabViewName() === "VisionRefineTabView") {
      return this.Tvt.GetCurrentTabView()?.OnClickCloseRoot();
    }
    return false;
  }
}
exports.CalabashRootView = CalabashRootView;
//# sourceMappingURL=CalabashRootView.js.map