"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MotorAttrAll_1 = require("../../../../Core/Define/ConfigQuery/MotorAttrAll");
const MotorAttrById_1 = require("../../../../Core/Define/ConfigQuery/MotorAttrById");
const MotorEffectById_1 = require("../../../../Core/Define/ConfigQuery/MotorEffectById");
const MotorLevelHintAll_1 = require("../../../../Core/Define/ConfigQuery/MotorLevelHintAll");
const MotorLvlAll_1 = require("../../../../Core/Define/ConfigQuery/MotorLvlAll");
const MotorLvlByLevel_1 = require("../../../../Core/Define/ConfigQuery/MotorLvlByLevel");
const MotorTaskById_1 = require("../../../../Core/Define/ConfigQuery/MotorTaskById");
const MotorTaskByTreeType_1 = require("../../../../Core/Define/ConfigQuery/MotorTaskByTreeType");
const MotorTechById_1 = require("../../../../Core/Define/ConfigQuery/MotorTechById");
const MotorTechByTreeType_1 = require("../../../../Core/Define/ConfigQuery/MotorTechByTreeType");
const MotorTechLvById_1 = require("../../../../Core/Define/ConfigQuery/MotorTechLvById");
const MotorTechTagById_1 = require("../../../../Core/Define/ConfigQuery/MotorTechTagById");
const MotorTechTreeAll_1 = require("../../../../Core/Define/ConfigQuery/MotorTechTreeAll");
const MotorTechTreeById_1 = require("../../../../Core/Define/ConfigQuery/MotorTechTreeById");
const TrialMotorById_1 = require("../../../../Core/Define/ConfigQuery/TrialMotorById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class MotorConfig extends ConfigBase_1.ConfigBase {
  GetAllMotorLevelList() {
    var o = MotorLvlAll_1.configMotorLvlAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 43, "MotorLevel表无效All");
      }
      return [];
    } else {
      return o;
    }
  }
  GetMotorLevelConfig(o) {
    var e = MotorLvlByLevel_1.configMotorLvlByLevel.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "MotorLevel表无效Level", ["level", o]);
    }
  }
  GetAllMotorLevelHintList() {
    var o = MotorLevelHintAll_1.configMotorLevelHintAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 43, "MotorLevelHint表无效All");
      }
      return [];
    } else {
      return o;
    }
  }
  GetMotorTechTreeConfig(o) {
    var e = MotorTechTreeById_1.configMotorTechTreeById.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "MotorTechTree表无效TreeType", ["treeType", o]);
    }
  }
  GetAllMotorTreeIds() {
    var o = [];
    var e = MotorTechTreeAll_1.configMotorTechTreeAll.GetConfigList();
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 43, "MotorTechTree表无效All");
      }
      return [];
    }
    for (const r of e) {
      o.push(r.Id);
    }
    return o;
  }
  GetMotorTechConfigList(o) {
    var e = MotorTechByTreeType_1.configMotorTechByTreeType.GetConfigList(o);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 43, "MotorTech表无效TreeType", ["treeType", o]);
      }
      return [];
    } else {
      return e;
    }
  }
  GetMotorTechConfig(o) {
    var e = MotorTechById_1.configMotorTechById.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "MotorTech表无效Id", ["id", o]);
    }
  }
  GetMotorTechTagConfig(o) {
    var e = MotorTechTagById_1.configMotorTechTagById.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "MotorTechTag表无效Id", ["tagId", o]);
    }
  }
  GetMotorTechLvConfig(o) {
    var e = MotorTechLvById_1.configMotorTechLvById.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "MotorTechLv表无效Id", ["id", o]);
    }
  }
  GetMotorEffectConfig(o) {
    var e = MotorEffectById_1.configMotorEffectById.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "MotorEffect表无效Id", ["id", o]);
    }
  }
  GetMotorTaskConfig(o) {
    var e = MotorTaskById_1.configMotorTaskById.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "MotorTask表无效Id", ["taskId", o]);
    }
  }
  GetMotorTaskConfigList(o) {
    var e = MotorTaskByTreeType_1.configMotorTaskByTreeType.GetConfigList(o);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 43, "MotorTask表无效TreeType", ["treeType", o]);
      }
      return [];
    } else {
      return e;
    }
  }
  GetMotorAttrConfig(o) {
    var e = MotorAttrById_1.configMotorAttrById.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "MotorAttr表无效Id", ["id", o]);
    }
  }
  GetAllMotorAttrList() {
    var o = MotorAttrAll_1.configMotorAttrAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 43, "MotorAttr表无效All");
      }
      return [];
    } else {
      return o;
    }
  }
  GetTrialMotorConfig(o) {
    var e = TrialMotorById_1.configTrialMotorById.GetConfig(o);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 43, "TrialMotor表无效Id", ["Id", o]);
    }
  }
}
exports.MotorConfig = MotorConfig;
//# sourceMappingURL=MotorConfig.js.map