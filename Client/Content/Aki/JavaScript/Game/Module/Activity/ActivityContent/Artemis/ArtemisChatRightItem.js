"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisChatRightItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InfoDisplayController_1 = require("../../../InfoDisplay/InfoDisplayController");
class ArtemisChatRightItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ysf = undefined;
    this.Ssf = () => {
      if (this.ysf) {
        ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(this.ysf);
        InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISizeControlByOther], [4, UE.UIText], [5, UE.UISprite], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UITexture]];
    this.BtnBindInfo = [[8, this.Ssf]];
  }
  OnStart() {
    this.GetText(0)?.SetUIActive(false);
    this.GetSprite(5)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
    this.GetSprite(6)?.SetUIActive(false);
  }
  SetContent(e) {
    var t;
    if (e) {
      this.Dzm();
      this.GetUiSizeControlByOther(3).GetRootComponent().SetUIActive(e.Content?.length > 0);
      if (e.Content && e.Content?.length > 0) {
        this.GetText(4)?.ShowTextNew(e.Content);
      }
      t = !!e.PicturePath && !!(e.PicturePath?.length > 0);
      this.ysf = e.PicturePath;
      this.GetButton(8)?.RootUIComp.SetUIActive(t);
      t = e.PicturePath && e.PicturePath?.length === 0 ? e.PicturePath : undefined;
      this.TrySetTextureByPath(t, this.GetTexture(9));
    }
  }
  Dzm() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    var e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e);
    const t = this.GetTexture(1);
    t?.SetUIActive(false);
    if (e) {
      this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), t, () => {
        t?.SetUIActive(true);
      });
      this.GetText(2)?.ShowTextNew("Activity_ArtemisChatRoverName");
    }
  }
}
exports.ArtemisChatRightItem = ArtemisChatRightItem;
//# sourceMappingURL=ArtemisChatRightItem.js.map