"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionUtils = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../Define/QueryTypeDefine");
class CollisionUtils {
  static GetCollisionResponseContainer() {
    UE.KismetSystemLibrary.SetAllChannels(this.DJ, 0);
    return (0, puerts_1.$unref)(this.DJ);
  }
  static SetCollisionResponseToPawn(e, i, s) {
    let r = [];
    if (i === 0) {
      r = r.concat([QueryTypeDefine_1.KuroCollisionChannel.Pawn, QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, QueryTypeDefine_1.KuroCollisionChannel.PawnMonster]);
    } else if (i === 1) {
      r.push(QueryTypeDefine_1.KuroCollisionChannel.Pawn);
    } else if (i === 2) {
      r.push(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer);
    } else if (i === 3) {
      r.push(QueryTypeDefine_1.KuroCollisionChannel.PawnMonster);
    }
    for (const t of r) {
      e.SetCollisionResponseToChannel(t, s);
    }
  }
}
(exports.CollisionUtils = CollisionUtils).DJ = (0, puerts_1.$ref)(undefined);
//# sourceMappingURL=CollisionUtils.js.map