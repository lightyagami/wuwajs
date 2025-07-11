"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleData = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class PhantomArenaBattleData {
  constructor() {
    this.gD1 = new Map();
    this.CD1 = new Map();
    this.DU1 = new Map();
    this.PlayerDeduceLife = 0;
    this.PlayerCurLife = 0;
    this.NpcDeduceLife = 0;
    this.NpcCurLife = 0;
    this.PrepareLoadingPromise = undefined;
    this.UU1 = (t, i) => {
      t = this.DU1.get(t);
      i = this.DU1.get(i);
      if (t.ConfigCost === i.ConfigCost) {
        return -1;
      } else {
        return i.ConfigCost - t.ConfigCost;
      }
    };
  }
  SetNpcMonsterEntityData(t) {
    this.gD1.clear();
    for (const e of Object.keys(t)) {
      var i = Number(e);
      var s = MathUtils_1.MathUtils.LongToNumber(t[e]);
      this.gD1.set(i, s);
      var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataByFightId(i);
      this.DU1.set(s, i);
    }
  }
  SetPlayerEntityData(t) {
    this.CD1.clear();
    for (const e of Object.keys(t)) {
      var i = Number(e);
      var s = MathUtils_1.MathUtils.LongToNumber(t[e]);
      this.CD1.set(i, s);
      var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetCardDataByFightId(i);
      this.DU1.set(s, i);
    }
  }
  GetNpcEntityIdList() {
    var t = [];
    for (const i of this.gD1.values()) {
      t.push(i);
    }
    return t;
  }
  GetPlayerEntityIdList() {
    var t = [];
    for (const i of this.CD1.values()) {
      t.push(i);
    }
    return t;
  }
  GetPlayerEntityIdListBySort() {
    var t = this.GetPlayerEntityIdList();
    t.sort(this.UU1);
    return t;
  }
  GetNpcEntityIdListBySort() {
    var t = this.GetNpcEntityIdList();
    t.sort(this.UU1);
    return t;
  }
  GetAllEntityIdList() {
    return [...this.GetNpcEntityIdList(), ...this.GetPlayerEntityIdList()];
  }
  GetCardDataByEntityId(t) {
    return this.DU1.get(t);
  }
  CreatePrepareLoadingPromise() {
    this.PrepareLoadingPromise = new CustomPromise_1.CustomPromise();
  }
  FinishPrepareLoadingPromise() {
    this.PrepareLoadingPromise?.SetResult(undefined);
    this.PrepareLoadingPromise = undefined;
  }
  Clear() {
    this.gD1.clear();
    this.CD1.clear();
    this.DU1.clear();
    this.PlayerDeduceLife = 0;
    this.PlayerCurLife = 0;
    this.NpcDeduceLife = 0;
    this.NpcCurLife = 0;
  }
}
exports.PhantomArenaBattleData = PhantomArenaBattleData;
//# sourceMappingURL=PhantomArenaBattleData.js.map