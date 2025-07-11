"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoinTeamModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class JoinTeamModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Ffi = 0;
  }
  SetRoleDescriptionId(e) {
    this.Ffi = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshJoinTeamRole);
  }
  GetRoleDescriptionId() {
    return this.Ffi;
  }
}
exports.JoinTeamModel = JoinTeamModel;
//# sourceMappingURL=JoinTeamModel.js.map