"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelNamePanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TrapDefenseLevelNamePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelData = undefined;
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIArtText], [4, UE.UIText], [5, UE.UIArtText], [6, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateData(e) {
    var a = (this.LevelData = e).GetPositionFormat();
    this.GetArtText(3)?.SetText(a);
    this.GetArtText(5)?.SetText(a);
    this.GetText(4)?.ShowTextNew(e.Config.Name);
    this.QCa();
  }
  QCa() {
    var e = this.LevelData.GetDifficultyUiInfo();
    var a = this.GetTexture(0);
    var t = this.GetTexture(1);
    var s = this.GetSprite(2);
    var i = this.GetArtText(5);
    var r = this.GetTexture(6);
    var n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.BgKey);
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.BgLightKey);
    var h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.BgTitleKey);
    i.SetColor(UE.Color.FromHex(e.ArtTextShadowColor));
    r.SetColor(UE.Color.FromHex(e.BgFlowerColor));
    this.SetTextureByPath(n, a);
    this.SetTextureByPath(o, t);
    this.SetSpriteByPath(h, s, false);
  }
}
exports.TrapDefenseLevelNamePanel = TrapDefenseLevelNamePanel;
//# sourceMappingURL=TrapDefenseLevelNamePanel.js.map