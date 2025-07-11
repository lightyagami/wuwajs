"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetterTypeIconMap = exports.sortRogueBattleRoleBondUpdateInfo = exports.sortRogueBattleRoleBondInfo = undefined;
const sortRogueBattleRoleBondInfo = (e, o) => e.F6n === o.F6n ? e.Whc === o.Whc ? e.v9n - o.v9n : o.Whc - e.Whc : o.F6n - e.F6n;
exports.sortRogueBattleRoleBondInfo = sortRogueBattleRoleBondInfo;
const sortRogueBattleRoleBondUpdateInfo = (e, o) => {
  e = e.NewRoleBondInfo;
  o = o.NewRoleBondInfo;
  if (e.F6n === o.F6n) {
    if (e.Whc === o.Whc) {
      return e.v9n - o.v9n;
    } else {
      return o.Whc - e.Whc;
    }
  } else {
    return o.F6n - e.F6n;
  }
};
exports.sortRogueBattleRoleBondUpdateInfo = sortRogueBattleRoleBondUpdateInfo;
exports.fetterTypeIconMap = new Map([[0, "T_RogueFetters_03"], [1, "T_RogueFetters_02"], [2, "T_RogueFetters_01"]]); //# sourceMappingURL=RogueBattleDefine.js.map