"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestViewButton = void 0;
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class QuestViewButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Y91 = void 0, this.Fr = () => {
      this.Y91 && this.Y91()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.Fr]
    ]
  }
  OnStart() {
    this.Y91 = this.OpenParam
  }
  SetButtonText(t, e) {
    e ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t) : (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t, this.GetText(1)?.SetText(e))
  }
}
exports.QuestViewButton = QuestViewButton;
//# sourceMappingURL=QuestViewButton.js.map