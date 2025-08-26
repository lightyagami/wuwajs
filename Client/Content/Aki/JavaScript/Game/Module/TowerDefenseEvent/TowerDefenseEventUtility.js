"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseEventUtility = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
class TowerDefenseEventUtility {
  static ConvertDegree2Direction(e) {
    if (e > 45 && e < 135) {
      return Protocol_1.Aki.Protocol.$fu.Proto_GridRight;
    } else if (e > 135 || e < -135) {
      return Protocol_1.Aki.Protocol.$fu.Proto_GridBackward;
    } else if (e > -135 && e < -45) {
      return Protocol_1.Aki.Protocol.$fu.Proto_GridLeft;
    } else {
      return Protocol_1.Aki.Protocol.$fu.Proto_GridForward;
    }
  }
  static ConvertDirection2Degree(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.$fu.Proto_GridRight:
        return 90;
      case Protocol_1.Aki.Protocol.$fu.Proto_GridBackward:
        return 180;
      case Protocol_1.Aki.Protocol.$fu.Proto_GridLeft:
        return -90;
      default:
        return 0;
    }
  }
  static ValidatePlacementWithGridNormal(e, t, r = 0.7) {
    switch (e) {
      case 1:
        return t.DotProduct(Vector_1.Vector.UpVectorProxy) > r;
      case 2:
        var o = t.DotProduct(Vector_1.Vector.UpVectorProxy);
        return Math.abs(o) < 1 - r;
      case 4:
        return t.DotProduct(Vector_1.Vector.DownVectorProxy) > r;
      default:
        return false;
    }
  }
}
exports.TowerDefenseEventUtility = TowerDefenseEventUtility;
//# sourceMappingURL=TowerDefenseEventUtility.js.map