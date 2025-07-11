"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetFlowTemplate = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbCameraPosAndRot_1 = require("./FbCameraPosAndRot");
const FbCameraSetting_1 = require("./FbCameraSetting");
const FbFlowActorIndexData_1 = require("./FbFlowActorIndexData");
const FbFlowTemplateMode_1 = require("./FbFlowTemplateMode");
const FbPosAndRot_1 = require("./FbPosAndRot");
const FbSetCameraAnim_1 = require("./FbSetCameraAnim");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSetFlowTemplate {
  constructor(t) {
    this.FbDataInternal = t;
    this.ogh = false;
    this.ngh = false;
    this.sfh = false;
    this.afh = undefined;
    this.hfh = false;
    this.lfh = undefined;
    this.Jgh = false;
    this.Zgh = undefined;
    this._fh = false;
    this.cfh = undefined;
    this.ufh = false;
    this.dfh = undefined;
    this.mfh = false;
    this.Cfh = undefined;
    this.gfh = false;
    this.ffh = undefined;
    this.pfh = false;
    this.vfh = undefined;
    this.Gfh = false;
    this.Ofh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSetFlowTemplate(t);
    }
  }
  get _folded() {
    if (!this.ogh) {
      this.ogh = true;
      this.ngh = this.FbDataInternal.folded();
    }
    return this.ngh;
  }
  get TemplateMode() {
    if (!this.sfh) {
      this.sfh = true;
      this.afh = FbFlowTemplateMode_1.FbFlowTemplateMode.Create(this.FbDataInternal.templateMode());
    }
    return this.afh;
  }
  get TargetPos() {
    if (!this.hfh) {
      this.hfh = true;
      this.lfh = FbPosAndRot_1.FbPosAndRot.Create(this.FbDataInternal.targetPos());
    }
    return this.lfh;
  }
  get CameraAnim() {
    if (!this.Jgh) {
      this.Jgh = true;
      this.Zgh = FbSetCameraAnim_1.FbSetCameraAnim.Create(this.FbDataInternal.cameraAnim());
    }
    return this.Zgh;
  }
  get CameraOffset() {
    if (!this._fh) {
      this._fh = true;
      this.cfh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.cameraOffset());
    }
    return this.cfh;
  }
  get CameraRotate() {
    if (!this.ufh) {
      this.ufh = true;
      this.dfh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.cameraRotate());
    }
    return this.dfh;
  }
  get CameraPosAndRot() {
    if (!this.mfh) {
      this.mfh = true;
      this.Cfh = FbCameraPosAndRot_1.FbCameraPosAndRot.Create(this.FbDataInternal.cameraPosAndRot());
    }
    return this.Cfh;
  }
  get CameraSetting() {
    if (!this.gfh) {
      this.gfh = true;
      this.ffh = FbCameraSetting_1.FbCameraSetting.Create(this.FbDataInternal.cameraSetting());
    }
    return this.ffh;
  }
  get ActorIndexArray() {
    if (!this.pfh) {
      this.pfh = true;
      this.vfh = new Array();
      var e = this.FbDataInternal.actorIndexArrayLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.actorIndexArray(t, new fb_action_1.FlowActorIndexData());
          this.vfh.push(FbFlowActorIndexData_1.FbFlowActorIndexData.Create(i));
        }
      }
    }
    return this.vfh;
  }
  get DelayTime() {
    if (!this.Gfh) {
      this.Gfh = true;
      this.Ofh = this.FbDataInternal.delayTime();
    }
    return this.Ofh;
  }
}
exports.FbSetFlowTemplate = FbSetFlowTemplate;
//# sourceMappingURL=FbSetFlowTemplate.js.map