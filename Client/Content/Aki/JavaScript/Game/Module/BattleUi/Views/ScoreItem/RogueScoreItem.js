"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueScoreItem = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const CurveUtils_1 = require("../../../../../Core/Utils/Curve/CurveUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const RogueScoreMachine_1 = require("../../../HudUnit/HudUnit/RogueScoreMachine");
const BaseScoreItem_1 = require("./BaseScoreItem");
const filledAmount = new UE.FName("FilledAmount");
const fillColor = new UE.FName("FillColor");
const flowColorA = new UE.FName("FlowColorA");
const flowColorB = new UE.FName("FlowColorB");
const globalInt = new UE.FName("GlobalInt");
const rgbSplitProgress = new UE.FName("RGBSplit_Progress");
const UP_ANIM_TIME = 600;
const HALF_UP_ANIM_TIME = 0;
const UP_EFFECT_TIME = 100;
const scoreTexturePathList = ["/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreD.T_FightScoreD", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreC.T_FightScoreC", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreB.T_FightScoreB", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreA.T_FightScoreA", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreS.T_FightScoreS", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreSS.T_FightScoreSS"];
const scoreBgTexturePathList = ["/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgD.T_FightScoreBgD", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgC.T_FightScoreBgC", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgB.T_FightScoreBgB", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgA.T_FightScoreBgA", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgS.T_FightScoreBgS", "/Game/Aki/UI/UIResources/UiFight/Image/T_FightScoreBgSS.T_FightScoreBgSS"];
const fillColorList = [new UE.LinearColor(0.0118, 0.2588, 1, 0.5255), new UE.LinearColor(0.0118, 0.2588, 1, 0.5255), new UE.LinearColor(1, 0.2588, 0.5961, 0.5255), new UE.LinearColor(1, 0.2588, 0.5961, 0.5255), new UE.LinearColor(1, 0.5725, 0.1098, 0.651), new UE.LinearColor(1, 0.5725, 0.1098, 0.651)];
const flowColorListA = [new UE.LinearColor(0.451, 0.5922, 0.949, 1), new UE.LinearColor(0.451, 0.5922, 0.949, 1), new UE.LinearColor(1, 0.2824, 0.7098, 1), new UE.LinearColor(1, 0.2824, 0.7098, 1), new UE.LinearColor(1, 0.8588, 0.7451, 1), new UE.LinearColor(1, 0.8588, 0.7451, 1)];
const flowColorListB = [new UE.LinearColor(0.5686, 0.6196, 0.702, 0.0941), new UE.LinearColor(0.5686, 0.6196, 0.702, 0.0941), new UE.LinearColor(0.7255, 0.5451, 0.5451, 0.0941), new UE.LinearColor(0.7255, 0.5451, 0.5451, 0.0941), new UE.LinearColor(0.7255, 0.6471, 0.1882, 0.0941), new UE.LinearColor(0.7255, 0.6471, 0.1882, 0.0941)];
const scoreNiagaraPathList = ["/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_CD.NS_Fx_LGUI_Rouge_CD", "/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_AB.NS_Fx_LGUI_Rouge_AB", "/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_S.NS_Fx_LGUI_Rouge_S", "/Game/Aki/Effect/UI/Niagaras/RouGe/PingFen/NS_Fx_LGUI_Rouge_S02.NS_Fx_LGUI_Rouge_S02"];
const SHADER_PATH = "/Game/Aki/Render/Shaders/UI/MPC_RGBSplitGlitch_FightScore.MPC_RGBSplitGlitch_FightScore";
const scoreNiagaraIndexList = [0, 0, 1, 1, 2, 3];
const sequenceNameList = ["StartD", "StartC", "StartB", "StartA", "StartS", "StartSS"];
const musicStateList = ["none", "d", "c", "b", "a", "s", "ss"];
class RogueScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments);
    this.IIn = 0;
    this.EBn = 0;
    this.SBn = undefined;
    this.yBn = undefined;
    this.Exl = undefined;
    this.IBn = undefined;
    this.TBn = undefined;
    this.RIn = new RogueScoreMachine_1.RogueScoreMachine();
    this.SPe = undefined;
    this.UIn = undefined;
    this.AIn = undefined;
    this.PIn = undefined;
    this.xIn = undefined;
    this.wIn = undefined;
    this.BIn = -1;
    this.XIt = [];
    this.bIn = -1;
    this.qIn = [];
    this.GIn = [];
    this.NIn = [];
    this.OIn = false;
    this.kIn = false;
    this.FIn = CurveUtils_1.CurveUtils.DefaultPara;
    this.VIn = 0;
    this.Cnt = undefined;
    this.zRn = -1;
    this.eUl = false;
    this.tUl = new UE.Vector2D(0, 0);
    this.HIn = (t, i) => {
      var e;
      if (this.IIn !== t && (this.IIn = t, this.Exl !== i && (s = this.Exl?.Level ?? 0, e = this.Exl !== undefined, this.Exl = i, this.Exl ? (this.Ixl(this.Exl.Level), this.XZi(this.Exl.Level, this.Exl.Level > s), e && this.XIn(this.Exl.Level)) : (this.SetUiActive(false), this.XZi(0, false))), this.Exl)) {
        var i = this.Exl.LowerUpperLimits[0];
        var s = this.Exl.LowerUpperLimits[1];
        let e = 0;
        e = s === i ? 1 : (e = (t - i) / (s - i), Math.min(e, 1));
        this.Fst(e);
      }
    };
    this.yIn = () => {
      this.kIn = true;
      this.VIn = Time_1.Time.Now;
      this.zRn = UP_EFFECT_TIME;
      this.ZRn(1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UINiagara], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.eUl = Info_1.Info.IsInTouch();
  }
  async OnCreateAsync() {
    var t = [];
    for (let e = 0; e < scoreTexturePathList.length; e++) {
      t.push(this.$In(scoreTexturePathList[e], e, this.qIn));
    }
    for (let e = 0; e < scoreBgTexturePathList.length; e++) {
      t.push(this.$In(scoreBgTexturePathList[e], e, this.GIn));
    }
    for (let e = 0; e < scoreNiagaraPathList.length; e++) {
      t.push(this.YIn(scoreNiagaraPathList[e], e, this.NIn));
    }
    t.push(this.eUn(SHADER_PATH));
    await Promise.all(t);
  }
  async $In(e, t, i) {
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, e => {
      i[t] = e;
      s.SetResult();
    }, 103);
    return s.Promise;
  }
  async YIn(e, t, i) {
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, e => {
      i[t] = e;
      s.SetResult();
    }, 103);
    return s.Promise;
  }
  async eUn(e) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.MaterialParameterCollection, e => {
      this.Cnt = e;
      t.SetResult();
    }, 103);
    return t.Promise;
  }
  OnStart() {
    super.OnStart();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[RogueScoreItem]OnStart");
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.UIn = this.GetTexture(0);
    this.AIn = this.UIn.GetOwner().GetComponentByClass(UE.UITextureTransitionComponent.StaticClass());
    this.PIn = this.GetTexture(1);
    this.xIn = this.PIn.GetOwner().GetComponentByClass(UE.UITextureTransitionComponent.StaticClass());
    this.wIn = this.GetUiNiagara(2);
    for (let e = 3; e <= 8; e++) {
      var t = this.GetItem(e);
      this.XIt.push(t);
    }
    this.Fst(0);
    this.RIn.SetUpdateCallback(this.HIn, this.yIn);
    for (var [e, i] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreEnableMap()) {
      if (i) {
        this.rUl(e);
      }
    }
    for (var [s, o] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) {
      if (o > 0 && this.IsValidScore(s)) {
        this.OnBattleScoreChanged(s, o);
      }
    }
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
    this.tUl = undefined;
    super.OnBeforeDestroy();
  }
  async OnShowAsyncImplementImplement() {
    this.OIn = true;
    await this.SPe.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise());
    this.OIn = false;
  }
  OnBattleScoreChanged(e, t) {
    if (this.IsHideOrHiding) {
      this.ShowScore();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "肉鸽评分变化", ["scoreId", e], ["score", t]);
    }
    this.iUl(e, t);
    this.UpdateScore(t, this.SBn);
    if (this.SBn) {
      this.SetUiActive(true);
    }
  }
  UpdateScore(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "肉鸽战斗评分UI更新", ["score", e], ["level", t?.Level]);
    }
    this.RIn.UpdateTargetScore(e, t);
  }
  Ixl(e) {
    this.jIn(e);
    this.WIn(e);
    this.KIn(e);
    this.QIn(e);
  }
  jIn(e) {
    e = this.qIn[e - 1];
    this.UIn.SetTexture(e);
    this.AIn?.SetAllStateTexture(e);
    this.UIn.SetSizeFromTexture();
  }
  WIn(e) {
    var t = this.GIn[e - 1];
    this.PIn.SetTexture(t);
    this.xIn?.SetAllStateTexture(t);
    this.PIn.SetSizeFromTexture();
    this.PIn.SetCustomMaterialVectorParameter(fillColor, fillColorList[e - 1]);
    this.PIn.SetCustomMaterialVectorParameter(flowColorA, flowColorListA[e - 1]);
    this.PIn.SetCustomMaterialVectorParameter(flowColorB, flowColorListB[e - 1]);
  }
  KIn(e) {
    var e = scoreNiagaraIndexList[e - 1];
    if (this.BIn !== e) {
      this.BIn = e;
      e = this.NIn[e];
      this.wIn.SetNiagaraSystem(e);
      this.wIn.ActivateSystem(true);
    }
  }
  QIn(e) {
    e -= 1;
    if (this.bIn !== e) {
      if (this.bIn >= 0) {
        this.XIt[this.bIn].SetUIActive(false);
      }
      if (e >= 0) {
        this.XIt[e].SetUIActive(true);
      }
      this.bIn = e;
    }
  }
  XZi(e, t) {
    ModelManager_1.ModelManager.BattleScoreModel.RougeScoreMusicState.State = musicStateList[e];
    if (t) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_rogue_combo");
    } else {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_rogue_combo_down");
    }
  }
  XIn(e) {
    if (!this.OIn) {
      this.SPe.PlaySequencePurely(sequenceNameList[e - 1]);
    }
  }
  Fst(e) {
    this.PIn.SetCustomMaterialScalarParameter(filledAmount, e);
  }
  ZRn(e) {
    if (this.Cnt) {
      UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.Cnt, rgbSplitProgress, e);
    }
  }
  OnTick(e) {
    RogueScoreItem.Ult.Start();
    if (this.GetActive()) {
      this.RIn.Tick(e);
      if (this.kIn) {
        let e = Time_1.Time.Now - this.VIn;
        if (e >= UP_ANIM_TIME) {
          e = UP_ANIM_TIME;
          this.kIn = false;
        }
        let t = 0;
        t = e < HALF_UP_ANIM_TIME ? e / HALF_UP_ANIM_TIME : (UP_ANIM_TIME - e) / (UP_ANIM_TIME - HALF_UP_ANIM_TIME);
        var i = this.FIn.GetCurrentValue(t);
        this.PIn.SetCustomMaterialScalarParameter(globalInt, 0.1 + i * 0.9);
      }
      if (this.zRn > 0) {
        this.zRn -= e;
        if (this.zRn <= 0) {
          this.ZRn(0);
        } else {
          i = this.FIn.GetCurrentValue(this.zRn / UP_EFFECT_TIME);
          this.ZRn(i);
        }
      }
    }
    RogueScoreItem.Ult.Stop();
  }
  IsValidScore(e) {
    e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(e);
    return !!e && (e.Type === 1 || e.Type === 2 || e.Type === 3 || e.Type === 6);
  }
  ShowScore() {
    super.ShowScore();
    this.Ixl(1);
    this.Fst(0);
    this.Show();
    this.wIn?.SetUIActive(true);
  }
  HideScore() {
    super.HideScore();
    this.wIn?.SetUIActive(false);
    this.Txl();
    this.RIn?.ResetScore();
    this.SPe?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise()).then(() => {
      if (!this.IsDestroyOrDestroying && !this.IsScoreEnable) {
        this.Hide();
      }
    });
  }
  OnShowFirstTime() {
    if (this.IsScoreEnable && this.IIn > 0) {
      this.ShowScore();
    }
  }
  iUl(e, t) {
    e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(e);
    if (e) {
      e = e.LevelGroupId;
      if (this.EBn !== e) {
        this.EBn = e;
        this.yBn = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(e);
        this.rTn();
      }
      if (this.yBn && this.yBn.length !== 0) {
        if (t < this.IBn.LowerUpperLimits[0]) {
          this.SBn = undefined;
        } else if (t >= this.TBn.LowerUpperLimits[1]) {
          this.SBn = this.TBn;
        } else {
          this.SBn = undefined;
          for (const s of this.yBn) {
            var i = s.LowerUpperLimits;
            if (!(i.length < 2) && t >= i[0] && t < i[1]) {
              this.SBn = s;
              break;
            }
          }
        }
      }
    }
  }
  rTn() {
    this.IBn = undefined;
    this.TBn = undefined;
    if (this.yBn) {
      let e = MathUtils_1.MathUtils.Int32Max;
      let t = 0;
      for (const s of this.yBn) {
        var i = s.Level;
        if (e > i) {
          e = i;
          this.IBn = s;
        }
        if (t < i) {
          t = i;
          this.TBn = s;
        }
      }
    }
  }
  rUl(t) {
    if (this.tUl) {
      let e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t)?.Type;
      if (e = e || ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(t)?.Type) {
        this.tUl.Set(0, 0);
        if (e === 6) {
          if ((t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("ScoreOffsetLevelPlayReport")) && t.length >= 4) {
            if (this.eUl) {
              this.tUl.Set(t[2], t[3]);
            } else {
              this.tUl.Set(t[0], t[1]);
            }
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "[RogueScoreItem]参数表中ScoreOffsetLevelPlayReport配置有误, 请检查", ["offsetList", t]);
          }
        }
        this.RootItem?.SetAnchorOffset(this.tUl);
      }
    }
  }
  Txl() {
    this.IIn = 0;
    this.Exl = undefined;
    this.SBn = undefined;
    this.EBn = 0;
  }
}
(exports.RogueScoreItem = RogueScoreItem).Ult = Stats_1.Stat.Create("[BattleView]RogueScoreItem");
//# sourceMappingURL=RogueScoreItem.js.map