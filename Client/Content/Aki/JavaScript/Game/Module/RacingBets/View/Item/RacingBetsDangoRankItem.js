"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoRankItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Time_1 = require("../../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const RacingBetsDefine_1 = require("../../RacingBetsDefine");
class RacingBetsDangoRankItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.UiLevelSequence = undefined;
    this.fT1 = undefined;
    this.gT1 = 0;
    this.LerpTime = RacingBetsDefine_1.RACING_BETS_DANGO_RANK_ITEM_LERP_INTERVAL;
    this.CT1 = 0;
    this.pT1 = 0;
    this.vT1 = 0;
    this.yT1 = undefined;
    this.TDe = undefined;
    this.ST1 = undefined;
    this.J_ = i => {
      this.CT1 += i;
      var i = this.LerpTime / Time_1.Time.TimeDilation;
      if (this.CT1 >= i) {
        this.RootItem.SetAnchorOffsetY(this.vT1);
        this.MT1();
        this.ReleaseHandle();
      } else {
        i = this.ST1.GetFloatValue(this.CT1 / i) * (this.vT1 - this.pT1) + this.pT1;
        this.RootItem.SetAnchorOffsetY(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIItem]];
  }
  OnBeforeCreateImplement() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
  }
  Init(i, e, s) {
    this.fT1 = i;
    this.ST1 = e;
    this.gT1 = s;
    this.GetText(0).SetText(i.Rank.toString());
    e = DangoManager_1.DangoManager.GetDangoData(i.DangoId);
    this.GetText(2).ShowTextNew(e.NameKey);
    this.RootItem.SetAnchorOffsetY(this.ET1(i.Rank));
    this.SetTextureShowUntilLoaded(e.DangoConfig.IconSmall, this.GetTexture(1));
    s = i.GetDiceConfig();
    this.SetTextureShowUntilLoaded(s.RollDiceBackgroundIcon, this.GetTexture(3));
    e = ModelManager_1.ModelManager.RacingBetsModel.IsDungeonBettingDango(i.DangoId);
    this.GetItem(4).SetUIActive(e);
  }
  async RefreshAsync() {
    var i;
    var e;
    var s;
    if (this.fT1.LastRank !== this.fT1.Rank) {
      this.ReleaseHandle();
      this.MT1();
      s = (i = this.fT1.Rank < this.fT1.LastRank) ? "RiseIn" : "DownIn";
      i = i ? "RiseOut" : "DownOut";
      e = new CustomPromise_1.CustomPromise();
      await this.UiLevelSequence.PlaySequenceAsync(s, e, false, false, Time_1.Time.TimeDilation);
      await this.LerpRankTargetPosition();
      this.RootItem.SetHierarchyIndex(this.fT1.Rank);
      this.GetText(0).SetText(this.fT1.Rank.toString());
      s = new CustomPromise_1.CustomPromise();
      await this.UiLevelSequence.PlaySequenceAsync(i, s, false, false, Time_1.Time.TimeDilation);
    }
  }
  async LerpRankTargetPosition() {
    this.yT1 = new CustomPromise_1.CustomPromise();
    this.pT1 = this.ET1(this.fT1.LastRank);
    this.vT1 = this.ET1(this.fT1.Rank);
    this.CT1 = 0;
    this.TDe = TimerSystem_1.TimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME);
    await this.yT1.Promise;
  }
  OnBeforeDestroy() {
    this.ReleaseHandle();
    this.MT1();
  }
  ET1(i) {
    return -(i - 1) * (this.RootItem.GetHeight() + this.gT1);
  }
  ReleaseHandle() {
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  MT1() {
    if (this.yT1) {
      this.yT1.SetResult(undefined);
      this.yT1 = undefined;
    }
  }
}
exports.RacingBetsDangoRankItem = RacingBetsDangoRankItem;
//# sourceMappingURL=RacingBetsDangoRankItem.js.map