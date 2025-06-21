"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCollectView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem"),
  TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent"),
  HelpController_1 = require("../../../Help/HelpController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaCollectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Ldu = 0, this.yvt = [], this.Ivt = void 0, this.Tvt = void 0, this.Sj1 = () => {
      this.CloseMe()
    }, this.Plu = () => {
      HelpController_1.HelpController.OpenHelpById(PhantomArenaDefine_1.HELP_ID_COLLECT)
    }, this.fqe = e => new CommonTabItem_1.CommonTabItem, this.pqe = e => {
      var t = this.yvt[e],
        n = t.ChildViewName,
        o = this.Ivt.GetTabItemByIndex(e);
      this.Ldu = e, this.Tvt.ToggleCallBack(t, n, o), this.d7s(n)
    }, this.yqe = e => {
      e = this.yvt[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName))
    }, this.ilu = e => {
      var t = this.yvt[this.Ldu].ChildViewName;
      this.d7s(t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe),
      e = (this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(2)), this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.Sj1), this.Ivt.SetHelpButtonShowState(!0), this.Ivt.SetHelpButtonCallBack(this.Plu), this.yvt = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectTabDataList(), this.yvt.length),
      e = this.Ivt.CreateTabItemDataByLength(e);
    await this.Ivt.RefreshTabItemAsync(e)
  }
  OnBeforeShow() {
    this.Ivt.SelectToggleByIndex(this.Ldu), this.K8e()
  }
  OnBeforeHide() {
    this.Ovt()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.ilu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.ilu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.ilu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.ilu)
  }
  d7s(e) {
    let t = 0,
      n = 0,
      o = "";
    "PhantomArenaCollectBadgeTabView" === e ? (t = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeUnlockCount(), n = ModelManager_1.ModelManager.PhantomArenaModel.GetBadgeAllCount(), o = "PhantomBattle_1118") : "PhantomArenaCollectCardTabView" === e && (t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardUnlockCount(), n = ModelManager_1.ModelManager.PhantomArenaModel.GetCardAllCount(), o = "PhantomBattle_1119"), LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), o, t, n)
  }
  K8e() {
    this.p1c("PhantomArenaCollectBadgeTabView", "RedDotPhantomArenaBadgeReward", !0), this.p1c("PhantomArenaCollectCardTabView", "RedDotPhantomArenaCardReward", !0)
  }
  Ovt() {
    this.p1c("PhantomArenaCollectBadgeTabView", "RedDotPhantomArenaBadgeReward", !1), this.p1c("PhantomArenaCollectCardTabView", "RedDotPhantomArenaCardReward", !1)
  }
  p1c(t, e, n) {
    var o = this.yvt.findIndex(e => e.ChildViewName === t);
    0 <= o && (o = this.Ivt.GetTabItemByIndex(o), n ? o?.BindRedDot(e) : o?.UnBindRedDot())
  }
}
exports.PhantomArenaCollectView = PhantomArenaCollectView;
//# sourceMappingURL=PhantomArenaCollectView.js.map