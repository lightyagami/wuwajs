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
    this.gOd = undefined;
    this.COd = [];
    this.pOd = -1;
    this.akd = undefined;
    this.vOd = undefined;
    this.yOd = undefined;
    this.SOd = undefined;
    this._Ba = [];
    this.MOd = undefined;
    this.EOd = undefined;
    this.IOd = undefined;
    this.TOd = undefined;
    this.bOd = () => new SurvivorsTabMainTabItem_1.SurvivorsTabMainTabItem();
    this.ROd = () => {
      this.b7e(TAB_STEP_LEFT);
    };
    this.wOd = () => {
      this.b7e(TAB_STEP_RIGHT);
    };
    this.LOd = () => {
      this.POd(0);
      this.AOd(0);
    };
    this.DOd = () => {
      this.POd(2);
      this.AOd(2);
    };
    this.UOd = i => {
      this.POd(1);
      this.AOd(1);
      this.yOd?.RefreshByData(this.gOd[i].WeaponData);
    };
    this.I5t = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.wOd], [7, this.ROd]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.sso());
    i.push(this.Hqd());
    this.akd = new PopupCaptionItem_1.PopupCaptionItem();
    i.push(this.akd.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    i.push(ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestWeaponInfoUpdate());
    await Promise.all(i);
  }
  OnStart() {
    this.cQa();
    this.RefreshTabs();
    this.kOd();
  }
  OnBeforeDestroy() {
    this._Ba?.forEach(i => {
      i.Clear();
    });
    this._Ba = undefined;
  }
  kOd() {
    const e = this.OpenParam;
    if (e) {
      switch (e.SkipTabType) {
        case 1:
          {
            let i = undefined;
            if (!(i = e.SkipWeaponId ? this.gOd?.findIndex(i => i.WeaponData?.ConfigId === e.SkipWeaponId) : i) || i === -1) {
              i = e.SkipTabIndex;
            }
            this.TOd?.GetTabItemByIndex(i ?? 0)?.SetForceSwitch(1, true);
          }
          break;
        case 2:
          this.IOd?.SetForceSwitch(1, true);
          break;
        default:
          this.EOd?.SetForceSwitch(1, true);
      }
    } else {
      this.EOd?.SetForceSwitch(1, true);
    }
  }
  async Hqd() {
    var i = [];
    this.vOd = new SurvivorsRoleDetailTabView_1.SurvivorsRoleDetailTabView();
    this.COd.push(this.vOd);
    i.push(this.vOd.CreateByResourceIdAsync("UiItem_SurvivorsRoleDetail", this.GetItem(1)));
    this.yOd = new SurvivorsWeaponDetailTabView_1.SurvivorsWeaponDetailTabView();
    this.COd.push(this.yOd);
    i.push(this.yOd.CreateByResourceIdAsync("UiItem_SurvivorsWeaponDetail", this.GetItem(1)));
    this.SOd = new SurvivorsItemDetailTabView_1.SurvivorsItemDetailTabView();
    this.COd.push(this.SOd);
    i.push(this.SOd.CreateByResourceIdAsync("UiItem_SurvivorsItemDetail", this.GetItem(1)));
    await Promise.all(i);
    this._Ba?.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.vOd.GetRootItem()));
    this._Ba?.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.yOd.GetRootItem()));
    this._Ba?.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.SOd.GetRootItem()));
  }
  async sso() {
    var i = [];
    this.EOd = new SurvivorsTabMainTabItem_1.SurvivorsTabMainTabItem();
    this.EOd.SetSelectedCallBack(this.LOd);
    this.EOd.SetCanExecuteChange((i, e) => e || this.MOd !== 0);
    i.push(this.EOd.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.IOd = new SurvivorsTabMainTabItem_1.SurvivorsTabMainTabItem();
    this.IOd.SetSelectedCallBack(this.DOd);
    this.IOd.SetCanExecuteChange((i, e) => e || this.MOd !== 2);
    i.push(this.IOd.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.TOd = new TabComponent_1.TabComponent(this.GetItem(2), this.bOd, this.UOd, undefined);
    this.gOd = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponGridDataList();
    i.push(this.TOd.RefreshTabItemByLengthAsync(this.gOd.length));
    await Promise.all(i);
  }
  RefreshTabs() {
    const s = this.TOd.GetTabItemMap();
    this.gOd?.forEach((i, e) => {
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
    this.EOd?.SetTextById("Text_Role_Text");
    this.EOd?.RefreshTabState(2);
    this.IOd?.SetTextById("Text_Prop_Text");
    this.IOd?.RefreshTabState(2);
  }
  cQa() {
    this.akd?.SetCloseCallBack(this.I5t);
    this.akd?.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.OpenRogueHelp();
    });
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.LocalConfig;
    if (i) {
      this.akd?.SetTitleLocalText(i.Title);
    }
  }
  AOd(i) {
    var e;
    if (i !== this.pOd) {
      if ((e = this.pOd) >= 0) {
        this.COd[e].SetUiActive(false);
      }
      this.pOd = i;
      this.COd[i].SetUiActive(true);
      (e = this._Ba?.[i])?.StopCurrentSequence();
      e?.PlayLevelSequenceByName("Start");
    }
  }
  POd(i) {
    if (this.MOd !== undefined && this.MOd !== i) {
      switch (this.MOd) {
        case 0:
          this.EOd?.SetForceSwitch(0, false);
          break;
        case 2:
          this.IOd?.SetForceSwitch(0, false);
          break;
        case 1:
          this.TOd?.ResetSelectIndex();
      }
    }
    this.MOd = i;
  }
  b7e(i) {
    var e = this.MOd;
    if (e === 0) {
      this.qOd(i);
    } else if (e === 2) {
      this.GOd(i);
    } else {
      this.FOd(i);
    }
  }
  qOd(i) {
    if (i === TAB_STEP_LEFT) {
      this.IOd?.SetForceSwitch(1, true);
    } else if (i === TAB_STEP_RIGHT) {
      if (this.NOd() === -1) {
        this.IOd?.SetForceSwitch(1, true);
      } else {
        this.TOd?.SelectToggleByIndex(0);
      }
    }
  }
  GOd(i) {
    if (i === TAB_STEP_RIGHT) {
      this.EOd?.SetForceSwitch(1, true);
    } else if (i === TAB_STEP_LEFT) {
      if ((i = this.NOd()) === -1) {
        this.EOd?.SetForceSwitch(1, true);
      } else {
        this.TOd?.SelectToggleByIndex(i);
      }
    }
  }
  FOd(i) {
    var e = this.TOd.GetSelectedIndex();
    var t = this.NOd();
    if (e === 0 && i === TAB_STEP_LEFT) {
      this.TOd?.ResetSelectIndex();
      this.EOd?.SetForceSwitch(1, true);
    } else if (t <= e && i === TAB_STEP_RIGHT) {
      this.TOd?.ResetSelectIndex();
      this.IOd?.SetForceSwitch(1, true);
    } else {
      this.TOd?.SelectToggleByIndex(e + i);
    }
  }
  NOd() {
    let t = -1;
    this.gOd?.forEach((i, e) => {
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
        if (t = this.yOd?.GetGuideUiItem(i)) {
          return [t, t];
        } else {
          return undefined;
        }
      } else if (e === "RolePage") {
        if (t = this.vOd?.GetGuideUiItem(i)) {
          return [t, t];
        } else {
          return undefined;
        }
      } else if (e === "ItemPage" && (t = this.SOd?.GetGuideUiItem(i))) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.SurvivorsTabMainView = SurvivorsTabMainView;
//# sourceMappingURL=SurvivorsTabMainView.js.map