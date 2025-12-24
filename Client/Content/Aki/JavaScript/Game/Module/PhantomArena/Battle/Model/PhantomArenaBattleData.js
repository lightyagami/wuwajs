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
    this.PrepareLoadingPromise = undefined;
    this.UU1 = (t, e) => {
      t = this.DU1.get(t);
      e = this.DU1.get(e);
      if (t.ConfigCost === e.ConfigCost) {
        return -1;
      } else {
        return e.ConfigCost - t.ConfigCost;
      }
    };
  }
  SetNpcMonsterEntityData(t) {
    this.gD1.clear();
    for (const i of Object.keys(t)) {
      var e = Number(i);
      var r = MathUtils_1.MathUtils.LongToNumber(t[i]);
      this.gD1.set(e, r);
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataByFightId(e);
      this.DU1.set(r, e);
    }
  }
  SetPlayerEntityData(t) {
    this.CD1.clear();
    for (const i of Object.keys(t)) {
      var e = Number(i);
      var r = MathUtils_1.MathUtils.LongToNumber(t[i]);
      this.CD1.set(e, r);
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetCardDataByFightId(e);
      this.DU1.set(r, e);
    }
  }
  GetNpcEntityIdList() {
    var t = [];
    for (const e of this.gD1.values()) {
      t.push(e);
    }
    return t;
  }
  GetPlayerEntityIdList() {
    var t = [];
    for (const e of this.CD1.values()) {
      t.push(e);
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
  }
}
exports.PhantomArenaBattleData = PhantomArenaBattleData;
//# sourceMappingURL=PhantomArenaBattleData.js.map