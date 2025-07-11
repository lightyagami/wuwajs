"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestViewButton = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class QuestViewButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OH1 = undefined;
    this.Fr = () => {
      if (this.OH1) {
        this.OH1();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  OnStart() {
    this.OH1 = this.OpenParam;
  }
  SetButtonText(t, e) {
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t);
    } else {
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t;
      this.GetText(1)?.SetText(e);
    }
  }
}
exports.QuestViewButton = QuestViewButton;
//# sourceMappingURL=QuestViewButton.js.map