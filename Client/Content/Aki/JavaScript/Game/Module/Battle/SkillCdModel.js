"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillCdModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PassiveSkillCdData_1 = require("./SkillCd/PassiveSkillCdData");
const SkillCdData_1 = require("./SkillCd/SkillCdData");
class SkillCdModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.dQe = new SkillCdData_1.WorldSkillCdData();
    this.CQe = new PassiveSkillCdData_1.WorldPassiveSkillCdData();
    this.gQe = new SkillCdData_1.WorldSkillCdData();
    this.fQe = new PassiveSkillCdData_1.WorldPassiveSkillCdData();
    this.SkillDebugMode = false;
  }
  OnInit() {
    return true;
  }
  OnLeaveLevel() {
    this.gQe.Clear();
    this.fQe.Clear();
    return true;
  }
  OnClear() {
    this.dQe.Clear();
    this.CQe.Clear();
    this.gQe.Clear();
    this.fQe.Clear();
    return true;
  }
  GetCurWorldSkillCdData() {
    if (this.pQe()) {
      return this.dQe;
    } else {
      return this.gQe;
    }
  }
  GetCurWorldPassiveSkillCdData() {
    if (this.pQe()) {
      return this.CQe;
    } else {
      return this.fQe;
    }
  }
  HandlePlayerSkillInfoPbNotify(e) {
    this.dQe.HandlePlayerSkillInfoPbNotify(e);
  }
  HandlePassiveSkillNotify(e) {
    this.CQe.HandlePassiveSkillNotify(e);
  }
  pQe() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (e !== 0 && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).ShareAttri === 0) {
      return false;
    }
    return true;
  }
  GetGroupSkillCdInfoBySkillId(e, i) {
    var a = this.GetCurWorldSkillCdData();
    let t = a.AllShareSkillCdData;
    var l = t.SkillId2GroupIdMap.get(i);
    if (l || (t = a.EntitySkillCdMap.get(e)) && (l = t.SkillId2GroupIdMap.get(i))) {
      return t.GroupSkillCdInfoMap.get(l);
    } else {
      return undefined;
    }
  }
}
exports.SkillCdModel = SkillCdModel;
//# sourceMappingURL=SkillCdModel.js.map