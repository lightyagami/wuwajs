"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceStartView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const SeekTraceClawItem_1 = require("./SeekTraceClawItem");
const DELAY_TIME = 2000;
class SeekTraceStartView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ted = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Ted = new SeekTraceClawItem_1.SeekTraceClawItem();
    await this.Ted.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    TimerSystem_1.TimerSystem.Delay(() => {
      UiManager_1.UiManager.OpenView("SeekTraceView");
      this.CloseMe();
    }, DELAY_TIME);
  }
}
exports.SeekTraceStartView = SeekTraceStartView;
//# sourceMappingURL=SeekTraceStartView.js.map