"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckPlayerInputBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckPlayerInputBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.CSo = "ChallengeAgain";
    this.ZMe = undefined;
    this.bMe = (e, t) => {
      if (t === 1) {
        this.OnChallengeAgain(e);
      }
    };
    this.OnChallengeAgain = e => {
      if (!this.Submitting) {
        if (this.ZMe === e) {
          this.SubmitNode();
        }
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    if (!super.OnCreate(e)) {
      return false;
    }
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.CheckPlayerInput) {
      return false;
    }
    this.CSo = e.CheckInput.ButtonType;
    switch (this.CSo) {
      case "ChallengeAgain":
        this.ZMe = InputMappingsDefine_1.actionMappings.重新挑战;
        break;
      case "ExitChallenge":
        this.ZMe = InputMappingsDefine_1.actionMappings.玩法放弃;
    }
    return true;
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    if (this.ZMe && (InputDistributeController_1.InputDistributeController.UnBindAction(this.ZMe, this.bMe), InputDistributeController_1.InputDistributeController.BindAction(this.ZMe, this.bMe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChallengeAgain, this.OnChallengeAgain), this.ZMe === InputMappingsDefine_1.actionMappings.重新挑战)) {
      this.Blackboard.AddTag(15);
    }
  }
  RemoveEventsOnChildQuestEnd() {
    super.RemoveEventsOnChildQuestEnd();
    if (this.ZMe && (InputDistributeController_1.InputDistributeController.UnBindAction(this.ZMe, this.bMe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChallengeAgain, this.OnChallengeAgain), this.ZMe === InputMappingsDefine_1.actionMappings.重新挑战)) {
      this.Blackboard.RemoveTag(15);
    }
  }
}
exports.CheckPlayerInputBehaviorNode = CheckPlayerInputBehaviorNode;
//# sourceMappingURL=CheckPlayerInputBehaviorNode.js.map