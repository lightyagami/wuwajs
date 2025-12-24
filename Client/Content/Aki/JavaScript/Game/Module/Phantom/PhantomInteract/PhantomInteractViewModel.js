"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractDetailViewModel = exports.PhantomInteractEditViewModel = exports.PhantomInteractEditGridViewModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const PhantomInteractDefine_1 = require("./PhantomInteractDefine");
class PhantomInteractEditGridViewModel {
  constructor(t) {
    this.Pe = undefined;
    this.IsSelected = false;
    this.GridIndex = -1;
    this.IsInArea = false;
    this.Pe = t;
  }
  get MonsterId() {
    return this.Pe?.MonsterId ?? 0;
  }
  get MonsterInfoId() {
    return this.Pe?.MonsterInfoId ?? 0;
  }
  get SkinIds() {
    return this.Pe?.SkinIds ?? [];
  }
  get EquippedSkin() {
    return this.Pe?.EquippedSkin ?? 0;
  }
  get IsSpecial() {
    return this.Pe?.IsSpecial ?? false;
  }
  get Name() {
    return this.Pe?.Name ?? undefined;
  }
  get Cost() {
    return this.Pe?.Cost ?? 0;
  }
  get IsUnlocked() {
    return this.Pe?.IsUnlocked ?? false;
  }
  get InteractAreaId() {
    return this.Pe?.InteractAreaId ?? 0;
  }
  get InSlotIndex() {
    return this.Pe?.InSlotIndex ?? -1;
  }
  get IconPath() {
    return this.Pe?.IconPath ?? undefined;
  }
  get HasSkin() {
    return this.Pe?.HasSkin ?? false;
  }
  get GetWayConfigId() {
    return this.Pe?.GetWayConfigId ?? 0;
  }
  get SortId() {
    return this.Pe?.SortId ?? 0;
  }
}
exports.PhantomInteractEditGridViewModel = PhantomInteractEditGridViewModel;
class PhantomInteractEditViewModel {
  constructor() {
    this.SelectedItemIndex = 0;
    this.BtnState = 2;
    this.BtnAvailable = true;
    this.SelectedItemData = undefined;
    this.DetailViewModel = new PhantomInteractDetailViewModel();
    this.ShowDetail = false;
    this.GridsDataList = [];
    this.SelectedGridItemIndex = [-1, -1];
    this.GridViewModelMap = new Map();
    this.qJf = [];
    this.vEf = undefined;
    this.b5d = new PhantomInteractDefine_1.PhantomInteractInfoData();
    this.yEf = undefined;
    this.SEf = undefined;
    this.OJf = [];
    this.EEf = [];
    this.IEf = [];
    this.TEf = [];
    this.qUf = new Set();
    this.agf = undefined;
    this.bEf = undefined;
    this.wEf = undefined;
    this._9f = undefined;
    this.REf = (t, ...i) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PhantomInteraction", 95, t, ...i);
      }
    };
  }
  ConfirmEquipHandler() {
    if (this.agf) {
      this.agf(this);
    }
  }
  SetConfirmEquipHandler(t) {
    this.agf = t;
  }
  EquipRecommendHandler() {
    if (this.bEf) {
      this.bEf(this);
    }
  }
  SetEquipRecommendHandler(t) {
    this.bEf = t;
  }
  EquipRecommendCallback() {
    if (this._9f) {
      this._9f();
      this._9f = undefined;
    }
  }
  SetEquipRecommendCallback(t) {
    this._9f = t;
  }
  MoveNextSkinHandler() {
    if (this.wEf) {
      this.wEf(this);
    }
  }
  SetMoveNextSkinHandler(t) {
    this.wEf = t;
  }
  get SelectedGridData() {
    return this.vEf;
  }
  GetFilteredRecommendedIdList() {
    return this.IEf;
  }
  InitData(t, i) {
    this.b5d = t;
    var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    this.EEf = this.OUf(e);
    this.PEf(t.GridItemDataList);
    this.RefreshFilterGridViewData();
    this.SelectItem(i);
    if (this.SelectedItemData?.MonsterId === 0 && (e = this.GridsDataList?.at(0)?.MonsterIds?.at(0)) && e > 0) {
      this.SelectGrid(e);
    }
  }
  SelectItem(t) {
    this.SelectedItemIndex = t;
    this.SelectedItemData = this.b5d.EquippedVisionData[t];
    if (this.SelectedItemData.MonsterId === 0) {
      this.Wjt();
    } else {
      this.SelectGrid(this.SelectedItemData.MonsterId);
    }
    this.brd();
  }
  SelectGrid(t) {
    this.SelectedGridItemIndex = this.AEf(t);
    if (this.SelectedItemData?.MonsterId === 0) {
      this.BtnState = 2;
    } else {
      this.BtnState = 3;
    }
    this.Wjt();
    this.brd();
  }
  FindGridIndexInMultiTemplate(i) {
    var t;
    if (this.IEf.length <= 0) {
      return this.TEf.findIndex(t => t === i);
    } else if ((t = this.IEf.findIndex(t => t === i)) >= 0) {
      return t + 1;
    } else if ((t = this.TEf.findIndex(t => t === i)) >= 0) {
      return t + this.IEf.length + 2;
    } else {
      return -1;
    }
  }
  brd() {
    var t;
    if (this.SelectedGridData === undefined) {
      this.BtnState = 0;
      this.BtnAvailable = false;
    } else {
      this.BtnAvailable = this.SelectedGridData.IsUnlocked;
      if (this.SelectedItemData?.MonsterId === 0) {
        this.BtnState = 2;
      } else {
        t = this.SelectedItemData?.MonsterId === this.SelectedGridData?.MonsterId;
        this.BtnState = t ? 1 : 3;
      }
    }
  }
  PEf(t) {
    this.GridViewModelMap.clear();
    for (const h of t) {
      var i = new PhantomInteractEditGridViewModel(h);
      i.IsInArea = this.GUf(h.InteractAreaId);
      this.GridViewModelMap.set(h.MonsterId, i);
    }
    var e;
    var s;
    for (const r of this.EEf) {
      if (!this.GridViewModelMap.has(r)) {
        (e = new PhantomInteractDefine_1.PhantomInteractGridData()).LoadLockData(r);
        (s = new PhantomInteractEditGridViewModel(e)).IsInArea = true;
        this.GridViewModelMap.set(e.MonsterId, s);
      }
    }
    this.qJf = [...this.GridViewModelMap.values()].sort((t, i) => t.SortId - i.SortId).map(t => t.MonsterId);
  }
  AEf(e) {
    if (!this.GridsDataList) {
      return [-1, -1];
    }
    let s = undefined;
    for (let i = 0; i < this.GridsDataList.length; i++) {
      var h = this.GridsDataList[i];
      for (let t = 0; t < h.MonsterIds.length; t++) {
        var r = h.MonsterIds[t];
        var n = this.GridViewModelMap.get(r);
        if (n && (n.IsSelected = r === e, !s) && n.IsSelected) {
          s = [i, t];
          this.vEf = n;
        }
      }
    }
    return s ?? [-1, -1];
  }
  Wjt() {
    let t = undefined;
    if (this.SelectedGridData) {
      t = this.SelectedGridData.MonsterId;
    } else if (this.SelectedItemData) {
      t = this.SelectedItemData.MonsterId;
    }
    if (t) {
      this.ShowDetail = true;
      this.DetailViewModel.RefreshData(this.SelectedGridData);
    } else {
      this.ShowDetail = false;
    }
  }
  SetFilterCost(t) {
    this.yEf = t > 0 ? t : undefined;
  }
  SetFilterIsSpecial(t) {
    let i = undefined;
    if (t === 1) {
      i = true;
    } else if (t === 2) {
      i = false;
    }
    this.SEf = i;
  }
  RefreshFilterGridViewData() {
    this.OJf.length = 0;
    this.IEf.length = 0;
    let t = this.TEf.length = 0;
    for (const s of this.qJf) {
      var i = this.GridViewModelMap.get(s);
      if (i && this.DEf(i)) {
        this.OJf.push(i.MonsterId);
        if (this.GUf(i.InteractAreaId)) {
          this.IEf.push(i.MonsterId);
          if (i.IsUnlocked) {
            t++;
          }
        } else {
          this.TEf.push(i.MonsterId);
        }
      }
    }
    if (this.IEf.length === 0) {
      this.GridsDataList = [{
        TitleType: 0,
        MonsterIds: this.TEf
      }];
    } else {
      this.GridsDataList = [{
        TitleType: t > 0 ? 1 : 2,
        MonsterIds: this.IEf
      }];
      if (this.TEf.length > 0) {
        this.GridsDataList.push({
          TitleType: 3,
          MonsterIds: this.TEf
        });
      }
    }
    var e = this.GridsDataList?.at(0)?.MonsterIds?.at(0);
    if (e && e > 0) {
      this.SelectGrid(e);
    }
  }
  DEf(t) {
    return (this.yEf === undefined || t.Cost === this.yEf) && (this.SEf === undefined || t.IsSpecial === this.SEf);
  }
  OUf(t) {
    this.qUf.clear();
    t = ModelManager_1.ModelManager.AreaModel.GetAllAreaIdInheritableById(t);
    for (const h of t) {
      this.qUf.add(h);
    }
    var i;
    var e = [];
    for (const r of t) {
      var s = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashRewardListByAreaId(r);
      if (s) {
        e.push(...s);
      }
    }
    if (e) {
      i = e.map(t => t.MonsterId);
      this.REf("[声骸显像]加载当前地区推荐声骸", ["当前所属的所有区域", t], ["推荐声骸列表", i]);
      return i;
    } else {
      return [];
    }
  }
  GUf(t) {
    return this.qUf.has(t);
  }
}
exports.PhantomInteractEditViewModel = PhantomInteractEditViewModel;
class PhantomInteractDetailViewModel {
  constructor() {
    this.MonsterId = 0;
    this.IconPath = undefined;
    this.Name = undefined;
    this.IsSpecial = false;
    this.IsInArea = false;
    this.IsUnlocked = false;
    this.SkillPicturePath = undefined;
    this.SkillName = undefined;
    this.SkillDescription = undefined;
    this.GetWayItemData = undefined;
    this.Mwf = 0;
  }
  get NeedGetWay() {
    return this.IsSpecial && !this.IsUnlocked;
  }
  RefreshData(t) {
    if (t) {
      this.MonsterId = t.MonsterId;
      var i = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(this.MonsterId);
      if (i && (this.Name = t.Name, this.IconPath = t.IconPath, this.IsSpecial = t.IsSpecial, this.IsInArea = t.IsInArea, this.IsUnlocked = t.IsUnlocked, this.SkillPicturePath = i.SpecialSkillPicturePath, this.SkillName = i.SpecialSkillName, this.SkillDescription = i.SpecialSkillDescription, this.NeedGetWay) && this.Mwf !== t.GetWayConfigId && (this.GetWayItemData = undefined, this.Mwf = t.GetWayConfigId, this.Mwf > 0)) {
        const e = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(this.Mwf);
        if (e) {
          this.GetWayItemData = {
            Id: e.Id,
            Type: 2,
            SortIndex: 0,
            Text: "PhantomDisplay_AccessTips",
            Function: () => {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.Id);
            }
          };
        }
      }
    }
  }
}
exports.PhantomInteractDetailViewModel = PhantomInteractDetailViewModel;
//# sourceMappingURL=PhantomInteractViewModel.js.map