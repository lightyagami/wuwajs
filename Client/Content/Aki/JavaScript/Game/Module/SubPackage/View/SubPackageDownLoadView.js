"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPackageDownLoadView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate");
const NetworkDefine_1 = require("../../../../Launcher/NetworkDefine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const SubPackageDefine_1 = require("../SubPackageDefine");
const SubPackageDownLoadDynamicItem_1 = require("./SubPackageDownLoadDynamicItem");
const SubPackageDownLoadItem_1 = require("./SubPackageDownLoadItem");
const SubPackageDownLoadVersionTipsView_1 = require("./SubPackageDownLoadVersionTipsView");
const startTag = new UE.FName("Start");
const closeTag = new UE.FName("Close");
class SubPackageDownLoadView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.lNm = undefined;
    this._Nm = undefined;
    this.bhd = undefined;
    this.Lhd = undefined;
    this.uNm = undefined;
    this.cNm = [];
    this.i$m = 0;
    this.r$m = [];
    this.o$m = [];
    this.TDe = undefined;
    this.kaf = false;
    this.JCf = undefined;
    this.NPn = () => {
      var e = new SubPackageDownLoadItem_1.SubPackageDownLoadItem();
      e.OnClickCallBack = this.mNm;
      e.OnClickHelpBtnCallBack = this.fNm;
      e.OnClickBtnCallBack = this.ZCf;
      this.cNm.push(e);
      return e;
    };
    this.C5e = () => {
      var e = new SubPackageTab();
      e.OnClickCallBack = this.Dhd;
      return e;
    };
    this.mNm = (i, e) => {
      var t = this.i$m === 0 ? this.r$m : this.o$m;
      if (e) {
        let e = -1;
        for (const a of t) {
          if (a.VersionId === i) {
            e = t.indexOf(a);
          }
        }
        if (e < 0) {
          return;
        }
        t[e].IsShowItem = true;
        var r = [];
        for (const n of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageListByVersion(i) ?? []) {
          var o = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
          o.SubPackageId = n.Id;
          r.push(o);
        }
        r.sort(this.gNm);
        t.splice(e + 1, 0, ...r);
      } else {
        for (let e = 0; e < t.length; e++) {
          if (t[e].VersionId === i) {
            t[e].IsShowItem = false;
          }
          var s = t[e].SubPackageId;
          if (s && ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(s)?.Version === i) {
            t.splice(e, 1);
            e--;
          }
        }
      }
      this.lNm?.RefreshByData(t, true, true);
      this.lNm?.BindLateUpdate(() => {
        for (const e of this.cNm) {
          if (e.GetData()?.VersionId === i) {
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(e.GetInteractItem(), true, true);
            break;
          }
        }
        this.lNm?.UnBindLateUpdate();
      });
    };
    this.CNm = () => {
      var e = [];
      for (const r of this.i$m === 0 ? this.r$m : this.o$m) {
        if (!r.SubPackageId && (e.push(r), r.IsShowItem)) {
          var i = [];
          for (const o of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageListByVersion(r.VersionId) ?? []) {
            var t = new SubPackageDefine_1.SubPackageDownLoadDynamicData();
            t.SubPackageId = o.Id;
            i.push(t);
          }
          i.sort(this.gNm);
          e.push(...i);
        }
      }
      if (this.i$m === 0) {
        this.r$m = e;
        this.lNm?.RefreshByData(this.r$m, true, true);
      } else {
        this.o$m = e;
        this.lNm?.RefreshByData(this.o$m, true, true);
      }
      this.lNm?.BindLateUpdate(() => {
        for (const i of this.cNm) {
          var e = i.GetData();
          if (e?.VersionId && e.VersionId === this.JCf?.VersionId || e?.SubPackageId && e.SubPackageId === this.JCf?.SubPackageId) {
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(i.GetInteractItem(), true, true);
            break;
          }
        }
        this.JCf = undefined;
        this.lNm?.UnBindLateUpdate();
      });
      this.nWm();
    };
    this.sif = () => {
      this.GetExtendToggle(3).SetToggleState(1, true);
    };
    this.gNm = (e, i) => {
      var t = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(e.SubPackageId);
      var r = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(i.SubPackageId);
      if (t !== r) {
        return t - r;
      } else if ((t = ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.indexOf(e.SubPackageId)) === (r = ModelManager_1.ModelManager.SubPackageDownLoadModel.SubPackageDownLoadList.indexOf(i.SubPackageId)) && t === -1) {
        return e.SubPackageId - i.SubPackageId;
      } else if (t === r || t !== -1 && r !== -1) {
        if (t !== r) {
          return t - r;
        } else {
          return e.SubPackageId - i.SubPackageId;
        }
      } else {
        return r - t;
      }
    };
    this.hNm = () => {
      this.pNm();
      this.nWm();
    };
    this.fNm = (e, i) => {
      this._Nm?.RefreshItem(e, i.D_K2_GetComponentLocation());
      this._Nm?.SetUiActive(true);
    };
    this.Dhd = (e, i) => {
      this.Lhd?.SetToggleStateForce(0);
      this.Lhd = e;
      this.i$m = i;
      this.vNm(i);
    };
    this.tPu = () => {
      var e;
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish()) {
        this.CloseMe();
        ControllerHolder_1.ControllerHolder.ResourceManagerController.LoginPrepareResCheckPromise?.SetResult();
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(397)).FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        });
        e.FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.SubPackageController.RestartSubPackageDownLoading(SubPackageDefine_1.KEY_SUBPACKAGE_ID);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
      }
    };
    this.yNm = e => {
      var e = e === 1;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadAgreeUseCellData, e);
      const i = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadingSubPackageId;
      if (!e && ModelManager_1.ModelManager.SubPackageDownLoadModel.NetworkListener.GetNetworkType() === NetworkDefine_1.ENetworkType.Cell && i > 0) {
        ControllerHolder_1.ControllerHolder.SubPackageController.StopSubPackageDownLoading(i);
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(398)).FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        });
        e.FunctionMap.set(2, () => {
          this.sif();
          ControllerHolder_1.ControllerHolder.SubPackageController.RestartSubPackageDownLoading(i);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
      }
    };
    this.ZCf = e => {
      this.JCf = e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIVerticalLayout], [3, UE.UIExtendToggle], [4, UE.UIDynScrollViewComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem]];
    this.BtnBindInfo = [[5, this.tPu], [3, this.yNm]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.hNm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority, this.CNm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackUseCellData, this.sif);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority, this.CNm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.hNm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackUseCellData, this.sif);
  }
  async OnBeforeStartAsync() {
    this.kaf = LevelSequencePlayer_1.LevelSequencePlayer.GetBanned();
    LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(false);
    var e = [];
    var i = this.GetItem(0);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(i.GetOwner()));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.uNm = new SubPackageDownLoadDynamicItem_1.SubPackageDownLoadDynamicItem();
    this.lNm = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(4), this.GetItem(8), this.uNm, this.NPn);
    e.push(this.lNm.Init());
    this.bhd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.C5e);
    this._Nm = new SubPackageDownLoadVersionTipsView_1.SubPackageDownLoadVersionTipsView();
    e.push(this._Nm.CreateByResourceIdAsync("UiItem_TipsInfo1", this.GetItem(7)));
    await Promise.all(e);
  }
  OnStart() {
    ModelManager_1.ModelManager.SubPackageDownLoadModel.UpdaterDownLoadSize();
    ModelManager_1.ModelManager.SubPackageDownLoadModel.UpdaterFinishState();
    ControllerHolder_1.ControllerHolder.ResourceManagerController.ChangeHttpTickFrequency();
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadAgreeUseCellData) ?? false;
    this.GetExtendToggle(3).SetToggleState(e ? 1 : 0);
    const i = this.OpenParam;
    const t = [];
    for (const r of i?.SubPackageIdList ?? []) {
      if (r) {
        t.push(r);
      }
    }
    this.bhd?.RefreshByData([0, 1], () => {
      if (i && t.length > 0) {
        for (const e of t) {
          if (e) {
            if (ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(e)?.Type === 4) {
              this.bhd?.GetLayoutItemByIndex(1)?.SelectToggle();
              return;
            }
          }
        }
      }
      this.bhd?.GetLayoutItemByIndex(0)?.SelectToggle();
    });
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage("LoginLogo");
    this.SetTextureByPath(e, this.GetTexture(1));
    if (ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingNone()) {
      ControllerHolder_1.ControllerHolder.SubPackageController.AutoDownLoadKeySubPackage();
    } else if (ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish() && t.length > 0) {
      ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading(t);
    }
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.WF1();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
    if (i) {
      this.lqe?.SetCloseBtnActive(i.IsShowCloseBtn);
      this.GetButton(5).RootUIComp?.SetUIActive(!i.IsShowCloseBtn);
      this.GetText(9).SetUIActive(!i.IsShowCloseBtn);
    } else {
      this.lqe?.SetCloseBtnActive(true);
      this.GetButton(5).RootUIComp?.SetUIActive(false);
      this.GetText(9).SetUIActive(false);
    }
    this.pNm();
    this.nWm();
    this.AniPlay(startTag);
  }
  WF1() {
    for (const e of this.cNm) {
      e.RefreshDownLoadState();
    }
  }
  pNm() {
    var e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "SubPackageDownLoad_FreeSpace", ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(e));
  }
  OnBeforeHide() {
    this.AniPlay(closeTag);
  }
  OnBeforeDestroy() {
    LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(this.kaf);
    ControllerHolder_1.ControllerHolder.ResourceManagerController.RestoreHttpTickFrequency();
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  vNm(e) {
    if (e === 0) {
      if (this.r$m.length <= 0) {
        this.r$m = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetKeySubPackageData();
      }
      this.lNm?.RefreshByData(this.r$m, true, true);
    } else if (e === 1) {
      if (this.o$m.length <= 0) {
        this.o$m = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetExpendSubPackageData();
      }
      this.lNm?.RefreshByData(this.o$m, true, true);
    }
  }
  nWm() {
    var e = ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish();
    this.GetButton(5)?.SetSelfInteractive(e);
  }
  AniPlay(e) {
    this.GetItem(10)?.GetOwner()?.GetComponentsByTag(UE.UIInturnAnimController.StaticClass(), e).Get(0).Play();
  }
}
exports.SubPackageDownLoadView = SubPackageDownLoadView;
class SubPackageTab extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.a8e = 0;
    this.OnClickCallBack = undefined;
    this.N8e = () => {
      this.OnClickCallBack?.(this.GetExtendToggle(0), this.a8e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  Refresh(e, i, t) {
    if (e === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "SubPackageDownLoad_Key_Tab");
    }
    if (e === 1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "SubPackageDownLoad_Expend_Tab");
    }
    this.a8e = e;
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, true);
  }
}
//# sourceMappingURL=SubPackageDownLoadView.js.map