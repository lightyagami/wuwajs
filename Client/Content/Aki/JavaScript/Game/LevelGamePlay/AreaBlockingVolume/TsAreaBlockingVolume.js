"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsAreaBlockingVolume = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
let lastLogTime = 0;
const LOG_INTERVAL = 5000;
class TsAreaBlockingVolume extends UE.TriggerBox {
  constructor() {
    super(...arguments);
    this.AreaId = 0;
  }
  Constructor() {}
  NotifyEnterArea() {
    if (Time_1.Time.PlayerTime - lastLogTime >= LOG_INTERVAL && (lastLogTime = Time_1.Time.PlayerTime, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Log", 61, "AreaBlockingVolume:进入区域" + this.AreaId);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnterAreaNotify, this.AreaId);
  }
  ReceiveHit() {
    this.NotifyEnterArea();
  }
}
exports.TsAreaBlockingVolume = TsAreaBlockingVolume;
exports.default = TsAreaBlockingVolume; //# sourceMappingURL=TsAreaBlockingVolume.js.map