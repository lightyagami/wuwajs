"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventMoveJigsawItem = undefined;
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventMoveJigsawItem extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
  }
  ExecuteNew(e, t) {
    if (e) {
      this.Lo = e.Config;
      (e = []).push(this.Lo.ItemEntityId);
      e.push(this.Lo.FoundationEntityId);
      this.CreateWaitEntityTask(e);
    } else {
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.Lo.ItemEntityId);
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.Lo.FoundationEntityId);
    var s = e.Entity.GetComponent(206);
    if (s) {
      if (e && t) {
        var n = e.Entity.GetComponent(142);
        var i = t.Entity.GetComponent(141);
        if (n && i) {
          var o = n.PutDownBase;
          if (o) {
            const a = o.Entity.GetComponent(165);
            const r = a?.Config.Config.Type ?? IComponent_1.EItemFoundation.BuildingBlock;
            o.PickUpItem(n, n.PutDownIndex, r);
          }
          o = new SceneItemJigsawBaseComponent_1.JigsawIndex(this.Lo.Destination.RowIndex, this.Lo.Destination.ColumnIndex);
          const a = t.Entity.GetComponent(165);
          const r = a?.Config.Config.Type ?? IComponent_1.EItemFoundation.BuildingBlock;
          i.PutDownItem(n, o, r);
          t = i.GetBlockLocationByIndex(o);
          s.SetActorLocation(t.ToUeVector(), "LevelEventMoveJigsawItem");
          s = e.Entity.GetComponent(162);
          if (s) {
            s.CollectSampleAndSend(true);
          }
          i.RequestMoveItem(n, o);
          i.CheckFinish();
          this.FinishExecute(true);
        } else {
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    }
  }
}
exports.LevelEventMoveJigsawItem = LevelEventMoveJigsawItem;
//# sourceMappingURL=LevelEventMoveJigsawItem.js.map