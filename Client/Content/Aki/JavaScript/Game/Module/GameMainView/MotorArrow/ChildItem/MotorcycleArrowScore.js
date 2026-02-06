"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowScore = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const DigitScroll_1 = require("../Utilities/DigitScroll");
const MotorcycleUtil_1 = require("../Utilities/MotorcycleUtil");
const CONSECUTIVE_SCORE_DURATION = 5000;
const SCORE_ANIM_DURATION = 500;
class MotorcycleArrowScore extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SpriteExpress = undefined;
    this.ArtTextScore = undefined;
    this.TextTime = undefined;
    this.EffectDouble = undefined;
    this.$pt = undefined;
    this.Dqg = 10;
    this.Uqg = "None";
    this.xqg = 0;
    this.Bqg = "None";
    this.kqg = false;
    this.Aqg = new DigitScroll_1.DigitScroll();
    this.OnMotorArrowScoreUpdate = e => {
      e = this.Aqg.SetTarget(e);
      if (!(e <= 0)) {
        if (e > this.Dqg) {
          this.kqg = true;
          this.jpu("Double", true);
        } else if (this.Uqg !== "Double") {
          if (this.Uqg === "Score") {
            this.jpu("Scoring", false);
          } else if (this.Uqg === "Loop") {
            this.jpu("Score", false);
          }
        }
      }
    };
    this.f0t = e => {
      if (e === "Start" || e === "Double") {
        this.jpu("Loop", false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIArtText], [2, UE.UIText], [3, UE.UIItem]];
  }
  OnStart() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.$pt.BindSequenceCloseEvent(this.f0t);
    this.SpriteExpress = this.GetSprite(0);
    this.ArtTextScore = this.GetArtText(1);
    this.TextTime = this.GetText(2);
    this.EffectDouble = this.GetItem(3);
    var e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    var e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetLevelByInstId(e);
    this.Dqg = e?.BigScore ?? 10;
    this.ArtTextScore?.SetText("0");
    this.Aqg.Init(0, 0, SCORE_ANIM_DURATION);
    this.qqg("SP_ScoreExpress1");
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
    this.$pt = undefined;
  }
  OnBeforeShow() {
    this.OnAddEventListener();
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
    this.OnMotorArrowScoreUpdate(e.Score);
    this.jpu("Start", false);
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorArrowScoreUpdate, this.OnMotorArrowScoreUpdate);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorArrowScoreUpdate, this.OnMotorArrowScoreUpdate);
  }
  OnTick(e) {
    var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
    if (t && (this.TextTime.SetText(MotorcycleUtil_1.MotorcycleUtil.TimeFormat(Time_1.Time.WorldTime - t.LevelStartTime)), this.Aqg.IsFinished() ? this.kqg && (this.Oqg(), this.kqg = false) : (t = this.Aqg.Tick(e), this.ArtTextScore?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(Math.floor(t)))), this.xqg > 0) && Time_1.Time.WorldTime >= this.xqg) {
      this.xqg = 0;
      this.jpu("Loop", false);
    }
  }
  jpu(e, t) {
    if (this.Uqg !== e || t) {
      this.Uqg = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MotorFightActivity", 85, "[摩托战斗]得分Seq", ["state", e]);
      }
      if (e === "Double" || e === "Scoring" || e === "Score") {
        this.qqg("SP_ScoreExpress2");
      } else if (e === "Start" || e === "Close") {
        this.qqg("SP_ScoreExpress1");
      } else if (this.Aqg.Target > 0) {
        this.qqg("SP_ScoreExpress3");
      }
      this.Gqg(e);
      this.$pt.StopPlayingSequence();
      this.$pt.PlayOrReplaySequenceByName(e);
    } else {
      this.Gqg(e);
    }
  }
  Gqg(e) {
    this.xqg = e === "Scoring" || e === "Score" ? Time_1.Time.WorldTime + CONSECUTIVE_SCORE_DURATION : 0;
  }
  qqg(e) {
    if (this.Bqg !== e) {
      this.Bqg = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MotorFightActivity", 85, "[摩托战斗]ExpressState", ["state", e]);
      }
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e), this.SpriteExpress, false);
    }
  }
  Oqg() {
    this.EffectDouble.SetUIActive(false);
    this.EffectDouble.SetUIActive(true);
  }
}
exports.MotorcycleArrowScore = MotorcycleArrowScore;
//# sourceMappingURL=MotorcycleArrowScore.js.map