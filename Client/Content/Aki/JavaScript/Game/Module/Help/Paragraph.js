"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paragraph = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class Paragraph extends UiPanelBase_1.UiPanelBase {
  constructor(e = undefined) {
    super();
    if (e) {
      this.CreateThenShowByActor(e);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  Refresh(e) {
    if (e.Picture === "") {
      this.GetTexture(0).SetUIActive(false);
    } else {
      this.SetTextureByPath(e.Picture, this.GetTexture(0));
    }
    if (e.Content) {
      this.GetText(1).ShowTextNew(e.Content);
    } else {
      this.GetText(1).SetUIActive(false);
    }
  }
}
exports.Paragraph = Paragraph;
//# sourceMappingURL=Paragraph.js.map