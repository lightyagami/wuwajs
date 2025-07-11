"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombatDebugDrawController = undefined;
const UE = require("ue");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const CombatDebugController_1 = require("./CombatDebugController");
class CombatDebugDrawController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.RedColor = new UE.LinearColor(1, 0, 0, 1);
    this.GreenColor = new UE.LinearColor(0, 1, 0, 1);
    this.BlueColor = new UE.LinearColor(0, 0, 1, 1);
    this.YellowColor = new UE.LinearColor(1, 1, 0, 1);
    this.EntityBoxColor = new UE.LinearColor(0.8, 0.8, 0, 0.5);
    this.EntityBoxColorInvincible = new UE.LinearColor(0.5, 0.5, 1, 1);
    this.EntityBoxColorCollisionDisabled = new UE.LinearColor(0.5, 0.5, 0.5, 0.5);
    this.EntityBoxInfoColor = new UE.LinearColor(0.8, 0.8, 1, 0.5);
    return true;
  }
  static OnTick(r) {
    this.DebugMonsterControl;
  }
}
(exports.CombatDebugDrawController = CombatDebugDrawController).DebugMonsterMovePath = false;
CombatDebugDrawController.DebugMonsterControl = false;
CombatDebugDrawController.IsDrawEntityBoxEnabled = true;
CombatDebugDrawController.IsDrawEntityBoxInfoEnabled = false;
CombatDebugDrawController.RedColor = undefined;
CombatDebugDrawController.GreenColor = undefined;
CombatDebugDrawController.BlueColor = undefined;
CombatDebugDrawController.YellowColor = undefined;
CombatDebugDrawController.EntityBoxColor = undefined;
CombatDebugDrawController.EntityBoxColorInvincible = undefined;
CombatDebugDrawController.EntityBoxColorCollisionDisabled = undefined;
CombatDebugDrawController.EntityBoxInfoColor = undefined;
CombatDebugDrawController.ggr = Vector_1.Vector.Create();
CombatDebugDrawController.fgr = Vector_1.Vector.Create();
CombatDebugDrawController.Cgr = new Map(); //# sourceMappingURL=CombatDebugDrawController.js.map