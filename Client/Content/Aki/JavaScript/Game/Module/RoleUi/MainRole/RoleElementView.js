"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleElementView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const MainRoleController_1 = require("../MainRoleController");
const RoleController_1 = require("../RoleController");
const RoleElementItem_1 = require("./RoleElementItem");
class RoleElementView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.kGe = undefined;
    this.ypt = undefined;
    this.nVi = 0;
    this.d1o = undefined;
    this.g1o = 0;
    this.f1o = 0;
    this.p1o = false;
    this.dVi = undefined;
    this.sGe = () => {
      var e = new RoleElementItem_1.RoleElementItem();
      e.SetRoleViewAgent(this.d1o);
      e.OnToggleCallback = this.OnToggleClick;
      e.CanToggleChange = this.Bpt;
      return e;
    };
    this.OnToggleClick = e => {
      this.v1o(e);
      RoleController_1.RoleController.PlayRoleMontage(19);
      if (this.g1o) {
        this.M1o();
      }
    };
    this.Bpt = e => e !== this.kGe.GetGenericLayout().GetSelectedGridIndex();
    this.OnClickClose = () => {
      this.CloseMe();
    };
    this.OnClickSwitch = () => {
      var e;
      if (Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(217)?.HasTag(1996802261)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("CanNotTransferInFight"));
      } else if (this.nVi && (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.nVi))) {
        MainRoleController_1.MainRoleController.SendRoleElementChangeRequest(e.ElementId);
      }
    };
    this.Y2e = e => {
      this.p1o = true;
      UiLayer_1.UiLayer.SetShowMaskLayer("RoleElementView", true);
      this.d1o.SetCurSelectRoleId(e);
      this.d1o.CheckMainRoleToIdList(e);
      var t = this.d1o.GetCurSelectRoleData();
      this.dVi?.Model?.CheckGetComponent(13)?.SetRoleDataId(e, t.GetRoleSkinId());
      this.E1o(e);
      for (const i of this.kGe.GetScrollItemList()) {
        i.RefreshState();
      }
      this.Svt();
    };
    this.S1o = e => {
      if (e) {
        this.M1o();
      } else {
        this.HideElementPreviewEffect();
      }
    };
    this.y1o = () => {
      UiLayer_1.UiLayer.SetShowMaskLayer("RoleElementView", false);
      this.p1o = false;
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ElementTransferSuccess");
    };
    this.M1o = () => {
      var e;
      if (!this.p1o) {
        e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.nVi);
        this.ShowElementPreviewEffectById(e.ElementId);
      }
    };
    this.I1o = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.OnClickClose], [2, this.OnClickSwitch]];
  }
  async OnBeforeStartAsync() {
    this.d1o = this.OpenParam;
    if (this.d1o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleElementView"]);
      }
    } else {
      this.dVi = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      this.kGe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.sGe);
      await this.RefreshAsync();
      RoleController_1.RoleController.PlayRoleMontage(20);
    }
  }
  async RefreshAsync() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.Sex;
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(e);
    var i = t.length;
    var r = [];
    for (let e = 0; e < i; e++) {
      var s = t[e];
      if (MainRoleController_1.MainRoleController.IsCanChangeRole(s.Id)) {
        r.push(s);
      }
    }
    this.ypt = r;
    await this.kGe.RefreshByDataAsync(r);
    const o = this.d1o.GetCurSelectRoleId();
    e = r.findIndex(e => e.Id === o);
    this.v1o(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect, this.S1o);
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.Y2e);
  }
  v1o(e) {
    var t = this.ypt[e];
    this.nVi = t.Id;
    this.kGe.GetGenericLayout().SelectGridProxy(e);
    this.Svt();
  }
  Svt() {
    var e = this.d1o.GetCurSelectRoleId() === this.nVi;
    this.GetButton(2)?.SetSelfInteractive(!e);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.Y2e);
    this.HideElementPreviewEffect();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowRoleElementChangePreviewEffect, this.S1o);
  }
  E1o(e) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    var t = ConfigManager_1.ConfigManager.ElementInfoConfig?.GetElementInfo(e.ElementId)?.AudioEvent;
    if (t) {
      AudioSystem_1.AudioSystem.PostEvent(t);
    }
    RoleController_1.RoleController.PlayRoleMontage(21);
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleElementSwitchDelayTime();
    this.ShowElementSuccessEffectById(e.ElementId);
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.y1o();
    }, t);
  }
  async T1o(e, i, r, t, s, o) {
    let n = false;
    let a = undefined;
    const h = new CustomPromise_1.CustomPromise();
    if (o) {
      o = new LoadAsyncPromise_1.LoadAsyncPromise(o, UE.Texture);
      a = await o.Promise;
      n = true;
    }
    o = EffectUtil_1.EffectUtil.GetEffectPath(e);
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, t ?? MathUtils_1.MathUtils.DefaultTransformDouble, o, "[RoleAnimStateEffectManager.PlayEffect]", new EffectContext_1.EffectContext(undefined, i), 1, undefined, (e, t) => {
      if (e !== 0) {
        if (s) {
          e = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(s));
          this.L1o(t, e, n, a);
        }
        if (i && r) {
          EffectSystem_1.EffectSystem.GetEffectActor(t)?.K2_AttachToComponent(i, r, 0, 0, 0, false);
        }
        h.SetResult(t);
      }
    }, undefined, false, true);
    return h.Promise;
  }
  L1o(e, t, i, r) {
    var s;
    var e = EffectSystem_1.EffectSystem.GetNiagaraComponent(e);
    if (e instanceof UE.NiagaraComponent) {
      s = e.Asset;
      e.SetAsset(undefined);
      e.SetAsset(s);
    }
    if (e && (e.SetNiagaraVariableLinearColor("Color", t), i)) {
      e.SetKuroNiagaraEmitterCustomTexture("Icon", "Mask", r);
    }
  }
  ShowElementSuccessEffectById(e) {
    var t;
    var i;
    var e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e);
    if (e && (i = (t = this.dVi).Model?.CheckGetComponent(1)?.MainMeshComponent)) {
      this.T1o("AttributeSwitchBodyEffect", t.K2_GetRootComponent(), CharacterNameDefines_1.CharacterNameDefines.ROOT, undefined, e.ElementEffectColor).catch(this.I1o);
      this.T1o("AttributeSwitchHandEffect", i, CharacterNameDefines_1.CharacterNameDefines.ELEMENT_EFFECT_SOCKET_NAME, undefined, e.ElementEffectColor, e.Icon3).catch(this.I1o);
    }
  }
  ShowElementPreviewEffectById(e) {
    e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e);
    if (e) {
      if (this.g1o) {
        const s = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(e.ElementEffectColor));
        ResourceSystem_1.ResourceSystem.LoadAsync(e.Icon3, UE.Texture, e => {
          this.L1o(this.g1o, s, true, e);
        }, 100, this.MemoryTag);
      } else {
        var t = this.dVi;
        var i = new UE.TransformDouble(new UE.Rotator(0, 0, 0), new UE.VectorDouble(0, 0, 0), new UE.VectorDouble(1, 1, 1));
        var t = t.Model?.CheckGetComponent(1);
        this.T1o("AttributePreviewHandEffect", t?.MainMeshComponent, CharacterNameDefines_1.CharacterNameDefines.ELEMENT_EFFECT_SOCKET_NAME, i, e.ElementEffectColor, e.Icon3).then(e => {
          this.g1o = e;
          if (this.IsDestroyOrDestroying) {
            this.HideElementPreviewEffect();
          }
        }, this.I1o);
      }
      try {
        var r = UiSceneManager_1.UiSceneManager.GetActorByTag(CommonParamById_1.configCommonParamById.GetStringConfig("RoleElementPreviewEffectCase"));
        if (!this.f1o) {
          this.T1o("AttributePreviewBodyEffect", undefined, undefined, r.D_GetTransform()).then(e => {
            this.f1o = e;
            if (this.IsDestroyOrDestroying) {
              this.HideElementPreviewEffect();
            }
          }, this.I1o);
        }
      } catch (e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 49, "给角色属性切换预览特效寻找坐标参考case点失败，中断后续流程");
        }
      }
    }
  }
  HideElementPreviewEffect() {
    if (EffectSystem_1.EffectSystem.IsValid(this.g1o)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.g1o, "HideElementPreviewEffect", true, true);
      this.g1o = 0;
    }
    if (this.f1o) {
      EffectSystem_1.EffectSystem.StopEffectById(this.f1o, "HideElementPreviewEffect", true, true);
      this.f1o = 0;
    }
  }
}
exports.RoleElementView = RoleElementView;
//# sourceMappingURL=RoleElementView.js.map