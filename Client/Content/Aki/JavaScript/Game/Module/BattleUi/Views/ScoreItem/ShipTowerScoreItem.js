"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerScoreItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BaseScoreItem_1 = require("./BaseScoreItem");
const MAX_SMOOTH_TIME = 200;
const SHIP_TOWER_SCORE_GROUP_ID = 2304;
class ShipTowerScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.xvi = undefined;
    this.yBn = undefined;
    this.SBn = undefined;
    this.IBn = undefined;
    this.TBn = undefined;
    this.nel = false;
    this.ael = 0;
    this.lel = 0;
    this.hel = 0;
    this.xte = 0;
    this._el = 0;
    this.edt = undefined;
    this.Nll = undefined;
    this.yct = t => {
      if (t === "Start") {
        this.jpu("Loop2");
      } else if (t === "Start2") {
        this.jpu("Loop1");
      }
    };
    this.Fr = () => {
      var t = {
        CurScore: this.hel,
        MaxScore: this.xte
      };
      UiManager_1.UiManager.OpenView("ShipTowerLevelInfoView", t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Fr]];
  }
  OnStart() {
    super.OnStart();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.yct);
    this.edt = this.GetItem(4);
    this.Nll = new UE.Rotator(0, 0, 0);
    this.xvi = this.GetText(2);
    this.xvi.SetText("0%");
    this.GetSprite(0)?.SetFillAmount(0);
    if (ModelManager_1.ModelManager.ShipTowerModel.CurSeasonCfg) {
      var t;
      var e;
      var i = SHIP_TOWER_SCORE_GROUP_ID;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 78, "ShipTower评分组ID", ["scoreGroupId", i]);
      }
      this.yBn = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(i);
      this.rTn();
      for ([t, e] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) {
        if (e > 0) {
          this.OnBattleScoreChanged(t, e);
        }
      }
    }
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
    super.OnBeforeDestroy();
  }
  OnBattleScoreChanged(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 78, "---ShipTower评分变化", ["scoreId", t], ["score", e], ["maxScore", this.xte]);
    }
    if (this.IsHideOrHiding) {
      this.ShowScore();
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
  SIn(t, e) {
    this.nel = !!e;
    this.uel(t);
    if (!this.IsShowOrShowing) {
      this.ShowScore();
    }
    if (this.xte > 0) {
      e = Math.floor(t / this.xte * 100);
      this.xvi.SetText(e + "%");
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
      if (this.xte <= 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 78, "ShipTower评分最大值不合法", ["MaxScore", this.xte]);
      }
    }
  }
  OnTick(t) {
    ShipTowerScoreItem.Ult.Start();
    if (this.nel && this.hel !== this.lel && this.GetActive() && (this._el = Math.min(MAX_SMOOTH_TIME, this._el + t), t = this._el / MAX_SMOOTH_TIME, this.hel = this.ael * (1 - t) + this.lel * t, this.xte > 0)) {
      t = this.hel / this.xte;
      this.GetSprite(0)?.SetFillAmount(t);
      this.Nll.Yaw = t * -360;
      this.edt?.SetUIRelativeRotation(this.Nll);
    }
    ShipTowerScoreItem.Ult.Stop();
  }
  uel(t) {
    if (t > 0) {
      this.ael = this.hel;
      this.lel = t;
      this._el = 0;
      if (t >= this.xte) {
        this.jpu("Start");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 78, "焚潮开始", ["score", t]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerBattleTip, "ShipTower_BurningTide_Start");
      }
    } else {
      this.ael = this.hel;
      this.lel = 0;
      this._el = MAX_SMOOTH_TIME;
      this.jpu("Start2");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 78, "焚潮结束", ["score", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerBattleTip, "ShipTower_BurningTide_End");
    }
  }
  IsValidScore(t) {
    var e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, true);
    var e = !e || e.Type !== 9;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 78, "ShipTower评分是否有效", ["scoreId", t], ["notValid", e]);
    }
    return !e;
  }
  jpu(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 78, "播放序列", ["sequenceName", t]);
    }
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequencePurely(t);
  }
  ShowScore() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 78, "ShipTower评分UI显示");
    }
    super.ShowScore();
    this.Show();
    this.jpu("Start2");
  }
  HideScore() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 78, "ShipTower评分UI隐藏");
    }
    super.HideScore();
    this.Hide();
  }
}
(exports.ShipTowerScoreItem = ShipTowerScoreItem).Ult = Stats_1.Stat.Create("[BattleView]ShipTowerScoreItemTick");
//# sourceMappingURL=ShipTowerScoreItem.js.map