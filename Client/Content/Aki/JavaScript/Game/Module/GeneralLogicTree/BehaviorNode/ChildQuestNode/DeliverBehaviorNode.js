"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeliverBehaviorNode = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ItemDeliverController_1 = require("../../../ItemDeliver/ItemDeliverController");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class DeliverBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments);
    this.FXt = 0;
    this.VXt = undefined;
    this.HXt = undefined;
    this.jXt = undefined;
    this.ts = "";
    this.HGe = undefined;
    this.CanRepeat = false;
    this.PXt = [];
    this.WXt = t => {
      if (this.VXt && this.VXt.Option.Guid === t) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.FXt);
        if (t) {
          let e = "";
          if (t) {
            e = t.Entity.GetComponent(121)?.PawnName ?? "";
          }
          if (this.HXt) {
            ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInItem(this.HXt, e, this.HGe, this.ts, this.Context);
          } else if (this.jXt) {
            ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInGroup(this.jXt, e, this.HGe, this.ts, this.Context);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 58, "交付道具的NPC不存在", ["实体Id", this.FXt]);
        }
      }
    };
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    var t;
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.HandInItems && ((t = e.AddOption).Option.Type.Type !== "Actions" ? (Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "交付道具任务配置的交互类型错误，应配置行为序列类型的交互"), false) : (this.HXt = e.HandInItems.Items, this.jXt = e.HandInItems.GroupConfig, this.ts = e.HandInItems.TidDescText, this.HGe = e.HandInItems.TidTitleText, this.CanRepeat = e.HandInItems.RepeatItems, this.FXt = t.EntityId, this.VXt = t, this.PXt = [t.EntityId], true));
  }
  OnDestroy() {
    this.VXt = undefined;
    this.HXt = undefined;
    super.OnDestroy();
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DynamicInteractServerResponse, this.WXt);
  }
  RemoveEventsOnChildQuestEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DynamicInteractServerResponse, this.WXt);
    super.RemoveEventsOnChildQuestEnd();
  }
}
exports.DeliverBehaviorNode = DeliverBehaviorNode;
//# sourceMappingURL=DeliverBehaviorNode.js.map