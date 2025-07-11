"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyTaskModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
class DailyTaskModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Wro = undefined;
  }
  OnInit() {
    this.Wro = new Map();
    return true;
  }
  OnClear() {
    this.Wro?.clear();
    return !(this.Wro = undefined);
  }
  GetAllDailyQuest() {
    return this.Wro;
  }
  GetDailyTaskCorrelativeEntities() {
    const t = new Array();
    for (var [, e] of this.Wro) {
      e.GetCurrentCorrelativeEntities()?.forEach(e => {
        t.push(e);
      });
    }
    return t;
  }
  AddDailyQuest(e) {
    if (e) {
      this.Wro.set(e.Id, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DailyTaskChange);
    }
  }
  RemoveDailyQuest(e) {
    this.Wro.delete(e);
  }
}
exports.DailyTaskModel = DailyTaskModel;
//# sourceMappingURL=DailyTaskModel.js.map