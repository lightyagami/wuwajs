"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkRunMarkItem = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneGameplayMarkItem_1 = require("./SceneGameplayMarkItem");
class DreamLinkRunMarkItem extends SceneGameplayMarkItem_1.SceneGameplayMarkItem {
  CheckCanShowView() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityMapMarkState(Protocol_1.Aki.Protocol.uks.Proto_RogueWhiteCat, this.MarkId);
  }
}
exports.DreamLinkRunMarkItem = DreamLinkRunMarkItem;
//# sourceMappingURL=DreamLinkRunMarkItem.js.map