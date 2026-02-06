"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotSpringManorAlbumReward = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotSpringManorAlbumReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnBrochureBookItemStateUpdate, EventDefine_1.EEventName.SpringManorFunctionOpenNotify];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.SpringManorModel.CheckBookItemRedDot(0) || ModelManager_1.ModelManager.SpringManorModel.CheckBookItemRedDot(1);
  }
  OnGetParentName() {
    return "SpringManorGameEntrance";
  }
}
exports.RedDotSpringManorAlbumReward = RedDotSpringManorAlbumReward;
//# sourceMappingURL=RedDotSpringManorAlbumReward.js.map