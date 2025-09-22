"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPrefabConfigModel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
class LevelPrefabConfig {
  constructor() {
    this.CloseUroPrefab = [];
  }
}
class LevelPrefabConfigModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Ueh = undefined;
  }
  OnInit() {
    var e = (0, puerts_1.$ref)("");
    var r = this.Reh();
    UE.KuroStaticLibrary.LoadFileToString(e, r);
    e = (0, puerts_1.$unref)(e);
    return !StringUtils_1.StringUtils.IsNothing(e) && ((e = JSON.parse(e)) ? this.Lo = e : Log_1.Log.CheckError() && Log_1.Log.Error("Config", 31, "Failed to parse LevelPrefabConfig.json", ["Path", r]), true);
  }
  Reh() {
    var e;
    if (this.Ueh === undefined) {
      e = UE.KismetSystemLibrary.ConvertToAbsolutePath(UE.BlueprintPathsLibrary.ProjectConfigDir());
      this.Ueh = UE.KismetSystemLibrary.ConvertToAbsolutePath(e + "Kuro/KuroLevelPrefabConfig.json");
    }
    return this.Ueh;
  }
  IsCloseUroPrefab(e) {
    return this.Lo !== undefined && this.Lo.CloseUroPrefab.includes(e);
  }
}
exports.LevelPrefabConfigModel = LevelPrefabConfigModel;
//# sourceMappingURL=LevelPrefabConfigModel.js.map