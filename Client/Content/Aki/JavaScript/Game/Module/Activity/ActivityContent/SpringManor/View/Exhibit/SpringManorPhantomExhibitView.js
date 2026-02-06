"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorPhantomExhibitView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const FilterSortEntrance_1 = require("../../../../../Common/FilterSort/FilterSortEntrance");
const ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine");
const UiCameraAnimationManager_1 = require("../../../../../UiCameraAnimation/UiCameraAnimationManager");
const LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const SpringManorDefine_1 = require("../../SpringManorDefine");
const SpringManorPhantomExhibitGrid_1 = require("./SpringManorPhantomExhibitGrid");
const phantomExhibitBodySizeRecord = {
  Small: 1,
  Medium: 2,
  Huge: 3
};
class SpringManorPhantomExhibitView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.mmg = undefined;
    this.fmg = [];
    this.gmg = undefined;
    this.Cmg = undefined;
    this.rTg = undefined;
    this.pmg = undefined;
    this.cvg = 1;
    this.E0 = undefined;
    this.ymg = 0;
    this.t3g = undefined;
    this.Smg = () => {
      var i = new SpringManorPhantomExhibitGrid_1.SpringManorPhantomExhibitGrid();
      i.OnToggleClick = this.Mmg;
      return i;
    };
    this.FNt = (i, t, e) => {
      this.Emg(i ?? []);
    };
    this.Mmg = (i, t) => {
      this.Cmg = i;
      this.oTg(i);
      this.Img();
      this.mmg?.SelectGridProxy(t, false);
    };
    this.Jvt = () => {
      var i;
      if ((this.rTg ?? 0) === (this.pmg ?? 0)) {
        this.nTg();
        this.CloseMe();
      } else {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(434)).FunctionMap.set(1, () => {
          this.rTg = this.pmg;
          if (this.E0 !== undefined) {
            this.wmg(this.E0, this.pmg ?? 0);
          }
          this.nTg();
          this.CloseMe();
        });
        i.FunctionMap.set(2, () => {
          this.pmg = this.rTg;
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomDisplayUpdated_Tips");
          this.nTg();
          this.CloseMe();
        });
        i.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
    this.Rmg = () => {
      if (this.Cmg !== undefined && this.pmg !== this.Cmg) {
        if (this.pmg !== undefined) {
          this.Lmg(this.pmg, false);
        }
        this.pmg = this.Cmg;
        this.Lmg(this.Cmg, true);
        this.oTg(this.pmg);
        this.Img();
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomDisplayUpdated_Tips");
      }
    };
    this.Pmg = () => {
      if (this.Cmg !== undefined && this.pmg === this.Cmg) {
        this.pmg = undefined;
        this.rTg = undefined;
        this.Lmg(this.Cmg, false);
        this.Amg(this.E0)?.HideSkeletalMeshComponent();
        this.Img();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[8, this.Pmg]];
  }
  async OnBeforeStartAsync() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
    var i;
    var t = this.OpenParam;
    this.E0 = t.TargetPhantomExhibitEntity;
    await this.Dmg();
    var t = this.GetItem(7);
    if (t) {
      this.t3g = new ButtonItem_1.ButtonItem(t);
      this.t3g.SetFunction(this.Rmg);
    }
    var t = this.Amg(this.E0);
    if (t) {
      i = this.Umg();
      this.ymg = t.GetItemId();
      this.pmg = this.ymg;
      this.rTg = this.pmg;
      this.cvg = i ? phantomExhibitBodySizeRecord[i] : 1;
      this.xmg();
      this.Bmg();
    }
  }
  OnBeforeShow() {
    this.kmg();
  }
  OnBeforeDestroy() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
    this.gmg?.ClearData(44);
  }
  xmg() {
    var i = this.GetLoopScrollViewComponent(2);
    var t = this.GetItem(3)?.GetOwner();
    if (i && t) {
      this.mmg = new LoopScrollView_1.LoopScrollView(i, t, this.Smg);
    }
  }
  Bmg() {
    var i = this.GetItem(4);
    if (i) {
      this.gmg = new FilterSortEntrance_1.FilterSortEntrance(i, this.FNt);
    }
  }
  kmg() {
    var i;
    var t = [];
    for (const e of ConfigManager_1.ConfigManager.SpringManorConfig.GetPhantomExtraConfigByBodySize(this.cvg)) {
      if (ModelManager_1.ModelManager.CalabashModel.CheckCalabashMonsterUnlocked(e.Id) && (i = ConfigManager_1.ConfigManager.HandBookConfig?.GetMonsterHandBookConfigByMonsterId(e.Id))) {
        t.push(i.Id);
      }
    }
    if (this.gmg) {
      this.gmg.UpdateData(52, t);
    } else {
      this.Emg(t);
    }
  }
  Emg(i) {
    var t = i.length > 0;
    this.GetItem(1)?.SetUIActive(!t);
    let e = undefined;
    var r = [];
    for (const h of i) {
      var o;
      var s = ConfigManager_1.ConfigManager.HandBookConfig?.GetMonsterHandBookConfigById(h);
      if ((s &&= ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemByMonsterId(s.MonsterId)) && s.length !== 0) {
        s = s[0];
        o = this.pmg === s.ItemId;
        s = {
          PhantomId: s.ItemId,
          IsSelected: o
        };
        if (o) {
          e = s;
        } else {
          r.push(s);
        }
      }
    }
    if (e) {
      this.fmg = [e, ...r];
    } else {
      this.fmg = r;
    }
    this.mmg.RefreshByData(this.fmg, undefined, undefined, true);
    if (t && this.fmg.length > 0) {
      this.mmg.ScrollToGridIndex(0, false);
      this.mmg.SelectGridProxy(0, false);
      this.Cmg = this.fmg[0]?.PhantomId;
      this.oTg(this.Cmg);
    } else {
      this.mmg.DeselectCurrentGridProxy();
      this.Cmg = undefined;
    }
    this.Img();
  }
  Img() {
    var i = this.Cmg !== undefined;
    var t = i && this.pmg !== undefined && this.pmg === this.Cmg;
    this.t3g?.SetUiActive(i && !t);
    this.GetButton(8)?.RootUIComp.SetUIActive(i && t);
    var i = !t && this.pmg;
    if (this.t3g) {
      if (i) {
        this.t3g.SetShowText("Text_PhantomExhibitionReplace_Text");
      } else {
        this.t3g.SetShowText("Text_PhantomExhibitionEquip_Text");
      }
    }
  }
  Lmg(t, e) {
    for (let i = 0; i < this.fmg.length; ++i) {
      var r = this.fmg[i];
      if (r?.PhantomId === t) {
        r.IsSelected = e;
        this.mmg?.RefreshGridProxy(i);
        break;
      }
    }
  }
  oTg(i) {
    if (this.E0 !== undefined) {
      this.rTg = i;
      this.wmg(this.E0, i);
    }
  }
  async Dmg() {
    var i;
    var t = this.GetItem(0);
    if (t) {
      await (i = new PopupCaptionItem_1.PopupCaptionItem()).CreateThenShowByActorAsync(t.GetOwner());
      i.SetCloseCallBack(this.Jvt);
      i.SetHelpCallBack(() => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(SpringManorDefine_1.PHANTOM_EXHIBIT_HELP_ID);
      });
    }
  }
  wmg(i, t) {
    var e = this.Amg(i);
    return !!e && (t === 0 ? this.Amg(i)?.HideSkeletalMeshComponent() : e.RefreshSkeletalMeshComponent(t), true);
  }
  bmg(i) {
    var t;
    var i = i ?? this.pmg;
    if (this.E0 !== undefined && i !== undefined && i !== 0 && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0))) {
      i = i;
      return [{
        F4n: MathUtils_1.MathUtils.NumberToLong(t.CreatureDataId),
        L8n: i
      }];
    } else {
      return [];
    }
  }
  Umg() {
    return this.Amg(this.E0)?.GetExhibitConfig()?.PhantomSize;
  }
  Amg(i) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i);
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
  nTg() {
    var i = this.pmg ?? 0;
    if (i !== this.ymg) {
      i = this.bmg(i);
      ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.RequestExhibitionSave(i);
    }
  }
}
exports.SpringManorPhantomExhibitView = SpringManorPhantomExhibitView;
//# sourceMappingURL=SpringManorPhantomExhibitView.js.map