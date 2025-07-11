"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GongduolaSummonModel = exports.SummonPointInfo = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
class SummonPointInfo {
  constructor() {
    this.Key = "";
    this.Pos = Vector_1.Vector.Create();
  }
}
exports.SummonPointInfo = SummonPointInfo;
class GongduolaSummonModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CancelSummonAmPath = "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_CancelSummon.AM_CancelSummon";
    this.SummonAmPath = "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_Summon.AM_Summon";
    this.lvc = "/Game/Aki/Data/Level/SummonGongduola/DA_SummonGongduolaConfig.DA_SummonGongduolaConfig";
    this.SummonedActorComp = undefined;
    this.SummonLocation = undefined;
    this.SummonRotation = undefined;
    this.SummonGravityDir = undefined;
    this.SummonConfig = undefined;
    this.BanInputReason = "SummonGongduola Ban Input";
    this.IsLoaded = false;
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadAsync(this.lvc, UE.BP_SummonGongduolaConfig_C, o => {
      if (o?.IsValid()) {
        this.SummonConfig = o;
        this.IsLoaded = true;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SummonGongdola", 31, "[GongduolaSummonModel] Load Config DA Failed");
      }
    });
    return true;
  }
}
exports.GongduolaSummonModel = GongduolaSummonModel;
//# sourceMappingURL=GongduolaSummonModel.js.map