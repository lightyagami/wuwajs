"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSlideTrackMove = undefined;
class FbSlideTrackMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Dbh = false;
    this.Bbh = 0;
    this.qbh = false;
    this.kbh = false;
    this.qtc = false;
    this.Otc = 0;
    this.Gbh = false;
    this.Obh = 0;
    this.Fbh = false;
    this.Nbh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSlideTrackMove(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MaxOffsetDistance() {
    if (!this.Dbh) {
      this.Dbh = true;
      this.Bbh = this.FbDataInternal.maxOffsetDistance();
    }
    return this.Bbh;
  }
  get IsOneWay() {
    if (!this.qbh) {
      this.qbh = true;
      this.kbh = this.FbDataInternal.isOneWay();
    }
    return this.kbh;
  }
  get LayerVerticalLimit() {
    if (!this.qtc) {
      this.qtc = true;
      this.Otc = this.FbDataInternal.layerVerticalLimit();
    }
    return this.Otc;
  }
  get DirectionAngleLimit() {
    if (!this.Gbh) {
      this.Gbh = true;
      this.Obh = this.FbDataInternal.directionAngleLimit();
    }
    return this.Obh;
  }
  get EdgeLimitCurveFactor() {
    if (!this.Fbh) {
      this.Fbh = true;
      this.Nbh = this.FbDataInternal.edgeLimitCurveFactor();
    }
    return this.Nbh;
  }
}
exports.FbSlideTrackMove = FbSlideTrackMove;
//# sourceMappingURL=FbSlideTrackMove.js.map