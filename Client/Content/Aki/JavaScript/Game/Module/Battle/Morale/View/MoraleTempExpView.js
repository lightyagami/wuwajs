"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleTempExpView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const EXP_UNIT_COUNT = 10;
const EXP_PROGRESS_STEP = 1 / EXP_UNIT_COUNT;
const EXP_UNIT_TWEEN_INTERVAL = 20;
const CROSS_LEVEL_DIFF = 3;
class MoraleTempExpView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.RL1 = undefined;
    this.jH1 = undefined;
    this.HH1 = undefined;
    this.Agu = undefined;
    this.$H1 = [];
    this.SPe = undefined;
    this.Wft = 1;
    this.iki = 1;
    this.UQ = 1;
    this.DL1 = 0;
    this.BL1 = true;
    this.WH1 = -1;
    this.QH1 = undefined;
    this.U0n = 0;
    this.Pgu = false;
    this.xgu = EXP_UNIT_TWEEN_INTERVAL;
    this.mRu = CROSS_LEVEL_DIFF;
    this.KH1 = (i, s, e, h) => {
      if (this.GetVisible() && (i !== s || e !== h)) {
        var r;
        var a = ModelManager_1.ModelManager.MoraleBattleModel;
        if (h === e) {
          this.BL1 = i < s;
        } else {
          this.BL1 = e < h;
          this.UQ = a.GetTempMoraleMaxLevel();
        }
        if (this.BL1) {
          let t = false;
          if (this.U0n !== 2 && h - e >= this.mRu) {
            t = true;
          }
          if (this.U0n !== 0 || t) {
            if (this.U0n === 2 || t) {
              this.DL1 = a.GetTempMoraleExpProgress();
              this.Wft = h;
              this.iki = h;
              if (t) {
                this.Ugu();
              }
            } else if (this.U0n === 1) {
              this.DL1 = a.GetTempMoraleExpProgress();
              this.iki = h;
            } else if (this.U0n === 4 || this.U0n === 3) {
              this.DL1 = a.GetTempMoraleExpProgress();
              this.iki = h;
              this.Pgu = true;
            }
          } else {
            s = a.GetTempLevelExpRange(e);
            r = a.GetTempMoraleLevelUpExp(e);
            i = (i - s[0]) / r;
            this.DL1 = a.GetTempMoraleExpProgress();
            this.Wft = e;
            this.iki = h;
            this.HW1(e);
            this.XH1(i);
            this.YH1(true);
          }
        } else {
          this.DL1 = a.GetTempMoraleExpProgress();
          this.Wft = h;
          this.iki = h;
          this.XH1(this.DL1, 3);
          this.HW1(h);
          if (e === h) {
            this.kyu();
          } else {
            this.Dgu();
          }
        }
      }
    };
    this.$xt = t => {
      if (t === "YJ" && this.U0n === 2) {
        this.U0n = 0;
        this.FL1();
        this.XH1(this.DL1);
        this.HW1(this.iki);
        this.Agu?.SetUIActive(false);
        if (this.iki === this.UQ) {
          this.Bgu();
        }
      } else if ((t === "Decline" && this.U0n === 4 || t === "Decline01" && this.U0n === 3) && (this.U0n = 0, this.Pgu)) {
        this.YH1();
        this.Pgu = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnCreateAsync() {
    var i = [];
    for (let t = 0; t < EXP_UNIT_COUNT; t++) {
      i.push(this.zH1());
    }
    await Promise.all(i);
  }
  OnStart() {
    super.OnStart();
    this.InitChildType(11);
    this.Ore();
    this.UQ = ModelManager_1.ModelManager.MoraleBattleModel.GetTempMoraleMaxLevel();
    this.xgu = Math.max(EXP_UNIT_TWEEN_INTERVAL, CommonParamById_1.configCommonParamById.GetIntConfig("MoraleTempExpUnitInterval") ?? EXP_UNIT_TWEEN_INTERVAL);
    this.mRu = CommonParamById_1.configCommonParamById.GetIntConfig("MoraleTempExpCrossLevel") ?? CROSS_LEVEL_DIFF;
    this.RL1 = this.GetArtText(0);
    this.jH1 = this.GetItem(2);
    this.HH1 = this.GetSprite(1);
    this.HH1?.SetUIActive(false);
    this.GetItem(3)?.SetUIActive(false);
    this.Agu = this.GetItem(4);
    this.Agu?.SetUIActive(false);
    var i = new Rotator_1.Rotator(0, 180, 0);
    for (let t = 0; t < this.$H1.length; t++) {
      var s = this.$H1[t];
      s.SetIndex(t);
      if (t % 2 == 1) {
        s.GetRootItem().SetUIRelativeRotation(i.ToUeRotator());
      }
      s.GetRootItem().SetUIParent(this.jH1);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.$xt);
  }
  OnBeforeDestroy() {
    for (const t of this.$H1) {
      t.Clean();
    }
    this.$H1.length = 0;
    super.OnBeforeDestroy();
  }
  Reset() {
    this.kre();
    super.Reset();
  }
  async zH1() {
    var t = new MoraleTempExpUnit();
    this.$H1.push(t);
    await t.CreateByResourceIdAsync("UiItem_MoraleFightBarArrow");
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleTempExpChanged, this.KH1);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleTempExpChanged, this.KH1);
  }
  OnShowBattleChildView() {
    this.GL1();
  }
  OnHideBattleChildView() {
    this.kgu();
    this.U0n = 0;
  }
  GL1() {
    var t = ModelManager_1.ModelManager.MoraleBattleModel;
    this.Wft = t.GetTempMoraleLevel();
    this.iki = this.Wft;
    this.DL1 = t.GetTempMoraleExpProgress();
    this.UQ = t.GetTempMoraleMaxLevel();
    this.XH1(this.DL1);
    this.HW1(this.iki);
    var t = this.iki === this.UQ;
    this.Agu?.SetUIActive(t);
    this.HH1?.SetUIActive(t);
  }
  HW1(t) {
    t = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel() + t;
    this.RL1?.SetText(t.toString());
  }
  FL1() {
    this.SPe?.PlaySequencePurely("Up");
  }
  Ugu() {
    this.kgu();
    this.SPe?.PlaySequencePurely("YJ");
    this.Agu?.SetUIActive(true);
    this.U0n = 2;
  }
  kyu() {
    this.kgu();
    this.SPe?.PlaySequencePurely("Decline01");
    this.jH1?.SetUIActive(true);
    this.Agu?.SetUIActive(false);
    this.HH1?.SetUIActive(false);
    this.U0n = 3;
  }
  Dgu() {
    this.kgu();
    this.SPe?.PlaySequencePurely("Decline");
    this.jH1?.SetUIActive(true);
    this.Agu?.SetUIActive(false);
    this.HH1?.SetUIActive(false);
    this.U0n = 4;
  }
  Bgu() {
    this.kgu();
    this.SPe?.PlaySequencePurely("MaxStart");
    this.Agu?.SetUIActive(true);
    this.HH1?.SetUIActive(true);
    this.U0n = 5;
  }
  kgu() {
    switch (this.U0n) {
      case 2:
        if (this.SPe?.IsPlayingSequence("YJ")) {
          this.SPe?.StopSequenceByKey("YJ", false, true);
        }
        break;
      case 3:
        if (this.SPe?.IsPlayingSequence("Decline01")) {
          this.SPe?.StopSequenceByKey("Decline01", false, true);
        }
        break;
      case 4:
        if (this.SPe?.IsPlayingSequence("Decline")) {
          this.SPe?.StopSequenceByKey("Decline", false, true);
        }
        break;
      case 5:
        if (this.SPe?.IsPlayingSequence("MaxStart")) {
          this.SPe?.StopSequenceByKey("MaxStart", false, true);
        }
        this.RootActor?.StopSequenceByKey("MaxLoop");
    }
  }
  XH1(t, i) {
    this.WH1 = -1;
    for (const s of this.$H1) {
      s.Reset();
      if (s.IsShowUnit(t)) {
        this.WH1 = s.Index;
        s.ShowUnit();
        if (i) {
          s.PlayTweenAnim(i);
        }
      } else {
        s.HideUnit();
      }
    }
  }
  YH1(i = false) {
    let s = this.BL1 ? this.WH1 + 1 : this.WH1 - 1;
    if (i && !this.BL1) {
      s += 1;
    }
    if (s >= EXP_UNIT_COUNT) {
      if (this.Wft !== this.iki) {
        this.Wft += 1;
        this.HW1(this.Wft);
        this.XH1(0);
        this.FL1();
        if (this.Wft === this.UQ) {
          this.Bgu();
        } else {
          this.YH1();
        }
      } else if (this.Wft === this.UQ - 1 && this.DL1 === 1) {
        this.Bgu();
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MoraleTempExpView]进度动画播放有问题");
        }
        this.U0n = 0;
      }
    } else if (s < 0) {
      if (this.Wft !== this.iki) {
        --this.Wft;
        this.HW1(this.Wft);
        this.XH1(1);
        this.YH1(true);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MoraleTempExpView]进度动画播放有问题");
        }
        this.U0n = 0;
      }
    } else {
      i = this.$H1[s];
      let t = this.DL1;
      if (this.Wft < this.iki) {
        t = 1;
      } else if (this.Wft > this.iki) {
        t = 0;
      }
      if (this.BL1) {
        if (i.IsShowUnit(t)) {
          this.WH1 = s;
          i.ShowUnit();
          i.PlayTweenIn();
          this.JH1();
          this.U0n = 1;
        } else {
          this.U0n = 0;
        }
      } else if (i.IsHideUnit(t)) {
        this.WH1 = s;
        i.HideUnit();
        this.JH1();
      }
    }
  }
  JH1() {
    this.Ogu();
    this.QH1 = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.QH1 = undefined;
      this.YH1();
    }, Math.max(TimerSystem_1.MIN_TIME, this.xgu));
  }
  Ogu() {
    if (this.QH1) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.QH1);
    }
    this.QH1 = undefined;
  }
  ShowBattleVisibleChildView() {
    super.ShowBattleVisibleChildView();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleTempExpViewVisibleChanged, true);
  }
  HideBattleVisibleChildView() {
    super.HideBattleVisibleChildView();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleTempExpViewVisibleChanged, false);
  }
}
exports.MoraleTempExpView = MoraleTempExpView;
class MoraleTempExpUnit extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ZH1 = undefined;
    this.e$1 = undefined;
    this.qgu = undefined;
    this.$W1 = undefined;
    this.Index = 0;
    this.cvl = 0;
    this.t$1 = false;
    this.i$1 = false;
    this.Ggu = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.SetUiActive(false);
    var i = this.GetItem(1)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (i) {
      for (let t = 0; t < i?.Num(); t++) {
        var s = i.Get(t);
        this.ZH1 ||= [];
        this.ZH1.push(s);
      }
    }
    var e = this.GetItem(2)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (e) {
      for (let t = 0; t < e?.Num(); t++) {
        var h = e.Get(t);
        this.e$1 ||= [];
        this.e$1.push(h);
      }
    }
    var r = this.GetItem(4)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (r) {
      for (let t = 0; t < r?.Num(); t++) {
        var a = r.Get(t);
        this.qgu ||= [];
        this.qgu.push(a);
      }
    }
    this.$W1 = this.GetSprite(0);
  }
  Clean() {
    this.ZH1 = undefined;
    this.e$1 = undefined;
  }
  SetIndex(t) {
    this.Index = t;
    this.cvl = t * EXP_PROGRESS_STEP;
  }
  IsShowUnit(t) {
    return t > this.cvl;
  }
  IsHideUnit(t) {
    return t <= this.cvl;
  }
  Reset() {
    if (this.i$1) {
      this.StopTweenOut();
      this.$W1?.SetAlpha(1);
    }
    this.Ggu;
    this.t$1 = false;
    this.i$1 = false;
    this.Ggu = false;
  }
  ShowUnit() {
    this.SetUiActive(true);
  }
  HideUnit(t = 0) {
    this.SetUiActive(false);
  }
  PlayTweenIn() {
    if (this.ZH1 && !this.t$1) {
      this.t$1 = true;
      for (const t of this.ZH1) {
        t.Play();
      }
    }
  }
  PlayTweenOut() {
    if (this.e$1 && !this.i$1) {
      this.i$1 = true;
      for (const t of this.e$1) {
        t.Play();
      }
    }
  }
  PlayTweenRed() {
    if (this.qgu) {
      this.Ggu = true;
      for (const t of this.qgu) {
        t.Play();
      }
    }
  }
  StopTweenOut() {
    if (this.e$1 && this.i$1) {
      this.i$1 = false;
      for (const t of this.e$1) {
        t.Stop();
      }
    }
  }
  PlayTweenAnim(t) {
    switch (t) {
      case 0:
        this.PlayTweenIn();
        break;
      case 1:
        this.PlayTweenOut();
        break;
      case 3:
        this.PlayTweenRed();
    }
  }
}
//# sourceMappingURL=MoraleTempExpView.js.map