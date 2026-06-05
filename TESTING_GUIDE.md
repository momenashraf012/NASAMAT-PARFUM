# Testing Guide - Nasamat Enhancements

## Quick Start

```bash
# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Navigate to http://localhost:5173
```

---

## Feature Testing Checklist

### 1. Product Quick View Modal ✓
- [ ] Scroll to "عطور نَسَمَات" collection section
- [ ] Click on any perfume card
- [ ] Verify modal opens with smooth animation
- [ ] Check all details display correctly:
  - [ ] Product image with gradient
  - [ ] Arabic & English names
  - [ ] Fragrance family (النوع)
  - [ ] Description
  - [ ] Fragrance notes
  - [ ] Product story in italics
- [ ] Size selection buttons appear
  - [ ] Click each size: 50ml, 100ml, 250ml
  - [ ] Price updates dynamically
  - [ ] Stock availability shows correctly
- [ ] Close button (X) in top-right works
- [ ] Click outside modal to close (backdrop click)
- [ ] Verify modal maintains RTL layout

### 2. Search Functionality ✓
- [ ] Look for search bar in collection section
- [ ] Type Arabic name (e.g., "عود")
  - [ ] Results filter in real-time
  - [ ] Count updates: "X من 6 عطر"
- [ ] Type English name (e.g., "rose")
  - [ ] Results filter correctly
- [ ] Search by fragrance note (e.g., "مسك")
  - [ ] Finds all perfumes with that note
- [ ] Clear search input
  - [ ] Results restore to full list

### 3. Filtering by Fragrance Family ✓
- [ ] Find family filter dropdown in collection
- [ ] Test each option:
  - [ ] الكل (All) - 6 perfumes
  - [ ] عود (Oud) - shows 4 perfumes
  - [ ] ورد (Rose) - shows 3 perfumes
  - [ ] عنبر (Amber) - shows 4 perfumes
  - [ ] مسك (Musk) - shows 5 perfumes
- [ ] Verify count updates correctly

### 4. Sorting Options ✓
- [ ] Find sort dropdown in collection
- [ ] Test each sorting:
  - [ ] **الأحدث** (Newest) - original order
  - [ ] **الأكثر مبيعًا** (Most Popular) - "عود رويال" first
  - [ ] **السعر: من الأقل** (Low to High):
    - Verify نسمة (890) comes first
    - Verify عنبر وعود (1350) comes last
  - [ ] **السعر: من الأعلى** (High to Low):
    - Verify عنبر وعود (1350) comes first
    - Verify نسمة (890) comes last

### 5. Combined Search & Filter ✓
- [ ] Search for "عود"
- [ ] Then filter by family "عود"
- [ ] Results should show intersection
- [ ] Click "مسح المرشحات" (Clear Filters)
  - [ ] All filters reset
  - [ ] Full collection displays

### 6. Newsletter Email Validation ✓
- [ ] Scroll to newsletter section (dark background)
- [ ] Try submitting empty email
  - [ ] Toast notification: "الرجاء إدخال بريدك الإلكتروني"
  - [ ] Toast appears in bottom-right
  - [ ] Auto-dismisses after 4 seconds
- [ ] Try invalid email (e.g., "test@")
  - [ ] Toast notification: "الرجاء إدخال بريد إلكتروني صحيح"
- [ ] Enter valid email (e.g., "user@example.com")
  - [ ] Form shows loading state: "جاري..."
  - [ ] Button disabled during submission
  - [ ] Success toast: "شكرًا لك — لقد تم تسجيلك بنجاح"
- [ ] Try same email again
  - [ ] Info toast: "هذا البريد مشترك بالفعل"
- [ ] Verify toast has close button (X)
  - [ ] Click to dismiss manually

### 7. Image Lazy Loading ✓
- [ ] Open DevTools (F12) → Network tab
- [ ] Filter by images
- [ ] Scroll through page
- [ ] Verify:
  - [ ] Hero image loads immediately (above fold)
  - [ ] Collection images load as you scroll
  - [ ] Gifting images load when scrolled to
  - [ ] Reduced initial page load

### 8. Performance & Memory ✓
- [ ] Open DevTools → Performance tab
- [ ] Scroll up and down multiple times
- [ ] Check memory usage doesn't increase significantly
- [ ] No console errors related to event listeners
- [ ] Header scroll effect smooth (no jank)

