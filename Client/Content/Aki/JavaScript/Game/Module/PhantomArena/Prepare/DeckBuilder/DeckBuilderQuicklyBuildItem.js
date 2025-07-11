"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderQuicklyBuildItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DeckBuilderQuicklyBuildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.CardTextureList = [];
    this.OnToggleStateChange = undefined;
    this.LX1 = () => {
      if (this.OnToggleStateChange) {
        this.OnToggleStateChange(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UITexture]];
    this.BtnBindInfo = [[0, this.LX1]];
  }
  OnStart() {
    for (let t = 3; t <= 4; t++) {
      this.CardTextureList.push(this.GetTexture(t));
    }
  }
  Refresh(t, e, i) {
    this.Data = t;
    this.GetText(1).SetText(t.GetDeckName());
    this.RefreshCountText();
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0, false);
    var r = t.GetElementList();
    if (r.length > this.CardTextureList.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "元素数量超过上限");
      }
    } else {
      for (let t = 0; t < r.length; t++) {
        this.CardTextureList[t].SetUIActive(true);
        var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(r[t]);
        this.SetTextureByPath(s.QuicklyBuildFilterIcon, this.CardTextureList[t]);
      }
      for (let t = r.length; t < this.CardTextureList.length; t++) {
        this.CardTextureList[t].SetUIActive(false);
      }
    }
  }
  RefreshCountText() {
    var t;
    var e;
    if (this.Data) {
      if ((t = ModelManager_1.ModelManager.PhantomArenaModel.GetUnlockCardCountInDeck(this.Data)) === (e = this.Data.GetTotalCardCount())) {
        this.GetText(2).SetText(t + "/" + e);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "PhantomBattle_1078", t, e);
      }
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
}
exports.DeckBuilderQuicklyBuildItem = DeckBuilderQuicklyBuildItem;
//# sourceMappingURL=DeckBuilderQuicklyBuildItem.js.map