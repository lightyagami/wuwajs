"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorInfoView = exports.initClassifyItem = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const MotionController_1 = require("../../Motion/MotionController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleController_1 = require("../RoleController");
const RoleFavorBaseInfoComponent_1 = require("./RoleFavorBaseInfoComponent");
const RoleFavorClassifyItem_1 = require("./RoleFavorClassifyItem");
const RoleFavorDefine_1 = require("./RoleFavorDefine");
const RoleFavorDescComponent_1 = require("./RoleFavorDescComponent");
const RoleFavorLockComponent_1 = require("./RoleFavorLockComponent");
const RoleFavorPowerInfoComponent_1 = require("./RoleFavorPowerInfoComponent");
const RoleFavorPreciousItemComponent_1 = require("./RoleFavorPreciousItemComponent");
const RoleFavorUtil_1 = require("./RoleFavorUtil");
const initClassifyItem = (e, i, t) => {
  return {
    Key: t,
    Value: new RoleFavorClassifyItem_1.RoleFavorClassifyItem(e, i)
  };
};
exports.initClassifyItem = initClassifyItem;
class RoleFavorInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.k_o = undefined;
    this.d_o = [];
    this.F_o = [];
    this.V_o = undefined;
    this.H_o = undefined;
    this.j_o = undefined;
    this.W_o = undefined;
    this.$Zt = 1;
    this.K_o = undefined;
    this.Q_o = undefined;
    this.X_o = undefined;
    this.$_o = undefined;
    this.Y_o = undefined;
    this.J_o = new AudioController_1.PlayResult();
    this.z_o = () => {
      this.GetItem(5).SetUIActive(false);
      this.GetItem(6).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
      this.GetItem(8).SetUIActive(false);
      this.GetItem(9).SetUIActive(false);
    };
    this.Z_o = () => {
      var i = this.F_o.length;
      for (let e = 0; e < i; e++) {
        var t = this.F_o[e];
        if (RoleFavorUtil_1.RoleFavorUtil.IsSameContentItemData(this.V_o, t.ContentItemData)) {
          t.SetToggleState(1);
          t.SetButtonActive(true);
          this.H_o = t;
        } else {
          t.SetToggleState(0);
          t.SetButtonActive(false);
        }
      }
    };
    this.I5t = () => {
      var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      if (e) {
        RoleController_1.RoleController.SetRoleMorphType(e, 0);
      }
      this.CloseMe();
    };
    this.bl = () => {
      this.RDt();
      this.euo();
      this.ClearVerticalLayout();
      this.k_o = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(1), exports.initClassifyItem);
      this.k_o.RebuildLayoutByDataNew(this.d_o);
      this.tuo();
      this.z_o();
      this.Z_o();
      if (this.V_o) {
        this.ShowItemByData(this.V_o);
      } else {
        this.ShowDefaultItem();
      }
    };
    this.RDt = () => {
      let e = undefined;
      var i = this.GetText(3);
      switch (this.V_o.FavorTabType) {
        case 2:
          e = "FavorAction";
          break;
        case 1:
          e = "FavorExperience";
          break;
        case 3:
          e = "FavorPreciousItem";
          break;
        case 0:
          e = "FavorVoice";
      }
      LguiUtil_1.LguiUtil.SetLocalText(i, e);
    };
    this.euo = () => {
      switch (this.V_o.FavorTabType) {
        case 2:
          this.d_o = this.iuo();
          break;
        case 1:
          this.d_o = this.ouo();
          break;
        case 3:
          this.d_o = this.ruo();
          break;
        case 0:
          this.d_o = this.nuo();
      }
    };
    this.iuo = () => {
      var e = [];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.V_o.RoleId).GetRoleId();
      var t = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(i, 1);
      var o = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(i, 2);
      if (t && t.length > 0) {
        t = new RoleFavorDefine_1.ClassifyItemData("FavorIdleAction", 2, i, 1);
        e.push(t);
      }
      if (o && o.length > 0) {
        t = new RoleFavorDefine_1.ClassifyItemData("FavorFightAction", 2, i, 2);
        e.push(t);
      }
      return e;
    };
    this.ouo = () => {
      var e = [];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.V_o.RoleId).GetRoleId();
      var t = new RoleFavorDefine_1.ClassifyItemData("FavorRoleInfo", 1, i, 1);
      var i = new RoleFavorDefine_1.ClassifyItemData("FavorRoleStory", 1, i, 3);
      e.push(t, i);
      return e;
    };
    this.ruo = () => {
      var e = [];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.V_o.RoleId).GetRoleId();
      var i = new RoleFavorDefine_1.ClassifyItemData("FavorPreciousItem", 3, i, undefined);
      e.push(i);
      return e;
    };
    this.nuo = () => {
      var e = [];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.V_o.RoleId).GetRoleId();
      var t = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(i, 1);
      var o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(i, 2);
      if (t && t.length > 0) {
        t = new RoleFavorDefine_1.ClassifyItemData("FavorNatureVoice", 0, i, 1);
        e.push(t);
      }
      if (o && o.length > 0) {
        t = new RoleFavorDefine_1.ClassifyItemData("FavorFightVoice", 0, i, 2);
        e.push(t);
      }
      return e;
    };
    this.tuo = () => {
      for (const e of this.k_o.GetLayoutItemList()) {
        for (const i of e.ContentGenericLayout.GetLayoutItemList()) {
          i.SetToggleFunction(this.j5e);
          i.SetButtonFunction(this.Gke);
          this.F_o.push(i);
        }
      }
    };
    this.j5e = (e, i, t) => {
      if (e) {
        this.z_o();
        this.V_o = i;
        this.j_o = this.H_o;
        this.Z_o();
        this.OnToggleClick(t, this.V_o);
      }
    };
    this.Gke = (e, i) => {
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.V_o.RoleId);
      var o = t.GetFavorData();
      let r = 0;
      r = e.FavorTabType === 2 ? (t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(t.GetRoleId(), e.Config.Id), Number(t)) : o.GetFavorItemState(e.Config.Id, e.FavorTabType);
      if (!!RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(e) || r === 2) {
        if (e.FavorTabType === 0) {
          this.PlayVoice(i);
        } else if (e.FavorTabType === 2) {
          this.suo(i);
        }
      }
    };
    this.t51 = (i, e) => {
      this.W_o = e.Voice;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Role", 43, "播放当前点击的语音", ["this.VoicePath", this.W_o]);
      }
      if (this.W_o === "") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 43, "配置的语音路径为空", ["this.VoicePath", this.W_o]);
        }
      } else {
        const t = this.W_o;
        const o = this.J_o;
        const r = this.$Zt;
        AudioController_1.AudioController.LoadAndAddCallback(this.W_o, function e() {
          i.StartPlay();
          AudioController_1.AudioController.PostEventByUi(t, o, r, i.CloseAudioDelegate);
        }, this.J_o);
      }
    };
    this.i51 = (t, e) => {
      ResourceSystem_1.ResourceSystem.LoadAsync(e.AniMontage, UE.AnimMontage, e => {
        var i;
        if (e?.IsValid() && (i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()) && (i = i.Model, UiModelUtil_1.UiModelUtil.SetVisible(i, true), i = i.CheckGetComponent(1)?.MainMeshComponent)) {
          t.StartPlay();
          (i = i.GetAnimInstance().GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE)).Montage_Play(e);
          i.OnMontageEnded.Add(t.OnMontageCompleted);
        }
      });
    };
    this.auo = (e, i) => {
      if (e === this.V_o.RoleId) {
        for (const t of this.F_o) {
          if (t.ContentItemData.Config.Id === i) {
            t.Refresh();
            this.j5e(true, t.ContentItemData, t);
          }
        }
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("30001");
      }
    };
    this.l7i = e => {
      if (e.ToHandleData.ViewName === "RoleFavorInfoView") {
        this.GetItem(13).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIDraggableComponent], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem]];
    this.BtnBindInfo = [[0, this.I5t]];
  }
  OnStart() {
    this.V_o = this.OpenParam;
    UiSceneManager_1.UiSceneManager.SetSceneFloorReflection(true, true);
    this.bl();
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
  OnBeforeShow() {
    this.GetItem(13).SetUIActive(true);
    if (this.V_o && this.V_o.FavorTabType === 3) {
      UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
    }
  }
  OnAfterHide() {
    if (this.V_o && this.V_o.FavorTabType === 3) {
      UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    }
  }
  ClearVerticalLayout() {
    if (this.k_o) {
      this.k_o.ClearChildren();
      this.k_o = undefined;
    }
  }
  OnBeforeDestroy() {
    if (this.K_o) {
      this.K_o.Destroy();
      this.K_o = undefined;
    }
    if (this.Q_o) {
      this.Q_o.Destroy();
      this.Q_o = undefined;
    }
    if (this.X_o) {
      this.X_o.Destroy();
      this.X_o = undefined;
    }
    if (this.$_o) {
      this.$_o.Destroy();
      this.$_o = undefined;
    }
    if (this.Y_o) {
      this.Y_o.Destroy();
      this.Y_o = undefined;
    }
    this.ClearVerticalLayout();
    this.d_o = [];
    this.V_o = undefined;
    AudioController_1.AudioController.StopEvent(this.J_o);
  }
  OnToggleClick(e, i) {
    var t = this.GetItemState(i);
    if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(i) || t === 2) {
      switch (i.FavorTabType) {
        case 2:
          this.ShowActionItem();
          this.suo(e);
          break;
        case 1:
          this.ShowExperienceItem();
          break;
        case 3:
          this.ShowPreciousItem();
          break;
        case 0:
          this.ShowVoiceItem();
          this.PlayVoice(e);
      }
    } else {
      this.HandleLockItemData();
    }
  }
  HandleLockItemData() {
    var e = this.V_o.Config.Id;
    var i = this.V_o.FavorTabType;
    let t = undefined;
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.V_o.RoleId);
    var r = o.GetFavorData();
    if (i === 1) {
      t = Protocol_1.Aki.Protocol.l6s.Proto_Story;
    } else {
      if (i === 2) {
        if (this.j_o) {
          this.ClearRoleMontage(this.j_o);
        }
        s = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(o.GetRoleId(), e);
        if ((s = Number(s)) === 1) {
          MotionController_1.MotionController.RequestUnlockMotion(o.GetRoleId(), e);
        } else if (s === 0) {
          this.ShowLockItem();
        }
        return;
      }
      if (i === 3) {
        t = Protocol_1.Aki.Protocol.l6s.Proto_Goods;
      } else if (i === 0 && (t = Protocol_1.Aki.Protocol.l6s.m8n, this.j_o)) {
        this.ClearAudio(this.j_o);
      }
    }
    var s = r.GetFavorItemState(this.V_o.Config.Id, i);
    if (s === 1) {
      RoleController_1.RoleController.SendRoleFavorUnLockRequest(t, o.GetRoleId(), e);
    } else if (s === 0) {
      this.ShowLockItem();
    }
  }
  ClearAudio(e) {
    AudioController_1.AudioController.StopEvent(this.J_o);
    e.EndPlay();
  }
  ClearRoleMontage(e) {
    var i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (i && (i = i.Model, UiModelUtil_1.UiModelUtil.SetVisible(i, true), i = i.CheckGetComponent(1)?.MainMeshComponent)) {
      (i = i.GetAnimInstance().GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE)).StopSlotAnimation();
      if (e.OnMontageCompleted) {
        i.OnMontageEnded.Remove(e.OnMontageCompleted);
      }
      e.EndPlay();
    }
  }
  ShowDefaultItem() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.V_o.RoleId).GetRoleId();
    var i = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(e);
    var e = new RoleFavorDefine_1.ContentItemData(1, e, i, 1);
    this.ShowItemByData(e);
  }
  GetItemState(e) {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.V_o.RoleId);
    var t = i.GetFavorData();
    let o = 0;
    return o = e.FavorTabType === 2 ? (i = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(i.GetRoleId(), e.Config.Id), Number(i)) : t.GetFavorItemState(e.Config.Id, e.FavorTabType);
  }
  ShowItemByData(e) {
    this.z_o();
    var i = this.GetItemState(e);
    if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(e) || i === 2) {
      switch (e.FavorTabType) {
        case 2:
          this.ShowActionItem();
          break;
        case 1:
          this.ShowExperienceItem();
          break;
        case 3:
          this.ShowPreciousItem();
          break;
        case 0:
          this.ShowVoiceItem();
      }
    } else {
      this.HandleLockItemData();
    }
  }
  ShowActionItem() {
    var e = this.GetItem(6);
    e.SetUIActive(true);
    this.GetItem(12)?.SetUIActive(false);
    var i = this.V_o.Config;
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title);
    let o = StringUtils_1.EMPTY_STRING;
    if (i.Content !== StringUtils_1.EMPTY_STRING) {
      o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Content);
    }
    i = new RoleFavorDefine_1.RoleFavorDescComponentData(t, o);
    this.K_o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, i);
  }
  ShowExperienceItem() {
    this.GetItem(12)?.SetUIActive(false);
    var e = this.V_o.TypeParam;
    if (e === 1) {
      this.ShowBaseInfoItem();
    } else if (e === 2) {
      this.ShowRolePowerFileItem();
    } else if (e === 3) {
      this.ShowRoleExperienceItem();
    }
  }
  ShowBaseInfoItem() {
    var e = this.GetItem(7);
    e.SetUIActive(true);
    this.Q_o = new RoleFavorBaseInfoComponent_1.RoleFavorBaseInfoComponent(e, this.V_o.RoleId);
  }
  ShowRolePowerFileItem() {
    var e = this.GetItem(8);
    e.SetUIActive(true);
    this.X_o = new RoleFavorPowerInfoComponent_1.RoleFavorPowerInfoComponent(e, this.V_o.Config);
  }
  ShowRoleExperienceItem() {
    var e = this.GetItem(6);
    e.SetUIActive(true);
    var i = this.V_o.Config;
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title);
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Content);
    var t = new RoleFavorDefine_1.RoleFavorDescComponentData(t, i);
    this.K_o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, t);
  }
  ShowPreciousItem() {
    this.GetItem(12)?.SetUIActive(false);
    var e = this.GetItem(9);
    e.SetUIActive(true);
    var i = this.GetItem(6);
    i.SetUIActive(true);
    var t = this.V_o.Config;
    var o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title);
    var r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Content);
    var o = new RoleFavorDefine_1.RoleFavorDescComponentData(o, r);
    this.K_o = new RoleFavorDescComponent_1.RoleFavorDescComponent(i, o);
    this.$_o = new RoleFavorPreciousItemComponent_1.RoleFavorPreciousItemComponent(e, t, false);
  }
  ShowVoiceItem() {
    var e = this.GetItem(6);
    e.SetUIActive(true);
    var i = this.V_o.Config;
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title);
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Content);
    var o = RoleFavorUtil_1.RoleFavorUtil.GetCurLanguageCvName(this.V_o.RoleId);
    var r = this.GetText(11);
    var s = this.GetItem(12);
    if (o === StringUtils_1.EMPTY_STRING) {
      s?.SetUIActive(false);
    } else {
      s?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, o);
    }
    var s = new RoleFavorDefine_1.RoleFavorDescComponentData(t, i);
    this.K_o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, s);
  }
  ShowLockItem() {
    this.z_o();
    var e;
    var i = this.GetItem(5);
    i.SetUIActive(true);
    if (this.Y_o) {
      this.Y_o.Refresh(this.V_o);
    } else {
      this.Y_o = new RoleFavorLockComponent_1.RoleFavorLockComponent(i, this.V_o);
    }
    if (this.V_o.FavorTabType === 3) {
      i = this.V_o.Config;
      (e = this.GetItem(9)).SetUIActive(true);
      if (this.$_o) {
        this.$_o.Refresh(i, true);
      } else {
        this.$_o = new RoleFavorPreciousItemComponent_1.RoleFavorPreciousItemComponent(e, i, true);
      }
    }
  }
  PlayVoice(e) {
    var i;
    var t;
    if (e.GetCurVoiceState() === 0) {
      this.ClearAudio(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Role", 43, "关闭当前选项正在播放的语音");
      }
    } else {
      if (this.j_o && this.j_o.GetCurVoiceState() === 0 && (this.ClearAudio(this.j_o), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Role", 43, "关闭上个选项播放的语音");
      }
      i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION);
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION);
      if (i === undefined || i === 0 || t === undefined || t === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("FavorVolume");
      } else {
        i = this.V_o.Config;
        t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
        RoleController_1.RoleController.SetRoleMorphType(t, i.Morph);
        this.t51(e, i);
      }
    }
  }
  suo(e) {
    var i;
    var t = this.V_o.Config;
    if (e.GetCurVoiceState() === 0) {
      this.ClearRoleMontage(e);
    } else {
      if (this.j_o && this.j_o.GetCurVoiceState() === 0) {
        this.ClearRoleMontage(this.j_o);
      }
      i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      RoleController_1.RoleController.SetRoleMorphType(i, t.Morph);
      this.i51(e, t);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnLockRoleFavorItem, this.auo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayCameraAnimationFinish, this.l7i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnLockRoleFavorItem, this.auo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayCameraAnimationFinish, this.l7i);
  }
}
exports.RoleFavorInfoView = RoleFavorInfoView;
//# sourceMappingURL=RoleFavorInfoView.js.map