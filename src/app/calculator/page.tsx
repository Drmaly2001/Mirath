"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { HeirCounter } from "@/components/calculator/heir-counter";
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  RotateCcw,
  AlertTriangle,
  BookOpen,
  Scale,
  Printer,
  Download,
  Share2,
  Check,
  Info,
  ChevronDown,
  Landmark,
  CreditCard,
  Scroll,
  Flower2,
  Heart,
  Users,
  Baby,
  UserRound,
  Crown,
  Home,
  MapPin,
  Car,
  Gem,
  TrendingUp,
  Package,
  Banknote,
  Plus,
  Trash2,
  FileText,
} from "lucide-react";
import { calculateInheritance } from "@/lib/fiqh/engine";
import { formatCurrency, fractionToArabicName } from "@/lib/utils";
import type {
  EstateInput,
  HeirInput,
  HeirType,
  CalculationResult,
  ShareResult,
  AssetType,
  Asset,
  GoldEntry,
  SilverEntry,
} from "@/lib/fiqh/types";
import { HEIR_LABELS, ASSET_TYPE_LABELS } from "@/lib/fiqh/types";
import { CURRENCIES, REGION_LABELS, type CurrencyCode } from "@/lib/currencies";
import { toNumber } from "@/lib/fiqh/fraction";

type Step = "estate" | "spouse" | "children" | "parents" | "siblings" | "results";
const STEPS: Step[] = ["estate", "spouse", "children", "parents", "siblings"];

const STEP_TITLES: Record<Step, string> = {
  estate: "التركة",
  spouse: "الزوجية",
  children: "الأبناء",
  parents: "الأصول",
  siblings: "الحواشي",
  results: "النتائج",
};

