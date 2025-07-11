"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataObstacle = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataObstacle {
  constructor(t) {
    this.n9o = undefined;
    this.s9o = undefined;
    this.Pe = t;
  }
  get Center() {
    this.n9o ||= Vector_1.Vector.Create(this.Pe.检测位置);
    return this.n9o;
  }
  get Radius() {
    if (this.s9o === undefined) {
      this.s9o = this.Pe.检测距离;
    }
    return this.s9o;
  }
  Preload() {
    this.Center;
    this.Radius;
    return true;
  }
}
exports.BulletDataObstacle = BulletDataObstacle;
//# sourceMappingURL=BulletDataObstacle.js.map