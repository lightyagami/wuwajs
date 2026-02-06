"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvironmentalPerceptionController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Stats_1 = require("../../../Core/Common/Stats");
const Pool_1 = require("../../../Core/Container/Pool");
const EntityHelper_1 = require("../../../Core/Entity/EntityHelper");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController");
const PerceptionRange_1 = require("../../NewWorld/Common/Perception/PerceptionRange");
const PlayerPerceptionEvent_1 = require("../../NewWorld/Common/Perception/PlayerPerceptionEvent");
const CreatureModel_1 = require("../Model/CreatureModel");
const TICK_INTERNVAL = 8000;
const TICK_DAMPING_RATIO = 80;
const TICK_DAMPING_RATIO_INFIGHT = 16;
const FORCE_UPDATE_SPEED = 850;
const PERCEPTION_EVENT_POOL_CAPACITY = 32;
class EnvironmentalPerceptionController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    this.Jvr = Stats_1.Stat.Create("CheckIsPlayerInMapPolygon");
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    if (this.Lie) {
      this.Lie.RemoveTagAddOrRemoveListener(1996802261, this.v7e);
    }
    this.Lie = undefined;
    return !(this.Gce = undefined);
  }
  static OnLeaveLevel() {
    return true;
  }
  static OnTick(e) {
    this.zvr -= e * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
    if (Global_1.Global.BaseCharacter && this.Gce && this.Gce.CharacterMovement && (this.Gce.IsMoving && (this.Zvr ? this.zvr -= e * TICK_DAMPING_RATIO_INFIGHT : this.zvr -= e * TICK_DAMPING_RATIO), this.Gce.GetLastUpdateVelocity().Size() > FORCE_UPDATE_SPEED && (this.zvr = -1), this.zvr < 0)) {
      this.zvr = TICK_INTERNVAL;
      SimpleNpcController_1.SimpleNpcController.UpdateDistanceLogic();
      this.eMr();
    }
  }
  static eMr() {
    var e;
    if (!ModelManager_1.ModelManager.PlotModel.IsInPlot) {
      if ((e = Global_1.Global.BaseCharacter) && (e = e.CharacterActorComponent)) {
        this.Jvr.Start();
        e = ModelManager_1.ModelManager.MapModel.IsInMapPolygon(e.ActorLocationProxy);
        this.Jvr.Stop();
        if (e) {
          UnopenedAreaController_1.UnopenedAreaController.OnExitUnopenedArea();
        } else {
          UnopenedAreaController_1.UnopenedAreaController.OnEnterUnopenedArea();
        }
      }
    }
  }
  static InitializeEnvironment() {
    var t = UE.NewMap(UE.BuiltinName, UE.BuiltinInt);
    for (let e = 0; e < CreatureModel_1.globalEntityTypePerceptionType.length; e++) {
      t.Add(new UE.FName(EntityHelper_1.globalEntityTypeQueryName[e]), CreatureModel_1.globalEntityTypePerceptionType[e]);
    }
    t.Add(new UE.FName("CustomStabilizeLow"), 2);
    t.Add(new UE.FName("AlwaysTickHotFix"), 7);
    cpp_1.FKuroPerceptionInterface.InitializeEnvironment(3000, 3000, t, true);
  }
  static CreatePlayerPerceptionEvent() {
    var e = this.tMr.Get();
    return e || this.tMr.Create();
  }
  static DestroyPlayerPerceptionEvent(e) {
    if (e) {
      e.Clear();
      this.tMr.Put(e);
    }
  }
  static CreatePerceptionRange() {
    var e = this.iMr.Get();
    return e || this.iMr.Create();
  }
  static DestroyPerceptionRange(e) {
    if (e) {
      e.Clear();
      this.iMr.Put(e);
    }
  }
}
exports.EnvironmentalPerceptionController = EnvironmentalPerceptionController;
(_a = EnvironmentalPerceptionController).zvr = TICK_INTERNVAL;
EnvironmentalPerceptionController.Gce = undefined;
EnvironmentalPerceptionController.Lie = undefined;
EnvironmentalPerceptionController.Jvr = undefined;
EnvironmentalPerceptionController.xie = (e, t) => {
  if (_a.Lie) {
    _a.Lie.RemoveTagAddOrRemoveListener(1996802261, _a.v7e);
  }
  _a.Gce = EntitySystem_1.EntitySystem.GetComponent(e.Id, 189);
  _a.Lie = EntitySystem_1.EntitySystem.GetComponent(e.Id, 217);
  _a.Lie?.AddTagAddOrRemoveListener(1996802261, _a.v7e);
};
EnvironmentalPerceptionController.Zvr = false;
EnvironmentalPerceptionController.v7e = (e, t) => {
  _a.Zvr = t;
};
EnvironmentalPerceptionController.oMr = () => new PlayerPerceptionEvent_1.PlayerPerceptionEvent();
EnvironmentalPerceptionController.tMr = new Pool_1.Pool(PERCEPTION_EVENT_POOL_CAPACITY, _a.oMr);
EnvironmentalPerceptionController.rMr = () => new PerceptionRange_1.PerceptionRange();
EnvironmentalPerceptionController.iMr = new Pool_1.Pool(PERCEPTION_EVENT_POOL_CAPACITY, _a.rMr); //# sourceMappingURL=EnvironmentalPerceptionController.js.map