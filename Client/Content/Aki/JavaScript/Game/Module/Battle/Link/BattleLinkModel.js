"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BattleLinkModel = void 0;
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines"),
  SequenceDefine_1 = require("../../Plot/Sequence/SequenceDefine"),
  BattleLinkController_1 = require("./BattleLinkController"),
  BattleLinkDefine_1 = require("./BattleLinkDefine"),
  THREE_ROLE = 3,
  TWO_ROLE = 2,
  ACTIVITY_ID = 102600001,
  LINK_COMMON_PARAM_ROW = 1,
  DEFAULT_COMP_NAME = "WeaponCase";
class BattleLinkModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.swa = void 0, this.hwa = void 0, this.gml = void 0, this.lwa = void 0, this._wa = void 0, this.Ush = void 0, this.F$ = void 0, this.Ksl = void 0, this.Ual = void 0, this.Dal = void 0, this.NUe = -1, this.Oll = -1, this.Wke = void 0, this.V1l = !1, this.H1l = !1, this.JKa = void 0, this.kJa = void 0, this.KZa = void 0, this.uul = !1, this.Yul = void 0, this.zul = void 0, this.Nn1 = void 0, this.NewLinkGmTest = !1, this.ZKa = 0, this.th1 = 0, this.rr1 = 0
  }
  OnInit() {
    return !0
  }
  OnLeaveLevel() {
    return this.swa && ActorSystem_1.ActorSystem.Put("BattleLinkModel.OnLeaveLevel", this.swa), this.swa = void 0, this.hwa = void 0, this.gml = void 0, this.lwa?.clear(), this._wa?.clear(), this.Ush?.clear(), this.F$?.clear(), this.Ksl?.clear(), this.Ual?.clear(), this.Dal?.clear(), this.NUe = -1, this.Oll = -1, this.V1l = !1, this.H1l = !1, this.zul = void 0, this.uul = !1, this.JKa = void 0, this.ZKa = 0, this.th1 = 0, this.rr1 = 0, !(this.NewLinkGmTest = !1)
  }
  jH1(t) {
    if (this.zul) {
      var i = [];
      for (const e of this.zul) t.includes(e) || (i.push(e), this.lwa?.delete(e), this._wa?.delete(e), this.Ush?.delete(e), this.F$?.delete(e), this.Ksl?.delete(e), this.Ual?.delete(e), this.Dal?.delete(e));
      for (const s of i) this.zul.splice(this.zul.indexOf(s), 1)
    } else this.lwa?.clear(), this._wa?.clear(), this.Ush?.clear(), this.F$?.clear(), this.Ksl?.clear(), this.Ual?.clear(), this.Dal?.clear()
  }
  Jul() {
    if (this.CheckInNewBattleLink()) return this.Wke;
    var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (!this.Yul) {
      var i = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetActivityConfig(ACTIVITY_ID);
      if (!i) return;
      var e, s, i = i.PreloadRoleIds;
      this.Yul = new Map;
      for ([e, s] of i.entries()) {
        var r = s.split(";").map(t => parseInt(t));
        this.Yul.set(e, r)
      }
    }
    let o = this.Yul.get(t);
    return o = o || this.Wke
  }
  SetRoleIdList(i) {
    if (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[BattleLink]设置角色列表", ["roleIdList", i]), this.Wke = [...i], this.CheckInNewBattleLink()) {
      var e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItems();
      if (e) {
        this.Nn1?.clear();
        for (const o of e) {
          var t, s = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(o.GetConfigId);
          i.includes(s) && (t = (ModelManager_1.ModelManager.CreatureModel?.GetEntity(o.GetCreatureDataId()))?.Entity?.GetComponent(0)?.GetModelId() ?? 0) && (void 0 === this.Nn1 && (this.Nn1 = new Map), this.Nn1.set(s, t))
        }
        var r = this.GetLinkConfig();
        1 === e.length && r && r.IsEnableOneRoleBurst && (e = r.OneRoleBurstTeammateId, r = ConfigManager_1.ConfigManager.BattleLinkConfig?.GetRoleConfig(e)) && (r = r.RoleId, this.Nn1?.set(r, e), i.push(r))
      }
    }
    if (this.V1l = !1, this.H1l = !1, i.length === THREE_ROLE ? this.V1l = !0 : i.length === TWO_ROLE && (this.H1l = !0), this.V1l || this.H1l) {
      let t = i[0];
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem, r = (e && (t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e.GetConfigId)), [...i]);
      r.splice(i.indexOf(t), 1), r.splice(1, 0, t), this.Wke = r, this.Oll = t
    } else this.Oll = -1
  }
  PreloadRes() {
    const t = new CustomPromise_1.CustomPromise;
    if (this.zul && this.Wke && this.zul.length >= this.Wke.length) {
      let i = !0;
      var e = this.Wke.length;
      for (let t = 0; t < e; t++)
        if (!this.zul.includes(this.Wke[t])) {
          i = !1;
          break
        } if (i) {
        const t = new CustomPromise_1.CustomPromise;
        return t.SetResult(!0), t
      }
    }
    return this.zul = this.Jul(), this.zul || (this.zul = []), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[BattleLink]开始预加载资源", ["roleIdList", this.zul]), this.zl1().then(() => {
      this.$sl(this.zul).then(() => {
        this.Jl1(this.zul).then(() => {
          this.$Za(), this.ResetMainBp(), t.SetResult(!0)
        }).catch(() => {
          t.SetResult(!1)
        })
      }).catch(() => {
        t.SetResult(!1)
      })
    }).catch(() => {
      t.SetResult(!1)
    }), t
  }
  PreloadTeamRoleRes() {
    var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamRoleConfigIdList(!1, !0);
    return t ? (this.SetRoleIdList(t), this.jH1(t)) : this.jH1([]), this.PreloadRes()
  }
  async zl1() {
    var t = [];
    t.push(this.cwa()), this.CheckInNewBattleLink() ? (t.push(this.mwa(BattleLinkDefine_1.THREE_ROLE_SEQ_NEW_PATH)), t.push(this.mwa(BattleLinkDefine_1.TWO_ROLE_SEQ_NEW_PATH))) : (t.push(this.mwa(BattleLinkDefine_1.THREE_ROLE_SEQ_PATH)), t.push(this.mwa(BattleLinkDefine_1.TWO_ROLE_SEQ_PATH))), await Promise.all(t)
  }
  async $sl(t) {
    const s = [];
    t.forEach((t, i) => {
      var e = this.GetRoleConfig(t);
      e ? s.push(this.Wll(t, e.CharacterDataAsset)) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]找不到roleId的配置", ["roleid", t])
    }), await Promise.all(s)
  }
  async Jl1(t) {
    const n = [],
      l = this.CheckInNewBattleLink();
    t.forEach((i, t) => {
      var e, s = this.Ksl?.get(i),
        r = (s ? (s.CharacterActorClass && (e = UE.KismetSystemLibrary.GetPathName(s.CharacterActorClass), n.push(this.dwa(i, e))), s.Cos_Pose_AnimSequence && (e = UE.KismetSystemLibrary.GetPathName(s.Cos_Pose_AnimSequence), n.push(this.Ral(i, e)))) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]找不到角色对应的DA", ["roleid", i]), this.GetRoleConfig(i));
      if (r)
        if (1 === r.NeedLoadMesh && (s = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(i)?.MeshId) && (e = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, s.toString())?.网格体?.ToAssetPathName()) && e.length && "None" !== e && n.push(this.xsh(i, e)), l) {
          var o = r.WeaponMeshList.length,
            a = r.WeaponAnimList.length,
            h = r.CompNameList.length;
          for (let t = 0; t < o; t++) n.push(this.xsh(i, r.WeaponMeshList[t], !0, t < h ? r.CompNameList[t] : DEFAULT_COMP_NAME));
          for (let t = 0; t < a; t++) n.push(this.Ral(i, r.WeaponAnimList[t], !0, t < h ? r.CompNameList[t] : DEFAULT_COMP_NAME))
        } else 1105 === i && (n.push(this.xsh(i, BattleLinkDefine_1.ZHEZHI_WEAPON_MESH, !0)), n.push(this.Ral(i, BattleLinkDefine_1.ZHEZHI_WEAPON_ANIM, !0)));
      else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]找不到roleId的配置", ["roleid", i])
    }), await Promise.all(n)
  }
  async cwa() {
    const i = new CustomPromise_1.CustomPromise;
    var t = this.CheckInNewBattleLink() ? BattleLinkDefine_1.BATTLE_LINK_BP_NEW_PATH : BattleLinkDefine_1.BATTLE_LINK_BP_PATH;
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
      t ? (this.swa && ActorSystem_1.ActorSystem.Put("BattleLinkModel.LoadMainBp", this.swa), this.swa = ActorSystem_1.ActorSystem.Get(t, MathUtils_1.MathUtils.DefaultTransformDouble)) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]加载BP_SplitScreen失败"), i.SetResult()
    }, 100), i.Promise
  }
  async Wll(i, t) {
    const e = new CustomPromise_1.CustomPromise;
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_SplitScreenCharacterData_C, t => {
      t ? (this.Ksl || (this.Ksl = new Map), this.Ksl.set(i, t), e.SetResult()) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]加载角色DA失败")
    }, 100), e.Promise
  }
  async Ral(e, t, s = !1, r = DEFAULT_COMP_NAME) {
    const o = new CustomPromise_1.CustomPromise;
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimSequence, i => {
      if (i)
        if (s) {
          this.Ual || (this.Ual = new Map);
          let t = this.Ual.get(e);
          t || (t = new Map, this.Ual.set(e, t)), t.set(r, i)
        } else this._wa || (this._wa = new Map), this._wa.set(e, i);
      else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]加载anim失败", ["roleId", e], ["path", t]);
      o.SetResult()
    }, 100), o.Promise
  }
  async dwa(i, t) {
    const e = new CustomPromise_1.CustomPromise;
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
      t ? (this.lwa || (this.lwa = new Map), this.lwa.set(i, t)) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]加载角色SeqBp失败"), e.SetResult()
    }, 100), e.Promise
  }
  async mwa(i) {
    const e = new CustomPromise_1.CustomPromise;
    return ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LevelSequence, t => {
      t ? i === BattleLinkDefine_1.THREE_ROLE_SEQ_PATH || i === BattleLinkDefine_1.THREE_ROLE_SEQ_NEW_PATH ? this.hwa = t : this.gml = t : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]加载Seq失败", ["path", i]), e.SetResult()
    }, 100), e.Promise
  }
  async xsh(e, t, s = !1, r = DEFAULT_COMP_NAME) {
    const o = new CustomPromise_1.CustomPromise;
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.SkeletalMesh, i => {
      if (i)
        if (s) {
          this.Dal || (this.Dal = new Map);
          let t = this.Dal.get(e);
          t || (t = new Map, this.Dal.set(e, t)), t.set(r, i)
        } else this.Ush || (this.Ush = new Map), this.Ush.set(e, i);
      else Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[BattleLink]加载Mesh失败", ["roleId", e], ["path", t]);
      o.SetResult()
    }, 100), o.Promise
  }
  CheckSplitScreenRes() {
    return this.swa ? this.V1l || this.H1l ? this.V1l && !this.hwa ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 67, "[BattleLink]播放分屏时资源没准备好: ThreeRoleSeq"), !1) : !(this.H1l && !this.gml && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 67, "[BattleLink]播放分屏时资源没准备好: TwoRoleSeq"), 1)) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 67, "[BattleLink]非三人或双人队伍, 播放分屏检查seq失败"), !1) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 67, "[BattleLink]播放分屏时资源没准备好: MainBp"), !1)
  }
  $Za() {
    this.swa && (this.swa.End(), this.NUe = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), this.swa.D_K2_SetActorLocation(this.GetBpLocation(), !1, void 0, !1), this.swa.SetActorHiddenInGame(!0))
  }
  ResetMainBp() {
    var t;
    this.swa && (this.swa.Reset(), this.V1l ? (this.swa.E_LinkPos_1 = 0, this.swa.E_LinkPos_2 = .5, this.swa.E_LinkPos_3 = 1) : (this.swa.E_LinkPos_1 = 1, this.swa.E_LinkPos_2 = 0), t = [this.swa.CharacterActor_1, this.swa.CharacterActor_2], this.V1l && t.push(this.swa.CharacterActor_3), t.forEach((t, i) => {
      if (!(i >= this.Wke.length)) {
        var e = this.Wke[i],
          s = this.lwa?.get(e),
          s = (t?.SetChildActorClass(s), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Bp设置ChildActor", ["roleId", e], ["class", s]), t?.ChildActor?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass()));
        if (s) {
          var r = this.Ush?.get(e),
            s = (r && s.SetSkeletalMesh(r), this.Dal?.get(e));
          if (s)
            for (var [o, a] of s.entries()) {
              let i = void 0;
              var h = t?.ChildActor?.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
              if (h)
                for (let t = 0; t < h.Num(); t++) {
                  var n = h.Get(t);
                  if (n.IsA(UE.SkeletalMeshComponent.StaticClass()) && n.GetName() === o) {
                    i = n;
                    break
                  }
                }
              i && (i.SetSkeletalMesh(a), i.SetVisibility(!0), i.SetActive(!0))
            }
        }
        r = this.Ksl?.get(e);
        r && this.Xsl(i, e, r)
      }
    }))
  }
  Xsl(t, i, e) {
    if (this.swa) {
      var s, r = this.swa;
      switch (t) {
        case 0:
          r.PointLight1_Location = e.PointLight_Location, r.PointLight1_ToonLightColor = e.PointLight_Color, r.EyeLightSimulation_Color1 = e.EyeLightSimulation_Color, r.IsA(UE.BP_SplitScreen_New_C.StaticClass()) && ((s = r).LightYaw1 = e.LightYaw, s.FaceLightYaw1 = e.FaceLightYaw, s.RoleId1 = i);
          break;
        case 1:
          r.PointLight2_Location = e.PointLight_Location, r.PointLight2_ToonLightColor = e.PointLight_Color, r.EyeLightSimulation_Color2 = e.EyeLightSimulation_Color, r.IsA(UE.BP_SplitScreen_New_C.StaticClass()) && ((s = r).LightYaw2 = e.LightYaw, s.FaceLightYaw2 = e.FaceLightYaw, s.RoleId2 = i);
          break;
        case 2:
          r.PointLight3_Location = e.PointLight_Location, r.PointLight3_ToonLightColor = e.PointLight_Color, r.EyeLightSimulation_Color3 = e.EyeLightSimulation_Color, r.IsA(UE.BP_SplitScreen_New_C.StaticClass()) && ((s = r).LightYaw3 = e.LightYaw, s.FaceLightYaw3 = e.FaceLightYaw, s.RoleId3 = i)
      }
    }
  }
  XZa(i, e, s) {
    var r = e.ChildActor;
    if (r) {
      e = r.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (e) {
        let t = void 0;
        if (t = (t = e.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE)) || e.GetAnimInstance(), s) {
          e = this._wa?.get(i), s = t?.PlaySlotAnimationAsDynamicMontage(e, SequenceDefine_1.ABP_Seq_Slot_Name, 0, 0, 1, 1);
          s && (t?.Montage_Pause(s), this.F$ || (this.F$ = new Map), this.F$.set(i, s))
        } else {
          e = this.F$?.get(i), s = (e && (t?.Montage_Resume(e), this.F$?.delete(i)), this.Ual?.get(i));
          if (s)
            for (var [o, a] of s.entries()) {
              let i = void 0;
              var h = r.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
              if (h)
                for (let t = 0; t < h.Num(); t++) {
                  var n = h.Get(t);
                  if (n.IsA(UE.SkeletalMeshComponent.StaticClass()) && n.GetName() === o) {
                    i = n;
                    break
                  }
                }
              i && i.PlayAnimation(a, !1)
            }
        }
      } else Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[BattleLink]找不到ChildActor的骨骼网格体", ["roleId", i])
    } else Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[BattleLink]分屏Bp的ChildActor为空", ["roleId", i])
  }
  PlayRoleAnim(t = !1) {
    this.swa && (this.XZa(this.Wke[0], this.swa.CharacterActor_1, t), this.XZa(this.Wke[1], this.swa.CharacterActor_2, t), this.V1l) && this.XZa(this.Wke[2], this.swa.CharacterActor_3, t)
  }
  PlayRoleLinkAudio() {
    var i = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetActivityConfig(ACTIVITY_ID);
    if (ConfigManager_1.ConfigManager.DreamLinkConfig && i) {
      var e = i.FirstWhiteCatDungeonId;
      if (this.V1l && this.NUe === e) {
        let t = !0;
        for (const s of this.Wke) t = t && i.PlotRoleLinkTeam.includes(s);
        if (t) return e = i.PlotRoleLinkAudio, AudioSystem_1.AudioSystem.PostEvent(e), void(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[BattleLink]播放剧情Link语音.", ["Event", e]))
      }
      this._ml()
    }
  }
  _ml() {
    var t;
    this.Oll < 0 ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("Audio", 42, "[BattleLink]播放Link语音时获取当前角色失败", ["RoleId", this.Oll]) : (t = this.GetRoleConfig(this.Oll)) ? (t = t.RoleLinkAudio, AudioSystem_1.AudioSystem.PostEvent(t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[BattleLink]播放主控角色Link语音", ["Event", t])) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Audio", 42, "[BattleLink]播放Link语音时获取当前角色配置失败", ["RoleId", this.Oll])
  }
  InitBeforeStart() {
    var t;
    this.swa && this.swa.IsA(UE.BP_SplitScreen_New_C.StaticClass()) && (t = this.swa, this.V1l ? (t.IsThree = !0, t.Width = 38) : (t.IsThree = !1, t.Width = 28))
  }
  GetSplitScreenMainBp() {
    return this.swa
  }
  GetSplitScreenSeq() {
    return this.V1l ? this.hwa : this.H1l ? this.gml : void 0
  }
  GetLinkDuration() {
    return this.kJa || (this.kJa = CommonParamById_1.configCommonParamById.GetIntConfig("LinkPrepareDuration")), this.kJa
  }
  GetBpLocation() {
    return this.KZa || (this.KZa = new UE.VectorDouble(0, 0, -3e3)), this.KZa
  }
  CheckInBattleLink() {
    return this.CheckInNewBattleLink() || this.CheckInDreamLink()
  }
  CheckInNewBattleLink() {
    var t, i;
    return !!this.NewLinkGmTest || !(!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || (t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t), i = ConfigManager_1.ConfigManager.BattleLinkConfig.GetLinkParam(LINK_COMMON_PARAM_ROW), !t?.InstSubType) || !i?.InstSubTypeList.includes(t.InstSubType))
  }
  CheckInDreamLink() {
    var t, i;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), 23 === ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)?.InstSubType || !(!(i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("LinkInstanceIds")) || !i.includes(t)))
  }
  IsNewLinkGmTest() {
    return this.NewLinkGmTest
  }
  SetNewLinkGmTest(t) {
    this.NewLinkGmTest = t
  }
  GetLinkStatus() {
    return this.ZKa
  }
  CanUseLinkSkill(t = void 0) {
    if (2 !== this.ZKa && 3 !== this.ZKa) return !1;
    if (this.uul) return !1;
    let i = t;
    return !(!(i = i || ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id) || this.HasLinkEntityId(i))
  }
  ResetLinkSkillStatus() {
    this.SetLinkSkillInCd(!1), this.JKa = void 0
  }
  UpdateLinkStatus(t, i = void 0) {
    this.ZKa = t, this.SetLinkSkillInCd(!1), 0 === t ? (this.JKa = void 0, ControllerHolder_1.ControllerHolder.BattleLinkController.StopLink(), ControllerHolder_1.ControllerHolder.BattleLinkController.SetMessageId(void 0)) : 2 === t ? this.JKa = void 0 : 3 === t ? (i = MathUtils_1.MathUtils.LongToNumber(i || Time_1.Time.Now), ControllerHolder_1.ControllerHolder.BattleLinkController.StartLink(i)) : 4 === t && ControllerHolder_1.ControllerHolder.BattleLinkController.StartLinkExplosion(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleLinkStatusChanged, t)
  }
  HandleLinkingStateNotify(t) {
    ControllerHolder_1.ControllerHolder.BattleLinkController.SetMessageId(t._Vn), 0 === t.sT_ ? this.UpdateLinkStatus(2) : this.V1l || this.H1l ? this.V1l && t.sT_ < 3 || this.H1l && t.sT_ < 2 ? this.UpdateLinkStatus(3, t.J8n) : this.UpdateLinkStatus(4) : this.UpdateLinkStatus(0)
  }
  HandleLinkExitNotify(t) {
    this.UpdateLinkStatus(0)
  }
  AddLinkEntityId(t) {
    this.JKa ? this.JKa.includes(t) || this.JKa.push(t) : this.JKa = [t], this.SetLinkSkillInCd(!0)
  }
  HasLinkEntityId(t) {
    return !!this.JKa?.includes(t)
  }
  SetLinkSkillInCd(t) {
    this.uul !== t && (this.uul = t, BattleLinkController_1.BattleLinkController.SetPlayerUltraSkillEnable(!t))
  }
  HandleNewLinkStateNotify(t, i) {
    var e = Number(t.lMs);
    4 === this.th1 && 4 !== e && ControllerHolder_1.ControllerHolder.BattleLinkController.OnExitLinkBurst(), this.th1 = e, this.rr1 = t.Cn1
  }
  GetNewLinkStatus() {
    return this.th1
  }
  GetLinkConfig() {
    return ConfigManager_1.ConfigManager.BattleLinkConfig?.GetLinkDataConfig(this.rr1)
  }
  GetRoleConfig(t) {
    let i = void 0;
    var e;
    return i = this.CheckInNewBattleLink() ? (e = this.Nn1?.get(t) ?? 0, ConfigManager_1.ConfigManager.BattleLinkConfig?.GetRoleConfig(e)) : ConfigManager_1.ConfigManager.DreamLinkConfig?.GetRoleConfig(t)
  }
}
exports.BattleLinkModel = BattleLinkModel;
//# sourceMappingURL=BattleLinkModel.js.map