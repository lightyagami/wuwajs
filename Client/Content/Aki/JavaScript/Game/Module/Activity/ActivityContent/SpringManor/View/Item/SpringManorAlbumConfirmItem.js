"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorAlbumConfirmItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class SpringManorAlbumConfirmItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIText]];
  }
  SetState(e, t) {
    this.GetItem(2)?.SetUIActive(e === 1);
    t = ModelManager_1.ModelManager.SpringManorModel.IsQuestTracking(t);
    if (e === 0) {
      if (t) {
        this.GetText(5)?.ShowTextNew("PictureAlbum_BtnName_UnTrack");
      } else {
        this.GetText(5)?.ShowTextNew("PictureAlbum_BtnName_Track");
      }
    } else if (e === 1) {
      this.GetText(1)?.ShowTextNew("PictureAlbum_BtnName_Receive");
    }
    this.SetBtnBg(e === 0);
  }
  SetBtnBg(e) {
    this.GetSprite(3)?.SetUIActive(!e);
    this.GetSprite(4)?.SetUIActive(e);
    this.GetText(1)?.SetUIActive(!e);
    this.GetText(5)?.SetUIActive(e);
  }
}
exports.SpringManorAlbumConfirmItem = SpringManorAlbumConfirmItem;
//# sourceMappingURL=SpringManorAlbumConfirmItem.js.map