"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityActionData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchAsyncActionBase_1 = require("./FloroRanchAsyncActionBase");
class FloroRanchEntityActionData extends FloroRanchAsyncActionBase_1.FloroRanchAsyncActionBase {
  constructor(t, a) {
    super();
    this.EntityData = undefined;
    this.OperateType = undefined;
    this.OperateType = t;
    this.EntityData = a;
  }
  async OnExecute() {
    if (this.OperateType === Protocol_1.Aki.Protocol.VSu.Proto_UnitOpAdd) {
      await this.AddEntityAction();
    } else if (this.OperateType === Protocol_1.Aki.Protocol.VSu.Proto_UnitOpRemove) {
      await this.RemoveEntityAction();
    } else if (this.OperateType === Protocol_1.Aki.Protocol.VSu.Proto_UnitReplace) {
      await this.ReplaceEntityAction();
    } else {
      await this.ChangeEntityAction();
    }
  }
  async AddEntityAction() {
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.AddEntity(this.EntityData);
    var a = t.GetUiItemComponent();
    if (a && t.CheckGetComponent(0).Point >= 0) {
      await a.PlayShowAnim();
    }
  }
  async RemoveEntityAction() {
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.EntityData.Tru);
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemoveOwnEntityData(t);
    var t = t.GetUiItemComponent();
    if (t) {
      await t.PlayHideAnim();
    }
  }
  async ChangeEntityAction() {
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.EntityData.Tru);
    t.RefreshEntityData(this.EntityData);
    await t.GetUiItemComponent().PlayShowAnim();
  }
  async ReplaceEntityAction() {
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.EntityData.Tru);
    await t.GetUiItemComponent().PlayHideAnim();
    t.RefreshEntityData(this.EntityData);
    await t.GetUiItemComponent().PlayShowAnim();
  }
}
exports.FloroRanchEntityActionData = FloroRanchEntityActionData;
//# sourceMappingURL=FloroRanchEntityActionData.js.map