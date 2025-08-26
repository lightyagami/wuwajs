"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MechanismEventLevelPrefabContext = exports.MechanismEventEntityContext = exports.MechanismEventContext = undefined;
class MechanismEventContext {}
class MechanismEventEntityContext extends (exports.MechanismEventContext = MechanismEventContext) {
  constructor(t, e, s) {
    super();
    this.EntityId = t;
    this.CreateDataId = e;
    this.PbDataId = s;
    this.ContextType = 0;
  }
}
exports.MechanismEventEntityContext = MechanismEventEntityContext;
class MechanismEventLevelPrefabContext extends MechanismEventContext {
  constructor(t, e) {
    super();
    this.PbDataId = t;
    this.LevelPrefabHandleId = e;
    this.ContextType = 1;
  }
}
exports.MechanismEventLevelPrefabContext = MechanismEventLevelPrefabContext;
//# sourceMappingURL=MechanismDefine.js.map