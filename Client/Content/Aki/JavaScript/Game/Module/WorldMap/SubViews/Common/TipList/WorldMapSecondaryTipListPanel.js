"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryTipListPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const WorldMapSecondaryTipListItem_1 = require("./WorldMapSecondaryTipListItem");
class WorldMapSecondaryTipListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.In_ = undefined;
    this.CreateListItem = () => new WorldMapSecondaryTipListItem_1.WorldMapSecondaryTipListItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetVerticalLayout(0);
    this.In_ = new GenericLayout_1.GenericLayout(e, this.CreateListItem);
  }
  OnBeforeDestroy() {
    this.In_.ClearChildren();
  }
  RefreshByData(e) {
    this.In_.RefreshByData(e);
  }
}
exports.WorldMapSecondaryTipListPanel = WorldMapSecondaryTipListPanel;
//# sourceMappingURL=WorldMapSecondaryTipListPanel.js.map