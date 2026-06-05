# 🛒 نَسَمَات E-Commerce - Quick Start Guide

## البدء السريع

### 1️⃣ **تشغيل المشروع**

```bash
npm install  # إذا لم تثبت المكتبات بعد
npm run dev  # تشغيل المشروع
```

ثم توجه إلى: `http://localhost:5173`

---

## 🧪 اختبار الميزات

### ✅ إضافة منتج إلى السلة

```
1. اذهب للرئيسية
2. انقر على أي عطر
3. اختر الحجم
4. اضبط الكمية (اختياري)
5. اضغط "أضف إلى الحقيبة"
6. لاحظ Cart Counter في الـ Header
```

### ✅ عرض السلة

```
1. انقر على أيقونة Shopping Bag في الـ Header
2. أو اذهب إلى: /cart
3. ستشاهد:
   - جميع المنتجات المضافة
   - صورة + اسم + سعر
   - أزرار +/- لتغيير الكمية
   - زر الحذف (Trash icon)
   - ملخص الطلب على اليمين
```

### ✅ الدفع (Checkout)

```
1. في صفحة السلة اضغط "متابعة الشراء"
2. أو اذهب إلى: /checkout
3. ملء البيانات:
   - الاسم الأول والأخير
   - البريد الإلكتروني
   - رقم الهاتف
   - العنوان الكامل
4. اختر طريقة الشحن:
   - عادي (50 جنيه) - 3-5 أيام
   - سريع (100 جنيه) - 1-2 يوم
5. اختر طريقة الدفع:
   - بطاقة ائتمان
   - دفع عند الاستلام
6. اضغط "تأكيد الطلب"
```

### ✅ تأكيد الطلب (Order Confirmation)

```
1. بعد تأكيد الطلب ستشاهد:
   - رقم طلب فريد (NAM-XXXXX)
   - تاريخ التسليم المتوقع
   - ملخص الطلب
   - معلومات الشحن
   - زر طباعة
2. اضغط "طباعة الطلب" لطباعة التفاصيل
3. أو العودة للرئيسية
```

---

## 🔄 Clear Cart & LocalStorage

### مسح السلة
```javascript
// في Console
localStorage.removeItem('nasamat_cart')
localStorage.removeItem('nasamat_orders')
// ثم refresh الصفحة
```

---

## 📊 View Orders History

### عرض سجل الطلبات
```javascript
// في Console
const orders = JSON.parse(
  localStorage.getItem('nasamat_orders') || '[]'
)
console.log(orders)
```

---

## 💰 الحسابات

### مثال حساب الطلب

**منتج واحد: عود رويال (50ml)**
- السعر: 1250 جنيه
- الكمية: 2
- المجموع الفرعي: 2500 جنيه
- الضريبة (15%): 375 جنيه
- الشحن: 50 جنيه (أو 100 للسريع)
- **الإجمالي**: 2925 جنيه (أو 2975)

**إذا كان الإجمالي > 500**:
- الشحن: **مجاني** ✨

---

## 🎨 تصميم النماذج

جميع النماذج تتبع نفس الـ Design Language:

```
Input Fields:
- Background: Ivory-2
- Border: Gold-soft
- Focus: Gold border + ring
- Text: Charcoal
- Font: Arabic (Cairo body)

Buttons:
- Primary (Gold): Add to Cart, Confirm Order
- Secondary (White): Continue Shopping, Back
- Hover: Gold-dark

Colors:
- Primary: Gold (#B68A35)
- Background: Ivory (#F7F3EC)
- Text: Charcoal (#1A1A1A)
```

---

## 📱 Responsive

جميع الصفحات تعمل على:

```
✅ Mobile (< 768px)
✅ Tablet (768px - 1024px)
✅ Desktop (> 1024px)
✅ RTL Layout ✓
```

---

## ⚡ Performance

```
Build Size: 281.80 KB JS / 28.19 KB CSS
Gzipped: 87.07 KB JS / 5.83 KB CSS
Build Time: ~8.89s
TypeScript Errors: 0
```

---

## 🐛 Troubleshooting

### المشكلة: عدم ظهور البيانات
```
الحل: تحقق من localStorage
- اضغط F12
- ادخل إلى Application/Storage
- تحقق من localStorage
```

### المشكلة: الصفحات غير تفاعلية
```
الحل: تأكد من:
- CartProvider موجود في App.tsx ✓
- React Router مثبت ✓
- npm run build بدون أخطاء ✓
```

### المشكلة: الضريبة والشحن غير صحيح
```
الحل: تحقق من الحساب في:
- src/pages/CartPage.tsx (السطر 27-30)
- src/pages/CheckoutPage.tsx (السطر 27-30)
- Shipping default: 50 جنيه (مجاني > 500)
- Tax: دائماً 15%
```

---

## 🔐 Security Notes

⚠️ **تنبيهات مهمة**:

```
⚠️ هذا تطبيق DEMO فقط
❌ لا تستخدم معلومات حقيقية
❌ الدفع مقلد فقط (لا يتم إرسال أموال)
✅ البيانات تُحفظ محلياً فقط (localStorage)

للإنتاج، تحتاج إلى:
1. Backend Server
2. Real Payment Gateway
3. Database (MongoDB/PostgreSQL)
4. Authentication System
5. SSL Certificate
6. etc.
```

---

## 📚 أماكن المنطق الرئيسية

```
Cart Logic:
└─ src/context/CartContext.tsx

Cart Page:
└─ src/pages/CartPage.tsx

Checkout:
└─ src/pages/CheckoutPage.tsx

Order Confirmation:
└─ src/pages/OrderConfirmation.tsx

Header (Cart Button):
└─ src/components/Header.tsx

Product Modal (Add to Cart):
└─ src/components/ProductQuickView.tsx
```

---

## 🎯 الخطوات التالية (المرحلة الثانية)

```
- [ ] User Account System
- [ ] Wishlist
- [ ] Advanced Filters
- [ ] Coupon Codes
- [ ] Reviews & Ratings
- [ ] Search
- [ ] Product Details Page
```

---

**Ready to go!** 🚀

**استمتع بـ E-Commerce Platform الخاص بك!**
