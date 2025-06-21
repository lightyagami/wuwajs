"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleData = void 0;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class PhantomArenaBattleData {
  constructor() {
    this.Nx1 = new Map, this.Vx1 = new Map, this.oU1 = new Map, this.PlayerDeduceLife = 0, this.PlayerCurLife = 0, this.NpcDeduceLife = 0, this.NpcCurLife = 0, this.PrepareLoadingPromise = void 0, this.nU1 = (t, i) => {
      t = this.oU1.get(t), i = this.oU1.get(i);
      return t.ConfigCost === i.ConfigCost ? -1 : i.ConfigCost - t.ConfigCost
    }
  }
  SetNpcMonsterEntityData(t) {
    this.Nx1.clear();
    for (const e of Object.keys(t)) {
      var i = Number(e),
        s = MathUtils_1.MathUtils.LongToNumber(t[e]),
        i = (this.Nx1.set(i, s), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataByFightId(i));
      this.oU1.set(s, i)
    }
  }
  SetPlayerEntityData(t) {
    this.Vx1.clear();
    for (const e of Object.keys(t)) {
      var i = Number(e),
        s = MathUtils_1.MathUtils.LongToNumber(t[e]),
        i = (this.Vx1.set(i, s), ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetCardDataByFightId(i));
      this.oU1.set(s, i)
    }
  }
  GetNpcEntityIdList() {
    var t = [];
    for (const i of this.Nx1.values()) t.push(i);
    return t
  }
  GetPlayerEntityIdList() {
    var t = [];
    for (const i of this.Vx1.values()) t.push(i);
    return t
  }
  GetPlayerEntityIdListBySort() {
    var t = this.GetPlayerEntityIdList();
    return t.sort(this.nU1), t
  }
  GetNpcEntityIdListBySort() {
    var t = this.GetNpcEntityIdList();
    return t.sort(this.nU1), t
  }
  GetAllEntityIdList() {
    return [...this.GetNpcEntityIdList(), ...this.GetPlayerEntityIdList()]
  }
  GetCardDataByEntityId(t) {
    return this.oU1.get(t)
  }
  CreatePrepareLoadingPromise() {
    this.PrepareLoadingPromise = new CustomPromise_1.CustomPromise
  }
  FinishPrepareLoadingPromise() {
    this.PrepareLoadingPromise?.SetResult(void 0), this.PrepareLoadingPromise = void 0
  }
  Clear() {
    this.Nx1.clear(), this.Vx1.clear(), this.oU1.clear(), this.PlayerDeduceLife = 0, this.PlayerCurLife = 0, this.NpcDeduceLife = 0, this.NpcCurLife = 0
  }
}
exports.PhantomArenaBattleData = PhantomArenaBattleData;
//# sourceMappingURL=PhantomArenaBattleData.js.map