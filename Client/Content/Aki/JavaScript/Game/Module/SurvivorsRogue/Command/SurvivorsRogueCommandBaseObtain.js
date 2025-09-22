"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandBaseObtain = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../Ui/UiManager");
const SurvivorsRogueCommandBase_1 = require("./SurvivorsRogueCommandBase");
class SurvivorsRogueCommandBaseObtain extends SurvivorsRogueCommandBase_1.SurvivorsRogueCommandBase {
  constructor() {
    super(...arguments);
    this.ViewProxy = undefined;
    this.StepSize = 1;
    this.SelectIds = [];
  }
  OnStartExecute() {
    this.nbd();
  }
  Back2Fore() {
    if (!this.ViewProxy) {
      this.nbd();
    }
  }
  nbd() {
    if (UiManager_1.UiManager.IsViewOpen("SurvivorsRogueGeneralObtainView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRebindCommandView, this.IncId);
    } else {
      this.OpenView("SurvivorsRogueGeneralObtainView", false);
    }
  }
  OnFinish() {
    this.RequestCommand(this.SelectIds);
  }
  GetChooseData(e, t) {
    return {
      ObtainMode: t ?? (e.po1 >= e.IEd.length ? 1 : 0)
    };
  }
  GetViewInfo() {}
}
exports.SurvivorsRogueCommandBaseObtain = SurvivorsRogueCommandBaseObtain;
//# sourceMappingURL=SurvivorsRogueCommandBaseObtain.js.map