"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoarTabDynamicItem = exports.MapTravelTabDynamicItem = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class MapTravelTabDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IGe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
    this.IGe = new Vector2D_1.Vector2D();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetItemSize(e) {
    var t = this.GetRootItem();
    this.IGe.Set(t.GetWidth(), t.GetHeight());
    return this.IGe.ToUeVector2D(true);
  }
  ClearItem() {}
}
exports.MapTravelTabDynamicItem = MapTravelTabDynamicItem;
class SoarTabDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IGe = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
    this.IGe = new Vector2D_1.Vector2D();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetItemSize(e) {
    var t = this.GetRootItem();
    this.IGe.Set(t.GetWidth(), t.GetHeight());
    return this.IGe.ToUeVector2D(true);
  }
  ClearItem() {}
}
exports.SoarTabDynamicItem = SoarTabDynamicItem;
//# sourceMappingURL=MapTravelTabDynamicItem.js.map