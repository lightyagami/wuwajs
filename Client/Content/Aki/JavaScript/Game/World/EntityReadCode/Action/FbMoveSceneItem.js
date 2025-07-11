"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMoveSceneItem = undefined;
const UnionMoveSceneItemHelper_1 = require("./UnionMoveSceneItemHelper");
class FbMoveSceneItem {
  constructor(e) {
    this.FbDataInternal = e;
    this.a_h = false;
    this.I9o = 0;
    this.kEh = false;
    this.GEh = false;
    this.OEh = false;
    this.FEh = undefined;
    this.oi_ = false;
    this.ni_ = false;
  }
  static Create(e) {
    if (e) {
      return new FbMoveSceneItem(e);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get StopBeforeMove() {
    if (!this.kEh) {
      this.kEh = true;
      this.GEh = this.FbDataInternal.stopBeforeMove();
    }
    return this.GEh;
  }
  get MoveConfig() {
    var e;
    var t;
    if (!this.OEh && (this.OEh = true, e = this.FbDataInternal.moveConfigType(), t = UnionMoveSceneItemHelper_1.UnionMoveSceneItemHelper.GetUnionMoveSceneItemObject(e))) {
      this.FEh = UnionMoveSceneItemHelper_1.UnionMoveSceneItemHelper.ReadUnionMoveSceneItem(e, this.FbDataInternal.moveConfig(t));
    }
    return this.FEh;
  }
  get BypassClientResponse() {
    if (!this.oi_) {
      this.oi_ = true;
      this.ni_ = this.FbDataInternal.bypassClientResponse();
    }
    return this.ni_;
  }
}
exports.FbMoveSceneItem = FbMoveSceneItem;
//# sourceMappingURL=FbMoveSceneItem.js.map