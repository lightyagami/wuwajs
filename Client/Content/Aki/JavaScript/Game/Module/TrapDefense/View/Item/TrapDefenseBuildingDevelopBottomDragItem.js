"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopNormalDragItem = exports.TrapDefenseBuildingDevelopBottomDragItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TrapDefenseBuildingDevelopBottomDragItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText]];
  }
  Refresh(e) {
    this.Data = e;
    this.GetSprite(1)?.SetUIActive(false);
    this.GetTexture(2)?.SetUIActive(e !== undefined);
    this.GetText(3)?.SetUIActive(false);
    if (e) {
      this.SetTextureByPath(e.GetIconPath(), this.GetTexture(2));
    }
  }
  GetDraggableComp() {
    return this.GetDraggable(0);
  }
  OnStartDrag() {
    this.GetSprite(1)?.SetUIActive(true);
  }
  OnEndDrag() {
    this.GetSprite(1)?.SetUIActive(false);
  }
}
exports.TrapDefenseBuildingDevelopBottomDragItem = TrapDefenseBuildingDevelopBottomDragItem;
class TrapDefenseBuildingDevelopNormalDragItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIDraggableComponent], [2, UE.UIText]];
  }
  UpdateItem(e) {
    this.SetTextureByPath(e.GetIconPath(), this.GetTexture(0));
    this.GetText(2)?.SetUIActive(false);
  }
  GetDraggableComp() {
    return this.GetDraggable(1);
  }
}
exports.TrapDefenseBuildingDevelopNormalDragItem = TrapDefenseBuildingDevelopNormalDragItem;
//# sourceMappingURL=TrapDefenseBuildingDevelopBottomDragItem.js.map