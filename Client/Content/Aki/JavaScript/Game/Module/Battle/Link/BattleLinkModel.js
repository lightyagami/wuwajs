"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleLinkModel = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines");
const SequenceDefine_1 = require("../../Plot/Sequence/SequenceDefine");
const BattleLinkController_1 = require("./BattleLinkController");
const BattleLinkDefine_1 = require("./BattleLinkDefine");
const THREE_ROLE = 3;
const TWO_ROLE = 2;
const ACTIVITY_ID = 102600001;
const LINK_COMMON_PARAM_ROW = 1;
const DEFAULT_COMP_NAME = "WeaponCase";
class BattleLinkModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.swa = undefined;
    this.hwa = undefined;
    this.gml = undefined;
    this.OUu = undefined;
    this.qUu = undefined;
    this.NUe = -1;
    this.Oll = -1;
    this.Wke = undefined;
    this.V1l = false;
    this.H1l = false;
    this.xld = 0;
    this.JKa = undefined;
    this.kJa = undefined;
    this.KZa = undefined;
    this.uul = false;
    this.Yul = undefined;
    this.zul = undefined;
    this.as1 = undefined;
    this.g6_ = undefined;
    this.GUu = undefined;
    this.TLd = 0;
    this.NewLinkGmTest = false;
    this.ZKa = 0;
    this.Ih1 = 0;
    this.Er1 = 0;
  }
  OnInit() {
    return true;
  }
  OnLeaveLevel() {
    if (this.swa) {
      ActorSystem_1.ActorSystem.Put("BattleLinkModel.OnLeaveLevel", this.swa);
    }
    this.swa = undefined;
    this.hwa = undefined;
    this.gml = undefined;
    this.OUu?.clear();
    this.qUu?.clear();
    this.NUe = -1;
    this.Oll = -1;
    this.V1l = false;
    this.H1l = false;
    this.zul = undefined;
    this.uul = false;
    this.JKa = undefined;
    this.ZKa = 0;
    this.Ih1 = 0;
    this.Er1 = 0;
    this.NewLinkGmTest = false;
    return !(this.TLd = 0);
  }
  b$1(t) {
    if (this.zul) {
      var e = [];
      for (const i of this.zul) {
        if (!t.includes(i)) {
          e.push(i);
          this.OUu?.delete(i);
          this.qUu?.delete(i);
        }
      }
      for (const s of e) {
        this.zul.splice(this.zul.indexOf(s), 1);
      }
    } else {
      this.OUu?.clear();
      this.qUu?.clear();
    }
  }
  Jul() {
    if (this.CheckInNewBattleLink()) {
      return this.Wke;
    }
    if (!this.CheckInSpecialBattleLink()) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      if (!this.Yul) {
        var i = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetActivityConfig(ACTIVITY_ID);
        if (!i) {
          return;
        }
        var s;
        var r;
        var i = i.PreloadRoleIds;
        this.Yul = new Map();
        for ([s, r] of i.entries()) {
          var o = r.split(";").map(t => parseInt(t));
          this.Yul.set(s, o);
        }
      }
      let t = this.Yul.get(e);
      return t = t || this.Wke;
    }
    if (this.TLd) {
      i = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkPreloadConfig(this.TLd);
      if (i) {
        var a = [...i.RoleIdList];
        var n = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkParam(LINK_COMMON_PARAM_ROW);
        for (const l of a) {
          let t = l;
          if (n?.ChangeGenderMap.has(l) && (h = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(l)) && h.Gender !== ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()) {
            t = n?.ChangeGenderMap.get(l) ?? l;
            a[a.indexOf(l)] = t;
          }
          var h = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(t)?.MeshId;
          if (h) {
            if (this.as1 === undefined) {
              this.as1 = new Map();
            }
            this.as1.set(t, h);
          }
        }
        return a;
      }
    }
  }
  SetRoleIdList(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]设置角色列表", ["roleIdList", e]);
    }
    this.Wke = [...e];
    let i = true;
    if (this.CheckInNewBattleLink()) {
      var s = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItems();
      if (s) {
        this.as1?.clear();
        this.g6_?.clear();
        this.xld = 0;
        var t = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkParam(LINK_COMMON_PARAM_ROW);
        for (const n of s) {
          var r;
          var o = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(n.GetConfigId);
          if (e.includes(o) && ((r = ModelManager_1.ModelManager.CreatureModel?.GetEntity(n.GetCreatureDataId())?.Entity?.GetComponent(0)?.GetModelId() ?? 0) && (this.as1 === undefined && (this.as1 = new Map()), this.as1.set(o, r)), r = t?.MorphModelIdMap.get(r))) {
            if (this.g6_ === undefined) {
              this.g6_ = new Map();
            }
            this.g6_.set(o, r);
          }
        }
        if (s.length === 1 && (s = ModelManager_1.ModelManager.RogueBattleModel.GetLinkIdByRoleIdList(e), (s = ConfigManager_1.ConfigManager.BattleLinkConfig?.GetLinkDataConfig(s))?.IsEnableOneRoleBurst) && (s = s.OneRoleBurstTeammateId, a = ConfigManager_1.ConfigManager.BattleLinkConfig?.GetRoleConfig(s))) {
          a = a.RoleId;
          this.as1?.set(a, s);
          e.push(a);
          this.xld = a;
        }
      }
    } else if (this.CheckInSpecialBattleLink()) {
      i = false;
    }
    this.V1l = false;
    this.H1l = false;
    if (e.length === THREE_ROLE) {
      this.V1l = true;
    } else if (e.length === TWO_ROLE) {
      this.H1l = true;
    }
    if (this.V1l || this.H1l) {
      let t = e[0];
      if (i && (s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem)) {
        t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(s.GetConfigId);
      }
      var a = [...e];
      a.splice(e.indexOf(t), 1);
      a.splice(1, 0, t);
      this.Wke = a;
      this.Oll = t;
    } else {
      this.Oll = -1;
    }
  }
  PreloadRes() {
    const t = new CustomPromise_1.CustomPromise();
    if (this.zul && this.Wke && this.zul.length >= this.Wke.length) {
      let e = true;
      var i = this.Wke.length;
      for (let t = 0; t < i; t++) {
        if (!this.zul.includes(this.Wke[t])) {
          e = false;
          break;
        }
      }
      if (e) {
        const t = new CustomPromise_1.CustomPromise();
        t.SetResult(true);
        return t;
      }
    }
    this.zul = this.Jul();
    this.zul ||= [];
    const e = this.zul;
    this.OUu ||= new Map();
    for (const r of e) {
      var s = {
        RoleId: r
      };
      this.OUu.set(r, s);
      if (this.g6_?.has(r)) {
        this.qUu ||= new Map();
        if (!this.qUu.has(r)) {
          s = {
            RoleId: r
          };
          s = {
            RoleId: r,
            LinkRoleData: s
          };
          this.qUu.set(r, s);
        }
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]开始预加载资源", ["roleIdList", this.zul]);
    }
    this.O_1().then(() => {
      this.$sl(e).then(() => {
        this.q_1(e).then(() => {
          this.$Za();
          this.ResetMainBp();
          t.SetResult(true);
        }).catch(() => {
          t.SetResult(false);
        });
      }).catch(() => {
        t.SetResult(false);
      });
    }).catch(() => {
      t.SetResult(false);
    });
    return t;
  }
  PreloadTeamRoleRes() {
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamRoleConfigIdList(false, true);
    if (t) {
      this.SetRoleIdList(t);
      this.b$1(t);
    } else {
      this.b$1([]);
    }
    return this.PreloadRes();
  }
  SetPreloadConfigId(t) {
    if (ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkPreloadConfig(t)) {
      this.TLd = t;
    }
  }
  async O_1() {
    var t = [];
    t.push(this.cwa());
    if (this.CheckInDreamLink()) {
      t.push(this.mwa(BattleLinkDefine_1.THREE_ROLE_SEQ_PATH));
      t.push(this.mwa(BattleLinkDefine_1.TWO_ROLE_SEQ_PATH));
    } else {
      t.push(this.mwa(BattleLinkDefine_1.THREE_ROLE_SEQ_NEW_PATH));
      t.push(this.mwa(BattleLinkDefine_1.TWO_ROLE_SEQ_NEW_PATH));
    }
    await Promise.all(t);
  }
  async $sl(t) {
    const s = [];
    t.forEach((t, e) => {
      var i = this.FUu(t);
      if (i) {
        s.push(this.Wll(t, i.Id, i.CharacterDataAsset));
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "[BattleLink]找不到roleId的配置", ["roleid", t]);
      }
      if (this.g6_?.has(t)) {
        if (i = this.NUu(t)) {
          s.push(this.Wll(t, i.Id, i.CharacterDataAsset));
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 67, "[BattleLink]找不到roleId的变身配置", ["roleid", t]);
        }
      }
    });
    await Promise.all(s);
  }
  async q_1(t) {
    this.GUu = [];
    const s = !this.CheckInDreamLink();
    t.forEach((t, e) => {
      var i;
      if (s) {
        if (i = this.as1?.get(t)) {
          this.VUu(t, i, true);
        }
        if (i = this.g6_?.get(t)) {
          this.VUu(t, i, true);
        }
      } else {
        this.VUu(t);
      }
    });
    await Promise.all(this.GUu);
    this.GUu = undefined;
  }
  VUu(e, i, t) {
    var s;
    var r = this.GUu;
    var o = i && i === this.g6_?.get(e);
    var a = (o ? this.qUu?.get(e)?.LinkRoleData : this.OUu?.get(e))?.DataAsset;
    if (a) {
      if (a.CharacterActorClass) {
        s = UE.KismetSystemLibrary.GetPathName(a.CharacterActorClass);
        r.push(this.dwa(e, i, s));
      }
      if (a.Cos_Pose_AnimSequence) {
        s = UE.KismetSystemLibrary.GetPathName(a.Cos_Pose_AnimSequence);
        r.push(this.Ral(e, i, s));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 67, "[BattleLink]找不到角色对应的DA", ["roleid", e]);
    }
    var n = o ? this.NUu(e) : this.FUu(e);
    if (n) {
      if (n.NeedLoadMesh === 1 && (a = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(e)?.MeshId) && (s = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, a.toString())?.网格体?.ToAssetPathName()) && s.length && s !== "None") {
        r.push(this.xsh(e, i, s));
      }
      if (t) {
        var h = n.WeaponMeshList.length;
        var l = n.WeaponAnimList.length;
        var _ = n.CompNameList.length;
        for (let t = 0; t < h; t++) {
          r.push(this.xsh(e, i, n.WeaponMeshList[t], true, t < _ ? n.CompNameList[t] : DEFAULT_COMP_NAME));
        }
        for (let t = 0; t < l; t++) {
          r.push(this.Ral(e, i, n.WeaponAnimList[t], true, t < _ ? n.CompNameList[t] : DEFAULT_COMP_NAME));
        }
      } else if (e === 1105) {
        r.push(this.xsh(e, i, BattleLinkDefine_1.ZHEZHI_WEAPON_MESH, true));
        r.push(this.Ral(e, i, BattleLinkDefine_1.ZHEZHI_WEAPON_ANIM, true));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 67, "[BattleLink]找不到roleId的配置", ["roleid", e]);
    }
  }
  async cwa() {
    const e = new CustomPromise_1.CustomPromise();
    var t = this.CheckInDreamLink() ? BattleLinkDefine_1.BATTLE_LINK_BP_PATH : BattleLinkDefine_1.BATTLE_LINK_BP_NEW_PATH;
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
      if (t) {
        if (this.swa) {
          ActorSystem_1.ActorSystem.Put("BattleLinkModel.LoadMainBp", this.swa);
        }
        this.swa = ActorSystem_1.ActorSystem.Get(t, MathUtils_1.MathUtils.DefaultTransformDouble);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "[BattleLink]加载BP_SplitScreen失败");
      }
      e.SetResult();
    }, 100);
    return e.Promise;
  }
  async Wll(i, s, t) {
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_SplitScreenCharacterData_C, t => {
      var e;
      if (t) {
        if (e = this.jUu(i, s)) {
          e.DataAsset = t;
        }
        r.SetResult();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "[BattleLink]加载角色DA失败");
      }
    }, 100);
    return r.Promise;
  }
  async Ral(i, s, r, o = false, a = DEFAULT_COMP_NAME) {
    const n = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimSequence, t => {
      var e;
      if (t) {
        if (e = this.jUu(i, s)) {
          if (o) {
            e.WeaponAnimMap ||= new Map();
            e.WeaponAnimMap.set(a, t);
          } else {
            e.Anim = t;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "[BattleLink]加载anim失败", ["roleId", i], ["path", r]);
      }
      n.SetResult();
    }, 100);
    return n.Promise;
  }
  async dwa(i, s, t) {
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
      var e;
      if (t) {
        if (e = this.jUu(i, s)) {
          e.SeqBpClass = t;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "[BattleLink]加载角色SeqBp失败");
      }
      r.SetResult();
    }, 100);
    return r.Promise;
  }
  async mwa(e) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, t => {
      if (t) {
        if (e === BattleLinkDefine_1.THREE_ROLE_SEQ_PATH || e === BattleLinkDefine_1.THREE_ROLE_SEQ_NEW_PATH) {
          this.hwa = t;
        } else {
          this.gml = t;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "[BattleLink]加载Seq失败", ["path", e]);
      }
      i.SetResult();
    }, 100);
    return i.Promise;
  }
  async xsh(i, s, r, o = false, a = DEFAULT_COMP_NAME) {
    const n = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.SkeletalMesh, t => {
      var e;
      if (t) {
        if (e = this.jUu(i, s)) {
          if (o) {
            e.WeaponMeshMap ||= new Map();
            e.WeaponMeshMap.set(a, t);
          } else {
            e.Mesh = t;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 67, "[BattleLink]加载Mesh失败", ["roleId", i], ["path", r]);
      }
      n.SetResult();
    }, 100);
    return n.Promise;
  }
  CheckSplitScreenRes() {
    if (this.swa) {
      if (this.V1l || this.H1l) {
        if (this.V1l && !this.hwa) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Battle", 67, "[BattleLink]播放分屏时资源没准备好: ThreeRoleSeq");
          }
          return false;
        } else {
          return !this.H1l || !!this.gml || !(Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 67, "[BattleLink]播放分屏时资源没准备好: TwoRoleSeq"), 1);
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 67, "[BattleLink]非三人或双人队伍, 播放分屏检查seq失败");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 67, "[BattleLink]播放分屏时资源没准备好: MainBp");
      }
      return false;
    }
  }
  $Za() {
    if (this.swa) {
      this.swa.End();
      this.NUe = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      this.swa.D_K2_SetActorLocation(this.GetBpLocation(), false, undefined, false);
      this.swa.SetActorHiddenInGame(true);
    }
  }
  ResetMainBp() {
    var t;
    if (this.swa) {
      this.swa.Reset();
      if (this.V1l) {
        this.swa.E_LinkPos_1 = 0;
        this.swa.E_LinkPos_2 = 0.5;
        this.swa.E_LinkPos_3 = 1;
      } else {
        this.swa.E_LinkPos_1 = 1;
        this.swa.E_LinkPos_2 = 0;
      }
      t = [this.swa.CharacterActor_1, this.swa.CharacterActor_2];
      if (this.V1l) {
        t.push(this.swa.CharacterActor_3);
      }
      t.forEach((t, e) => {
        if (!(e >= this.Wke.length)) {
          var i = this.Wke[e];
          var s = this.HUu(i);
          var s = this.jUu(i, s);
          var r = s?.SeqBpClass;
          t?.SetChildActorClass(r);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Bp设置ChildActor", ["roleId", i], ["class", r]);
          }
          var r = t?.ChildActor?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
          if (r) {
            var o = s?.Mesh;
            if (o) {
              r.SetSkeletalMesh(o);
            }
            var r = s?.WeaponMeshMap;
            if (r) {
              for (var [a, n] of r.entries()) {
                let e = undefined;
                var h = t?.ChildActor?.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
                if (h) {
                  for (let t = 0; t < h.Num(); t++) {
                    var l = h.Get(t);
                    if (l.IsA(UE.SkeletalMeshComponent.StaticClass()) && l.GetName() === a) {
                      e = l;
                      break;
                    }
                  }
                }
                if (e) {
                  e.SetSkeletalMesh(n);
                  e.SetVisibility(true);
                  e.SetActive(true);
                }
              }
            }
          }
          o = s?.DataAsset;
          if (o) {
            this.Xsl(e, i, o);
          }
        }
      });
    }
  }
  Xsl(t, e, i) {
    if (this.swa) {
      var s;
      var r = this.swa;
      switch (t) {
        case 0:
          r.PointLight1_Location = i.PointLight_Location;
          r.PointLight1_ToonLightColor = i.PointLight_Color;
          r.EyeLightSimulation_Color1 = i.EyeLightSimulation_Color;
          if (r.IsA(UE.BP_SplitScreen_New_C.StaticClass())) {
            (s = r).LightYaw1 = i.LightYaw;
            s.FaceLightYaw1 = i.FaceLightYaw;
            s.RoleId1 = e;
          }
          break;
        case 1:
          r.PointLight2_Location = i.PointLight_Location;
          r.PointLight2_ToonLightColor = i.PointLight_Color;
          r.EyeLightSimulation_Color2 = i.EyeLightSimulation_Color;
          if (r.IsA(UE.BP_SplitScreen_New_C.StaticClass())) {
            (s = r).LightYaw2 = i.LightYaw;
            s.FaceLightYaw2 = i.FaceLightYaw;
            s.RoleId2 = e;
          }
          break;
        case 2:
          r.PointLight3_Location = i.PointLight_Location;
          r.PointLight3_ToonLightColor = i.PointLight_Color;
          r.EyeLightSimulation_Color3 = i.EyeLightSimulation_Color;
          if (r.IsA(UE.BP_SplitScreen_New_C.StaticClass())) {
            (s = r).LightYaw3 = i.LightYaw;
            s.FaceLightYaw3 = i.FaceLightYaw;
            s.RoleId3 = e;
          }
      }
    }
  }
  XZa(e, i, s) {
    var r = i.ChildActor;
    if (r) {
      i = r.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (i) {
        let t = undefined;
        t = (t = i.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE)) || i.GetAnimInstance();
        i = this.HUu(e);
        i = this.jUu(e, i);
        if (s) {
          s = i?.Anim;
          s = t?.PlaySlotAnimationAsDynamicMontage(s, SequenceDefine_1.ABP_Seq_Slot_Name, 0, 0, 1, 1);
          if (s && (t?.Montage_Pause(s), i)) {
            i.Montage = s;
          }
        } else {
          s = i?.Montage;
          if (s) {
            t?.Montage_Resume(s);
            i.Montage = undefined;
          }
          s = i?.WeaponAnimMap;
          if (s) {
            for (var [o, a] of s.entries()) {
              let e = undefined;
              var n = r.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
              if (n) {
                for (let t = 0; t < n.Num(); t++) {
                  var h = n.Get(t);
                  if (h.IsA(UE.SkeletalMeshComponent.StaticClass()) && h.GetName() === o) {
                    e = h;
                    break;
                  }
                }
              }
              if (e) {
                e.PlayAnimation(a, false);
              }
            }
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[BattleLink]找不到ChildActor的骨骼网格体", ["roleId", e]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Bp的ChildActor为空", ["roleId", e]);
    }
  }
  $Uu(t) {
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      if (t === ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e.GetConfigId)) {
        return !!e.EntityHandle?.Entity?.GetComponent(308)?.IsMorphing();
      }
    }
    return false;
  }
  PlayRoleAnim(t = false) {
    if (this.swa && (this.XZa(this.Wke[0], this.swa.CharacterActor_1, t), this.XZa(this.Wke[1], this.swa.CharacterActor_2, t), this.V1l)) {
      this.XZa(this.Wke[2], this.swa.CharacterActor_3, t);
    }
  }
  PlayRoleLinkAudio() {
    var e = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetActivityConfig(ACTIVITY_ID);
    if (ConfigManager_1.ConfigManager.DreamLinkConfig && e) {
      var i = e.FirstWhiteCatDungeonId;
      if (this.V1l && this.NUe === i) {
        let t = true;
        for (const s of this.Wke) {
          t = t && e.PlotRoleLinkTeam.includes(s);
        }
        if (t) {
          i = e.PlotRoleLinkAudio;
          AudioSystem_1.AudioSystem.PostEvent(i);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[BattleLink]播放剧情Link语音.", ["Event", i]);
          }
          return;
        }
      }
      this._ml();
    }
  }
  _ml() {
    var t;
    if (this.Oll < 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 42, "[BattleLink]播放Link语音时获取当前角色失败", ["RoleId", this.Oll]);
      }
    } else {
      t = this.xld !== 0 ? this.xld : this.Oll;
      if (t = this.FUu(t, true)) {
        t = t.RoleLinkAudio;
        AudioSystem_1.AudioSystem.PostEvent(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[BattleLink]播放主控角色Link语音", ["Event", t]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 42, "[BattleLink]播放Link语音时获取当前角色配置失败", ["RoleId", this.Oll]);
      }
    }
  }
  InitBeforeStart() {
    var t;
    if (this.swa && this.swa.IsA(UE.BP_SplitScreen_New_C.StaticClass())) {
      t = this.swa;
      if (this.V1l) {
        t.IsThree = true;
        t.Width = 38;
      } else {
        t.IsThree = false;
        t.Width = 28;
      }
    }
  }
  GetSplitScreenMainBp() {
    return this.swa;
  }
  GetSplitScreenSeq() {
    if (this.V1l) {
      return this.hwa;
    } else if (this.H1l) {
      return this.gml;
    } else {
      return undefined;
    }
  }
  GetLinkDuration() {
    this.kJa ||= CommonParamById_1.configCommonParamById.GetIntConfig("LinkPrepareDuration");
    return this.kJa;
  }
  GetBpLocation() {
    this.KZa ||= new UE.VectorDouble(0, 0, -3000);
    return this.KZa;
  }
  CheckInBattleLink() {
    return this.CheckInNewBattleLink() || this.CheckInDreamLink() || this.CheckInSpecialBattleLink();
  }
  CheckInNewBattleLink() {
    var t;
    var e;
    return !!this.NewLinkGmTest && this.TLd === 0 || !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t), e = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkParam(LINK_COMMON_PARAM_ROW), !t?.InstSubType) && !!e?.InstSubTypeList.includes(t.InstSubType);
  }
  CheckInDreamLink() {
    var t;
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)?.InstSubType === 23 || !!(e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("LinkInstanceIds")) && !!e.includes(t));
  }
  CheckInSpecialBattleLink() {
    var t;
    var e;
    return !!this.NewLinkGmTest && this.TLd !== 0 || !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t), e = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkParam(LINK_COMMON_PARAM_ROW), !t?.Id) && !!e?.InstIdList.includes(t.Id);
  }
  IsNewLinkGmTest() {
    return this.NewLinkGmTest;
  }
  SetNewLinkGmTest(t) {
    this.NewLinkGmTest = t;
  }
  GetLinkStatus() {
    return this.ZKa;
  }
  CanUseLinkSkill(t = undefined) {
    if (this.ZKa !== 2 && this.ZKa !== 3) {
      return false;
    }
    if (this.uul) {
      return false;
    }
    let e = t;
    return !!(e = e || ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id) && !this.HasLinkEntityId(e);
  }
  ResetLinkSkillStatus() {
    this.SetLinkSkillInCd(false);
    this.JKa = undefined;
  }
  UpdateLinkStatus(t, e = undefined) {
    this.ZKa = t;
    this.SetLinkSkillInCd(false);
    if (t === 0) {
      this.JKa = undefined;
      ControllerHolder_1.ControllerHolder.BattleLinkController.StopLink();
      ControllerHolder_1.ControllerHolder.BattleLinkController.SetMessageId(undefined);
    } else if (t === 2) {
      this.JKa = undefined;
    } else if (t === 3) {
      e = MathUtils_1.MathUtils.LongToNumber(e || Time_1.Time.Now);
      ControllerHolder_1.ControllerHolder.BattleLinkController.StartLink(e);
    } else if (t === 4) {
      ControllerHolder_1.ControllerHolder.BattleLinkController.StartLinkExplosion();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkStatusChanged, t);
  }
  HandleLinkingStateNotify(t) {
    ControllerHolder_1.ControllerHolder.BattleLinkController.SetMessageId(t._Vn);
    if (t.sT_ === 0) {
      this.UpdateLinkStatus(2);
    } else if (this.V1l || this.H1l) {
      if (this.V1l && t.sT_ < 3 || this.H1l && t.sT_ < 2) {
        this.UpdateLinkStatus(3, t.J8n);
      } else {
        this.UpdateLinkStatus(4);
      }
    } else {
      this.UpdateLinkStatus(0);
    }
  }
  HandleLinkExitNotify(t) {
    this.UpdateLinkStatus(0);
  }
  AddLinkEntityId(t) {
    if (this.JKa) {
      if (!this.JKa.includes(t)) {
        this.JKa.push(t);
      }
    } else {
      this.JKa = [t];
    }
    this.SetLinkSkillInCd(true);
  }
  HasLinkEntityId(t) {
    return !!this.JKa?.includes(t);
  }
  SetLinkSkillInCd(t) {
    if (this.uul !== t) {
      this.uul = t;
      BattleLinkController_1.BattleLinkController.SetPlayerUltraSkillEnable(!t);
    }
  }
  HandleNewLinkStateNotify(t, e) {
    var i = Number(t.lMs);
    if (this.Ih1 === 4 && i !== 4) {
      ControllerHolder_1.ControllerHolder.BattleLinkController.OnExitLinkBurst();
    }
    this.Ih1 = i;
    this.Er1 = t.On1;
  }
  GetNewLinkStatus() {
    return this.Ih1;
  }
  GetLinkConfig() {
    return ConfigManager_1.ConfigManager.BattleLinkConfig?.GetLinkDataConfig(this.Er1);
  }
  FUu(e, i = false) {
    let s = undefined;
    if (this.CheckInNewBattleLink() || this.CheckInSpecialBattleLink()) {
      let t = this.as1?.get(e) ?? 0;
      if (i) {
        t = this.HUu(e);
      }
      s = ConfigManager_1.ConfigManager.BattleLinkConfig?.GetRoleConfig(t);
    } else {
      s = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetRoleConfig(e);
    }
    return s;
  }
  NUu(t) {
    t = this.g6_?.get(t) ?? 0;
    return ConfigManager_1.ConfigManager.BattleLinkConfig?.GetRoleConfig(t);
  }
  jUu(t, e) {
    if (e && e !== 0 && (this.g6_?.get(t) ?? 0) === e) {
      return this.qUu?.get(t)?.LinkRoleData;
    }
    return this.OUu?.get(t);
  }
  HUu(t) {
    let e = this.as1?.get(t);
    return (e = this.g6_?.has(t) && this.$Uu(t) ? this.g6_.get(t) : e) ?? 0;
  }
}
exports.BattleLinkModel = BattleLinkModel;
//# sourceMappingURL=BattleLinkModel.js.map