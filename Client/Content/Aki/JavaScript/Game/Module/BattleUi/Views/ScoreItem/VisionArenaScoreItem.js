"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.VisionArenaScoreItem = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BaseScoreItem_1 = require("./BaseScoreItem"),
  WAVE_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/Shengyuan/NI_Fx_LGUI_SoundRing.NI_Fx_LGUI_SoundRing";
class VisionArenaScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments), this.SPe = void 0, this.bCt = void 0, this.nI1 = void 0, this.IK1 = void 0, this.GJ1 = void 0, this.wf = !1, this.Wft = 0, this.Rgu = e => {}
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UINiagara],
      [1, UE.UISprite],
      [2, UE.UITexture],
      [3, UE.UINiagara],
      [4, UE.UINiagara],
      [5, UE.UIItem],
      [6, UE.UISprite]
    ]
  }
  async OnCreateAsync() {
    await this.YIn(WAVE_NIAGARA_PATH)
  }
  OnBeforeShow() {
    super.OnBeforeShow(), this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SPe.BindSequenceCloseEvent(this.Rgu), this.nI1 = this.GetUiNiagara(0), this.bCt && this.nI1?.SetNiagaraSystem(this.bCt);
    let e = !1;
    for (var [i, t] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) 0 <= t && this.IsValidScore(i) && (this.OnBattleScoreChanged(i, t), e = !0);
    var s;
    e || (s = this.OpenParam, this.OnBattleScoreChanged(s, 0))
  }
  OnBeforeDestroy() {
    this.SPe?.Clear(), this.SPe = void 0, super.OnBeforeDestroy()
  }
  async YIn(i) {
    const t = new CustomPromise_1.CustomPromise;
    return ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, e => {
      i === WAVE_NIAGARA_PATH && (this.bCt = e), t.SetResult()
    }, 103), t.Promise
  }
  OnBattleScoreChanged(e, i) {
    if (this.IsHideOrHiding && this.ShowScore(), !this.IK1) {
      var t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(e, !0);
      if (!t) return void(Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 34, "VisionArenaScoreItem 没有找到分数配置", ["scoreId", e]));
      this.IK1 = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(t.LevelGroupId)
    }
    this.TK1(i), this.GJ1 && 0 < this.GJ1.LowerUpperLimits[1] && this.GetUiNiagara(3)?.SetNiagaraVarFloat("Dissolve", (i - this.GJ1.LowerUpperLimits[0]) / (this.GJ1.LowerUpperLimits[1] - this.GJ1.LowerUpperLimits[0])), this.wf && (this.FJ1(), this.NJ1(), this.wf = !1)
  }
  IsValidScore(e) {
    e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(e, !0);
    return !(!e || 8 !== e.Type)
  }
  ShowScore() {
    super.ShowScore(), this.Show(), this.nI1?.SetUIActive(!0), this.nI1?.ActivateSystem(!0), this.SPe?.StopCurrentSequence(), this.SPe?.PlaySequencePurely("Start")
  }
  HideScore() {
    super.HideScore(), this.nI1?.SetUIActive(!1), this.SPe?.StopCurrentSequence(), this.SPe?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise).then(() => {
      this.IsScoreEnable || this.Hide()
    })
  }
  TK1(i) {
    this.IK1 && this.IK1.forEach(e => {
      i >= e.LowerUpperLimits[0] && i < e.LowerUpperLimits[1] && this.Wft !== e.Level && (this.Wft = e.Level, this.GJ1 = e, this.wf = !0)
    })
  }
  FJ1() {
    switch (this.SPe?.StopCurrentSequence(), this.Wft) {
      case 1:
        var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("VisionArenaScoreIte_Idle");
        this.SetSpriteByPath(e, this.GetSprite(1), !1, void 0, () => {
          this.GetSprite(1).GetOwner()?.GetComponentByClass(UE.UISpriteAnimator.StaticClass()).ResetSpriteImporter(), this.SPe?.PlayLevelSequenceByName("Switch2to1"), this.SPe?.PlayLevelSequenceByName("Loop1")
        });
        break;
      case 2:
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("VisionArenaScoreIte_B");
        this.SetSpriteByPath(e, this.GetSprite(6), !1, void 0, () => {
          this.GetSprite(6).GetOwner()?.GetComponentByClass(UE.UISpriteAnimator.StaticClass()).ResetSpriteImporter(), this.SPe?.PlayLevelSequenceByName("Switch1to2"), this.SPe?.PlayLevelSequenceByName("Loop2")
        });
        break;
      case 3:
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("VisionArenaScoreIte_A");
        this.SetSpriteByPath(e, this.GetSprite(1), !1, void 0, () => {
          this.GetSprite(1).GetOwner()?.GetComponentByClass(UE.UISpriteAnimator.StaticClass()).ResetSpriteImporter(), this.SPe?.PlayLevelSequenceByName("Switch2to1"), this.SPe?.PlayLevelSequenceByName("Loop1")
        });
        break;
      case 4:
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("VisionArenaScoreIte_S");
        this.SetSpriteByPath(e, this.GetSprite(6), !1, void 0, () => {
          this.GetSprite(6).GetOwner()?.GetComponentByClass(UE.UISpriteAnimator.StaticClass()).ResetSpriteImporter(), this.SPe?.PlayLevelSequenceByName("Switch1to2"), this.SPe?.PlayLevelSequenceByName("Loop2")
        });
        break;
      default:
        this.SPe?.PlayLevelSequenceByName("Loop1")
    }
    var i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("VisionArena_ScoreItem_Bg_" + this.Wft);
    i && this.SetTextureShowUntilLoaded(i, this.GetTexture(2))
  }
  NJ1() {
    var e = 1 < this.Wft,
      i = this.GetUiNiagara(3),
      t = this.GetUiNiagara(0);
    t?.SetUIActive(e), i?.SetUIActive(e);
    let s = void 0;
    switch (this.Wft) {
      case 1:
        i?.SetUIActive(!1);
        break;
      case 2:
        s = CommonParamById_1.configCommonParamById.GetStringConfig("VisionArenaScoreEffectConfigB"), i?.SetUIActive(!0);
        break;
      case 3:
        s = CommonParamById_1.configCommonParamById.GetStringConfig("VisionArenaScoreEffectConfigA"), i?.SetUIActive(!0);
        break;
      case 4:
        s = CommonParamById_1.configCommonParamById.GetStringConfig("VisionArenaScoreEffectConfigS"), i?.SetUIActive(!0)
    }
    if (s) try {
      var o = JSON.parse(s);
      if (o) {
        var r, a, n = (e, i) => {
          if (i)
            for (const s in i) {
              var t = i[s];
              t && (s.includes("Color") ? e?.SetNiagaraVarLinearColor(s, new UE.LinearColor(UE.Color.FromHex(t))) : e?.SetNiagaraVarFloat(s, Number(t)))
            }
        };
        for (const h in o) "Wave" === h && n(t, o[h]), "Progress" === h && n(i, o[h]), "Burst" === h && ((r = this.GetUiNiagara(4)) && (r.SetUIActive(!0), n(r, o[h])), a = this.GetItem(5)?.GetOwner()?.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())) && a.Play()
      }
    } catch (e) {
      e instanceof Error && Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 34, "VisionArenaScoreItem 解析配置失败", ["config", s], ["error", e])
    }
  }
}
exports.VisionArenaScoreItem = VisionArenaScoreItem;
//# sourceMappingURL=VisionArenaScoreItem.js.map