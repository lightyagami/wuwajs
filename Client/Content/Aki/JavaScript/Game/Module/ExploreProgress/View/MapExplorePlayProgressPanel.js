"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExplorePlayProgressPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const MapExplorePlayProgressItem_1 = require("./MapExplorePlayProgressItem");
class MapExplorePlayProgressPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ANl = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem]];
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeShow() {
    this.ANl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), () => new MapExplorePlayProgressItem_1.MapExplorePlayProgressItem());
  }
  UpdateData(e, r) {
    this.ANl?.RefreshByData(e, () => {
      r?.();
    });
  }
  CheckPlayStateChanged() {
    this.ANl?.GetLayoutItemList().forEach(e => {
      e.CheckPlayStateChanged();
    });
  }
}
exports.MapExplorePlayProgressPanel = MapExplorePlayProgressPanel;
//# sourceMappingURL=MapExplorePlayProgressPanel.js.map