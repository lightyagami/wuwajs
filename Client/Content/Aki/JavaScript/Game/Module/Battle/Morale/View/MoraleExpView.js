"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleExpView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const FormationDataController_1 = require("../../../Abilities/FormationDataController");
const BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const UI_BAR_MIN_PERCENT = 0;
const UI_BAR_MAX_PERCENT = 0.3;
const PROGRESS_ANIM_DURATION = 1000;
const EXP_TEXT_STAY_DURATION = 2000;
class MoraleExpView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.TL1 = undefined;
    this.XN1 = undefined;
    this.RL1 = undefined;
    this.wL1 = undefined;
    this.AL1 = undefined;
    this.PL1 = undefined;
    this.s0u = undefined;
    this.Wft = 0;
    this.xL1 = 0;
    this.iki = 0;
    this.DL1 = 0;
    this.UL1 = 0;
    this.BL1 = true;
    this.WMt = false;
    this.UQ = 0;
    this.h0u = false;
    this.Tyu = true;
    this._2u = false;
    this.SPe = undefined;
    this.kL1 = undefined;
    this._cr = t => {
      if (t === "Close" && !ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive()) {
        this.SetVisible(1, false);
      }
    };
    this.OL1 = (i, s, e, h) => {
      if (this.GetVisible()) {
        if (h < e || s < i) {
          this.h0u = true;
        } else {
          let t = h - e;
          if (t !== 0) {
            if (h === this.UQ) {
              --t;
            } else if (e === this.UQ) {
              t += 1;
            }
          }
          var a = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleCurrentExpProgress();
          var _ = +t + a - this.xL1;
          this.UL1 = _ / PROGRESS_ANIM_DURATION;
          this.Wft = e;
          this.iki = h;
          this.DL1 = a;
          this.BL1 = this.UL1 >= 0;
          this.WMt = e < h && this.Tyu;
          var _ = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelUpExp(e);
          this.PL1?.SetText(i + " / " + _);
          var a = s - i;
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.AL1, "PrefabTextItem_147616326_Text", Math.abs(a));
          this.wL1?.SetUIActive(this.Tyu && this.UL1 !== 0);
          this.s0u?.SetUiActive(false);
        }
      }
    };
    this.Zpe = t => {
      if (this._2u) {
        this.GetTexture(8)?.SetUIActive(!t);
        this.TL1?.SetChangeColor(t, this.TL1.changeColor);
        this.RL1?.SetChangeColor(t, this.RL1.changeColor);
        this.GetTexture(9)?.SetChangeColor(t, this.GetTexture(9).changeColor);
        this.GetTexture(10)?.SetChangeColor(t, this.GetTexture(10).changeColor);
        this.GetTexture(11)?.SetChangeColor(t, this.GetTexture(11).changeColor);
        this.GetSprite(12)?.SetChangeColor(t, this.GetSprite(12).changeColor);
      }
    };
    this.d0u = () => {
      this.m0u();
    };
    this.byu = () => {
      if (this.h0u) {
        this.GL1();
        this.h0u = false;
      }
    };
    this.A5u = () => {
      this.h0u = true;
    };
    this.Ryu = () => {
      var t = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel();
      if (t > 1 && this.iki < t) {
        this.Tyu = false;
        this.OL1(0, 0, 1, t);
        this.Tyu = true;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIArtText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UITexture], [11, UE.UITexture], [12, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    var t = new MoraleAnimItem();
    var i = this.GetItem(6);
    if (i) {
      await t.CreateByActorAsync(i.GetOwner());
      this.s0u = t;
    }
  }
  OnStart() {
    this.TL1 = this.GetSprite(0);
    this.XN1 = this.GetSprite(1);
    this.RL1 = this.GetArtText(2);
    this.wL1 = this.GetItem(3);
    this.AL1 = this.GetText(4);
    this.PL1 = this.GetText(5);
    this.TL1?.SetFillAmount(0);
    this.XN1?.SetFillAmount(0);
    this.RL1?.SetText("1");
    this.wL1?.SetUIActive(false);
    this.XN1?.SetUIActive(false);
    this.s0u?.SetUiActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe?.BindSequenceCloseEvent(this._cr);
  }
  Initialize(t) {
    super.Initialize(t);
    this.InitChildType(4);
    this.SetVisible(1, false);
    this.Ore();
  }
  Reset() {
    this.kre();
    this.SPe?.Clear();
    this.h0u = false;
    this.s0u?.Clear();
    super.Reset();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleExpChanged, this.OL1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoralePromptShow, this.d0u);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoralePlayIndomitableLevelAnim, this.Ryu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoadingViewOnAfterShow, this.byu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleBattleFail, this.A5u);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleExpChanged, this.OL1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoralePromptShow, this.d0u);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoralePlayIndomitableLevelAnim, this.Ryu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoadingViewOnAfterShow, this.byu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleBattleFail, this.A5u);
  }
  StartShow() {
    this._2u = true;
    this.GL1();
    this.SetVisible(1, true);
    this.m0u();
    this.Zpe(FormationDataController_1.FormationDataController.GlobalIsInFight);
  }
  EndShow() {
    this._2u = false;
    this.f0u();
  }
  m0u() {
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequencePurely("Start");
    this.s0u?.PlayStartShowAnim();
    this.s0u?.SetUiActive(true);
  }
  f0u() {
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequencePurely("Close");
    this.s0u?.PlayEndShowAnim();
    this.s0u?.SetUiActive(true);
  }
  FL1() {
    if (this.SPe?.IsPlayingSequence("Up")) {
      this.SPe?.StopSequenceByKey("Up", false, true);
    }
    this.SPe?.PlaySequencePurely("Up");
  }
  Tick(i) {
    if (this.GetVisible() && this.UL1) {
      MoraleExpView.Ult.Start();
      var i = i * this.UL1;
      this.xL1 += i;
      let t = 0;
      if (this.Wft === this.iki) {
        t = this.DL1;
        if (this.BL1) {
          this.xL1 = Math.min(this.DL1, this.xL1);
        } else {
          this.xL1 = Math.max(this.DL1, this.xL1);
        }
        if (this.xL1 === this.DL1) {
          t = 0;
          this.UL1 = 0;
          this.qL1();
        }
      } else {
        if (this.BL1) {
          t = 1;
        }
        if (this.BL1 && this.xL1 > 1) {
          i = Math.floor(this.xL1);
          this.Wft = Math.min(this.UQ, Math.min(this.iki, this.Wft + i));
          this.RL1?.SetText(this.Wft.toString());
          this.FL1();
          if (this.Wft === this.iki) {
            if (this.Wft === this.UQ) {
              this.xL1 = 1;
              this.Reu();
            } else {
              this.xL1 = Math.min(this.DL1, this.xL1 - 1);
            }
          } else {
            this.xL1 -= i;
          }
        } else if (!this.BL1 && this.xL1 < 0) {
          i = Math.abs(Math.floor(this.xL1));
          this.Wft = Math.min(this.UQ, Math.max(this.iki, this.Wft - i));
          this.RL1?.SetText(this.Wft.toString());
          if (this.Wft === this.iki) {
            this.xL1 = Math.max(this.DL1, this.xL1 + 1);
          } else {
            this.xL1 += i;
          }
        } else if (!this.BL1 && this.Wft === this.UQ) {
          this.Wft = Math.max(this.iki, this.Wft - 1);
          this.RL1?.SetText(this.Wft.toString());
          this.Reu();
        }
      }
      i = MathUtils_1.MathUtils.RangeClamp(this.xL1, 0, 1, UI_BAR_MIN_PERCENT, UI_BAR_MAX_PERCENT);
      this.TL1?.SetFillAmount(i);
      if (t > 0 && this.BL1) {
        i = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, UI_BAR_MIN_PERCENT, UI_BAR_MAX_PERCENT);
        this.XN1?.SetFillAmount(i);
        this.XN1?.SetUIActive(true);
      } else {
        this.XN1?.SetUIActive(false);
      }
      i = this.Wft === this.UQ ? this.Wft - 1 : this.Wft;
      i = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelUpExp(i);
      this.PL1?.SetText(Math.floor(i * this.xL1) + " / " + i);
      MoraleExpView.Ult.Stop();
    }
  }
  GL1() {
    let t = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel();
    let i = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleCurrentExpProgress();
    var s = this.h0u && ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel() > 1;
    if (s) {
      t = 1;
      i = 0;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[MoraleExpView]士气值界面更新", ["level", t], ["expProgress", i], ["needPlayIndomitableLevelAnim", s]);
    }
    this.Wft = t;
    this.iki = t;
    this.RL1?.SetText(t.toString());
    this.xL1 = i;
    var s = MathUtils_1.MathUtils.RangeClamp(i, 0, 1, UI_BAR_MIN_PERCENT, UI_BAR_MAX_PERCENT);
    this.TL1?.SetFillAmount(s);
    this.XN1?.SetUIActive(false);
    this.UQ = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleMaxLevel();
    this.Reu();
  }
  qL1() {
    if (this.kL1) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.kL1);
    }
    this.kL1 = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (this.WMt) {
        this.s0u?.PlayLevelUpAnim();
        this.s0u?.SetUiActive(true);
      }
      this.wL1?.SetUIActive(false);
      this.kL1 = undefined;
    }, EXP_TEXT_STAY_DURATION);
  }
  Reu() {
    if (this.Wft === this.UQ) {
      this.GetItem(7)?.SetUIActive(true);
    } else {
      this.GetItem(7)?.SetUIActive(false);
    }
  }
}
(exports.MoraleExpView = MoraleExpView).Ult = Stats_1.Stat.Create("[BattleView]MoraleExpView");
class MoraleAnimItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this._cr = t => {
      this.SetUiActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe?.BindSequenceCloseEvent(this._cr);
  }
  Clear() {
    this.SPe?.Clear();
  }
  PlayStartShowAnim() {
    this.SPe?.StopCurrentSequence(false, true);
    this.SPe?.PlaySequencePurely("Start");
    this.SetUiActive(true);
    this.qti(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Morale_title_41");
  }
  PlayEndShowAnim() {
    this.SPe?.StopCurrentSequence(false, true);
    this.SPe?.PlaySequencePurely("StartR");
    this.qti(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Morale_title_42");
  }
  PlayLevelUpAnim() {
    this.SPe?.StopCurrentSequence(false, true);
    this.SPe?.PlayLevelSequenceByName("Start");
    this.qti(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Morale_title_40");
  }
  SetText(t) {
    this.GetText(2)?.SetText(t);
  }
  qti(t) {
    this.GetTexture(0)?.SetUIActive(t);
  }
}
//# sourceMappingURL=MoraleExpView.js.map