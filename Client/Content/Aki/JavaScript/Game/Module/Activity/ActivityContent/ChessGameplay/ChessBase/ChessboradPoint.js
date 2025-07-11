"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChessboardPoint = undefined;
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
class ChessboardPoint {
  constructor() {
    this.xe = 0;
    this.aei = 0;
    this.Location = Vector_1.Vector.Create();
    this.Rotator = Rotator_1.Rotator.Create();
  }
  Init(t, o, r, e) {
    this.xe = t;
    this.aei = e;
    this.Location.DeepCopy(o);
    this.Rotator.DeepCopy(r);
  }
  GetId() {
    return this.xe;
  }
  GetSortIndex() {
    return this.aei;
  }
  GetMoveLocationAndRotator() {
    return [this.Location, this.Rotator];
  }
  GetPointLocation() {
    return this.Location;
  }
}
exports.ChessboardPoint = ChessboardPoint;
//# sourceMappingURL=ChessboradPoint.js.map