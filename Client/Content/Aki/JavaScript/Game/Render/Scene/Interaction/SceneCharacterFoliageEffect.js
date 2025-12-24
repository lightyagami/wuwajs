"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneCharacterFoliageEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const NDCAssetPathWeapon = "/Game/Aki/Effect/NiagaraDataChannel/NDCAsset/Scene/NDC_Leaves.NDC_Leaves";
const ConfigPath = "/Game/Aki/Data/Effect/DT_FoliageNDCEffect.DT_FoliageNDCEffect";
const MPCPath = "/Game/Aki/Render/Shaders/Scene/Interaction/MPC_NDCParameter.MPC_NDCParameter";
const WEAPON_SPAWN_PARAM = 300;
const PLAYER_SPAWN_PARAM = 100;
const PLAYER_MOTORCYCLE_SPAWN_PARAM = 100;
class SceneCharacterFoliageEffect {
  constructor() {
    this.Owner = undefined;
    this.ActorComponent = undefined;
    this.IsReady = false;
    this.Timer = 0;
    this.WeaponSpeed = 0;
    this.WeaponVelocity = undefined;
    this.PlayerVelocity = undefined;
    this.PlayerSpeed = 0;
    this.WeaponSpawn = 0;
    this.PlayerSpawn = 0;
    this.PlayerMoveTypeParam = 0.1;
    this.PlayerMotorcycleSpawnOffset = undefined;
    this.OnMotorcycle = false;
    this.WeaponPosition = undefined;
    this.SpawnCount = 0;
    this.PreWeaponPosition = undefined;
    this.PrePlayerPosition = undefined;
    this.NDCAsset = undefined;
    this.MPCAsset = undefined;
    this.ConfigMap = new Map();
    this.WeightSpawnArray = new Array();
    this.$Mf = (t, i, s) => {
      this.WeaponPosition = t;
    };
    this.IsEnabled = false;
  }
  Start(t) {
    if (t && !(UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.InteractionEffect.EnableFoliageEffect") <= 0)) {
      this.Owner = t;
      this.IsReady = true;
      ResourceSystem_1.ResourceSystem.LoadAsync(NDCAssetPathWeapon, UE.NiagaraDataChannelAsset, t => {
        if (t) {
          this.NDCAsset = t;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 83, "[FoliageEffect] NDC加载失败", ["Path", NDCAssetPathWeapon]);
        }
      });
      ResourceSystem_1.ResourceSystem.LoadAsync(MPCPath, UE.MaterialParameterCollection, t => {
        if (t) {
          this.MPCAsset = t;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 83, "[FoliageEffect] MPC加载失败", ["Path", MPCPath]);
        }
      });
      var i;
      var t = ResourceSystem_1.ResourceSystem.Load(ConfigPath, UE.DataTable);
      this.ConfigMap.clear();
      var t = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTableWithRowName(t);
      if (t?.length) {
        for (const s of t) {
          if (UE.KismetSystemLibrary.IsValidSoftObjectReference(s[1].FoliageMesh)) {
            i = s[1].FoliageMesh.ToAssetPathName();
            this.ConfigMap.set(i, s[1]);
          }
        }
      }
    }
  }
  Enable() {
    if (this.IsReady) {
      this.IsEnabled = true;
      GlobalData_1.GlobalData.BpEventManager.武器交互场景时.Remove(this.$Mf);
      GlobalData_1.GlobalData.BpEventManager.武器交互场景时.Add(this.$Mf);
      this.ActorComponent = this.Owner.CharacterActorComponent?.Entity?.GetComponent(3);
    }
  }
  Disable() {
    if (this.IsEnabled) {
      this.IsEnabled = false;
      GlobalData_1.GlobalData.BpEventManager.武器交互场景时.Remove(this.$Mf);
    }
  }
  Tick(t) {
    if (this.IsEnabled && this.Owner && this.ActorComponent?.IsAutonomousProxy && (this.Timer += 1, this.Timer >= 3)) {
      this.Ybf();
      this.QMf();
      this.KMf();
      this.SpawnCount = this.XMf();
      this.WMf();
      this.Timer = 0;
    }
  }
  WMf() {
    var t;
    if (this.IsReady && this.Owner && this.NDCAsset) {
      if (!(t = this.Owner.CharacterActorComponent?.Entity?.GetComponent(215))?.HasTag(1566606455) && !t?.HasTag(40422668)) {
        if (UE.KuroInteractionEffectSystem.GetKuroInteractionEffectSystem(this.Owner.GetWorld()) && this.SpawnCount > 0) {
          UE.NiagaraDataChannelLibrary.WriteToNiagaraDataChannel(this.Owner.GetWorld(), this.NDCAsset, new UE.NiagaraDataChannelSearchParameters(), this.SpawnCount, true, true, false, "TS FoliageEffect WriteToNDC");
        }
      }
    }
  }
  QMf() {
    var t;
    if (this.IsReady) {
      this.WeaponSpeed = 0;
      if (this.WeaponPosition && (this.WeaponSpeed = this.PreWeaponPosition ? MathUtils_1.MathUtils.VectorDistance(this.WeaponPosition, this.PreWeaponPosition) : WEAPON_SPAWN_PARAM, this.PreWeaponPosition)) {
        this.WeaponVelocity = this.WeaponPosition.op_Subtraction(this.PreWeaponPosition).op_ToVector();
      }
      this.PreWeaponPosition = this.WeaponPosition;
      t = this.OnMotorcycle ? PLAYER_MOTORCYCLE_SPAWN_PARAM : PLAYER_SPAWN_PARAM;
      this.PlayerSpeed = this.PrePlayerPosition ? MathUtils_1.MathUtils.VectorDistance(this.Owner.D_K2_GetActorLocation(), this.PrePlayerPosition) : t;
      if (this.PrePlayerPosition) {
        this.PlayerVelocity = this.Owner.D_K2_GetActorLocation().op_Subtraction(this.PrePlayerPosition).op_ToVector();
      }
      this.PrePlayerPosition = this.Owner.D_K2_GetActorLocation();
      this.WeaponSpawn = this.zbf();
      this.PlayerSpawn = this.Jbf();
    }
  }
  KMf() {
    if (this.Owner) {
      this.WeightSpawnArray.length = 0;
      const i = UE.KuroInteractionEffectSystem.GetKuroInteractionEffectSystem(this.Owner.GetWorld());
      if (i) {
        for (const s of this.ConfigMap) {
          const i = UE.KuroInteractionEffectSystem.GetKuroInteractionEffectSystem(this.Owner.GetWorld());
          var t;
          if (i && (t = s[0], (t = i.SearchInteractionFoliage(t) * s[1].SpawnNum) > 0)) {
            this.WeightSpawnArray.push([t, s[1]]);
          }
        }
        this.WeightSpawnArray.sort((t, i) => i[0] * i[1].Weight - t[0] * t[1].Weight);
      }
    }
  }
  YMf(t) {
    return !!this.IsReady && !!this.Owner && !!this.WeaponPosition && !!(this.WeaponPosition.Z - this.Owner.D_K2_GetActorLocation().Z <= t);
  }
  XMf() {
    if (!this.MPCAsset) {
      return 0;
    }
    var t;
    var i;
    var s;
    var h;
    var a;
    var e;
    var r;
    var o = Math.min(4, this.WeightSpawnArray.length);
    let l = 0;
    for (let t = 0; t < o; ++t) {
      l += this.WeightSpawnArray[t][0];
    }
    if (l <= 0) {
      return 0;
    } else {
      a = this.WeightSpawnArray[Math.min(0, o - 1)][0];
      r = this.WeightSpawnArray[Math.min(1, o - 1)][0] + a;
      t = this.WeightSpawnArray[Math.min(2, o - 1)][0] + r;
      s = this.WeightSpawnArray[Math.min(0, o - 1)][1].TypeIndex;
      h = this.WeightSpawnArray[Math.min(1, o - 1)][1].TypeIndex;
      e = this.WeightSpawnArray[Math.min(2, o - 1)][1].TypeIndex;
      i = this.WeightSpawnArray[Math.min(3, o - 1)][1].TypeIndex;
      if (this.WeaponPosition) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("NDC_LeaveSpawnPosition"), new UE.LinearColor(this.WeaponPosition.op_ToVector()));
      }
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("SpawnParam0"), new UE.LinearColor(s, 0, h, a));
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("SpawnParam1"), new UE.LinearColor(e, r, i, t));
      s = this.YMf(this.WeightSpawnArray[0][1].HeightClamp) ? Math.round(MathUtils_1.MathUtils.Clamp((this.PlayerSpawn + 0.001) / (this.WeaponSpawn + this.PlayerSpawn + 0.001), 0, 1) * 10) : 10;
      h = this.YMf(this.WeightSpawnArray[Math.min(1, o - 1)][1].HeightClamp) ? Math.round(MathUtils_1.MathUtils.Clamp((this.PlayerSpawn + 0.001) / (this.WeaponSpawn + this.PlayerSpawn + 0.001), 0, 1) * 10) : 10;
      a = this.YMf(this.WeightSpawnArray[Math.min(2, o - 1)][1].HeightClamp) ? Math.round(MathUtils_1.MathUtils.Clamp((this.PlayerSpawn + 0.001) / (this.WeaponSpawn + this.PlayerSpawn + 0.001), 0, 1) * 10) : 10;
      e = this.YMf(this.WeightSpawnArray[Math.min(3, o - 1)][1].HeightClamp) ? Math.round(MathUtils_1.MathUtils.Clamp((this.PlayerSpawn + 0.001) / (this.WeaponSpawn + this.PlayerSpawn + 0.001), 0, 1) * 10) : 10;
      if (this.Owner && (UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), this.MPCAsset, new UE.FName("SpawnNum"), l), UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), this.MPCAsset, new UE.FName("OnMotorcycle"), this.OnMotorcycle ? 1 : 0), UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), this.MPCAsset, new UE.FName("PlayerSpeed"), this.PlayerSpeed), this.PrePlayerPosition && (r = new UE.LinearColor(this.PrePlayerPosition.X, this.PrePlayerPosition.Y, this.PrePlayerPosition.Z, 0), this.OnMotorcycle && this.Owner.CharacterActorComponent && this.PlayerMotorcycleSpawnOffset && (r.R += this.PlayerMotorcycleSpawnOffset.X, r.G += this.PlayerMotorcycleSpawnOffset.Y, r.B += this.PlayerMotorcycleSpawnOffset.Z), UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("NDC_PlayerSpawnPosition"), r)), UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("PlayerSpawnOffset0"), new UE.LinearColor(this.WeightSpawnArray[0][1].PlayerSpawnOffset.X, this.WeightSpawnArray[0][1].PlayerSpawnOffset.Y, this.WeightSpawnArray[0][1].PlayerSpawnOffset.Z, 0)), UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("PlayerSpawnOffset1"), new UE.LinearColor(this.WeightSpawnArray[Math.min(1, o - 1)][1].PlayerSpawnOffset.X, this.WeightSpawnArray[Math.min(1, o - 1)][1].PlayerSpawnOffset.Y, this.WeightSpawnArray[Math.min(1, o - 1)][1].PlayerSpawnOffset.Z, 0)), UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("PlayerSpawnOffset2"), new UE.LinearColor(this.WeightSpawnArray[Math.min(2, o - 1)][1].PlayerSpawnOffset.X, this.WeightSpawnArray[Math.min(2, o - 1)][1].PlayerSpawnOffset.Y, this.WeightSpawnArray[Math.min(2, o - 1)][1].PlayerSpawnOffset.Z, 0)), UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("PlayerSpawnOffset3"), new UE.LinearColor(this.WeightSpawnArray[Math.min(3, o - 1)][1].PlayerSpawnOffset.X, this.WeightSpawnArray[Math.min(3, o - 1)][1].PlayerSpawnOffset.Y, this.WeightSpawnArray[Math.min(3, o - 1)][1].PlayerSpawnOffset.Z, 0)), UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("PlayerPercent0123"), new UE.LinearColor(s, h, a, e)), this.WeaponVelocity && UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("WeaponVelocity"), new UE.LinearColor(this.WeaponVelocity)), this.PlayerVelocity)) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, new UE.FName("PlayerVelocity"), new UE.LinearColor(this.PlayerVelocity));
      }
      return MathUtils_1.MathUtils.GetFloatPointCeil(l * (this.WeaponSpawn + this.PlayerSpawn));
    }
  }
  zbf() {
    var t = MathUtils_1.MathUtils.Clamp(this.WeaponSpeed, 0, WEAPON_SPAWN_PARAM) / WEAPON_SPAWN_PARAM;
    return t * t * 0.5;
  }
  Jbf() {
    var t = this.OnMotorcycle ? PLAYER_MOTORCYCLE_SPAWN_PARAM : PLAYER_SPAWN_PARAM;
    return MathUtils_1.MathUtils.Clamp(this.PlayerSpeed, 0, t) / t * this.PlayerMoveTypeParam;
  }
  Ybf() {
    var t;
    var i;
    if (this.IsReady) {
      t = this.Owner.CharacterActorComponent?.ActorForward;
      if ((i = this.Owner.CharacterActorComponent?.Entity?.GetComponent(215))?.HasTag(346080557)) {
        this.PlayerMoveTypeParam = 1;
        this.OnMotorcycle = true;
        if (i?.HasTag(232903598)) {
          this.PlayerMotorcycleSpawnOffset = t.op_Multiply(this.PlayerSpeed * 1.5).op_ToVector();
        } else if (i?.HasTag(-1260861532)) {
          this.PlayerMotorcycleSpawnOffset = t.op_Multiply(-100).op_ToVector();
        } else {
          this.PlayerMotorcycleSpawnOffset = t.op_Multiply(this.PlayerSpeed * 1.2).op_ToVector();
        }
      } else {
        if (i?.HasTag(498191540) || i?.HasTag(-1625986130) || i?.HasTag(248240472)) {
          this.PlayerMoveTypeParam = 0;
        } else {
          this.PlayerMoveTypeParam = 0.1;
        }
        this.OnMotorcycle = false;
      }
    }
  }
}
exports.SceneCharacterFoliageEffect = SceneCharacterFoliageEffect;
//# sourceMappingURL=SceneCharacterFoliageEffect.js.map