"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideFinishBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class GuideFinishBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.mDe = 0;
    this.XXt = e => {
      if (!this.Submitting) {
        if (e === this.mDe) {
          this.SubmitNode();
        }
      }
    };
    this.DDe = () => {
      if (!this.Submitting) {
        this.SubmitNode();
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.Guide && (this.mDe = e.GuideGroupId, true);
  }
  OnDestroy() {
    super.OnDestroy();
    this.mDe = 0;
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupFinished, this.XXt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComboTeachingFinish, this.DDe);
    if (ModelManager_1.ModelManager.GuideModel.IsGroupFinished(this.mDe)) {
      this.SubmitNode();
    }
  }
  RemoveEventsOnChildQuestEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.GuideGroupFinished, this.XXt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupFinished, this.XXt);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.ComboTeachingFinish, this.DDe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingFinish, this.DDe);
    }
    super.RemoveEventsOnChildQuestEnd();
  }
}
exports.GuideFinishBehaviorNode = GuideFinishBehaviorNode;
//# sourceMappingURL=GuideFinishBehaviorNode.js.map