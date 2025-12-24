"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUiContext = undefined;
class WorldMapSecondaryUiContext {
  constructor() {
    this.MarkItem = undefined;
    this.SetSpriteByPathAction = undefined;
    this.Icon = undefined;
    this.Title = undefined;
    this.AreaText = undefined;
    this.AreaIconItem = undefined;
    this.DescriptionText = undefined;
    this.p9t = undefined;
    this.TrackButtonItem = undefined;
    this.DownStateIcon = undefined;
    this.PanelProgressItem = undefined;
    this.PanelListLayout = undefined;
    this.DelButton = undefined;
    this.MapTipsActivateTipPanel = undefined;
    this.TakeAction = false;
    this._7m = true;
  }
  SetConfirmBtnItem(i) {
    this.p9t = i;
  }
  SetConfirmBtnActive(i) {
    this.p9t.SetActive(i);
    this._7m = i;
  }
  GetIsConfirmBtnActive() {
    return this.p9t && this._7m;
  }
  SetConfirmBtnText(i, ...t) {
    if (i !== undefined) {
      this.p9t.TrySetLocalTextNew(i, ...t);
    }
  }
  SetConfirmBtnEnableClick(i) {
    this.p9t.SetEnableClick(i);
  }
}
exports.WorldMapSecondaryUiContext = WorldMapSecondaryUiContext;
//# sourceMappingURL=WorldMapSecondaryUiContext.js.map