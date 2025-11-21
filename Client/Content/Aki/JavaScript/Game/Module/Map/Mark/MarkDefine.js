"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HONAMI_SCAN_MARK_ITEM_ID = exports.permanentShowInGravityLayerTypeSet = exports.canOutOfBoundUpdateTypeSet = exports.permanentUpdateTypeSet = exports.CreateMarkViewParams = undefined;
class CreateMarkViewParams {
  constructor() {
    this.MapType = 2;
    this.MarkScale = 1;
    this.ViewParent = undefined;
  }
}
exports.CreateMarkViewParams = CreateMarkViewParams;
exports.permanentUpdateTypeSet = new Set([11, 22, 17, 31]);
exports.canOutOfBoundUpdateTypeSet = new Set([11]);
exports.permanentShowInGravityLayerTypeSet = new Set([11, 22, 23, 17, 18, 16, 21]);
exports.HONAMI_SCAN_MARK_ITEM_ID = 157012; //# sourceMappingURL=MarkDefine.js.map