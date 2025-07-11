"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDungeonDangoInfo = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const RacingBetsDefine_1 = require("../RacingBetsDefine");
class RacingBetsDungeonDangoInfo {
  constructor(t) {
    this.DangoId = 0;
    this.DiceId = 0;
    this.EntityId = 0;
    this.BpId = 0;
    this.CurPoint = 0;
    this.High = 0;
    this.Rank = 0;
    this.LastRank = 0;
    this.DangoId = t.Kz_;
    this.CurPoint = t.iMs;
    this.DiceId = t.pJ_;
    this.High = t.vJ_;
    this.EntityId = MathUtils_1.MathUtils.LongToNumber(t.F4n);
    this.BpId = t.rAc;
  }
  RealPoint() {
    var t = RacingBetsDefine_1.RACING_BETS_MAP_POINT_COUNT;
    return ((this.CurPoint - 1) % t + t) % t + 1;
  }
  GetDiceConfig() {
    return ConfigManager_1.ConfigManager.DangoConfig?.GetDiceById(this.DiceId);
  }
  GetDiceIcon(t) {
    var i = this.GetDiceConfig();
    if (i) {
      if (t === 1) {
        return i.DicePointOneIcon;
      } else if (t === 2) {
        return i.DicePointTwoIcon;
      } else {
        return i.DicePointThreeIcon;
      }
    } else {
      return StringUtils_1.EMPTY_STRING;
    }
  }
  IsHalfPass() {
    return this.CurPoint >= RacingBetsDefine_1.RACING_BETS_MAP_POINT_COUNT / 2;
  }
}
exports.RacingBetsDungeonDangoInfo = RacingBetsDungeonDangoInfo;
//# sourceMappingURL=RacingBetsDungeonDangoInfo.js.map