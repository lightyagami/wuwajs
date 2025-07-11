"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationCursorModule = undefined;
const UE = require("ue");
class UiNavigationCursorModule {
  constructor(t) {
    this.yBo = undefined;
    this.yBo = t;
  }
  GetCursorOffset() {
    if (this.yBo.OffsetType === 0) {
      return new UE.Vector2D(0, 0.5);
    } else if (this.yBo.OffsetType === 1) {
      return new UE.Vector2D(0.5, 1);
    } else if (this.yBo.OffsetType === 2) {
      return new UE.Vector2D(1, 0.5);
    } else if (this.yBo.OffsetType === 3) {
      return new UE.Vector2D(0.5, 0);
    } else {
      return new UE.Vector2D(0, 0);
    }
  }
  GetBoundOffset() {
    if (this.yBo.OffsetType === 0) {
      return new UE.Vector2D(-this.yBo.BoundOffset, 0);
    } else if (this.yBo.OffsetType === 1) {
      return new UE.Vector2D(0, this.yBo.BoundOffset);
    } else if (this.yBo.OffsetType === 2) {
      return new UE.Vector2D(this.yBo.BoundOffset, 0);
    } else if (this.yBo.OffsetType === 3) {
      return new UE.Vector2D(0, -this.yBo.BoundOffset);
    } else {
      return new UE.Vector2D(0, 0);
    }
  }
}
exports.UiNavigationCursorModule = UiNavigationCursorModule;
//# sourceMappingURL=UiNavigationCursorModule.js.map