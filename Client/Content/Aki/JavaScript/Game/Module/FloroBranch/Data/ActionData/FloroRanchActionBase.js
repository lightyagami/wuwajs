"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchActionDataBase = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchAsyncActionBase_1 = require("./FloroRanchAsyncActionBase");
class FloroRanchActionDataBase extends FloroRanchAsyncActionBase_1.FloroRanchAsyncActionBase {
  constructor(e) {
    super();
    this.ActionType = Protocol_1.Aki.Protocol.kSu.Proto_OpBuff;
    this.IsIgnoreCasterAnim = false;
    this.gFu = 0;
    this.ActionType = e.ASu;
    this.gFu = e.Vru;
  }
  SetIgnoreCasterEntityAnim(e) {
    this.IsIgnoreCasterAnim = e === this.CasterEntity.EntityId;
  }
  get CasterEntity() {
    return ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.gFu);
  }
}
exports.FloroRanchActionDataBase = FloroRanchActionDataBase;
//# sourceMappingURL=FloroRanchActionBase.js.map