export default function CalculatorPage() {
  const [step, setStep] = useState<Step>("estate");
  const [estate, setEstate] = useState<EstateInput>({
    totalValue: 0,
    assets: [],
    currency: "SAR",
    debts: 0,
    wasiyya: 0,
    funeralCosts: 0,
  });
  const [heirsMap, setHeirsMap] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateHeir = (type: string, count: number) => {
    setHeirsMap((prev) => {
      const next = { ...prev };
      if (count === 0) {
        delete next[type];
      } else {
        next[type] = count;
      }
      return next;
    });
  };

  const getHeir = (type: string) => heirsMap[type] ?? 0;

  const currentStepIndex = STEPS.indexOf(step);

  const goNext = () => {
    if (step === "siblings") {
      handleCalculate();
    } else {
      const idx = STEPS.indexOf(step);
      if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
    }
  };

  const goPrev = () => {
    if (step === "results") {
      setStep("siblings");
      setResult(null);
      setError(null);
    } else {
      const idx = STEPS.indexOf(step);
      if (idx > 0) setStep(STEPS[idx - 1]);
    }
  };

  const handleCalculate = () => {
    setError(null);
    const heirs: HeirInput[] = Object.entries(heirsMap)
      .filter(([, count]) => count > 0)
      .map(([type, count]) => ({ type: type as HeirType, count }));

    if (heirs.length === 0) {
      setError("يجب إدخال وارث واحد على الأقل");
      return;
    }
    if (estate.totalValue <= 0) {
      setError("قيمة التركة يجب أن تكون أكبر من صفر");
      return;
    }

    try {
      const res = calculateInheritance(estate, heirs);
      setResult(res);
      setStep("results");
    } catch (e) {
      setError(e instanceof Error ? e.message : "حدث خطأ في الحساب");
    }
  };

  const handleReset = () => {
    setStep("estate");
    setEstate({ totalValue: 0, assets: [], currency: "SAR", debts: 0, wasiyya: 0, funeralCosts: 0 });
    setHeirsMap({});
    setResult(null);
    setError(null);
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-2xl px-4">
          {/* Progress */}
          {step !== "results" && (
            <div className="mb-6">
              <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                {STEPS.map((s, i) => (
                  <span
                    key={s}
                    className={
                      i <= currentStepIndex ? "font-semibold text-primary" : ""
                    }
                  >
                    {STEP_TITLES[s]}
                  </span>
                ))}
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{
                    width: `${((currentStepIndex + 1) / STEPS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step Content */}
          {step === "estate" && (
            <EstateStep estate={estate} onChange={setEstate} />
          )}
          {step === "spouse" && (
            <SpouseStep heirsMap={heirsMap} updateHeir={updateHeir} getHeir={getHeir} />
          )}
          {step === "children" && (
            <ChildrenStep updateHeir={updateHeir} getHeir={getHeir} />
          )}
          {step === "parents" && (
            <ParentsStep updateHeir={updateHeir} getHeir={getHeir} />
          )}
          {step === "siblings" && (
            <SiblingsStep updateHeir={updateHeir} getHeir={getHeir} />
          )}
          {step === "results" && result && (
            <ResultsView result={result} netEstate={result.netEstate} />
          )}

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            {step !== "estate" ? (
              <Button variant="outline" onClick={goPrev} className="gap-2">
                <ChevronRight className="h-4 w-4" />
                السابق
              </Button>
            ) : (
              <div />
            )}

            {step === "results" ? (
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                حساب جديد
              </Button>
            ) : (
              <Button onClick={goNext} className="gap-2">
                {step === "siblings" ? (
                  <>
                    <Calculator className="h-4 w-4" />
                    احسب
                  </>
                ) : (
                  <>
                    التالي
                    <ChevronLeft className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// === Step Components ===

const ASSET_ICONS: Record<AssetType, typeof Landmark> = {
  cash: Banknote,
  real_estate: Home,
  land: MapPin,
  vehicle: Car,
  gold: Gem,
  silver: Gem,
  stocks: TrendingUp,
  other: Package,
};

const ASSET_PLACEHOLDERS: Record<AssetType, string> = {
  cash: "مثال: رصيد بنك الراجحي",
  real_estate: "مثال: شقة في الرياض",
  land: "مثال: أرض في جدة",
  vehicle: "مثال: كامري 2023",
  gold: "",
  silver: "",
  stocks: "مثال: أسهم أرامكو",
  other: "وصف الأصل",
};

function EstateStep({
  estate,
  onChange,
}: {
  estate: EstateInput;
  onChange: (e: EstateInput) => void;
}) {
  const [mode, setMode] = useState<"total" | "detailed">(
    estate.assets.length > 0 ? "detailed" : "total"
  );
  const currencySymbol = CURRENCIES[estate.currency as CurrencyCode]?.symbol ?? "ر.س";

  const afterDebts = estate.totalValue - estate.debts - estate.funeralCosts;
  const maxWasiyya = afterDebts > 0 ? Math.floor(afterDebts / 3) : 0;
  const wasiyyaExceeded = estate.wasiyya > maxWasiyya && afterDebts > 0;
  const net = Math.max(0, afterDebts - estate.wasiyya);

  const handleWasiyyaChange = (value: number) => {
    if (value > maxWasiyya && afterDebts > 0) {
      onChange({ ...estate, wasiyya: maxWasiyya });
    } else {
      onChange({ ...estate, wasiyya: value });
    }
  };

  const addAsset = () => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      type: "cash",
      description: "",
      estimatedValue: 0,
    };
    const newAssets = [...estate.assets, newAsset];
    const total = newAssets.reduce((s, a) => s + a.estimatedValue, 0);
    onChange({ ...estate, assets: newAssets, totalValue: total });
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    const newAssets = estate.assets.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    );
    const total = newAssets.reduce((s, a) => s + a.estimatedValue, 0);
    onChange({ ...estate, assets: newAssets, totalValue: total });
  };

  const removeAsset = (id: string) => {
    const newAssets = estate.assets.filter((a) => a.id !== id);
    const total = newAssets.reduce((s, a) => s + a.estimatedValue, 0);
    onChange({ ...estate, assets: newAssets, totalValue: total });
  };

  const switchMode = (newMode: "total" | "detailed") => {
    if (newMode === "total" && mode === "detailed") {
      // الاحتفاظ بالمجموع وتفريغ الأصول
      const total = estate.assets.reduce((s, a) => s + a.estimatedValue, 0);
      onChange({ ...estate, assets: [], totalValue: total });
    } else if (newMode === "detailed" && mode === "total") {
      onChange({ ...estate, assets: [] });
    }
    setMode(newMode);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-primary" />
          إدخال التركة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* اختيار العملة */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm">
            <Banknote className="h-4 w-4 text-primary/70" />
            العملة
          </Label>
          <select
            value={estate.currency}
            onChange={(e) => onChange({ ...estate, currency: e.target.value })}
            className="h-11 w-full rounded-lg border border-border/60 bg-white px-3 text-sm"
          >
            {Object.entries(REGION_LABELS).map(([region, regionLabel]) => (
              <optgroup key={region} label={regionLabel}>
                {Object.entries(CURRENCIES)
                  .filter(([, info]) => info.region === region)
                  .map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.label} ({info.symbol})
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>

        <Separator />

        {/* اختيار طريقة الإدخال */}
        <div className="flex gap-2 rounded-lg bg-muted/50 p-1">
          <button
            onClick={() => switchMode("total")}
            className={`flex-1 rounded-md px-3 py-2.5 text-center transition-colors ${
              mode === "total"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-sm font-medium">مبلغ إجمالي</span>
            <span className="mt-0.5 block text-[11px] text-muted-foreground">
              التركة نقدية فقط
            </span>
          </button>
          <button
            onClick={() => switchMode("detailed")}
            className={`flex-1 rounded-md px-3 py-2.5 text-center transition-colors ${
              mode === "detailed"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-sm font-medium">تفصيل الأصول</span>
            <span className="mt-0.5 block text-[11px] text-muted-foreground">
              نقود + عقارات + ذهب + أخرى
            </span>
          </button>
        </div>

        {mode === "total" ? (
          /* === الوضع البسيط: مبلغ إجمالي === */
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              <Landmark className="h-4 w-4 text-primary/70" />
              إجمالي قيمة التركة
            </Label>
            <Input
              type="number"
              min={0}
              placeholder="أدخل القيمة"
              className="h-12 text-base"
              value={estate.totalValue || ""}
              onChange={(e) =>
                onChange({ ...estate, totalValue: Number(e.target.value) || 0 })
              }
            />
          </div>
        ) : (
          /* === وضع تفصيل الأصول === */
          <div className="space-y-3">
            {estate.assets.map((asset) => {
              const AssetIcon = ASSET_ICONS[asset.type];
              return (
                <div
                  key={asset.id}
                  className="rounded-xl border border-border/60 bg-white p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <AssetIcon className="h-4 w-4" />
                      </div>
                      <select
                        value={asset.type}
                        onChange={(e) =>
                          updateAsset(asset.id, { type: e.target.value as AssetType })
                        }
                        className="rounded-md border-0 bg-transparent text-sm font-medium text-foreground focus:ring-0"
                      >
                        {Object.entries(ASSET_TYPE_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => removeAsset(asset.id)}
                      className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {asset.type === "gold" ? (
                    <GoldEvaluator
                      asset={asset}
                      currencySymbol={currencySymbol}
                      onUpdate={(updates) => updateAsset(asset.id, updates)}
                    />
                  ) : asset.type === "silver" ? (
                    <SilverEvaluator
                      asset={asset}
                      currencySymbol={currencySymbol}
                      onUpdate={(updates) => updateAsset(asset.id, updates)}
                    />
                  ) : (
                    <>
                      <Input
                        placeholder={ASSET_PLACEHOLDERS[asset.type]}
                        value={asset.description}
                        onChange={(e) =>
                          updateAsset(asset.id, { description: e.target.value })
                        }
                        className="h-10 text-sm"
                      />
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">القيمة التقديرية</Label>
                        <Input
                          type="number"
                          min={0}
                          placeholder="0"
                          className="h-11 text-base"
                          value={asset.estimatedValue || ""}
                          onChange={(e) =>
                            updateAsset(asset.id, {
                              estimatedValue: Number(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            <Button
              variant="outline"
              onClick={addAsset}
              className="w-full gap-2 border-dashed"
            >
              <Plus className="h-4 w-4" />
              إضافة أصل
            </Button>

            {estate.assets.length > 0 && (
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">إجمالي الأصول</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(estate.totalValue)}
                </p>
              </div>
            )}
          </div>
        )}

        <Separator />
        <p className="text-sm font-medium text-muted-foreground">الخصومات المسبقة</p>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm">
            <Flower2 className="h-4 w-4 text-muted-foreground" />
            تكاليف التجهيز والدفن
          </Label>
          <Input
            type="number"
            min={0}
            placeholder="0"
            className="h-12 text-base"
            value={estate.funeralCosts || ""}
            onChange={(e) =>
              onChange({ ...estate, funeralCosts: Number(e.target.value) || 0 })
            }
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-red-400" />
            الديون
          </Label>
          <Input
            type="number"
            min={0}
            placeholder="0"
            className="h-12 text-base"
            value={estate.debts || ""}
            onChange={(e) =>
              onChange({ ...estate, debts: Number(e.target.value) || 0 })
            }
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm">
            <Scroll className="h-4 w-4 text-accent-foreground" />
            الوصية (بحد أقصى الثلث)
          </Label>
          <Input
            type="number"
            min={0}
            placeholder="0"
            className="h-12 text-base"
            value={estate.wasiyya || ""}
            onChange={(e) => handleWasiyyaChange(Number(e.target.value) || 0)}
          />
          {afterDebts > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              الحد الأقصى للوصية: {formatCurrency(maxWasiyya)} (ثلث التركة بعد الديون)
            </p>
          )}
          {wasiyyaExceeded && (
            <p className="mt-1 text-xs font-medium text-destructive">
              تم تعديل الوصية تلقائياً — لا يجوز أن تتجاوز ثلث التركة بعد سداد الديون
            </p>
          )}
        </div>
        <Separator />
        <div className="rounded-xl bg-primary/5 p-5 text-center">
          <p className="text-sm text-muted-foreground">الصافي القابل للتوزيع</p>
          <p className="mt-1 text-3xl font-bold text-primary">
            {formatCurrency(net)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SpouseStep({
  heirsMap,
  updateHeir,
  getHeir,
}: {
  heirsMap: Record<string, number>;
  updateHeir: (t: string, c: number) => void;
  getHeir: (t: string) => number;
}) {
  const hasHusband = getHeir("husband") > 0;
  const hasWife = getHeir("wife") > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          الزوجية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          المتوفى هل هو ذكر أم أنثى؟ (إذا ترك زوجة = ذكر، إذا ترك زوجاً = أنثى)
        </p>
        <div className="space-y-3">
          <div
            className={`cursor-pointer rounded-lg border-2 p-4 transition ${
              hasHusband
                ? "border-primary bg-primary/5"
                : "border-border/60 hover:border-primary/40"
            }`}
            onClick={() => {
              if (!hasHusband) {
                updateHeir("husband", 1);
                updateHeir("wife", 0);
              } else {
                updateHeir("husband", 0);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">زوج (المتوفاة أنثى)</span>
              {hasHusband && <Badge variant="default">محدد</Badge>}
            </div>
          </div>

          <div
            className={`cursor-pointer rounded-lg border-2 p-4 transition ${
              hasWife
                ? "border-primary bg-primary/5"
                : "border-border/60 hover:border-primary/40"
            }`}
            onClick={() => {
              if (!hasWife) {
                updateHeir("wife", 1);
                updateHeir("husband", 0);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">زوجة (المتوفى ذكر)</span>
              {hasWife && <Badge variant="default">محدد</Badge>}
            </div>
          </div>

          {hasWife && (
            <HeirCounter
              label="عدد الزوجات"
              value={getHeir("wife")}
              onChange={(v) => updateHeir("wife", v)}
              min={1}
              max={4}
            />
          )}

          {!hasHusband && !hasWife && (
            <p className="text-center text-sm text-muted-foreground">
              أو تخطَّ هذه الخطوة إذا لم يكن هناك زوج/زوجة
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ChildrenStep({
  updateHeir,
  getHeir,
}: {
  updateHeir: (t: string, c: number) => void;
  getHeir: (t: string) => number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Baby className="h-5 w-5 text-primary" />
          الأبناء والبنات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <HeirCounter
          label="الأبناء (ذكور)"
          icon={<UserRound className="h-4 w-4" />}
          value={getHeir("son")}
          onChange={(v) => updateHeir("son", v)}
        />
        <HeirCounter
          label="البنات (إناث)"
          icon={<UserRound className="h-4 w-4" />}
          value={getHeir("daughter")}
          onChange={(v) => updateHeir("daughter", v)}
        />
        <Separator />
        <p className="text-xs text-muted-foreground">أبناء الابن (إن لم يكن هناك ابن مباشر)</p>
        <HeirCounter
          label="أبناء الابن"
          icon={<Baby className="h-4 w-4" />}
          value={getHeir("son_of_son")}
          onChange={(v) => updateHeir("son_of_son", v)}
        />
        <HeirCounter
          label="بنات الابن"
          icon={<Baby className="h-4 w-4" />}
          value={getHeir("daughter_of_son")}
          onChange={(v) => updateHeir("daughter_of_son", v)}
        />
      </CardContent>
    </Card>
  );
}

function ParentsStep({
  updateHeir,
  getHeir,
}: {
  updateHeir: (t: string, c: number) => void;
  getHeir: (t: string) => number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-primary" />
          الأصول (الآباء والأجداد)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <HeirCounter
          label="الأب"
          icon={<UserRound className="h-4 w-4" />}
          value={getHeir("father")}
          onChange={(v) => updateHeir("father", v)}
          max={1}
        />
        <HeirCounter
          label="الأم"
          icon={<Heart className="h-4 w-4" />}
          value={getHeir("mother")}
          onChange={(v) => updateHeir("mother", v)}
          max={1}
        />
        <Separator />
        <p className="text-xs text-muted-foreground">الأجداد (عند عدم وجود الأب/الأم)</p>
        <HeirCounter
          label="الجد لأب"
          icon={<Crown className="h-4 w-4" />}
          value={getHeir("paternal_grandfather")}
          onChange={(v) => updateHeir("paternal_grandfather", v)}
          max={1}
        />
        <HeirCounter
          label="الجدة لأب"
          icon={<Crown className="h-4 w-4" />}
          value={getHeir("paternal_grandmother")}
          onChange={(v) => updateHeir("paternal_grandmother", v)}
          max={1}
        />
        <HeirCounter
          label="الجدة لأم"
          icon={<Crown className="h-4 w-4" />}
          value={getHeir("maternal_grandmother")}
          onChange={(v) => updateHeir("maternal_grandmother", v)}
          max={1}
        />
      </CardContent>
    </Card>
  );
}

function SiblingsStep({
  updateHeir,
  getHeir,
}: {
  updateHeir: (t: string, c: number) => void;
  getHeir: (t: string) => number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          الحواشي (الإخوة والأخوات)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">الأشقاء</p>
        <HeirCounter
          label="أخ شقيق"
          icon={<Users className="h-4 w-4" />}
          value={getHeir("full_brother")}
          onChange={(v) => updateHeir("full_brother", v)}
        />
        <HeirCounter
          label="أخت شقيقة"
          icon={<Users className="h-4 w-4" />}
          value={getHeir("full_sister")}
          onChange={(v) => updateHeir("full_sister", v)}
        />
        <Separator />
        <p className="text-xs font-medium text-muted-foreground">لأب</p>
        <HeirCounter
          label="أخ لأب"
          icon={<UserRound className="h-4 w-4" />}
          value={getHeir("paternal_brother")}
          onChange={(v) => updateHeir("paternal_brother", v)}
        />
        <HeirCounter
          label="أخت لأب"
          icon={<UserRound className="h-4 w-4" />}
          value={getHeir("paternal_sister")}
          onChange={(v) => updateHeir("paternal_sister", v)}
        />
        <Separator />
        <p className="text-xs font-medium text-muted-foreground">لأم</p>
        <HeirCounter
          label="أخ لأم"
          icon={<Heart className="h-4 w-4" />}
          value={getHeir("maternal_brother")}
          onChange={(v) => updateHeir("maternal_brother", v)}
        />
        <HeirCounter
          label="أخت لأم"
          icon={<Heart className="h-4 w-4" />}
          value={getHeir("maternal_sister")}
          onChange={(v) => updateHeir("maternal_sister", v)}
        />
      </CardContent>
    </Card>
  );
}

// === Results ===

function ResultsView({
  result,
  netEstate,
}: {
  result: CalculationResult;
  netEstate: number;
}) {
  const printRef = useRef<HTMLDivElement>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const buildPlainText = useCallback(() => {
    const lines: string[] = [
      "══════════════════════════════",
      "    ميراث — نتائج توزيع التركة",
      "══════════════════════════════",
      "",
      `صافي التركة: ${formatCurrency(netEstate)}`,
      "",
    ];

    if (result.specialCase) {
      lines.push(`حالة خاصة: ${result.specialCase.nameArabic}`);
      lines.push("");
    }
    if (result.awlApplied && result.awlDetails) {
      lines.push(`عول: أصل المسألة ${result.awlDetails.originalBase} → ${result.awlDetails.newBase}`);
      lines.push("");
    }
    if (result.raddApplied) {
      lines.push("رد: الفائض أُعيد توزيعه على أصحاب الفروض");
      lines.push("");
    }

    lines.push("─── الأنصبة ───");
    for (const share of result.shares) {
      const pct = (toNumber(share.fraction) * 100).toFixed(2);
      const name = HEIR_LABELS[share.heir];
      const countLabel = share.count > 1 ? ` (${share.count})` : "";
      lines.push(
        `${name}${countLabel}: ${share.fraction.num}/${share.fraction.den} (${pct}%) = ${formatCurrency(share.amount)}`
      );
      if (share.count > 1) {
        lines.push(`   لكل فرد: ${formatCurrency(share.perPersonAmount)}`);
      }
    }

    if (result.hajbList.length > 0) {
      lines.push("");
      lines.push("─── المحجوبون ───");
      for (const h of result.hajbList) {
        lines.push(`${HEIR_LABELS[h.heir]}: ${h.explanation}`);
      }
    }

    if (result.warnings.length > 0) {
      lines.push("");
      lines.push("─── تنبيهات ───");
      for (const w of result.warnings) {
        lines.push(`⚠ ${w}`);
      }
    }

    lines.push("");
    lines.push("══════════════════════════════");
    lines.push("   تم الحساب بواسطة تطبيق ميراث");
    lines.push(`   ${new Date().toLocaleDateString("ar-SA")}`);

    return lines.join("\n");
  }, [result, netEstate]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const text = buildPlainText();
    const blob = new Blob(["\uFEFF" + text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ميراث-توزيع-التركة-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    // تسجيل خط يدعم العربية
    doc.setFont("Helvetica");
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // عنوان
    doc.setFontSize(18);
    doc.setTextColor(6, 95, 70);
    doc.text("Mirath", pageWidth / 2, y, { align: "center" });
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(new Date().toLocaleDateString("ar-SA"), pageWidth / 2, y, { align: "center" });
    y += 12;

    // خط فاصل
    doc.setDrawColor(6, 95, 70);
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    // صافي التركة
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Net Estate: ${formatCurrency(netEstate)}`, pageWidth / 2, y, { align: "center" });
    y += 12;

    // تنبيهات
    if (result.awlApplied && result.awlDetails) {
      doc.setFontSize(9);
      doc.setTextColor(180, 100, 0);
      doc.text(`Awl: ${result.awlDetails.originalBase} -> ${result.awlDetails.newBase}`, pageWidth / 2, y, { align: "center" });
      y += 8;
    }
    if (result.raddApplied) {
      doc.setFontSize(9);
      doc.setTextColor(180, 100, 0);
      doc.text("Radd applied", pageWidth / 2, y, { align: "center" });
      y += 8;
    }

    // جدول الأنصبة
    doc.setFontSize(11);
    doc.setTextColor(0);

    // رؤوس الأعمدة
    const col1 = 20;
    const col2 = 70;
    const col3 = 110;
    const col4 = 150;

    doc.setFont("Helvetica", "bold");
    doc.text("Heir", col1, y);
    doc.text("Share", col2, y);
    doc.text("Percentage", col3, y);
    doc.text("Amount", col4, y);
    y += 2;
    doc.setLineWidth(0.2);
    doc.line(col1, y, pageWidth - 20, y);
    y += 6;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);

    for (const share of result.shares) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      const name = HEIR_LABELS[share.heir];
      const countLabel = share.count > 1 ? ` (${share.count})` : "";
      const pct = (toNumber(share.fraction) * 100).toFixed(2) + "%";
      const frac = `${share.fraction.num}/${share.fraction.den}`;

      doc.text(name + countLabel, col1, y);
      doc.text(frac, col2, y);
      doc.text(pct, col3, y);
      doc.text(formatCurrency(share.amount), col4, y);

      if (share.count > 1) {
        y += 5;
        doc.setFontSize(8);
        doc.setTextColor(120);
        doc.text(`(${formatCurrency(share.perPersonAmount)} per person)`, col4, y);
        doc.setFontSize(10);
        doc.setTextColor(0);
      }
      y += 8;
    }

    // المحجوبون
    if (result.hajbList.length > 0) {
      y += 4;
      doc.setLineWidth(0.2);
      doc.line(col1, y, pageWidth - 20, y);
      y += 6;
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Blocked Heirs:", col1, y);
      y += 6;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(180, 50, 50);
      for (const h of result.hajbList) {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${HEIR_LABELS[h.heir]}: ${h.explanation}`, col1, y);
        y += 6;
      }
    }

    // ذيل الصفحة
    doc.setTextColor(150);
    doc.setFontSize(8);
    doc.text("drmliAi.com — Mirath", pageWidth / 2, 287, { align: "center" });

    doc.save(`Mirath-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const handleShare = async () => {
    const text = buildPlainText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "ميراث — نتائج توزيع التركة",
          text,
        });
        return;
      } catch {
        // المستخدم ألغى المشاركة أو غير مدعوم — ننسخ بدلاً
      }
    }

    // Fallback: نسخ للحافظة
    try {
      await navigator.clipboard.writeText(text);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch {
      // لا يمكن النسخ
    }
  };

  return (
    <div className="space-y-4">
      {/* أزرار الإجراءات */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          طباعة
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="gap-2">
          <FileText className="h-4 w-4" />
          PDF
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          تنزيل نصي
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2 flex-1"
        >
          {shareSuccess ? (
            <>
              <Check className="h-4 w-4 text-primary" />
              تم النسخ
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              مشاركة
            </>
          )}
        </Button>
      </div>

      <div ref={printRef} id="results-print-area">
        <Card>
          <CardHeader>
            {/* عنوان يظهر فقط عند الطباعة */}
            <div className="hidden print:block print:mb-4 print:text-center">
              <p className="text-xl font-bold">ميراث — حاسبة المواريث الإسلامية</p>
              <p className="text-sm text-muted-foreground">
                تاريخ الحساب: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary print:hidden" />
              نتائج التوزيع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-lg bg-primary/5 p-4 text-center print:bg-gray-50">
              <p className="text-sm text-muted-foreground">صافي التركة</p>
              <p className="text-2xl font-bold text-primary print:text-black">
                {formatCurrency(netEstate)}
              </p>
            </div>

            {/* Warnings */}
            {result.warnings.map((w, i) => (
              <Alert key={i} className="mb-3">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{w}</AlertDescription>
              </Alert>
            ))}

            {/* Special case */}
            {result.specialCase && (
              <Alert className="mb-3 border-accent bg-accent/10">
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  <strong>{result.specialCase.nameArabic}</strong>:{" "}
                  {result.specialCase.description}
                </AlertDescription>
              </Alert>
            )}

            {/* Awl */}
            {result.awlApplied && result.awlDetails && (
              <Badge variant="secondary" className="mb-3">
                عول: أصل المسألة {result.awlDetails.originalBase} → {result.awlDetails.newBase}
              </Badge>
            )}

            {/* Radd */}
            {result.raddApplied && (
              <Badge variant="secondary" className="mb-3">
                رد: الفائض أُعيد توزيعه
              </Badge>
            )}

            {/* Shares Table */}
            <div className="mt-4 space-y-3">
              {result.shares.map((share, i) => (
                <ShareCard key={i} share={share} />
              ))}
            </div>

            {/* Blocked heirs */}
            {result.hajbList.length > 0 && (
              <>
                <Separator className="my-4" />
                <p className="mb-2 text-sm font-semibold text-muted-foreground">
                  الورثة المحجوبون
                </p>
                {result.hajbList.map((h, i) => (
                  <div
                    key={i}
                    className="mb-1 rounded bg-destructive/5 px-3 py-2 text-sm text-destructive"
                  >
                    {HEIR_LABELS[h.heir]}: {h.explanation}
                  </div>
                ))}
              </>
            )}

            {/* Footer للطباعة فقط */}
            <div className="hidden print:block print:mt-8 print:border-t print:pt-4 print:text-center print:text-xs print:text-gray-500">
              <p>﴿ يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ ﴾</p>
              <p className="mt-1">تم الحساب بواسطة تطبيق ميراث — حاسبة المواريث الإسلامية الذكية</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const HEIR_ICONS: Partial<Record<HeirType, typeof Scale>> = {
  husband: Heart,
  wife: Heart,
  son: UserRound,
  daughter: UserRound,
  father: Crown,
  mother: Heart,
  paternal_grandfather: Crown,
  paternal_grandmother: Crown,
  maternal_grandmother: Crown,
  full_brother: Users,
  full_sister: Users,
  paternal_brother: UserRound,
  paternal_sister: UserRound,
  maternal_brother: Heart,
  maternal_sister: Heart,
  son_of_son: Baby,
  daughter_of_son: Baby,
};

function ShareCard({ share }: { share: ShareResult }) {
  const [open, setOpen] = useState(false);
  const percentage = (toNumber(share.fraction) * 100).toFixed(2);
  const fractionText = fractionToArabicName(share.fraction.num, share.fraction.den);
  const HeirIcon = HEIR_ICONS[share.heir] || UserRound;

  return (
    <div className="rounded-xl border border-border/60 bg-white transition hover:shadow-sm">
      {/* Header row */}
      <div className="flex items-center gap-3 p-4">
        {/* أيقونة الوارث */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HeirIcon className="h-5 w-5" />
        </div>

        {/* اسم الوارث والتفاصيل */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground">
            {HEIR_LABELS[share.heir]}
            {share.count > 1 && (
              <span className="mr-1 text-sm font-normal text-muted-foreground">
                ({share.count})
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {fractionText} ({share.fraction.num}/{share.fraction.den}) — {percentage}%
          </p>
        </div>

        {/* المبلغ */}
        <div className="text-left shrink-0">
          <p className="text-lg font-bold text-primary">
            {formatCurrency(share.amount)}
          </p>
          {share.count > 1 && (
            <p className="text-xs text-muted-foreground">
              {formatCurrency(share.perPersonAmount)} لكل فرد
            </p>
          )}
        </div>
      </div>

      {/* Badge + زر التفسير */}
      <div className="flex items-center justify-between border-t border-border/30 px-4 py-2.5">
        <Badge
          variant="outline"
          className={
            share.shareType === "fardh"
              ? "border-primary/30 text-primary"
              : share.shareType === "asaba"
                ? "border-accent text-accent-foreground"
                : "border-muted text-muted-foreground"
          }
        >
          {share.shareType === "fardh"
            ? "فرض"
            : share.shareType === "asaba"
              ? "تعصيب"
              : share.shareType === "fardh_and_asaba"
                ? "فرض + تعصيب"
                : "رد"}
        </Badge>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
        >
          <Info className="h-3.5 w-3.5" />
          {open ? "إخفاء التفسير" : "التفسير والدليل"}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Expanded: Explanation + Evidence */}
      {open && (
        <div className="space-y-3 border-t border-border/30 bg-muted/30 px-4 py-4 rounded-b-xl">
          <div className="flex gap-2">
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
            <p className="text-sm leading-relaxed text-foreground">{share.explanation}</p>
          </div>
          {share.evidence.length > 0 && (
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
              {share.evidence.map((ev, j) => (
                <div key={j} className="mb-3 last:mb-0">
                  <p className="text-sm font-semibold leading-relaxed text-foreground">
                    {ev.text}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {ev.source} — {ev.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// === مقيّم الذهب (يدوي) ===

const GOLD_KARATS = [24, 22, 21, 18] as const;

function GoldEvaluator({
  asset,
  currencySymbol,
  onUpdate,
}: {
  asset: Asset;
  currencySymbol: string;
  onUpdate: (updates: Partial<Asset>) => void;
}) {
  const [ouncePrice, setOuncePrice] = useState(0);
  const OUNCE_TO_GRAM = 31.1035;
  const price24K = ouncePrice > 0 ? ouncePrice / OUNCE_TO_GRAM : 0;

  const entries: GoldEntry[] = asset.goldEntries ?? GOLD_KARATS.map((k) => ({
    karat: k,
    weightGrams: 0,
    pricePerGram: 0,
  }));

  const recalc = (newEntries: GoldEntry[], newPrice24K: number) => {
    const updated = newEntries.map((e) => ({
      ...e,
      pricePerGram: (newPrice24K * e.karat) / 24,
    }));
    const total = updated.reduce((s, e) => s + e.weightGrams * e.pricePerGram, 0);
    onUpdate({ goldEntries: updated, estimatedValue: Math.round(total) });
  };

  const handleOunceChange = (val: number) => {
    setOuncePrice(val);
    const p24 = val > 0 ? val / OUNCE_TO_GRAM : 0;
    recalc(entries, p24);
  };

  const handleWeightChange = (karat: number, weight: number) => {
    const updated = entries.map((e) =>
      e.karat === karat ? { ...e, weightGrams: weight } : e
    );
    recalc(updated, price24K);
  };

  return (
    <div className="space-y-3 rounded-lg border border-accent/30 bg-accent/5 p-3">
      {/* سعر الأونصة */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-foreground">
          سعر أونصة الذهب ({currencySymbol})
        </Label>
        <Input
          type="number"
          min={0}
          step={1}
          placeholder="مثال: 11,325"
          className="h-11 text-base"
          value={ouncePrice || ""}
          onChange={(e) => handleOunceChange(Number(e.target.value) || 0)}
        />
        {price24K > 0 && (
          <p className="text-[11px] text-muted-foreground">
            = {price24K.toFixed(2)} {currencySymbol}/غرام (عيار 24)
          </p>
        )}
      </div>

      {/* إدخال الأوزان لكل عيار */}
      {GOLD_KARATS.map((karat) => {
        const entry = entries.find((e) => e.karat === karat);
        const pricePerGram = (price24K * karat) / 24;
        const value = (entry?.weightGrams ?? 0) * pricePerGram;
        return (
          <div key={karat} className="flex items-center gap-3 rounded-lg bg-white p-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-xs font-bold text-accent-foreground">
              {karat}K
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  step={0.1}
                  placeholder="0"
                  className="h-9 text-sm"
                  value={entry?.weightGrams || ""}
                  onChange={(e) => handleWeightChange(karat, Number(e.target.value) || 0)}
                />
                <span className="shrink-0 text-xs text-muted-foreground">غرام</span>
              </div>
              {pricePerGram > 0 && (
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {pricePerGram.toFixed(2)} {currencySymbol}/غ
                </p>
              )}
            </div>
            <p className="shrink-0 text-sm font-semibold text-foreground">
              {value > 0 ? formatCurrency(Math.round(value)) : "—"}
            </p>
          </div>
        );
      })}

      {/* إجمالي الذهب */}
      {asset.estimatedValue > 0 && (
        <div className="rounded-lg bg-white p-3 text-center">
          <p className="text-xs text-muted-foreground">إجمالي الذهب</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(asset.estimatedValue)} {currencySymbol}
          </p>
        </div>
      )}
    </div>
  );
}

// === مقيّم الفضة (يدوي) ===

function SilverEvaluator({
  asset,
  currencySymbol,
  onUpdate,
}: {
  asset: Asset;
  currencySymbol: string;
  onUpdate: (updates: Partial<Asset>) => void;
}) {
  const [ouncePrice, setOuncePrice] = useState(0);
  const OUNCE_TO_GRAM = 31.1035;
  const pricePerGram = ouncePrice > 0 ? ouncePrice / OUNCE_TO_GRAM : 0;

  const entry: SilverEntry = asset.silverEntry ?? { weightGrams: 0, pricePerGram: 0 };

  const recalc = (weight: number, ppg: number) => {
    const total = Math.round(weight * ppg);
    onUpdate({ silverEntry: { weightGrams: weight, pricePerGram: ppg }, estimatedValue: total });
  };

  const handleOunceChange = (val: number) => {
    setOuncePrice(val);
    const ppg = val > 0 ? val / OUNCE_TO_GRAM : 0;
    recalc(entry.weightGrams, ppg);
  };

  const handleWeightChange = (weight: number) => {
    recalc(weight, pricePerGram);
  };

  return (
    <div className="space-y-3 rounded-lg border border-border/60 bg-muted/30 p-3">
      {/* سعر الأونصة */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-foreground">
          سعر أونصة الفضة ({currencySymbol})
        </Label>
        <Input
          type="number"
          min={0}
          step={0.1}
          placeholder="مثال: 120"
          className="h-11 text-base"
          value={ouncePrice || ""}
          onChange={(e) => handleOunceChange(Number(e.target.value) || 0)}
        />
        {pricePerGram > 0 && (
          <p className="text-[11px] text-muted-foreground">
            = {pricePerGram.toFixed(2)} {currencySymbol}/غرام
          </p>
        )}
      </div>

      {/* الوزن */}
      <div className="flex items-center gap-3 rounded-lg bg-white p-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
          فضة
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={0}
              step={0.1}
              placeholder="0"
              className="h-9 text-sm"
              value={entry.weightGrams || ""}
              onChange={(e) => handleWeightChange(Number(e.target.value) || 0)}
            />
            <span className="shrink-0 text-xs text-muted-foreground">غرام</span>
          </div>
        </div>
        <p className="shrink-0 text-sm font-semibold text-foreground">
          {asset.estimatedValue > 0 ? formatCurrency(asset.estimatedValue) : "—"}
        </p>
      </div>

      {/* إجمالي */}
      {asset.estimatedValue > 0 && (
        <div className="rounded-lg bg-white p-3 text-center">
          <p className="text-xs text-muted-foreground">إجمالي الفضة</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(asset.estimatedValue)} {currencySymbol}
          </p>
        </div>
      )}
    </div>
  );
}
