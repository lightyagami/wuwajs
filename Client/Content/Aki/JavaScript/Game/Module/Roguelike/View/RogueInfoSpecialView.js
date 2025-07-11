"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueInfoSpecialView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoguelikeSelectSpecialItem_1 = require("./RoguelikeSelectSpecialItem");
class RogueInfoSpecialView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Aho = undefined;
    this.UiViewSequence = undefined;
    this.Pho = () => new RoguelikeSelectSpecialItem_1.RoguelikeSelectSpecialItem(this.xho);
    this.xho = (e, i) => {
      e.SetSelect(false);
      UiManager_1.UiManager.OpenView("RoguelikeSpecialDetailView", [i, undefined]);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout]];
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  OnStart() {
    this.Aho = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Pho);
  }
  Refresh(e) {
    this.Aho.RefreshByData(e);
  }
}
exports.RogueInfoSpecialView = RogueInfoSpecialView;
//# sourceMappingURL=RogueInfoSpecialView.js.map