"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadPhoneMessageButton = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PhoneMsgController_1 = require("../../../PhoneMessage/PhoneMsgController");
const PhoneMessageButtonHelper_1 = require("../../../PhoneMessage/View/PhoneMessageButtonHelper");
class GamepadPhoneMessageButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Nug = undefined;
    this.Fr = () => {
      PhoneMsgController_1.PhoneMsgController.OpenAndJumpShowTipShortMessage(1, 1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UINiagara]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
    this.Nug = new PhoneMessageButtonHelper_1.PhoneMessageButtonHelper(this.RootItem, this.RootActor, this.GetItem(1), this.GetSprite(2), this.GetItem(4), this.GetTexture(5), this.GetItem(6), this.GetUiNiagara(7), (e, s) => {
      this.SetTextureByPath(e, s);
    });
    this.Nug.Init();
  }
  OnShowGamepadTopPanel() {
    this.Nug?.OnShowBattleChildView();
  }
  OnHideGamepadTopPanel() {
    this.Nug?.OnHideBattleChildView();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
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
exports.GamepadPhoneMessageButton = GamepadPhoneMessageButton;
//# sourceMappingURL=GamepadPhoneMessageButton.js.map