"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldModel = exports.WorldEnvironmentInfo = exports.MOBILE_CSM_DISTANCE_OUTCAVE = exports.MOBILE_CSM_DISTANCE_INCAVE = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Net_1 = require("../../../Core/Net/Net");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IVar_1 = require("../../../UniverseEditor/Interface/IVar");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const VOXEL_ENV_REQUEST_INTERVAL = 1000;
const DEFAULT_ENVIRONMENTTYPE = 255;
const ENVIRONMENT_TOLERANCE = 5;
exports.MOBILE_CSM_DISTANCE_INCAVE = 20000;
exports.MOBILE_CSM_DISTANCE_OUTCAVE = 8000;
class WorldEnvironmentInfo {
  constructor() {
    this.E9 = DEFAULT_ENVIRONMENTTYPE;
    this.NEr = "";
    this.OEr = "";
    this.UTl = 1;
    this.ServerCaveMode = 1;
    this.pk = 0;
  }
  get DataLayerType() {
    return this.NEr;
  }
  get SubDataLayerType() {
    return this.OEr;
  }
  get jNn() {
    return this.UTl;
  }
  set jNn(e) {
    if (this.UTl !== e) {
      this.UTl = e;
      this.RequestUpdateVoxelEnv();
    }
  }
  RequestUpdateVoxelEnv() {
    var e;
    if (this.UTl !== this.ServerCaveMode && !(Time_1.Time.Now - this.pk < VOXEL_ENV_REQUEST_INTERVAL)) {
      (e = Protocol_1.Aki.Protocol.Rp_.create()).DTl = this.UTl;
      Net_1.Net.Call(24250, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15935);
          } else {
            this.ServerCaveMode = e.DTl;
          }
        }
      });
      this.pk = Time_1.Time.Now;
    }
  }
  IsEqual(e) {
    return this.E9 === e;
  }
  IsEnCloseEnvironment() {
    return this.E9 === 0 || this.E9 === 1;
  }
  get EnvType() {
    return this.E9;
  }
  SetInfo(e) {
    switch (e.EnvType) {
      case 0:
        this.NEr = "DataLayerRuntime_EncloseSpace";
        this.OEr = "DataLayerRuntime_EncloseSpaceSub";
        this.jNn = 2;
        break;
      case 2:
        this.NEr = "DataLayerRuntime_EncloseSpace";
        this.OEr = "DataLayerRuntime_EncloseSpaceSub";
        this.jNn = 3;
        break;
      case 1:
        this.NEr = "DataLayerRuntime_EncloseSpaceRoom";
        this.OEr = "DataLayerRuntime_EncloseSpaceSubRoom";
        this.jNn = 2;
        break;
      default:
        this.jNn = 1;
    }
    this.E9 = e.EnvType;
  }
  ResetInfo() {
    this.E9 = DEFAULT_ENVIRONMENTTYPE;
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(1);
    var e;
    var t;
    var r = GlobalData_1.GlobalData.World;
    if (r?.IsValid()) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.WpCancelAdjustLoadRange(r);
      e = FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_EncloseSpace");
      t = FNameUtil_1.FNameUtil.GetDynamicFName("DataLayerRuntime_EncloseSpaceSub");
      UE.KuroRenderingRuntimeBPPluginBPLibrary.WpBeginLeaveCaveOrRoom(r, e, t);
    }
  }
}
exports.WorldEnvironmentInfo = WorldEnvironmentInfo;
class WorldModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.TickIntervalSchedulers = new Array();
    this.kEr = undefined;
    this.FEr = false;
    this.ChangeSchedulerLastType = 0;
    this.ChangeSchedulerDeltaFrameCount = 0;
    this.CurrentSchedulerDelta = 0;
    this.VEr = new Map();
    this.DestroyActorQueue = new Queue_1.Queue();
    this.ActorsToIgnoreSet = new Set();
    this.CurEnvironmentInfo = new WorldEnvironmentInfo();
    this.Vd_ = undefined;
    this.jd_ = 0;
    this.IsEnableEnvironmentDetecting = true;
  }
  get ControlPlayerLastLocation() {
    return ModelManager_1.ModelManager.WorldModel.kEr;
  }
  set ControlPlayerLastLocation(e) {
    this.kEr = e;
  }
  UpdateWorldState(e) {
    for (const r of Object.keys(e)) {
      var t = e[r];
      this.VEr.set(r, t);
    }
  }
  GetWorldState(e) {
    if (e) {
      var t = this.VEr.get(e);
      if (t) {
        switch ((0, IVar_1.getVarTypeByIndex)(t.iTs)) {
          case "Boolean":
            return t.rTs;
          case "Float":
            return t.sTs;
          case "Int":
            return MathUtils_1.MathUtils.LongToNumber(t.oTs);
          case "String":
            return t.nTs;
          default:
            return;
        }
      }
    }
  }
  GetWorldStateGeneric(e) {
    e = this.GetWorldState(e);
    if (e !== undefined) {
      return e;
    }
  }
  GetMapDone() {
    return this.FEr;
  }
  SetMapDone(e) {
    this.FEr = e;
  }
  static AddTsSimpleInteractItem(e) {
    let t = this.HEr.get(e.TypeId);
    if (!t) {
      t = new Set();
      this.HEr.set(e.TypeId, t);
    }
    t.add(e);
  }
  static RemoveTsSimpleInteractItem(e) {
    var t = this.HEr.get(e.TypeId);
    if (t) {
      t.delete(e);
    }
  }
  static GetTsSimpleInteractItemById(e) {
    return this.HEr.get(e);
  }
  AddDestroyActor(e, t, r) {
    if (r?.IsValid()) {
      this.DestroyActorQueue.Push([e, t, r]);
    }
  }
  PopDestroyActor() {
    if (this.DestroyActorQueue.Size !== 0) {
      return this.DestroyActorQueue.Pop();
    }
  }
  AddIgnore(e) {
    if (!!e?.IsValid() && !this.ActorsToIgnoreSet.has(e)) {
      this.ActorsToIgnoreSet.add(e);
    }
  }
  RemoveIgnore(e) {
    return !!e?.IsValid() && this.ActorsToIgnoreSet.delete(e);
  }
  ClearIgnore() {
    this.ActorsToIgnoreSet.clear();
  }
  HandleEnvironmentUpdate(e) {
    var t = this.Vd_;
    this.Vd_ = e;
    return !t || (this.Vd_.EnvType !== t.EnvType ? this.jd_ = 0 : this.jd_++, this.jd_ > ENVIRONMENT_TOLERANCE);
  }
  GetCachedVoxelInfo() {
    return this.Vd_;
  }
  ApplyEnvironmentUpdate() {
    let e = 0;
    if (this.Vd_ && !this.CurEnvironmentInfo.IsEqual(this.Vd_.EnvType)) {
      switch (this.CurEnvironmentInfo.EnvType) {
        case DEFAULT_ENVIRONMENTTYPE:
          if (this.Vd_.EnvType === 2) {
            e = 1;
          }
          if (this.Vd_.EnvType === 0 || this.Vd_.EnvType === 1) {
            e = 5;
          }
          break;
        case 2:
          if (this.Vd_.EnvType === DEFAULT_ENVIRONMENTTYPE) {
            e = 4;
          }
          if (this.Vd_.EnvType === 0 || this.Vd_.EnvType === 1) {
            e = 3;
          }
          break;
        case 0:
        case 1:
          if (this.Vd_.EnvType === DEFAULT_ENVIRONMENTTYPE) {
            e = 6;
          }
          if (this.Vd_.EnvType === 2) {
            e = 2;
          }
      }
      this.CurEnvironmentInfo.SetInfo(this.Vd_);
    }
    return e;
  }
}
(exports.WorldModel = WorldModel).IsStandalone = false;
WorldModel.HEr = new Map(); //# sourceMappingURL=WorldModel.js.map