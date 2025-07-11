"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueFloatTipsView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class MapRogueFloatTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.Data = this.OpenParam;
    if (this.Data) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Data.TextId, ...this.Data.TextParam);
    }
  }
  OnAfterShow() {
    this.CloseMe(() => {
      this.Data?.FinishCallback?.();
    });
  }
}
exports.MapRogueFloatTipsView = MapRogueFloatTipsView;
//# sourceMappingURL=MapRogueFloatTipsView.js.map