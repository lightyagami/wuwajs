"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelQteContext = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
class PanelQteContext {
  constructor() {
    this.Source = undefined;
    this.QteId = 0;
    this.QteHandleId = 0;
    this.SourceMeshComp = undefined;
    this.SourceBuffId = undefined;
    this.SourceBuffHandleId = 0;
    this.SourceActor = undefined;
    this.IsInitSourceEntity = false;
    this.SourceEntityHandle = undefined;
    this.Config = undefined;
    this.PreMessageId = undefined;
    this.Success = false;
    this.BuffIndex = -1;
  }
  GetSourceEntity() {
    if (this.IsInitSourceEntity) {
      if (this.SourceEntityHandle?.Valid) {
        return this.SourceEntityHandle.Entity;
      } else {
        this.SourceEntityHandle = undefined;
        return;
      }
    }
    this.IsInitSourceEntity = true;
    if (this.SourceActor && UE.KuroStaticLibrary.IsImplementInterface(this.SourceActor.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
      var t = this.SourceActor.GetEntityId();
      if (t !== undefined) {
        this.SourceEntityHandle = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
        return this.SourceEntityHandle?.Entity;
      }
    }
  }
}
exports.PanelQteContext = PanelQteContext;
//# sourceMappingURL=PanelQteContext.js.map