"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymThirdLevelItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const LordGymDefine_1 = require("../LordGymDefine");
const LordGymDifficultyItem_1 = require("./LordGymDifficultyItem");
class LordGymThirdLevelItem extends LordGymDifficultyItem_1.LordGymDifficultyItem {
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos[1] = [1, UE.UISprite];
  }
  SetLevelText(e) {
    e = e.Difficulty.toString();
    this.SetSpriteByPath(StringUtils_1.StringUtils.Format(LordGymDefine_1.ROME_ICON_PATH, e, e), this.GetSprite(1), true);
  }
}
exports.LordGymThirdLevelItem = LordGymThirdLevelItem;
//# sourceMappingURL=LordGymThirdLevelItem.js.map