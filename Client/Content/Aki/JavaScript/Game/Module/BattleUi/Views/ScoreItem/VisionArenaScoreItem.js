"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionArenaScoreItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BaseScoreItem_1 = require("./BaseScoreItem");
const WAVE_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/Shengyuan/NI_Fx_LGUI_SoundRing.NI_Fx_LGUI_SoundRing";
class VisionArenaScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.bCt = undefined;
    this.AI1 = undefined;
    this.CX1 = undefined;
    this.xZ1 = undefined;
    this.wf = false;
    this.Wft = 0;
    this.i7c = e => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UINiagara], [4, UE.UINiagara], [5, UE.UIItem], [6, UE.UISprite]];
  }
  async OnCreateAsync() {
    await this.YIn(WAVE_NIAGARA_PATH);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.i7c);
    this.AI1 = this.GetUiNiagara(0);
    if (this.bCt) {
      this.AI1?.SetNiagaraSystem(this.bCt);
    }
    let e = false;
    for (var [i, t] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) {
      if (t >= 0 && this.IsValidScore(i)) {
        this.OnBattleScoreChanged(i, t);
        e = true;
      }
    }
    var s;
    if (!e) {
      s = this.OpenParam;
      this.OnBattleScoreChanged(s, 0);
    }
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
    super.OnBeforeDestroy();
  }
  async YIn(i) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, e => {
      if (i === WAVE_NIAGARA_PATH) {
        this.bCt = e;
      }
      t.SetResult();
    }, 103);
    return t.Promise;
  }
  OnBattleScoreChanged(e, i) {
    if (this.IsHideOrHiding) {
      this.ShowScore();
    }
    if (!this.CX1) {
      var t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(e, true);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 34, "VisionArenaScoreItem 没有找到分数配置", ["scoreId", e]);
        }
        return;
      }
      this.CX1 = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(t.LevelGroupId);
    }
    this.pX1(i);
    if (this.xZ1 && this.xZ1.LowerUpperLimits[1] > 0) {
      this.GetUiNiagara(3)?.SetNiagaraVarFloat("Dissolve", (i - this.xZ1.LowerUpperLimits[0]) / (this.xZ1.LowerUpperLimits[1] - this.xZ1.LowerUpperLimits[0]));
    }
    if (this.wf) {
      this.UZ1();
      this.DZ1();
      this.wf = false;
    }
  }
  IsValidScore(e) {
    e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(e, true);
    return !!e && e.Type === 8;
  }
  ShowScore() {
    super.ShowScore();
    this.Show();
    this.AI1?.SetUIActive(true);
    this.AI1?.ActivateSystem(true);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequencePurely("Start");
  }
  HideScore() {
    super.HideScore();
    this.AI1?.SetUIActive(false);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise()).then(() => {
      if (!this.IsScoreEnable) {
        this.Hide();
      }
    });
  }
  pX1(i) {
    if (this.CX1) {
      this.CX1.forEach(e => {
        if (i >= e.LowerUpperLimits[0] && i < e.LowerUpperLimits[1] && this.Wft !== e.Level) {
          this.Wft = e.Level;
          this.xZ1 = e;
          this.wf = true;
        }
      });
    }
  }
  UZ1() {
    this.SPe?.StopCurrentSequence();
    switch (this.Wft) {
      case 1:
        var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("VisionArenaScoreIte_Idle");
        this.SetSpriteByPath(e, this.GetSprite(1), false, undefined, () => {
          this.GetSprite(1).GetOwner()?.GetComponentByClass(UE.UISpriteAnimator.StaticClass()).ResetSpriteImporter();
          this.SPe?.PlayLevelSequenceByName("Switch2to1");
          this.SPe?.PlayLevelSequenceByName("Loop1");
        });
        break;
      case 2:
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("VisionArenaScoreIte_B");
        this.SetSpriteByPath(e, this.GetSprite(6), false, undefined, () => {
          this.GetSprite(6).GetOwner()?.GetComponentByClass(UE.UISpriteAnimator.StaticClass()).ResetSpriteImporter();
          this.SPe?.PlayLevelSequenceByName("Switch1to2");
          this.SPe?.PlayLevelSequenceByName("Loop2");
        });
        break;
      case 3:
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("VisionArenaScoreIte_A");
        this.SetSpriteByPath(e, this.GetSprite(1), false, undefined, () => {
          this.GetSprite(1).GetOwner()?.GetComponentByClass(UE.UISpriteAnimator.StaticClass()).ResetSpriteImporter();
          this.SPe?.PlayLevelSequenceByName("Switch2to1");
          this.SPe?.PlayLevelSequenceByName("Loop1");
        });
        break;
      case 4:
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("VisionArenaScoreIte_S");
        this.SetSpriteByPath(e, this.GetSprite(6), false, undefined, () => {
          this.GetSprite(6).GetOwner()?.GetComponentByClass(UE.UISpriteAnimator.StaticClass()).ResetSpriteImporter();
          this.SPe?.PlayLevelSequenceByName("Switch1to2");
          this.SPe?.PlayLevelSequenceByName("Loop2");
        });
        break;
      default:
        this.SPe?.PlayLevelSequenceByName("Loop1");
    }
    var i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("VisionArena_ScoreItem_Bg_" + this.Wft);
    if (i) {
      this.SetTextureShowUntilLoaded(i, this.GetTexture(2));
    }
  }
  DZ1() {
    var e = this.Wft > 1;
    var i = this.GetUiNiagara(3);
    var t = this.GetUiNiagara(0);
    t?.SetUIActive(e);
    i?.SetUIActive(e);
    let s = undefined;
    switch (this.Wft) {
      case 1:
        i?.SetUIActive(false);
        break;
      case 2:
        s = CommonParamById_1.configCommonParamById.GetStringConfig("VisionArenaScoreEffectConfigB");
        i?.SetUIActive(true);
        break;
      case 3:
        s = CommonParamById_1.configCommonParamById.GetStringConfig("VisionArenaScoreEffectConfigA");
        i?.SetUIActive(true);
        break;
      case 4:
        s = CommonParamById_1.configCommonParamById.GetStringConfig("VisionArenaScoreEffectConfigS");
        i?.SetUIActive(true);
    }
    if (s) {
      try {
        var o = JSON.parse(s);
        if (o) {
          var r;
          var a;
          var n = (e, i) => {
            if (i) {
              for (const s in i) {
                var t = i[s];
                if (t) {
                  if (s.includes("Color")) {
                    e?.SetNiagaraVarLinearColor(s, new UE.LinearColor(UE.Color.FromHex(t)));
                  } else {
                    e?.SetNiagaraVarFloat(s, Number(t));
                  }
                }
              }
            }
          };
          for (const h in o) {
            if (h === "Wave") {
              n(t, o[h]);
            }
            if (h === "Progress") {
              n(i, o[h]);
            }
            if (h === "Burst" && ((r = this.GetUiNiagara(4)) && (r.SetUIActive(true), n(r, o[h])), a = this.GetItem(5)?.GetOwner()?.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass()))) {
              a.Play();
            }
          }
        }
      } catch (e) {
        if (e instanceof Error && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 34, "VisionArenaScoreItem 解析配置失败", ["config", s], ["error", e]);
        }
      }
    }
  }
}
exports.VisionArenaScoreItem = VisionArenaScoreItem;
//# sourceMappingURL=VisionArenaScoreItem.js.map