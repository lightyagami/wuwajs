"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoWorldMainPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const AbyssButtonItem_1 = require("./AbyssButtonItem");
const DangoWorldQuestItem_1 = require("./DangoWorldQuestItem");
class DangoWorldMainPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this._Oc = undefined;
    this.Eyc = undefined;
    this.Iyc = undefined;
    this.pp1 = undefined;
    this.rcr = undefined;
    this.Bx1 = () => {
      this.$8i = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData();
      this.Og();
    };
    this.Kco = () => {
      this.o3c();
    };
    this._y1 = () => {
      if (ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable()) {
        ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController.OpenCurrentRoleUpView();
      }
    };
    this.iyi = () => {
      if (ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable()) {
        UiManager_1.UiManager.OpenView("DangoAbyssShopView");
      }
    };
    this.AMo = () => {
      if (!ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenCurrentActivityAbyssEntrance()) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.Kco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssAddRole, this.Kco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityOpen, this.Bx1);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.Kco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssAddRole, this.Kco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityOpen, this.Bx1);
  }
  async OnBeforeStartAsync() {
    this.rcr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    var e = [];
    this.Eyc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Eyc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.Eyc.BindClickCallBack(this._y1);
    this.Iyc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Iyc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.Iyc.BindClickCallBack(this.iyi);
    this._Oc = new ProgressPanel();
    e.push(this._Oc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(e);
    this.pp1 = new DangoWorldQuestItem_1.DangoWorldQuestItem();
    this.pp1.Init(this.GetScrollViewWithScrollbar(1), this.GetItem(2));
    this.$8i = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData();
    this.Visible = true;
    this.ShowBattleChildViewPanel();
    this.AddEvents();
    this.rcr.PlaySequencePurely("Loop");
  }
  OnBeforeDestroy() {
    this.RemoveEvents();
    this.pp1?.Clear();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 5, true);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 7, true);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 8, true);
    this.rcr?.Clear();
  }
  OnBeforeShow() {
    this.Og();
    this.BNe();
  }
  BNe() {
    this.Eyc?.BindRedDot("RedDotDangoDevelop");
    this.Iyc?.BindRedDot("RedDotDangoPayShop");
  }
  Og() {
    this.pp1?.Refresh();
    this.o3c();
    this.cy1();
  }
  o3c() {
    if (this.$8i) {
      this._Oc.Refresh(this.$8i);
    }
  }
  cy1() {
    var e;
    if (this.$8i) {
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable();
      this.Eyc.SetUiActive(e);
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetShopAvailable();
      this.Iyc.SetUiActive(e);
    }
  }
  OnTickBattleChildViewPanel(e) {
    this.pp1?.Tick();
  }
  OnBeforeHide() {
    this.W8e();
  }
  W8e() {
    this.Eyc?.UnBindRedDot();
    this.Iyc?.UnBindRedDot();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length === 2) {
      let e = undefined;
      if (t[1] === "DangoUp") {
        e = this.GetItem(5);
      }
      if (t[1] === "DangoShop") {
        e = this.GetItem(4);
      }
      if (e = t[1] === "CloseBtn" ? this.GetButton(0)?.RootUIComp : e) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.DangoWorldMainPanel = DangoWorldMainPanel;
class ProgressPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture]];
  }
  Refresh(e) {
    var t = e.GetAbyssWorldProgressText();
    this.GetText(1).SetText(t);
    var t = e.GetAbyssWorldProgressPercentage();
    this.GetTexture(2).SetFillAmount(t);
  }
}
//# sourceMappingURL=DangoWorldMainPanel.js.map