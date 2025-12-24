"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExploreToolController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const Net_1 = require("../../../Core/Net/Net");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const MapOperationQueue_1 = require("../Map/Container/MapOperation/MapOperationQueue");
const MapExploreToolDefine_1 = require("./MapExploreToolDefine");
const MAX_ROLE_HALF_HEIGHT = 85;
const MAX_ROLE_RADIUS = 25;
const TRACE_PROFILE_KEY = "CheckUpperSpaceEnoughForRole";
const TRACE_CHECK_ONENTITY_PROFILE_KEY = "CheckOnEntity";
class MapExploreToolController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return true;
  }
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static CheckUseMapExploreTool(e, o) {
    var r;
    var a;
    var t = ModelManager_1.ModelManager.MapExploreToolModel.GetPhantomSkillIdBySkillId(o);
    if (t && (r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)?.Entity?.GetComponent(3))) {
      (a = new MapExploreToolDefine_1.MapExploreToolUsingInfo()).CharId = e;
      a.Pos = r.FloorLocation;
      a.Rot = r.ActorRotationProxy;
      a.SkillId = o;
      a.PhantomSkillId = t;
      if (this.EAi(a)) {
        ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(true);
        this.nPl(a);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 客户端检测未通过", ["UsingInfo", a]);
        }
        this.IAi(a, false);
      }
    }
  }
  static async nPl(e) {
    if (!(await this.sPl(e))) {
      this.$cl(e);
    }
  }
  static TAi(o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 请求正式使用探索工具", ["UsingInfo", o]);
    }
    this.LAi(o, e => {
      if (e && ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanSuccess(o, e)) {
        this.PBn(o, "ExploreDeploySuccess");
        this.DAi(o);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 39, "[MapExploreTool] 探索工具使用失败", ["UsingInfo", o], ["Response", e]);
        }
        this.IAi(o, false);
      }
    });
  }
  static IAi(e, o) {
    ModelManager_1.ModelManager.MapExploreToolModel.SetCharExploreSkillBusy(false);
    if (!o) {
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.CharId)?.Entity?.GetComponent(218)?.ModifyCdTime([e.SkillId], 0, -1);
    }
  }
  static EAi(e) {
    if (ModelManager_1.ModelManager.MapExploreToolModel.GetCharExploreSkillBusy()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 使用过快，当前仍在请求使用探索工具中", ["UsingInfo", e]);
      }
      return false;
    }
    if (UiManager_1.UiManager.GetViewByName("WorldMapView") !== undefined) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Phantom", 63, "[MapExploreTool] 地图界面中", ["UsingInfo", e]);
      }
      return false;
    }
    if (ControllerHolder_1.ControllerHolder.FormationDataController.GlobalIsInFight) {
      this.RAi(e, "ExploreFighting");
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Phantom", 63, "[MapExploreTool] 战斗状态中", ["UsingInfo", e]);
      }
      return false;
    }
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.CharId);
    var r = o?.Entity?.GetComponent(3);
    var a = o?.Entity?.GetComponent(184);
    if (!o || !r || !a) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 使用者异常", ["UsingInfo", e]);
      }
      return false;
    }
    if (!r.IsAutonomousProxy) {
      this.RAi(e, "OnylHostUse");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 非主控使用", ["UsingInfo", e]);
      }
      return false;
    }
    r = o?.Entity?.GetComponent(242);
    r = r?.IsOnVehicle && r?.VehicleType === "Motorcycle";
    if (a.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      a = o?.Entity?.GetComponent(215);
      if (!r || !a?.HasTag(-433207812)) {
        this.RAi(e, "ExploreStateError");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 非贴地使用", ["UsingInfo", e]);
        }
        return false;
      }
    }
    o = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o);
    if (r?.InstType !== Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance || r?.InstSubType !== 13) {
      this.RAi(e, "ExplorePositionError");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 非大世界使用", ["UsingInfo", e]);
      }
      return false;
    } else {
      return e.PhantomSkillId !== 1010 || this.UAi(e);
    }
  }
  static UAi(e) {
    return e.PhantomSkillId === 1010 && !(ModelManager_1.ModelManager.LevelFuncFlagModel.GetFuncFlagEnable(0) ? ModelManager_1.ModelManager.MapModel.IsInMapPolygon(e.Pos) ? ModelManager_1.ModelManager.MapModel.IsPlayerInStandardGravity ? this.AAi(e.Pos) ? !this.U4a(e.Pos) && (this.RAi(e, "ExplorePositionError"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Phantom", 18, "[MapExploreTool] 临时传送点放置在实体上", ["UsingInfo", e]), 1) : (this.RAi(e, "ExplorePositionError"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 目标位置空余高度不足", ["UsingInfo", e]), 1) : (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ErrorCode_2200054_Text"), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Phantom", 63, "探索工具->不在正常重力环境下", ["IsPlayerInStandardGravity", ModelManager_1.ModelManager.MapModel.IsPlayerInStandardGravity], ["PlayerGravityDirection", ModelManager_1.ModelManager.MapModel.CurrentPlayerGravityDirection], ["UsingInfo", e]), 1) : (this.RAi(e, "ExplorePositionError"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 不在世界开放区域内", ["UsingInfo", e]), 1) : (this.RAi(e, "ExploreTeleporterBan"), Log_1.Log.CheckInfo() && Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 放置临时传送点功能被禁用", ["UsingInfo", e]), 1));
  }
  static AAi(e) {
    var o = ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace();
    if (!o) {
      return false;
    }
    o.WorldContextObject = GlobalData_1.GlobalData.World;
    o.HalfHeight = MAX_ROLE_HALF_HEIGHT;
    o.Radius = MAX_ROLE_RADIUS;
    var r = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    r.DeepCopy(e);
    r.Z += MAX_ROLE_HALF_HEIGHT;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, r);
    var e = TraceElementCommon_1.TraceElementCommon.CapsuleTrace(o, TRACE_PROFILE_KEY);
    ModelManager_1.ModelManager.TraceElementModel.ClearCapsuleTrace();
    return !e;
  }
  static U4a(e) {
    var o = UE.NewObject(UE.TraceLineElement.StaticClass());
    o.WorldContextObject = GlobalData_1.GlobalData.World;
    o.bIsSingle = true;
    o.bIgnoreSelf = true;
    o.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    var r = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    r.DeepCopy(e);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r);
    r.Z -= MAX_ROLE_HALF_HEIGHT;
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, r);
    var e = TraceElementCommon_1.TraceElementCommon.LineTrace(o, TRACE_CHECK_ONENTITY_PROFILE_KEY);
    var r = o.HitResult;
    if (e && r?.bBlockingHit && r.Actors.Num() > 0 && r.Actors.Get(0).RootComponent?.GetOwner()?.Tags.Contains(CharacterNameDefines_1.CharacterNameDefines.INVALID_POS)) {
      return false;
    }
    return true;
  }
  static Xcl(e, o) {
    if (o) {
      var r = this.PAi(e, o);
      var a = this.Ycl(e, o);
      if (ModelManager_1.ModelManager.MapExploreToolModel.IsRespMeanCheckPass(e, o)) {
        if (!a) {
          this.PBn(e, "ExploreDeploySuccess");
          this.DAi(e);
        }
        return;
      }
      if (e.PhantomSkillId === 1011) {
        if (this.wAi(e, o)) {
          return;
        }
      }
      if (!r) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Phantom", 39, "[MapExploreTool] 服务端检测结果未提示或处理，可能发生了意料之外的错误", ["UsingInfo", e], ["Response", o]);
        }
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 服务端检测未通过", ["UsingInfo", e], ["Response", o]);
    }
    this.IAi(e, false);
  }
  static wAi(e, o) {
    return e.PhantomSkillId === 1011 && o?.Content.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillIsEffect && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 不请求正式使用探索工具，直接认为执行成功", ["UsingInfo", e], ["Response", o]), this.DAi(e, true), true);
  }
  static DAi(e, o = false) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 63, "[MapExploreTool] 探索工具使用成功", ["UsingInfo", e], ["useAgain", o]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUseMapExploreToolSuccess, e, o);
    this.IAi(e, true);
  }
  static async sPl(e) {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() && !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      this.RAi(e, "OnylHostUse");
      return true;
    }
    if (e.PhantomSkillId === 1011) {
      if (!ModelManager_1.ModelManager.MapExploreToolModel.IsToolReachPlaceLimit(e.PhantomSkillId)) {
        o = await this.CheckUseSoundBoxSkillRequestAsync();
        return this.PAi(e, o);
      }
      var o = ModelManager_1.ModelManager.MapModel.GetSoundBoxDetectMarkCalc();
      if (o) {
        e.MarkId = o[0];
        e.MarkType = o[1];
        this.PBn(e, "ShengXiaDetectTip");
        this.DAi(e, true);
        return true;
      }
    }
    return false;
  }
  static $cl(r) {
    const e = () => {
      this.LAi(r, e => {
        this.Xcl(r, e);
      });
    };
    var a = ModelManager_1.ModelManager.MapExploreToolModel.GetConfirmBoxId(r);
    if (!a) {
      if (!this.zcl(r)) {
        e();
      }
      return false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Phantom", 63, "[MapExploreTool] 本地请求前预检查弹窗", ["UsingInfo", r], ["ConfirmBoxId", a]);
    }
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(a);
    switch (a) {
      case 139:
      case 141:
      case 142:
        {
          let e = undefined;
          var n = undefined;
          let o = undefined;
          var i = ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(r.PhantomSkillId);
          if (i && i.size === 1) {
            [[n, o]] = i;
            e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(n);
          }
          if (i) {
            t.ItemIdMap = i;
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Phantom", 63, `[MapExploreTool] 查询不到确认框${a}对应的道具`);
          }
          if (e && o) {
            t.SetTextArgs(e, o.toString());
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Phantom", 63, `[MapExploreTool] 查询不到确认框${a}对应的文本参数`);
          }
          break;
        }
    }
    t.FunctionMap.set(1, () => {
      this.IAi(r, false);
    });
    t.FunctionMap.set(2, () => {
      if (!this.zcl(r)) {
        e();
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    return true;
  }
  static Ycl(e, o) {
    var r = ModelManager_1.ModelManager.MapExploreToolModel.GetConfirmBoxId(e, o);
    if (!r) {
      return false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Phantom", 63, "[MapExploreTool] 协议返回后弹窗", ["UsingInfo", e], ["Response", o], ["ConfirmBoxId", r]);
    }
    o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(r);
    o.FunctionMap.set(1, () => {
      this.IAi(e, false);
    });
    o.FunctionMap.set(2, () => {
      if (!this.zcl(e)) {
        this.TAi(e);
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
    return true;
  }
  static zcl(e) {
    let o = undefined;
    let r = undefined;
    var a = ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(e.PhantomSkillId);
    if (a && a.size === 1) {
      [[o, r]] = a;
    }
    if (o && r) {
      var a = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(o);
      if (r > a) {
        return !!(a = ModelManager_1.ModelManager.MapExploreToolModel.GetNotEnoughTipsId(e)) && (this.RAi(e, a), true);
      }
    }
    return false;
  }
  static PAi(e, o) {
    var r = ModelManager_1.ModelManager.MapExploreToolModel.GetRespTipsId(e, o);
    return !!r && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Phantom", 39, "[MapExploreTool] 根据消息处理飘字", ["UsingInfo", e], ["Response", o], ["PromptId", r]), this.RAi(e, r), true);
  }
  static RAi(e, o) {
    var r = [];
    switch (o) {
      case "ExploreActivating":
        var a = ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(e.PhantomSkillId);
        if (!a || a.length <= 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Phantom", 39, `[MapExploreTool] 查询不到通用提示${o}对应的技能名参数`);
          }
          return;
        }
        r.push(a);
        break;
      case "ExploreTeleporterItemLack":
      case "ExploreShengXiaItemLack":
        a = ConfigManager_1.ConfigManager.RouletteConfig.GetCostByPhantomSkillId(e.PhantomSkillId);
        if (!a || a.size <= 0) {
          return;
        }
        var [a] = a.keys();
        var a = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(a);
        if (!a || a.length <= 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Phantom", 39, `[MapExploreTool] 查询不到通用提示${o}对应的道具名参数`);
          }
          return;
        }
        r.push(a);
    }
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(o, r);
  }
  static PBn(e, o) {
    var r = [];
    if (o === "ExploreDeploySuccess") {
      e = ConfigManager_1.ConfigManager.RouletteConfig.GetNameByPhantomSkillId(e.PhantomSkillId);
      if (!e || e.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 39, `[MapExploreTool] 查询不到通用提示${o}对应的技能名参数`);
        }
        return;
      }
      r.push(e);
    }
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(o, r);
  }
  static LAi(e, o) {
    switch (e.PhantomSkillId) {
      case 1011:
        MapExploreToolController.Jcl(o);
        return;
      case 1012:
        MapExploreToolController.Zcl(o);
        return;
      case 1010:
        MapExploreToolController.eml(e, o);
    }
  }
  static Jcl(o) {
    var e = Protocol_1.Aki.Protocol.KC_.create();
    Net_1.Net.Call(29226, e, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs && e.Cvs !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillIsEffect) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 22600);
      } else {
        o({
          PhantomSkillId: 1011,
          Content: e
        });
      }
    });
  }
  static Zcl(o) {
    var e = Protocol_1.Aki.Protocol.HC_.create();
    Net_1.Net.Call(19015, e, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs && e.Cvs !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrTreasureBoxAllActive) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 24567);
      } else {
        ModelManager_1.ModelManager.MapModel.UpdateBoxSlotInfo(e.IT_);
        o({
          PhantomSkillId: 1012,
          Content: e
        });
      }
    });
  }
  static RemoveTreasureBoxSlotRequest(r) {
    var e = {
      Type: 3,
      MarkType: 17,
      MarkId: r,
      IsValidate: () => {
        return ModelManager_1.ModelManager.MapModel.GetBoxSlotInfoByMarkId(r) !== undefined || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 63, "试图移除不存在的探测宝箱标记", ["MarkId", r]), false);
      },
      Execute: async () => {
        var e = ModelManager_1.ModelManager.MapModel.GetBoxSlotInfoByMarkId(r);
        var o = Protocol_1.Aki.Protocol.WC_.create();
        o.b7n = e.b7n;
        var o = await Net_1.Net.CallAsync(24765, o);
        if (o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Cvs, 22560);
        } else {
          ModelManager_1.ModelManager.MapModel.RemoveBoxSlotInfo(e.b7n);
        }
      }
    };
    MapOperationQueue_1.MapOperationQueue.RunMapMark(e);
  }
  static eml(e, o) {
    var r;
    if (!ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() || !!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      (r = Protocol_1.Aki.Protocol.YC_.create()).l8n = e.Pos;
      r._8n = e.Rot;
      r.Suc = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId() ?? 0;
      Net_1.Net.Call(15033, r, e => {
        if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 24513);
        } else {
          o({
            PhantomSkillId: 1010,
            Content: e
          });
        }
      });
    }
  }
  static RemoveTemporaryTeleportRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.PCs.create();
    r.R7n = e;
    Net_1.Net.Call(24777, r, e => {
      if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 27959);
      } else {
        ModelManager_1.ModelManager.MapModel.RemoveTemporaryTeleportInfo(o);
      }
    });
  }
  static async CheckUseSoundBoxSkillRequestAsync() {
    var e = Protocol_1.Aki.Protocol.r0_.create();
    return {
      PhantomSkillId: 1011,
      Content: await Net_1.Net.CallAsync(18624, e)
    };
  }
}
exports.MapExploreToolController = MapExploreToolController;
//# sourceMappingURL=MapExploreToolController.js.map