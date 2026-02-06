"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPlayerModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ResetPlayerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsReseting = false;
    this.CueHandleSet = new Set();
    this.DisableMoveEntityHandle = undefined;
  }
}
exports.ResetPlayerModel = ResetPlayerModel;
//# sourceMappingURL=ResetPlayerModel.js.map