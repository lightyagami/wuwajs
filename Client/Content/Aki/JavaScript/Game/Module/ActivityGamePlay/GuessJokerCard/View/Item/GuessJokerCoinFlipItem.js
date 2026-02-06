"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCoinFlipItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LoginDefine_1 = require("../../../../Login/Data/LoginDefine");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class GuessJokerCoinFlipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.NTt = () => {};
    this.ZFg = false;
    this.QJu = () => {
      if (this.ZFg) {
        this.NTt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UITexture], [4, UE.UITexture]];
    this.BtnBindInfo = [[0, this.QJu]];
  }
  Refresh() {
    var e;
    var i = ModelManager_1.ModelManager.GuessJokerGamePlayModel.FirstPlayerTurn;
    var s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
    var s = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(s);
    if (s !== undefined) {
      s = s.CoinIconPath;
      e = ModelManager_1.ModelManager.WorldLevelModel.Sex === LoginDefine_1.ELoginSex.Boy ? "T_GhostCardFlipCoin_Boy" : "T_GhostCardFlipCoin_Girl";
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      if (i === 1) {
        this.SetTextureByPath(s, this.GetTexture(1));
        this.SetTextureByPath(s, this.GetTexture(4));
        this.SetTextureByPath(e, this.GetTexture(3));
      } else {
        this.SetTextureByPath(e, this.GetTexture(1));
        this.SetTextureByPath(e, this.GetTexture(4));
        this.SetTextureByPath(s, this.GetTexture(3));
      }
      e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetPlayerNameByType(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "GuessJoker_FirstPlayerText", e);
    }
  }
  SetClickCallback(e) {
    this.NTt = e;
  }
  SetClickEnable(e) {
    this.ZFg = e;
  }
}
exports.GuessJokerCoinFlipItem = GuessJokerCoinFlipItem;
//# sourceMappingURL=GuessJokerCoinFlipItem.js.map