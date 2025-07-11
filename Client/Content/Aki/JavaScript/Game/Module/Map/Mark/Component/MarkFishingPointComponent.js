"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkFishingPointComponent = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MapComponent_1 = require("../../Base/MapComponent");
class MarkFishingPointComponent extends MapComponent_1.MapComponent {
  get ComponentType() {
    return 16;
  }
  set FishingPointEntityId(n) {
    this.PropertyMap.set(0, n);
  }
  get FishingPointEntityId() {
    return this.PropertyMap.tryGet(0, 0);
  }
  OnUpdate() {
    var n = this.ParentEntity.GetComponent(11);
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("FishingWherfRange") ?? 1;
    n.RangeSize = e;
    n.RangeSetAsFirstChild = true;
    this.ParentEntity.GetComponent(12).SetChildViewVisibility(2, false);
  }
}
exports.MarkFishingPointComponent = MarkFishingPointComponent;
//# sourceMappingURL=MarkFishingPointComponent.js.map