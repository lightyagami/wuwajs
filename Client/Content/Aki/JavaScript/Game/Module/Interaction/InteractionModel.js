"use strict";

var __decorate = this && this.__decorate || function (t, e, i, r) {
  var o;
  var n = arguments.length;
  var a = n < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, r);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (o = t[s]) {
        a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a;
      }
    }
  }
  if (n > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionModel = exports.COLOR_SUFFIX = exports.COLOR_PREFIX = exports.LOCK_TEXTURE_PREFIX = exports.LOCK_TEXTURE = exports.UNLOCK_TEXTURE = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const SceneItemCaptureComponent_1 = require("../../../Game/NewWorld/SceneItem/SceneItemCaptureComponent");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InteractConfirmController_1 = require("./SecondConfirm/InteractConfirmController");
const TsInteractionUtils_1 = require("./TsInteractionUtils");
const Descriptors_1 = require("../../../Core/CrossDataSource/Descriptors");
const DEFAULT_CD = 0.5;
exports.UNLOCK_TEXTURE = "/Game/Aki/UI/UIResources/Common/Image/InteractionIcon/T_InteractionIcon11.T_InteractionIcon11";
exports.LOCK_TEXTURE = "/Game/Aki/UI/UIResources/Common/Image/InteractionIcon/T_InteractionIcon12.T_InteractionIcon12";
exports.LOCK_TEXTURE_PREFIX = "<texture=/Game/Aki/UI/UIResources/Common/Image/InteractionIcon/T_InteractionIcon12.T_InteractionIcon12,0.4687/>";
exports.COLOR_PREFIX = "<color=#e2524c>";
exports.COLOR_SUFFIX = "</color>";
class SameTipInteract {
  constructor() {
    this.EntityId = 0;
    this.CurrentDistance = 0;
  }
}
let InteractionModel = class InteractionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.uid = 9999;
    this.E_i = undefined;
    this.S_i = false;
    this.y_i = undefined;
    this.I_i = undefined;
    this.T_i = 0;
    this.L_i = false;
    this.D_i = new Array();
    this.R_i = new Array();
    this.U_i = new Map();
    this.CurrentInteractEntityIdInternal = 0;
    this.InterctCreatureDataIdInternal = 0;
    this.IsInteractionTurning = false;
    this.LockInteractionEntity = undefined;
    this.InteractingEntity = undefined;
    this.IsTriggerMobileGuide = false;
    this.IsTriggerDesktopGuide = false;
    this.AutoLongPressTime = 0;
    this.ActiveInteractGuideCount = 0;
    this.ShowLongPressTime = 0;
    this.AutoInteractionGuideCount = 0;
    this.AutoInteractionGuideAppearCount = 0;
    this.x_i = 0;
  }
  OnInit() {
    this.AutoLongPressTime = CommonParamById_1.configCommonParamById.GetIntConfig("AutoLongPressTime");
    this.ActiveInteractGuideCount = CommonParamById_1.configCommonParamById.GetIntConfig("ActiveInteractGuideCount");
    this.ShowLongPressTime = CommonParamById_1.configCommonParamById.GetIntConfig("ShowLongPressTime");
    this.AutoInteractionGuideCount = CommonParamById_1.configCommonParamById.GetIntConfig("AutoInteractionGuideCount");
    TsInteractionUtils_1.TsInteractionUtils.Init();
    InteractConfirmController_1.InteractConfirmController.RegisterActions();
    return true;
  }
  OnClear() {
    this.E_i?.clear();
    this.y_i = undefined;
    this.I_i = undefined;
    this.D_i.length = 0;
    this.R_i.length = 0;
    this.U_i?.clear();
    TsInteractionUtils_1.TsInteractionUtils.Clear();
    InteractConfirmController_1.InteractConfirmController.Clear();
    return true;
  }
  OnLeaveLevel() {
    TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
    return true;
  }
  LoadInteractGuideData() {
    this.IsTriggerMobileGuide = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerMobileGuide, false) ?? false;
    this.IsTriggerDesktopGuide = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerDesktopGuide, false) ?? false;
  }
  LoadAutoInteractionGuideAppearCount() {
    this.AutoInteractionGuideAppearCount = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AutoInteractionGuideAppearCount, 0) ?? 0;
  }
  SaveTriggerMobileGuide(t) {
    this.IsTriggerMobileGuide = t;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerMobileGuide, t);
  }
  SaveTriggerDesktopGuide(t) {
    this.IsTriggerDesktopGuide = t;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsTriggerDesktopGuide, t);
  }
  SaveAutoInteractionGuideAppearCount(t) {
    this.AutoInteractionGuideAppearCount = t;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.AutoInteractionGuideAppearCount, t);
  }
  IsInShowAutoInteractionGuideCountLimit() {
    return this.AutoInteractionGuideAppearCount < this.AutoInteractionGuideCount;
  }
  w_i() {
    this.y_i = TsInteractionUtils_1.TsInteractionUtils.GetInteractionConfig("Common_Exit");
    if (!this.y_i || this.y_i.交互选项组.Num() <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 17, "获取交互默认退出选项失败，请检查配置InteractionConfig是否有Common_Exit");
      }
    } else {
      this.I_i = this.y_i.交互选项组.Get(0);
    }
  }
  GetInteractEntitiesCount() {
    let t = 0;
    for (const e of this.R_i) {
      if (e) {
        t += e.DirectOptionInstanceIds.length > 1 ? e.DirectOptionInstanceIds.length : 1;
      } else {
        t++;
      }
    }
    return t;
  }
  GetInteractEntityByIndex(t) {
    let e = 0;
    for (const i of this.R_i) {
      if (i && i.DirectOptionInstanceIds.length > 1) {
        e += i.DirectOptionInstanceIds.length;
      } else {
        e++;
      }
      if (e > t) {
        return i.EntityId;
      }
    }
    return -1;
  }
  RefreshInteractEntities(e) {
    let t = 0;
    for (const o of this.R_i) {
      if (o) {
        var i = o.GetEntity();
        if (i?.Valid) {
          if (SceneItemCaptureComponent_1.VISION_CAPTURE_WITH_RANGE) {
            let t = false;
            for (const n of e) {
              if (n.GetComponent(128)?.GetPawnNameKey() === SceneItemCaptureComponent_1.ABSORB_PAWN_NAME_KEY) {
                t = true;
              }
            }
            if (t) {
              continue;
            }
          }
          var r = o.DirectOptionInstanceIds.length;
          if (r <= 0) {
            e.push(i);
            if (this.CanAutoPickUp(i)) {
              t++;
            }
          } else {
            if (this.CanAutoPickUp(i)) {
              t += r;
            }
            for (let t = 0; t < r; t++) {
              e.push(i);
            }
          }
        }
      }
    }
    this.x_i = e.length;
    e.sort((t, e) => {
      t = t.GetComponent(209);
      e = e.GetComponent(209);
      t = t.GetInteractController().InteractEntity.Priority;
      return e.GetInteractController().InteractEntity.Priority - t;
    });
    return t;
  }
  GetInteractItemCount() {
    return this.x_i;
  }
  CanAutoPickUp(t) {
    var e;
    return !!t?.Valid && !t.GetComponent(278)?.GetIsDisableOneClickCollection() && !!(e = t.GetComponent(209))?.IsPawnInteractive() && (!!t.GetComponent(128)?.IsDropItem() || !!e.IsCollection() || !!e.IsAnimationItem() && !!(e = t.GetComponent(0))?.Valid && !!(t = e.GetPbEntityInitData()) && !!(e = t.ComponentsData) && !e.CollectComponent.Disabled);
  }
  GetOptionInstanceIdByIndex(t) {
    let e = t;
    for (const i of this.R_i) {
      if (i && i.DirectOptionInstanceIds.length > 0) {
        if (e < i.DirectOptionInstanceIds.length) {
          return i.DirectOptionInstanceIds[e];
        }
        e -= i.DirectOptionInstanceIds.length;
      } else {
        e--;
      }
    }
    return -1;
  }
  GetOptionNameByIndex(t) {
    let e = t;
    for (const i of this.R_i) {
      if (i && !i.IsAdvice && i.DirectOptionInstanceIds.length > 0) {
        if (e < i.DirectOptionNames.length) {
          return i.DirectOptionNames[e];
        }
        e -= i.DirectOptionNames.length;
      } else {
        e--;
      }
    }
  }
  GetConditionIconPath(t) {
    let e = t;
    for (const i of this.R_i) {
      if (i && !i.IsAdvice && i.DirectOptionInstanceIds.length > 0) {
        if (e < i.DirectOptionConditionIcon.length) {
          return i.DirectOptionConditionIcon[e];
        }
        e -= i.DirectOptionConditionIcon.length;
      } else {
        e--;
      }
    }
  }
  GetToggleGray(t) {
    let e = t;
    for (const i of this.R_i) {
      if (i && !i.IsAdvice && i.DirectOptionInstanceIds.length > 0) {
        if (e < i.DirectOptionGray.length) {
          return i.DirectOptionGray[e];
        }
        e -= i.DirectOptionGray.length;
      } else {
        e--;
      }
    }
    return false;
  }
  GetCommonExitOption() {
    if (!this.I_i) {
      this.w_i();
    }
    return this.I_i;
  }
  EnterInteractCd(t = DEFAULT_CD) {
    this.T_i = TimeUtil_1.TimeUtil.GetServerTime() + t;
  }
  InInteractCd() {
    return this.T_i > TimeUtil_1.TimeUtil.GetServerTime();
  }
  HandleInteractionHint(e, i, t = undefined) {
    if (e) {
      if (this.D_i.includes(i)) {
        if (TsInteractionUtils_1.TsInteractionUtils.IsInteractHintViewOpened()) {
          return;
        }
      } else {
        this.D_i.push(i);
        this.R_i.push(t);
      }
      if (TsInteractionUtils_1.TsInteractionUtils.IsInteractHintViewOpened()) {
        if (this.D_i.length > 0) {
          TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView();
        }
      } else {
        TsInteractionUtils_1.TsInteractionUtils.OpenInteractHintView();
      }
    } else {
      e = this.D_i.indexOf(i);
      if (e > -1) {
        this.D_i.splice(e, 1);
        this.R_i.splice(e, 1);
        let t = undefined;
        for (const r of this.U_i) {
          if (r[1].EntityId === i) {
            t = r[0];
            break;
          }
        }
        if (t) {
          this.U_i.delete(t);
        }
        if (this.D_i.length > 0) {
          TsInteractionUtils_1.TsInteractionUtils.UpdateInteractHintView();
        } else {
          TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView();
        }
      }
    }
  }
  CheckOptionUniqueness(t, e = undefined, i = -1) {
    var r;
    var o;
    return e.CustomOptionType !== 1 && e.CustomOptionType !== 3 && (!e.IsUniqueness || e.UniequenessType !== IAction_1.EInteractUniqueness.Closest || e.TidContent === "" || i === -1 || !((r = this.U_i.get(e.TidContent)) ? r.CurrentDistance > i && t !== r.EntityId ? ((o = this.D_i.indexOf(r.EntityId)) > -1 && (this.D_i.splice(o, 1), this.R_i.splice(o, 1)), r.EntityId = t, r.CurrentDistance = i, 0) : t !== r.EntityId || (r.CurrentDistance = i, 0) : ((o = new SameTipInteract()).EntityId = t, o.CurrentDistance = i, this.U_i.set(e.TidContent, o), 0)));
  }
  AddInteractOption(t, e, i, r, o) {
    var n = this.GetInteractController(t);
    if (n) {
      if (e = this.GetDynamicConfig(e)) {
        return n.AddDynamicInteractOption(e, i, r, o);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Interaction", 18, "交互选项配置丢失，请确认前后端配置是否一致", ["PbDataId", t.GetComponent(0)?.GetPbDataId()]);
        }
        return -1;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 36, "AddInteractOption failed.InteractController is undefined", ["PbDataId", t.GetComponent(0)?.GetPbDataId()]);
      }
      return -1;
    }
  }
  RemoveInteractOption(t, e) {
    t = this.GetInteractController(t);
    return !!t && t.RemoveDynamicInteractOption(e);
  }
  ChangeOptionText(t, e, i) {
    t = this.GetInteractController(t);
    if (t) {
      t.ChangeOptionText(e, i);
    }
  }
  GetInteractController(t) {
    if (t) {
      t = t.GetComponent(209);
      if (t) {
        return t.GetInteractController();
      }
    }
  }
  SetInteractTarget(t) {
    if (this.CurrentInteractEntityIdInternal !== t) {
      this.CurrentInteractEntityIdInternal = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 36, "切换交互目标", ["entityId", t]);
      }
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
  }
  get CurrentInteractEntityId() {
    return this.CurrentInteractEntityIdInternal;
  }
  SetInterctCreatureDataId(t) {
    this.InterctCreatureDataIdInternal = t;
  }
  get InteractCreatureDataId() {
    return this.InterctCreatureDataIdInternal;
  }
  get InteractCreatureDataLongId() {
    if (this.InterctCreatureDataIdInternal !== undefined) {
      return MathUtils_1.MathUtils.NumberToLong(this.InterctCreatureDataIdInternal);
    }
  }
  get CurrentInteractUeActor() {
    if (this.CurrentInteractEntityIdInternal) {
      var t = EntitySystem_1.EntitySystem.Get(this.CurrentInteractEntityIdInternal);
      if (t) {
        return t.GetComponent(1)?.Owner;
      }
    }
  }
  b_i() {
    var t = (0, puerts_1.$ref)("");
    let e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.InteractOptionConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.InteractOptionConfigPath);
    }
    if (UE.BlueprintPathsLibrary.FileExists(e)) {
      UE.KuroStaticLibrary.LoadFileToString(t, e);
      if (t = (0, puerts_1.$unref)(t)) {
        this.E_i = new Map();
        t = JSON.parse(t);
        if (t) {
          for (const i of t) {
            i.Guid;
            this.E_i.set(i.Guid, i);
          }
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("World", 36, "不存在InteractOption配置文件。", ["Path", e]);
    }
  }
  GetDynamicConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.E_i ||= new Map();
      if (!this.E_i.get(t)) {
        var e = ConfigManager_1.ConfigManager.InteractOptionConfig.GetInteractionConfig(t);
        if (!e) {
          return;
        }
        var i = {
          Guid: e.Guid,
          Type: JSON.parse(e.Type),
          Icon: e.Icon || undefined,
          TidContent: e.TidContent !== "" ? e.TidContent : undefined,
          Condition: undefined,
          UniquenessTest: e.UniquenessTest !== "" ? e.UniquenessTest : undefined,
          DoIntactType: e.DoIntactType !== "" ? e.DoIntactType : undefined,
          Range: e.Range || undefined,
          Duration: undefined,
          OptionLockTypeList: e.OptionLockTypeList ? JSON.parse(e.OptionLockTypeList) : undefined
        };
        if (e.Condition && e.Condition !== "") {
          i.Condition = JSON.parse(e.Condition);
        }
        if (e.Duration && e.Duration !== "") {
          i.Duration = JSON.parse(e.Duration);
        }
        this.E_i.set(t, i);
      }
    } else if (!this.S_i) {
      this.b_i();
      this.S_i = true;
    }
    return this.E_i.get(t);
  }
  SetInteractionHintDisable(t) {
    if (this.L_i = t) {
      TsInteractionUtils_1.TsInteractionUtils.CloseInteractHintView();
    }
  }
  get IsHideInteractHint() {
    return this.L_i;
  }
  LockInteraction(t, e) {
    t = t?.GetComponent(209);
    if (t && t.Valid) {
      t.SetServerLockInteract(e, "Interacting Notify");
    }
  }
  GetInteractEntityIds() {
    return this.D_i;
  }
  LockInteract(t) {
    if (ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 36, "交互锁定状态不支持多重锁定，请做到配置成对");
      }
    } else {
      this.LockInteractionEntity = t;
      (t = []).push(12);
      t.push(18);
      t.push(19);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(1, t);
    }
  }
  RecoverInteractFromLock() {
    var t;
    if (this.LockInteractionEntity) {
      t = EntitySystem_1.EntitySystem.GetComponent(this.LockInteractionEntity, 209);
      this.LockInteractionEntity = undefined;
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
      t?.AfterUnlockInteractionEntity();
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
  }
};
__decorate([(0, Descriptors_1.CSharpDataUid)()], InteractionModel.prototype, "uid", undefined);
__decorate([(0, Descriptors_1.CSharpField)("CurrentInteractEntityId")], InteractionModel.prototype, "CurrentInteractEntityIdInternal", undefined);
__decorate([(0, Descriptors_1.CSharpField)("InteractCreatureDataId")], InteractionModel.prototype, "InterctCreatureDataIdInternal", undefined);
InteractionModel = __decorate([(0, Descriptors_1.CSharpDataProxy)("CSharpScript.Game.Module.Interaction", "InteractionCrossData")], InteractionModel);
exports.InteractionModel = InteractionModel; //# sourceMappingURL=InteractionModel.js.map