"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableModulePlayerOperation = undefined;
const UnionCameraOperationHelper_1 = require("./UnionCameraOperationHelper");
const UnionMoveOperationHelper_1 = require("./UnionMoveOperationHelper");
const UnionSceneInteractionOperationHelper_1 = require("./UnionSceneInteractionOperationHelper");
const UnionSkillOperationHelper_1 = require("./UnionSkillOperationHelper");
const UnionUiOperationHelper_1 = require("./UnionUiOperationHelper");
class FbDisableModulePlayerOperation {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.qyh = false;
    this.kyh = undefined;
    this.Gyh = false;
    this.Oyh = undefined;
    this.Fyh = false;
    this.Nyh = undefined;
    this.Vyh = false;
    this.jyh = undefined;
    this.Hyh = false;
    this.Wyh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbDisableModulePlayerOperation(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MoveOption() {
    var e;
    var i;
    if (!this.qyh && (this.qyh = true, e = this.FbDataInternal.moveOptionType(), i = UnionMoveOperationHelper_1.UnionMoveOperationHelper.GetUnionMoveOperationObject(e))) {
      this.kyh = UnionMoveOperationHelper_1.UnionMoveOperationHelper.ReadUnionMoveOperation(e, this.FbDataInternal.moveOption(i));
    }
    return this.kyh;
  }
  get SkillOption() {
    var e;
    var i;
    if (!this.Gyh && (this.Gyh = true, e = this.FbDataInternal.skillOptionType(), i = UnionSkillOperationHelper_1.UnionSkillOperationHelper.GetUnionSkillOperationObject(e))) {
      this.Oyh = UnionSkillOperationHelper_1.UnionSkillOperationHelper.ReadUnionSkillOperation(e, this.FbDataInternal.skillOption(i));
    }
    return this.Oyh;
  }
  get CameraOption() {
    var e;
    var i;
    if (!this.Fyh && (this.Fyh = true, e = this.FbDataInternal.cameraOptionType(), i = UnionCameraOperationHelper_1.UnionCameraOperationHelper.GetUnionCameraOperationObject(e))) {
      this.Nyh = UnionCameraOperationHelper_1.UnionCameraOperationHelper.ReadUnionCameraOperation(e, this.FbDataInternal.cameraOption(i));
    }
    return this.Nyh;
  }
  get UiOption() {
    var e;
    var i;
    if (!this.Vyh && (this.Vyh = true, e = this.FbDataInternal.uiOptionType(), i = UnionUiOperationHelper_1.UnionUiOperationHelper.GetUnionUiOperationObject(e))) {
      this.jyh = UnionUiOperationHelper_1.UnionUiOperationHelper.ReadUnionUiOperation(e, this.FbDataInternal.uiOption(i));
    }
    return this.jyh;
  }
  get SceneInteractionOption() {
    var e;
    var i;
    if (!this.Hyh && (this.Hyh = true, e = this.FbDataInternal.sceneInteractionOptionType(), i = UnionSceneInteractionOperationHelper_1.UnionSceneInteractionOperationHelper.GetUnionSceneInteractionOperationObject(e))) {
      this.Wyh = UnionSceneInteractionOperationHelper_1.UnionSceneInteractionOperationHelper.ReadUnionSceneInteractionOperation(e, this.FbDataInternal.sceneInteractionOption(i));
    }
    return this.Wyh;
  }
}
exports.FbDisableModulePlayerOperation = FbDisableModulePlayerOperation;
//# sourceMappingURL=FbDisableModulePlayerOperation.js.map