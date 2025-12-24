"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisQteView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ArtemisQteClickTipsItem_1 = require("./ArtemisQteClickTipsItem");
const ArtemisQteDefine_1 = require("./ArtemisQteDefine");
const ArtemisQteProgressItem_1 = require("./ArtemisQteProgressItem");
const MAX_QTE_ROUNG = 1;
const GAME_END_TIME = 800;
class ArtemisQteView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.GameInfo = undefined;
    this.hfl = undefined;
    this.HDe = undefined;
    this._U1 = undefined;
    this.eOf = undefined;
    this.CurrentGameplayId = 0;
    this.f7_ = 0;
    this.At_ = t => {
      this.hfl.OnArrowStayAreaUpdate(t);
    };
    this.xt_ = () => {
      var t;
      var e;
      var i;
      if (!this.GameInfo.IsGamePause()) {
        e = (t = this.GameInfo.GetRingInfo()).CurrentArrowStayCellIndex;
        if (i = t.CheckInArea(t.GetPerfectAreas(), e)) {
          this.Ufl(2, i);
        } else if (i = t.CheckInArea(t.GetQteAreas(), e)) {
          this.Ufl(1, i);
        } else {
          this.Ufl(0, undefined);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.xt_]];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam;
    this.GameplayStart(t?.GamePlayId, MAX_QTE_ROUNG);
    this.eOf = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var t = [];
    this.hfl = new ArtemisQteProgressItem_1.ArtemisQteProgressItem();
    var e = this.GetCurrentGameplayId;
    this.hfl?.Init(e, this.GameInfo);
    var e = this.GetItem(0).GetOwner();
    t.push(this.hfl.CreateThenShowByActorAsync(e));
    this._U1 = new ArtemisQteClickTipsItem_1.ArtemisQteClickTipsItem();
    var e = this.GetItem(2).GetOwner();
    t.push(this._U1.CreateThenShowByActorAsync(e));
    await Promise.all(t);
  }
  OnBeforeShow() {
    this.Gti(this.eOf, "Start");
    this.hfl?.PlayAnim("Start");
  }
  async OnBeforeHideAsync() {
    this.hfl?.PlayAnim("Close");
    await this.eOf?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnArtemisQteAreaChange, this.At_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnArtemisQteAreaChange, this.At_);
  }
  OnStart() {
    this.AU();
    this.hfl?.InitRing();
    this._U1?.SetActive(false);
  }
  AU() {
    this.GameInfo.SetGameStage(1);
    this.GameInfo.GetRingInfo().EnterNextValidArea();
    this.mO_();
  }
  OnBeforeDestroy() {
    if (this.HDe) {
      this.HDe();
    }
    this.eOf?.Clear();
    this.eOf = undefined;
  }
  OnTick(t) {
    this.hfl?.OnTick(t);
    if (!this.GameInfo.IsGamePause()) {
      t = t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      this.GameInfo.CurrentScore += this.ScoreUp * t;
      t = this?.GetCurrentPlayConfig()?.MaxScore ?? 0;
      if (this.GameInfo.CurrentScore >= t) {
        this.Bt_();
      }
    }
  }
  Bt_() {
    this.GameInfo.CurrentRound = Math.min(this.GameInfo.CurrentRound + 1, this.GameInfo.MaxRound);
    var t = this.GetCurrentPlayConfig();
    if (this.GameInfo.CurrentRound !== this.GameInfo.MaxRound) {
      this.GameInfo.CurrentScore -= t.MaxScore;
    } else {
      this.GameInfo.SetGameStage(4);
    }
    this.hfl.EnterNextRound();
    if (this.GameInfo.CurrentRound === this.GameInfo.MaxRound) {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.fO_();
      }, GAME_END_TIME);
    }
  }
  mO_() {
    this.GameInfo.SetGameStage(2);
  }
  fO_() {
    this.OpenParam?.CallBack();
    this.CloseMe();
  }
  Ufl(t, e) {
    this.hfl.OnAreaClick(t, e);
    var i = this?.GetCurrentPlayConfig()?.MaxScore ?? 0;
    switch (t) {
      case 2:
        this.hfl.StartAnimProgress();
        this.Gti(this.eOf, "Perfect");
        this.OnPerfectOn();
        var s = this.GameInfo.GetRingInfo();
        if (!s.IsWholeRing) {
          s.EnterNextValidArea();
        }
        if (this.GameInfo.CurrentScore < i) {
          this.hfl.SpawnContinuousArea(e.ContinuousIndex, 2);
        }
        this._U1?.ShowTip(2);
        break;
      case 1:
        this.hfl.StartAnimProgress();
        this.Gti(this.eOf, "Success");
        this.OnQteOn();
        s = this.GameInfo.GetRingInfo();
        if (!s.IsWholeRing) {
          s.EnterNextValidArea();
        }
        if (this.GameInfo.CurrentScore < i) {
          this.hfl.SpawnContinuousArea(e.ContinuousIndex, 1);
        }
        this._U1?.ShowTip(0);
        break;
      case 0:
        this.Gti(this.eOf, "Miss");
        this.OnMissOn();
        this._U1?.ShowTip(1);
    }
  }
  Gti(t, e) {
    if (t.GetCurrentSequence() === e) {
      t.ReplaySequenceByKey(e);
    } else {
      t.StopPlayingSequence(false, true);
      t.PlayLevelSequenceByName(e, false);
    }
  }
  get GetCurrentGameplayId() {
    return this.CurrentGameplayId;
  }
  GameplayStart(t, e) {
    this.CurrentGameplayId = t;
    return this.Fn_(e);
  }
  GetCurrentPlayConfig() {
    return ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.CurrentGameplayId);
  }
  Fn_(t) {
    this.GameInfo ||= new ArtemisQteDefine_1.ArtemisQteGameInfo();
    this.GameInfo.Clear();
    var e = this.GetCurrentPlayConfig();
    var i = e?.IsAnticlockwise ? 1 : 0;
    this.GameInfo.CreateRingInfo(i);
    this.GameInfo.MaxRound = t;
    var i = e?.InvalidArea?.length ?? 0;
    this.GameInfo.GetRingInfo().IsWholeRing = i === 0;
    return !(this.AccumulatePerfectCombo = 0);
  }
  get ScoreUp() {
    var t = this.GetCurrentPlayConfig();
    if (t) {
      return t.ScoreUp;
    } else {
      return 0;
    }
  }
  get HitAreaScore() {
    var t = this.GetCurrentPlayConfig();
    if (t) {
      return t.HitAreaScore;
    } else {
      return 0;
    }
  }
  get PerfectScore() {
    var t = this.GetCurrentPlayConfig();
    if (t) {
      return t.PerfectScore;
    } else {
      return 0;
    }
  }
  set AccumulatePerfectCombo(t) {
    this.f7_ = t;
    this.C7_();
  }
  get AccumulatePerfectCombo() {
    return this.f7_;
  }
  OnQteOn() {
    this.GameInfo.CurrentScore += this.HitAreaScore;
    this.AccumulatePerfectCombo++;
  }
  OnPerfectOn() {
    this.GameInfo.CurrentScore += this.PerfectScore;
    this.AccumulatePerfectCombo++;
  }
  OnMissOn() {
    var t = this.GetCurrentPlayConfig();
    this.GameInfo.CurrentScore = Math.max(0, this.GameInfo.CurrentScore - t.MistakeScore);
    this.AccumulatePerfectCombo = 0;
  }
  C7_() {
    var t = this.AccumulatePerfectCombo;
    var e = this.GetCurrentPlayConfig();
    this.GameInfo.CursorSpeed = this.p7_(t, e.CursorSpeed);
    this.GameInfo.RingSpeed = this.p7_(t, e.RouletteRotateSpeed);
    this.GameInfo.PerfectAppearRate = this.p7_(t, e.PerfectAppearRate);
  }
  p7_(e, t) {
    var i = Array.from(t.entries());
    for (let t = 0; t < i.length; t++) {
      var s = i[t][0];
      var r = i[t][1];
      if (!(t < i.length - 1)) {
        return r;
      }
      var h = i[t + 1][0];
      if (s <= e && e < h) {
        return r;
      }
    }
    return 0;
  }
}
exports.ArtemisQteView = ArtemisQteView;
//# sourceMappingURL=ArtemisQteView.js.map