"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderQuicklyBuildItem = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DeckBuilderQuicklyBuildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Data = void 0, this.CardTextureList = [], this.OnToggleStateChange = void 0, this.BK1 = () => {
      this.OnToggleStateChange && this.OnToggleStateChange(this.GridIndex)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UITexture]
    ], this.BtnBindInfo = [
      [0, this.BK1]
    ]
  }
  OnStart() {
    for (let t = 3; t <= 4; t++) this.CardTextureList.push(this.GetTexture(t))
  }
  Refresh(t, e, i) {
    this.Data = t, this.GetText(1).SetText(t.GetDeckName()), this.RefreshCountText(), this.GetExtendToggle(0).SetToggleState(e ? 1 : 0, !1);
    var r = t.GetElementList();
    if (r.length > this.CardTextureList.length) Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "元素数量超过上限");
    else {
      for (let t = 0; t < r.length; t++) {
        this.CardTextureList[t].SetUIActive(!0);
        var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(r[t]);
        this.SetTextureByPath(s.QuicklyBuildFilterIcon, this.CardTextureList[t])
      }
      for (let t = r.length; t < this.CardTextureList.length; t++) this.CardTextureList[t].SetUIActive(!1)
    }
  }
  RefreshCountText() {
    var t, e;
    this.Data && ((t = ModelManager_1.ModelManager.PhantomArenaModel.GetUnlockCardCountInDeck(this.Data)) === (e = this.Data.GetTotalCardCount()) ? this.GetText(2).SetText(t + "/" + e) : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "PhantomBattle_1078", t, e))
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t)
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t)
  }
}
exports.DeckBuilderQuicklyBuildItem = DeckBuilderQuicklyBuildItem;
//# sourceMappingURL=DeckBuilderQuicklyBuildItem.js.map