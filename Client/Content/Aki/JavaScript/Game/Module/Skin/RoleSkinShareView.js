"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinShareView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class RoleSkinShareView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    this.$8i = this.OpenParam;
    this.Og();
  }
  Og() {
    this.Zke(this.$8i);
    this.Nft(this.$8i);
    this.Myl(this.$8i);
  }
  Zke(e) {
    if (e) {
      e = e.GetShareTexturePath();
      this.SetTextureByPath(e, this.GetTexture(0));
    }
  }
  Nft(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.GetTitleName());
  }
  Myl(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.GetSubTitle());
  }
}
exports.RoleSkinShareView = RoleSkinShareView;
//# sourceMappingURL=RoleSkinShareView.js.map