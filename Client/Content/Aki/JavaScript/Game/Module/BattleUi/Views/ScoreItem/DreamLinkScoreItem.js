"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkScoreItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BaseScoreItem_1 = require("./BaseScoreItem");
const DREAM_LINK_SCORE_GROUP_ID = 4;
const SCORE_LEVEL_UP_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_RouGeIcon_Brust_Weak.NS_Fx_LGUI_RouGeIcon_Brust_Weak";
const SCORE_FULL_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_RouGeIcon_Brust.NS_Fx_LGUI_RouGeIcon_Brust";
const MAX_SMOOTH_TIME = 200;
class DreamLinkScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.T1l = undefined;
    this.L1l = undefined;
    this.wIn = undefined;
    this.R1l = undefined;
    this.edt = undefined;
    this.xvi = undefined;
    this.Nll = undefined;
    this.nel = false;
    this.ael = 0;
    this.lel = 0;
    this.hel = 0;
    this.xte = 0;
    this._el = 0;
    this.U1l = 0;
    this.yBn = undefined;
    this.SBn = undefined;
    this.IBn = undefined;
    this.TBn = undefined;
    this.D1l = undefined;
    this.A1l = undefined;
    this.x1l = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIText], [6, UE.UINiagara]];
  }
  async OnCreateAsync() {
    await this.YIn(SCORE_LEVEL_UP_NIAGARA_PATH, 0);
    await this.YIn(SCORE_FULL_NIAGARA_PATH, 1);
  }
  OnStart() {
    super.OnStart();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.wIn = this.GetUiNiagara(6);
    this.wIn?.SetUIActive(false);
    this.R1l = [this.GetSprite(2), this.GetSprite(1), this.GetSprite(0)];
    this.P1l();
    this.GetSprite(3)?.SetUIActive(false);
    this.xvi = this.GetText(5);
    this.xvi?.SetText("0%");
    this.edt = this.GetItem(4);
    this.Nll = new UE.Rotator(0, 0, 0);
    this.yBn = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(DREAM_LINK_SCORE_GROUP_ID);
    this.rTn();
    for (var [t, i] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) {
      if (i > 0) {
        this.OnBattleScoreChanged(t, i);
      }
    }
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
    super.OnBeforeDestroy();
  }
  async YIn(t, i) {
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, t => {
      if (i === 0) {
        this.L1l = t;
      } else if (i === 1) {
        this.T1l = t;
      }
      s.SetResult();
    }, 103);
    return s.Promise;
  }
  OnBattleScoreChanged(t, i) {
    if (this.IsHideOrHiding) {
      this.ShowScore();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "DreamLink评分变化", ["scoreId", t], ["score", i]);
    }
    if (i < this.IBn.LowerUpperLimits[0]) {
      this.SBn = undefined;
    } else if (i >= this.TBn.LowerUpperLimits[1]) {
      this.SBn = this.TBn;
    } else {
      this.SBn = undefined;
      if (this.yBn) {
        for (const s of this.yBn) {
          if (i >= s.LowerUpperLimits[0] && i < s.LowerUpperLimits[1]) {
            this.SBn = s;
            break;
          }
        }
      }
    }
    this.SIn(i, this.SBn);
  }
  SIn(t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "DreamLink评分UI更新", ["score", t], ["level", i?.Level]);
    }
    this.nel = !!i;
    this.uel(t);
    if (this.xte > 0) {
      i = Math.floor(t / this.xte * 100);
      this.xvi?.SetText(i + "%");
    }
  }
  OnTick(t) {
    DreamLinkScoreItem.Ult.Start();
    if (this.nel && this.hel !== this.lel && this.GetActive()) {
      this._el = Math.min(MAX_SMOOTH_TIME, this._el + t);
      t = this._el / MAX_SMOOTH_TIME;
      this.hel = this.ael * (1 - t) + this.lel * t;
      if (this.xte > 0) {
        var i = this.hel / this.xte;
        var t = this.U1l;
        if (this.R1l) {
          for (let t = 0; t < this.R1l.length; t++) {
            var s = this.R1l[t];
            if (!(t < this.U1l)) {
              if (this.hel >= this.D1l[t]) {
                if (this.hel < this.D1l[t + 1]) {
                  this.U1l = t;
                  s.SetFillAmount(i);
                } else {
                  if (this.hel === this.D1l[this.x1l]) {
                    this.U1l = this.x1l;
                  }
                  s.SetFillAmount(this.A1l[t + 1]);
                }
              }
            }
          }
        }
        if (t < this.U1l) {
          if (this.U1l < this.x1l) {
            this.wIn?.SetNiagaraSystem(this.L1l);
          } else {
            this.wIn?.SetNiagaraSystem(this.T1l);
          }
          this.wIn?.SetUIActive(true);
          this.wIn?.ActivateSystem(true);
        }
        this.Nll.Yaw = i * -360;
        this.edt?.SetUIRelativeRotation(this.Nll);
      }
    }
    DreamLinkScoreItem.Ult.Stop();
  }
  uel(t) {
    if (t > 0) {
      this.ael = this.hel;
      this.lel = t;
      this._el = 0;
    } else {
      this.ael = this.hel;
      this.lel = 0;
      this._el = MAX_SMOOTH_TIME;
      this.P1l();
    }
  }
  P1l() {
    this.U1l = 0;
    if (this.R1l) {
      for (const t of this.R1l) {
        t.SetFillAmount(0);
      }
    }
  }
  rTn() {
    this.IBn = undefined;
    this.TBn = undefined;
    this.D1l = [];
    this.A1l = [];
    if (this.yBn && this.yBn.length !== 0) {
      let t = MathUtils_1.MathUtils.Int32Max;
      let i = 0;
      for (const e of this.yBn) {
        var s = e.Level;
        if (t > s) {
          t = s;
          this.IBn = e;
        }
        if (i < s) {
          i = s;
          this.TBn = e;
        }
        this.D1l.push(e.LowerUpperLimits[0]);
      }
      this.x1l = this.D1l.length - 1;
      this.xte = this.TBn.LowerUpperLimits[1];
      if (this.xte > 0) {
        for (const h of this.D1l) {
          this.A1l.push(h / this.xte);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "DreamLink评分最大值不合法", ["MaxScore", this.xte]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "DreamLink评分配置缺失");
    }
  }
  IsValidScore(t) {
    t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, true);
    return !!t && t.Type === 5;
  }
  ShowScore() {
    super.ShowScore();
    this.Show();
  }
  HideScore() {
    super.HideScore();
    this.Hide();
  }
}
(exports.DreamLinkScoreItem = DreamLinkScoreItem).Ult = Stats_1.Stat.Create("[BattleView]DreamLinkScoreItemTick");
//# sourceMappingURL=DreamLinkScoreItem.js.map