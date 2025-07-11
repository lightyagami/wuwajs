"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletRayInfo = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletRayInfo {
  constructor() {
    this.Length = 0;
    this.StartPoint = Vector_1.Vector.Create();
    this.EndPoint = Vector_1.Vector.Create();
    this.IsBlock = false;
    this.BlockByCharacter = false;
    this.Speed = 0;
  }
}
exports.BulletRayInfo = BulletRayInfo;
//# sourceMappingURL=BulletRayInfo.js.map