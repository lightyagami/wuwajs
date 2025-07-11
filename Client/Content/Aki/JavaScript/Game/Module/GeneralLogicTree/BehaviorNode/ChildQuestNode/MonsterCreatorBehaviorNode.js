"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterCreatorBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class MonsterCreatorBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.YXt = 0;
    this.JXt = 0;
    this.PXt = [];
    this.zXt = false;
    this.ZXt = undefined;
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) {
      return false;
    }
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.MonsterCreator || !e.MonsterCreatorEntityIds) {
      return false;
    }
    this.TrackTextRuleInner = 1;
    this.PXt = [];
    for (const t of e.MonsterCreatorEntityIds) {
      this.PXt.push(t);
    }
    this.zXt = e.ShowMonsterMergedHpBar ?? false;
    this.ZXt = e.TidMonsterGroupName;
    return !(this.YXt = 0);
  }
  OnUpdateProgress(e) {
    if (!e.gEs) {
      return false;
    }
    this.YXt = 0;
    this.JXt = e.gEs.IEs;
    for (const t of e.gEs.DEs) {
      this.YXt += t.PEs.length;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeEntityKilled, this.NodeId, t.PEs);
    }
    return true;
  }
  GetProgress() {
    return this.YXt.toString();
  }
  GetProgressMax() {
    return this.JXt.toString();
  }
  GetShowMonsterMergedHpBar() {
    return this.zXt;
  }
  GetTidMonsterGroupName() {
    return this.ZXt;
  }
  GetTest() {
    return this.PXt;
  }
}
exports.MonsterCreatorBehaviorNode = MonsterCreatorBehaviorNode;
//# sourceMappingURL=MonsterCreatorBehaviorNode.js.map