"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUiLayoutB = undefined;
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel");
const WorldMapSecondaryUiAutoPilotContext_1 = require("./WorldMapSecondaryUiAutoPilotContext");
const WorldMapSecondaryUiContext_1 = require("./WorldMapSecondaryUiContext");
class WorldMapSecondaryUiLayoutB extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments);
    this.LeftConfirmBtn = undefined;
    this.RightConfirmBtn = undefined;
    this.MiddleCenterBtn = undefined;
    this.LayoutContext = undefined;
    this.AutoPilotContext = undefined;
    this.MapTipsActivateTipPanel = undefined;
    this.OnLeftConfirmBtnClick = () => {};
    this.OnRightConfirmBtnClick = () => {};
    this.OnMiddleCenterBtnClick = () => {};
    this.OnDelBtnClick = () => {};
    this.PKt = t => {
      this.OnRefreshPanel(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoB;
    this.BtnBindInfo = [[10, this.OnDelBtnClick]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.OLf();
    this.MapTipsActivateTipPanel = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel();
    this.lGf();
    var t = [];
    t.push(this._Gf(this.LayoutContext));
    t.push(this.MapTipsActivateTipPanel.CreateByActorAsync(this.GetItem(13).GetOwner()));
    await Promise.all(t);
  }
  OLf() {
    this.LeftConfirmBtn = new ButtonItem_1.ButtonItem(this.GetItem(7));
    this.LeftConfirmBtn.SetFunction(this.OnLeftConfirmBtnClick);
    this.RightConfirmBtn = new ButtonItem_1.ButtonItem(this.GetItem(8));
    this.RightConfirmBtn.SetFunction(this.OnRightConfirmBtnClick);
    this.MiddleCenterBtn = new ButtonItem_1.ButtonItem(this.GetButton(12).RootUIComp);
    this.MiddleCenterBtn.SetFunction(this.OnMiddleCenterBtnClick);
  }
  lGf() {
    this.LayoutContext = new WorldMapSecondaryUiContext_1.WorldMapSecondaryUiContext();
    this.LayoutContext.TrackButtonItem = this.LeftConfirmBtn;
    this.LayoutContext.MapTipsActivateTipPanel = this.MapTipsActivateTipPanel;
  }
  async _Gf(t) {
    this.AutoPilotContext = new WorldMapSecondaryUiAutoPilotContext_1.WorldMapSecondaryUiAutoPilotContext(t);
    this.AutoPilotContext.SetCloseSecondaryUiFunction(this.Close);
    this.AutoPilotContext.SetDownStateBtnRoot(this.GetItem(15));
    this.AutoPilotContext.SetUiParent(this.GetItem(14));
    this.AutoPilotContext.RefreshPanelCallback = this.PKt;
    await this.AutoPilotContext.InitAutoPilotUi();
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(false);
    this.SetDelBtnActive(false);
  }
  OnBeforeDestroy() {
    this.LeftConfirmBtn.Destroy();
    this.RightConfirmBtn.Destroy();
    this.MiddleCenterBtn.Destroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    this.MapTipsActivateTipPanel.SetUiActive(false);
    this.AutoPilotContext?.SetMap(this.Map);
    this.AutoPilotContext?.SetDownStateBtnRootActive(true);
    this.AutoPilotContext?.SetAutoPilotNavBtnActive(false);
    this.AutoPilotContext?.RefreshAutoPilotTrackBtnGroup(false);
  }
  SetDelBtnActive(t) {
    this.GetButton(10).RootUIComp.SetUIActive(t);
  }
  SetDelBtnSelfInteractive(t) {
    this.GetButton(10).SetSelfInteractive(t);
  }
  OnAfterShowWorldMapSecondaryUi() {
    this.AutoPilotContext?.UpdateAutoPilotState();
  }
  OnRefreshPanel(t) {}
}
exports.WorldMapSecondaryUiLayoutB = WorldMapSecondaryUiLayoutB;
//# sourceMappingURL=WorldMapSecondaryUiLayoutB.js.map