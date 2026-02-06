"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedDollView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const LevelGeneralCommons_1 = require("../LevelGeneralCommons");
const LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
const BigStuffedDefine_1 = require("./BigStuffedDefine");
const BigStuffedDollChallengeFailItem_1 = require("./View/BigStuffedDollChallengeFailItem");
const BigStuffedDollChallengeSuccessItem_1 = require("./View/BigStuffedDollChallengeSuccessItem");
const BigStuffedDollProgressItem_1 = require("./View/BigStuffedDollProgressItem");
const BigStuffedDollTipItem_1 = require("./View/BigStuffedDollTipItem");
const BigStuffedRingItem_1 = require("./View/BigStuffedRingItem");
const GameCountDownItem_1 = require("./View/GameCountDownItem");
const PrepareCountDownItem_1 = require("./View/PrepareCountDownItem");
const BONUS_TIME_TIPSTAYTIME = 3000;
const COUNTDOWNSTART = "CountDownStart";
const COUNTDOWNOVER = "CountDownOver";
const GAMEOVER = "GameOver";
const PRESS_FAIL_COUNT = "PressFailCount";
const PRESS_COMMONAREA_SUCCESS_COUNT = "PressCommonAreaSuccessCount";
const PRESS_PERFECTAREA_SUCCESS_COUNT = "PressPerfectAreaSuccessCount";
const PRESS_BONUSAREA_SUCCESS_COUNT = "PressBonusAreaSuccessCount";
const FINISH_SKILL_OVER = "FinishSkillOver";
const DELAY_FINISH_TIME = "DelayFinishTime";
const QTE_ROCK_DESTORY_EVENT = "BrokenRockEventKey6";
class BigStuffedDollView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lfl = new Map();
    this.hfl = new BigStuffedDollProgressItem_1.BigStuffedDollProgressItem();
    this._fl = new PrepareCountDownItem_1.PrepareCountDownItem();
    this.ufl = new GameCountDownItem_1.GameCountDownItem();
    this.wOi = new BigStuffedDollTipItem_1.BigStuffedDollTipItem();
    this.cfl = new BigStuffedDollChallengeSuccessItem_1.BigStuffedDollChallengeSuccessItem();
    this.mfl = new BigStuffedDollChallengeFailItem_1.BigStuffedDollChallengeFailItem();
    this.dfl = 0;
    this.Cfl = false;
    this._Dl = undefined;
    this.uDl = undefined;
    this.cDl = undefined;
    this.mDl = undefined;
    this.E0 = -1;
    this.dDl = 0;
    this.CDl = 0;
    this.gDl = 0;
    this.HDe = undefined;
    this.I6l = false;
    this.gfl = e => {
      var t = ModelManager_1.ModelManager.BigStuffedDollModel;
      var i = ModelManager_1.ModelManager.SceneTeamModel;
      var s = i.GetCurrentEntity;
      if (i.IsPhantomTeam && i.IsTeamReady && s && s.Entity) {
        this.E0 = s.Entity.Id;
      }
      switch (e) {
        case 1:
          this.GetButton(1)?.SetSelfInteractive(false);
          this.GetButton(8)?.SetSelfInteractive(false);
          ControllerHolder_1.ControllerHolder.BigStuffedDollController.SetBooleanValueThenSendEvent(this.E0, COUNTDOWNSTART, true);
          this._fl.StartCountDown();
          this.wOi.ShowTips("TeddyBear_Intro", BONUS_TIME_TIPSTAYTIME);
          for (var [, r] of this.lfl) {
            r.OnArrowExit();
          }
          t.ArrowEnterNextValidArea();
          break;
        case 2:
          if (t.LastGameStage !== 100) {
            this._fl.Hide();
            var a = t.GetGlobalTime();
            this.ufl.StartCountDown(a);
            this.GetButton(8)?.SetSelfInteractive(true);
            this.GetButton(1)?.SetSelfInteractive(true);
            if (this.E0 !== -1) {
              ControllerHolder_1.ControllerHolder.BigStuffedDollController.SetBooleanValueThenSendEvent(this.E0, COUNTDOWNOVER, true);
              a = s.Entity.GetComponent(43);
              if (!a) {
                break;
              }
              a.BeginSkill(t.Config.NormalSkill);
            }
          }
          break;
        case 3:
          this.GetButton(1)?.SetSelfInteractive(false);
          this.WGn(t.GameResult);
          break;
        case 4:
          break;
        case 5:
          this.CloseMe();
      }
    };
    this.cJl = e => {
      if (e === ModelManager_1.ModelManager.BigStuffedDollModel.BehaviorTreeConfigId) {
        this.uJl();
      }
    };
    this.pfl = (e, t, i) => {
      for (var [, s] of this.lfl) {
        if (e !== t && (s.Id === e && s.OnArrowExit(), s.Id === t)) {
          s.OnArrowEnter();
        }
        s.OnArrowStayAreaUpdate(i);
      }
    };
    this.nwl = (e, t, i) => {
      var s = this.lfl.get(e);
      if (s) {
        var r = s.Config;
        if (r) {
          var a = ModelManager_1.ModelManager.BigStuffedDollModel;
          switch (t) {
            case 0:
              this.hfl.AddScore(-a.GetScoreDown());
              this.gDl++;
              ControllerHolder_1.ControllerHolder.BigStuffedDollController.SetIntValueThenSendEvent(this.E0, PRESS_FAIL_COUNT, this.gDl);
              break;
            case 1:
              this.hfl.AddScore(r.GoodScore);
              a.ArrowEnterNextValidArea();
              s.SpawnContinuousArea(i);
              this.dDl++;
              ControllerHolder_1.ControllerHolder.BigStuffedDollController.SetIntValueThenSendEvent(this.E0, PRESS_COMMONAREA_SUCCESS_COUNT, this.dDl);
              break;
            case 2:
              this.hfl.AddScore(r.PerfectScore);
              a.ArrowEnterNextValidArea();
              s.SpawnContinuousArea(i);
              this.dDl++;
              ControllerHolder_1.ControllerHolder.BigStuffedDollController.SetIntValueThenSendEvent(this.E0, PRESS_PERFECTAREA_SUCCESS_COUNT, this.dDl);
              break;
            case 3:
              this.hfl.AddScore(r.BonusScore);
              this.CDl++;
              ControllerHolder_1.ControllerHolder.BigStuffedDollController.SetIntValueThenSendEvent(this.E0, PRESS_BONUSAREA_SUCCESS_COUNT, this.CDl);
              this.Dfl();
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]RingItemAreaClick:找不到当前的RingConfig", ["ringId", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]RingItemAreaClick:找不到当前的RingItem", ["ringId", e]);
      }
    };
    this._5e = () => {
      const e = ModelManager_1.ModelManager.BigStuffedDollModel;
      e.SetGameStage(100);
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(232);
      t.FunctionMap.set(2, this.wAl);
      t.SetCloseFunction(() => {
        e.SetGameStage(e.LastGameStage);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.wAl = () => {
      ModelManager_1.ModelManager.BigStuffedDollModel.GameResult = false;
      ModelManager_1.ModelManager.BigStuffedDollModel.SetGameStage(3);
    };
    this.fDl = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 18, "[BigStuffedDoll]QteButton Click");
      }
      var e;
      var t;
      var i = ModelManager_1.ModelManager.BigStuffedDollModel.GameInfo;
      var s = i.CurrentArrowStayRingId;
      var s = i.GetRingInfo(s);
      if (s) {
        e = i.CurrentArrowStayCellIndex;
        if (t = this.lTl(s.GetBonusAreas(), e)) {
          this.Ufl(3, t);
        } else if (t = this.lTl(s.GetPerfectAreas(), e)) {
          this.Ufl(2, t);
        } else if (t = this.lTl(s.GetGoodAreas(), e)) {
          this.Ufl(1, t);
        } else {
          this.Ufl(0, undefined);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]QteButtonClick:找不到当前所在的圆环", ["ringId", i.CurrentArrowStayRingId]);
      }
    };
    this.vDl = () => {
      this.MDl(0);
    };
    this.SDl = () => {
      this.MDl(1);
    };
    this.yDl = e => {
      switch (e) {
        case "Start":
        case "Press":
          this.cDl.PlayLevelSequenceByName("Loop");
      }
    };
    this.EDl = e => {
      switch (e) {
        case "Start":
        case "Press":
          this.mDl.PlayLevelSequenceByName("Loop");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this._5e], [3, this.vDl], [4, this.SDl], [8, this.fDl]];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.BigStuffedDollModel.Config;
    if (e) {
      this.GetButton(8)?.RootUIComp.SetUIActive(true);
      this._Dl = this.GetButton(3);
      this.cDl = new LevelSequencePlayer_1.LevelSequencePlayer(this._Dl.RootUIComp);
      this.cDl.BindSequenceCloseEvent(this.yDl);
      this._Dl.RootUIComp.SetUIActive(false);
      this.uDl = this.GetButton(4);
      this.mDl = new LevelSequencePlayer_1.LevelSequencePlayer(this.uDl.RootUIComp);
      this.mDl.BindSequenceCloseEvent(this.EDl);
      this.uDl.RootUIComp.SetUIActive(false);
      await this.Sfl(e);
      await this.yfl(e);
      await this.Efl();
      await this.Ifl();
      await this.Tfl();
      await this.Lfl();
      await this.Rfl();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]找不到玩法配置");
    }
  }
  OnStart() {
    super.OnStart();
  }
  OnAfterShow() {
    super.OnAfterShow();
    ModelManager_1.ModelManager.BigStuffedDollModel.EnterNextGameStage();
  }
  OnBeforeDestroy() {
    this.cDl?.Clear();
    this.cDl = undefined;
    this.mDl?.Clear();
    this.mDl = undefined;
    this._Dl = undefined;
    this.uDl = undefined;
    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(this.E0, COUNTDOWNSTART);
    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(this.E0, COUNTDOWNOVER);
    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(this.E0, GAMEOVER);
    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(this.E0, PRESS_FAIL_COUNT);
    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(this.E0, PRESS_COMMONAREA_SUCCESS_COUNT);
    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(this.E0, PRESS_PERFECTAREA_SUCCESS_COUNT);
    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(this.E0, PRESS_BONUSAREA_SUCCESS_COUNT);
    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(this.E0, FINISH_SKILL_OVER);
    var e = EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(43);
    if (e) {
      e.EndSkill(ModelManager_1.ModelManager.BigStuffedDollModel.Config.NormalSkill, "BigStuffedDollView.OnBeforeDestroy");
    }
  }
  OnAfterDestroy() {
    if (this.HDe) {
      this.HDe();
    }
  }
  OnTick(e) {
    this.hfl.OnTick(e);
    this.ufl.OnTick(e);
    for (var [, t] of this.lfl) {
      t.OnTick(e);
      t = t.GetCurrentArrowStayCellIndex();
      if (t) {
        ModelManager_1.ModelManager.BigStuffedDollModel.GameInfo.CurrentArrowStayCellIndex = t;
      }
    }
    var i = ModelManager_1.ModelManager.BlackboardModel.GetBooleanValueByEntity(this.E0, FINISH_SKILL_OVER);
    var s = ModelManager_1.ModelManager.BigStuffedDollModel.GetGameStage();
    if (i && s === 4 && !this.I6l) {
      LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(ModelManager_1.ModelManager.BigStuffedDollModel.BrokenRockEntityPbDataId, 1001667892, "大个布偶坚固岩石玩法：终结一拳播放完毕");
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(ModelManager_1.ModelManager.BigStuffedDollModel.BrokenRockEntityCreatureDataId, QTE_ROCK_DESTORY_EVENT);
      i = ModelManager_1.ModelManager.BlackboardModel.GetFloatValueByEntity(this.E0, DELAY_FINISH_TIME) ?? TimerSystem_1.MIN_TIME / 1000;
      TimerSystem_1.TimerSystem.Delay(() => {
        this.cfl.ShowTip();
      }, i * 1000);
      this.I6l = true;
    }
  }
  async Sfl(i) {
    this.lfl.clear();
    if (i.Rings.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]玩法配置的环数量为0");
      }
    } else {
      var s = this.GetItem(6);
      var r = this.GetItem(5);
      var a = [];
      for (let t = 0; t < i.Rings.length; t++) {
        let e = s;
        if (t !== 0) {
          e = LguiUtil_1.LguiUtil.CopyItem(s, r);
        }
        var o = i.Rings[t];
        var n = new BigStuffedRingItem_1.BigStuffedRingItem(o, e.GetOwner());
        this.lfl.set(o, n);
        a.push(n);
      }
      await Promise.all([...a.map(async e => e.InitAsync())]);
    }
  }
  async yfl(e) {
    var t = this.GetItem(2);
    await this.hfl.CreateThenShowByActorAsync(t.GetOwner());
    this.hfl.Init(e);
  }
  async Efl() {
    await this._fl.CreateByResourceIdAsync("UiView_PrepareCountdownFloatTips_Prefab", this.RootItem);
    await this._fl.HideAsync();
  }
  async Ifl() {
    await this.ufl.CreateByResourceIdAsync("UiView_CountDown_Prefab", this.RootItem);
    await this.ufl.HideAsync();
  }
  async Lfl() {
    await this.cfl.CreateByResourceIdAsync("UiView_Challenge_Success_Prefab", this.RootItem);
    await this.cfl.HideAsync();
  }
  async Rfl() {
    await this.mfl.CreateByResourceIdAsync("UiView_Challenge_Failed_Prefab", this.RootItem);
    await this.mfl.HideAsync();
  }
  async Tfl() {
    var e = this.GetItem(7);
    await this.wOi.CreateByActorAsync(e.GetOwner());
    await this.wOi.HideAsync();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBigStuffedDollGameStageUpdate, this.gfl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBigStuffedDollArrowStayAreaUpdate, this.pfl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBigStuffedDollRingItemSequencePlayStart, this.nwl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBigStuffedDollGameStageUpdate, this.gfl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBigStuffedDollArrowStayAreaUpdate, this.pfl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBigStuffedDollRingItemSequencePlayStart, this.nwl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreePrepareRollbackFinish, this.cJl);
  }
  async WGn(e) {
    if (e) {
      this.HDe = this.OpenParam;
      this.GetItem(0)?.SetUIActive(false);
      ControllerHolder_1.ControllerHolder.BigStuffedDollController.SetBooleanValueThenSendEvent(this.E0, GAMEOVER, true);
      EntitySystem_1.EntitySystem.Get(this.E0)?.GetComponent(43)?.BeginSkill(ModelManager_1.ModelManager.BigStuffedDollModel.Config.FinishSkill);
      this.ufl.Hide(() => {
        ModelManager_1.ModelManager.BigStuffedDollModel.EnterNextGameStage();
      });
    } else {
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(16, 3);
      ControllerHolder_1.ControllerHolder.BigStuffedDollController.SetBooleanValueThenSendEvent(this.E0, GAMEOVER, true);
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(ModelManager_1.ModelManager.BigStuffedDollModel.BrokenRockEntityCreatureDataId, "DboQTEFailed");
      this.GetItem(0)?.SetUIActive(false);
      await this.ufl.HideAsync();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreePrepareRollbackFinish, this.cJl);
    }
  }
  async uJl() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(16, 3);
    this.mfl.ShowTip("Text_RoleChallengeFail_Text");
  }
  Dfl() {
    this.Cfl = true;
    this.wOi.ShowTips("TeddyBear_Bonus", BONUS_TIME_TIPSTAYTIME);
    this.GetItem(5)?.SetUIActive(false);
    this.GetButton(8)?.RootUIComp.SetUIActive(false);
    this._Dl?.RootUIComp.SetUIActive(true);
    this.cDl?.PlayLevelSequenceByName("Start");
    this.uDl?.RootUIComp.SetUIActive(true);
    this.mDl?.PlayLevelSequenceByName("Start");
  }
  MDl(e) {
    if (this.Cfl) {
      var t = ModelManager_1.ModelManager.BigStuffedDollModel.GameInfo.CurrentArrowStayRingId;
      var t = this.lfl.get(t)?.Config;
      if (t) {
        this.hfl.AddScore(t.BonusScore);
      }
      switch (e) {
        case 0:
          this.cDl?.StopCurrentSequence(false, true);
          this.cDl?.PlayLevelSequenceByName("Press");
          break;
        case 1:
          this.mDl?.StopCurrentSequence(false, true);
          this.mDl?.PlayLevelSequenceByName("Press");
      }
    }
  }
  lTl(e, t) {
    for (var [, i] of e) {
      var s = i.StartCellIndex;
      var r = i.EndCellIndex;
      if (s <= r) {
        if (s <= t && t <= r) {
          return i;
        }
      } else if (s <= t && t <= BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT || t >= 1 && t <= r) {
        return i;
      }
    }
  }
  Ufl(e, t) {
    var i = ModelManager_1.ModelManager.BigStuffedDollModel.GameInfo;
    var s = i.CurrentArrowStayRingId;
    var s = this.lfl.get(s);
    if (s) {
      var r = s.Config;
      if (r) {
        var a = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
        if (!(a - this.dfl <= r.ColdTime)) {
          this.dfl = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
          const o = this.GetButton(8);
          o?.SetSelfInteractive(false);
          TimerSystem_1.TimerSystem.Delay(() => {
            o?.SetSelfInteractive(true);
          }, r.ColdTime);
          s.OnAreaClick(e, t);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]OnAreaClick:找不到当前的RingConfig", ["ringId", i.CurrentArrowStayRingId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]OnAreaClick:找不到当前的RingItem", ["ringId", i.CurrentArrowStayRingId]);
    }
  }
}
exports.BigStuffedDollView = BigStuffedDollView;
//# sourceMappingURL=BigStuffedDollView.js.map