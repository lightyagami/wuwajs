"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelPrefabConfigModel = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils");
class LevelPrefabConfig {
  constructor() {
    this.CloseUroPrefab = []
  }
}
class LevelPrefabConfigModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.Lo = void 0, this.Ueh = void 0
  }
  OnInit() {
    var e = (0, puerts_1.$ref)(""),
      r = this.Reh();
    return UE.KuroStaticLibrary.LoadFileToString(e, r), r = (0, puerts_1.$unref)(e), !StringUtils_1.StringUtils.IsNothing(r) && !!(e = JSON.parse(r)) && (this.Lo = e, !0)
  }
  Reh() {
    var e;
    return void 0 === this.Ueh && (e = UE.KismetSystemLibrary.ConvertToAbsolutePath(UE.BlueprintPathsLibrary.ProjectConfigDir()), this.Ueh = UE.KismetSystemLibrary.ConvertToAbsolutePath(e + "Kuro/KuroLevelPrefabConfig.json")), this.Ueh
  }
  IsCloseUroPrefab(e) {
    return void 0 !== this.Lo && this.Lo.CloseUroPrefab.includes(e)
  }
}
exports.LevelPrefabConfigModel = LevelPrefabConfigModel;
//# sourceMappingURL=LevelPrefabConfigModel.js.map