# Code Review Task Proposals

## 1) Typo fix task
**Issue:** A test name says `CountyInfo` while the component is `CountryInfo`.

**Proposed task:** Rename the test description from `it should render CountyInfo` to `it should render CountryInfo` for clarity and consistency.

**Where:** `src/app/feature/WeatherWidget/weatherWidget.test.tsx`

---

## 2) Bug fix task
**Issue:** In the rejected async case, loading state is set to `true` instead of `false`, which can leave error states stuck as loading.

**Proposed task:** Update the `fetchCurrentWeatherAsync.rejected` reducer to set `state.isLoading[action.meta.arg.q] = false`.

**Where:** `src/state/weather/weather.slice.ts`

---

## 3) Code comment / documentation discrepancy task
**Issue:** The repository README has only a title and does not document setup, scripts, or expected behavior, which diverges from what the codebase requires to run and test.

**Proposed task:** Expand `README.md` with:
- install instructions (`npm install`)
- run/test scripts (`npm start`, `npm test`)
- brief architecture notes (Redux weather slice, widget feature)
- geolocation fallback behavior

**Where:** `README.md`

---

## 4) Test improvement task
**Issue:** The widget integration test asserts a brittle full URL string (including API key query formatting), tightly coupling the test to axios instance implementation details.

**Proposed task:** Refactor the test to assert semantic behavior instead:
- called once
- params include the expected `q`
- UI renders fetched location

Optionally, add a test for rejected fetch handling (error path + loading reset).

**Where:** `src/app/feature/WeatherWidget/weatherWidget.test.tsx`
