"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionNpcLeisureInteractOp = exports.unionToUnionNpcLeisureInteractOp = exports.UnionNpcLeisureInteractOp = undefined;
const npc_sit_down_js_1 = require("../fb-action/npc-sit-down.js");
var UnionNpcLeisureInteractOp;
function unionToUnionNpcLeisureInteractOp(n, e) {
  switch (UnionNpcLeisureInteractOp[n]) {
    case "NONE":
      return;
    case "NpcSitDown":
      return e(new npc_sit_down_js_1.NpcSitDown());
    default:
      return;
  }
}
function unionListToUnionNpcLeisureInteractOp(n, e, t) {
  switch (UnionNpcLeisureInteractOp[n]) {
    case "NONE":
      return;
    case "NpcSitDown":
      return e(t, new npc_sit_down_js_1.NpcSitDown());
    default:
      return;
  }
}
(function (n) {
  n[n.NONE = 0] = "NONE";
  n[n.NpcSitDown = 1] = "NpcSitDown";
})(UnionNpcLeisureInteractOp = exports.UnionNpcLeisureInteractOp ||= {});
exports.unionToUnionNpcLeisureInteractOp = unionToUnionNpcLeisureInteractOp;
exports.unionListToUnionNpcLeisureInteractOp = unionListToUnionNpcLeisureInteractOp; //# sourceMappingURL=union-npc-leisure-interact-op.js.map