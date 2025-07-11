"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityContainer = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const CustomMap_1 = require("./CustomMap");
class EntityContainer {
  constructor() {
    this.EntityMap = new CustomMap_1.CustomMap();
    this.EntityIdMap = new Map();
    this.PbDataIdMap = new Map();
  }
  AddEntity(t, e) {
    return !this.EntityMap.Contains(t) && (this.EntityMap.Set(t, e), this.EntityIdMap.set(e.Id, t), true);
  }
  RemoveEntity(t) {
    var e = this.EntityMap.Get(t);
    return !!e && (this.EntityMap.Remove(t), this.EntityIdMap.delete(e.Id), e.ConfigType === Protocol_1.Aki.Protocol.rLs.F6n && this.PbDataIdMap.delete(e.PbDataId), true);
  }
  GetEntity(t) {
    return this.EntityMap.Get(t);
  }
  ExistEntity(t) {
    return this.EntityMap.Contains(t);
  }
  GetEntityById(t) {
    t = this.EntityIdMap.get(t);
    return this.EntityMap.Get(t ?? 0);
  }
  GetEntityByPbDataId(t) {
    t = this.PbDataIdMap.get(t);
    return this.EntityMap.Get(t);
  }
  CheckSetPrefabEntity(t) {
    t = t.Entity.GetComponent(0);
    if (t.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n) {
      this.PbDataIdMap.set(t.GetPbDataId(), t.GetCreatureDataId());
    }
  }
  GetCreatureDataIdByPbDataId(t) {
    return this.PbDataIdMap.get(t);
  }
  PopEntity() {
    var t = this.EntityMap.GetByIndex(0);
    if (t) {
      this.RemoveEntity(t.CreatureDataId);
      return t;
    }
  }
  PeekEntity() {
    return this.EntityMap.GetByIndex(0);
  }
  GetAllEntities() {
    return this.EntityMap.GetItems();
  }
  Size() {
    return this.EntityMap.Size();
  }
  Clear() {
    this.EntityMap.Clear();
    this.EntityIdMap.clear();
    this.PbDataIdMap.clear();
  }
}
exports.EntityContainer = EntityContainer;
//# sourceMappingURL=EntityContainer.js.map