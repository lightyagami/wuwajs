"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiScanMachinePanel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const HonamiStoryController_1 = require("../../../HonamiStory/HonamiStoryController");
const MapLogger_1 = require("../../../Map/Misc/MapLogger");
const WorldMapController_1 = require("../../WorldMapController");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class HonamiScanMachinePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(r) {
    this.LayoutContext.MarkItem = r;
    this.cxm();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    this.GetText(4).ShowTextNew(r.GetLocaleDesc());
    this.UpdateMultiMap();
    this.UpdateTopRightIconByTeleportState();
    r = this.UpdateQuickGoto();
    this.LayoutContext.SetConfirmBtnActive(!r);
  }
  cxm() {
    var r = this.LayoutContext.MarkItem;
    this.LayoutContext.SetConfirmBtnEnableClick(!r.IsLocked);
  }
  HandleTeleportAndTrack() {
    if (!this.HandleTeleport()) {
      this.HandleTrack();
    }
  }
  HandleTeleport() {
    var r;
    var e = this.LayoutContext.MarkItem;
    return !!e && !e.IsLocked && !((r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetScanMachineById(e.MarkConfig.EntityConfigId)) ? (MapLogger_1.MapLogger.Debug(86, "[地图系统]->传送", ["markId", e.MarkId], ["IsTracked", e.IsTracked]), HonamiStoryController_1.HonamiStoryController.SetHonamiStoryLoadingInfoByTimingOnly(8), WorldMapController_1.WorldMapController.TryTeleportByEntityId(r.InstEntityTeleportId), 0) : (MapLogger_1.MapLogger.Debug(86, "[地图系统]->传送失败,找不到传送配置", ["markId", e.MarkId], ["IsTracked", e.IsTracked]), 1));
  }
}
exports.HonamiScanMachinePanel = HonamiScanMachinePanel;
//# sourceMappingURL=HonamiScanMachinePanel.js.map