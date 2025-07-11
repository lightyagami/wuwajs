"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchIncomeDetailView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FloroRanchTipData_1 = require("../Data/FloroRanchTipData");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
const FloroRanchCommonTipItem_1 = require("./Item/FloroRanchCommonTipItem");
const FloroRanchIncomeItem_1 = require("./Item/FloroRanchIncomeItem");
const FloroRanchTerrainTipItem_1 = require("./Item/FloroRanchTerrainTipItem");
class FloroRanchIncomeDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Bpu = undefined;
    this.vRu = [];
    this.BSi = undefined;
    this.yRu = undefined;
    this.Opu = false;
    this.pUt = true;
    this.ypt = [];
    this.VFu = -1;
    this.tOu = undefined;
    this.CGu = undefined;
    this.pGu = undefined;
    this.vGu = undefined;
    this.yGu = undefined;
    this.uOu = undefined;
    this.h_u = () => {
      var i = new FloroRanchIncomeItem_1.FloroRanchIncomeItem();
      i.BindClickCallBack(this.MRu);
      i.SetSelectState(false);
      this.vRu.push(i);
      return i;
    };
    this.MRu = (i, e) => {
      this.aWt(i);
      var i = e.CheckGetComponent(0);
      var t = i.Point;
      var s = !i.IsRemove && t !== -1;
      if (s) {
        this.jt_(e);
      } else {
        if (t === -1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_AnimalBehind");
        }
        this.WFu();
      }
      if (s && e.EntityType !== 2) {
        if (i?.IsValid && s) {
          this.uOu?.(t);
        } else {
          this.uOu?.(0);
        }
      } else {
        this.uOu?.(-1);
      }
    };
    this.$Yl = i => {
      this.ERu(false, this.VFu);
      this.Pjc();
      this.pGu.GetRootItem().SetUIActive(false);
      this.CGu.GetRootItem().SetUIActive(false);
      this.uOu?.(-1);
    };
    this.XTu = (i, e) => {
      this.yRu = e;
      this.Pjc();
      this.$Fu();
    };
    this.q1u = i => {
      return new LguiUtil_1.TableTextArgNew(i.Name);
    };
    this.Fpu = () => {
      this.Opu = !this.Opu;
      this.Pjc();
      this.$Fu();
    };
    this.YTu = () => {
      this.pUt = !this.pUt;
      this.Pjc();
      this.$Fu();
    };
    this.dV1 = () => {
      this.uOu?.(-1);
      this.$Fu();
      this.CloseMe();
    };
    this.XGu = i => {
      if (i === "Close") {
        this.CGu?.SetUiActive(false);
      }
    };
    this.YGu = i => {
      if (i === "Close") {
        this.pGu?.SetUiActive(false);
      }
    };
    this.DOu = () => {
      var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Farm_ShowAllAnimal", i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIText], [1, UE.UITexture], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [0, UE.UIButtonComponent], [6, UE.UIExtendToggle], [7, UE.UIExtendToggle], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.dV1], [7, this.Fpu], [6, this.YTu], [10, this.dV1]];
  }
  async OnBeforeStartAsync() {
    this.uOu = this.OpenParam;
    this.tOu = new FloroRanchTipData_1.FloroRanchTipData();
    this.Bpu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.h_u);
    var i = [];
    var e = this.GetItem(9);
    this.pGu = new FloroRanchTerrainTipItem_1.FloroRanchTerrainTipItem();
    i.push(this.pGu.CreateByResourceIdAsync("PnlMapInfo", e, false));
    this.CGu = new FloroRanchCommonTipItem_1.FloroRanchCommonTipItem();
    i.push(this.CGu.CreateByResourceIdAsync("PnlCardItemInfo", e, false));
    this.BSi = new CommonDropDown_1.CommonDropDown(this.GetItem(5), i => new OneTextDropDownItem_1.OneTextDropDownItem(i), i => new OneTextTitleItem_1.OneTextTitleItem(i));
    i.push(this.BSi.Init());
    await Promise.all(i);
    this.vGu = new LevelSequencePlayer_1.LevelSequencePlayer(this.CGu.GetRootItem());
    this.vGu.BindSequenceCloseEvent(this.XGu);
    this.yGu = new LevelSequencePlayer_1.LevelSequencePlayer(this.pGu.GetRootItem());
    this.yGu.BindSequenceCloseEvent(this.YGu);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.RefreshLastIncomeEntityList();
    this.Opu = false;
    this.pUt = true;
    this.GetText(2).SetText("" + ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetLastDayIncome());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Farm_ShowAllAnimal", ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount);
    this.SetTextureByPath(ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(1).GetSmallIcon(), this.GetTexture(1));
    this.Pjc();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.DOu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.DOu);
  }
  OnStart() {
    var i = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchFilterTypeConfigList();
    if (i.length <= 0) {
      this.BSi.SetUiActive(false);
    } else {
      this.yRu = i[0];
      this.BSi.InitScroll(i, this.q1u, 0);
      this.BSi.SetShowType(1);
      this.BSi.SetOnSelectCall(this.XTu);
    }
  }
  aWt(i) {
    this.ERu(false, this.VFu);
    if (i < 0 || i >= this.ypt.length || i === this.VFu) {
      this.VFu = -1;
    } else {
      this.VFu = i;
    }
    this.ERu(true, i);
  }
  $Fu() {
    this.aWt(-1);
    this.WFu();
    this.uOu?.(-1);
  }
  QFu(e) {
    var i = e.EntityType;
    var t = e.CheckGetComponent(0).Point;
    switch (i) {
      case 1:
        {
          let i = undefined;
          if (t !== -1) {
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTerrainEntityByPoint(t);
          }
          this.tOu.ChangeTipInfo(1, e, i);
        }
        break;
      case 0:
        {
          let i = undefined;
          if (t !== -1) {
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(t);
          }
          this.tOu.ChangeTipInfo(1, i, e);
        }
        break;
      case 2:
        this.tOu.ChangeTipInfo(2, e, undefined);
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "SetTipType Invalid entity type:", ["entityType", i]);
        }
    }
  }
  jt_(i) {
    this.QFu(i);
    var i = this.tOu.LastMainEntityData;
    var e = this.tOu.LastSubEntityData;
    var t = this.tOu.MainEntityData;
    var s = this.tOu.SubEntityData;
    var h = this.tOu.LastTipType;
    var o = this.tOu.TipType;
    var h = h === 0 || o === 0;
    if (t) {
      this.MGu(h);
    } else if (i) {
      this.EGu(h);
    }
    if (s) {
      this.TGu(h);
    } else if (e) {
      this.bGu(h);
    }
  }
  bGu(i = true) {
    this.yGu.PlayLevelSequenceByName("Close");
    if (!i) {
      this.yGu.EndSequenceLastFrame("Close");
      this.pGu?.SetUiActive(false);
    }
  }
  EGu(i = true) {
    this.vGu.PlayLevelSequenceByName("Close");
    if (!i) {
      this.vGu.EndSequenceLastFrame("Close");
      this.CGu?.SetUiActive(false);
    }
  }
  TGu(i = true) {
    var e = this.tOu.SubEntityData;
    this.pGu.RefreshInfoTipByEntity(e);
    var e = this.tOu.MainEntityData;
    this.NFu(e ? FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_SHORT : FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_HIGHER);
    this.yGu.PlayLevelSequenceByName("Start");
    if (!i) {
      this.yGu.EndSequenceLastFrame("Start");
    }
  }
  MGu(i = true) {
    var e = this.tOu.MainEntityData;
    this.CGu?.RefreshInfoTipByParam({
      TipType: 0,
      EntityData: e,
      RemoveCallback: this.$Yl,
      CurrencyData: undefined
    });
    this.vGu.PlayLevelSequenceByName("Start");
    if (!i) {
      this.vGu.EndSequenceLastFrame("Start");
    }
  }
  WFu() {
    this.tOu.ChangeTipInfo(0, undefined, undefined);
    this.EGu();
    this.bGu();
  }
  NFu(i) {
    var e = this.pGu?.GetRootItem();
    if (e) {
      e.SetHeight(i);
    }
  }
  ERu(i, e) {
    if (!(e < 0) && !(e >= this.vRu.length)) {
      this.vRu[e].SetSelectState(i);
    }
  }
  Pjc() {
    this.ypt = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetLastIncomeEntityList(this.yRu, this.pUt, this.Opu);
    this.Bpu.RefreshByData(this.ypt);
    this.GetItem(11).SetUIActive(this.ypt.length <= 0);
  }
}
exports.FloroRanchIncomeDetailView = FloroRanchIncomeDetailView;
//# sourceMappingURL=FloroRanchIncomeDetailView.js.map