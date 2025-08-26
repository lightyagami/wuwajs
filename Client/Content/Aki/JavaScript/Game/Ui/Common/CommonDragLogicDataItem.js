"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonDragLogicDataItem = undefined;
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CommonDragLogicDataItem {
  constructor() {
    this.YCo = undefined;
    this.Xy = -1;
    this.$8i = undefined;
    this.pgo = new Vector2D_1.Vector2D(0, 0);
    this.vgo = new Vector2D_1.Vector2D(0, 0);
    this.ggo = 0;
    this.fgo = 0;
    this.zCo = undefined;
    this.ZCo = undefined;
  }
  SetCurrentData(t) {
    this.$8i = t;
  }
  GetCurrentData() {
    return this.$8i;
  }
  SetDragComponent(t) {
    this.YCo = t;
    this.ggo = this.YCo.RootUIComp.Width;
    this.fgo = this.YCo.RootUIComp.Height;
  }
  SetCurrentIndex(t) {
    this.Xy = t;
  }
  GetCurrentIndex() {
    return this.Xy;
  }
  CheckIfCanDrag() {
    return true;
  }
  CheckIfCurrentDragIndex(t) {
    return true;
  }
  SetCurrentDragIndex(t) {}
  ClearCurrentDragIndex() {}
  GetMiddlePosition() {
    return [this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X, this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y];
  }
  CheckIfSelfItem(t) {
    return t === this.Xy;
  }
  CheckOverlap(t, e) {
    var r = t.X;
    var t = t.Y;
    var i = e.X;
    var e = e.Y;
    var n = this.GetBounceX().X;
    var a = this.GetBounceX().Y;
    var s = this.GetBounceY().X;
    var h = this.GetBounceY().Y;
    return r < a && n < t && i < h && s < e;
  }
  GetBounceX() {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir();
    var e = this.YCo.RootUIComp;
    var r = this.ggo / 2;
    var i = e.GetLGUISpaceCenterAbsolutePosition().X - r;
    var e = e.GetLGUISpaceCenterAbsolutePosition().X + r;
    this.pgo.X = i - t;
    this.pgo.Y = e - t;
    return this.pgo;
  }
  GetBounceY() {
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() * ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir();
    var e = this.YCo.RootUIComp;
    var r = this.fgo / 2;
    var i = e.GetLGUISpaceCenterAbsolutePosition().Y - r;
    var e = e.GetLGUISpaceCenterAbsolutePosition().Y + r;
    this.vgo.X = i - t;
    this.vgo.Y = e - t;
    return this.vgo;
  }
  SetOnUnOverlayCallBack(t) {
    this.ZCo = t;
  }
  SetOnOverlayCallBack(t) {
    this.zCo = t;
  }
  OnUnOverlay() {
    this.ZCo?.(this.GetCurrentIndex());
  }
  OnOverlay() {
    this.zCo?.(this.GetCurrentIndex());
  }
  GetOverlapIndex(e) {
    var r = e.length;
    if (r === 0) {
      return -1;
    }
    var t = this.GetMiddlePosition();
    let i = e[0].GetCurrentIndex();
    var n = e[0].GetMiddlePosition();
    var a = t[0] * t[0];
    var s = t[1] * t[1];
    let h = Math.abs(a - n[0] * n[0]) + Math.abs(s - n[1] * n[1]);
    for (let t = 0; t < r; t++) {
      var n = e[t].GetMiddlePosition();
      var o = Math.abs(a - n[0] * n[0]) + Math.abs(s - n[1] * n[1]);
      if (h > o) {
        h = o;
        i = e[t].GetCurrentIndex();
      }
    }
    return i;
  }
  GetClickTime() {
    return 300;
  }
}
exports.CommonDragLogicDataItem = CommonDragLogicDataItem;
//# sourceMappingURL=CommonDragLogicDataItem.js.map