"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DarkCoastDeliveryLevelItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence");
class DarkCoastDeliveryLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.LevelData = undefined;
    this.UiLevelSequence = undefined;
    this.yQa = undefined;
    this.UOt = true;
    this.OnClickToggleCallback = () => {
      if (this.yQa) {
        this.yQa(this.LevelData, this);
      }
    };
    this.LevelData = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIExtendToggle], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.OnClickToggleCallback]];
  }
  OnBeforeCreateImplement() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
    this.GetExtendToggle(4).CanExecuteChange.Bind(() => this.GetExtendToggle(4).GetToggleState() === 0);
    this.GetItem(5).SetUIActive(false);
  }
  OnStart() {
    this.RefreshUi();
  }
  OnBeforeShow() {
    if (this.UOt) {
      this.PlaySequence(true);
      this.UOt = false;
    }
  }
  RefreshUi() {
    var e = this.LevelData.Config;
    var i = this.LevelData.GetDarkCoastDeliveryGuardState();
    this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(0));
    this.SetSpriteByPath(e.LevelIcon, this.GetSprite(1), false);
    this.SetSpriteByPath(e.LevelSelectIcon, this.GetSprite(2), false);
    this.GetItem(3).SetUIActive(i === 3);
  }
  PlaySequence(e) {
    switch (this.LevelData.GetDarkCoastDeliveryGuardState()) {
      case 0:
        this.UiLevelSequence.PlaySequence("Lock");
        break;
      case 1:
        this.UiLevelSequence.PlaySequence("Unlock");
        break;
      case 3:
        this.UiLevelSequence.PlaySequence("Receive");
        break;
      case 4:
        this.UiLevelSequence.PlaySequence("Done");
    }
    if (e) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
  }
  SetSelect(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(4).SetToggleStateForce(e);
  }
  JumpUnCheckedToCheckedAnim() {
    var e = this.GetExtendToggle(4);
    var i = e.StateSwitchAnimations.Get(2);
    if (i !== undefined) {
      i = i.Animation.LevelSequence;
      e.GetOwner().SequenceJumpToEnd(i);
    }
  }
  SetClickToggleCallback(e) {
    this.yQa = e;
  }
}
exports.DarkCoastDeliveryLevelItem = DarkCoastDeliveryLevelItem;
//# sourceMappingURL=DarkCoastDeliveryLevelItem.js.map