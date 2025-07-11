"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityToLoadFilter = exports.LOADING_INTERVAL = exports.MAX_LOADING_ENTITY_COUNT = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Filter_1 = require("../Core/Filter");
exports.MAX_LOADING_ENTITY_COUNT = 4;
exports.LOADING_INTERVAL = 0;
class EntityToLoadFilter extends Filter_1.Filter {
  constructor() {
    super(...arguments);
    this.MOc = exports.MAX_LOADING_ENTITY_COUNT;
    this.EOc = exports.LOADING_INTERVAL;
    this.MaxLoadingDebugName = this.DebugName;
    this.LoadingIntervalDebugName = this.DebugName;
  }
  get DebugName() {
    return "EntityToLoadFilter";
  }
  get MaxLoadingCount() {
    return this.MOc;
  }
  set MaxLoadingCount(t) {
    if (this.MOc !== t) {
      this.MOc = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EntityToLoadParamUpdated, this);
    }
  }
  get LoadingInterval() {
    return this.EOc;
  }
  set LoadingInterval(t) {
    if (this.EOc !== t) {
      this.EOc = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EntityToLoadParamUpdated, this);
    }
  }
  OnInit() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EntityToLoadFilterCreated, this);
  }
  OnCleanup() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EntityToLoadFilterDestroyed, this);
  }
  static Create() {
    var t = new EntityToLoadFilter();
    t.Init();
    return t;
  }
}
exports.EntityToLoadFilter = EntityToLoadFilter;
//# sourceMappingURL=EntityToLoadFilter.js.map