"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsDangoRankItem = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Time_1 = require("../../../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  RacingBetsDefine_1 = require("../../RacingBetsDefine");
class RacingBetsDangoRankItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.UiLevelSequence = void 0, this.jI1 = void 0, this.HI1 = 0, this.LerpTime = RacingBetsDefine_1.RACING_BETS_DANGO_RANK_ITEM_LERP_INTERVAL, this.$I1 = 0, this.WI1 = 0, this.QI1 = 0, this.KI1 = void 0, this.TDe = void 0, this.XI1 = void 0, this.J_ = i => {
      this.$I1 += i;
      var i = this.LerpTime / Time_1.Time.TimeDilation;
      this.$I1 >= i ? (this.RootItem.SetAnchorOffsetY(this.QI1), this.YI1(), this.ReleaseHandle()) : (i = this.XI1.GetFloatValue(this.$I1 / i) * (this.QI1 - this.WI1) + this.WI1, this.RootItem.SetAnchorOffsetY(i))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIItem]
    ]
  }
  OnBeforeCreateImplement() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this), this.AddUiBehavior(this.UiLevelSequence)
  }
  Init(i, e, s) {
    this.jI1 = i, this.XI1 = e, this.HI1 = s, this.GetText(0).SetText(i.Rank.toString());
    e = DangoManager_1.DangoManager.GetDangoData(i.DangoId), this.GetText(2).ShowTextNew(e.NameKey), this.RootItem.SetAnchorOffsetY(this.zI1(i.Rank)), this.SetTextureShowUntilLoaded(e.DangoConfig.IconSmall, this.GetTexture(1)), s = i.GetDiceConfig(), this.SetTextureShowUntilLoaded(s.RollDiceBackgroundIcon, this.GetTexture(3)), e = ModelManager_1.ModelManager.RacingBetsModel.IsDungeonBettingDango(i.DangoId);
    this.GetItem(4).SetUIActive(e)
  }
  async RefreshAsync() {
    var i, e, s;
    this.jI1.LastRank !== this.jI1.Rank && (this.ReleaseHandle(), this.YI1(), s = (i = this.jI1.Rank < this.jI1.LastRank) ? "RiseIn" : "DownIn", i = i ? "RiseOut" : "DownOut", e = new CustomPromise_1.CustomPromise, await this.UiLevelSequence.PlaySequenceAsync(s, e, !1, !1, Time_1.Time.TimeDilation), await this.LerpRankTargetPosition(), this.RootItem.SetHierarchyIndex(this.jI1.Rank), this.GetText(0).SetText(this.jI1.Rank.toString()), s = new CustomPromise_1.CustomPromise, await this.UiLevelSequence.PlaySequenceAsync(i, s, !1, !1, Time_1.Time.TimeDilation))
  }
  async LerpRankTargetPosition() {
    this.KI1 = new CustomPromise_1.CustomPromise, this.WI1 = this.zI1(this.jI1.LastRank), this.QI1 = this.zI1(this.jI1.Rank), this.$I1 = 0, this.TDe = TimerSystem_1.TimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME), await this.KI1.Promise
  }
  OnBeforeDestroy() {
    this.ReleaseHandle(), this.YI1()
  }
  zI1(i) {
    return -(i - 1) * (this.RootItem.GetHeight() + this.HI1)
  }
  ReleaseHandle() {
    this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0)
  }
  YI1() {
    this.KI1 && (this.KI1.SetResult(void 0), this.KI1 = void 0)
  }
}
exports.RacingBetsDangoRankItem = RacingBetsDangoRankItem;
//# sourceMappingURL=RacingBetsDangoRankItem.js.map