### 9. SEO Meta Tags ✓
- [ ] Right-click page → View Page Source
- [ ] Verify in `<head>`:
  - [ ] `<title>نَسَمَات - عطور عربية فاخرة</title>`
  - [ ] `<meta name="description">`
  - [ ] `<meta property="og:title">`
  - [ ] `<meta property="og:image">`
  - [ ] `<meta name="twitter:card">`
  - [ ] `<link rel="canonical">`
  - [ ] `<script type="application/ld+json">` (structured data)

### 10. RTL Layout Verification ✓
- [ ] Verify all text flows right-to-left
  - [ ] Search input (placeholder on right)
  - [ ] Filter dropdowns (options RTL)
  - [ ] Modal content (all text RTL)
  - [ ] Toast notifications (text RTL)
- [ ] All borders and spacing correct for RTL
- [ ] Modal dialog content properly aligned

### 11. Responsive Design ✓
- [ ] Test on mobile (DevTools mobile view):
  - [ ] Collection grid single column
  - [ ] Search and filters stack vertically
  - [ ] Modal responsive
  - [ ] Newsletter form stack
  - [ ] Touch interactions work
  
- [ ] Test on tablet:
  - [ ] Collection grid 2 columns
  - [ ] Proper spacing
  
- [ ] Test on desktop:
  - [ ] Collection grid 3 columns
  - [ ] All interactions smooth

### 12. Accessibility ✓
- [ ] Tab through page
  - [ ] Can reach search input
  - [ ] Can reach filter dropdowns
  - [ ] Can reach size selection buttons
  - [ ] Can reach close button in modal
  - [ ] Tab order logical
- [ ] Verify aria-labels present:
  - [ ] "بحث عن عطر"
  - [ ] "فلترة حسب عائلة العطر"
  - [ ] "ترتيب النتائج"
  - [ ] "مسح المرشحات"
  - [ ] "عرض تفاصيل {perfume name}"

---

## Browser Testing

Test in:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Edge
- [ ] Mobile browsers

---

## Edge Cases

### Search & Filter
- [ ] Search with mixed Arabic/English
- [ ] Search non-existent product
  - [ ] Shows "لم نجد عطورًا تطابق بحثك"
  - [ ] "مسح المرشحات" button appears
- [ ] Apply multiple filters
- [ ] Clear filters one by one vs. all at once

### Newsletter
- [ ] Enter email with spaces
- [ ] Enter very long email
- [ ] Rapid multiple submissions
- [ ] Page refresh after submission
  - [ ] Email set resets (session-based)

### Modal
- [ ] Open multiple perfumes sequentially
- [ ] Open same perfume twice
- [ ] Try selecting out-of-stock size
  - [ ] Button disabled
  - [ ] Add button shows gray state

---

## Performance Benchmarks

Before & after comparison:

### Bundle Size
- JavaScript: ~220 KB (70.59 KB gzipped)
- CSS: ~26.54 KB (5.61 KB gzipped)

### Build Time
- Should complete in ~8-10 seconds
- No TypeScript errors
- No ESLint warnings (except pre-existing)

### Page Load
- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 3s
- Cumulative Layout Shift (CLS): < 0.1

---

## Common Issues & Solutions

### Issue: Modal doesn't open
- **Solution**: Check browser console for errors
- Ensure Radix UI Dialog is installed

### Issue: Search not finding results
- **Solution**: Verify perfume data in `src/data/perfumes.ts`
- Check Arabic character encoding

### Issue: Toast doesn't appear
- **Solution**: Verify `useToast` hook is used
- Check z-index in CSS

### Issue: Lazy loading not working
- **Solution**: Clear browser cache
- Check Network tab to verify `loading="lazy"` attribute

### Issue: SEO tags not visible in browser
- **Solution**: Check page source (not inspector)
- May be overridden by CSP headers in production

---

## Performance Monitoring

### Using DevTools
1. Open Performance tab
2. Record page interactions
3. Check for:
   - Long tasks (> 50ms)
   - Layout thrashing
   - Memory leaks

### Core Web Vitals
- Use PageSpeed Insights
- Check Lighthouse scores
- Target: All green scores

---

## Regression Testing

Verify existing features still work:
- [ ] Header navigation links
- [ ] Hero section buttons
- [ ] Story section styling
- [ ] Testimonials carousel-like scroll
- [ ] Footer links
- [ ] Mobile menu toggle
- [ ] Announcement banner
- [ ] All original animations

---

## Notes

- All features preserve the luxury aesthetic
- No backend required (all static data)
- Session-based operations (page refresh resets)
- Toast notifications auto-dismiss
- Modal animations smooth and performant
- RTL support fully maintained

---

**Last Updated**: 2026-06-04
**Tested Version**: 0.1.0 Enhanced
