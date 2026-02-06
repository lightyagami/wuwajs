"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePhoneMessageButton = undefined;
const UE = require("ue");
const PhoneMessageButtonHelper_1 = require("../../../PhoneMessage/View/PhoneMessageButtonHelper");
const BattleEntranceButton_1 = require("./BattleEntranceButton");
class BattlePhoneMessageButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments);
    this.Nug = undefined;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, UE.UISprite], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UINiagara]);
  }
  OnStart() {
    super.OnStart();
    this.Nug = new PhoneMessageButtonHelper_1.PhoneMessageButtonHelper(this.RootItem, this.RootActor, this.GetItem(1), this.GetSprite(2), this.GetItem(4), this.GetTexture(5), this.GetItem(6), this.GetUiNiagara(7), (e, t) => {
      this.SetTextureByPath(e, t);
    });
    this.Nug.Init();
  }
  Initialize(e) {
    super.Initialize(e);
  }
  OnShowBattleChildView() {
    super.OnShowBattleChildView();
    this.Nug?.OnShowBattleChildView();
  }
  OnHideBattleChildView() {
    super.OnHideBattleChildView();
    this.Nug?.OnHideBattleChildView();
  }
  Reset() {
    super.Reset();
    this.Nug?.Clear();
  }
  CheckAndPlayPhoneSequence() {
    this.Nug?.CheckAndPlayPhoneSequence();
  }
  PopShowHeadIcon() {
    this.Nug?.PopShowHeadIcon();
  }
  HideHeadIcon() {
    this.Nug?.HideHeadIcon();
  }
}
exports.BattlePhoneMessageButton = BattlePhoneMessageButton;
//# sourceMappingURL=BattlePhoneMessageButton.js.map