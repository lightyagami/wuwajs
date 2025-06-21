"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GuideFinishBehaviorNode = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class GuideFinishBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), this.mDe = 0, this.XXt = e => {
      this.Submitting || e === this.mDe && this.SubmitNode()
    }, this.DDe = () => {
      this.Submitting || this.SubmitNode()
    }, this.OnFocusQuestChange = e => {
      e && this.TreeConfigId !== e || ModelManager_1.ModelManager.GuideModel.IsGroupFinished(this.mDe) && this.SubmitNode()
    }
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.Guide && (this.mDe = e.GuideGroupId, !0)
  }
  OnDestroy() {
    super.OnDestroy(), this.mDe = 0
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupFinished, this.XXt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingFinish, this.DDe);
    var e = ModelManager_1.ModelManager.GuideModel.IsGroupFinished(this.mDe),
      t = ModelManager_1.ModelManager.QuestNewModel;
    e ? this.SubmitNode() : this.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && t.IsInFocusMode() && !t.IsInFocusOnQuest(this.Blackboard.TreeConfigId) && this.BecauseOfFocusModeNoSubmit()
  }
  RemoveEventsOnChildQuestEnd() {
    EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.GuideGroupFinished, this.XXt) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupFinished, this.XXt), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ComboTeachingFinish, this.DDe) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingFinish, this.DDe), super.RemoveEventsOnChildQuestEnd()
  }
  BecauseOfFocusModeNoSubmit() {
    EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.FocusQuestChange, this.OnFocusQuestChange)
  }
}
exports.GuideFinishBehaviorNode = GuideFinishBehaviorNode;
//# sourceMappingURL=GuideFinishBehaviorNode.js.map