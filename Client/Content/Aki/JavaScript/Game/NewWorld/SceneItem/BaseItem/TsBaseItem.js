"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
class TsBaseItem extends UE.Actor {
  constructor() {
    super(...arguments);
    this.EntityHandle = undefined;
    this.DebugComp = undefined;
  }
  Constructor() {
    this.EntityHandle = undefined;
    this.DebugComp = undefined;
  }
  ReceiveBeginPlay() {
    this.EntityHandle = ActorUtils_1.ActorUtils.GetEntityByActor(this);
    this.DebugComp = this.EntityHandle.Entity.GetComponent(126);
  }
  GetTagDebugStrings() {
    return this.DebugComp.GetTagDebugStrings();
  }
}
exports.default = TsBaseItem;
//# sourceMappingURL=TsBaseItem.js.map