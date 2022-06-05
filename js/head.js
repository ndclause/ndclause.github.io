// Copyright (c) 2022 ndclause on GitHub. All rights reserved.
// The file has no license: https://choosealicense.com/no-permission/#for-users
//
// Not using TypeScript/[your favorite bundler]/[your favorite framework], since
// frontend tech stacks come and go. This website is not complex anyway.
// NOTE This file is loaded synchronously in the HTML <head> section.

// Color mode.
(() => {

  const PAGE_THEME_ATTRIBUTE = "page-theme";
  const PAGE_THEME_VALUE_DARK = "dark";

  // Automatic mode settings.
  const doc = document.documentElement;
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      doc.setAttribute(PAGE_THEME_ATTRIBUTE, PAGE_THEME_VALUE_DARK);
    } else {
      doc.removeAttribute(PAGE_THEME_ATTRIBUTE);
    }
  }

  // Dark mode control toggle.
  window.addEventListener('load', () => {
    const toggle = document.querySelector('span#full_dot');
    if (!toggle) { throw new Error(); }
    HINT_LIGHT_MODE = 'light mode';
    HINT_DARK_MODE = 'dark mode';
    const toggleHint = document.createElement('span');
    toggleHint.id = 'theme_toggle_hint';
    toggleHint.innerText =
      doc.getAttribute(PAGE_THEME_ATTRIBUTE) === PAGE_THEME_VALUE_DARK ?
      HINT_LIGHT_MODE : HINT_DARK_MODE;
    toggle.appendChild(toggleHint);
    toggle.addEventListener("click", () => {
      const currentTheme = doc.getAttribute(PAGE_THEME_ATTRIBUTE);
      if (currentTheme === PAGE_THEME_VALUE_DARK) {
        doc.removeAttribute(PAGE_THEME_ATTRIBUTE);
        toggleHint.innerText = HINT_DARK_MODE;
      } else {
        doc.setAttribute(PAGE_THEME_ATTRIBUTE, PAGE_THEME_VALUE_DARK);
        toggleHint.innerText = HINT_LIGHT_MODE;
      }
    });
  });

})();