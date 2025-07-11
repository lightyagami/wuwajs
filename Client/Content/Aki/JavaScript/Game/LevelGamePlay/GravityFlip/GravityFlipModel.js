"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityFlipModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const UiManager_1 = require("../../Ui/UiManager");
class GravityFlipModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GravityFlipEntity = undefined;
    this.GravityFlipComp = undefined;
    this.CacheCorrectDirection = Protocol_1.Aki.Protocol.AY_.Proto_GravityDown;
    this.CurrentGravityDirection = 0;
    this.ValidGravityDirections = [];
    this.ViewCallBackCache = undefined;
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  InitGravityFlipParams(e) {
    this.GravityFlipComp = e;
    this.GravityFlipEntity = e.Entity;
    this.ValidGravityDirections = [];
    this.CurrentGravityDirection = e.CurGravityDirection;
    var t = e.GetGravityFlipDirection();
    if (!t || t.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[GravityFlipModel] 未找到重力方向配置", ["PbDataId", e.Entity.GetComponent(0)?.GetPbDataId()]);
      }
    } else {
      for (const r of t) {
        switch (r.Type) {
          case 1:
            this.ValidGravityDirections.push(180);
            break;
          case 2:
            this.ValidGravityDirections.push(0);
            break;
          case 3:
            this.ValidGravityDirections.push(90);
            break;
          case 4:
            this.ValidGravityDirections.push(270);
        }
      }
      this.GravityFlipComp.OnEnterInteract();
    }
  }
  NeedChangeGravity() {
    return this.GravityFlipComp.CurGravityDirection !== this.CurrentGravityDirection;
  }
  get GravityFlipEntityCreatureDataId() {
    return this.GravityFlipEntity?.GetComponent(0)?.GetCreatureDataId() ?? -1;
  }
  xY_(e) {
    switch (e) {
      case 180:
        return Protocol_1.Aki.Protocol.AY_.Proto_GravityUp;
      case 0:
        return Protocol_1.Aki.Protocol.AY_.Proto_GravityDown;
      case 90:
        return Protocol_1.Aki.Protocol.AY_.Proto_GravityLeft;
      case 270:
        return Protocol_1.Aki.Protocol.AY_.Proto_GravityRight;
    }
    return Protocol_1.Aki.Protocol.AY_.Proto_GravityDown;
  }
  get CurGravityFlipType() {
    return this.xY_(this.CurrentGravityDirection);
  }
  get TargetDirection() {
    var e = this.GravityFlipEntity?.GetComponent(205);
    if (!e || e.GetTagCount(-1377409745) !== 1) {
      return -1;
    } else if (e.HasTag(1937741205)) {
      return 180;
    } else if (e.HasTag(590629922)) {
      return 0;
    } else if (e.HasTag(-231334097)) {
      return 90;
    } else if (e.HasTag(-584695776)) {
      return 270;
    } else {
      return -1;
    }
  }
  OnChangeMode() {
    var e;
    if (this.GravityFlipComp?.IsInteracting) {
      e = {
        SelectCallback: this.ViewCallBackCache
      };
      UiManager_1.UiManager.OpenView("GravityFlipView", e);
    }
    return true;
  }
}
exports.GravityFlipModel = GravityFlipModel;
//# sourceMappingURL=GravityFlipModel.js.map