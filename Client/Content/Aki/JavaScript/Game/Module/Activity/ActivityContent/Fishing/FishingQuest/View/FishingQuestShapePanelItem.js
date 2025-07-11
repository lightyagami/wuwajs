"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQuestShapePanelItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const FishingDefine_1 = require("../../FishingDefine");
class FishingQuestShapePanelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.RowIndex = 0;
    this.ColumnIndex = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(e, i, s) {
    this.RowIndex = e[0];
    this.ColumnIndex = e[1];
  }
  SetGirdSprite(e, i) {
    if (e === 0) {
      const s = this.GetSprite(0);
      const i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(FishingDefine_1.EMPTY_SPRITE);
      this.SetSpriteByPath(i, s, false);
    } else {
      const s = this.GetSprite(0);
      this.SetSpriteByPath(i, s, false);
    }
  }
}
exports.FishingQuestShapePanelItem = FishingQuestShapePanelItem;
//# sourceMappingURL=FishingQuestShapePanelItem.js.map