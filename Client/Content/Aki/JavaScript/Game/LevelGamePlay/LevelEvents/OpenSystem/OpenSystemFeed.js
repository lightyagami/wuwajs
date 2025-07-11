"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemFeed = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const FeedingAnimalById_1 = require("../../../../Core/Define/ConfigQuery/FeedingAnimalById");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ObjectSystem_1 = require("../../../../Core/Object/ObjectSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const LevelGeneralContextDefine_1 = require("../../LevelGeneralContextDefine");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFeed extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    var n;
    var r;
    var i;
    var o;
    return t instanceof LevelGeneralContextDefine_1.EntityContext && (o = EntitySystem_1.EntitySystem.Get(t.EntityId), ObjectSystem_1.ObjectSystem.IsValid(o) ? (n = FeedingAnimalById_1.configFeedingAnimalById.GetConfig(e.BoardId), r = new Array(), (i = {
      HandInType: "ItemIds",
      ItemIds: new Array(),
      Count: 1
    }).ItemIds = i.ItemIds.concat(n.ItemIds), r.push(i), i = "", i = o.GetComponent(117)?.PawnName ?? "", (o = o.GetComponent(171)) ? (o.InitFeedingAnimalConfig(n.ItemIds, n.GameplayTags), o.SetUiOpenPerformance(this.GetViewName(e), e.BoardId), ControllerHolder_1.ControllerHolder.ItemDeliverController.OpenItemDeliverViewByHandInItem(r, i, undefined, undefined, t)) : (Log_1.Log.CheckError() && Log_1.Log.Error("Animal", 50, "动物实体获取AnimalPerformComp失败", ["EntityId", t.EntityId]), false)) : (Log_1.Log.CheckError() && Log_1.Log.Error("Animal", 29, "无效的投喂动物对象", ["EntityId", t.EntityId]), false));
  }
  GetViewName(e) {
    return "ItemDeliverView";
  }
}
exports.OpenSystemFeed = OpenSystemFeed;
//# sourceMappingURL=OpenSystemFeed.js.map