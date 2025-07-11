"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsModelManager = undefined;
const cpp_1 = require("cpp");
const Info_1 = require("../Common/Info");
const Log_1 = require("../Common/Log");
class JsModelManager {
  static InitializeEnvironment() {
    var t = Info_1.Info.World;
    if (t) {
      cpp_1.FModelManager.InitializeEnvironment(t);
      this.HasInitialized = true;
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Core", 36, "JsModelManager.InitializeEnvironment Fail!!!");
    }
  }
  static DestroyEnvironment() {
    cpp_1.FModelManager.DestroyEnvironment();
  }
  static get ci_() {
    this.ui_ ||= cpp_1.FModelManager.GetAiModel();
    return this.ui_;
  }
  static get di_() {
    this.mi_ ||= cpp_1.FModelManager.GetEntityModel();
    return this.mi_;
  }
  static AddEntity(t) {
    if (this.HasInitialized) {
      return this.di_?.CreateEntityData(t);
    }
  }
  static UpdateEntityActor(t, i) {
    if (this.HasInitialized) {
      this.di_?.UpdateEntityActor(t, i);
    }
  }
  static RemoveEntity(t) {
    if (this.HasInitialized) {
      this.di_?.DestroyEntityData(t);
    }
  }
  static GetEntityById(t) {
    if (this.HasInitialized) {
      return this.di_?.GetEntityById(t);
    }
  }
  static GetEntityByActor(t) {
    if (this.HasInitialized) {
      return this.di_?.GetEntityByActor(t);
    }
  }
  static AddAiPerception(t) {
    if (this.HasInitialized) {
      return this.ci_?.CreateAiPerceptionData(t);
    }
  }
  static RemoveAiPerception(t) {
    if (this.HasInitialized) {
      this.ci_?.DestroyAiPerceptionData(t);
    }
  }
  static GetAiPerception(t) {
    if (this.HasInitialized) {
      return this.ci_?.GetAiPerceptionData(t);
    }
  }
}
(exports.JsModelManager = JsModelManager).HasInitialized = false;
JsModelManager.ui_ = undefined;
JsModelManager.mi_ = undefined; //# sourceMappingURL=JsModelManager.js.map