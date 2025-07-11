"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGridDecoration = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GRID_TAKE_SPRITE = "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_PieceFlag.SP_PieceFlag";
class MapRogueGridDecoration extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Amt(e) {
    const i = this.GetSprite(0);
    this.SetSpriteByPath(e, i, false, undefined, e => {
      if (e) {
        i.SetUIActive(true);
      }
    });
  }
  Refresh(e) {
    var i = e.ExtraPathIndex >= 0;
    this.GetSprite(0).SetUIActive(false);
    if (e.IsExplore && e.GridEventId !== 0) {
      this.Amt(GRID_TAKE_SPRITE);
    } else if (i &&= ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(e.GridTypeId)) {
      i = Array.from(i.DecorationPath.keys());
      this.Amt(i[e.ExtraPathIndex]);
    }
  }
  SetVision(e) {
    this.SetActive(e);
  }
}
exports.MapRogueGridDecoration = MapRogueGridDecoration;
//# sourceMappingURL=MapRogueGridDecoration.js.map