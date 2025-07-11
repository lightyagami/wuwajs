"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityPhotoBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class EntityPhotoBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.TakePlace = undefined;
    this.TakeTime = undefined;
    this.TakeTargetArray = [];
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.TakePhoto && (this.TakeTime = e.TimeCondition, this.TakePlace = e.PosCondition, this.TakeTargetArray = e.PhotoTargets, true);
  }
  UseSubmitNode() {
    this.SubmitNode();
  }
  OnStart(e) {
    super.OnStart(e);
  }
  OnEnd(e) {
    super.OnEnd(e);
  }
  OnDestroy() {
    super.OnDestroy();
  }
  GetDungeonId() {
    return this.Blackboard?.DungeonId;
  }
}
exports.EntityPhotoBehaviorNode = EntityPhotoBehaviorNode;
//# sourceMappingURL=EntityPhotoBehaviorNode.js.map