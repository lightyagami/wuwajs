"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTabMainView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const SurvivorsItemDetailTabView_1 = require("./SurvivorsItemDetailTabView");
const SurvivorsRoleDetailTabView_1 = require("./SurvivorsRoleDetailTabView");
const SurvivorsTabMainTabItem_1 = require("./SurvivorsTabMainTabItem");
const SurvivorsWeaponDetailTabView_1 = require("./SurvivorsWeaponDetailTabView");
const TAB_STEP_LEFT = -1;
const TAB_STEP_RIGHT = 1;
class SurvivorsTabMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.jFd = undefined;
    this.HFd = [];
    this.$Fd = -1;
    this.Tqd = undefined;
    this.WFd = undefined;
    this.QFd = undefined;
    this.KFd = undefined;
    this._Ba = [];
    this.XFd = undefined;
    this.YFd = undefined;
    this.zFd = undefined;
    this.JFd = undefined;
    this.ZFd = () => new SurvivorsTabMainTabItem_1.SurvivorsTabMainTabItem();
    this.eNd = () => {
      this.b7e(TAB_STEP_LEFT);
    };
    this.tNd = () => {
      this.b7e(TAB_STEP_RIGHT);
    };
    this.iNd = () => {
      this.rNd(0);
      this.oNd(0);
    };
    this.nNd = () => {
      this.rNd(2);
      this.oNd(2);
    };
    this.sNd = i => {
      this.rNd(1);
      this.oNd(1);
      this.QFd?.RefreshByData(this.jFd[i].WeaponData);
    };
    this.I5t = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.tNd], [7, this.eNd]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.sso());
    i.push(this.C3d());
    this.Tqd = new PopupCaptionItem_1.PopupCaptionItem();
    i.push(this.Tqd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    i.push(ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestWeaponInfoUpdate());
    await Promise.all(i);
  }
  OnStart() {
    this.cQa();
    this.RefreshTabs();
    this.lNd();
  }
  OnBeforeDestroy() {
    this._Ba?.forEach(i => {
      i.Clear();
    });
    this._Ba = undefined;
  }
  lNd() {
    const e = this.OpenParam;
    if (e) {
      switch (e.SkipTabType) {
        case 1:
          {
            let i = undefined;
            if (!(i = e.SkipWeaponId ? this.jFd?.findIndex(i => i.WeaponData?.ConfigId === e.SkipWeaponId) : i) || i === -1) {
              i = e.SkipTabIndex;
            }
            this.JFd?.GetTabItemByIndex(i ?? 0)?.SetForceSwitch(1, true);
          }
          break;
        case 2:
          this.zFd?.SetForceSwitch(1, true);
          break;
        default:
          this.YFd?.SetForceSwitch(1, true);
      }
    } else {
      this.YFd?.SetForceSwitch(1, true);
    }
  }
  async C3d() {
    var i = [];
    this.WFd = new SurvivorsRoleDetailTabView_1.SurvivorsRoleDetailTabView();
    this.HFd.push(this.WFd);
    i.push(this.WFd.CreateByResourceIdAsync("UiItem_SurvivorsRoleDetail", this.GetItem(1)));
    this.QFd = new SurvivorsWeaponDetailTabView_1.SurvivorsWeaponDetailTabView();
    this.HFd.push(this.QFd);
    i.push(this.QFd.CreateByResourceIdAsync("UiItem_SurvivorsWeaponDetail", this.GetItem(1)));
    this.KFd = new SurvivorsItemDetailTabView_1.SurvivorsItemDetailTabView();
    this.HFd.push(this.KFd);
    i.push(this.KFd.CreateByResourceIdAsync("UiItem_SurvivorsItemDetail", this.GetItem(1)));
    await Promise.all(i);
    this._Ba?.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.WFd.GetRootItem()));
    this._Ba?.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.QFd.GetRootItem()));
    this._Ba?.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.KFd.GetRootItem()));
  }
  async sso() {
    var i = [];
    this.YFd = new SurvivorsTabMainTabItem_1.SurvivorsTabMainTabItem();
    this.YFd.SetSelectedCallBack(this.iNd);
    this.YFd.SetCanExecuteChange((i, e) => e || this.XFd !== 0);
    i.push(this.YFd.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.zFd = new SurvivorsTabMainTabItem_1.SurvivorsTabMainTabItem();
    this.zFd.SetSelectedCallBack(this.nNd);
    this.zFd.SetCanExecuteChange((i, e) => e || this.XFd !== 2);
    i.push(this.zFd.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.JFd = new TabComponent_1.TabComponent(this.GetItem(2), this.ZFd, this.sNd, undefined);
    this.jFd = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponGridDataList();
    i.push(this.JFd.RefreshTabItemByLengthAsync(this.jFd.length));
    await Promise.all(i);
  }
  RefreshTabs() {
    const s = this.JFd.GetTabItemMap();
    this.jFd?.forEach((i, e) => {
      var t;
      var e = s.get(e);
      if (i.IsDisable) {
        e?.RefreshTabState(0);
      } else if (i.IsLock) {
        e?.RefreshTabState(1);
        e?.RefreshUnlockWave(i.UnlockBatch);
      } else {
        t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(i.WeaponData.ConfigId);
        e?.RefreshInfo(t.Icon, i.WeaponData.Data.F6n);
        e?.RefreshTabState(2);
      }
    });
    this.YFd?.SetTextById("SurvivorCharacterAttributeInterface_Name");
    this.YFd?.RefreshTabState(2);
    this.zFd?.SetTextById("Text_Prop_Text");
    this.zFd?.RefreshTabState(2);
  }
  cQa() {
    this.Tqd?.SetCloseCallBack(this.I5t);
    this.Tqd?.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.OpenRogueHelp();
    });
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.LocalConfig;
    if (i) {
      this.Tqd?.SetTitleLocalText(i.Title);
    }
  }
  oNd(i) {
    var e;
    if (i !== this.$Fd) {
      if ((e = this.$Fd) >= 0) {
        this.HFd[e].SetUiActive(false);
      }
      this.$Fd = i;
      this.HFd[i].SetUiActive(true);
      (e = this._Ba?.[i])?.StopCurrentSequence();
      e?.PlayLevelSequenceByName("Start");
    }
  }
  rNd(i) {
    if (this.XFd !== undefined && this.XFd !== i) {
      switch (this.XFd) {
        case 0:
          this.YFd?.SetForceSwitch(0, false);
          break;
        case 2:
          this.zFd?.SetForceSwitch(0, false);
          break;
        case 1:
          this.JFd?.ResetSelectIndex();
      }
    }
    this.XFd = i;
  }
  b7e(i) {
    var e = this.XFd;
    if (e === 0) {
      this.uNd(i);
    } else if (e === 2) {
      this.cNd(i);
    } else {
      this.dNd(i);
    }
  }
  uNd(i) {
    if (i === TAB_STEP_LEFT) {
      this.zFd?.SetForceSwitch(1, true);
    } else if (i === TAB_STEP_RIGHT) {
      if (this.mNd() === -1) {
        this.zFd?.SetForceSwitch(1, true);
      } else {
        this.JFd?.SelectToggleByIndex(0);
      }
    }
  }
  cNd(i) {
    if (i === TAB_STEP_RIGHT) {
      this.YFd?.SetForceSwitch(1, true);
    } else if (i === TAB_STEP_LEFT) {
      if ((i = this.mNd()) === -1) {
        this.YFd?.SetForceSwitch(1, true);
      } else {
        this.JFd?.SelectToggleByIndex(i);
      }
    }
  }
  dNd(i) {
    var e = this.JFd.GetSelectedIndex();
    var t = this.mNd();
    if (e === 0 && i === TAB_STEP_LEFT) {
      this.JFd?.ResetSelectIndex();
      this.YFd?.SetForceSwitch(1, true);
    } else if (t <= e && i === TAB_STEP_RIGHT) {
      this.JFd?.ResetSelectIndex();
      this.zFd?.SetForceSwitch(1, true);
    } else {
      this.JFd?.SelectToggleByIndex(e + i);
    }
  }
  mNd() {
    let t = -1;
    this.jFd?.forEach((i, e) => {
      if (!i.IsLock && !i.IsDisable) {
        t = e;
      }
    });
    return t;
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var e;
    var t;
    if (!(i.length <= 1)) {
      e = i[0];
      i = i[1];
      if (e === "WeaponPage") {
        if (t = this.QFd?.GetGuideUiItem(i)) {
          return [t, t];
        } else {
          return undefined;
        }
      } else if (e === "RolePage") {
        if (t = this.WFd?.GetGuideUiItem(i)) {
          return [t, t];
        } else {
          return undefined;
        }
      } else if (e === "ItemPage" && (t = this.KFd?.GetGuideUiItem(i))) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.SurvivorsTabMainView = SurvivorsTabMainView;
//# sourceMappingURL=SurvivorsTabMainView.js.map