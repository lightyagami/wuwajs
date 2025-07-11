"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleNpcFlowLogic = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const NpcIconComponent_1 = require("../../../../Module/NPC/NpcIconComponent");
const SimpleNpcMultiplyLogic_1 = require("./SimpleNpcMultiplyLogic");
const STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
class SimpleNpcFlowLogic {
  constructor(t) {
    this.sor = undefined;
    this.aor = undefined;
    this.hor = undefined;
    this.lor = undefined;
    this._or = 0;
    this.hBe = false;
    this.uor = undefined;
    this.cor = undefined;
    this.mor = undefined;
    this.dor = undefined;
    this.sor = t;
    this.dor = t.D_K2_GetActorLocation();
  }
  StartFlowLogic() {
    this.aor = this.sor.GetComponentByClass(UE.SimpleNpcFlowComponent_C.StaticClass());
    if (this.aor && this.aor.FlowList?.Num() > 0) {
      this.lor = new SimpleNpcMultiplyLogic_1.SimpleNpcMultiplyLogic(this.aor);
      this.Cor();
      this.gor();
    }
  }
  Cor() {
    var t = this.aor.CheckRange;
    this.cor = t.LowerBound.Value * t.LowerBound.Value;
    this.mor = t.UpperBound.Value * t.UpperBound.Value;
  }
  async AddHeadView() {
    if (!this.hor && ConfigManager_1.ConfigManager.NpcIconConfig && this.sor?.Mesh) {
      let t = 1500;
      var i = (t = this.aor ? this.aor.CheckRange.UpperBound.Value : t) + 500;
      this.hor = new NpcIconComponent_1.NpcIconComponent(this);
      this.hor.SetupCheckRange(i * i);
      await this.hor.AddNpcIconAsync();
      this.hor.SetCharacterIconLocation();
      this.hor.SetHeadInfoNameState(false);
      this.hor.HideDialogueText();
    }
  }
  ShowDialog(t, i) {
    this.hor?.SetDialogueText(t, i);
  }
  HideDialog() {
    this.hor?.HideDialogueText();
  }
  TryPlayMontage(t) {
    if (this.sor.Mesh && this.sor.Mesh.AnimationMode !== 1) {
      const i = this.sor.Mesh.AnimScriptInstance;
      if (i && (t = this.por(t))) {
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, t => {
          if (ObjectUtils_1.ObjectUtils.IsValid(t) && i) {
            this._or = t.SequenceLength;
            i.Montage_Play(t);
          }
        });
      }
    }
    return false;
  }
  vor() {
    if (!this.uor) {
      var i = this.sor.Mesh.AnimScriptInstance;
      if (i) {
        i = UE.KismetSystemLibrary.GetPathName(i);
        if (i) {
          let t = i.substr(0, i.lastIndexOf(StringUtils_1.SLASH_STRING));
          t = t.substr(0, t.lastIndexOf(StringUtils_1.SLASH_STRING));
          i = new Array();
          i.push(t);
          i.push("/Montage");
          this.uor = i.join(StringUtils_1.EMPTY_STRING);
        }
      }
    }
  }
  por(t) {
    if (!t || t.includes("/")) {
      return t;
    } else {
      this.vor();
      if (this.uor) {
        return `${this.uor}/${t}.${t}`;
      } else {
        return undefined;
      }
    }
  }
  Tick(t) {
    if (this._or > 0 && (this._or -= t, this._or < 0)) {
      this.StopMontage();
    }
    if (this.lor) {
      this.gor();
      this.lor.Tick(t);
    }
  }
  StopMontage() {
    var t;
    this._or = 0;
    if (this.sor && this.sor.Mesh && this.sor.Mesh.AnimationMode !== 1 && (t = this.sor.Mesh.AnimScriptInstance) && t.IsAnyMontagePlaying()) {
      t.Montage_Stop(STOP_MONTAGE_BLEND_OUT_TIME);
    }
  }
  gor() {
    var t = Global_1.Global.BaseCharacter;
    if (t) {
      t = t.CharacterActorComponent.ActorLocation;
      if ((t = UE.VectorDouble.DistSquared2D(t, this.dor)) < this.cor) {
        if (!this.hBe) {
          if (this.lor.IsPlaying || this.sor.IsHiding) {
            this.lor.IsPause = false;
          } else {
            this.lor.StartFlow();
          }
        }
        this.hBe = true;
      } else if (t < this.mor) {
        this.hBe = false;
        this.lor.IsPause = true;
      } else {
        this.hBe = false;
        this.lor.IsPause = true;
        if (this.lor.IsPlaying) {
          this.lor.StopFlow();
        }
      }
    }
  }
  FilterFlowWorldState() {
    this.lor?.FilterFlowWorldState();
  }
  ForceStopFlow() {
    this.hBe = false;
    if (this.lor?.IsPlaying) {
      this.lor.StopFlow();
    }
  }
  Dispose() {
    this.sor = undefined;
    this.aor = undefined;
    this.lor = undefined;
    this.hor?.Destroy();
  }
  GetSelfLocation() {
    return this.sor.SelfLocationProxy;
  }
  GetAttachToMeshComponent() {
    return this.sor.Mesh;
  }
  GetAttachToSocketName() {
    return ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconSocketName();
  }
  GetAttachToLocation(t) {
    var i = this.sor.CapsuleCollision.CapsuleHalfHeight;
    var s = this.sor.SelfLocationProxy;
    t.Set(s.X, s.Y, s.Z + i);
  }
  GetAddOffsetZ() {
    return 0;
  }
  IsShowNameInfo() {
    return false;
  }
  IsShowQuestInfo() {
    return false;
  }
  IsShowPlayerInfo() {
    return false;
  }
  CanTick(t) {
    return true;
  }
  IsInHeadItemShowRange(t, i, s) {
    return t < i && s < t;
  }
}
exports.SimpleNpcFlowLogic = SimpleNpcFlowLogic;
//# sourceMappingURL=SimpleNpcFlowLogic.js.map