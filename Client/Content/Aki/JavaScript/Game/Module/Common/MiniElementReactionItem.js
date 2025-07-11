"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniElementReactionItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class MiniElementReactionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  SetReactionActivated(e) {
    var t = this.GetSprite(0);
    var i = this.GetTexture(1);
    t.SetUIActive(!e);
    i.SetUIActive(e);
  }
}
exports.MiniElementReactionItem = MiniElementReactionItem;
//# sourceMappingURL=MiniElementReactionItem.js.map