"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoRankPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RacingBetsDefine_1 = require("../../RacingBetsDefine");
const RacingBetsDangoRankItem_1 = require("./RacingBetsDangoRankItem");
class RacingBetsDangoRankPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fGo = undefined;
    this.IT1 = new Map();
    this.DangoRankItemHeight = 0;
    this.DangoRankInterval = RacingBetsDefine_1.RACING_BETS_DANGO_RANK_ITEM_OFFSET_INTERVAL;
    this.TT1 = [];
    this.ST1 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    const t = new CustomPromise_1.CustomPromise();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("RacingBetsRankChangeCurve");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
      this.ST1 = e;
      t.SetResult(undefined);
    }, 100, this.MemoryTag);
    await t.Promise;
  }
  OnStart() {
    this.fGo = this.GetItem(0).GetAttachUIChild(0)?.GetOwner();
    if (this.fGo) {
      this.DangoRankItemHeight = this.fGo.GetUIItem().GetHeight();
      this.fGo.GetUIItem().SetUIActive(false);
    }
  }
  async InitAsync(t) {
    this.IT1.clear();
    this.TT1 = [];
    var i = new Array(t.length);
    for (let e = 0; e < t.length; e++) {
      i[e] = this.bT1(e, t[e]);
    }
    await Promise.all(i);
  }
  async bT1(e, t) {
    var i = this.RT1().GetOwner();
    var s = new RacingBetsDangoRankItem_1.RacingBetsDangoRankItem();
    await s.CreateThenShowByActorAsync(i);
    s.Init(t, this.ST1, this.DangoRankInterval);
    this.TT1.push(s);
    this.IT1.set(t, s);
  }
  RT1() {
    return LguiUtil_1.LguiUtil.CopyItem(this.fGo.GetUIItem(), this.GetRootItem());
  }
  async RefreshRankItemAsync() {
    var t = new Array(this.TT1.length);
    for (let e = 0; e < this.TT1.length; e++) {
      t[e] = this.TT1[e].RefreshAsync();
    }
    await Promise.all(t);
  }
}
exports.RacingBetsDangoRankPanel = RacingBetsDangoRankPanel;
//# sourceMappingURL=RacingBetsDangoRankPanel.js.map