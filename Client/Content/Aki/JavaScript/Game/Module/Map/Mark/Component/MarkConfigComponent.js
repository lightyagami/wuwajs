"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkConfigComponent = undefined;
const MapComponent_1 = require("../../Base/MapComponent");
class MarkConfigComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.MapMarkConfig = undefined;
    this.DynamicConfig = undefined;
    this.TreasureBoxDetectorMarkConfig = undefined;
  }
  get ComponentType() {
    return 15;
  }
  get Config() {
    return this.MapMarkConfig ?? this.DynamicConfig ?? this.TreasureBoxDetectorMarkConfig;
  }
}
exports.MarkConfigComponent = MarkConfigComponent;
//# sourceMappingURL=MarkConfigComponent.js.map