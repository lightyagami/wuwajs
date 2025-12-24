"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldGlobal = exports.ONE_METER_FOR_CENTIMETER = exports.ONE_SECOND_FOR_MILLISECOND = exports.RAY_DISTANCE = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const GlobalData_1 = require("../GlobalData");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const SeamlessTravelController_1 = require("../Module/SeamlessTravel/SeamlessTravelController");
exports.RAY_DISTANCE = 200;
exports.ONE_SECOND_FOR_MILLISECOND = 1000;
exports.ONE_METER_FOR_CENTIMETER = 100;
class WorldGlobal {
  constructor() {}
  static Initialize() {
    GlobalData_1.GlobalData.GameInstance.场景加载通知器 = UE.NewObject(UE.LoadMapNotify.StaticClass(), GlobalData_1.GlobalData.GameInstance);
    GlobalData_1.GlobalData.GameInstance.场景加载通知器.Clear();
    GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindBeginTravelLoadMap((0, puerts_1.toManualReleaseDelegate)(WorldGlobal.YEr));
    GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindEndLoadTransitionMap((0, puerts_1.toManualReleaseDelegate)(WorldGlobal.Nea));
    GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindBeginLoadMap((0, puerts_1.toManualReleaseDelegate)(WorldGlobal.JEr));
    GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindEndLoadMap((0, puerts_1.toManualReleaseDelegate)(WorldGlobal.zEr));
    GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindLoadStreamLevel((0, puerts_1.toManualReleaseDelegate)(WorldGlobal.ZEr));
    GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindUnLoadStreamLevel((0, puerts_1.toManualReleaseDelegate)(WorldGlobal.xBn));
  }
  static Clear() {
    (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.JEr);
    (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.YEr);
    (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.Nea);
    (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.zEr);
    (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.ZEr);
    GlobalData_1.GlobalData.GameInstance.场景加载通知器.Clear();
  }
  static LoadFromMap(o) {
    var a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapSourceConfig(o);
    if (a) {
      this.OpenLevel(a.MapPath);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[WorldGlobal.LoadFromMap] 不存在Id:的AkiMapSourceConfig。", ["id", o]);
    }
  }
  static OpenLevel(o) {
    if (!ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel || !SeamlessTravelController_1.SeamlessTravelController.StartTravel(o)) {
      if (!ModelManager_1.ModelManager.GameModeModel.ForceClientTravel && ModelManager_1.ModelManager.GameModeModel.IsSameMapTraveling) {
        ModelManager_1.ModelManager.GameModeModel.FlushTempDataLayers();
        ModelManager_1.ModelManager.RenderModuleModel?.FlushTempDependenciesNotMatchDataLayers();
        WorldGlobal.JEr(o);
        WorldGlobal.zEr(o);
      } else {
        WorldGlobal.PlayerClientTravel(Global_1.Global.CharacterController, o);
      }
    }
  }
  static PlayerClientTravel(o, a) {
    o.ClientTravel(a, 2, true, undefined);
  }
  static ToUeInt32Array(o, a) {
    a.Empty();
    if (o) {
      for (const e of o) {
        a.Add(e);
      }
    }
  }
  static ToUeInt64Array(o, a) {
    a.Empty();
    if (o) {
      for (const e of o) {
        a.Add(e);
      }
    }
  }
  static ToUeFloatArray(o, a) {
    a.Empty();
    if (o) {
      for (const e of o) {
        a.Add(e);
      }
    }
  }
  static ToUeStringArray(o, a) {
    a.Empty();
    if (o) {
      for (const e of o) {
        a.Add(e);
      }
    }
  }
  static ToTsArray(a, e) {
    if (a) {
      var l = a.Num();
      e.length = l;
      for (let o = 0; o < l; ++o) {
        e[o] = a.Get(o);
      }
    } else {
      e.length = 0;
    }
  }
  static ResetArraySize(o, a, e) {
    while (o.Num() > a) {
      o.RemoveAt(o.Num() - 1);
    }
    while (o.Num() < a) {
      o.Add(e);
    }
  }
  static ResetTsArraySize(o, a, e) {
    while (o.length > a) {
      o.pop();
    }
    while (o.length < a) {
      o.push(e);
    }
  }
  static ToTsVector(o) {
    var a = Protocol_1.Aki.Protocol.Gks.create();
    a.X = o.X;
    a.Y = o.Y;
    a.Z = o.Z;
    return a;
  }
  static ToUeVectorOld(o) {
    if (o) {
      return new UE.Vector(o.X, o.Y, o.Z);
    } else {
      return Vector_1.Vector.ZeroVector;
    }
  }
  static ToUeVector(o) {
    if (o) {
      return new UE.VectorDouble(o.X, o.Y, o.Z);
    } else {
      return Vector_1.Vector.ZeroVectorDouble;
    }
  }
  static ToTsRotator(o) {
    var a = Protocol_1.Aki.Protocol.D2s.create();
    a.Pitch = o.Pitch;
    a.Yaw = o.Yaw;
    a.Roll = o.Roll;
    return a;
  }
  static ToUeRotator(o) {
    if (o) {
      return new UE.Rotator(o.Pitch, o.Yaw, o.Roll);
    } else {
      return new UE.Rotator();
    }
  }
  static ToUeGameplayAttribute(o) {
    var a = new UE.GameplayAttributeData();
    if (o !== undefined) {
      a.AttributeType = o.tSs;
      a.BaseValue = o.eSs;
      a.CurrentValue = o.y6n;
    }
    return a;
  }
}
(exports.WorldGlobal = WorldGlobal).OnStatStart = () => {
  if (GlobalData_1.GlobalData.World && !Info_1.Info.IsBuildShipping) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Stat", 33, "STAT统计开启");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "STAT STARTFILE");
  }
};
WorldGlobal.OnStatStop = () => {
  if (GlobalData_1.GlobalData.World && !Info_1.Info.IsBuildShipping && (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "STAT STOPFILE"), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("Stat", 33, "STAT统计结束");
  }
};
WorldGlobal.ResetLoadTime = () => {
  if (GlobalData_1.GlobalData.World && !Info_1.Info.IsBuildShipping) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Stat", 33, "重置LoadTime时长");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "LoadTimes.TestTime 0");
  }
};
WorldGlobal.GetLoadTime = () => {
  if (Info_1.Info.IsBuildShipping) {
    return 0;
  } else {
    return UE.KismetSystemLibrary.GetConsoleVariableFloatValue("LoadTimes.TestTime");
  }
};
WorldGlobal.LoadTimesCheckBegin = (o = "default") => {
  if (GlobalData_1.GlobalData.World && !Info_1.Info.IsBuildShipping) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Stat", 33, "LoadTime统计开启：", ["groupName", o]);
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "LoadTimes.TestSwitch 1");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "LoadTimes.DumpTest Start " + o);
  }
};
WorldGlobal.LoadTimesCheckEnd = () => {
  if (GlobalData_1.GlobalData.World && !Info_1.Info.IsBuildShipping && (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "LoadTimes.DumpTest LOWTIME=-1"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "LoadTimes.TestSwitch 0"), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("Stat", 33, "LoadTime统计结束");
  }
};
WorldGlobal.YEr = o => {
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeTravelMap);
};
WorldGlobal.Nea = o => {
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterTransitionMap);
};
WorldGlobal.JEr = o => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("World", 3, "地图开始加载", ["mapName", o]);
  }
  if (ModelManager_1.ModelManager.GameModeModel.MapPath === o) {
    ControllerHolder_1.ControllerHolder.GameModeController.BeforeLoadMap();
  }
};
WorldGlobal.zEr = o => {
  if (GlobalData_1.GlobalData.World?.IsValid()) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("World", 3, "地图加载完成。", ["MapName", o]);
    }
    if (ModelManager_1.ModelManager.GameModeModel.MapPath === o) {
      ControllerHolder_1.ControllerHolder.GameModeController.AfterLoadMap();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EndTravelMap);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("World", 3, "加载地图失败，因为World为空。", ["MapName", o]);
  }
};
WorldGlobal.ZEr = (o, a, e) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("World", 3, "LoadStream完成。", ["LevelName", a.toString()]);
  }
  if (GlobalData_1.GlobalData.World?.IsValid()) {
    ControllerHolder_1.ControllerHolder.SubLevelController.OnLoadSubLevel(o, a.toString(), e);
  }
};
WorldGlobal.xBn = (o, a) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("World", 3, "UnLoadStream完成。", ["LinkId", o], ["LevelName", a.toString()]);
  }
  if (GlobalData_1.GlobalData.World?.IsValid()) {
    ControllerHolder_1.ControllerHolder.SubLevelController.OnUnLoadSubLevel(o, a.toString());
  }
}; //# sourceMappingURL=WorldGlobal.js.map