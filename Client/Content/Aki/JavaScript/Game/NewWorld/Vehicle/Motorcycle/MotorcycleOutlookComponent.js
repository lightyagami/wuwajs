"use strict";

var __decorate = this && this.__decorate || function (t, o, e, r) {
  var i;
  var s = arguments.length;
  var n = s < 3 ? o : r === null ? r = Object.getOwnPropertyDescriptor(o, e) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, o, e, r);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (i = t[h]) {
        n = (s < 3 ? i(n) : s > 3 ? i(o, e, n) : i(o, e)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(o, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleOutlookComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MotorDecorationsById_1 = require("../../../../Core/Define/ConfigQuery/MotorDecorationsById");
const MotorStickerById_1 = require("../../../../Core/Define/ConfigQuery/MotorStickerById");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const tmpTrans = Transform_1.Transform.Create();
class StickerParams {
  constructor(t, o = 0) {
    this.StickerId = 0;
    this.PdHandle = 0;
    this.StickerId = t;
    this.PdHandle = o;
  }
}
class DecorationItem {
  constructor(t, o) {
    this.ParentMesh = t;
    this.Index = o;
    this.yen = undefined;
    this.d4g = 0;
    this.yen = t.GetOwner().AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, new UE.Transform(), false, new UE.FName("Dec" + o.toString()));
    this.yen.SetComponentTickEnabled(false);
    this.yen.K2_AttachToComponent(this.ParentMesh, FNameUtil_1.FNameUtil.NONE, 0, 0, 0, false);
  }
  SetDecorationId(o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Motor", 6, "Equip Decoration", ["Index", this.Index], ["From", this.d4g], ["To", o]);
    }
    if (this.d4g !== o) {
      if (!this.yen) {
        return false;
      }
      if ((this.d4g = o) === 0) {
        this.yen.SetSkeletalMesh(undefined);
        this.yen.SetComponentTickEnabled(false);
      } else {
        var t = MotorDecorationsById_1.configMotorDecorationsById.GetConfig(o);
        if (!t?.ModelId) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Motor", 6, "Equip Decoration Error. 缺失Excel配置", ["Id", o]);
          }
          this.yen.SetSkeletalMesh(undefined);
          this.yen.SetComponentTickEnabled(false);
          return false;
        }
        const e = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(29, t.ModelId.toString());
        if (!e) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Motor", 6, "Equip Decoration Error. 缺失DT配置", ["Id", o], ["DecConfigId", t.ModelId]);
          }
          this.yen.SetSkeletalMesh(undefined);
          this.yen.SetComponentTickEnabled(false);
          return false;
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(e.SkeletalMesh.ToAssetPathName(), UE.SkeletalMesh, t => {
          if (this.d4g === o) {
            this.yen.SetSkeletalMesh(t);
            this.yen.SetComponentTickEnabled(true);
            if (e.SetMasterFollow) {
              this.yen.SetMasterPoseComponent(this.ParentMesh, true);
              this.yen.K2_AttachToComponent(this.ParentMesh, FNameUtil_1.FNameUtil.NONE, 0, 0, 0, false);
            }
            this.yen.SetMasterPoseComponent(undefined, false);
            if (e.AnimBlueprint) {
              ResourceSystem_1.ResourceSystem.LoadAsync(e.AnimBlueprint.ToAssetPathName(), UE.Class, t => {
                this.yen.SetAnimClass(t);
              });
            }
            if (e.AttachSocket.Num() > 0) {
              this.yen.K2_AttachToComponent(this.ParentMesh, e.AttachSocket.Get(0), 0, 0, 0, false);
            } else {
              this.yen.K2_AttachToComponent(this.ParentMesh, FNameUtil_1.FNameUtil.NONE, 0, 0, 0, false);
            }
            if (e.AttachTrans.Num() > 0) {
              tmpTrans.FromUeTransform(e.AttachTrans.Get(0));
            } else {
              tmpTrans.SetLocation(Vector_1.Vector.ZeroVectorProxy);
              tmpTrans.SetRotation(Quat_1.Quat.IdentityProxy);
              tmpTrans.SetLocation(Vector_1.Vector.OneVectorProxy);
            }
            this.yen.D_K2_SetRelativeTransform(tmpTrans.ToUeTransform(), false, undefined, false);
          }
        });
      }
    }
    return true;
  }
}
let MotorcycleOutlookComponent = class MotorcycleOutlookComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.SkelMeshComp = undefined;
    this.CurrentDecoration = new Array();
    this.CurrentStickers = new Array();
    this.CharRenderComp = undefined;
  }
  OnStart() {
    var t = this.Entity.GetComponent(247);
    if (t) {
      this.SkelMeshComp = t.Actor.Mesh;
      this.CharRenderComp = t.Actor.CharRenderingComponent;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Motor", 6, "EquipMotor OnStart");
      }
      this.EquipMotor(t.CreatureData.MotorOutlookInfo);
    }
    return true;
  }
  EquipMotor(t) {
    this.EquipDecoration(t?.Evg);
    return this.EquipMotorSticker(t?.Ipf);
  }
  EquipDecoration(t) {
    var o = t ?? [];
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Motor", 6, "Equip Decorations", ["length", o.length]);
    }
    if (this.SkelMeshComp) {
      for (let t = 0; t < o.length; ++t) {
        if (this.CurrentDecoration.length <= t) {
          this.CurrentDecoration.push(new DecorationItem(this.SkelMeshComp, t));
        }
        this.CurrentDecoration[t].SetDecorationId(o[t]);
      }
      for (let t = o.length; t < this.CurrentDecoration.length; ++t) {
        this.CurrentDecoration[t].SetDecorationId(0);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Motor", 6, "No Mesh to Equip.");
    }
  }
  EquipMotorSticker(t) {
    var o = t ?? [];
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Motor", 6, "Equip MotorStickers", ["length", o.length]);
    }
    for (let t = 0; t < o.length; ++t) {
      if (this.CurrentStickers.length <= t) {
        this.CurrentStickers.push(new StickerParams(0));
      }
      var e;
      var r;
      var i = this.CurrentStickers[t];
      var s = o[t];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Motor", 6, "Equip MotorSticker", ["Index", t], ["From", i.StickerId], ["To", s]);
      }
      if (i.StickerId !== s && (i.PdHandle && (this.CharRenderComp?.RemoveMaterialControllerData(i.PdHandle), i.PdHandle = 0), i.StickerId = s)) {
        if ((e = MotorStickerById_1.configMotorStickerById.GetConfig(s))?.MaterialDA) {
          if (r = ResourceSystem_1.ResourceSystem.Load(e.MaterialDA, UE.PD_CharacterControllerData_C)) {
            i.PdHandle = this.CharRenderComp?.AddMaterialControllerData(r) ?? 0;
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Motor", 6, "Motor CharCtrl not found.", ["Path", e?.MaterialDA]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Motor", 6, "Motor stickerId not found.", ["Id", s]);
        }
      }
    }
    for (let t = o.length; t < this.CurrentStickers.length; ++t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Motor", 6, "EquipMotor Clear", ["Index", t]);
      }
      var n = this.CurrentStickers[t];
      if (n.PdHandle) {
        this.CharRenderComp?.RemoveMaterialControllerData(n.PdHandle);
        n.PdHandle = 0;
      }
      n.StickerId = 0;
    }
    return true;
  }
};
MotorcycleOutlookComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(270)], MotorcycleOutlookComponent);
exports.MotorcycleOutlookComponent = MotorcycleOutlookComponent; //# sourceMappingURL=MotorcycleOutlookComponent.js.map