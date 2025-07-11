"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddBuffToFollowShooter = undefined;
class FbAddBuffToFollowShooter {
  constructor(t) {
    this.FbDataInternal = t;
    this.Vph = false;
    this.jph = undefined;
    this.XO_ = false;
    this.YO_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAddBuffToFollowShooter(t);
    }
  }
  get BuffIds() {
    if (!this.Vph) {
      this.Vph = true;
      this.jph = new Array();
      var o = this.FbDataInternal.buffIdsLength();
      if (o) {
        for (let t = 0; t < o; ++t) {
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
        }
      }
    }
    return this.jph;
  }
  get FollowShooterId() {
    if (!this.XO_) {
      this.XO_ = true;
      this.YO_ = this.FbDataInternal.followShooterId();
    }
    return this.YO_;
  }
}
exports.FbAddBuffToFollowShooter = FbAddBuffToFollowShooter;
//# sourceMappingURL=FbAddBuffToFollowShooter.js.map