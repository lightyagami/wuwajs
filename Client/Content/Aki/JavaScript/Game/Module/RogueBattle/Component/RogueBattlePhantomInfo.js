"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattlePhantomInfo = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattlePhantomInfoAffix_1 = require("./RogueBattlePhantomInfoAffix");
class RogueBattlePhantomInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AffixLayout = undefined;
    this.d5c = () => new RogueBattlePhantomInfoAffix_1.RogueBattlePhantomInfoAffix();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.AffixLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.d5c);
    var e = ModelManager_1.ModelManager.RogueBattleModel.GetPhantomData();
    var t = [];
    if (e) {
      t.push(this.AffixLayout.RefreshByDataAsync(e.uIc.e5c));
      if (e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResPokemon(e.uIc.v9n)) {
        t.push(this.SetTextureAsync(e.PokemonIcon, this.GetTexture(1)));
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.PokemonName);
      }
    } else {
      t.push(this.AffixLayout.RefreshByDataAsync([]));
      this.GetText(2)?.SetText("");
    }
    await Promise.all(t);
  }
}
exports.RogueBattlePhantomInfo = RogueBattlePhantomInfo;
//# sourceMappingURL=RogueBattlePhantomInfo.js.map