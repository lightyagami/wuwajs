"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaMainView = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhantomArenaMainViewModel_1 = require("./PhantomArenaMainViewModel"),
  PhantomArenaMainViewRoleSpineItem_1 = require("./PhantomArenaMainViewRoleSpineItem"),
  PhantomArenaMainViewSwitchItem_1 = require("./PhantomArenaMainViewSwitchItem"),
  PhantomArenaRootViewBase_1 = require("./PhantomArenaRootViewBase");
class PhantomArenaMainView extends PhantomArenaRootViewBase_1.PhantomArenaRootViewBase {
  constructor() {
    super(...arguments), this.YV1 = void 0, this.CaptionItem = void 0, this.SequencePlayer = void 0, this.RoleSpineMap = new Map, this.CurShowRoleSpine = void 0, this.Luu = (i, t) => {
      this.ViewModel.TextureCardRoleId !== i && (this.ViewModel.TextureCardRoleId = i, this.RefreshRoleTexture(), t) && this.PlayRoleTextureChangeAnim()
    }, this.ShowRoleTexture = i => {
      this.ViewModel.RoleTextureActive || this.ViewModel.TextureCardRoleId <= 0 || (this.ViewModel.RoleTextureActive = !0, this.SetRoleTextureUiActive(!0), i && (this.SequencePlayer.CheckSeqActorIsSeqPlaying(i = "RoleShow") ? this.SequencePlayer.ReplaySequenceByKey(i) : this.SequencePlayer.PlaySequencePurely(i)))
    }, this.PlayRoleTextureChangeAnim = () => {
      var i = "RoleShow";
      this.SequencePlayer.CheckSeqActorIsSeqPlaying(i) ? this.SequencePlayer.ReplaySequenceByKey(i) : this.SequencePlayer.PlaySequencePurely(i)
    }, this.PlayRoleTextureShowAnim = () => {
      var i = "RoleShow";
      this.SequencePlayer.CheckSeqActorIsSeqPlaying(i) ? this.SequencePlayer.ReplaySequenceByKey(i) : this.SequencePlayer.PlaySequencePurely(i)
    }, this.HideRoleTexture = i => {
      this.ViewModel.RoleTextureActive && (this.ViewModel.RoleTextureActive = !1, i) && (this.SequencePlayer.CheckSeqActorIsSeqPlaying(i = "RoleHide") ? this.SequencePlayer.ReplaySequenceByKey(i) : this.SequencePlayer.PlaySequencePurely(i))
    }, this.RefreshRoleTexture = () => {
      var i = new UiAsyncTask_1.UiAsyncTask("PhantomArenaMainView", async () => {
        await this.RefreshRoleTextureAsync()
      });
      this.RunAsyncTask(i)
    }, this.RefreshRoleTextureAsync = async () => {
      var t = this.ViewModel.TextureCardRoleId;
      if (!(t <= 0)) {
        var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t);
        e.LightTextureColor && this.GetTexture(2).SetColor(UE.Color.FromHex(e.LightTextureColor));
        let i = this.RoleSpineMap.get(t);
        if (!i) {
          e = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(e.RoleSpinePrefabPath, this.GetItem(6));
          if (!e || !e.IsValid()) return;
          (i = this.RoleSpineMap.get(t)) || (i = new PhantomArenaMainViewRoleSpineItem_1.PhantomArenaMainViewRoleSpineItem, this.RoleSpineMap.set(t, i), e.GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(!1), await i.CreateByActorAsync(e), await TimerSystem_1.TimerSystem.Wait(100))
        }
        t === this.ViewModel.TextureCardRoleId ? this.vmu(t) : i?.GetRootItem().SetUIActive(!1)
      }
    }, this.vmu = i => {
      this.CurShowRoleSpine && this.CurShowRoleSpine.GetRootItem().SetUIActive(!1);
      i = this.RoleSpineMap.get(i);
      i && (i.GetRootItem().SetUIActive(!0), this.CurShowRoleSpine = i)
    }, this.wuu = i => {}, this.Wou = i => {
      "RoleHide" === i && this.SetRoleTextureUiActive(!1)
    }, this.B6e = () => {
      var i = this.ViewModel.GetOverrideCloseFunc();
      i ? i() : this.Back()
    }, this.GetSwitchItem = () => this.YV1, this.SetViewTitle = i => {
      this.CaptionItem.SetTitleLocalText(i)
    }, this.SetViewIcon = i => {
      this.CaptionItem.SetTitleIconByResourceId(i)
    }, this.SetViewHelpId = i => {
      this.CaptionItem.SetHelpCallBack(() => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(i)
      })
    }, this.SetViewHelpBtnActive = i => {
      this.CaptionItem.SetHelpBtnActive(i)
    }, this.Wbt = (i, t) => {
      var e = this.GetCurChildView();
      e.ViewName === t.DynamicTabName && i.ViewData.SetAttachedView(e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIItem]
    ]
  }
  OnRegisterViewData() {
    var i = this.OpenParam;
    this.ViewModel = new PhantomArenaMainViewModel_1.PhantomArenaMainViewModel, this.ViewModel.Init(i.ChallengeId), this.ViewModel.SetGetSwitchItemFunc(this.GetSwitchItem), this.ViewModel.RefreshRoleTexture = this.RefreshRoleTexture, this.ViewModel.ChangeRoleTexture = this.Luu, this.ViewModel.ShowRoleTexture = this.ShowRoleTexture, this.ViewModel.HideRoleTexture = this.HideRoleTexture, this.ViewModel.PlayRoleTextureShowAnim = this.PlayRoleTextureShowAnim, this.ViewModel.SetViewTitle = this.SetViewTitle, this.ViewModel.SetViewIcon = this.SetViewIcon, this.ViewModel.SetViewHelpId = this.SetViewHelpId, this.ViewModel.SetViewHelpBtnActive = this.SetViewHelpBtnActive
  }
  OnAddEventListener() {
    super.OnAddEventListener(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this.Wbt)
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this.Wbt)
  }
  OnRegisterDefaultChildView() {
    var i = this.OpenParam;
    this.DefaultChildViewName = i.OpenView
  }
  OnRegisterContentItem() {
    this.ContentItem = this.GetItem(1)
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.YV1 = new PhantomArenaMainViewSwitchItem_1.PhantomArenaMainViewSwitchItem, this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem, this.CaptionItem.SetCloseCallBack(this.B6e), this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem()), this.SequencePlayer.BindSequenceStartEvent(this.wuu), this.SequencePlayer.BindSequenceCloseEvent(this.Wou), await Promise.all([this.YV1.CreateByActorAsync(this.GetItem(3).GetOwner()), this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())])
  }
  SetRoleTextureUiActive(i) {
    this.GetTexture(2).SetUIActive(i), this.GetItem(6).SetUIActive(i)
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i && !(i.length <= 0)) return "SwitchItem" === i[0] ? this.GetSwitchItem()?.GetGuideUiItemAndUiItemForShowEx(i) : this.GetCurChildView().GetGuideUiItemAndUiItemForShowEx(i)
  }
}
exports.PhantomArenaMainView = PhantomArenaMainView;
//# sourceMappingURL=PhantomArenaMainView.js.map