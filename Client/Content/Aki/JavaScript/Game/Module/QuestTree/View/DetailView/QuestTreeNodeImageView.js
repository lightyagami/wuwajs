"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeImageView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
class QuestTreeNodeImageView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    UiManager_1.UiManager.CloseView("QuestTreeNodeDetailView");
    var e;
    var r = this.OpenParam;
    if (r) {
      this.Pe = r;
      e = this.GetTexture(0);
      await this.SetTextureAsync(r.ImageLarge, e);
    }
  }
  OnBeforeHide() {
    ControllerHolder_1.ControllerHolder.QuestTreeController.OpenNodeDetailView(this.Pe);
  }
  OnBeforeDestroy() {}
}
exports.QuestTreeNodeImageView = QuestTreeNodeImageView;
//# sourceMappingURL=QuestTreeNodeImageView.js.map