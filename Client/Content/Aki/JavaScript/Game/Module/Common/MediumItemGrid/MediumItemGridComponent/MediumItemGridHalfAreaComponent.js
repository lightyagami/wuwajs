"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridHalfAreaComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridHalfAreaComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemTagTeam";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnRefresh(e) {
    e = this._A_(e?.BelongTo);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSpriteByPath(e, this.GetSprite(0), false);
    this.SetActive(true);
  }
  _A_(e = 0) {
    if (e === 0) {
      return "SP_ComTagTeam1";
    } else {
      return "SP_ComTagTeam2";
    }
  }
}
exports.MediumItemGridHalfAreaComponent = MediumItemGridHalfAreaComponent;
//# sourceMappingURL=MediumItemGridHalfAreaComponent.js.map