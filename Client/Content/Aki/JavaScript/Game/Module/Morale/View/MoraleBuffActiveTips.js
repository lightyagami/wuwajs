"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffActiveTips = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
class MoraleBuffActiveTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.TipCountDown = 0, this.ShowBuffList = [], this.CurShowInfo = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UISprite],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem]
    ]
  }
  OnStart() {
    this.ShowBuffList = ModelManager_1.ModelManager.MoraleModel.BuffActiveTipsList, this.GetItem(3)?.SetUIActive(!0), this.GetItem(5)?.SetUIActive(!0), this.GetItem(4)?.SetUIActive(!1)
  }
  OnBeforeShow() {
    this.UpdateData()
  }
  UpdateData() {
    var t;
    this.CurShowInfo = this.ShowBuffList.shift(), this.CurShowInfo ? (this.TipCountDown = ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleBuffShowTime(), (t = ModelManager_1.ModelManager.MoraleModel.BuffMap.get(this.CurShowInfo.BuffId)) ? (this.GetText(1).ShowTextNew(t.Config.BuffName), this.GetText(2).ShowTextNew(t.Config.BuffDescDetail), this.UpdateState()) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "buffData is not find", ["buffId", this.CurShowInfo.BuffId])) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "buffData show is finish"), this.CloseMe())
  }
  UpdateState() {
    switch (this.CurShowInfo.State) {
      case 1:
        this.SetStateActive();
        break;
      case 0:
        this.SetStateTempActive();
        break;
      case 2:
        this.SetStateNotActive()
    }
  }
  SetStateActive() {
    this.rWi(!1), this.jeu("Morale_title_24"), this.Heu("SP_ItemNewBg"), this.$eu(9), this.Weu(!1), this.Qeu(!1)
  }
  SetStateTempActive() {
    this.rWi(!0), this.jeu("Morale_title_25"), this.Heu("SP_ItemNewBg"), this.$eu(9), this.Weu(!1), this.Qeu(!1)
  }
  SetStateNotActive() {
    this.rWi(!1), this.jeu("Morale_title_26"), this.Heu("SP_InvalidationBg"), this.$eu(10), this.Weu(!0), this.Qeu(!0)
  }
  rWi(t) {
    this.GetItem(7).SetUIActive(t)
  }
  jeu(t) {
    this.GetText(8)?.ShowTextNew(t)
  }
  Heu(t) {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t),
      i = this.GetSprite(6);
    this.SetSpriteByPath(t, i, !1)
  }
  $eu(t) {
    for (const i of [9, 10]) this.GetItem(i).SetUIActive(i === t)
  }
  Weu(t) {
    this.GetItem(11).SetUIActive(t)
  }
  Qeu(t) {
    var i = this.GetText(1);
    i?.SetChangeColor(t, i.changeColor)
  }
  OnTick(t) {
    this.TipCountDown <= 0 || (this.TipCountDown -= t, this.TipCountDown <= 0 && this.Keu())
  }
  Keu() {
    0 < this.ShowBuffList.length ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "刷新下个Buff数据"), this.s9_()) : this.CloseMe()
  }
  async s9_() {
    await this.PlaySequenceAsync("Close"), this.PlaySequence("Start"), this.UpdateData()
  }
}
exports.MoraleBuffActiveTips = MoraleBuffActiveTips;
//# sourceMappingURL=MoraleBuffActiveTips.js.map