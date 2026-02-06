"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskLookForSceneItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.OutBlackboardKey = "LookForSceneItem";
    this.DetectDistance = 0;
    this.NavigationOn = true;
    this.BotanyItem = false;
    this.MineralItem = true;
    this.DropItem = true;
    this.IsInitTsVariables = false;
    this.TsOutBlackboardKey = "";
    this.TsDetectDistance = 0;
    this.TsNavigationOn = false;
    this.TsBotanyItem = false;
    this.TsMineralItem = false;
    this.TsDropItem = false;
    this.TmpHandles = [];
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsOutBlackboardKey = "";
    this.TsDetectDistance = 0;
    this.TsNavigationOn = false;
    this.TsBotanyItem = false;
    this.TsMineralItem = false;
    this.TsDropItem = false;
    this.TmpHandles = [];
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsOutBlackboardKey = this.OutBlackboardKey;
      this.TsDetectDistance = this.DetectDistance;
      this.TsNavigationOn = this.NavigationOn;
      this.TsBotanyItem = this.BotanyItem;
      this.TsMineralItem = this.MineralItem;
      this.TsDropItem = this.DropItem;
      this.TmpHandles = [];
    }
  }
  ReceiveTickAI(i, t, s) {
    this.InitTsVariables();
    var r = i.AiController;
    if (r) {
      if (this.TsOutBlackboardKey) {
        var o = r.CharActorComp.ActorLocationProxy;
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(o, this.TsDetectDistance, 7, this.TmpHandles);
        let s = MathUtils_1.MathUtils.Square(this.DetectDistance);
        let e = undefined;
        for (const _ of this.TmpHandles) {
          if (_.Entity?.Active) {
            var h = _.Entity.GetComponent(1).ActorLocationProxy;
            var a = Vector_1.Vector.DistSquared(o, h);
            if (!(a > s)) {
              var l = _.Entity.GetComponent(0);
              var n = l.GetBaseInfo()?.Category?.CollectType;
              var l = l.GetBaseInfo()?.Category?.MainType;
              let t = false;
              if (!!(t = !(t = !(t = this.TsBotanyItem && n === "Botany" && _.Entity.GetComponent(209)?.IsOnlyCollectOption() ? true : t) && this.TsMineralItem && n === "Mineral" ? true : t) && this.TsDropItem && l === "Drop" ? true : t) && (!this.TsNavigationOn || !!AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(i, o.ToUeVector(), h.ToUeVector()))) {
                s = a;
                e = _;
              }
            }
          }
        }
        r = r.CharActorComp.Entity.Id;
        if (e) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(r, this.TsOutBlackboardKey, e.Id);
          this.FinishExecute(true);
        } else {
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(r, this.TsOutBlackboardKey);
          this.FinishExecute(false);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", i.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskLookForSceneItem;
//# sourceMappingURL=TsTaskLookForSceneItem.js.map