"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportPanel = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class TeleportPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.u2o = undefined;
    this.R4l = e => {
      if (e === this.u2o?.MarkConfigId) {
        this.Close();
      }
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnlockTeleport, this.R4l);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnlockTeleport, this.R4l);
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.u2o = e;
    this.LayoutContext.MarkItem = e;
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonEnableClickByTeleportState(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    this.GetText(4).ShowTextNew(this.u2o.GetLocaleDesc());
    this.UpdateMultiMap();
    this.UpdateTopRightIconByTeleportState();
    e = this.UpdateQuickGoto();
    this.ConfirmButton.SetActive(!e);
  }
}
exports.TeleportPanel = TeleportPanel;
//# sourceMappingURL=TeleportPanel.js.map