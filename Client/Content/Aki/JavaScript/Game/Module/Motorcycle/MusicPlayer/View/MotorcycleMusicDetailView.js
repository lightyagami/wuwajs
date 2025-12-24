"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMusicDetailView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class MotorcycleMusicDetailView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.CloseMe.bind(this)]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    var e = ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(e);
    if (e && (this.GetText(4).ShowTextNew(e.UnlockConditionText), this.GetText(3).ShowTextNew(e.Title), e.Album.length > 0) && (e = ConfigManager_1.ConfigManager.PhonographConfig.GetMusicAlbumById(e.Album[0]))) {
      this.GetText(2).ShowTextNew(e.Title);
      this.SetTextureByPath(e.Cover, this.GetTexture(1));
    }
  }
}
exports.MotorcycleMusicDetailView = MotorcycleMusicDetailView;
//# sourceMappingURL=MotorcycleMusicDetailView.js.map