"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalkingPatternBehaviorNode = undefined;
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const GlobalConfigFromCsvByName_1 = require("../../../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const GameSplineUtils_1 = require("../../../../LevelGamePlay/Common/GameSplineUtils");
const TsGameSplineActor_1 = require("../../../../LevelGamePlay/Common/TsGameSplineActor");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TimeOfDayController_1 = require("../../../TimeOfDay/TimeOfDayController");
const GeneralLogicTreeDefine_1 = require("../../Define/GeneralLogicTreeDefine");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil");
const TickBehaviorNode_1 = require("./TickBehaviorNode");
class WalkingPatternBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments);
    this.Hnr = undefined;
    this.zie = undefined;
    this.qsh = undefined;
    this.ksh = 0;
    this.Nsh = 0;
    this.r$t = false;
    this.Fsh = 0;
    this.Hln = 0;
    this.Wlh = 0;
    this.Vsh = 0;
    this.wdt = -1;
    this.Qlh = -1;
    this.Nme = Vector_1.Vector.Create();
    this.Hsh = Vector_1.Vector.Create();
    this.Etn = e => {
      var t;
      if (e && !this.r$t && (this.r$t = true, t = this.Nsh / this.ksh, this.Vsh = 0, t >= this.Fsh && t <= this.Hln ? this.Vsh = 100 - (t - this.Fsh) / (this.Hln - this.Fsh) * 100 : t < this.Fsh ? this.Vsh = 100 : this.Vsh = 0, this.Vsh = Math.min(this.Vsh, this.Qlh / this.wdt * 100), e)) {
        this.SubmitNode();
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    if (!super.OnCreate(e)) {
      return false;
    }
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.WalkingPattern) {
      return false;
    }
    this.Hnr = ActorSystem_1.ActorSystem.Get(TsGameSplineActor_1.default.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    this.zie = GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(e.SplineEntityId, this.Hnr);
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e.SplineEntityId);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 31, "[WalkingPatternBehaviorNode]找不到entityData", ["SplineEntityId", e.SplineEntityId]);
      }
      return false;
    }
    if ((0, IComponent_1.getComponent)(t.ComponentsData, "SplineComponent") === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 31, "[WalkingPatternBehaviorNode]找不到SplineComponent", ["SplineEntityId", e.SplineEntityId]);
      }
      return false;
    }
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EndEntityId);
    if (!t?.Valid || !t.Entity?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 31, "[WalkingPatternBehaviorNode]找不到EndEntity", ["EndEntityId", e.EndEntityId]);
      }
      return false;
    }
    this.qsh = t.Entity;
    e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("WalkingPattern.MinDist");
    if (e) {
      this.Fsh = parseInt(e.Value);
    }
    if (e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("WalkingPattern.MaxDist")) {
      this.Hln = parseInt(e.Value);
    }
    if (e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("WalkingPattern.CheckPointDist")) {
      this.Wlh = parseInt(e.Value);
    }
    return true;
  }
  OnStart(e) {
    super.OnStart(e);
    if (this.qsh !== undefined) {
      EventSystem_1.EventSystem.AddWithTarget(this.qsh, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
    }
    this.ksh = 0;
    this.Nsh = 0;
    this.r$t = false;
    this.wdt = this.zie?.GetNumberOfSplinePoints() ?? -1;
    this.Qlh = 0;
  }
  OnTick(e) {
    var t;
    if (!this.Submitting) {
      if ((t = Global_1.Global.BaseCharacter) !== undefined) {
        this.Nme.FromUeVector(t.D_K2_GetActorLocation());
        this.Klh();
        this.Wsh();
      }
    }
  }
  OnEnd(e) {
    if (this.Hnr !== undefined) {
      ActorSystem_1.ActorSystem.Put("WalkingPatternBehaviorNode.OnEnd", this.Hnr);
      this.Hnr = undefined;
    }
    if (this.qsh !== undefined && EventSystem_1.EventSystem.HasWithTarget(this.qsh, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.qsh, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Etn);
    }
  }
  Klh() {
    var e;
    var t;
    if (this.zie !== undefined && !(this.Qlh >= this.wdt)) {
      e = MathUtils_1.MathUtils.Clamp(this.Qlh, 0, this.wdt - 1);
      t = Vector_1.Vector.Create(this.zie?.D_GetLocationAtSplinePoint(e, 1));
      if (Vector_1.Vector.Dist2D(this.Nme, t) < this.Wlh) {
        this.Qlh = e + 1;
      }
    }
  }
  Wsh() {
    var e;
    if (this.zie !== undefined) {
      this.Hsh.FromUeVector(this.zie.D_FindLocationClosestToWorldLocation(this.Nme.ToUeVector(), 1));
      e = Vector_1.Vector.Dist2D(this.Nme, this.Hsh);
      this.Nsh += e;
      this.ksh++;
    }
  }
  SubmitNode() {
    var e;
    var t;
    if (!this.Blackboard.ContainTag(6) && !this.Blackboard.IsSuspend()) {
      this.OnBeforeSubmit();
      if (e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetNodeConfig(this.Context.BtType, this.Context.TreeConfigId, this.Context.NodeId)) {
        if (e.Type !== "ChildQuest") {
          this.OnAfterSubmit(false);
        } else if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(e.Condition.PreConditions, undefined)) {
          TimeOfDayController_1.TimeOfDayController.SyncServerGameTime(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second);
          e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(this.Context.TreeIncId);
          (t = Protocol_1.Aki.Protocol.aC_.create()).d9n = e ?? 0;
          t.C9n = MathUtils_1.MathUtils.BigIntToLong(this.Context.TreeIncId);
          t.b5n = this.Context.NodeId;
          t.Eps = this.Vsh;
          Net_1.Net.Call(26695, t, e => {
            this.OnAfterSubmit(e?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs);
            if (e?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15996);
            }
          });
        } else {
          e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(Protocol_1.Aki.Protocol.Q4n.Proto_ErrPreCondition);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("GeneralLogicTree", 31, e);
          }
          this.OnAfterSubmit(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 31, "提交节点失败，找不到节点配置", ["TreeType", GeneralLogicTreeDefine_1.btTypeLogString[this.Context.BtType]], ["TreeId", this.Context.TreeConfigId], ["NodeId", this.Context.NodeId]);
        }
        this.OnAfterSubmit(false);
      }
    }
  }
}
exports.WalkingPatternBehaviorNode = WalkingPatternBehaviorNode;
//# sourceMappingURL=WalkingPatternBehaviorNode.js.map