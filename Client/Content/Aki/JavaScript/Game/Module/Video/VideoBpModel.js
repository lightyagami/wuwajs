"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoBpModel = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Global_1 = require("../../Global");
class VideoBpModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Old = new Map();
    this.Zhd = undefined;
  }
  get VideoBp() {
    return this.Zhd;
  }
  AddToPreloadMap(e, o) {
    this.Old.set(e, o);
  }
  GetFromPreloadMap(e) {
    return this.Old.get(e);
  }
  ClearPreloadMap() {
    this.Old.clear();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.RemoveOnVideoEnd();
    return true;
  }
  SpawnOrGetVideoBp() {
    var e;
    if (this.Zhd) {
      return this.VideoBp;
    } else if ((e = Global_1.Global.BaseCharacter.D_GetTransform()).IsValid() && (this.Zhd = ActorSystem_1.ActorSystem.Spawn(UE.BP_MediaDissolveManagea_C.StaticClass(), e, Global_1.Global.BaseCharacter), this.Zhd)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Preload", 45, "[VideoBp]成功生成VideoBp蓝图");
      }
      return this.Zhd;
    } else {
      return undefined;
    }
  }
  RemoveVideoBp() {
    if (this.Zhd) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Preload", 45, "[VideoBp]成功移除VideoBp蓝图");
      }
      ActorSystem_1.ActorSystem.Put("VideoBpModel", this.Zhd);
      this.Zhd = undefined;
    }
  }
  RemoveOnVideoEnd() {
    this.RemoveVideoBp();
    this.ClearPreloadMap();
  }
  RemovePreload() {
    this.ClearPreloadMap();
  }
}
exports.VideoBpModel = VideoBpModel;
//# sourceMappingURL=VideoBpModel.js.map