"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchTicketTabItem = undefined;
const UE = require("ue");
const UiViewSequence_1 = require("../../../../../../Ui/Base/UiViewSequence");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class ScratchTicketTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.rnl = undefined;
    this.yQa = undefined;
    this.UiLevelSequence = undefined;
    this.onl = () => {
      if (this.yQa) {
        this.yQa(this.rnl, this);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.onl]];
  }
  OnBeforeCreateImplement() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => this.GetExtendToggle(0).GetToggleState() === 0);
  }
  Refresh(t, e, i) {
    this.rnl = t;
    this.SetSpriteByPath(t.Config.TogRoundIcon, this.GetSprite(1), false, undefined);
    t = t.GetRoundState();
    this.GetItem(2).SetUIActive(t === 0);
    this.GetItem(3).SetUIActive(t === 2);
  }
  SetSelect(t, e) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(t, e);
  }
  SetClickToggleCallback(t) {
    this.yQa = t;
  }
}
exports.ScratchTicketTabItem = ScratchTicketTabItem;
//# sourceMappingURL=ScratchTicketTabItem.js.map