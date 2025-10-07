"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParallelPackageLanguageConfig = exports.ParallelPackageLanguageContent = exports.ParallelPackageUrlConfig = exports.ParallelPackageConfig = undefined;
const Json_1 = require("../../../Core/Common/Json");
class ParallelPackageConfig extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.version = 0;
    this.packageConfig = undefined;
    this.languageConfig = undefined;
  }
}
exports.ParallelPackageConfig = ParallelPackageConfig;
class ParallelPackageUrlConfig extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.packageId = "";
    this.parentVersion = "";
    this.childVersion = "";
  }
}
exports.ParallelPackageUrlConfig = ParallelPackageUrlConfig;
class ParallelPackageLanguageContent extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.title = "";
    this.content = "";
  }
}
exports.ParallelPackageLanguageContent = ParallelPackageLanguageContent;
class ParallelPackageLanguageConfig extends Json_1.JsonObjBase {}
exports.ParallelPackageLanguageConfig = ParallelPackageLanguageConfig;
//# sourceMappingURL=ParallelPackageDefine.js.map