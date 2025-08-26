"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueCommonTipsView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class MapRogueCommonTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Go1 = 0;
    this._Zu = () => {
      if (this.UiViewSequence.HasSequenceNameInPlaying(this.UiViewSequence.StartSequenceName)) {
        this.UiViewSequence.StopSequenceByKey(this.UiViewSequence.StartSequenceName, true, true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this._Zu]];
  }
  OnAfterShow() {
    this.CloseMe(() => {
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.Go1);
    });
  }
  OnStart() {
    this.Go1 = this.OpenParam;
  }
  OnBeforeShow() {}
}
exports.MapRogueCommonTipsView = MapRogueCommonTipsView;
//# sourceMappingURL=MapRogueCommonTipsView.js.map