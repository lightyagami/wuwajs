"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemRogueEventSelect = exports.OpenSystemRogueAbilitySelect = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRogueAbilitySelect extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    ModelManager_1.ModelManager.RoguelikeModel.CurIndex = e.BoardId;
    return ControllerHolder_1.ControllerHolder.RoguelikeController.OpenBuffSelectViewById(e.BoardId);
  }
  GetViewName(e, r) {
    e = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(e.BoardId);
    return ControllerHolder_1.ControllerHolder.RoguelikeController.GetViewNameByGainType(e.RoguelikeGainDataType);
  }
}
exports.OpenSystemRogueAbilitySelect = OpenSystemRogueAbilitySelect;
class OpenSystemRogueEventSelect extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    ModelManager_1.ModelManager.RoguelikeModel.CurIndex = Protocol_1.Aki.Protocol.s8s.Proto_EventBindId;
    return ControllerHolder_1.ControllerHolder.RoguelikeController.OpenBuffSelectViewById(Protocol_1.Aki.Protocol.s8s.Proto_EventBindId);
  }
  GetViewName(e, r) {
    return "RoguelikeRandomEventView";
  }
}
exports.OpenSystemRogueEventSelect = OpenSystemRogueEventSelect;
//# sourceMappingURL=OpenSystemRogueAbilitySelect.js.map