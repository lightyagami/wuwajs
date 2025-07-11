"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityScratchTicketModel = undefined;
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
class ActivityScratchTicketModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Lol = undefined;
  }
  GetScratchTicketData() {
    return this.Lol;
  }
  SetScratchTicketData(e) {
    this.Lol = e;
  }
  GetScratchRoundData(e) {
    if (this.Lol !== undefined) {
      return this.Lol.GetRoundDataById(e);
    }
  }
  OnScratchCardCountInfoNotify(e) {
    if (this.Lol !== undefined) {
      this.Lol.UpdateAllRoundState();
      this.Lol.RefreshConditionData(e.IM_);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnScratchTicketConditionRefresh);
    }
  }
  OnScratchCardRewardResponse(e, t, i, s) {
    var r;
    if (this.Lol !== undefined && (r = this.Lol.GetRoundDataById(t)) !== undefined) {
      e = r.GetRewardResultList(e, i.vjn);
      this.Lol.UpdateCellReward(t, i);
      r = r.GetRewardDataList(i._vs);
      s(i.vjn, t, e, r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Lol.Id);
    }
  }
}
exports.ActivityScratchTicketModel = ActivityScratchTicketModel;
//# sourceMappingURL=ActivityScratchTicketModel.js.map