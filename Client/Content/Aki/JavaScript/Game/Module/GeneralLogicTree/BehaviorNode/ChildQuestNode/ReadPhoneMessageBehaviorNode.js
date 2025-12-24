"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPhoneMessageBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ReadPhoneMessageBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.QXt = false;
    this.hMf = 0;
    this.lMf = (e, t, s) => {
      if (e === this.hMf && !this.Submitting && !this.QXt) {
        if (s) {
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
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.ReadPhoneMessage && !!e.PhoneMessageId && (this.hMf = e.PhoneMessageId, true);
  }
  OnStart() {
    this.QXt = false;
  }
  OnDestroy() {
    super.OnDestroy();
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhoneMsgReadProgressUpdate, this.lMf);
  }
  RemoveEventsOnChildQuestEnd() {
    super.RemoveEventsOnChildQuestEnd();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhoneMsgReadProgressUpdate, this.lMf);
  }
}
exports.ReadPhoneMessageBehaviorNode = ReadPhoneMessageBehaviorNode;
//# sourceMappingURL=ReadPhoneMessageBehaviorNode.js.map