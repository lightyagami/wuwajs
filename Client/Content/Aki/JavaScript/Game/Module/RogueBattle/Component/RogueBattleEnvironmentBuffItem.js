"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleEnvironmentBuffItemWithSprite = exports.RogueBattleEnvironmentBuffItemWithTexture = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleEnvironmentBuffItemWithTexture extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  Refresh(t, e, i) {
    this.SetTextureByPath(t.Icon, this.GetTexture(0));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TextId, ...t.Param);
  }
}
exports.RogueBattleEnvironmentBuffItemWithTexture = RogueBattleEnvironmentBuffItemWithTexture;
class RogueBattleEnvironmentBuffItemWithSprite extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  Refresh(t, e, i) {
    this.SetSpriteByPath(t.Icon, this.GetSprite(0), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TextId, ...t.Param);
  }
}
exports.RogueBattleEnvironmentBuffItemWithSprite = RogueBattleEnvironmentBuffItemWithSprite;
//# sourceMappingURL=RogueBattleEnvironmentBuffItem.js.map