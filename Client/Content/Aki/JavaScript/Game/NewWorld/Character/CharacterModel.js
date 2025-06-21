"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Lru_1 = require("../../../Core/Container/Lru"),
  PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ObjectSystem_1 = require("../../../Core/Object/ObjectSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EntityHandle_1 = require("./EntityHandle"),
  WorldEntity_1 = require("./WorldEntity"),
  ENTITY_LRU_CAPACITY = 300,
  aEntityLocation = Vector_1.Vector.Create(),
  bEntityLocation = Vector_1.Vector.Create();
class CharacterModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.nK = new Array, this.AwakeQueue = new PriorityQueue_1.PriorityQueue((e, t) => {
      var r = t[0].Priority,
        i = e[0].Priority;
      return r !== i ? r - i : (r = e[0].Valid ? e[0].Entity.GetComponent(0) : void 0, i = t[0].Valid ? t[0].Entity.GetComponent(0) : void 0, r && i ? (e = r.GetLocation(), aEntityLocation.X = e.X, aEntityLocation.Y = e.Y, aEntityLocation.Z = e.Z, t = i.GetLocation(), bEntityLocation.X = t.X, bEntityLocation.Y = t.Y, bEntityLocation.Z = t.Z, r = ModelManager_1.ModelManager.GameModeModel.RoleLocation, Vector_1.Vector.DistSquared(r, aEntityLocation) - Vector_1.Vector.DistSquared(r, bEntityLocation)) : 0)
    }), this.fKo = new Map, this.TestSoarOn = !1, this.EntityPool = new Lru_1.Lru(ENTITY_LRU_CAPACITY, e => new WorldEntity_1.WorldEntity(0, 0), void 0), this.JLc = new Array, this.ZLc = 1
  }
  get EnabledSelfCentered() {
    return 1 !== this.ZLc
  }
  SetSelfCentered(e) {
    if (e <= MathUtils_1.MathUtils.SmallNumber) Log_1.Log.CheckError() && Log_1.Log.Error("Character", 6, "Error SelfCentered TimeDilation.", ["TimeDilation", e]);
    else if (!(Math.abs(this.ZLc - e) < MathUtils_1.MathUtils.SmallNumber)) {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 6, "SelfCentered Change.", ["From", this.ZLc], ["To", e]), this.ZLc = e, ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(this.ZLc, 2);
      var t, r = new Array;
      for (const i of this.JLc) i.Valid && ((t = i.Entity?.GetComponent(122)) && t.SetForeverTimeScale(14, 1 / e), r.push(i));
      this.JLc = r
    }
  }
  OnInit() {
    return !(this.nK.length = 0)
  }
  OnClear() {
    return this.ClearData(), !0
  }
  OnLeaveLevel() {
    return this.ClearData(), !0
  }
  CreateHandle(e) {
    for (var t = e.Index; this.nK.length <= t;) this.nK.push(void 0);
    e = new EntityHandle_1.EntityHandle(e);
    return this.nK[t] = e
  }
  ClearHandle(e) {
    this.nK[e.Index] = void 0
  }
  PushAwakeHandler(e, t, r) {
    t = [e, t, r];
    this.AwakeQueue.Push(t), this.fKo.set(e, t)
  }
  PopAwakeHandler() {
    var e;
    if (!this.AwakeQueue.Empty) return e = this.AwakeQueue.Pop(), this.fKo.delete(e[0]), e
  }
  ClearData() {
    this.AwakeQueue.Clear(), this.fKo.clear()
  }
  GetHandle(e) {
    var t;
    if (e) return t = e >>> ObjectSystem_1.ObjectSystem.VersionDigit, (t = this.nK[t])?.Id === e ? t : void 0
  }
  GetHandleByEntity(e) {
    var t;
    return e && (t = this.nK[e.Index])?.Id === e.Id ? t : void 0
  }
  IsValid(e) {
    var t = e >>> ObjectSystem_1.ObjectSystem.VersionDigit;
    return this.nK[t]?.Id === e
  }
  SortItem(e) {
    e = this.fKo.get(e);
    e && this.AwakeQueue.Update(e)
  }
  AddSelfCenteredCharacter(e) {
    var t = this.GetHandleByEntity(e);
    t && (this.JLc.push(t), e.GetComponent(122)?.SetForeverTimeScale(14, 1 / this.ZLc))
  }
}
exports.CharacterModel = CharacterModel;
//# sourceMappingURL=CharacterModel.js.map