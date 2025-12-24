"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCollectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
const HelpController_1 = require("../../../Help/HelpController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaCollectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityId = 0;
    this.HRu = 0;
    this.yvt = [];
    this.Ivt = undefined;
    this.Tvt = undefined;
    this.i71 = () => {
      this.CloseMe();
    };
    this.QCu = () => {
      var e = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId) ? PhantomArenaDefine_1.HELP_ID_COLLECT_NEW : PhantomArenaDefine_1.HELP_ID_COLLECT;
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.fqe = e => new CommonTabItem_1.CommonTabItem();
    this.pqe = e => {
      var t = this.yvt[e];
      var n = t.ChildViewName;
      var a = this.Ivt.GetTabItemByIndex(e);
      this.HRu = e;
      this.Tvt.ToggleCallBack(t, n, a, this.ActivityId);
      this.d7s(n);
    };
    this.yqe = e => {
      e = this.yvt[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.Hgu = e => {
      var t = this.yvt[this.HRu].ChildViewName;
      this.d7s(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.ActivityId = this.OpenParam;
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(2));
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.i71);
    this.Ivt.SetHelpButtonShowState(true);
    this.Ivt.SetHelpButtonCallBack(this.QCu);
    this.yvt = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectTabDataList(this.Info.Name);
    var e = this.yvt.length;
    var e = this.Ivt.CreateTabItemDataByLength(e);
    await this.Ivt.RefreshTabItemAsync(e);
  }
  OnBeforeShow() {
    this.Ivt.SelectToggleByIndex(this.HRu);
    if (ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId)) {
      this.GetItem(3)?.SetUIActive(false);
    }
    this.K8e();
  }
  OnBeforeHide() {
    this.Ovt();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.Hgu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.Hgu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.Hgu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.Hgu);
  }
  d7s(e) {
    let t = 0;
    let n = 0;
    let a = "";
    if (e === "PhantomArenaCollectBadgeTabView") {
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeUnlockCount(this.ActivityId);
      n = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeAllCount(this.ActivityId);
      a = "PhantomBattle_1118";
    } else if (e === "PhantomArenaCollectCardTabView" || e === "PhantomArenaCollectCardTabViewNew") {
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardUnlockCount(this.ActivityId);
      n = ModelManager_1.ModelManager.PhantomArenaModel.GetCardAllCount(this.ActivityId);
      a = "PhantomBattle_1119";
    }
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), a, t, n);
  }
  K8e() {
    this.p1c("PhantomArenaCollectBadgeTabView", "RedDotPhantomArenaBadgeReward", true);
    this.p1c("PhantomArenaCollectCardTabView", "RedDotPhantomArenaCardReward", true);
  }
  Ovt() {
    this.p1c("PhantomArenaCollectBadgeTabView", "RedDotPhantomArenaBadgeReward", false);
    this.p1c("PhantomArenaCollectCardTabView", "RedDotPhantomArenaCardReward", false);
  }
  p1c(t, e, n) {
    var a = this.yvt.findIndex(e => e.ChildViewName === t);
    if (a >= 0) {
      a = this.Ivt.GetTabItemByIndex(a);
      if (n) {
        a?.BindRedDot(e, this.ActivityId);
      } else {
        a?.UnBindRedDot();
      }
    }
  }
}
exports.PhantomArenaCollectView = PhantomArenaCollectView;
//# sourceMappingURL=PhantomArenaCollectView.js.map