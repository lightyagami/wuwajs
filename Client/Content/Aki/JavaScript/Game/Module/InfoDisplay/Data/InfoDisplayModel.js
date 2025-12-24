"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimeOfDayDefine_1 = require("../../TimeOfDay/TimeOfDayDefine");
class InfoDisplayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Fsi = 0;
    this.CurrentShowAttachmentType = "Image";
    this.Vsi = "";
    this.AnimName = "";
    this.CurrentSpineAtlasPath = "";
    this.CurrentSpineDataPath = "";
  }
  GetCurrentShowAttachmentType() {
    return this.CurrentShowAttachmentType;
  }
  SetCurrentShowAttachmentType(e) {
    this.CurrentShowAttachmentType = e;
  }
  CurrentInformationId() {
    return this.Fsi;
  }
  SetCurrentOpenInformationId(e) {
    this.Fsi = e;
  }
  CurrentCurrentInformationTexture() {
    return this.Vsi;
  }
  SetCurrentOpenInformationTexture(e) {
    this.Vsi = e;
  }
  SetAnimName(e) {
    this.AnimName = e;
  }
  GetAnimName() {
    return this.AnimName;
  }
  GetCurrentShowSpineAtlasPath() {
    return this.CurrentSpineAtlasPath;
  }
  SetCurrentShowSpineAtlasPath(e) {
    this.CurrentSpineAtlasPath = e;
  }
  GetCurrentShowSpineDataPath() {
    return this.CurrentSpineDataPath;
  }
  SetCurrentShowSpineDataPath(e) {
    this.CurrentSpineDataPath = e;
  }
  static ConvertToHourMinuteString(e) {
    var t = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE);
    var e = Math.floor(e - t * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE);
    return ("0" + t).slice(-2) + ":" + ("0" + e).slice(-2);
  }
}
exports.InfoDisplayModel = InfoDisplayModel;
//# sourceMappingURL=InfoDisplayModel.js.map