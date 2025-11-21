"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorInfoView = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../Core/Common/Log");
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
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleController_1 = require("../RoleController");
const RoleFavorContentDataBase_1 = require("./Data/RoleFavorContentDataBase");
const RoleFavorClassifyItem_1 = require("./RoleFavorClassifyItem");
const RoleFavorDefine_1 = require("./RoleFavorDefine");
const RoleFavorUtil_1 = require("./RoleFavorUtil");
const RoleFavorBaseInfoComponent_1 = require("./View/Component/RoleFavorBaseInfoComponent");
const RoleFavorDescComponent_1 = require("./View/Component/RoleFavorDescComponent");
const RoleFavorLockComponent_1 = require("./View/Component/RoleFavorLockComponent");
const RoleFavorPowerInfoComponent_1 = require("./View/Component/RoleFavorPowerInfoComponent");
const RoleFavorPreciousItemComponent_1 = require("./View/Component/RoleFavorPreciousItemComponent");
class RoleFavorInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.k_o = undefined;
    this.Ccd = [];
    this.F_o = [];
    this.pcd = undefined;
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
    this.dFe = 0;
    this.vcd = 0;
    this.iuo = () => {
      var e = [];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetRoleId();
      var t = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(i, 1);
      var o = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(i, 2);
      if (t && t.length > 0) {
        t = (0, RoleFavorDefine_1.createClassifyData)("FavorIdleAction", 2, i, 1);
        e.push(t);
      }
      if (o && o.length > 0) {
        t = (0, RoleFavorDefine_1.createClassifyData)("FavorFightAction", 2, i, 2);
        e.push(t);
      }
      return e;
    };
    this.ouo = () => {
      var e = [];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetRoleId();
      var t = (0, RoleFavorDefine_1.createClassifyData)("FavorRoleInfo", 1, i, 1);
      var i = (0, RoleFavorDefine_1.createClassifyData)("FavorRoleStory", 1, i, 2);
      e.push(t, i);
      return e;
    };
    this.ruo = () => {
      var e = [];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetRoleId();
      var i = (0, RoleFavorDefine_1.createClassifyData)("FavorPreciousItem", 3, i);
      e.push(i);
      return e;
    };
    this.nuo = () => {
      var e = [];
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetRoleId();
      var t = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(i, 1);
      var o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(i, 2);
      if (t && t.length > 0) {
        t = (0, RoleFavorDefine_1.createClassifyData)("FavorNatureVoice", 0, i, 1);
        e.push(t);
      }
      if (o && o.length > 0) {
        t = (0, RoleFavorDefine_1.createClassifyData)("FavorFightVoice", 0, i, 2);
        e.push(t);
      }
      return e;
    };
    this.ycd = () => {
      let e = undefined;
      var i = this.GetText(3);
      switch (this.pcd.FavorContentType) {
        case 3:
          e = "FavorAction";
          break;
        case 1:
        case 2:
          e = "FavorExperience";
          break;
        case 4:
          e = "FavorPreciousItem";
          break;
        case 0:
          e = "FavorVoice";
      }
      LguiUtil_1.LguiUtil.SetLocalText(i, e);
    };
    this.z_o = () => {
      this.Y_o.SetComponentActive(false);
      this.K_o.SetComponentActive(false);
      this.Q_o.SetComponentActive(false);
      this.X_o.SetComponentActive(false);
      this.$_o.SetComponentActive(false);
    };
    this.Z_o = () => {
      var i = this.F_o.length;
      for (let e = 0; e < i; e++) {
        var t = this.F_o[e];
        var o = t.ContentData?.InstanceId ?? -1;
        if (this.pcd.InstanceId === o) {
          t.SetToggleState(1);
          t.SetButtonActive(true);
          this.H_o = t;
        } else {
          t.SetToggleState(0);
          t.SetButtonActive(false);
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
      }, 100, this.MemoryTag);
    };
    this.euo = () => {
      switch (this.vcd) {
        case 2:
          this.Ccd = this.iuo();
          break;
        case 1:
          this.Ccd = this.ouo();
          break;
        case 3:
          this.Ccd = this.ruo();
          break;
        case 0:
          this.Ccd = this.nuo();
      }
    };
    this.tuo = () => {
      for (const e of this.k_o.GetLayoutItemList()) {
        for (const i of e.GetContentItemList()) {
          i.BindToggleFunction(this.Scd);
          i.BindButtonFunction(this.Mcd);
          this.F_o.push(i);
        }
      }
    };
    this.Scd = (e, i, t) => {
      if (e) {
        this.z_o();
        this.pcd = i;
        this.j_o = this.H_o;
        this.Z_o();
        this.OnContentItemToggleClick(t, this.pcd);
      }
    };
    this.Mcd = (e, i) => {
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
      var o = t.GetFavorData();
      let r = 0;
      r = e.FavorContentType === 3 ? (t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(t.GetRoleId(), e.ConfigId), Number(t)) : o.GetFavorItemState(e.ConfigId, e.FavorContentType);
      if (e.FavorContentType === 1 || r === 2) {
        if ((t = this.Ecd[e.FavorContentType])?.PlayContent) {
          t.PlayContent(e, i);
        }
      }
    };
    this.Icd = () => {
      return new RoleFavorClassifyItem_1.RoleFavorClassifyItem();
    };
    this.auo = (e, i) => {
      if (e === this.dFe) {
        for (const t of this.F_o) {
          if (t.ContentData.ConfigId === i) {
            t.RefreshContentItem();
            this.Scd(true, t.ContentData, t);
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
    this.I5t = () => {
      var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      if (e) {
        RoleController_1.RoleController.SetRoleMorphType(e, 0);
      }
      this.CloseMe();
    };
    this.Ecd = {
      [3]: (0, RoleFavorDefine_1.createContentHandler)(e => {
        this.Tcd(e);
      }, (e, i) => {
        this.suo(e, i);
      }),
      1: (0, RoleFavorDefine_1.createContentHandler)(e => {
        this.bcd(e);
      }),
      2: (0, RoleFavorDefine_1.createContentHandler)(e => {
        this.Rcd(e);
      }),
      4: (0, RoleFavorDefine_1.createContentHandler)(e => {
        this.wcd(e);
      }),
      0: (0, RoleFavorDefine_1.createContentHandler)(e => {
        this.Lcd(e);
      }, (e, i) => {
        this.Pcd(e, i);
      })
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIDraggableComponent], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem]];
    this.BtnBindInfo = [[0, this.I5t]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.dFe = e.RoleId;
    this.vcd = e.FavorTabType;
    UiSceneManager_1.UiSceneManager.SetSceneFloorReflection(true, true);
    var e = [];
    this.Y_o = new RoleFavorLockComponent_1.RoleFavorLockComponent();
    e.push(this.Y_o.CreateByActorAsync(this.GetItem(5).GetOwner()));
    this.K_o = new RoleFavorDescComponent_1.RoleFavorDescComponent();
    e.push(this.K_o.CreateByActorAsync(this.GetItem(6).GetOwner()));
    this.Q_o = new RoleFavorBaseInfoComponent_1.RoleFavorBaseInfoComponent();
    e.push(this.Q_o.CreateByActorAsync(this.GetItem(7).GetOwner()));
    this.X_o = new RoleFavorPowerInfoComponent_1.RoleFavorPowerInfoComponent();
    e.push(this.X_o.CreateByActorAsync(this.GetItem(8).GetOwner()));
    this.$_o = new RoleFavorPreciousItemComponent_1.RoleFavorPreciousItemComponent();
    e.push(this.$_o.CreateByActorAsync(this.GetItem(9).GetOwner()));
    await Promise.all(e);
    this.ClearVerticalLayout();
    this.k_o = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Icd);
    this.euo();
    await this.k_o.RefreshByDataAsync(this.Ccd);
    this.tuo();
    if (this.Ccd.length > 0) {
      this.pcd = this.Ccd[0].GetContentDataByIndex(0);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 78, "好感度分类数据列表为空!", ["角色Id", this.dFe]);
    }
  }
  OnBeforeShow() {
    this.GetItem(13).SetUIActive(true);
    if (this.pcd && this.pcd.FavorContentType === 4) {
      UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
    }
    this.Og();
  }
  OnAfterHide() {
    if (this.pcd && this.pcd.FavorContentType === 4) {
      UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
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
    this.Ccd = [];
    this.pcd = undefined;
    AudioController_1.AudioController.StopEvent(this.J_o);
  }
  Og() {
    this.ycd();
    this.z_o();
    this.Z_o();
    if (this.pcd) {
      this.ShowItemByData(this.pcd);
    } else {
      this.ShowDefaultItem();
    }
  }
  GetItemState(e) {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    var t = i.GetFavorData();
    let o = 0;
    return o = e.FavorContentType === 3 ? (i = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(i.GetRoleId(), e.ConfigId), Number(i)) : t.GetFavorItemState(e.ConfigId, e.FavorContentType);
  }
  D0d(e) {
    var i;
    var t;
    if (e) {
      e = RoleFavorUtil_1.RoleFavorUtil.GetCurLanguageCvName(this.dFe);
      i = this.GetText(11);
      t = this.GetItem(12);
      if (e === StringUtils_1.EMPTY_STRING) {
        t?.SetUIActive(false);
      } else {
        t?.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, e);
      }
    } else {
      this.GetItem(12)?.SetUIActive(false);
    }
  }
  ShowDefaultItem() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetRoleId();
    var e = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(e);
    var e = new RoleFavorContentDataBase_1.RoleFavorRoleInfoContentData(this.dFe, 1, e);
    this.ShowItemByData(e);
  }
  ShowItemByData(e) {
    this.z_o();
    var i = this.GetItemState(e);
    if (e.FavorContentType !== 1 && i !== 2) {
      this.HandleLockItemData();
    } else if (i = this.Ecd[e.FavorContentType]) {
      i.ShowItem(e);
    }
  }
  HandleLockItemData() {
    var e = this.pcd.ConfigId;
    var i = this.pcd.FavorContentType;
    let t = undefined;
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    var r = o.GetFavorData();
    if (i === 3) {
      if (this.j_o) {
        this.ClearRoleMontage(this.j_o);
      }
      s = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(o.GetRoleId(), e);
      if ((s = Number(s)) === 1) {
        MotionController_1.MotionController.RequestUnlockMotion(o.GetRoleId(), e);
      } else if (s === 0) {
        this.ShowLockItem();
      }
    } else {
      switch (i) {
        case 2:
          t = Protocol_1.Aki.Protocol.l6s.Proto_Story;
          break;
        case 4:
          t = Protocol_1.Aki.Protocol.l6s.Proto_Goods;
          break;
        case 0:
          t = Protocol_1.Aki.Protocol.l6s.m8n;
          if (this.j_o) {
            this.ClearAudio(this.j_o);
          }
      }
      var s = r.GetFavorItemState(this.pcd.ConfigId, i);
      if (s === 1) {
        RoleController_1.RoleController.SendRoleFavorUnLockRequest(t, o.GetRoleId(), e);
      } else if (s === 0) {
        this.ShowLockItem();
      }
    }
  }
  Tcd(e) {
    this.D0d(false);
    this.K_o.SetData(e);
  }
  bcd(e) {
    this.D0d(true);
    var i = e.FavorExperienceSubType;
    if (i === 1) {
      this.Q_o.SetData(e);
    } else if (i === 2) {
      this.X_o.SetData(e);
    }
  }
  Rcd(e) {
    this.K_o.SetData(e);
  }
  wcd(e) {
    this.D0d(false);
    this.K_o.SetData(e);
    this.$_o.SetData(e);
    this.$_o.SetLockState(false);
  }
  Lcd(e) {
    this.D0d(true);
    this.K_o.SetData(e);
  }
  ShowLockItem() {
    var e;
    this.z_o();
    this.Y_o.SetData(this.pcd);
    if (this.pcd?.FavorContentType === 4) {
      e = this.pcd;
      this.$_o.SetData(e);
      this.$_o.SetLockState(true);
    }
  }
  ClearVerticalLayout() {
    if (this.k_o) {
      this.k_o.ClearChildren();
    }
  }
  Pcd(e, i) {
    var t;
    var o;
    if (i.GetCurVoiceState() === 0) {
      this.ClearAudio(i);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Role", 43, "关闭当前选项正在播放的语音");
      }
    } else {
      if (this.j_o && this.j_o.GetCurVoiceState() === 0 && (this.ClearAudio(this.j_o), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Role", 43, "关闭上个选项播放的语音");
      }
      t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.MASTERVOLUMEFUNCTION);
      o = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.VOICEVOLUMEFUNCTION);
      if (t === undefined || t === 0 || o === undefined || o === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("FavorVolume");
      } else {
        t = e.ConfigData;
        o = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
        RoleController_1.RoleController.SetRoleMorphType(o, t.Morph);
        this.t51(i, t);
      }
    }
  }
  suo(e, i) {
    var t;
    var e = e.ConfigData;
    if (i.GetCurVoiceState() === 0) {
      this.ClearRoleMontage(i);
    } else {
      if (this.j_o && this.j_o.GetCurVoiceState() === 0) {
        this.ClearRoleMontage(this.j_o);
      }
      t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      RoleController_1.RoleController.SetRoleMorphType(t, e.Morph);
      this.i51(i, e);
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
  OnContentItemToggleClick(e, i) {
    var t = this.GetItemState(i);
    if (i.FavorContentType !== 1 && t !== 2) {
      this.HandleLockItemData();
    } else if ((t = this.Ecd[i.FavorContentType]) && (t.ShowItem(i), t.PlayContent)) {
      t.PlayContent(i, e);
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
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
  }
}
exports.RoleFavorInfoView = RoleFavorInfoView;
//# sourceMappingURL=RoleFavorInfoView.js.map