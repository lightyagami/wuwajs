"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueScoreHandle = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RogueScoreUnit_1 = require("../HudUnit/RogueScoreUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class RogueScoreHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.JIn = undefined;
    this.zIn = false;
    this.IIn = 0;
    this.EBn = 0;
    this.yBn = undefined;
    this.SBn = undefined;
    this.IBn = undefined;
    this.TBn = undefined;
    this.oTn = (t, i) => {
      if (this.zIn) {
        t = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t);
        if (t && t.Type === 1) {
          t = t.LevelGroupId;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "肉鸽战斗评分变化", ["scoreActionId", t], ["score", i]);
          }
          if (this.EBn !== t) {
            this.EBn = t;
            this.yBn = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(t);
            this.rTn();
          }
          if (this.yBn && this.yBn.length !== 0) {
            this.IIn = i;
            if (this.IIn < this.IBn.LowerUpperLimits[0]) {
              this.SBn = undefined;
            } else if (this.IIn >= this.TBn.LowerUpperLimits[1]) {
              this.SBn = this.TBn;
            } else {
              this.SBn = undefined;
              for (const s of this.yBn) {
                var e = s.LowerUpperLimits;
                if (!(e.length < 2) && this.IIn >= e[0] && this.IIn < e[1]) {
                  this.SBn = s;
                  break;
                }
              }
            }
            if (!this.SBn && this.JIn) {
              this.nTn();
            } else {
              this.TryActivateRogueScoreUnit();
            }
          }
        }
      }
    };
  }
  OnInitialize() {
    this.zIn = ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() || ModelManager_1.ModelManager.CreatureModel.GetInstanceId() === 1;
    if (this.zIn) {
      for (var [t, i] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) {
        if (i > 0) {
          this.oTn(t, i);
        }
      }
    }
  }
  OnDestroyed() {
    this.zIn = false;
    this.sTn();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreChanged, this.oTn);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreChanged, this.oTn);
  }
  rTn() {
    this.IBn = undefined;
    this.TBn = undefined;
    if (this.yBn) {
      let t = MathUtils_1.MathUtils.Int32Max;
      let i = 0;
      for (const s of this.yBn) {
        var e = s.Level;
        if (t > e) {
          t = e;
          this.IBn = s;
        }
        if (i < e) {
          i = e;
          this.TBn = s;
        }
      }
    }
  }
  TryActivateRogueScoreUnit() {
    if (this.JIn) {
      this.JIn?.SetVisible(true);
      this.nTn();
    } else {
      this.JIn = this.NewHudUnitWithReturn(RogueScoreUnit_1.RogueScoreUnit, "UiItem_RogueScore", false, () => {
        this.JIn?.SetVisible(this.SBn !== undefined);
        this.nTn();
      }, true);
    }
  }
  nTn() {
    this.JIn?.UpdateScore(this.IIn, this.SBn);
  }
  sTn() {
    if (this.JIn) {
      this.DestroyHudUnit(this.JIn);
      this.JIn = undefined;
    }
  }
}
exports.RogueScoreHandle = RogueScoreHandle;
//# sourceMappingURL=RogueScoreHandle.js.map