"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerSoarMonitorFilter = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Criteria_1 = require("../Core/Criteria");
const EntityToLoadFilter_1 = require("./EntityToLoadFilter");
const SOAR_MAX_LOADING_ENTITY_COUNT = 1;
const SOAR_LOADING_INTERVAL = 10;
function playerSoarMonitorCriteria(e) {
  return e.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player || e.EntityType === Protocol_1.Aki.Protocol.kks.Proto_SceneItem || e.EntityType === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity || e.EntityType === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity;
}
class PlayerSoarMonitorFilter extends EntityToLoadFilter_1.EntityToLoadFilter {
  constructor() {
    super(...arguments);
    this.ROc = e => {
      this.MaxLoadingCount = e ? SOAR_MAX_LOADING_ENTITY_COUNT : EntityToLoadFilter_1.MAX_LOADING_ENTITY_COUNT;
      this.LoadingInterval = e ? SOAR_LOADING_INTERVAL : EntityToLoadFilter_1.LOADING_INTERVAL;
    };
    this.qJl = e => {
      this.Criteria = e ? playerSoarMonitorCriteria : Criteria_1.alwaysTrueCriteria;
    };
  }
  get DebugName() {
    return "PlayerSoarMonitorFilter";
  }
  Init() {
    super.Init();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayerSoarChanged, this.ROc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SlowStreamingBySoar, this.qJl);
  }
  Cleanup() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayerSoarChanged, this.ROc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SlowStreamingBySoar, this.qJl);
    super.Cleanup();
  }
}
exports.PlayerSoarMonitorFilter = PlayerSoarMonitorFilter;
//# sourceMappingURL=PlayerSoarMonitorFilter.js.map