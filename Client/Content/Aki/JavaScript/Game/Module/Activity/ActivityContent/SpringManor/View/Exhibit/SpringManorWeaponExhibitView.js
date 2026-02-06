"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorWeaponExhibitView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const FilterSortEntrance_1 = require("../../../../../Common/FilterSort/FilterSortEntrance");
const ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine");
const UiCameraAnimationManager_1 = require("../../../../../UiCameraAnimation/UiCameraAnimationManager");
const LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const SpringManorDefine_1 = require("../../SpringManorDefine");
const SpringManorWeaponExhibitGrid_1 = require("./SpringManorWeaponExhibitGrid");
const SpringManorWeaponSlotToggle_1 = require("./SpringManorWeaponSlotToggle");
const MIN_DISPLAY_WEAPON_QUALITY = 4;
class SpringManorWeaponExhibitView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Omg = [];
    this.Gmg = undefined;
    this.Fmg = [];
    this.Nmg = new Map();
    this.gmg = undefined;
    this.Vmg = [];
    this.Hmg = -1;
    this.udf = undefined;
    this.jmg = undefined;
    this.$mg = [];
    this.Hqd = () => {
      var i = new SpringManorWeaponExhibitGrid_1.SpringManorWeaponExhibitGrid();
      i.BindOnWeaponSelected(this.Wmg);
      return i;
    };
    this.FNt = (i, t, e) => {
      i = (i ?? []).map(i => this.Nmg.get(i));
      this.Qmg(i);
    };
    this.Wmg = (i, t) => {
      this.udf = i;
      this.Gmg.DeselectCurrentGridProxy();
      this.Gmg.SelectGridProxy(t, false);
      this.Ymg();
    };
    this.Ymg = () => {
      if (!(this.Hmg < 0) && this.udf && !(this.Hmg >= this.Omg.length)) {
        const e = this.udf;
        var i;
        var t = this.Vmg.findIndex(i => i === e);
        if (t >= 0 && t !== this.Hmg && (i = this.jmg?.[t], this.Vmg[t] = 0, this.Omg[t]?.SetWeaponItemId(0), i !== undefined)) {
          this.wmg(i, 0);
        }
        this.Vmg[this.Hmg] = e;
        this.Omg[this.Hmg]?.SetWeaponItemId(e);
        this.zmg();
        this.Gmg.RefreshAllGridProxies();
        var t = this.jmg?.[this.Hmg];
        if (t !== undefined) {
          this.wmg(t, this.udf);
        }
        this.Img();
      }
    };
    this.Pmg = () => {
      var i;
      if (!(this.Hmg < 0) && !(this.Hmg >= this.Omg.length)) {
        if (this.Vmg[this.Hmg] !== 0) {
          this.Vmg[this.Hmg] = 0;
          this.Omg[this.Hmg]?.SetWeaponItemId(0);
          if ((i = this.jmg?.[this.Hmg]) !== undefined) {
            this.wmg(i, 0);
          }
          this.zmg();
          this.Gmg.RefreshAllGridProxies();
          this.Img();
        }
      }
    };
    this.Jvt = () => {
      var i;
      if (this.Jmg()) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(435)).FunctionMap.set(1, () => {
          this.Tmg();
          this.CloseMe();
        });
        i.FunctionMap.set(2, () => {
          var i = this.Zmg();
          ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.RequestExhibitionSave(i);
          this.CloseMe();
        });
        i.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else {
        this.CloseMe();
      }
    };
    this.Kmg = i => {
      var t = this.Hmg;
      if (t === i) {
        this.SBg(i);
      } else {
        this.lTg(i);
        this.MBg(t, i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UILoopScrollViewComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[13, this.Pmg]];
  }
  async OnBeforeStartAsync() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
    var i;
    var t = this.OpenParam;
    this.jmg = t.TargetWeaponExhibitEntities;
    this.$mg = [];
    if (this.jmg) {
      for (const e of this.jmg) {
        if (e === undefined) {
          this.$mg.push(0);
        } else {
          i = this.Amg(e)?.GetItemId() ?? 0;
          this.$mg.push(i);
        }
      }
    }
    await Promise.all([this.Dmg(), this.efg()]);
    this.GetButton(12)?.RootUIComp.SetUIActive(false);
    this.GetButton(13)?.RootUIComp.SetUIActive(true);
    this.tfg();
    this.Bmg();
    this.ifg();
    this.rfg();
  }
  OnBeforeShow() {
    this.ifg();
  }
  OnBeforeDestroy() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
    this.gmg?.ClearData(50);
    this.EBg();
  }
  rfg() {
    if (this.Omg.length > 0) {
      let i = this.Vmg.findIndex(i => i === 0);
      if (i < 0 || i >= this.Omg.length) {
        i = 0;
      }
      this.Kmg(i);
    } else {
      this.Hmg = -1;
    }
    this.Img();
  }
  async efg() {
    var i = [1, 2, 3, 4, 5].map(async i => {
      var t;
      var i = this.GetItem(i);
      if (i) {
        await (t = new SpringManorWeaponSlotToggle_1.SpringManorWeaponSlotToggle()).CreateThenShowByActorAsync(i.GetOwner());
        return t;
      }
    });
    var i = await Promise.all(i);
    this.Omg = i.filter(i => i !== undefined);
    this.Vmg = Array.from(this.$mg);
    this.Omg.forEach((i, t) => {
      i.Setup(t, this.Kmg);
      i.SetWeaponItemId(this.$mg[t]);
    });
  }
  tfg() {
    var i = this.GetLoopScrollViewComponent(6);
    var t = this.GetItem(7)?.GetOwner();
    if (i && t) {
      this.Gmg = new LoopScrollView_1.LoopScrollView(i, t, this.Hqd);
    }
  }
  Bmg() {
    var i = this.GetItem(9);
    if (i) {
      this.gmg = new FilterSortEntrance_1.FilterSortEntrance(i, this.FNt);
    }
  }
  async Dmg() {
    var i;
    var t = this.GetItem(0);
    if (t) {
      await (i = new PopupCaptionItem_1.PopupCaptionItem()).CreateThenShowByActorAsync(t.GetOwner());
      i.SetCloseCallBack(this.Jvt);
      i.SetHelpCallBack(() => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(SpringManorDefine_1.WEAPON_EXHIBIT_HELP_ID);
      });
    }
  }
  ofg(i) {
    const e = [];
    this.Nmg.clear();
    const s = new Set();
    i.forEach(i => {
      var t = i.GetConfigId();
      if (!s.has(t) && !(i.GetQuality() < MIN_DISPLAY_WEAPON_QUALITY)) {
        s.add(t);
        this.Nmg.set(t, {
          ConfigId: t,
          IsSelected: false
        });
        e.push(t);
      }
    });
    return e;
  }
  ifg() {
    var i = ModelManager_1.ModelManager.InventoryModel.GetWeaponItemDataList();
    var i = this.ofg(i);
    this.gmg.UpdateData(50, i);
  }
  _Tg(i) {
    const e = new Map();
    this.Vmg.forEach((i, t) => {
      if (i !== 0) {
        e.set(i, t);
      }
    });
    if (e.size === 0) {
      return i;
    }
    var t = [];
    var s = [];
    for (const r of i) {
      (e.has(r.ConfigId) ? t : s).push(r);
    }
    t.sort((i, t) => {
      return e.get(i.ConfigId) - e.get(t.ConfigId);
    });
    return [...t, ...s];
  }
  Qmg(i) {
    this.Fmg = this._Tg(i);
    i = this.Fmg.length > 0;
    this.GetItem(8)?.SetUIActive(!i);
    this.nfg();
  }
  SBg(i) {
    if (this.Omg.length === 0) {
      this.Hmg = -1;
    } else {
      let e = i;
      if (e < 0 || e >= this.Omg.length) {
        e = 0;
      }
      this.Hmg = e;
      this.Omg.forEach((i, t) => {
        i.SetSelected(t === e);
      });
    }
  }
  Img() {
    var i = this.Hmg >= 0 && this.Hmg < this.Omg.length;
    if (i) {
      this.GetButton(13)?.SetSelfInteractive(i && this.udf === this.Vmg[this.Hmg]);
    }
  }
  Xmg(t) {
    var i = this.Fmg.findIndex(i => i.ConfigId === t);
    if (!(i < 0)) {
      this.udf = this.Fmg[i].ConfigId;
      this.Gmg.ScrollToGridIndex(i, false);
      this.Gmg.SelectGridProxy(i, false);
      this.Wmg(this.udf, i);
    }
  }
  nfg() {
    this.zmg();
    this.Gmg.RefreshByData(this.Fmg, undefined, undefined, true);
    var i = this.Fmg.length > 0;
    if (this.udf === undefined) {
      this.Gmg.DeselectCurrentGridProxy();
    } else if (i) {
      if ((i = this.Vmg[this.Hmg]) !== 0) {
        this.Xmg(i);
      } else {
        this.Xmg(this.udf);
      }
    }
  }
  zmg() {
    var i = new Set(this.Vmg.filter(i => i !== 0));
    for (const e of this.Fmg) {
      var t = i.has(e.ConfigId);
      e.IsSelected = t;
    }
  }
  Amg(i) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
    if (t) {
      t = t.Entity.GetComponent(344);
      if (t) {
        return t;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 58, `刷新场景物品展示模型失败，PbDataId: ${i}，Entity没有ActorComponent`);
      }
    }
  }
  wmg(i, t) {
    i = this.Amg(i);
    return !!i && (t === 0 ? i.HideSkeletalMeshComponent() : i.RefreshSkeletalMeshComponent(t), true);
  }
  Tmg() {
    if (this.jmg) {
      for (let i = 0; i < this.jmg.length; i++) {
        var t;
        var e = this.jmg[i];
        if (e !== undefined) {
          t = this.$mg[i];
          this.wmg(e, t);
        }
      }
    }
  }
  MBg(i, t) {
    if (this.jmg && (i !== undefined && i >= 0 && i < this.jmg.length && (i = this.jmg[i]) !== undefined && this.Amg(i)?.SetExhibitShowEffect(false), t >= 0) && t < this.jmg.length && (i = this.jmg[t]) !== undefined) {
      this.Amg(i)?.SetExhibitShowEffect(true);
    }
  }
  EBg() {
    if (this.jmg) {
      for (const i of this.jmg) {
        if (i !== undefined) {
          this.Amg(i)?.SetExhibitShowEffect(false);
        }
      }
    }
  }
  Jmg() {
    if (this.jmg) {
      for (let i = 0; i < this.jmg.length; i++) {
        var t = this.$mg[i];
        if (this.Vmg[i] !== t) {
          return true;
        }
      }
    }
    return false;
  }
  Zmg() {
    var t = [];
    if (this.jmg) {
      for (let i = 0; i < this.jmg.length; i++) {
        var e;
        var s = this.jmg[i];
        if (s !== undefined && (s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s)) && (e = this.Vmg[i]) !== this.$mg[i]) {
          s = {
            F4n: MathUtils_1.MathUtils.NumberToLong(s.CreatureDataId),
            L8n: e
          };
          t.push(s);
        }
      }
    }
    return t;
  }
  lTg(i) {
    this.SBg(i);
    i = this.Vmg[i];
    if (i !== 0) {
      this.Xmg(i);
    } else {
      this.Gmg?.DeselectCurrentGridProxy();
      this.udf = undefined;
    }
    this.Img();
  }
}
exports.SpringManorWeaponExhibitView = SpringManorWeaponExhibitView;
//# sourceMappingURL=SpringManorWeaponExhibitView.js.map