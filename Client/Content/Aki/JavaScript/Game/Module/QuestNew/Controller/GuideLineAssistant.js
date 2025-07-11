"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideLineAssistant = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const QUERY_VALUE = 500;
const SPLIT_Z_LIMIT = 2000;
class PendingProcess {
  constructor(t) {
    this.ProcessType = t;
    this.ProcessId = 0;
    this.Finished = false;
    this.ProcessId = ++PendingProcess.Id;
  }
}
PendingProcess.Id = 0;
class StartShowProcess extends PendingProcess {
  constructor() {
    super(0);
  }
}
class EndShowProcess extends PendingProcess {
  constructor() {
    super(1);
  }
}
class GuideLineAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor(t) {
    super();
    this.CVs = 0;
    this._ro = undefined;
    this.uro = undefined;
    this.UYt = [];
    this.QZe = undefined;
    this.cro = 0;
    this.mro = UE.NewArray(UE.VectorDouble);
    this.dro = Vector_1.Vector.Create();
    this.Cro = Vector_1.Vector.Create(QUERY_VALUE, QUERY_VALUE, QUERY_VALUE);
    this.gro = 0;
    this.fro = 0;
    this.pro = -0;
    this.vro = 0;
    this.Mro = -0;
    this.Ero = false;
    this.Sro = false;
    this.ero = (t, e) => {
      if (e === 210004) {
        ModelManager_1.ModelManager.GeneralLogicTreeModel.UpdateGuideLineStartShowTime();
      }
    };
    this.$Ct = t => {
      if (t === this.CVs && (ModelManager_1.ModelManager.GeneralLogicTreeModel.UpdateGuideLineStartShowTime(), this.CheckCanShowGuideLine())) {
        this.yro();
      }
    };
    this.DQt = (t, e, i) => {
      if (t.Type === 6 && (this.lzs()?.Id ?? 0) === t.TreeConfigId && i === Protocol_1.Aki.Protocol.BNs._5n) {
        this.$Ct(t.BtType);
      }
    };
    this.SpawnQuestGuideLine = () => {
      this.Tro();
      this._ro = ActorSystem_1.ActorSystem.Get(UE.BP_Fx_WayFinding_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
      this.Lro();
      this.uro = UE.NewArray(UE.VectorDouble);
    };
    this.yro = () => {
      this.QZe = undefined;
      if ((this.UYt.length = 0) < this.vro) {
        this.UYt.push(new EndShowProcess());
      }
      this.UYt.push(new StartShowProcess());
      this.Sro = true;
    };
    this.Iro = () => {
      this.QZe.Finished = true;
      this.UYt.shift();
      this.QZe = undefined;
    };
    this.CVs = t;
  }
  OnInit() {}
  OnDestroy() {
    this.UYt.length = 0;
    this.Tro();
    this.mro.Empty();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, this.SpawnQuestGuideLine);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.ero);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.DQt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.yro);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, this.SpawnQuestGuideLine);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.ero);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.DQt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.yro);
  }
  Tro() {
    if (ObjectUtils_1.ObjectUtils.IsValid(this._ro)) {
      ActorSystem_1.ActorSystem.Put("GuideLineAssistant.DestroyGuideSpline", this._ro);
      this._ro = undefined;
    }
  }
  Tick(t) {
    this.Dro(t);
    this.sii();
    if (this.CheckCanShowGuideLine()) {
      t = this.Rro();
      if (!this.Sro || !!t && !this.Ero) {
        this.yro();
      }
    } else {
      if (this.vro > 0 && this.Sro) {
        this.Lro();
      }
      this.Sro = false;
    }
  }
  sii() {
    if (this.UYt?.length !== 0 && !this.QZe) {
      this.QZe = this.UYt[0];
      switch (this.QZe.ProcessType) {
        case 0:
          this.Uro();
          break;
        case 1:
          this.Aro(2);
      }
    }
  }
  Lro() {
    this.UYt.push(new EndShowProcess());
    this._ro?.StopEffect();
  }
  CheckCanShowGuideLine() {
    var t;
    return !ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() && ((t = this.lzs()) && t.CanShowGuideLine() ? !!t.IsAlwaysShowGuideLine() || (t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetGuideLineStartShowTime(), this.cro ||= parseInt(ConfigManager_1.ConfigManager.QuestNewConfig.GetGlobalConfig("GuideLineShowTime")), TimeUtil_1.TimeUtil.GetServerTime() - t <= this.cro) : (this.Lro(), false));
  }
  Rro() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(45);
    if (t) {
      return this.Pro(t.IsMoving);
    } else {
      this.Pro(false);
      return false;
    }
  }
  Dro(t) {
    if (this.QZe) {
      this.Mro = MathUtils_1.MathUtils.Clamp(this.Mro + t / 50, 0, 1);
      this.vro = MathUtils_1.MathUtils.Lerp(this.gro, this.fro, this.Mro);
      this._ro.NS_Fx_WayFinding.SetNiagaraVariableFloat("Spawn", this.vro);
      if (this.Mro >= 1 && this.pro < 1) {
        this.Iro();
      }
      this.pro = this.Mro;
    }
  }
  Uro() {
    var t = this.lzs();
    if (t) {
      var e = t.GetCurrentActiveChildQuestNode();
      if (e) {
        var i = t.GetNodeTrackPosition(e.NodeId);
        var s = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
        if (i && s) {
          this.dro.Set(s.X, s.Y, s.Z);
          var r = UE.RoadNetNavigationSystem.RoadNet_FindPathToLocationSynchronously(GlobalData_1.GlobalData.World, this.dro.ToUeVectorOld(), i.ToUeVectorOld());
          if (r && r.PathPoints.Num()) {
            if (r.Length <= t.GetGuideLineHideDistance(e.NodeId) * 100) {
              this.Lro();
            } else {
              this.uro.Empty();
              for (let t = 0; t < r.PathPoints.Num(); t++) {
                var h = r.PathPoints.Get(t);
                var h = UE.KismetMathLibrary.Conv_VectorToVectorDouble(h);
                this.uro.Add(h);
              }
              this.xro(this._ro.Spline, this.uro, 4);
              this._ro.EnsureEffect();
              s = t.GetCurrentActiveChildQuestNode();
              if (s) {
                this._ro.NS_Fx_WayFinding.SetIntParameter(FNameUtil_1.FNameUtil.GetDynamicFName("Type"), s.NavigationStyle);
              }
            }
          } else {
            this.Lro();
          }
        } else {
          this.Lro();
        }
      } else {
        this.Lro();
      }
    } else {
      this.Lro();
    }
  }
  xro(i, e, s) {
    i.ClearSplinePoints();
    var r = UE.NewArray(UE.VectorDouble);
    for (let t = 0; t < e.Num() - 1; ++t) {
      var h = e.Get(t);
      var n = e.Get(t + 1);
      r.Add(h);
      if (Math.abs(n.Z - h.Z) > SPLIT_Z_LIMIT) {
        break;
      }
      if (t + 1 === e.Num() - 1) {
        r.Add(n);
      }
    }
    i.D_SetSplinePoints(r, 1, true);
    this.mro.Empty();
    var a = i.GetSplineLength();
    for (let t = 0; t < i.GetNumberOfSplinePoints() - 1; ++t) {
      var o = i.GetDistanceAlongSplineAtSplinePoint(t);
      var _ = i.GetDistanceAlongSplineAtSplinePoint(t + 1);
      var l = (_ - o) / s;
      for (let e = o; e <= _ && e <= a; e += l) {
        var v = i.D_GetLocationAtDistanceAlongSpline(e, 1);
        var c = (0, puerts_1.$ref)(undefined);
        let t = v;
        if (UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(GlobalData_1.GlobalData.World, v, c, undefined, undefined, this.Cro.ToUeVector())) {
          t = (0, puerts_1.$unref)(c);
        }
        this.mro.Add(t);
      }
    }
    i.D_SetSplinePoints(this.mro, 1, true);
    this.Aro(1);
  }
  Aro(t) {
    this.gro = this.vro;
    this.Mro = 0;
    this.pro = 0;
    switch (t) {
      case 1:
        this.fro = 2;
        break;
      case 2:
        this.fro = 0;
    }
  }
  Pro(t) {
    return this.Ero !== t && (this.Ero = t, true);
  }
  lzs() {
    let t = undefined;
    switch (this.CVs) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        t = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest();
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        t = ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo();
    }
    return t;
  }
}
exports.GuideLineAssistant = GuideLineAssistant;
//# sourceMappingURL=GuideLineAssistant.js.map