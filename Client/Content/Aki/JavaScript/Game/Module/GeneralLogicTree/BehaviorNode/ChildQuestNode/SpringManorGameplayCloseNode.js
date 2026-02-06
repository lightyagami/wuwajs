"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorGameplayCloseNode = undefined;
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class SpringManorGameplayCloseNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.lNg = undefined;
    this.yq = undefined;
    this._Ng = (e, t) => {
      if (this.lNg !== undefined && this.lNg === e && (!this.yq || t === this.yq)) {
        this.SubmitNode();
      }
    };
    this.OnAfterSubmit = e => {
      super.OnAfterSubmit(e);
      if (e) {
        this.lNg = undefined;
        this.yq = undefined;
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.CheckSpringFestivalGameplayCompleted && (this.lNg = e.GameplayType.Type, this.yq = e.GameplayType.Id, true);
  }
  OnStart() {}
  OnDestroy() {
    super.OnDestroy();
    this.lNg = undefined;
    this.yq = undefined;
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSpringManorGameplayFinish, this._Ng);
  }
  RemoveEventsOnChildQuestEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSpringManorGameplayFinish, this._Ng);
    super.RemoveEventsOnChildQuestEnd();
  }
}
exports.SpringManorGameplayCloseNode = SpringManorGameplayCloseNode;
//# sourceMappingURL=SpringManorGameplayCloseNode.js.map