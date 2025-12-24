"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCheckBattleState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCheckBattleState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.nDe = false;
    this.sDe = undefined;
    this.aDe = undefined;
    this.hDe = undefined;
    this.lDe = undefined;
    this.j6 = 5;
    this._De = 0;
    this.uDe = -0;
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t) {
    this.nDe = false;
    if (e) {
      this.aDe = e.StateOption;
      if (this.aDe && this.aDe.TagOption) {
        this.lDe = this.aDe.TagOption;
        this.CreateWaitEntityTask(this.aDe.EntityId);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 33, "StateOption不合法");
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 33, "参数不合法");
      }
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    this.uDe = this.aDe.MaxWaitTime * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.aDe.EntityId);
    this.hDe = this.aDe.Type;
  }
  OnTick(e) {
    e = this.BaseContext ? e * (LevelGamePlayUtils_1.LevelGamePlayUtils.GetCustomTimeDilationByContext(this.BaseContext) ?? 1) : e;
    if (this.uDe && (this.uDe -= e, this.uDe <= 0)) {
      this.FinishExecute(true);
    }
    this._De += 1;
    if (!(this._De < this.j6)) {
      this._De = 0;
      if (this.hDe === IAction_1.EDetectBattleConditionType.DetectBattleTag) {
        this.nDe = this.cDe();
      }
      if (this.nDe) {
        this.FinishExecute(true);
      }
    }
  }
  cDe() {
    var e;
    if (this.sDe?.Valid) {
      e = this.lDe.Type;
      return this.sDe.Entity.GetComponent(215)?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 33, "目标实体不存在，action视为执行成功", ["EntityId", this.aDe.EntityId]);
      }
      return true;
    }
  }
  Release() {
    super.Release();
    this.sDe = undefined;
  }
}
exports.LevelEventCheckBattleState = LevelEventCheckBattleState;
//# sourceMappingURL=LevelEventCheckBattleState.js.map