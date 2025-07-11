"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeizerQuadraticCurve = undefined;
const Vector_1 = require("../../../Core/Utils/Math/Vector");
class BeizerQuadraticCurve {
  constructor() {
    this.PointA = undefined;
    this.PointB = undefined;
    this.ControlPoint = undefined;
    this.TempVector = Vector_1.Vector.Create();
    this.TempVector2 = Vector_1.Vector.Create();
    this.TempVector3 = Vector_1.Vector.Create();
  }
  InitByThreePoints(t, i, s) {
    this.PointA = t;
    this.PointB = i;
    this.ControlPoint = s;
  }
  InitByPhysics(t, i, s, h) {
    this.PointA = t;
    this.PointB = i;
    s.Multiply(h, this.TempVector);
    this.ControlPoint = Vector_1.Vector.Create();
    this.PointA.Addition(this.TempVector, this.ControlPoint);
  }
  InitByFactor(t, i, s, h, e) {
    this.PointA = t;
    this.PointB = i;
    this.ControlPoint = Vector_1.Vector.Create();
    this.PointB.Subtraction(this.PointA, this.TempVector);
    t = this.TempVector.Size();
    this.TempVector.CrossProduct(s, this.TempVector2);
    this.TempVector2.Normalize();
    this.PointA.Addition(this.PointB, this.TempVector3);
    this.TempVector3.Multiply(e, this.TempVector3);
    this.TempVector2.Multiply(t * h, this.TempVector2);
    this.TempVector2.Addition(this.TempVector3, this.ControlPoint);
  }
  GetPos(t) {
    var i = 1 - t;
    this.PointA.Multiply(i * i, this.TempVector);
    this.ControlPoint.Multiply(i * 2 * t, this.TempVector2);
    this.TempVector.Addition(this.TempVector2, this.TempVector3);
    this.PointB.Multiply(t * t, this.TempVector2);
    this.TempVector3.Addition(this.TempVector2, this.TempVector);
    return this.TempVector;
  }
  GetDerivativeAt(t) {
    var i = 1 - t;
    this.PointA.Multiply(i * -2, this.TempVector);
    this.ControlPoint.Multiply(i * 2 - t * 2, this.TempVector2);
    this.TempVector.Addition(this.TempVector2, this.TempVector3);
    this.PointB.Multiply(t * 2, this.TempVector2);
    this.TempVector3.Addition(this.TempVector2, this.TempVector);
    return this.TempVector;
  }
  GetPolylineLength() {
    this.ControlPoint.Subtraction(this.PointA, this.TempVector);
    this.PointB.Subtraction(this.PointA, this.TempVector2);
    return this.TempVector.Size() + this.TempVector2.Size();
  }
}
exports.BeizerQuadraticCurve = BeizerQuadraticCurve;
//# sourceMappingURL=BezierCurve.js.map