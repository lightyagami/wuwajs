"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerceptionRange = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class PerceptionRange {
  constructor() {
    this.Xor = undefined;
    this.w_e = undefined;
    this.$or = undefined;
    this.Yor = undefined;
    this.LHo = Vector_1.Vector.Create();
    this.Jor = 0;
    this.zor = undefined;
    this.Zor = i => {
      return !!this.Xor && this.Xor(i);
    };
    this.err = i => {
      if (this.zor) {
        this.zor.add(i.Id);
      }
      if (this.w_e) {
        this.w_e(i);
      }
    };
    this.trr = i => {
      if (this.zor) {
        this.zor.delete(i.Id);
      }
      if (this.$or) {
        this.$or(i);
      }
    };
    this.irr = () => {
      if (this.Yor) {
        this.LHo.DeepCopy(this.Yor());
      }
      return this.LHo.ToUeVector();
    };
  }
  InitStatic(i, t, s, o = false, h = undefined, e = undefined, r = undefined) {
    if (this.Jor !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Perception", 36, "重复初始化静态感知范围");
      }
    } else if (o || e || r) {
      if (o) {
        this.zor = new Set();
      }
      this.Xor = h;
      this.w_e = e;
      this.$or = r;
      this.Jor = cpp_1.FKuroPerceptionInterface.AddStaticPerceptionRange(i.ToUeVector(), t, s, this, this.Xor ? this.Zor : undefined, this.w_e ? this.err : undefined, this.$or ? this.trr : undefined);
      if (this.Jor === 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Perception", 36, "初始化静态感知范围失败");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Perception", 36, "初始化的静态感知范围没有意义");
    }
  }
  InitDynamic(i, t, s, o = undefined, h = undefined, e = undefined, r = undefined, c = false) {
    if (i) {
      if (t <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Perception", 36, "初始化动态感知范围时，感知范围大小非法");
        }
      } else if (this.Jor !== 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Perception", 36, "重复初始化动态感知范围");
        }
      } else if (c || o || h) {
        this.Yor = r;
        this.Xor = e;
        this.w_e = o;
        this.$or = h;
        this.Jor = cpp_1.FKuroPerceptionInterface.AddDynamicPerceptionRange(i, t, s, this, this.irr, this.Xor ? this.Zor : undefined, this.w_e ? this.err : undefined, this.$or ? this.trr : undefined);
        if (this.Jor === 0 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Perception", 36, "初始化动态感知范围失败");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Perception", 36, "初始化的动态感知范围没有意义");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Perception", 36, "初始化动态感知范围绑定的实体Token非法");
    }
  }
  Clear() {
    this.Xor = undefined;
    this.w_e = undefined;
    this.$or = undefined;
    this.Yor = undefined;
    this.LHo.Reset();
    this.zor = undefined;
    if (this.Jor !== 0) {
      cpp_1.FKuroPerceptionInterface.RemovePerceptionRange(this.Jor);
      this.Jor = 0;
    }
  }
  UpdateRange(i) {
    if (this.Jor !== 0) {
      if (i <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Perception", 36, "更新动态感知范围大小时，感知范围大小非法");
        }
      } else {
        cpp_1.FKuroPerceptionInterface.UpdatePerceptionRange(this.Jor, i);
      }
    }
  }
}
exports.PerceptionRange = PerceptionRange;
//# sourceMappingURL=PerceptionRange.js.map