"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlotInterludeAction = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const Global_1 = require("../../Global");
const BattleUiDefine_1 = require("../../Module/BattleUi/BattleUiDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const INTERLUDE_DELAY_MILLISECOND = 2000;
class LevelEventPlotInterludeAction extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
    this.nx = undefined;
    this.lRe = undefined;
    this._Re = undefined;
    this.uRe = () => {
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(this.pDe.ActionList, LevelGeneralContextDefine_1.GeneralContext.Copy(this.nx), () => {
        TimerSystem_1.TimerSystem.Delay(this.cRe, INTERLUDE_DELAY_MILLISECOND);
      });
    };
    this.cRe = () => {
      if (ObjectUtils_1.ObjectUtils.IsValid(this._Re)) {
        this._Re.StartCameraFade(1, 0, this.pDe.FadeOutTime, this.lRe, false, false);
        TimerSystem_1.TimerSystem.Delay(this.mRe, this.pDe.FadeOutTime);
      } else {
        this.FinishExecute(false);
      }
    };
    this.mRe = () => {
      this.FinishExecute(true);
    };
  }
  ExecuteNew(e, t) {
    if (e && (this.pDe = e, this.nx = t, this.lRe = new UE.LinearColor(0, 0, 0, 1), this._Re = Global_1.Global.CharacterCameraManager, ObjectUtils_1.ObjectUtils.IsValid(this._Re))) {
      this._Re.StartCameraFade(0, 1, this.pDe.FadeInTime, this.lRe, false, true);
      TimerSystem_1.TimerSystem.Delay(this.uRe, this.pDe.FadeInTime * BattleUiDefine_1.SECOND_TO_MILLISECOND);
    } else {
      this.FinishExecute(false);
    }
  }
  OnReset() {
    this.pDe = undefined;
    this.nx = undefined;
    this.lRe = undefined;
    this._Re = undefined;
  }
}
exports.LevelEventPlotInterludeAction = LevelEventPlotInterludeAction;
//# sourceMappingURL=LevelEventPlotInterludeAction.js.map