"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParallelSelectNode = undefined;
const LogicNodeBase_1 = require("./LogicNodeBase");
class ParallelSelectNode extends LogicNodeBase_1.LogicNodeBase {
  constructor(e) {
    super(e);
    this.NodeType = "ParallelSelect";
  }
}
exports.ParallelSelectNode = ParallelSelectNode;
//# sourceMappingURL=ParallelSelectNode.js.map