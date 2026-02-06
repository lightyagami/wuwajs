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
    this.kuroEnviInteractionSystem = undefined;
    this.foliageNameArray = undefined;
    this.TempColor = undefined;
    this.abf = (t, i, e) => {
      this.WeaponPosition = t;
    };
    this.IsEnabled = false;
  }
  Start(t) {
    if (t && !(UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.InteractionEffect.EnableFoliageEffect") <= 0)) {
      this.Owner = t;
      this.IsReady = true;
      this.TempColor = new UE.LinearColor();
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
      this.foliageNameArray = UE.NewArray(UE.BuiltinString);
      var t = DataTableUtil_1.DataTableUtil.GetAllDataTableRowFromTableWithRowName(t);
      if (t?.length) {
        for (const e of t) {
          if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e[1].FoliageMesh)) {
            i = e[1].FoliageMesh.ToAssetPathName();
            this.ConfigMap.set(i, e[1]);
            this.foliageNameArray.Add(i);
          }
        }
      }
    }
  }
  Enable() {
    if (this.IsReady) {
      this.IsEnabled = true;
      GlobalData_1.GlobalData.BpEventManager.武器交互场景时.Remove(this.abf);
      GlobalData_1.GlobalData.BpEventManager.武器交互场景时.Add(this.abf);
      this.ActorComponent = this.Owner.CharacterActorComponent?.Entity?.GetComponent(3);
    }
  }
  Disable() {
    if (this.IsEnabled) {
      this.IsEnabled = false;
      GlobalData_1.GlobalData.BpEventManager.武器交互场景时.Remove(this.abf);
    }
  }
  Tick(t) {
    if (this.IsEnabled && this.Owner && this.ActorComponent?.IsAutonomousProxy && (this.Timer += 1, this.Timer >= 3)) {
      this.kuroEnviInteractionSystem = UE.KuroInteractionEffectSystem.GetKuroInteractionEffectSystem(this.Owner.GetWorld());
      if (this.kuroEnviInteractionSystem) {
        this.SDf();
        this.lbf();
        this._bf();
        this.SpawnCount = this.ubf();
        this.hbf();
      }
      this.Timer = 0;
    }
  }
  hbf() {
    var t;
    if (this.IsReady && this.Owner && this.NDCAsset) {
      if (!(t = this.Owner.CharacterActorComponent?.Entity?.GetComponent(217))?.HasTag(1566606455) && !t?.HasTag(40422668)) {
        if (this.SpawnCount > 0) {
          UE.NiagaraDataChannelLibrary.WriteToNiagaraDataChannel(this.Owner.GetWorld(), this.NDCAsset, SceneCharacterFoliageEffect.NDCSearchParam, this.SpawnCount, true, true, false, "TS FoliageEffect WriteToNDC");
        }
      }
    }
  }
  lbf() {
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
      this.WeaponSpawn = this.MDf();
      this.PlayerSpawn = this.EDf();
    }
  }
  _bf() {
    if (this.Owner && this.kuroEnviInteractionSystem && this.foliageNameArray) {
      this.WeightSpawnArray.length = 0;
      var i = this.kuroEnviInteractionSystem.SearchInteractionFoliageArray(this.foliageNameArray);
      var e = i.Num();
      for (let t = 0; t < e; ++t) {
        var h;
        var s = this.ConfigMap.get(this.foliageNameArray.Get(t));
        if (s && (h = i.Get(t) * s.SpawnNum) > 0) {
          this.WeightSpawnArray.push([h, s]);
        }
      }
      this.WeightSpawnArray.sort((t, i) => i[0] * i[1].Weight - t[0] * t[1].Weight);
    }
  }
  cbf(t) {
    return !!this.IsReady && !!this.Owner && !!this.WeaponPosition && !!(this.WeaponPosition.Z - this.Owner.D_K2_GetActorLocation().Z <= t);
  }
  ubf() {
    if (!this.MPCAsset) {
      return 0;
    }
    var i = Math.min(4, this.WeightSpawnArray.length);
    let e = 0;
    for (let t = 0; t < i; ++t) {
      e += this.WeightSpawnArray[t][0];
    }
    if (e <= 0) {
      return 0;
    }
    var t = this.WeightSpawnArray[Math.min(0, i - 1)][0];
    var h = this.WeightSpawnArray[Math.min(1, i - 1)][0] + t;
    var s = this.WeightSpawnArray[Math.min(2, i - 1)][0] + h;
    var a = this.WeightSpawnArray[Math.min(0, i - 1)][1].TypeIndex;
    var r = this.WeightSpawnArray[Math.min(1, i - 1)][1].TypeIndex;
    var c = this.WeightSpawnArray[Math.min(2, i - 1)][1].TypeIndex;
    var l = this.WeightSpawnArray[Math.min(3, i - 1)][1].TypeIndex;
    if (this.WeaponPosition) {
      this.Jlr(this.WeaponPosition.X, this.WeaponPosition.Y, this.WeaponPosition.Z, 0);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_LeaveSpawnPosition, this.TempColor);
    }
    this.Jlr(a, 0, r, t);
    UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_SpawnParam0, this.TempColor);
    this.Jlr(c, h, l, s);
    UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_SpawnParam1, this.TempColor);
    var a = this.cbf(this.WeightSpawnArray[0][1].HeightClamp) ? Math.round(MathUtils_1.MathUtils.Clamp((this.PlayerSpawn + 0.001) / (this.WeaponSpawn + this.PlayerSpawn + 0.001), 0, 1) * 10) : 10;
    var r = this.cbf(this.WeightSpawnArray[Math.min(1, i - 1)][1].HeightClamp) ? Math.round(MathUtils_1.MathUtils.Clamp((this.PlayerSpawn + 0.001) / (this.WeaponSpawn + this.PlayerSpawn + 0.001), 0, 1) * 10) : 10;
    var t = this.cbf(this.WeightSpawnArray[Math.min(2, i - 1)][1].HeightClamp) ? Math.round(MathUtils_1.MathUtils.Clamp((this.PlayerSpawn + 0.001) / (this.WeaponSpawn + this.PlayerSpawn + 0.001), 0, 1) * 10) : 10;
    var c = this.cbf(this.WeightSpawnArray[Math.min(3, i - 1)][1].HeightClamp) ? Math.round(MathUtils_1.MathUtils.Clamp((this.PlayerSpawn + 0.001) / (this.WeaponSpawn + this.PlayerSpawn + 0.001), 0, 1) * 10) : 10;
    if (this.Owner) {
      UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_SpawnNum, e);
      UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_OnMotorcycle, this.OnMotorcycle ? 1 : 0);
      UE.KismetMaterialLibrary.SetScalarParameterValue(this.Owner.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_PlayerSpeed, this.PlayerSpeed);
      if (this.PrePlayerPosition) {
        let t = this.PrePlayerPosition.X;
        let i = this.PrePlayerPosition.Y;
        let e = this.PrePlayerPosition.Z;
        if (this.OnMotorcycle && this.Owner.CharacterActorComponent && this.PlayerMotorcycleSpawnOffset) {
          t += this.PlayerMotorcycleSpawnOffset.X;
          i += this.PlayerMotorcycleSpawnOffset.Y;
          e += this.PlayerMotorcycleSpawnOffset.Z;
        }
        this.Jlr(t, i, e, 0);
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_PlayerSpawnPosition, this.TempColor);
      }
      this.Jlr(this.WeightSpawnArray[0][1].PlayerSpawnOffset.X, this.WeightSpawnArray[0][1].PlayerSpawnOffset.Y, this.WeightSpawnArray[0][1].PlayerSpawnOffset.Z, 0);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_PlayerSpawnOffset0, this.TempColor);
      this.Jlr(this.WeightSpawnArray[Math.min(1, i - 1)][1].PlayerSpawnOffset.X, this.WeightSpawnArray[Math.min(1, i - 1)][1].PlayerSpawnOffset.Y, this.WeightSpawnArray[Math.min(1, i - 1)][1].PlayerSpawnOffset.Z, 0);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_PlayerSpawnOffset1, this.TempColor);
      this.Jlr(this.WeightSpawnArray[Math.min(2, i - 1)][1].PlayerSpawnOffset.X, this.WeightSpawnArray[Math.min(2, i - 1)][1].PlayerSpawnOffset.Y, this.WeightSpawnArray[Math.min(2, i - 1)][1].PlayerSpawnOffset.Z, 0);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_PlayerSpawnOffset2, this.TempColor);
      this.Jlr(this.WeightSpawnArray[Math.min(3, i - 1)][1].PlayerSpawnOffset.X, this.WeightSpawnArray[Math.min(3, i - 1)][1].PlayerSpawnOffset.Y, this.WeightSpawnArray[Math.min(3, i - 1)][1].PlayerSpawnOffset.Z, 0);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_PlayerSpawnOffset3, this.TempColor);
      this.Jlr(a, r, t, c);
      UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_PlayerPercent0123, this.TempColor);
      if (this.WeaponVelocity) {
        this.Jlr(this.WeaponVelocity.X, this.WeaponVelocity.Y, this.WeaponVelocity.Z, 0);
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_WeaponVelocity, this.TempColor);
      }
      if (this.PlayerVelocity) {
        this.Jlr(this.PlayerVelocity.X, this.PlayerVelocity.Y, this.PlayerVelocity.Z, 0);
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.MPCAsset, SceneCharacterFoliageEffect.MPC_PlayerVelocity, this.TempColor);
      }
    }
    return MathUtils_1.MathUtils.GetFloatPointCeil(e * (this.WeaponSpawn + this.PlayerSpawn));
  }
  MDf() {
    var t = MathUtils_1.MathUtils.Clamp(this.WeaponSpeed, 0, WEAPON_SPAWN_PARAM) / WEAPON_SPAWN_PARAM;
    return t * t * 0.5;
  }
  EDf() {
    var t = this.OnMotorcycle ? PLAYER_MOTORCYCLE_SPAWN_PARAM : PLAYER_SPAWN_PARAM;
    return MathUtils_1.MathUtils.Clamp(this.PlayerSpeed, 0, t) / t * this.PlayerMoveTypeParam;
  }
  SDf() {
    var t;
    var i;
    if (this.IsReady) {
      t = this.Owner.CharacterActorComponent?.ActorForward;
      if ((i = this.Owner.CharacterActorComponent?.Entity?.GetComponent(217))?.HasTag(346080557)) {
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
  Jlr(t, i, e, h) {
    this.TempColor.R = t;
    this.TempColor.G = i;
    this.TempColor.B = e;
    this.TempColor.A = h;
  }
}
(exports.SceneCharacterFoliageEffect = SceneCharacterFoliageEffect).MPC_LeaveSpawnPosition = new UE.FName("NDC_LeaveSpawnPosition");
SceneCharacterFoliageEffect.MPC_SpawnParam0 = new UE.FName("SpawnParam0");
SceneCharacterFoliageEffect.MPC_SpawnParam1 = new UE.FName("SpawnParam1");
SceneCharacterFoliageEffect.MPC_SpawnNum = new UE.FName("SpawnNum");
SceneCharacterFoliageEffect.MPC_OnMotorcycle = new UE.FName("OnMotorcycle");
SceneCharacterFoliageEffect.MPC_PlayerSpeed = new UE.FName("PlayerSpeed");
SceneCharacterFoliageEffect.MPC_PlayerSpawnPosition = new UE.FName("NDC_PlayerSpawnPosition");
SceneCharacterFoliageEffect.MPC_PlayerSpawnOffset0 = new UE.FName("PlayerSpawnOffset0");
SceneCharacterFoliageEffect.MPC_PlayerSpawnOffset1 = new UE.FName("PlayerSpawnOffset1");
SceneCharacterFoliageEffect.MPC_PlayerSpawnOffset2 = new UE.FName("PlayerSpawnOffset2");
SceneCharacterFoliageEffect.MPC_PlayerSpawnOffset3 = new UE.FName("PlayerSpawnOffset3");
SceneCharacterFoliageEffect.MPC_PlayerPercent0123 = new UE.FName("PlayerPercent0123");
SceneCharacterFoliageEffect.MPC_WeaponVelocity = new UE.FName("WeaponVelocity");
SceneCharacterFoliageEffect.MPC_PlayerVelocity = new UE.FName("PlayerVelocity");
SceneCharacterFoliageEffect.NDCSearchParam = new UE.NiagaraDataChannelSearchParameters(); //# sourceMappingURL=SceneCharacterFoliageEffect.js.map