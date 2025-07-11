"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadMailBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ReadMailBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.QXt = false;
    this.E$t = 0;
    this.S$t = (e, t) => {
      if (!this.Submitting && !this.QXt) {
        if (t === this.E$t) {
          this.SubmitNode();
        }
      }
    };
    this.OnAfterSubmit = e => {
      super.OnAfterSubmit(e);
      if (e) {
        this.QXt = true;
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.ReadMail && (this.E$t = e.MailId, true);
  }
  OnStart() {
    this.QXt = false;
  }
  OnDestroy() {
    super.OnDestroy();
    this.E$t = 0;
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectedMail, this.S$t);
  }
  RemoveEventsOnChildQuestEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectedMail, this.S$t);
    super.RemoveEventsOnChildQuestEnd();
  }
}
exports.ReadMailBehaviorNode = ReadMailBehaviorNode;
//# sourceMappingURL=ReadMailBehaviorNode.js.map