"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowUiBehaviorNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const RoguelikeController_1 = require("../../../Roguelike/RoguelikeController");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class ShowUiBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.I$t = undefined;
    this.T$t = false;
    this.bZe = () => {
      this.SubmitNode();
    };
    this.QVc = (e, t) => {
      var s = this.I$t.EndingId ?? 0;
      if (t === s || s === 0) {
        this.SubmitNode();
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.ShowUi && (this.I$t = e.UiType, this.T$t = e.KeepUiOpen, true);
  }
  OnDestroy() {
    super.OnDestroy();
    this.I$t = undefined;
    this.T$t = false;
  }
  OnNodeActive() {
    super.OnNodeActive();
    if (this.T$t && this.I$t.Type === "RogueAbilitySelect") {
      RoguelikeController_1.RoguelikeController.OpenBuffSelectViewByIdAsync(this.I$t.BindId);
    }
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    if (this.I$t.Type === "All") {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.bZe);
    }
    if (this.I$t.Type === "CiacconaAvgBoard") {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NotifyBtCiacconaChapterFinish, this.QVc);
    }
  }
  RemoveEventsOnChildQuestEnd() {
    super.RemoveEventsOnChildQuestEnd();
    if (this.I$t.Type === "All") {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.bZe);
    }
    if (this.I$t.Type === "CiacconaAvgBoard") {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NotifyBtCiacconaChapterFinish, this.QVc);
    }
  }
}
exports.ShowUiBehaviorNode = ShowUiBehaviorNode;
//# sourceMappingURL=ShowUiBehaviorNode.js.map