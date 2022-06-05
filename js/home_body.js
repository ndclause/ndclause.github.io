// Copyright (c) 2022 ndclause on GitHub. All rights reserved.
// The file has no license: https://choosealicense.com/no-permission/#for-users
//
// Not using TypeScript/[your favorite bundler]/[your favorite framework], since
// frontend tech stacks come and go. This website is not complex anyway.

import {assertExists, findVersionsInDecreasingOrder, UrlParams, BaseLicenseOptions} from './common.js';

/** @type {!Array<string>} */
const ALL_VERSIONS_IN_DECREASING_ORDER = findVersionsInDecreasingOrder();

// Show content.
(() => {
  const content = assertExists(document.querySelector('div.nd_content'));
  content.style.display = "block";
})();

// Update the default value Change Date, which was hardcoded by the website
// generator to accommodate browsers that have disabled scripting.
(() => {
  const yesterYear = Number(new Date().toISOString().split('-')[0]) - 1;
  const templateSpan =
    assertExists(document.querySelector('p#change_date_readonly span'));
  templateSpan.innerText = `[e.g. ${yesterYear}-12-31]`;
})();

// The license builder.
(() => {
  const button =
    assertExists(document.querySelector("#license_builder_button"));
  const panel =
    assertExists(document.querySelector("#license_builder_panel"));
  button.addEventListener("click", () => {
    button.classList.toggle("button_active");
    panel.classList.toggle("panel_active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });

  // Initialize the link content.
  const anchor = assertExists(panel.querySelector("a#license_url"));
  const originalUrl = new URL(window.location.origin);
  originalUrl.pathname = 'p';
  originalUrl.search = new URLSearchParams({
    [UrlParams.VERSION]: ALL_VERSIONS_IN_DECREASING_ORDER[0],
  }).toString();
  anchor.href = originalUrl;
  anchor.innerText = originalUrl;

  const updateAnchorUrlOnChange = (name, value) => {
    const resultUrl = new URL(anchor.innerText);
    const resultParams = new URLSearchParams(resultUrl.search);
    if (value) {
      resultParams.set(name, value);
    } else {
      resultParams.delete(name);
    }
    resultUrl.search = resultParams.toString();
    anchor.href = resultUrl.toString();
    anchor.innerText = resultUrl.toString();
  };

  // Version.
  const versionDropdown = document.createDocumentFragment();
  ALL_VERSIONS_IN_DECREASING_ORDER.forEach((version, index) => {
    if (Number(version) < 1.0) { return; }
    const option = document.createElement('option');
    option.value = version;
    option.innerText = version + (index === 0 ? " ⚐" : "");
    option.selected = index === 0;
    versionDropdown.appendChild(option);
  });
  const versionSelect =
    assertExists(panel.querySelector('select#edit_version'));
  versionSelect.appendChild(versionDropdown);
  versionSelect.addEventListener("change", () => {
    updateAnchorUrlOnChange(UrlParams.VERSION, versionSelect.value);
  });

  // Change Date.
  const changeDateInput =
    assertExists(panel.querySelector('input#edit_change_date'));
  changeDateInput.addEventListener("change", () => {
    updateAnchorUrlOnChange(UrlParams.CHANGE_DATE, changeDateInput.value);
  });

  // Base license.
  const licenseIds = Object.keys(BaseLicenseOptions);
  const defaultLicenseOption = document.createElement('option');
  defaultLicenseOption.innerText = "";
  defaultLicenseOption.value = "";
  defaultLicenseOption.selected = true;
  const licenseDropdown = document.createDocumentFragment();
  licenseDropdown.appendChild(defaultLicenseOption);
  licenseIds.forEach((id) => {
    const option = document.createElement('option');
    option.value = id;  // Not license name.
    option.innerText = BaseLicenseOptions[id].name;
    licenseDropdown.appendChild(option);
  });
  const baseLicenseSelect =
    assertExists(panel.querySelector('select#edit_base_license'));
  baseLicenseSelect.appendChild(licenseDropdown);
  baseLicenseSelect.addEventListener("change", () => {
    updateAnchorUrlOnChange(UrlParams.BASE_LICENSE, baseLicenseSelect.value);
  });

  // Clear.
  const clearButton = assertExists(panel.querySelector('button#edit_clear'));
  clearButton.addEventListener("click", () => {
    changeDateInput.value = "";
    updateAnchorUrlOnChange(UrlParams.CHANGE_DATE, "");
    baseLicenseSelect.value = "";
    updateAnchorUrlOnChange(UrlParams.BASE_LICENSE, "");
  });
})();
