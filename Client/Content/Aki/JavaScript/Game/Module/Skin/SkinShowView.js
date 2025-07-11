"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinShowView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class SkinShowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.Awe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.SpineSkeletonAnimationComponent], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.Awe], [4, this.Awe]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.$8i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(e);
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    if (this.$8i) {
      this.P3l(this.$8i);
      this.Wyl(this.$8i);
      this.Qyl(this.$8i);
    }
  }
  async P3l(e) {
    var i;
    if (e) {
      i = e.GetSmallSpineAtlas();
      e = e.GetSpineSkeletonData();
      await this.SetSpineAssetByPath(i, e, this.GetSpine(1));
      this.GetSpine(1).SetAnimation(0, "idle", true);
    }
  }
  Wyl(e) {
    if (e) {
      this.GetTexture(2).SetUIActive(true);
      e = e.GetObtainFrameColor1();
      e = UE.Color.FromHex(e);
      this.GetTexture(2).SetColor(e);
    } else {
      this.GetTexture(2).SetUIActive(false);
    }
  }
  Qyl(e) {
    if (e) {
      this.GetTexture(3).SetUIActive(true);
      e = e.GetObtainFrameColor2();
      e = UE.Color.FromHex(e);
      this.GetTexture(3).SetColor(e);
    } else {
      this.GetTexture(3).SetUIActive(false);
    }
  }
}
exports.SkinShowView = SkinShowView;
//# sourceMappingURL=SkinShowView.js.map