"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AK_COOL_DOWN = exports.FX_FLYING_TIME = exports.TUNINGSTAND_HELP_ID = exports.TOOLONG_DELAY_MIN = exports.TOOLONG_DELAY = exports.RESET_COOL_DOWN = exports.RESET_TIMES_THREDHOLD = exports.TuningGridData = exports.gridSpriteMap = exports.gridMainTypeMap = exports.gridValueMap = exports.ANIM_IN_TIME = exports.MAX_LINE = exports.MAX_ROW = undefined;
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
exports.MAX_ROW = 5;
exports.MAX_LINE = 7;
exports.ANIM_IN_TIME = 330;
exports.gridValueMap = new Map([[IAction_1.ETuningStandGridType.Start1, 0], [IAction_1.ETuningStandGridType.Start2, 0], [IAction_1.ETuningStandGridType.Number1, 1], [IAction_1.ETuningStandGridType.Number2, 2], [IAction_1.ETuningStandGridType.Number3, 3], [IAction_1.ETuningStandGridType.Number4, 4], [IAction_1.ETuningStandGridType.End1, 5], [IAction_1.ETuningStandGridType.End2, 5], [IAction_1.ETuningStandGridType.Empty, -1]]);
exports.gridMainTypeMap = new Map([[IAction_1.ETuningStandGridType.Start1, 1], [IAction_1.ETuningStandGridType.Start2, 1], [IAction_1.ETuningStandGridType.Number1, 2], [IAction_1.ETuningStandGridType.Number2, 2], [IAction_1.ETuningStandGridType.Number3, 2], [IAction_1.ETuningStandGridType.Number4, 2], [IAction_1.ETuningStandGridType.End1, 3], [IAction_1.ETuningStandGridType.End2, 3], [IAction_1.ETuningStandGridType.Empty, 0]]);
exports.gridSpriteMap = new Map([[IAction_1.ETuningStandGridType.Number1, ["SP_DigitalMazeNum01Nml", "SP_DigitalMazeNum01Red", "SP_DigitalMazeNum01Blue"]], [IAction_1.ETuningStandGridType.Number2, ["SP_DigitalMazeNum02Nml", "SP_DigitalMazeNum02Red", "SP_DigitalMazeNum02Blue"]], [IAction_1.ETuningStandGridType.Number3, ["SP_DigitalMazeNum03Nml", "SP_DigitalMazeNum03Red", "SP_DigitalMazeNum03Blue"]], [IAction_1.ETuningStandGridType.Number4, ["SP_DigitalMazeNum04Nml", "SP_DigitalMazeNum04Red", "SP_DigitalMazeNum04Blue"]], [IAction_1.ETuningStandGridType.End1, ["SP_DigitalMazeNum05Nml", "SP_DigitalMazeNum05Red", "SP_DigitalMazeNum05Blue"]], [IAction_1.ETuningStandGridType.End2, ["SP_DigitalMazeNum05Nml", "SP_DigitalMazeNum05Red", "SP_DigitalMazeNum05Blue"]]]);
class TuningGridData {
  constructor() {
    this.Pbu = 0;
    this.IsStatic = true;
    this.GridLoc = [-1, -1];
    this.GridType = IAction_1.ETuningStandGridType.Empty;
    this.GridMainType = 0;
    this.GridValue = 0;
    this.StaticState = {
      State: 0
    };
    this.DynamicState = {
      State: 0
    };
  }
  set Index(t) {
    this.Pbu = t;
    this.GridLoc[0] = Math.floor(this.Index / exports.MAX_LINE);
    this.GridLoc[1] = this.Index % exports.MAX_LINE;
  }
  get Index() {
    return this.Pbu;
  }
  GetCurGridState() {
    if (this.IsStatic) {
      return this.StaticState;
    } else {
      return this.DynamicState;
    }
  }
  GetCenterDistance() {
    return Math.abs(this.GridLoc[0] - Math.floor(exports.MAX_ROW / 2)) + Math.abs(this.GridLoc[1] - Math.floor(exports.MAX_LINE / 2));
  }
}
exports.TuningGridData = TuningGridData;
exports.RESET_TIMES_THREDHOLD = 3;
exports.RESET_COOL_DOWN = 3;
exports.TOOLONG_DELAY = 60000;
exports.TOOLONG_DELAY_MIN = 3;
exports.TUNINGSTAND_HELP_ID = 346;
exports.FX_FLYING_TIME = 1;
exports.AK_COOL_DOWN = 0.05; //# sourceMappingURL=TuningStandDefine.js.map