"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkScoreItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BaseScoreItem_1 = require("./BaseScoreItem");
const LINK_SCORE_GROUP_ID = 2;
const SCORE_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_WhiteCat_Button_Panner.NS_Fx_LGUI_WhiteCat_Button_Panner";
const MAX_SMOOTH_TIME = 200;
class LinkScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.wIn = undefined;
    this.oel = undefined;
    this.edt = undefined;
    this.Nll = undefined;
    this.nel = false;
    this.sel = false;
    this.ael = 0;
    this.lel = 0;
    this.hel = 0;
    this.xte = 0;
    this._el = 0;
    this.yBn = undefined;
    this.SBn = undefined;
    this.IBn = undefined;
    this.TBn = undefined;
    this.RUu = false;
    this.oEc = () => {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
      this.IsScoreEnable = true;
      var t = ModelManager_1.ModelManager.WeeklyRogueModel.CycleId;
      this.wUu(t);
      this.ShowScore();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara], [1, UE.UIItem]];
  }
  async OnCreateAsync() {
    await this.YIn(SCORE_NIAGARA_PATH);
  }
  OnStart() {
    var t;
    super.OnStart();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.oel = this.GetUiNiagara(0);
    if (this.wIn) {
      this.oel?.SetUIActive(false);
      this.oel?.SetNiagaraSystem(this.wIn);
    }
    this.edt = this.GetItem(1);
    this.Nll = new UE.Rotator(0, 0, 0);
    if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
      t = ModelManager_1.ModelManager.WeeklyRogueModel.CurrentActivityId !== 0;
      if (this.IsScoreEnable = t) {
        this.wUu(ModelManager_1.ModelManager.WeeklyRogueModel.CycleId);
        this.ShowScore();
      } else {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
      }
    } else {
      this.wUu(LINK_SCORE_GROUP_ID);
    }
  }
  wUu(t) {
    this.RUu = true;
    this.yBn = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(t);
    this.rTn();
    for (var [e, i] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) {
      if (i > 0) {
        this.OnBattleScoreChanged(e, i);
      }
    }
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeeklyRogueCycleRefresh, this.oEc);
    }
    super.OnBeforeDestroy();
  }
  async YIn(t) {
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, t => {
      this.wIn = t;
      e.SetResult();
    }, 103);
    return e.Promise;
  }
  OnBattleScoreChanged(t, e) {
    if (this.RUu) {
      if (this.IsHideOrHiding) {
        this.ShowScore();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "Link评分变化", ["scoreId", t], ["score", e]);
      }
      if (e < this.IBn.LowerUpperLimits[0]) {
        this.SBn = undefined;
      } else if (e >= this.TBn.LowerUpperLimits[1]) {
        this.SBn = this.TBn;
      } else {
        this.SBn = this.IBn;
      }
      this.SIn(e, this.SBn);
    }
  }
  SIn(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "Link评分UI更新", ["score", t], ["level", e?.Level]);
    }
    this.nel = !!e;
    this.uel(t);
    if (this.IsShowOrShowing) {
      if (t >= this.xte && !this.sel) {
        this.sel = true;
        this.SPe?.StopSequenceByKey("Restart");
        this.SPe?.PlaySequencePurely("Full");
      } else if (t !== this.xte && this.sel) {
        this.sel = false;
        this.SPe?.StopSequenceByKey("Full");
        this.SPe?.PlaySequencePurely("Restart");
      }
    } else {
      this.ShowScore();
    }
  }
  OnTick(t) {
    LinkScoreItem.Ult.Start();
    if (this.nel && this.hel !== this.lel && this.GetActive() && (this._el = Math.min(MAX_SMOOTH_TIME, this._el + t), t = this._el / MAX_SMOOTH_TIME, this.hel = this.ael * (1 - t) + this.lel * t, this.xte > 0)) {
      t = this.hel / this.xte;
      this.oel?.SetNiagaraVarFloat("Dissolve", t);
      this.Nll.Yaw = t * -360;
      this.edt?.SetUIRelativeRotation(this.Nll);
    }
    LinkScoreItem.Ult.Stop();
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
    }
  }
  rTn() {
    this.IBn = undefined;
    this.TBn = undefined;
    if (this.yBn) {
      let t = MathUtils_1.MathUtils.Int32Max;
      let e = 0;
      for (const s of this.yBn) {
        var i = s.Level;
        if (t > i) {
          t = i;
          this.IBn = s;
        }
        if (e < i) {
          e = i;
          this.TBn = s;
        }
      }
      this.xte = this.TBn.LowerUpperLimits[0];
      if (this.xte <= 0 && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "Link评分最大值不合法", ["MaxScore", this.xte]);
      }
    }
  }
  IsValidScore(t) {
    t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, true);
    return !!t && (t.Type === 4 || t.Type === 7);
  }
  ShowScore() {
    super.ShowScore();
    this.Show();
    this.oel?.SetUIActive(true);
    this.oel?.ActivateSystem(true);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequencePurely("Start");
  }
  HideScore() {
    super.HideScore();
    this.oel?.SetUIActive(false);
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise()).then(() => {
      if (!this.IsScoreEnable) {
        this.Hide();
      }
    });
  }
}
(exports.LinkScoreItem = LinkScoreItem).Ult = Stats_1.Stat.Create("[BattleView]LinkScoreItemTick");
//# sourceMappingURL=LinkScoreItem.js.map