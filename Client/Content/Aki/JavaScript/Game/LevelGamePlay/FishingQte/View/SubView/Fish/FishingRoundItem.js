"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRoundItem = undefined;
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../../Module/Util/Grid/GridProxyAbstract");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const fishingIconPath = {
  [1]: "SP_Fishing_IconMaterial",
  0: "SP_Fishing_IconFish"
};
class FishingRoundItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetSprite(1).SetUIActive(false);
  }
  Refresh(e, i, r) {}
  ShowIcon(e) {
    const i = this.GetSprite(1);
    e = fishingIconPath[e];
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSpriteByPath(e, i, false, undefined, () => {
      i.SetUIActive(true);
      this.LevelSequencePlayer.PlayLevelSequenceByName("Fish");
    });
  }
}
exports.FishingRoundItem = FishingRoundItem;
//# sourceMappingURL=FishingRoundItem.js.map