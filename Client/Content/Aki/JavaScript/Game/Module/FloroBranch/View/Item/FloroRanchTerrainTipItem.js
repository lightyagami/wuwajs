"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTerrainTipItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class FloroRanchTerrainTipItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    var e = {
      UiText: this.GetText(1),
      ViewType: 0,
      ReportType: 8,
      Style: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(1));
  }
  RefreshInfoTipByEntity(e) {
    this.Y_u(e);
  }
  Y_u(e) {
    if (e = e && e.CheckGetComponent(2)?.TerrainData) {
      this.GetText(0)?.SetText(e.Name);
      this.GetText(1)?.SetText(e.Desc);
      this.GetRootItem()?.SetUIActive(true);
    } else {
      this.GetRootItem()?.SetUIActive(false);
    }
  }
}
exports.FloroRanchTerrainTipItem = FloroRanchTerrainTipItem;
//# sourceMappingURL=FloroRanchTerrainTipItem.js.map