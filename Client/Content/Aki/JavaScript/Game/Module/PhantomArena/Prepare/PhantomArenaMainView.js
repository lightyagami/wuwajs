"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMainView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhantomArenaMainViewModel_1 = require("./PhantomArenaMainViewModel");
const PhantomArenaMainViewRoleSpineItem_1 = require("./PhantomArenaMainViewRoleSpineItem");
const PhantomArenaMainViewSwitchItem_1 = require("./PhantomArenaMainViewSwitchItem");
const PhantomArenaRootViewBase_1 = require("./PhantomArenaRootViewBase");
class PhantomArenaMainView extends PhantomArenaRootViewBase_1.PhantomArenaRootViewBase {
  constructor() {
    super(...arguments);
    this.R61 = undefined;
    this.CaptionItem = undefined;
    this.SequencePlayer = undefined;
    this.RoleSpineMap = new Map();
    this.CurShowRoleSpine = undefined;
    this.k7c = (i, t) => {
      if (this.ViewModel.TextureCardRoleId !== i && (this.ViewModel.TextureCardRoleId = i, this.RefreshRoleTexture(), t)) {
        this.PlayRoleTextureChangeAnim();
      }
    };
    this.ShowRoleTexture = i => {
      if (!this.ViewModel.RoleTextureActive && !(this.ViewModel.TextureCardRoleId <= 0)) {
        this.ViewModel.RoleTextureActive = true;
        this.SetRoleTextureUiActive(true);
        if (i) {
          if (this.SequencePlayer.CheckSeqActorIsSeqPlaying(i = "RoleShow")) {
            this.SequencePlayer.ReplaySequenceByKey(i);
          } else {
            this.SequencePlayer.PlaySequencePurely(i);
          }
        }
      }
    };
    this.PlayRoleTextureChangeAnim = () => {
      var i = "RoleShow";
      if (this.SequencePlayer.CheckSeqActorIsSeqPlaying(i)) {
        this.SequencePlayer.ReplaySequenceByKey(i);
      } else {
        this.SequencePlayer.PlaySequencePurely(i);
      }
    };
    this.PlayRoleTextureShowAnim = () => {
      var i = "RoleShow";
      if (this.SequencePlayer.CheckSeqActorIsSeqPlaying(i)) {
        this.SequencePlayer.ReplaySequenceByKey(i);
      } else {
        this.SequencePlayer.PlaySequencePurely(i);
      }
    };
    this.HideRoleTexture = i => {
      if (this.ViewModel.RoleTextureActive && (this.ViewModel.RoleTextureActive = false, i)) {
        if (this.SequencePlayer.CheckSeqActorIsSeqPlaying(i = "RoleHide")) {
          this.SequencePlayer.ReplaySequenceByKey(i);
        } else {
          this.SequencePlayer.PlaySequencePurely(i);
        }
      }
    };
    this.RefreshRoleTexture = () => {
      var i = new UiAsyncTask_1.UiAsyncTask("PhantomArenaMainView", async () => {
        await this.RefreshRoleTextureAsync();
      });
      this.RunAsyncTask(i);
    };
    this.RefreshRoleTextureAsync = async () => {
      var t = this.ViewModel.TextureCardRoleId;
      if (!(t <= 0)) {
        var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t);
        if (e.LightTextureColor) {
          this.GetTexture(2).SetColor(UE.Color.FromHex(e.LightTextureColor));
        }
        let i = this.RoleSpineMap.get(t);
        if (!i) {
          e = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(e.RoleSpinePrefabPath, this.GetItem(6));
          if (!e || !e.IsValid()) {
            return;
          }
          if (!(i = this.RoleSpineMap.get(t))) {
            i = new PhantomArenaMainViewRoleSpineItem_1.PhantomArenaMainViewRoleSpineItem();
            this.RoleSpineMap.set(t, i);
            e.GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(false);
            await i.CreateByActorAsync(e);
            await TimerSystem_1.GameplayTimerSystem.Wait(100);
          }
        }
        if (t === this.ViewModel.TextureCardRoleId) {
          this.yUu(t);
        } else {
          i?.GetRootItem().SetUIActive(false);
        }
      }
    };
    this.yUu = i => {
      if (this.CurShowRoleSpine) {
        this.CurShowRoleSpine.GetRootItem().SetUIActive(false);
      }
      i = this.RoleSpineMap.get(i);
      if (i) {
        i.GetRootItem().SetUIActive(true);
        this.CurShowRoleSpine = i;
      }
    };
    this.O7c = i => {};
    this.Dlu = i => {
      if (i === "RoleHide") {
        this.SetRoleTextureUiActive(false);
      }
    };
    this.B6e = () => {
      var i = this.ViewModel.GetOverrideCloseFunc();
      if (i) {
        i();
      } else {
        this.Back();
      }
    };
    this.GetSwitchItem = () => this.R61;
    this.SetViewTitle = i => {
      this.CaptionItem.SetTitleLocalText(i);
    };
    this.SetViewIcon = i => {
      this.CaptionItem.SetTitleIconByResourceId(i);
    };
    this.SetViewHelpId = i => {
      this.CaptionItem.SetHelpCallBack(() => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(i);
      });
    };
    this.SetViewHelpBtnActive = i => {
      this.CaptionItem.SetHelpBtnActive(i);
    };
    this.Wbt = (i, t) => {
      var e = this.GetCurChildView();
      if (e.ViewName === t.DynamicTabName) {
        i.ViewData.SetAttachedView(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem]];
  }
  OnRegisterViewData() {
    var i = this.OpenParam;
    this.ViewModel = new PhantomArenaMainViewModel_1.PhantomArenaMainViewModel();
    this.ViewModel.Init(i.ChallengeId);
    this.ViewModel.SetGetSwitchItemFunc(this.GetSwitchItem);
    this.ViewModel.RefreshRoleTexture = this.RefreshRoleTexture;
    this.ViewModel.ChangeRoleTexture = this.k7c;
    this.ViewModel.ShowRoleTexture = this.ShowRoleTexture;
    this.ViewModel.HideRoleTexture = this.HideRoleTexture;
    this.ViewModel.PlayRoleTextureShowAnim = this.PlayRoleTextureShowAnim;
    this.ViewModel.SetViewTitle = this.SetViewTitle;
    this.ViewModel.SetViewIcon = this.SetViewIcon;
    this.ViewModel.SetViewHelpId = this.SetViewHelpId;
    this.ViewModel.SetViewHelpBtnActive = this.SetViewHelpBtnActive;
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this.Wbt);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this.Wbt);
  }
  OnRegisterDefaultChildView() {
    var i = this.OpenParam;
    this.DefaultChildViewName = i.OpenView;
  }
  OnRegisterContentItem() {
    this.ContentItem = this.GetItem(1);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.R61 = new PhantomArenaMainViewSwitchItem_1.PhantomArenaMainViewSwitchItem();
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem();
    this.CaptionItem.SetCloseCallBack(this.B6e);
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.SequencePlayer.BindSequenceStartEvent(this.O7c);
    this.SequencePlayer.BindSequenceCloseEvent(this.Dlu);
    await Promise.all([this.R61.CreateByActorAsync(this.GetItem(3).GetOwner()), this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
  }
  SetRoleTextureUiActive(i) {
    this.GetTexture(2).SetUIActive(i);
    this.GetItem(6).SetUIActive(i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i && !(i.length <= 0)) {
      if (i[0] === "SwitchItem") {
        return this.GetSwitchItem()?.GetGuideUiItemAndUiItemForShowEx(i);
      } else {
        return this.GetCurChildView().GetGuideUiItemAndUiItemForShowEx(i);
      }
    }
  }
}
exports.PhantomArenaMainView = PhantomArenaMainView;
//# sourceMappingURL=PhantomArenaMainView.js.map