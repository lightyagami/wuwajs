"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GongduolaSummonModel = exports.SummonPointInfo = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector");
class SummonPointInfo {
  constructor() {
    this.Key = "", this.Pos = Vector_1.Vector.Create()
  }
}
exports.SummonPointInfo = SummonPointInfo;
class GongduolaSummonModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.CancelSummonAmPath = "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_CancelSummon.AM_CancelSummon", this.SummonAmPath = "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_Summon.AM_Summon", this.lvc = "/Game/Aki/Data/Level/SummonGongduola/DA_SummonGongduolaConfig.DA_SummonGongduolaConfig", this.SummonedActorComp = void 0, this.SummonLocation = void 0, this.SummonRotation = void 0, this.SummonGravityDir = void 0, this.SummonConfig = void 0, this.BanInputReason = "SummonGongduola Ban Input", this.IsLoaded = !1
  }
  OnInit() {
    return ResourceSystem_1.ResourceSystem.LoadAsync(this.lvc, UE.BP_SummonGongduolaConfig_C, o => {
      o?.IsValid() ? (this.SummonConfig = o, this.IsLoaded = !0) : Log_1.Log.CheckError() && Log_1.Log.Error("SummonGongdola", 31, "[GongduolaSummonModel] Load Config DA Failed")
    }), !0
  }
}
exports.GongduolaSummonModel = GongduolaSummonModel;
//# sourceMappingURL=GongduolaSummonModel.js.map