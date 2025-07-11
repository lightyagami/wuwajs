"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterNameWithBg = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../../../Util/LguiUtil");
class CharacterNameWithBg extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  Refresh(e) {
    e = ConfigManager_1.ConfigManager.BusinessConfig.GetCharacterConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    this.GetSprite(0).SetColor(UE.Color.FromHex(e.Color));
  }
}
exports.CharacterNameWithBg = CharacterNameWithBg;
//# sourceMappingURL=CharacterNameWithBg.js.map