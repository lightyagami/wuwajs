"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoWorldMainPanel = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder"),
  BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel"),
  AbyssButtonItem_1 = require("./AbyssButtonItem"),
  DangoWorldQuestItem_1 = require("./DangoWorldQuestItem");
class DangoWorldMainPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments), this.$8i = void 0, this._Oc = void 0, this.Eyc = void 0, this.Iyc = void 0, this.K01 = void 0, this.rcr = void 0, this.sx1 = () => {
      this.$8i = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData(), this.Og()
    }, this.Kco = () => {
      this.o3c()
    }, this.Fv1 = () => {
      ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable() && ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController.OpenCurrentRoleUpView()
    }, this.iyi = () => {
      ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable() && UiManager_1.UiManager.OpenView("DangoAbyssShopView")
    }, this.AMo = () => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenCurrentActivityAbyssEntrance() || ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.AMo]
    ]
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.Kco), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssAddRole, this.Kco), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityOpen, this.sx1)
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.Kco), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssAddRole, this.Kco), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityOpen, this.sx1)
  }
  async OnBeforeStartAsync() {
    this.rcr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    var e = [];
    this.Eyc = new AbyssButtonItem_1.AbyssButtonItem, e.push(this.Eyc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())), this.Eyc.BindClickCallBack(this.Fv1), this.Iyc = new AbyssButtonItem_1.AbyssButtonItem, e.push(this.Iyc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), this.Iyc.BindClickCallBack(this.iyi), this._Oc = new ProgressPanel, e.push(this._Oc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), await Promise.all(e), this.K01 = new DangoWorldQuestItem_1.DangoWorldQuestItem, this.K01.Init(this.GetScrollViewWithScrollbar(1), this.GetItem(2)), this.$8i = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData(), this.Visible = !0, this.ShowBattleChildViewPanel(), this.AddEvents(), this.rcr.PlaySequencePurely("Loop")
  }
  OnBeforeDestroy() {
    this.RemoveEvents(), this.K01?.Clear(), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 5, !0), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 7, !0), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 8, !0), this.rcr?.Clear()
  }
  OnBeforeShow() {
    this.Og(), this.BNe()
  }
  BNe() {
    this.Eyc?.BindRedDot("RedDotDangoDevelop"), this.Iyc?.BindRedDot("RedDotDangoPayShop")
  }
  Og() {
    this.K01?.Refresh(), this.o3c(), this.Nv1()
  }
  o3c() {
    this.$8i && this._Oc.Refresh(this.$8i)
  }
  Nv1() {
    var e;
    this.$8i && (e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable(), this.Eyc.SetUiActive(e), e = ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable(), this.Iyc.SetUiActive(e))
  }
  OnTickBattleChildViewPanel(e) {
    this.K01?.Tick()
  }
  OnBeforeHide() {
    this.W8e()
  }
  W8e() {
    this.Eyc?.UnBindRedDot(), this.Iyc?.UnBindRedDot()
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (2 === t.length) {
      let e = void 0;
      return "DangoUp" === t[1] && (e = this.GetItem(5)), "DangoShop" === t[1] && (e = this.GetItem(4)), (e = "CloseBtn" === t[1] ? this.GetButton(0)?.RootUIComp : e) ? [e, e] : void 0
    }
  }
}
exports.DangoWorldMainPanel = DangoWorldMainPanel;
class ProgressPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture]
    ]
  }
  Refresh(e) {
    var t = e.GetAbyssWorldProgressText(),
      t = (this.GetText(1).SetText(t), e.GetAbyssWorldProgressPercentage());
    this.GetTexture(2).SetFillAmount(t)
  }
}
//# sourceMappingURL=DangoWorldMainPanel.js.map