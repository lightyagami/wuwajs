"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectGlobal = undefined;
const Vector_1 = require("../../../Core/Utils/Math/Vector");
class EffectGlobal {}
(exports.EffectGlobal = EffectGlobal).EnableSpawnLog = true;
EffectGlobal.GlobalGamePaused = false;
EffectGlobal.LastCameraLocation = Vector_1.Vector.Create(0, 0, 0);
EffectGlobal.CameraLocation = Vector_1.Vector.Create(0, 0, 0);
EffectGlobal.HasPlayer0 = false;
EffectGlobal.GlobalTimeDilation = 1;
EffectGlobal.AllowEffectOutPool = true;
EffectGlobal.AllowEffectInPool = true;
EffectGlobal.SceneObjectWaterEffectShowDebugTrace = false;
EffectGlobal.SceneObjectAirWallEffectShowDebugTrace = false;
EffectGlobal.CgMode = false; //# sourceMappingURL=EffectGlobal.js.map