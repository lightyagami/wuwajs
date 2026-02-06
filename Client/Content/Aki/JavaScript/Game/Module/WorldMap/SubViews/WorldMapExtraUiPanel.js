"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapExtraUiPanel = undefined;
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class WorldMapExtraUiPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e, a) {
    super();
    this.PanelName = e;
    this.ExtraUiPanelComponent = a;
    this.OpenParam = undefined;
  }
  GetScaleSlider() {}
  OnHandleShowParam(e) {}
  OnClickEmpty(e) {}
  OnClickMarkItem(e) {}
  OnClickMarks(e, a) {}
  GetIsEnableMapScale() {
    return true;
  }
  GetIsEnableMapCursorButton() {
    return true;
  }
  OnPointerDrag(e) {}
  CloseMe() {
    this.ExtraUiPanelComponent.CloseUi(this);
  }
  GetDefaultMapScale() {
    return 0;
  }
  GetMaxMapScale() {
    return 0;
  }
  GetMinMapScale() {
    return 0;
  }
  GetTileNum() {}
  GetIsShowPlayerMark() {
    return false;
  }
}
exports.WorldMapExtraUiPanel = WorldMapExtraUiPanel;
//# sourceMappingURL=WorldMapExtraUiPanel.js.map