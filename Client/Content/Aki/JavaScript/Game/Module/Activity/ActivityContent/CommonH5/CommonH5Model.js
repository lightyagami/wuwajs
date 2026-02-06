"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonH5Model = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class CommonH5Model extends ModelBase_1.ModelBase {
  GetActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(Protocol_1.Aki.Protocol.uks.Proto_H5View);
    if (e.length > 0) {
      return e[0];
    }
  }
  OnActivityDataNotify(e) {
    var t = this.GetActivityData();
    if (t) {
      t.ChangeServerRedDotState(e.fks.qKc);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
    }
  }
  GetRedDotState() {
    var e = this.GetActivityData();
    return !!e && e.RedPointShowState;
  }
  SaveClickRedDotState() {
    var e = this.GetActivityData();
    if (e) {
      e.SaveClickRedDotState();
    }
  }
}
exports.CommonH5Model = CommonH5Model;
//# sourceMappingURL=CommonH5Model.js.map