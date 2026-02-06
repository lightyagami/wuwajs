"use strict";

var SceneItemJigsawBaseComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, e) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, e);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        r = (o < 3 ? h(r) : o > 3 ? h(i, s, r) : h(i, s)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemJigsawBaseComponent = exports.JigsawIndex = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TicTacToeGame_1 = require("../../../LevelGamePlay/Chess/TicTacToe/TicTacToeGame");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const COS_45 = Math.cos(Math.PI * 0.25);
const TIMER_PERIOD = 500;
class JigsawIndex {
  constructor(t, i) {
    this.Row = 0;
    this.Col = 0;
    this.jEe = undefined;
    this.hnr = undefined;
    this.lnr = undefined;
    this.Row = t;
    this.Col = i;
  }
  DeepCopy(t) {
    this.Row = t.Row;
    this.Col = t.Col;
  }
  SetValue(t, i) {
    this.Row = t;
    this.Col = i;
  }
  Equels(t) {
    return this.Row === t.Row && this.Col === t.Col;
  }
  GetKey() {
    if (!this.jEe || this.hnr !== this.Row || this.lnr !== this.Col) {
      this.jEe = this.Row.toString() + "," + this.Col.toString();
      this.hnr = this.Row;
      this.lnr = this.Col;
    }
    return this.jEe;
  }
  static GenObjFromKey(t) {
    t = t.split(",");
    return new JigsawIndex(Number(t[0]), Number(t[1]));
  }
  static GenKey(t, i) {
    return t.toString() + "," + i.toString();
  }
}
exports.JigsawIndex = JigsawIndex;
class JigsawState {
  constructor(t, i, s) {
    this.State = 0;
    this.Occupancy = false;
    this.ActivatedNum = 0;
    this.State = t ?? 0;
    this.Occupancy = i ?? false;
    this.ActivatedNum = s ?? 0;
  }
}
class BoxTraceCheckData {
  constructor(t, i, s) {
    this.Location = Vector_1.Vector.Create();
    this.TagId = 0;
    this.CurIndex = undefined;
    this.Location = t;
    this.TagId = i;
    this.CurIndex = s;
  }
}
let SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent_1 = class SceneItemJigsawBaseComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Config = undefined;
    this.EIe = undefined;
    this.Hte = undefined;
    this.fcn = undefined;
    this.pcn = new Map();
    this.vcn = new Map();
    this.Mcn = new Map();
    this.Ecn = undefined;
    this.Scn = undefined;
    this.ycn = 0;
    this.ui = false;
    this.Icn = new Set();
    this.Tcn = new Map();
    this.Lcn = undefined;
    this._Ga = undefined;
    this.Dcn = (t, i, s) => {
      const e = i.Entity.GetComponent(0).GetPbDataId();
      if (this.Icn.has(e)) {
        this.Rcn(i);
      }
      if (this._Ga && !i.Entity?.GetComponent(283)?.RegisterOnSceneInteractionLoadCompleted(() => {
        this.P5a(e);
      })) {
        this.P5a(e);
      }
    };
    this.Ucn = () => {
      this.Acn();
      this.Pcn();
    };
    this.Hfc = false;
    this.fFl = false;
    this.vFl = undefined;
    this.SFl = true;
    this.xcn = () => {
      if (!this.Tcn.size && this.Lcn) {
        TimerSystem_1.TimerSystem.Remove(this.Lcn);
        this.Lcn = undefined;
      }
      for (var [t, i] of this.Tcn) {
        var s = t.GetComponent(166);
        if (s?.Valid) {
          for (const e of i) {
            if (s.StartBoxTrace(e.Location)) {
              if (this.fcn.HasTagByIndex(e.CurIndex, e.TagId)) {
                this.fcn.RemoveTagsByIndex(e.CurIndex, e.TagId);
              }
            } else if (!this.fcn.HasTagByIndex(e.CurIndex, e.TagId)) {
              this.fcn.AddTagsByIndex(e.CurIndex, e.TagId);
            }
          }
        }
      }
    };
    this.uGa = undefined;
    this.cGa = undefined;
    this.mGa = undefined;
    this.dGa = undefined;
    this.CGa = undefined;
    this.wkl = false;
    this.ewl = false;
    this.gGa = (t, i) => {
      var s = this.Config.JigsawConfig.Column;
      var e = t % s;
      var h = Math.floor(t / s);
      var o = this.pGa;
      o.SetValue(h, e);
      var h = o.GetKey();
      if (this.Mcn.has(h) && (e = this.Mcn.get(h))) {
        o = i % s;
        h = Math.floor(i / s);
        (s = this.pGa).SetValue(h, o);
        h = s.GetKey();
        if (!this.Mcn.has(h)) {
          this.twl = true;
          this.wkl = true;
          this.Mcn.delete(e.PutDownIndex.GetKey());
          this.Mcn.set(s.GetKey(), e);
          o = e.Entity.GetComponent(283);
          h = this.Config?.JigsawConfig.Shape === IAction_1.EJigsawShape.Circle;
          if (o) {
            if (this._Ga.CheckIsCenter(t) || this._Ga.CheckIsCenter(i) || !h) {
              o.OnTicTacToePieceMove(s, this.vGa);
            } else {
              this.MGa(t, i);
              o.OnTicTacToePieceMove(s, this.vGa, this.uGa, this.cGa, this.mGa);
            }
          }
        }
      }
    };
    this.vGa = (t, i, s) => {
      if (this.oGa && t) {
        this.oGa(t);
      }
      this.fGa(i, s);
    };
    this.SGa = undefined;
    this.pGa = undefined;
    this.EGa = new Map();
    this.yGa = new Map();
    this.IGa = undefined;
    this.iwl = new Set();
    this.w5a = new Set();
    this.B5a = new Set();
    this.Ypc = () => {
      if (!!this._Ga && this.w5a.size === 0 && (!this.fcn || !!this.fcn.GetIsFinish())) {
        this.zpc();
      }
    };
    this.w1h = undefined;
    this.oGa = undefined;
    this.zll = undefined;
    this.vAl = undefined;
    this.QPl = undefined;
    this.KPl = undefined;
    this.mJl = false;
  }
  get IsTicTacToe() {
    return this._Ga !== undefined;
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemJigsawBaseComponent_1)[0];
    this.Config = t;
    for (const s of this.Config.JigsawConfig.Pieces) {
      var i = new JigsawIndex(s.Index.RowIndex, s.Index.ColumnIndex);
      switch (s.InitState) {
        case IAction_1.EJigsawPieceState.Disable:
          this.pcn.set(i.GetKey(), new JigsawState());
          break;
        case IAction_1.EJigsawPieceState.Correct:
          this.pcn.set(i.GetKey(), new JigsawState(1));
          break;
        case IAction_1.EJigsawPieceState.Incorrect:
          this.pcn.set(i.GetKey(), new JigsawState(2));
      }
    }
    return true;
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    this.Hte = this.Entity.GetComponent(214);
    this.fcn = this.Entity.GetComponent(170);
    return true;
  }
  OnActivate() {
    this.wcn();
    if (this.EIe.OccupiedGridInfo.size > 0) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Dcn);
      this.Icn.clear();
      for (const e of this.EIe.OccupiedGridInfo) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e[0]);
        this.Icn.add(e[0]);
        if (t?.IsInit) {
          this.Rcn(t);
        }
      }
    }
    if (this.Config.CompleteCondition.Type === IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece) {
      this.TGa();
    }
    if (this.EIe.DynamicGridInfo.length > 0) {
      for (const h of this.EIe.DynamicGridInfo) {
        var i = new JigsawIndex(h.zTs, h.ZTs);
        var s = MathUtils_1.MathUtils.LongToNumber(h.eLs);
        this.DynamicModifySocketState(i, s);
      }
    }
    this.SFl = this.EIe.BoardCanMove;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Dcn)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Dcn);
    }
    if (this.Lcn) {
      TimerSystem_1.TimerSystem.Remove(this.Lcn);
      this.Lcn = undefined;
    }
    return true;
  }
  DeleteItem(t) {
    t = t.PutDownIndex.GetKey();
    if (this.Mcn.has(t)) {
      this.Mcn.delete(t);
    }
  }
  Rcn(t) {
    var i = t.Entity.GetComponent(149);
    var s = t.Entity.GetComponent(0);
    var e = this.EIe.OccupiedGridInfo.get(s.GetPbDataId()).l8n;
    var h = new JigsawIndex(e.N5n, e.F5n);
    i.Rotation = e.V5n;
    var e = this.GetBlockLocationByIndex(h);
    var o = Rotator_1.Rotator.Create(0, -i.Rotation, 0).Quaternion();
    var o = this.Hte?.ActorTransform.TransformRotation(o.ToUeQuat()).Rotator();
    t.Entity.GetComponent(214)?.SetActorLocationAndRotation(e.ToUeVector(), o);
    var e = this.Entity.GetComponent(172);
    var o = e?.Config.Config.Type ?? IComponent_1.EItemFoundation.BuildingBlock;
    var t = t.Entity.GetComponent(167);
    if (t) {
      t.ActivatedOutlet = e;
      s.RelationId = this.EIe.GetPbDataId();
    }
    this.PutDownItem(i, h, o);
  }
  wcn() {
    if (this.Config.ModelId) {
      var s = [];
      var e = new Map();
      for (let i = 0; i < this.Config.JigsawConfig.Row; i++) {
        for (let t = 0; t < this.Config.JigsawConfig.Column; t++) {
          var h = new JigsawIndex(i, t);
          var o = [];
          if (this.Entity.GetComponent(144).IsInState(4)) {
            switch (this.GetBlockStateByIndex(h)) {
              case 2:
                o.push(-1375820440);
                s.push(h);
                break;
              case 1:
                o.push(-894208705);
                o.push(1248700469);
                s.push(h);
            }
          } else {
            switch (this.GetBlockStateByIndex(h)) {
              case 2:
                o.push(-1375820440);
                o.push(-2002333932);
                s.push(h);
                break;
              case 1:
                o.push(-894208705);
                o.push(-1270526641);
                s.push(h);
            }
          }
          e.set(h.GetKey(), o);
        }
      }
      this.fcn.InitGenerateInfo(this.Config.ModelId.toString(), s, t => this.GetBlockLocationByIndex(t, false), e, this.Ypc);
    } else {
      this.fcn.SetIsFinish(true);
    }
  }
  GetBlockLocationByIndex(s, e = true) {
    if (!(s.Row >= this.Config.JigsawConfig.Row) && !(s.Col >= this.Config.JigsawConfig.Column)) {
      var h = this.Config?.JigsawConfig.Shape;
      var o = this.vcn.get(s.GetKey());
      if (o !== undefined && e) {
        return o;
      }
      var o = this.Config.JigsawConfig.Row;
      var r = this.Config.JigsawConfig.Column;
      var o = new JigsawIndex(o / 2 - 0.5, r / 2 - 0.5);
      var r = o.Row - s.Row;
      var o = o.Col - s.Col;
      var n = this.Config.JigsawConfig.Size;
      let t = Vector2D_1.Vector2D.Create(r, o);
      if (h === IAction_1.EJigsawShape.Circle && (t = Vector2D_1.Vector2D.Create(-o, r), h = Math.max(Math.abs(r), Math.abs(o)), t.Size() > 0)) {
        r = h / t.Size();
        t = Vector2D_1.Vector2D.Create(r, r).MultiplyEqual(t);
      }
      t = Vector2D_1.Vector2D.Create(n, n).MultiplyEqual(t);
      let i = Vector_1.Vector.ZeroVectorProxy;
      if (e) {
        i = Vector_1.Vector.Create(this.Config.PlaceOffset.X ?? 0, this.Config.PlaceOffset.Y ?? 0, this.Config.PlaceOffset.Z ?? 0);
      }
      o = new UE.VectorDouble(t.X + i.X, -t.Y + i.Y, i.Z);
      h = Vector_1.Vector.Create(0, 0, 0);
      h.FromUeVector(this.Hte.ActorTransform.TransformPosition(o));
      if (e) {
        this.vcn.set(s.GetKey(), h);
      }
      return h;
    }
  }
  CalcJigsawSocketLocation(t = false) {
    var i;
    var s;
    var e;
    var h;
    var o;
    var r;
    var n;
    var a = Vector_1.Vector.Create(CameraController_1.CameraController.CameraLocation);
    var c = Vector_1.Vector.Create(0, 0, 0);
    CameraController_1.CameraController.CameraRotator.Vector(c);
    c.Normalize();
    let _ = MathUtils_1.MathUtils.MaxFloat;
    let l = undefined;
    for ([i, s] of this.pcn) {
      if (s.State !== 0 && (!s.Occupancy || !!t)) {
        e = JigsawIndex.GenObjFromKey(i);
        h = this.GetBlockLocationByIndex(e);
        o = Vector_1.Vector.Create(a);
        h.Subtraction(a, o);
        h = Vector_1.Vector.Create(o);
        o.Normalize();
        o = o.DotProduct(c);
        if ((o = Math.acos(o) * (180 / Math.PI) * h.Size()) < _) {
          _ = o;
          l = e;
        }
      }
    }
    if (l === undefined) {
      return [undefined, undefined];
    } else {
      r = Vector_1.Vector.Create(this.GetBlockLocationByIndex(l));
      n = this.Hte?.ActorTransform.InverseTransformPosition(r.ToUeVector());
      r.FromUeVector(n);
      return [r, l];
    }
  }
  CheckJigsawBlockIllegal(t, i) {
    if (t.Config.FillCfg.Type !== IComponent_1.EFillType.Direction) {
      for (const e of t.GetActiveBlockOffset()) {
        var s = new JigsawIndex(i.Row + e.Row, i.Col + e.Col);
        var s = this.pcn.get(s.GetKey());
        if (s === undefined || s.State === 0 || s.Occupancy) {
          return true;
        }
      }
    }
    return false;
  }
  CheckJigsawBlockCorrect(t, i) {
    for (const e of t.GetActiveBlockOffset()) {
      var s = new JigsawIndex(i.Row + e.Row, i.Col + e.Col);
      if (this.pcn.get(s.GetKey()).State !== 1) {
        return false;
      }
    }
    return true;
  }
  PutDownItem(i, s, e, h = true) {
    var t = i.Entity.GetComponent(166);
    if (t) {
      t.UpdateBoxTrace(this, s);
    }
    i.PutDownIndex = s;
    i.OnPutDownToBase(this);
    var t = this.pcn.get(s.GetKey());
    if (t.State === 0 || t.Occupancy && e !== IComponent_1.EItemFoundation.PulseDevice) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "[SceneItemJigsawBaseComponent.OnputDownItem] 目标位置不可用");
      }
    } else {
      let t = [];
      switch (i.Config.FillCfg.Type) {
        case IComponent_1.EFillType.Fixed:
          t = i.GetActiveBlockOffset();
          break;
        case IComponent_1.EFillType.Direction:
          t = this.Bcn(s, i.Direction, i.Rotation);
      }
      for (const _ of t) {
        var o = new JigsawIndex(s.Row + _.Row, s.Col + _.Col);
        var r = o.GetKey();
        var n = this.pcn.get(r);
        if (e === IComponent_1.EItemFoundation.BuildingBlock && n.State !== 0) {
          n.Occupancy = true;
        }
        let t = undefined;
        if (n.ActivatedNum === 0) {
          if (n.State === 2) {
            t = -1279673628;
          } else if (n.State === 1) {
            t = 692213831;
          }
        }
        n.ActivatedNum += 1;
        if (n.ActivatedNum > 0) {
          n.Occupancy = true;
        }
        if (t !== undefined) {
          this.fcn.AddTagsByIndex(o, t);
        }
        if (e === IComponent_1.EItemFoundation.PulseDevice && r !== s.GetKey() && !this.Mcn.has(r)) {
          n.Occupancy = false;
        }
      }
      this.Mcn.set(s.GetKey(), i);
      for (var [a, c] of this.Mcn) {
        a = JigsawIndex.GenObjFromKey(a);
        if (!this.Tcn.has(c.Entity) && !(this.Tcn.set(c.Entity, []), this.Lcn)) {
          this.Lcn = TimerSystem_1.TimerSystem.Forever(this.xcn, TIMER_PERIOD);
        }
        this.bcn(a, c);
      }
      if (h) {
        this.CheckFinish();
      }
    }
  }
  CheckFinish() {
    switch (this.Config.CompleteCondition.Type) {
      case IComponent_1.EJigsawCompleteCondition.ActivateAllCorrectPiece:
        for (var [, t] of this.pcn) {
          if (t.State === 1 && t.ActivatedNum <= 0) {
            return;
          }
        }
        break;
      case IComponent_1.EJigsawCompleteCondition.PutInTheSpecifiedPiece:
        for (const s of this.Config.CompleteCondition.MatchList) {
          var i = JigsawIndex.GenKey(s.Index.RowIndex, s.Index.ColumnIndex);
          var i = this.Mcn.get(i);
          if (!i?.Valid || i.CreatureDataComp.GetPbDataId() !== s.EntityId) {
            return;
          }
        }
        break;
      default:
        IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece;
        return;
    }
    this.EDe();
  }
  PickUpItem(t, i, s, e = true) {
    t.OnPickUpFormBase(this);
    let h = [];
    switch (t.Config.FillCfg.Type) {
      case IComponent_1.EFillType.Fixed:
        h = t.GetActiveBlockOffset();
        break;
      case IComponent_1.EFillType.Direction:
        h = this.Bcn(i, t.Direction, t.Rotation);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 31, "[SceneItemJigsawBaseComp] OnPickUpItem", ["PbDataId", t.Entity.GetComponent(0)?.GetPbDataId()], ["SocketIndex", i.GetKey()], ["Direction", t.Direction.toString(2)], ["Rotation", t.Rotation], ["offset", h]);
    }
    for (const _ of h) {
      var o = new JigsawIndex(i.Row + _.Row, i.Col + _.Col);
      var r = o.GetKey();
      var r = this.pcn.get(r);
      if (s === IComponent_1.EItemFoundation.BuildingBlock && r.State !== 0) {
        r.Occupancy = false;
      }
      let t = undefined;
      --r.ActivatedNum;
      if (r.ActivatedNum === 0) {
        if (r.State === 2) {
          t = -1279673628;
        } else if (r.State === 1) {
          t = 692213831;
        }
        r.Occupancy = false;
      }
      if (t !== undefined) {
        this.fcn.RemoveTagsByIndex(o, t);
      }
    }
    let n = "";
    for (var [a, c] of this.Mcn) {
      if (c === t) {
        n = a;
        break;
      }
    }
    if (n !== "") {
      this.Mcn.delete(n);
    }
    this.RemoveMagnetTipsTag(i);
    if (this.Tcn.has(t.Entity)) {
      this.Tcn.delete(t.Entity);
    }
    if (e) {
      this.CheckFinish();
    }
  }
  GetBlockStateByIndex(t) {
    t = t.GetKey();
    return this.pcn.get(t).State;
  }
  AimBlockByIndex(t, h) {
    if (t?.GetKey() !== this.Ecn?.GetKey() || h.Rotation !== this.ycn || h !== this.Scn) {
      var i = h.Entity.GetComponent(167);
      i?.TryRemoveTagById(-2116928595);
      i?.TryAddTagById(-2116928595);
      this.Gcn();
      this.Acn();
      this.Ecn = t;
      this.Scn = h;
      this.ycn = h.Rotation;
      ResourceSystem_1.ResourceSystem.LoadAsync(ConfigManager_1.ConfigManager.ManipulateConfig.MatControllerDaPath, UE.ItemMaterialControllerActorData_C, t => {
        var i;
        var s;
        var e;
        if (t?.IsValid()) {
          i = this.Scn.Entity.GetComponent(214);
          s = new UE.TransformDouble();
          e = this.GetBlockLocationByIndex(this.Ecn).ToUeVector();
          s.SetLocation(e);
          e = Rotator_1.Rotator.Create(0, -h.Rotation, 0).Quaternion();
          e = this.Hte?.ActorTransform.TransformRotation(e.ToUeQuat());
          s.SetRotation(e);
          i.GetInteractionMainActor().MakeActorProjection(s, t);
        }
      });
      var s = this.CheckJigsawBlockIllegal(h, t);
      for (const r of this.Ncn(t, h)) {
        var e = new JigsawIndex(t.Row + r.Row, t.Col + r.Col);
        var e = this.fcn.GetInteractionActorByIndex(e);
        if (e) {
          var o = e.GetRefActorsByTag(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(s ? -1517802777 : -1817626386));
          for (let t = 0; t < o.Num(); t++) {
            o.Get(t)?.SetActorHiddenInGame(false);
          }
        }
      }
    }
  }
  Ncn(t, i, s) {
    switch (i.Config.FillCfg.Type) {
      case IComponent_1.EFillType.Fixed:
        return i.GetActiveBlockOffset(s);
      case IComponent_1.EFillType.Direction:
        return this.Bcn(t, i.Direction, s ?? i.Rotation);
    }
    return [];
  }
  Gcn() {
    if (!this.ui) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.HideJigsawBaseHint, this.Ucn);
      this.ui = true;
    }
  }
  Pcn() {
    if (this.ui) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.HideJigsawBaseHint, this.Ucn);
      this.ui = false;
    }
  }
  Acn() {
    if (this.Ecn && this.Scn) {
      this.Scn.Entity.GetComponent(214).GetInteractionMainActor().RemoveActorProjection();
      var t = this.Ncn(this.Ecn, this.Scn, this.ycn);
      for (const i of t) {
        var s = new JigsawIndex(this.Ecn.Row + i.Row, this.Ecn.Col + i.Col);
        var s = this.fcn.GetInteractionActorByIndex(s);
        if (s) {
          let i = s.GetRefActorsByTag(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-1517802777));
          for (let t = 0; t < i.Num(); t++) {
            i.Get(t)?.SetActorHiddenInGame(true);
          }
          i = s.GetRefActorsByTag(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-1817626386));
          for (let t = 0; t < i.Num(); t++) {
            i.Get(t)?.SetActorHiddenInGame(true);
          }
        }
      }
    }
    this.Ecn = undefined;
    this.Scn = undefined;
  }
  RequestPutDownOrPickUpItem(t, i, s) {
    var e = Protocol_1.Aki.Protocol.ZJn.create();
    var h = Protocol_1.Aki.Protocol.TFs.create();
    var o = Protocol_1.Aki.Protocol.LFs.create();
    var r = Protocol_1.Aki.Protocol.Gks.create();
    var n = Protocol_1.Aki.Protocol.D2s.create();
    var a = t.Entity;
    var c = a.GetComponent(214);
    var _ = c.ActorLocationProxy;
    var c = c.ActorRotationProxy;
    h.N5n = i.Row;
    h.F5n = i.Col;
    h.V5n = t.Rotation;
    r.X = _.X;
    r.Y = _.Y;
    r.Z = _.Z;
    n.Pitch = c.Pitch;
    n.Roll = c.Roll;
    n.Yaw = c.Yaw;
    o.l8n = r;
    o._8n = n;
    e.G5n = MathUtils_1.MathUtils.NumberToLong(this.EIe.GetCreatureDataId());
    e.O5n = MathUtils_1.MathUtils.NumberToLong(a.GetComponent(0).GetCreatureDataId());
    e.H5n = s ? 1 : 0;
    e.k5n = h;
    e.sKn = o;
    Net_1.Net.Call(21896, e, t => {
      switch (t.G9n) {
        case Protocol_1.Aki.Protocol.Q4n.KRs:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlaceFailOfAlreadyOnBoard:
          break;
        default:
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.G9n, 15614);
      }
    });
  }
  EDe() {
    var t = Protocol_1.Aki.Protocol.izn.create();
    t.j5n = MathUtils_1.MathUtils.NumberToLong(this.EIe.GetCreatureDataId());
    Net_1.Net.Call(15963, t, t => {
      if (t.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        this.OnFinish();
      } else if (t.G9n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrBoardNotActiveAllGrid) {
        this.Hfc = true;
      }
      if (this.Config.CompleteCondition.Type === IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece) {
        this.LGa();
      }
    });
  }
  OnFinish() {
    for (var [t, i] of this.pcn) {
      if (i.State === 1) {
        this.fcn.AddTagsByIndex(JigsawIndex.GenObjFromKey(t), 1248700469);
      }
      if (i.State !== 0) {
        this.fcn.RemoveTagsByIndex(JigsawIndex.GenObjFromKey(t), 692213831);
        this.fcn.RemoveTagsByIndex(JigsawIndex.GenObjFromKey(t), -1270526641);
        this.fcn.RemoveTagsByIndex(JigsawIndex.GenObjFromKey(t), -1279673628);
        this.fcn.RemoveTagsByIndex(JigsawIndex.GenObjFromKey(t), -2002333932);
      }
    }
    for (const s of this.Mcn) {
      s[1].OnFinish();
    }
  }
  Bcn(t, i, s) {
    let e = [new JigsawIndex(0, 0)];
    if (this.Ocn(i, 1)) {
      e = e.concat(this.kcn(t, s));
    }
    if (this.Ocn(i, 2)) {
      e = e.concat(this.kcn(t, s + 180));
    }
    if (this.Ocn(i, 3)) {
      e = e.concat(this.kcn(t, s + 90));
    }
    return e = this.Ocn(i, 4) ? e.concat(this.kcn(t, s + 270)) : e;
  }
  Ocn(t, i) {
    return (t >> i & 1) == 1;
  }
  kcn(i, t) {
    var s = [];
    var e = [{
      RowDelta: -1,
      ColDelta: 0
    }, {
      RowDelta: 0,
      ColDelta: -1
    }, {
      RowDelta: 1,
      ColDelta: 0
    }, {
      RowDelta: 0,
      ColDelta: 1
    }];
    var h = (Math.floor(t / 90) % 4 + 4) % 4;
    for (let t = 0; t < this.Config.JigsawConfig.Row * this.Config.JigsawConfig.Column; t++) {
      var o = i.Row + e[h].RowDelta * t;
      var r = i.Col + e[h].ColDelta * t;
      if (o < 0 || o >= this.Config.JigsawConfig.Row || r < 0 || r >= this.Config.JigsawConfig.Column) {
        break;
      }
      var n = this.pcn.get(JigsawIndex.GenKey(o, r));
      if (n && n.State === 0) {
        break;
      }
      s.push(new JigsawIndex(o - i.Row, r - i.Col));
    }
    return s;
  }
  GetNextPosByDirection(t, i, s) {
    var e = new JigsawIndex(t.Row, t.Col);
    var h = Vector_1.Vector.Create(i);
    var o = Vector_1.Vector.Create(this.Hte.ActorUpProxy);
    o.Normalize();
    var r = Vector_1.Vector.Create();
    var i = i.DotProduct(o);
    o.Multiply(i, r);
    h.SubtractionEqual(r);
    h.Normalize();
    var o = Vector_1.Vector.Create(0, 0, 0);
    this.Hte.ActorQuatProxy.RotateVector(Vector_1.Vector.BackwardVectorProxy, o);
    var i = Vector_1.Vector.Create(0, 0, 0);
    this.Hte.ActorQuatProxy.RotateVector(Vector_1.Vector.LeftVectorProxy, i);
    var n = s.GetComponent(166);
    for (const _ of [{
      Vector: this.Hte.ActorForwardProxy,
      RowDelta: -1,
      ColDelta: 0
    }, {
      Vector: this.Hte.ActorRightProxy,
      RowDelta: 0,
      ColDelta: 1
    }, {
      Vector: o,
      RowDelta: 1,
      ColDelta: 0
    }, {
      Vector: i,
      RowDelta: 0,
      ColDelta: -1
    }]) {
      if (MathUtils_1.MathUtils.DotProduct(h, _.Vector) > COS_45) {
        while (e.Row >= 0 && e.Row < this.Config.JigsawConfig.Row && e.Col >= 0 && e.Col < this.Config.JigsawConfig.Column) {
          e.Row += _.RowDelta;
          e.Col += _.ColDelta;
          if (this.pcn.has(e.GetKey())) {
            var a;
            var c = this.pcn.get(e.GetKey());
            if (c.State !== 0) {
              a = this.GetBlockLocationByIndex(e);
              if (n?.StartBoxTrace(a) || c.ActivatedNum !== 0) {
                return t;
              } else {
                return e;
              }
            }
          }
        }
        return t;
      }
    }
    return e;
  }
  OnItemMove(t, i) {
    this.PickUpItem(t, t.PutDownIndex, IComponent_1.EItemFoundation.BuildingBlock, false);
    this.PutDownItem(t, i, IComponent_1.EItemFoundation.BuildingBlock, false);
    this.RequestMoveItem(t, i);
    this.CheckFinish();
  }
  RequestMoveItem(s, t, i = undefined) {
    var e = Protocol_1.Aki.Protocol.nzn.create();
    var h = Protocol_1.Aki.Protocol.TFs.create();
    var o = Protocol_1.Aki.Protocol.LFs.create();
    var r = Protocol_1.Aki.Protocol.Gks.create();
    var n = Protocol_1.Aki.Protocol.D2s.create();
    var a = s.Entity;
    var c = a.GetComponent(214);
    var _ = c.ActorLocationProxy;
    var c = c.ActorRotationProxy;
    h.N5n = t.Row;
    h.F5n = t.Col;
    h.V5n = s.Rotation;
    r.X = _.X;
    r.Y = _.Y;
    r.Z = _.Z;
    n.Pitch = c.Pitch;
    n.Roll = c.Roll;
    n.Yaw = c.Yaw;
    o.l8n = r;
    o._8n = n;
    e.G5n = MathUtils_1.MathUtils.NumberToLong(this.EIe.GetCreatureDataId());
    e.O5n = MathUtils_1.MathUtils.NumberToLong(a.GetComponent(0).GetCreatureDataId());
    e.k5n = h;
    e.sKn = o;
    if (this.Config?.CompleteCondition.Type === IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece) {
      this.vFl = i;
      this.fFl = true;
    }
    Net_1.Net.Call(19901, e, t => {
      switch (t.G9n) {
        case Protocol_1.Aki.Protocol.Q4n.KRs:
          break;
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrGridPosAlreadyOccupied:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrInvalidGridPos:
          break;
        default:
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.G9n, 19876);
      }
      var i;
      if (this.Config?.CompleteCondition.Type === IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece) {
        if (t.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (this.SFl) {
            this.MFl();
          }
        } else if (this.vFl && (this.fGa(s, this.vFl, false, false), i = s.Entity.GetComponent(283))) {
          i.SetTicTacToePieceLocation(this.vFl, this.oGa);
        }
        this.vFl = undefined;
      }
    });
  }
  OnBoardCanMovePlacementNotify(t) {
    if (this.Config?.CompleteCondition.Type === IComponent_1.EJigsawCompleteCondition.ActivateRenjuPiece) {
      if (this.SFl = t) {
        if (this.KPl) {
          this.KPl();
        }
        this.MFl();
      } else if (this.QPl) {
        this.QPl();
      }
    }
  }
  RemoveMagnetTipsTag(t) {
    this.fcn.RemoveTagsByIndex(t, 1531999982);
    this.fcn.RemoveTagsByIndex(t, -1705770981);
    this.fcn.RemoveTagsByIndex(t, -230062685);
    this.fcn.RemoveTagsByIndex(t, -447552724);
  }
  bcn(i, t) {
    if (this.pcn.get(i.GetKey()).State !== 1) {
      var s = t.Entity.GetComponent(166);
      var e = [];
      for (const r of [{
        Tag: 1531999982,
        RowDelta: -1,
        ColDelta: 0
      }, {
        Tag: -1705770981,
        RowDelta: 1,
        ColDelta: 0
      }, {
        Tag: -230062685,
        RowDelta: 0,
        ColDelta: -1
      }, {
        Tag: -447552724,
        RowDelta: 0,
        ColDelta: 1
      }]) {
        let t = false;
        for (var h = new JigsawIndex(i.Row, i.Col); h.Row >= 0 && h.Row < this.Config.JigsawConfig.Row && h.Col >= 0 && h.Col < this.Config.JigsawConfig.Column;) {
          h.Row += r.RowDelta;
          h.Col += r.ColDelta;
          if (this.pcn.has(h.GetKey())) {
            var o = this.pcn.get(h.GetKey());
            if (o.State !== 0) {
              if (o.ActivatedNum === 0) {
                o = this.GetBlockLocationByIndex(h);
                e.push(new BoxTraceCheckData(o, r.Tag, i));
                if (!s?.StartBoxTrace(o) && !(t = true, this.fcn.HasTagByIndex(i, r.Tag))) {
                  this.fcn.AddTagsByIndex(i, r.Tag);
                }
              }
              break;
            }
          }
        }
        if (!t) {
          this.fcn.RemoveTagsByIndex(i, r.Tag);
        }
      }
      this.Tcn.set(t.Entity, e);
    }
  }
  HasEmptySocket() {
    for (var [, t] of this.pcn) {
      if (t.State !== 0 && !t.Occupancy) {
        return true;
      }
    }
    return false;
  }
  DynamicModifySocketState(t, i) {
    var s = this.pcn.get(t.GetKey());
    if (s.State !== i) {
      var e;
      var h;
      var o = [];
      if (s.State === 0) {
        o.push(i === 1 ? -894208705 : -1375820440);
        this.fcn.DynamicAddActorByIndex(t, o);
      } else if (i !== 0) {
        if (s.State === 1) {
          this.fcn.RemoveTagsByIndex(t, -894208705);
        } else if (s.State === 2) {
          this.fcn.RemoveTagsByIndex(t, -1375820440);
        }
        if (i === 1) {
          this.fcn.AddTagsByIndex(t, -894208705);
        } else {
          this.fcn.AddTagsByIndex(t, -1375820440);
        }
      } else {
        this.fcn.DynamicRemoveActorByIndex(t);
      }
      s.State = i;
      for ([e, h] of this.Mcn) {
        this.bcn(JigsawIndex.GenObjFromKey(e), h);
      }
    }
  }
  GetAllItemOnBase() {
    var t;
    var i = [];
    for ([, t] of this.Mcn) {
      i.push(t);
    }
    return i;
  }
  GetPutItemIndex(t) {
    let i = "";
    for (var [s, e] of this.Mcn) {
      if (e === t) {
        i = s;
      }
    }
    if (i !== "") {
      return JigsawIndex.GenObjFromKey(i);
    }
  }
  MGa(t, i) {
    if (!this.uGa) {
      this.uGa = Vector_1.Vector.Create();
      this.cGa = Vector_1.Vector.Create();
      this.mGa = Vector_1.Vector.Create();
      this.dGa = Vector_1.Vector.Create();
      this.CGa = Vector_1.Vector.Create();
    }
    var s = this.Config.JigsawConfig.Row;
    var e = this.Config.JigsawConfig.Column;
    this.dGa.X = t % e;
    this.dGa.Y = Math.floor(t / e);
    this.dGa.Z = 0;
    this.CGa.X = i % e;
    this.CGa.Y = Math.floor(i / e);
    this.CGa.Z = 0;
    var t = s / 2 - 0.5;
    var i = e / 2 - 0.5;
    this.dGa.X = this.dGa.X - i;
    this.dGa.Y = this.dGa.Y - t;
    this.CGa.X = this.CGa.X - i;
    this.CGa.Y = this.CGa.Y - t;
    var s = Math.max(Math.abs(this.dGa.X), Math.abs(this.dGa.Y));
    let h = MathUtils_1.MathUtils.GetAngleByVector2D(this.dGa);
    let o = MathUtils_1.MathUtils.GetAngleByVector2D(this.CGa);
    if (h > 0 && o < 0) {
      o += 360;
    } else if (h < 0 && o > 0) {
      h += 360;
    }
    e = h + (o - h) / 4;
    i = h + (o - h) * 2 / 4;
    t = h + (o - h) * 3 / 4;
    MathUtils_1.MathUtils.GetVector2dByAngle(e, this.uGa);
    MathUtils_1.MathUtils.GetVector2dByAngle(i, this.cGa);
    MathUtils_1.MathUtils.GetVector2dByAngle(t, this.mGa);
    e = this.Config.JigsawConfig.Size;
    this.uGa.MultiplyEqual(e * s);
    this.cGa.MultiplyEqual(e * s);
    this.mGa.MultiplyEqual(e * s);
    this.uGa.X += this.Config.PlaceOffset.X ?? 0;
    this.uGa.Y += this.Config.PlaceOffset.Y ?? 0;
    this.uGa.Z = this.Config.PlaceOffset.Z ?? 0;
    this.cGa.X += this.Config.PlaceOffset.X ?? 0;
    this.cGa.Y += this.Config.PlaceOffset.Y ?? 0;
    this.cGa.Z = this.Config.PlaceOffset.Z ?? 0;
    this.mGa.X += this.Config.PlaceOffset.X ?? 0;
    this.mGa.Y += this.Config.PlaceOffset.Y ?? 0;
    this.mGa.Z = this.Config.PlaceOffset.Z ?? 0;
    this.uGa.FromUeVector(this.Hte.ActorTransform.TransformPosition(this.uGa.ToUeVector()));
    this.cGa.FromUeVector(this.Hte.ActorTransform.TransformPosition(this.cGa.ToUeVector()));
    this.mGa.FromUeVector(this.Hte.ActorTransform.TransformPosition(this.mGa.ToUeVector()));
  }
  get twl() {
    return this.ewl;
  }
  set twl(t) {
    if (this.ewl !== t) {
      this.ewl = t;
      for (const i of this.iwl) {
        i.OnTicTacToePieceMovingChange(t);
      }
    }
  }
  MFl() {
    if (this.wkl && this._Ga) {
      if (this._Ga.IsFinish) {
        this.EDe();
      } else if (this.fFl && (this.fFl = false, this._Ga.NextRound(), this._Ga.IsPlayerRound)) {
        this.wkl = false;
        this.twl = false;
      }
    }
  }
  b5a() {
    var t = this.Config.InitMatchList;
    var i = this.Config.JigsawConfig.Column;
    var s = this.EIe.ComponentDataMap.get("rI_")?.rI_;
    if (s) {
      this._Ga.SetCurrentRound(s.BI_);
      var e = s?.kI_;
      if (e) {
        for (const c of this.EIe.OccupiedGridInfo) {
          if (e === c[0]) {
            var h = c[1].l8n;
            if (h) {
              h = h.N5n * i + h.F5n;
              if (this._Ga.CheckGameOver(h)) {
                this.EDe();
                return;
              }
            }
          }
        }
        for (const _ of t) {
          if (e === _.EntityId) {
            var o = _.Index;
            var o = o.RowIndex * i + o.ColumnIndex;
            if (this._Ga.CheckGameOver(o)) {
              this.EDe();
              return;
            }
          }
        }
      }
    }
    this.iwl.clear();
    for (const l of this._Ga.GetPlayerPieces()) {
      var r = l % i;
      var n = Math.floor(l / i);
      var a = this.pGa;
      a.SetValue(n, r);
      var n = a.GetKey();
      if (this.Mcn.has(n) && (r = this.Mcn.get(n)) && (a = r.Entity?.GetComponent(283)) && (this.iwl.add(a), this.mJl)) {
        a.OnTicTacToePieceMovingChange(this.twl);
      }
    }
  }
  TGa() {
    const e = this.Config?.CompleteCondition;
    if (e && !(e.RenjuConfig.length < 2) && !(this.EIe.OccupiedGridInfo.size < 1)) {
      this._Ga ||= new TicTacToeGame_1.TicTacToeGame();
      this.pGa = new JigsawIndex(0, 0);
      var h = new Map();
      var o = new Map();
      var r = new Array();
      var n = new Array();
      let t = undefined;
      let i = undefined;
      for (const f of e.RenjuConfig) {
        if (f.Controller === "Computer") {
          i = f;
        } else if (f.Controller === "Player") {
          t = f;
        }
      }
      var a = this.Config.JigsawConfig.Column;
      let s = false;
      if (t && i && t.Order > i.Order) {
        s = true;
      }
      this._Ga.Init(s, this.gGa);
      this.B5a.clear();
      this.w5a.clear();
      for (const e of this.Config.InitMatchList) {
        var c;
        var _ = e.Index;
        this.B5a.add(e.EntityId);
        if (t?.EntityIds?.includes(e.EntityId)) {
          c = _.RowIndex * a + _.ColumnIndex;
          h.set(e.EntityId, c);
          r.push(c);
        } else if (i?.EntityIds?.includes(e.EntityId)) {
          c = _.RowIndex * a + _.ColumnIndex;
          o.set(e.EntityId, c);
          n.push(c);
        }
        var _ = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e.EntityId);
        if (!_?.IsInit) {
          this.w5a.add(e.EntityId);
        }
      }
      this._Ga.InitBoardInfo(n, r, true);
      n.length = 0;
      r.length = 0;
      for (const d of this.EIe.OccupiedGridInfo) {
        var l;
        var v = d[1].l8n;
        if (v) {
          if (t?.EntityIds?.includes(d[0])) {
            l = v.N5n * a + v.F5n;
            h.set(d[0], l);
          } else if (i?.EntityIds?.includes(d[0])) {
            l = v.N5n * a + v.F5n;
            o.set(d[0], l);
          }
        }
      }
      for (const m of h.values()) {
        r.push(m);
      }
      for (const w of o.values()) {
        n.push(w);
      }
      this._Ga.InitBoardInfo(n, r);
      if (this.w5a.size === 0 && (this.b5a(), this.vAl)) {
        this.vAl();
      }
    }
  }
  get WaitingInitPiecesComplete() {
    return this.w5a.size === 0;
  }
  P5a(t) {
    if (this.w5a.has(t)) {
      this.w5a.delete(t);
      if (this.w5a.size === 0 && (!this.fcn || !!this.fcn.GetIsFinish())) {
        this.zpc();
      }
    }
  }
  zpc() {
    var t;
    this.b5a();
    if (this.vAl) {
      this.vAl();
    } else {
      (t = new Protocol_1.Aki.Protocol.Mv_()).F4n = MathUtils_1.MathUtils.NumberToLong(this.EIe.GetCreatureDataId());
      Net_1.Net.Call(29570, t, t => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Level", 36, "OnWaitInitPiecesComplete RenjuExitMatchedActionResponse", ["ErrorCode", t.G9n]);
        }
      });
    }
  }
  ResetTicTacToeGame() {
    var t;
    var i;
    if (this._Ga && (!this._Ga.IsFinish || this.Hfc) && (this.Hfc = false, this.fFl = false, this.vFl = undefined, this.w1h = undefined, this.wkl = false, this.ewl = false, t = this.EIe?.GetCreatureDataId())) {
      (i = Protocol_1.Aki.Protocol.mf_.create()).F4n = t;
      Net_1.Net.Call(23978, i, t => {
        if (t?.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          var i = new Map();
          for (const r of this.Mcn) {
            var s = r[1];
            var e = s.CreatureDataComp.GetPbDataId();
            i.set(e, s);
          }
          t = this.Config?.InitMatchList;
          if (t) {
            this.Mcn.clear();
            for (const n of t) {
              var h;
              var o = n.EntityId;
              if (i.has(o) && (h = new JigsawIndex(n.Index.RowIndex, n.Index.ColumnIndex), o = i.get(o), this.Mcn.set(h.GetKey(), o), this.fGa(o, h, false, false), o = o.Entity.GetComponent(283))) {
                o.SetTicTacToePieceLocation(h, this.oGa);
              }
            }
            this._Ga.ResetGame();
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Level", 36, "ResetTicTacToeGame Failed", ["EntityId", this.Entity.Id], ["PbDataId", this.EIe?.GetPbDataId()]);
        }
      });
    }
  }
  OnItemTicTacToeSelect(t) {
    const i = t.Index;
    if (i) {
      this.SGa ||= new Array();
      var s = this.Config.JigsawConfig.Column;
      var e = i.Row * s + i.Col;
      var e = this._Ga.GetNoneNeighbors(e);
      this.SGa.length = 0;
      for (const i of e) {
        var h = i % s;
        var o = Math.floor(i / s);
        this.pGa.SetValue(o, h);
        var o = this.GetBlockLocationByIndex(this.pGa);
        if (o) {
          this.SGa.push(o);
        }
      }
      this.IGa = t;
      return this.SGa;
    }
  }
  OnGridTicTacToeClick(t) {
    var i;
    var s = this.IGa?.Item;
    return !!s && (i = this.Config.JigsawConfig.Column, i = t.Row * i + t.Col, !!this._Ga.CheckCanMove(i)) && (this.OnItemTicTacToeMove(s, t), this.IGa && (this.IGa.OnSelectEnd(), this.IGa = undefined), true);
  }
  fGa(t, i, s = true, e = true) {
    let h = undefined;
    if (e) {
      h = new JigsawIndex(t.PutDownIndex.Row, t.PutDownIndex.Col);
    }
    t.OnPickUpFormBase(this);
    t.PutDownIndex ||= new JigsawIndex(0, 0);
    t.PutDownIndex.DeepCopy(i);
    if (e) {
      this.RequestMoveItem(t, i, h);
    }
    t.OnPutDownToBase(this);
    if (s) {
      this.CheckFinish();
    }
  }
  OnItemTicTacToeMove(t, i) {
    var s;
    if (this.IsTicTacToe) {
      s = this.Config.JigsawConfig.Column;
      t = t.PutDownIndex.Row * s + t.PutDownIndex.Col;
      s = i.Row * s + i.Col;
      this._Ga.OnIndexMove(t, s);
    }
  }
  GetPickItemActors() {
    this.EGa.clear();
    this.yGa.clear();
    var s = new Array();
    for (const n of this.B5a) {
      var t;
      var i;
      var e;
      var h = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(n);
      if (h && (t = EntitySystem_1.EntitySystem.GetComponent(h.Id, 282)) && (i = EntitySystem_1.EntitySystem.GetComponent(h.Id, 214), h = EntitySystem_1.EntitySystem.GetComponent(h.Id, 149)) && (h = h.PutDownIndex, e = this.Config.JigsawConfig.Column, e = h.Row * e + h.Col, this._Ga?.CheckIsPlayerPiece(e)) && (h = i?.GetInteractionMainActor())) {
        this.EGa.set(h, t);
        s.push(h);
      }
    }
    for (let i = 0; i < this.Config.JigsawConfig.Row; i++) {
      for (let t = 0; t < this.Config.JigsawConfig.Column; t++) {
        var o = new JigsawIndex(i, t);
        var r = this.fcn.GetInteractionActorByIndex(o);
        if (r) {
          this.yGa.set(r, o);
          s.push(r);
        }
      }
    }
    return s;
  }
  ClearLevelPickSelect() {
    var t;
    if (this.w1h) {
      this.w1h.OnSelectEnd();
      if (t = this.w1h.Entity.GetComponent(283)) {
        t.OnTicTacToePieceSelect(false, true);
      }
      this.w1h = undefined;
    }
    this.twl = false;
  }
  LevelPickSelectUndefined() {
    if (this.w1h) {
      this.ClearLevelPickSelect();
      for (const t of this.iwl) {
        t.OnTicTacToePieceSelect(false, true);
      }
    }
  }
  ForceResetPieceSelect(t) {
    if (t) {
      this.w1h = undefined;
      this.twl = false;
      for (const i of this.iwl) {
        i.OnTicTacToePieceSelect(false, true);
      }
    } else {
      for (const s of this.iwl) {
        s.OnTicTacToePieceSelect(false, false);
      }
    }
  }
  OnLevelPickClick(t) {
    if (!this._Ga?.IsFinish && !this.twl && !this.wkl) {
      if (this.yGa.has(t)) {
        var i = this.yGa.get(t);
        if (i && this.OnGridTicTacToeClick(i)) {
          return;
        }
      }
      if (this.EGa.has(t)) {
        i = this.EGa.get(t);
        if (i) {
          this.ClearLevelPickSelect();
          i.OnSelect();
          this.w1h = i;
          var s = this.w1h.Entity.GetComponent(283);
          if (s) {
            s.OnTicTacToePieceSelect(true, false);
          }
          for (const e of this.iwl) {
            if (e !== s) {
              e.OnTicTacToePieceSelect(false, false);
            }
          }
        }
      }
    }
  }
  LGa() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 36, "[SceneItemJigsawBaseComponent.OnTicTacToeGameOver]", ["PlayerWin", this._Ga?.PlayerWin], ["AiWin", this._Ga?.AiWin]);
    }
    if (this.zll) {
      this.zll(this._Ga?.PlayerWin ?? false);
    }
  }
  RegisterPickControllerEvents(t, i, s, e, h) {
    this.mJl = true;
    this.oGa = t;
    this.zll = i;
    this.vAl = s;
    this.QPl = e;
    this.KPl = h;
  }
  UnregisterPickControllerEvents() {
    this.mJl = false;
    this.oGa = undefined;
    this.zll = undefined;
    this.vAl = undefined;
    this.QPl = undefined;
    this.KPl = undefined;
  }
  RegisterAiInfo(t) {
    if (this._Ga && t) {
      this._Ga.RefreshAiInfo(t);
    }
  }
  RefreshAiEnable(t) {
    if (this._Ga) {
      this._Ga.RefreshAiEnable(t);
    }
  }
};
SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(148)], SceneItemJigsawBaseComponent);
exports.SceneItemJigsawBaseComponent = SceneItemJigsawBaseComponent; //# sourceMappingURL=SceneItemJigsawBaseComponent.js.map