"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CostContentItem = exports.LevelLayoutGrid = exports.RoleBreakPreviewView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RoleBreakPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xLn = undefined;
    this.wLn = undefined;
    this.BLn = undefined;
    this.bLn = undefined;
    this.qLn = () => {
      this.bLn.HandleClickLeft();
    };
    this.GLn = () => {
      this.bLn.HandleClickRight();
    };
    this.I5t = () => {
      this.bLn.HandleViewClosePromise(UiManager_1.UiManager.CloseViewAsync("RoleBreakPreviewView"));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIText]];
    this.BtnBindInfo = [[6, this.qLn], [7, this.GLn], [8, this.I5t]];
  }
  async OnBeforeStartAsync() {
    this.bLn = this.OpenParam;
    this.BLn = new CostContentItem(this.bLn);
    await this.BLn.CreateByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    this.xLn = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.bLn.CreateLevelLayoutGrid);
    this.wLn = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.bLn.CreateItemLayoutGrid);
    this.bLn.BindView(this);
    this.bLn.HandleViewOnStart();
  }
  OnBeforeDestroy() {
    this.bLn.Dispose();
    this.bLn = undefined;
    this.xLn = undefined;
    this.wLn = undefined;
    this.BLn = undefined;
  }
  RefreshLevelLayout(t) {
    this.xLn.RefreshByData(t);
  }
  RefreshItemLayout(t) {
    this.wLn.RefreshByData(t, () => {
      this.wLn?.GetUiAnimController()?.Play();
    });
  }
  RefreshLevelContent(t) {
    this.GetText(2).SetText(t.toString());
  }
  RefreshLeftButton(t) {
    this.GetButton(6).SetSelfInteractive(t);
  }
  RefreshRightButton(t) {
    this.GetButton(7).SetSelfInteractive(t);
  }
  RefreshLevelContentItem(t) {
    this.GetItem(9).SetUIActive(t);
  }
  RefreshHasBrokenTip(t) {
    this.GetText(10).SetUIActive(t);
  }
}
exports.RoleBreakPreviewView = RoleBreakPreviewView;
class LevelLayoutGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.bLn = undefined;
    this.kqe = () => {
      this.bLn.HandleItemOnClickToggle(this.GridIndex);
    };
    this.bLn = t;
  }
  NLn() {
    this.bLn = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIExtendToggle]];
    this.BtnBindInfo = [[5, this.kqe]];
  }
  Refresh(t, e, s) {
    this.GridIndex = s;
    var i = t.IsAvailable;
    var h = t.LevelContent.toString();
    this.GetItem(0).SetUIActive(!i);
    this.GetText(1).SetText(i ? "" : h);
    this.GetItem(2).SetUIActive(i);
    this.GetText(3).SetText(i ? h : "");
    this.GetItem(4).SetUIActive(s !== 0);
    this.GetExtendToggle(5).SetToggleState(t.IsChosen ? 1 : 0);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.NLn();
  }
}
exports.LevelLayoutGrid = LevelLayoutGrid;
class CostContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.bLn = undefined;
    this.bLn = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture]];
  }
  OnStart() {
    this.bLn.BindCostContentItem(this);
    this.bLn.HandleCostContentItemOnStart();
  }
  OnBeforeDestroy() {
    this.bLn.UnbindCostContentItem();
    this.bLn = undefined;
  }
  RefreshTitle(t) {
    t = t || "";
    this.GetText(0).SetText(t);
  }
  RefreshCostNumber(t) {
    t = t || "";
    this.GetText(1).SetText(t);
  }
  RefreshMoneyIcon(t) {
    this.SetItemIcon(this.GetTexture(2), t);
  }
}
exports.CostContentItem = CostContentItem;
//# sourceMappingURL=RoleBreakPreviewView.js.map